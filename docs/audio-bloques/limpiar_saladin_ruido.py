# -*- coding: utf-8 -*-
"""Limpiador determinista e idempotente de ruido editorial en capítulos TTS de Saladin.

Elimina tres patrones de ruido heredados de la extracción del PDF (reglas 10 y 18):
1. Encabezados de página incrustados (`PARTE UNO..CINCO ...` y `CAPÍTULO <num> <título>`
   repetido fuera de los primeros 200 caracteres), reuniendo palabras partidas.
2. Preguntas de autoevaluación/figuras con viñeta `●`.
3. Glosas etimológicas y notas biográficas al pie numeradas en palabras (`uno..cincuenta`).

Por defecto procesa solo los 20 capítulos del PSA 2027 de Saladin.
"""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path

# 20 capítulos de Saladin incluidos en la convocatoria PSA 2027 (UMSS Medicina).
CAPITULOS_PSA_2027_SALADIN: tuple[str, ...] = (
    "01", "05", "06", "08", "09", "10", "13", "14", "15", "16",
    "17", "18", "19", "20", "21", "22", "23", "25", "27", "28",
)
CAPITULOS_PSA_2027_SET: frozenset[str] = frozenset(CAPITULOS_PSA_2027_SALADIN)

NOMBRE_CARPETA_RESPALDO = "bak_limpieza_saladin_21nov"
OFFSET_PROTEGIDO_TITULO_INICIAL = 200

# ============================================================================
# EXPRESIONES REGULARES DETERMINISTAS
# ============================================================================

_NUM_2_50_PAL_PAT = (
    r"(?i:cincuenta"
    r"|(?:treinta|cuarenta)\s+y\s+(?:uno|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)"
    r"|treinta|cuarenta"
    r"|veinti(?:uno|[uú]n|d[oó]s|tr[eé]s|cuatro|cinco|s[eé]is|siete|ocho|nueve)|veinte"
    r"|diecis[eé]is|diecisiete|dieciocho|diecinueve|quince|catorce|trece|doce|once|diez"
    r"|nueve|ocho|siete|seis|cinco|cuatro|tres|dos)"
)

_NUM_1_50_CAP_PAT = rf"(?:{_NUM_2_50_PAL_PAT}|(?i:uno|un))"

# 1a. Encabezados PARTE incrustados (las 5 partes de Saladin).
_PARTE_HEADER_RE = re.compile(
    r"(?<![A-ZÁÉÍÓÚÜÑ])PARTE\s+(?:UNO|DOS|TRES|CUATRO|CINCO)\s+"
    r"(?:Organizaci[oó]n\s+(?:corporal|del\s+cuerpo)"
    r"|Soporte\s+y\s+movimiento"
    r"|Integraci[oó]n\s+y\s+control\s+interno"
    r"|Regulaci[oó]n\s+y\s+mantenimiento"
    r"|Reproducci[oó]n\s+y\s+desarrollo)"
)

# 1b. Títulos conocidos de los 29 capítulos de Saladin (6ª ed. español).
TITULOS_CAPITULOS_SALADIN: tuple[str, ...] = (
    r"Temas\s+principales\s+de\s+anatom[ií]a\s+y\s+fisiolog[ií]a",
    r"La\s+qu[ií]mica\s+de\s+la\s+vida",
    r"Forma\s+y\s+funci[oó]n\s+celular",
    r"Gen[eé]tica\s+y\s+funci[oó]n\s+celular",
    r"Histolog[ií]a",
    r"El\s+sistema\s+tegumentario",
    r"Tejido\s+[oó]seo",
    r"El\s+sistema\s+[oó]seo",
    r"Articulaciones",
    r"El\s+sistema\s+muscular",
    r"Tejido\s+muscular",
    r"Tejido\s+nervioso",
    r"La\s+m[eé]dula\s+espinal\s*,?\s*los\s+nervios\s+(?:raqu[ií]deos|espinales)\s+y\s+los\s+reflejos\s+som[aá]ticos",
    r"El\s+enc[eé]falo\s+y\s+los\s+(?:pares|nervios)\s+craneales",
    r"El\s+sistema\s+nervioso\s+aut[oó]nomo\s+y\s+los\s+reflejos\s+viscerales",
    r"(?:[ÓO]rganos\s+de\s+los\s+sentidos|Los\s+sentidos|Sentidos\s+generales\s+y\s+especiales)",
    r"El\s+sistema\s+endocrino",
    r"El\s+(?:aparato|sistema)\s+circulatorio\s*[:,]?\s*(?:la\s+)?sangre",
    r"El\s+(?:aparato|sistema)\s+circulatorio\s*[:,]?\s*(?:el\s+)?coraz[oó]n",
    r"El\s+(?:aparato|sistema)\s+circulatorio\s*[:,]?\s*(?:los\s+)?vasos\s+sangu[ií]neos\s+y\s+(?:la\s+)?circulaci[oó]n",
    r"(?:Los\s+sistemas|El\s+sistema)\s+linf[aá]tico\s+e\s+(?:inmunitario|inmunol[oó]gico)",
    r"El\s+(?:aparato|sistema)\s+respiratorio",
    r"El\s+(?:aparato|sistema)\s+urinario",
    r"(?:El\s+)?[Ee]quilibrio\s+h[ií]drico\s*,?\s*electrol[ií]tico\s+y\s+[aá]cido[\s-]*b[aá]sico",
    r"El\s+(?:aparato|sistema)\s+digestivo",
    r"Nutrici[oó]n\s+y\s+metabolismo",
    r"El\s+(?:aparato|sistema)\s+reproductor\s+masculino",
    r"El\s+(?:aparato|sistema)\s+reproductor\s+femenino",
    r"(?:El\s+)?[Dd]esarrollo\s+humano\s+y\s+(?:el\s+)?envejecimiento",
)

_CAPITULO_CONOCIDO_RE = re.compile(
    rf"(?<![A-ZÁÉÍÓÚÜÑ])CAP[ÍI]TULO\s+{_NUM_1_50_CAP_PAT}\s+"
    rf"(?:{'|'.join(sorted(TITULOS_CAPITULOS_SALADIN, key=len, reverse=True))})"
)

_CAPITULO_GENERICO_INICIO_RE = re.compile(
    rf"(?<![A-ZÁÉÍÓÚÜÑ])CAP[ÍI]TULO\s+(?P<num>{_NUM_1_50_CAP_PAT})\s+"
)

_STOPWORDS_COLA_TITULO = frozenset({
    "a", "al", "con", "de", "del", "el", "en", "la", "las", "los",
    "para", "por", "que", "se", "su", "un", "una", "y",
})

# 2. Preguntas de autoevaluación/figuras con viñeta ●.
_IMPERATIVO_SEGUIMIENTO_PAT = (
    r"(?:Explique|Justifique|Mencione|Indique|Describa|Identifique|Se[ñn]ale|Cite|Calcule|Compare)"
    r"\b[^.?\n]*[.?]"
)
_PREGUNTA_VINYETA_RE = re.compile(
    rf"●[ \t]*(?:"
    rf"[^.?\n]*\?(?:[ \t]*¿[^?\n]+\?)*(?:[ \t]+{_IMPERATIVO_SEGUIMIENTO_PAT})?"
    rf"|[^.?\n]+\.(?:[ \t]*¿[^?\n]+\?)*(?:[ \t]+{_IMPERATIVO_SEGUIMIENTO_PAT})?"
    rf"|[^.?\n]+(?=$|\n)"
    rf")"
)

# 3a. Glosas etimológicas al pie numeradas (uno..cincuenta), simples o encadenadas con «;».
_ANCLA_INICIO_UNO = r"(?:^|(?<=\n)|(?<=[.!?;:])|(?<=[.!?;:] )|(?<=  ))"
_NUM_NOTA_PREFIJO_PAT = (
    rf"(?:{_ANCLA_INICIO_UNO}(?:[Uu]no|un)|(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ]){_NUM_2_50_PAL_PAT})"
)
_CLAUSULA_ETIM_PAT = (
    r"(?!(?:es|son|era|eran|sea|sean|ser|fue|fueron|est[aá]n?|coma|punto|por|m[aá]s|menos|entre|sobre|veces)\b)"
    r"[a-záéíóúüñ]{2,20}(?:-[a-záéíóúüñ]{1,15})?"
    r"(?:\s*(?:,|o|y)\s*[a-záéíóúüñ]{2,18})?"
    r"\s+(?i:igual\s+a|=)\s+"
    r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][^.;\n]{0,110}"
)
_GLOSA_ETIM_RE = re.compile(
    rf"{_NUM_NOTA_PREFIJO_PAT}\s+{_CLAUSULA_ETIM_PAT}(?:;\s*{_CLAUSULA_ETIM_PAT})*[.;]"
)

# 3b. Notas biográficas al pie numeradas (uno..cincuenta): «catorce Caspar Bartholin, mil ..., anatomista danés.»
_NOMBRE_BIO_TOKEN = (
    r"(?:[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ'\-]*\.?|(?:de|del|la|las|los|van|von|da|di|du|le|y))"
)
_NOMBRE_BIO_PAT = (
    rf"[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ'\-]*\.?(?:\s+{_NOMBRE_BIO_TOKEN}){{1,6}}"
)
_PAL_ANIO_PAT = (
    r"(?:mil|cien|ciento|doscientos|trescientos|cuatrocientos|quinientos|"
    r"seiscientos|setecientos|ochocientos|novecientos|"
    r"diez|once|doce|trece|catorce|quince|diecis[eé]is|diecisiete|dieciocho|diecinueve|"
    r"veinte|veinti(?:uno|una|[uú]n|d[oó]s|tr[eé]s|cuatro|cinco|s[eé]is|siete|ocho|nueve)|"
    r"treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa|"
    r"uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|"
    r"y|al|de|del|en|antes|despu[eé]s|Cristo|presente|hacia|circa|aproximadamente|\d{3,4})"
)
_ANIOS_BIO_PAT = (
    rf"(?:(?:hacia|circa|aproximadamente)\s+)?"
    rf"(?:mil\s+(?:[a-záéíóúüñ]+\s+){{0,6}}(?:a|al)\s+(?:mil|dos\s+mil|el\s+presente|presente)(?:\s+{_PAL_ANIO_PAT}){{0,8}}"
    rf"|mil(?:\s+{_PAL_ANIO_PAT}){{1,8}}"
    rf"|(?:{_PAL_ANIO_PAT}\s+){{1,6}}a\s+(?:{_PAL_ANIO_PAT}\s+){{1,6}}(?:antes|despu[eé]s)\s+de\s+Cristo"
    rf"|\d{{3,4}}\s*[-–a]\s*\d{{3,4}})"
)
_NOTA_BIO_RE = re.compile(
    rf"{_NUM_NOTA_PREFIJO_PAT}\s+{_NOMBRE_BIO_PAT},\s*{_ANIOS_BIO_PAT},\s*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][^.\n]{{2,120}}\."
)


# ============================================================================
# FUNCIONES DE LIMPIEZA
# ============================================================================


def _configurar_stdout_utf8() -> None:
    if sys.platform == "win32":
        for stream in (sys.stdout, sys.stderr):
            if hasattr(stream, "reconfigure"):
                stream.reconfigure(encoding="utf-8", errors="replace")


def _quitar_spans(
    texto: str,
    spans: list[tuple[int, int]],
    *,
    permitir_union: bool = False,
) -> tuple[str, int, int]:
    """Elimina spans no solapados preservando saltos de párrafo y sin crear dobles espacios.

    Devuelve `(texto_resultante, cantidad_eliminados, cantidad_palabras_unidas)`.
    """
    if not spans:
        return texto, 0, 0

    ordenados = sorted(spans, key=lambda par: (par[0], par[1]))
    filtrados: list[tuple[int, int]] = []
    for ini, fin in ordenados:
        if ini >= fin:
            continue
        if filtrados and ini < filtrados[-1][1]:
            continue
        filtrados.append((ini, fin))

    if not filtrados:
        return texto, 0, 0

    eliminados = len(filtrados)

    # Clasificar cada span según si parte una palabra en dos (prefijo minúscula + fragmento minúscula).
    # Fusionar spans consecutivos separados solo por espacios horizontales cuando ninguno parte palabra.
    grupos: list[tuple[int, int, bool]] = []
    for ini, fin in filtrados:
        es_union = False
        if permitir_union and ini > 0:
            char_izq = texto[ini - 1]
            esp_der = fin
            while esp_der < len(texto) and texto[esp_der] in " \t":
                esp_der += 1
            char_der = texto[esp_der] if esp_der < len(texto) else ""
            if (
                char_izq.isalpha()
                and char_izq.islower()
                and char_der.isalpha()
                and char_der.islower()
            ):
                es_union = True

        if (
            grupos
            and not grupos[-1][2]
            and not es_union
            and texto[grupos[-1][1] : ini].strip(" \t") == ""
        ):
            grupos[-1] = (grupos[-1][0], fin, False)
        else:
            grupos.append((ini, fin, es_union))

    partes: list[str] = []
    cursor = 0
    palabras_unidas = 0

    for ini, fin, es_union in grupos:
        if ini < cursor:
            continue

        if es_union:
            partes.append(texto[cursor:ini])
            esp_der = fin
            while esp_der < len(texto) and texto[esp_der] in " \t":
                esp_der += 1
            cursor = esp_der
            palabras_unidas += 1
            continue

        # Quitar espacios horizontales pegados a la izquierda del span eliminado.
        izq_seg = texto[cursor:ini]
        izq_sin_esp = izq_seg.rstrip(" \t")
        partes.append(izq_sin_esp)

        # Saltar espacios horizontales pegados a la derecha del span eliminado.
        esp_der = fin
        while esp_der < len(texto) and texto[esp_der] in " \t":
            esp_der += 1

        char_izq = ""
        for trozo in reversed(partes):
            if trozo:
                char_izq = trozo[-1]
                break
        char_der = texto[esp_der] if esp_der < len(texto) else ""

        if char_izq in ("", "\n"):
            if char_der == "\n":
                # El elemento ocupaba una línea entera: consumir su salto de línea.
                esp_der += 1
        elif char_der in ("", "\n"):
            pass
        elif char_der in ".,;:?!)»”":
            pass
        else:
            partes.append(" ")

        cursor = esp_der

    partes.append(texto[cursor:])
    resultado = "".join(partes)
    return resultado, eliminados, palabras_unidas


def _detectar_patrones_capitulo_extra(texto: str) -> list[re.Pattern[str]]:
    """Detecta encabezados `CAPÍTULO <num> <título>` no cubiertos por la lista fija.

    Usa dos fuentes seguras:
    1) El título inicial del archivo si ocupa su propia línea en los primeros 200 caracteres.
    2) El prefijo común más largo entre 2+ apariciones de `CAPÍTULO <num> ...` tras el offset 200.
    """
    patrones: list[re.Pattern[str]] = []

    # 1. Línea inicial del capítulo (primeros 200 caracteres)
    primera_zona = texto[:OFFSET_PROTEGIDO_TITULO_INICIAL]
    m_ini = re.match(
        rf"^\s*(CAP[ÍI]TULO\s+{_NUM_1_50_CAP_PAT}\s+[A-ZÁÉÍÓÚÜÑ][^\n]{{2,90}}?)\s*(?:\n|$)",
        primera_zona,
    )
    if m_ini:
        enc = m_ini.group(1).strip()
        if len(enc.split()) <= 14:
            patrones.append(
                re.compile(r"(?<![A-ZÁÉÍÓÚÜÑ])" + r"\s+".join(re.escape(w) for w in enc.split()))
            )

    # 2. Prefijo común más largo entre 2+ apariciones de `CAPÍTULO <num> ...` en pos >= 200
    por_num: dict[str, list[list[str]]] = {}
    for m in _CAPITULO_GENERICO_INICIO_RE.finditer(texto):
        if m.start() < OFFSET_PROTEGIDO_TITULO_INICIAL:
            continue
        num_clave = " ".join(m.group("num").lower().split())
        cola = texto[m.end() : m.end() + 180].split("\n", 1)[0]
        palabras = cola.split()[:14]
        if palabras and palabras[0][0].isupper():
            por_num.setdefault(num_clave, []).append(palabras)

    for num_clave, listas in por_num.items():
        if len(listas) < 2:
            continue
        prefijo: list[str] = []
        min_len = min(len(lst) for lst in listas)
        for i in range(min_len):
            tok0 = listas[0][i]
            if all(lst[i].lower() == tok0.lower() for lst in listas[1:]):
                prefijo.append(tok0)
            else:
                break
        while len(prefijo) > 1 and prefijo[-1].rstrip(",.:;").lower() in _STOPWORDS_COLA_TITULO:
            prefijo.pop()
        if prefijo:
            num_pat = r"\s+".join(re.escape(w) for w in num_clave.split())
            tit_pat = r"\s+".join(re.escape(w) for w in prefijo)
            patrones.append(
                re.compile(rf"(?<![A-ZÁÉÍÓÚÜÑ])CAP[ÍI]TULO\s+(?i:{num_pat})\s+{tit_pat}")
            )

    return patrones


def limpiar_texto_saladin(texto: str) -> tuple[str, dict[str, int]]:
    """Aplica la limpieza determinista e idempotente de los 3 patrones de ruido de Saladin."""
    conteos = {
        "parte": 0,
        "capitulo": 0,
        "vinyeta": 0,
        "glosa": 0,
        "bio": 0,
        "palabras_unidas": 0,
        "total": 0,
    }
    actual = texto

    # Paso 1: Encabezados PARTE incrustados (con unión de palabras partidas).
    spans_parte = [(m.start(), m.end()) for m in _PARTE_HEADER_RE.finditer(actual)]
    actual, n_parte, u_parte = _quitar_spans(actual, spans_parte, permitir_union=True)
    conteos["parte"] += n_parte
    conteos["palabras_unidas"] += u_parte

    # Paso 2: Encabezados CAPÍTULO repetidos (nunca en los primeros 200 caracteres).
    spans_cap = [
        (m.start(), m.end())
        for m in _CAPITULO_CONOCIDO_RE.finditer(actual)
        if m.start() >= OFFSET_PROTEGIDO_TITULO_INICIAL
    ]
    actual, n_cap, u_cap = _quitar_spans(actual, spans_cap, permitir_union=True)
    conteos["capitulo"] += n_cap
    conteos["palabras_unidas"] += u_cap

    # Respaldo para variantes de título de capítulo no incluidas en la tabla fija.
    for pat_extra in _detectar_patrones_capitulo_extra(actual):
        spans_extra = [
            (m.start(), m.end())
            for m in pat_extra.finditer(actual)
            if m.start() >= OFFSET_PROTEGIDO_TITULO_INICIAL
        ]
        if spans_extra:
            actual, n_ex, u_ex = _quitar_spans(actual, spans_extra, permitir_union=True)
            conteos["capitulo"] += n_ex
            conteos["palabras_unidas"] += u_ex

    # Paso 3: Preguntas de autoevaluación/figuras con viñeta ●.
    spans_vin = [(m.start(), m.end()) for m in _PREGUNTA_VINYETA_RE.finditer(actual)]
    actual, n_vin, _ = _quitar_spans(actual, spans_vin, permitir_union=False)
    conteos["vinyeta"] += n_vin

    # Paso 4: Glosas etimológicas y notas biográficas al pie numeradas (uno..cincuenta).
    spans_glosa = [(m.start(), m.end()) for m in _GLOSA_ETIM_RE.finditer(actual)]
    actual, n_glosa, _ = _quitar_spans(actual, spans_glosa, permitir_union=False)
    conteos["glosa"] += n_glosa

    spans_bio = [(m.start(), m.end()) for m in _NOTA_BIO_RE.finditer(actual)]
    actual, n_bio, _ = _quitar_spans(actual, spans_bio, permitir_union=False)
    conteos["bio"] += n_bio

    conteos["total"] = (
        conteos["parte"]
        + conteos["capitulo"]
        + conteos["vinyeta"]
        + conteos["glosa"]
        + conteos["bio"]
    )

    if conteos["total"] > 0:
        # Evitar triple salto de línea al quitar líneas completas y espacios sobrantes al fin de línea.
        actual = re.sub(r"[ \t]+(?=\n|$)", "", actual)
        actual = re.sub(r"\n{3,}", "\n\n", actual)

    return actual, conteos


# ============================================================================
# SELECCIÓN DE ARCHIVOS Y CLI
# ============================================================================


def _carpeta_verificado_defecto() -> Path:
    repo = Path(__file__).resolve().parents[2]
    return (
        repo
        / "examenes pasados"
        / "MEDICINA"
        / "LIBROS DE MEDICINA"
        / "_TEXTO_LITERAL_VERIFICADO"
    )


def _numero_capitulo_archivo(ruta: Path) -> str | None:
    m = re.match(r"^Tema_(\d{1,2})_Morfo_Saladin", ruta.name)
    if not m:
        return None
    return m.group(1).zfill(2)


def seleccionar_archivos(
    carpeta: Path,
    *,
    todos: bool = False,
    solo: str | None = None,
) -> list[Path]:
    """Devuelve los archivos `*Saladin*_LITERAL_TTS.md` a procesar según las opciones."""
    candidatos = sorted(carpeta.glob("*Saladin*_LITERAL_TTS.md"))
    if solo:
        filtro = solo.strip()
        filtro_num = filtro.zfill(2) if filtro.isdigit() else None
        elegidos: list[Path] = []
        for ruta in candidatos:
            if (
                ruta.name == filtro
                or ruta.stem == filtro
                or ruta.name.startswith(filtro)
                or (filtro_num is not None and _numero_capitulo_archivo(ruta) == filtro_num)
            ):
                elegidos.append(ruta)
        return elegidos

    if todos:
        return candidatos

    return [r for r in candidatos if _numero_capitulo_archivo(r) in CAPITULOS_PSA_2027_SET]


def procesar_carpeta(
    carpeta: Path,
    *,
    seco: bool = False,
    todos: bool = False,
    solo: str | None = None,
) -> tuple[list[tuple[Path, dict[str, int], bool]], dict[str, int]]:
    """Procesa los capítulos seleccionados, crea respaldo único si no es `--seco` y devuelve métricas."""
    archivos = seleccionar_archivos(carpeta, todos=todos, solo=solo)
    dir_respaldo = carpeta / NOMBRE_CARPETA_RESPALDO
    resultados: list[tuple[Path, dict[str, int], bool]] = []
    totales = {
        "archivos": len(archivos),
        "modificados": 0,
        "parte": 0,
        "capitulo": 0,
        "vinyeta": 0,
        "glosa": 0,
        "bio": 0,
        "palabras_unidas": 0,
        "total": 0,
    }

    for ruta in archivos:
        original = ruta.read_text(encoding="utf-8")
        limpio, conteos = limpiar_texto_saladin(original)
        cambio = limpio != original
        if cambio:
            totales["modificados"] += 1
            if not seco:
                dir_respaldo.mkdir(parents=True, exist_ok=True)
                destino_bak = dir_respaldo / ruta.name
                if not destino_bak.exists():
                    shutil.copy2(ruta, destino_bak)
                ruta.write_text(limpio, encoding="utf-8")

        for k in ("parte", "capitulo", "vinyeta", "glosa", "bio", "palabras_unidas", "total"):
            totales[k] += conteos[k]
        resultados.append((ruta, conteos, cambio))

    return resultados, totales


def main(argv: list[str] | None = None) -> int:
    _configurar_stdout_utf8()
    parser = argparse.ArgumentParser(
        description="Limpia encabezados PARTE/CAPÍTULO, preguntas ● y glosas al pie en capítulos TTS de Saladin."
    )
    parser.add_argument(
        "--seco",
        action="store_true",
        help="Simula la limpieza sin escribir archivos ni crear respaldos.",
    )
    parser.add_argument(
        "--solo",
        default=None,
        help="Procesa un solo capítulo (ej. Tema_01_Morfo_Saladin o 01).",
    )
    parser.add_argument(
        "--todos",
        action="store_true",
        help="Procesa todos los *Saladin*_LITERAL_TTS.md (por defecto solo los 20 PSA 2027).",
    )
    parser.add_argument(
        "--dir",
        dest="carpeta",
        default=None,
        help="Carpeta donde están los *_LITERAL_TTS.md (por defecto _TEXTO_LITERAL_VERIFICADO).",
    )
    args = parser.parse_args(argv)

    carpeta = Path(args.carpeta) if args.carpeta else _carpeta_verificado_defecto()
    if not carpeta.is_dir():
        print(f"ERROR: no existe la carpeta {carpeta}", file=sys.stderr)
        return 2

    resultados, totales = procesar_carpeta(
        carpeta,
        seco=args.seco,
        todos=args.todos,
        solo=args.solo,
    )
    if not resultados:
        print("AVISO: no se encontraron archivos Saladin coincidentes.")
        return 1

    modo = "SECO (sin escritura)" if args.seco else "APLICADO"
    print(f"Limpieza Saladin [{modo}] en: {carpeta}")
    for ruta, c, cambio in resultados:
        marca = "*" if cambio else "="
        print(
            f"  [{marca}] {ruta.name}: total={c['total']} "
            f"(PARTE={c['parte']}, CAP={c['capitulo']}, ●={c['vinyeta']}, "
            f"glosa={c['glosa']}, bio={c['bio']}, unidas={c['palabras_unidas']})"
        )
    print(
        f"TOTAL ({totales['archivos']} archivos, {totales['modificados']} con cambios): "
        f"hallazgos={totales['total']} "
        f"(PARTE={totales['parte']}, CAP={totales['capitulo']}, ●={totales['vinyeta']}, "
        f"glosa={totales['glosa']}, bio={totales['bio']}, unidas={totales['palabras_unidas']})"
    )
    if not args.seco and totales["modificados"] > 0:
        print(f"Respaldo único en: {carpeta / NOMBRE_CARPETA_RESPALDO}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
