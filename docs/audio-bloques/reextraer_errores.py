"""Re-extrae desde el PDF el texto crudo de bloques con 'error audible' y lo normaliza.

No modifica `_TEXTO_LITERAL_VERIFICADO/` ni `_MOTOR_AUDIO/`. Guarda una cache
por libro y un JSON `<capitulo>.json` por cada plan procesado dentro de
`--salida` (por defecto `docs/audio-bloques/reextraido`).
"""

from __future__ import annotations

import argparse
import difflib
import hashlib
import json
import os
import re
import sys
import types
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Callable


DIR_SCRIPT = Path(__file__).resolve().parent
DIR_SCRIPT_AGY = DIR_SCRIPT / "script_agy"
for _ruta in (DIR_SCRIPT, DIR_SCRIPT_AGY):
    if str(_ruta) not in sys.path:
        sys.path.insert(0, str(_ruta))

import bloques_afectados as B  # noqa: E402
import sintetizar_desde_plan as S  # noqa: E402


RUTA_HERRAMIENTAS_DEFECTO = Path(
    r"C:\Users\lmigu\SynologyDrive\12.NUBES\_AGENTES_CENTRAL\herramientas"
)
SUBDIR_LIBROS = (
    Path("libros_extraidos")
    / "Libros del curso básico de Medicina UMSS.Prepa William Osler"
)
LIBROS_PDF = {
    "calvo": "Biologia_Celular_Biomedica_St_Alfonso_Ca-1.pdf",
    "saladin": "morfofisiliologia-saladin-anatomia-y-fisiologia (1).pdf",
}

DIR_SALIDA_DEFECTO = DIR_SCRIPT / "reextraido"
DIR_PLANES_DEFECTO = DIR_SCRIPT / "plan"
UMBRAL_SIMILITUD_OK = 0.92
UMBRAL_CANDIDATO_ANCLA = 0.72

# Palabras-numero y expansiones foneticas de simbolos/unidades que se excluyen
# al comparar texto viejo vs texto re-extraido (todos en minusculas y sin tildes).
PALABRAS_NUMERO: frozenset[str] = frozenset(
    {
        "cero",
        "un",
        "uno",
        "una",
        "unos",
        "unas",
        "dos",
        "tres",
        "cuatro",
        "cinco",
        "seis",
        "siete",
        "ocho",
        "nueve",
        "diez",
        "once",
        "doce",
        "trece",
        "catorce",
        "quince",
        "dieciseis",
        "diecisiete",
        "dieciocho",
        "diecinueve",
        "veinte",
        "veintiuno",
        "veintiun",
        "veintiuna",
        "veintidos",
        "veintitres",
        "veinticuatro",
        "veinticinco",
        "veintiseis",
        "veintisiete",
        "veintiocho",
        "veintinueve",
        "treinta",
        "cuarenta",
        "cincuenta",
        "sesenta",
        "setenta",
        "ochenta",
        "noventa",
        "cien",
        "ciento",
        "cientos",
        "doscientos",
        "doscientas",
        "trescientos",
        "trescientas",
        "cuatrocientos",
        "cuatrocientas",
        "quinientos",
        "quinientas",
        "seiscientos",
        "seiscientas",
        "setecientos",
        "setecientas",
        "ochocientos",
        "ochocientas",
        "novecientos",
        "novecientas",
        "mil",
        "millon",
        "millones",
        "coma",
        "punto",
        "mas",
        "menos",
    }
)

PALABRAS_SIMBOLO_TTS: frozenset[str] = frozenset(
    {
        "por",
        "ciento",
        "micrometro",
        "micrometros",
        "microlitro",
        "microlitros",
        "microgramo",
        "microgramos",
        "nanometro",
        "nanometros",
        "angstrom",
        "angstroms",
        "milimetro",
        "milimetros",
        "centimetro",
        "centimetros",
        "mililitro",
        "mililitros",
        "miligramo",
        "miligramos",
        "grado",
        "grados",
        "celsius",
        "fahrenheit",
        "positivo",
        "negativo",
        "aproximadamente",
        "distinto",
        "igual",
        "cuadrado",
        "cubo",
        "raiz",
        "cuadrada",
    }
)

PALABRAS_EXCLUIDAS: frozenset[str] = PALABRAS_NUMERO | PALABRAS_SIMBOLO_TTS

_RE_ETIQUETA_VOZ = re.compile(r"<[a-z]+(?:\s+[a-z]+)*>")
_RE_TOKEN_ALFA_O_GRIEGO = re.compile(
    r"[A-Za-z\u00c0-\u024f\u0370-\u03ff\u00b5\u2206\u2126]+"
)
_RE_CARACTER_GRIEGO = re.compile(r"[\u0370-\u03ff\u00b5\u2206\u2126]")
# Incluye digitos, mu griega (\u03bc), micro sign (\u00b5), +, menos (\u2212), +/-, %, grado y signo por.
_RE_RESIDUO_PROHIBIDO = re.compile(r"[\d\u03bc\u00b5+\u2212\u00b1%\u00b0\u00d7]")


@dataclass(frozen=True)
class TokenCrudo:
    """Palabra alfabetica normalizada dentro del texto crudo y su rango en caracteres."""

    norm: str
    start: int
    end: int


class _FitzDummy:
    """Modulo dummy para importar extraer_literal_pdf sin PyMuPDF en entornos aislados."""

    __es_dummy__ = True

    @staticmethod
    def open(*_args, **_kwargs):
        raise RuntimeError(
            "PyMuPDF (fitz) no esta instalado en este entorno; "
            "no se puede abrir un PDF real."
        )


def _configurar_stdout_utf8() -> None:
    if sys.platform == "win32":
        for stream in (sys.stdout, sys.stderr):
            if hasattr(stream, "reconfigure"):
                stream.reconfigure(encoding="utf-8", errors="replace")


def resolver_libro_capitulo(capitulo: str) -> str:
    """Devuelve 'calvo' o 'saladin' segun el nombre del capitulo."""
    if capitulo.startswith("Tema_") and "_Biologia_Celular" in capitulo:
        return "calvo"
    if capitulo.startswith("Tema_") and "_Morfo_Saladin" in capitulo:
        return "saladin"
    if capitulo.startswith("Atlas_"):
        return "saladin"
    raise ValueError(f"No se pudo mapear el capitulo a un libro conocido: {capitulo}")


def resolver_ruta_pdf(ruta_motor_audio: Path, libro: str) -> Path:
    """Resuelve la ruta del PDF correspondiente dentro de LIBROS DE MEDICINA."""
    if libro not in LIBROS_PDF:
        raise ValueError(f"Libro desconocido: {libro}")
    motor = Path(ruta_motor_audio).resolve()
    base = motor.parent if motor.name == "_MOTOR_AUDIO" else motor
    return base / SUBDIR_LIBROS / LIBROS_PDF[libro]


def cargar_modulo_extractor(ruta_motor_audio: Path):
    """Importa `extraer_literal_pdf` desde `ruta_motor_audio` en modo solo lectura."""
    motor = Path(ruta_motor_audio).resolve()
    if RUTA_HERRAMIENTAS_DEFECTO.exists() and str(RUTA_HERRAMIENTAS_DEFECTO) not in sys.path:
        sys.path.insert(0, str(RUTA_HERRAMIENTAS_DEFECTO))
    if str(motor) not in sys.path:
        sys.path.insert(0, str(motor))

    inyectado_fitz = False
    if "fitz" not in sys.modules:
        try:
            import fitz  # noqa: F401
        except ImportError:
            modulo_dummy = types.ModuleType("fitz")
            modulo_dummy.__es_dummy__ = True
            modulo_dummy.open = _FitzDummy.open
            sys.modules["fitz"] = modulo_dummy
            inyectado_fitz = True

    try:
        import importlib.util

        ruta_mod = motor / "extraer_literal_pdf.py"
        mod_actual = sys.modules.get("extraer_literal_pdf")
        if (
            mod_actual is not None
            and getattr(mod_actual, "__file__", None)
            and Path(mod_actual.__file__).resolve() == ruta_mod.resolve()
        ):
            return mod_actual

        if ruta_mod.is_file():
            spec = importlib.util.spec_from_file_location(
                "extraer_literal_pdf", ruta_mod
            )
            if spec is not None and spec.loader is not None:
                modulo = importlib.util.module_from_spec(spec)
                sys.modules["extraer_literal_pdf"] = modulo
                spec.loader.exec_module(modulo)
                return modulo

        import importlib

        return importlib.import_module("extraer_literal_pdf")
    finally:
        if inyectado_fitz and isinstance(sys.modules.get("fitz"), types.ModuleType):
            if getattr(sys.modules["fitz"], "__es_dummy__", False):
                del sys.modules["fitz"]


def _quitar_etiquetas_voz(texto: str) -> str:
    return _RE_ETIQUETA_VOZ.sub(" ", texto)


def _normalizar_token_alfa(token: str) -> str:
    if _RE_CARACTER_GRIEGO.search(token):
        return ""
    descompuesto = unicodedata.normalize("NFD", token.lower())
    solo_ascii = "".join(
        ch for ch in descompuesto if unicodedata.category(ch) != "Mn" and "a" <= ch <= "z"
    )
    if not solo_ascii or solo_ascii in PALABRAS_EXCLUIDAS:
        return ""
    return solo_ascii


def extraer_palabras_alfa(texto: str) -> list[str]:
    """Extrae palabras alfabeticas en minusculas sin tildes ni palabras-numero."""
    limpio = _quitar_etiquetas_voz(texto)
    palabras: list[str] = []
    for match in _RE_TOKEN_ALFA_O_GRIEGO.finditer(limpio):
        norm = _normalizar_token_alfa(match.group(0))
        if norm:
            palabras.append(norm)
    return palabras


def _tokenizar_crudo(texto_crudo: str) -> list[TokenCrudo]:
    tokens: list[TokenCrudo] = []
    for match in _RE_TOKEN_ALFA_O_GRIEGO.finditer(texto_crudo):
        norm = _normalizar_token_alfa(match.group(0))
        if norm:
            tokens.append(TokenCrudo(norm=norm, start=match.start(), end=match.end()))
    return tokens


def _primer_y_ultimo_match_alfa(texto: str) -> tuple[int, int] | None:
    limpio = _quitar_etiquetas_voz(texto)
    primero: int | None = None
    ultimo_fin: int | None = None
    for match in _RE_TOKEN_ALFA_O_GRIEGO.finditer(limpio):
        if _normalizar_token_alfa(match.group(0)):
            if primero is None:
                primero = match.start()
            ultimo_fin = match.end()
    if primero is None or ultimo_fin is None:
        return None
    return primero, ultimo_fin


def cargar_o_extraer_paginas_libro(
    libro: str,
    ruta_pdf: Path,
    dir_salida: Path,
    modulo_extractor,
    cache_memoria: dict[str, list[str]] | None = None,
    extraer_paginas_fn: Callable[[Path, str], list[str]] | None = None,
) -> list[str]:
    """Carga las paginas crudas del libro desde cache o las extrae del PDF una vez."""
    if cache_memoria is not None and libro in cache_memoria:
        return cache_memoria[libro]

    ruta_cache = dir_salida / f"_cache_crudo_{libro}.json"
    if ruta_cache.exists():
        datos = json.loads(ruta_cache.read_text(encoding="utf-8"))
        paginas = list(datos["paginas"])
        if cache_memoria is not None:
            cache_memoria[libro] = paginas
        return paginas

    if extraer_paginas_fn is not None:
        paginas = list(extraer_paginas_fn(ruta_pdf, libro))
    else:
        if not ruta_pdf.exists():
            raise FileNotFoundError(f"No existe el PDF del libro {libro}: {ruta_pdf}")
        try:
            import fitz
        except ImportError as exc:
            raise RuntimeError(
                "PyMuPDF (fitz) es necesario para extraer paginas del PDF."
            ) from exc
        if getattr(fitz, "__es_dummy__", False):
            raise RuntimeError("PyMuPDF (fitz) real no disponible.")

        with fitz.open(str(ruta_pdf)) as doc:
            total_paginas = len(doc)

        paginas = []
        for num_pag in range(1, total_paginas + 1):
            paginas.append(
                modulo_extractor.extraer_capitulo_literal(
                    str(ruta_pdf), num_pag, num_pag
                )
            )

    dir_salida.mkdir(parents=True, exist_ok=True)
    payload = {
        "libro": libro,
        "pdf": ruta_pdf.name,
        "total_paginas": len(paginas),
        "paginas": paginas,
    }
    tmp = ruta_cache.with_suffix(".tmp")
    tmp.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    os.replace(tmp, ruta_cache)

    if cache_memoria is not None:
        cache_memoria[libro] = paginas
    return paginas


def _unir_paginas_con_indices(paginas: list[str]) -> tuple[str, list[tuple[int, int, int]]]:
    """Une las paginas con '\\n\\n' y devuelve (texto_completo, [(ini, fin, pag_1based)])."""
    partes: list[str] = []
    rangos: list[tuple[int, int, int]] = []
    offset = 0
    for idx, pag_txt in enumerate(paginas):
        if idx > 0:
            partes.append("\n\n")
            offset += 2
        ini = offset
        fin = ini + len(pag_txt)
        partes.append(pag_txt)
        rangos.append((ini, fin, idx + 1))
        offset = fin
    return "".join(partes), rangos


def _pagina_de_offset(rangos: list[tuple[int, int, int]], pos_char: int) -> int:
    for ini, fin, num_pag in rangos:
        if pos_char <= fin:
            return num_pag
    return rangos[-1][2] if rangos else 1


def _buscar_subsecuencia(
    normas_crudo: list[str],
    patron: list[str],
    desde: int,
    hasta: int,
) -> list[int]:
    m = len(patron)
    if m == 0 or hasta - desde < m:
        return []
    primero = patron[0]
    encontrados: list[int] = []
    limite = hasta - m + 1
    for i in range(desde, limite):
        if normas_crudo[i] == primero and normas_crudo[i : i + m] == patron:
            encontrados.append(i)
    return encontrados


def _ubicar_fin_bloque(
    normas_crudo: list[str],
    palabras_v: list[str],
    cand_ini: int,
) -> int | None:
    n_v = len(palabras_v)
    est_fin = cand_ini + n_v - 1
    holgura = max(25, n_v // 2)
    win_ini = max(cand_ini + 1, est_fin - holgura)
    win_fin = min(len(normas_crudo), est_fin + holgura + 1)

    for off_end in range(0, min(11, max(1, n_v - 1))):
        max_w = min(5, n_v - off_end)
        for w_end in range(max_w, 1, -1):
            ini_pat = n_v - off_end - w_end
            if ini_pat < 0:
                continue
            patron = palabras_v[ini_pat : n_v - off_end]
            posiciones = _buscar_subsecuencia(normas_crudo, patron, win_ini, win_fin)
            if posiciones:
                elegido = min(posiciones, key=lambda p: abs((p + w_end - 1 + off_end) - est_fin))
                cand_fin = min(len(normas_crudo) - 1, elegido + w_end - 1 + off_end)
                return cand_fin
    return None


def _ajustar_borde_inicio(
    normas_crudo: list[str], cand_ini: int, primera_v: str, piso: int
) -> int:
    if normas_crudo[cand_ini] == primera_v:
        return cand_ini
    for d in (-1, 1, -2, 2, -3, 3):
        idx = cand_ini + d
        if piso <= idx < len(normas_crudo) and normas_crudo[idx] == primera_v:
            return idx
    return cand_ini


def _ajustar_borde_fin(
    normas_crudo: list[str], cand_fin: int, ultima_v: str, techo: int
) -> int:
    if normas_crudo[cand_fin] == ultima_v:
        return cand_fin
    for d in (1, -1, 2, -2, 3, -3):
        idx = cand_fin + d
        if 0 <= idx < techo and normas_crudo[idx] == ultima_v:
            return idx
    return cand_fin


def ubicar_tramo_en_crudo(
    tokens_crudo: list[TokenCrudo],
    normas_crudo: list[str],
    palabras_v: list[str],
    cursor_tok: int,
) -> tuple[int, int] | None:
    """Busca en `tokens_crudo[cursor_tok:]` el tramo [i_ini, i_fin] de mayor similitud."""
    n_v = len(palabras_v)
    if n_v < 2 or cursor_tok >= len(normas_crudo):
        return None

    mejor_tramo: tuple[int, int] | None = None
    mejor_sim = -1.0

    for off in range(0, min(12, n_v - 1)):
        max_w = min(5, n_v - off)
        for w in range(max_w, 1, -1):
            patron = palabras_v[off : off + w]
            candidatos = _buscar_subsecuencia(
                normas_crudo, patron, cursor_tok, len(normas_crudo)
            )
            for pos in candidatos:
                cand_ini = max(cursor_tok, pos - off)
                cand_ini = _ajustar_borde_inicio(
                    normas_crudo, cand_ini, palabras_v[0], cursor_tok
                )
                cand_fin = _ubicar_fin_bloque(normas_crudo, palabras_v, cand_ini)
                if cand_fin is None or cand_fin < cand_ini:
                    continue
                cand_fin = _ajustar_borde_fin(
                    normas_crudo, cand_fin, palabras_v[-1], len(normas_crudo)
                )
                if cand_fin < cand_ini:
                    continue
                tramo_norm = normas_crudo[cand_ini : cand_fin + 1]
                sim = difflib.SequenceMatcher(
                    None, palabras_v, tramo_norm, autojunk=False
                ).ratio()
                if sim >= UMBRAL_CANDIDATO_ANCLA and sim > mejor_sim:
                    mejor_sim = sim
                    mejor_tramo = (cand_ini, cand_fin)
            if mejor_tramo is not None and mejor_sim >= UMBRAL_SIMILITUD_OK:
                return mejor_tramo
    return mejor_tramo


def _extender_bordes_crudo(
    texto_crudo: str,
    tokens_crudo: list[TokenCrudo],
    i_ini: int,
    i_fin: int,
    texto_viejo: str,
    cursor_char: int,
) -> tuple[int, int]:
    """Incluye numeros/simbolos iniciales o finales ligados al bloque en el crudo."""
    char_ini = tokens_crudo[i_ini].start
    char_fin = tokens_crudo[i_fin].end

    pos_viejo = _primer_y_ultimo_match_alfa(texto_viejo)
    limpio_viejo = _quitar_etiquetas_voz(texto_viejo).strip()

    # 1) Prefijo numerico o simbolico antes de la primera palabra alfabetica
    if pos_viejo is not None and pos_viejo[0] > 0:
        prefijo_viejo = limpio_viejo[: pos_viejo[0]].strip()
        if prefijo_viejo:
            piso = tokens_crudo[i_ini - 1].end if i_ini > 0 else 0
            piso = max(piso, cursor_char)
            gap_ini = texto_crudo[piso:char_ini]
            ultimo_corte = max(
                gap_ini.rfind("."),
                gap_ini.rfind("!"),
                gap_ini.rfind("?"),
                gap_ini.rfind("\n"),
            )
            if ultimo_corte >= 0:
                piso_candidato = piso + ultimo_corte + 1
            else:
                piso_candidato = piso
            fragmento = texto_crudo[piso_candidato:char_ini].lstrip()
            if fragmento:
                char_ini = char_ini - len(fragmento)

    # 2) Sufijo numerico, simbolico o puntuacion despues de la ultima palabra alfabetica
    techo = (
        tokens_crudo[i_fin + 1].start
        if i_fin + 1 < len(tokens_crudo)
        else len(texto_crudo)
    )
    gap_fin = texto_crudo[char_fin:techo]
    sufijo_viejo = ""
    if pos_viejo is not None:
        sufijo_viejo = limpio_viejo[pos_viejo[1] :].strip()

    if gap_fin:
        match_cierre = re.search(r"[.!?][\"'\u00bb\u201d)]*", gap_fin)
        if sufijo_viejo:
            if match_cierre:
                char_fin = char_fin + match_cierre.end()
            else:
                char_fin = char_fin + len(gap_fin.rstrip())
        else:
            # Aunque el texto viejo no tenga sufijo, preserva signos finales pegados
            match_pegado = re.match(r"^[.,;:!?%+\u2212\u00b1\u00b0\u00d7\"'\u00bb\u201d)]+", gap_fin)
            if match_pegado:
                char_fin = char_fin + match_pegado.end()

    return char_ini, char_fin


def evaluar_bloque_reextraido(texto_viejo: str, texto_nuevo: str) -> tuple[str, str, float]:
    """Evalua calidad del bloque re-extraido y devuelve (estado, motivo, similitud)."""
    palabras_v = extraer_palabras_alfa(texto_viejo)
    palabras_n = extraer_palabras_alfa(texto_nuevo)

    if not palabras_v or not palabras_n:
        return "REVISAR", "sin palabras alfabeticas para comparar", 0.0

    similitud = round(
        difflib.SequenceMatcher(None, palabras_v, palabras_n, autojunk=False).ratio(),
        4,
    )

    motivos: list[str] = []
    if similitud < UMBRAL_SIMILITUD_OK:
        motivos.append(f"similitud {similitud:.4f} < {UMBRAL_SIMILITUD_OK}")
    if palabras_v[0] != palabras_n[0]:
        motivos.append(
            f"primera palabra distinta ({palabras_v[0]!r} vs {palabras_n[0]!r})"
        )
    if palabras_v[-1] != palabras_n[-1]:
        motivos.append(
            f"ultima palabra distinta ({palabras_v[-1]!r} vs {palabras_n[-1]!r})"
        )

    sin_etiquetas = _quitar_etiquetas_voz(texto_nuevo)
    match_residuo = _RE_RESIDUO_PROHIBIDO.search(sin_etiquetas)
    if match_residuo:
        motivos.append(f"caracter residual en texto nuevo ({match_residuo.group(0)!r})")

    if motivos:
        return "REVISAR", "; ".join(motivos), similitud
    return "OK", "", similitud


def _cargar_y_validar_bloques_plan(
    ruta_motor_audio: Path, ruta_plan_json: Path
) -> tuple[str, list[dict], list[str]]:
    plan_path = Path(ruta_plan_json)
    datos = json.loads(plan_path.read_text(encoding="utf-8"))
    if isinstance(datos, list):
        capitulo = plan_path.stem
        items_brutos = datos
    elif isinstance(datos, dict):
        capitulo = str(datos.get("capitulo") or plan_path.stem)
        items_brutos = list(datos.get("bloques", []))
    else:
        raise ValueError(f"Formato de plan invalido en {plan_path}")

    if not items_brutos:
        raise ValueError(f"El plan esta vacio: {plan_path}")

    items_plan = sorted(items_brutos, key=lambda x: int(x["j"]))
    ruta_md = S.resolver_ruta_md_actual(Path(ruta_motor_audio), capitulo)
    texto_md = ruta_md.read_text(encoding="utf-8")
    bloques_actuales = B.dividir_capitulo_en_bloques(
        texto_md, max_palabras=S.MAX_PALABRAS_BLOQUE
    )

    if len(bloques_actuales) != len(items_plan):
        raise ValueError(
            f"Desajuste de bloques en {capitulo}: plan={len(items_plan)}, "
            f"md_actual={len(bloques_actuales)}"
        )

    for item in items_plan:
        j = int(item["j"])
        inicio_actual = S.resumir_inicio(bloques_actuales[j - 1])
        inicio_plan = item.get("texto_inicio", "")
        if inicio_actual != inicio_plan:
            raise ValueError(
                f"Desajuste texto_inicio en {capitulo} j={j}: "
                f"esperado={inicio_plan!r}, actual={inicio_actual!r}"
            )
    return capitulo, items_plan, bloques_actuales


def reextraer_capitulo(
    ruta_motor_audio: Path,
    ruta_plan_json: Path,
    dir_salida: Path = DIR_SALIDA_DEFECTO,
    cache_memoria: dict[str, list[str]] | None = None,
    extraer_paginas_fn: Callable[[Path, str], list[str]] | None = None,
) -> dict:
    """Re-extrae los bloques con 'error audible' de un capitulo y escribe su JSON."""
    motor = Path(ruta_motor_audio).resolve()
    plan_path = Path(ruta_plan_json).resolve()
    salida = Path(dir_salida)

    capitulo, items_plan, bloques_actuales = _cargar_y_validar_bloques_plan(
        motor, plan_path
    )
    libro = resolver_libro_capitulo(capitulo)
    ruta_pdf = resolver_ruta_pdf(motor, libro)

    modulo_extractor = cargar_modulo_extractor(motor)
    paginas = cargar_o_extraer_paginas_libro(
        libro=libro,
        ruta_pdf=ruta_pdf,
        dir_salida=salida,
        modulo_extractor=modulo_extractor,
        cache_memoria=cache_memoria,
        extraer_paginas_fn=extraer_paginas_fn,
    )

    texto_crudo, rangos_pag = _unir_paginas_con_indices(paginas)
    tokens_crudo = _tokenizar_crudo(texto_crudo)
    normas_crudo = [t.norm for t in tokens_crudo]

    bloques_error = [
        item
        for item in items_plan
        if str(item.get("motivo", "")).lower().startswith("error audible")
    ]

    resultados: list[dict] = []
    cursor_tok = 0
    cursor_char = 0
    conteo_ok = 0
    conteo_revisar = 0

    for item in bloques_error:
        j = int(item["j"])
        texto_viejo = bloques_actuales[j - 1]
        palabras_v = extraer_palabras_alfa(texto_viejo)

        if len(palabras_v) < 2:
            conteo_revisar += 1
            resultados.append(
                {
                    "j": j,
                    "estado": "REVISAR",
                    "motivo": "pocas palabras alfabeticas para anclar",
                    "similitud": 0.0,
                    "pagina": None,
                    "texto_viejo": texto_viejo,
                    "texto_nuevo": "",
                }
            )
            continue

        ubicacion = ubicar_tramo_en_crudo(
            tokens_crudo=tokens_crudo,
            normas_crudo=normas_crudo,
            palabras_v=palabras_v,
            cursor_tok=cursor_tok,
        )
        if ubicacion is None:
            conteo_revisar += 1
            resultados.append(
                {
                    "j": j,
                    "estado": "REVISAR",
                    "motivo": "no se encontro ancla en el crudo",
                    "similitud": 0.0,
                    "pagina": None,
                    "texto_viejo": texto_viejo,
                    "texto_nuevo": "",
                }
            )
            continue

        i_ini, i_fin = ubicacion
        char_ini, char_fin = _extender_bordes_crudo(
            texto_crudo=texto_crudo,
            tokens_crudo=tokens_crudo,
            i_ini=i_ini,
            i_fin=i_fin,
            texto_viejo=texto_viejo,
            cursor_char=cursor_char,
        )
        crudo_tramo = texto_crudo[char_ini:char_fin].strip()
        texto_nuevo = modulo_extractor.adaptar_fonetica_literal(crudo_tramo).strip()
        pagina = _pagina_de_offset(rangos_pag, char_ini)
        estado, motivo, similitud = evaluar_bloque_reextraido(texto_viejo, texto_nuevo)

        cursor_tok = i_fin + 1
        cursor_char = char_fin

        if estado == "OK":
            conteo_ok += 1
        else:
            conteo_revisar += 1

        resultados.append(
            {
                "j": j,
                "estado": estado,
                "motivo": motivo,
                "similitud": similitud,
                "pagina": pagina,
                "texto_viejo": texto_viejo,
                "texto_nuevo": texto_nuevo,
            }
        )

    salida.mkdir(parents=True, exist_ok=True)
    ruta_out = salida / f"{capitulo}.json"
    tmp = ruta_out.with_suffix(".tmp")
    tmp.write_text(
        json.dumps(resultados, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    os.replace(tmp, ruta_out)

    print(
        f"{capitulo}: {len(resultados)} bloques, OK={conteo_ok}, REVISAR={conteo_revisar}"
    )

    return {
        "capitulo": capitulo,
        "ruta_salida": ruta_out,
        "total": len(resultados),
        "ok": conteo_ok,
        "revisar": conteo_revisar,
        "resultados": resultados,
    }


def _resolver_rutas_planes_todos(plan_o_dir: Path | None) -> list[Path]:
    if plan_o_dir is None:
        base = DIR_PLANES_DEFECTO
    else:
        p = Path(plan_o_dir)
        base = p if p.is_dir() else p.parent
    return sorted(base.glob("*.json"))


def reextraer_todos(
    ruta_motor_audio: Path,
    rutas_planes: list[Path],
    dir_salida: Path = DIR_SALIDA_DEFECTO,
    extraer_paginas_fn: Callable[[Path, str], list[str]] | None = None,
) -> dict:
    """Procesa todos los planes dados reutilizando cache por libro e imprime resumen."""
    cache_memoria: dict[str, list[str]] = {}
    total_bloques = 0
    total_ok = 0
    total_revisar = 0
    ejemplos: list[tuple[str, int, str, str]] = []

    for ruta_plan in rutas_planes:
        res = reextraer_capitulo(
            ruta_motor_audio=ruta_motor_audio,
            ruta_plan_json=ruta_plan,
            dir_salida=dir_salida,
            cache_memoria=cache_memoria,
            extraer_paginas_fn=extraer_paginas_fn,
        )
        total_bloques += res["total"]
        total_ok += res["ok"]
        total_revisar += res["revisar"]
        for item in res["resultados"]:
            if (
                len(ejemplos) < 10
                and item["estado"] == "OK"
                and item["texto_nuevo"]
                and item["texto_nuevo"] != item["texto_viejo"]
            ):
                ejemplos.append(
                    (
                        res["capitulo"],
                        item["j"],
                        item["texto_viejo"],
                        item["texto_nuevo"],
                    )
                )

    print("")
    print(
        f"TOTAL ({len(rutas_planes)} capitulos): {total_bloques} bloques, "
        f"OK={total_ok}, REVISAR={total_revisar}"
    )
    if ejemplos:
        print("Ejemplos viejo -> nuevo (hasta 10):")
        for cap, j, viejo, nuevo in ejemplos:
            print(f"  [{cap} j={j}]")
            print(f"    VIEJO: {viejo}")
            print(f"    NUEVO: {nuevo}")

    return {
        "capitulos": len(rutas_planes),
        "total": total_bloques,
        "ok": total_ok,
        "revisar": total_revisar,
        "ejemplos": ejemplos,
    }


def sha1_texto(texto: str) -> str:
    return hashlib.sha1(texto.encode("utf-8")).hexdigest()


def main(argv: list[str] | None = None) -> int:
    _configurar_stdout_utf8()
    parser = argparse.ArgumentParser(
        description="Re-extrae desde el PDF bloques marcados con 'error audible'."
    )
    parser.add_argument(
        "ruta_motor_audio",
        help="Ruta a la carpeta _MOTOR_AUDIO",
    )
    parser.add_argument(
        "plan_json",
        nargs="?",
        default=None,
        help="Ruta al plan JSON del capitulo (opcional si se usa --todos)",
    )
    parser.add_argument(
        "--salida",
        default=str(DIR_SALIDA_DEFECTO),
        help="Carpeta donde guardar cache de libros y JSON reextraidos",
    )
    parser.add_argument(
        "--todos",
        action="store_true",
        help="Procesa todos los planes JSON de la carpeta de planes",
    )
    args = parser.parse_args(argv)

    try:
        if args.todos:
            rutas_planes = _resolver_rutas_planes_todos(
                Path(args.plan_json) if args.plan_json else None
            )
            if not rutas_planes:
                raise FileNotFoundError("No se encontraron archivos JSON de planes.")
            reextraer_todos(
                ruta_motor_audio=Path(args.ruta_motor_audio),
                rutas_planes=rutas_planes,
                dir_salida=Path(args.salida),
            )
        else:
            if not args.plan_json:
                parser.error("Se requiere plan_json cuando no se especifica --todos")
            reextraer_capitulo(
                ruta_motor_audio=Path(args.ruta_motor_audio),
                ruta_plan_json=Path(args.plan_json),
                dir_salida=Path(args.salida),
            )
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
