# -*- coding: utf-8 -*-
"""Detecta bloques de audio *_LITERAL_TTS.md cuyo texto cambia o tiene residuos foneticos."""

from __future__ import annotations

import argparse
import csv
import re
import sys
import types
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

MAX_PALABRAS_BLOQUE = 100
LARGO_EXTRACTO = 80
NOMBRE_CSV_DEFECTO = "bloques_afectados.csv"

_DIGITO_PALABRA = r"(?:cero|uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)"
_UNIDADES_1_9 = r"(?:uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)"
_DIEZ_19 = (
    r"(?:diez|once|doce|trece|catorce|quince|"
    r"diecis[eé]is|diecisiete|dieciocho|diecinueve)"
)
_VEINTI_20_29 = (
    r"(?:veinte|veintiun[oa]?|veinti[uú]n|"
    r"veintid[oó]s|veintitr[eé]s|veinticuatro|veinticinco|"
    r"veintis[eé]is|veintisiete|veintiocho|veintinueve)"
)
_DECENAS_30_90 = r"(?:treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa)"
_CENTENAS_100_900 = (
    r"(?:cien|ciento|doscient[oa]s|trescient[oa]s|cuatrocient[oa]s|"
    r"quinient[oa]s|seiscient[oa]s|setecient[oa]s|ochocient[oa]s|novecient[oa]s)"
)
_NUM_1_99 = (
    rf"(?:{_DECENAS_30_90}(?:\s+y\s+{_UNIDADES_1_9})?"
    rf"|{_VEINTI_20_29}|{_DIEZ_19}|{_UNIDADES_1_9})"
)
_NUM_1_999 = rf"(?:{_CENTENAS_100_900}(?:\s+{_NUM_1_99})?|{_NUM_1_99})"
_NUM_PALABRAS_SIN_CERO = (
    rf"(?:(?:{_NUM_1_999}\s+)?mil(?:\s+{_NUM_1_999})?|{_NUM_1_999})"
)
_NUM_PALABRAS_CON_CERO = rf"(?:cero|{_NUM_PALABRAS_SIN_CERO})"

# Patron de miles mal leidos como decimal: numero en palabras + "coma" + 3 digitos sueltos en palabras.
MILES_PALABRAS_RE = re.compile(
    rf"\b(?P<entero>{_NUM_PALABRAS_SIN_CERO})\s+coma\s+"
    rf"(?P<dec>{_DIGITO_PALABRA}\s+{_DIGITO_PALABRA}\s+{_DIGITO_PALABRA})\b"
    rf"(?!\s+{_DIGITO_PALABRA}\b)",
    re.IGNORECASE,
)

# "dos coma un", "cero coma cero un", etc. que revisar() de fonetica_es no captura si no empieza en "un coma".
COMA_UN_RE = re.compile(
    rf"\b{_NUM_PALABRAS_CON_CERO}\s+coma\s+(?:{_DIGITO_PALABRA}\s+)*un\b",
    re.IGNORECASE,
)
_UN_COMA_INICIO_RE = re.compile(r"^(?:un|veinti[uú]n)\s+coma\b", re.IGNORECASE)


@dataclass
class HallazgoBloque:
    """Representa un problema detectado dentro de un bloque."""

    archivo: str
    bloque: str
    tipo_problema: str
    extracto_viejo: str
    extracto_nuevo: str


@dataclass
class ResumenArchivo:
    """Totales de bloques revisados y afectados para un archivo .md."""

    archivo: str
    bloques_totales: int
    bloques_afectados: int
    bloques_miles_decimal: int


def dividir_capitulo_en_bloques(
    texto: str, max_palabras: int = MAX_PALABRAS_BLOQUE
) -> list[str]:
    """
    Corta un .md en bloques con la misma regla que _MOTOR_AUDIO/sintetizar_libro.py
    (funcion dividir_capitulo_en_bloques, lineas 59-106; llamada con max_palabras=100
    en la linea 154).
    """
    parrafos = [p.strip() for p in texto.split("\n\n") if p.strip()]

    unidades: list[str] = []
    for p in parrafos:
        if len(p.split()) <= max_palabras:
            unidades.append(p)
        else:
            oraciones = re.split(r"(?<=[.!?])\s+", p)
            temp: list[str] = []
            temp_count = 0
            for o in oraciones:
                cnt = len(o.split())
                if temp_count + cnt > max_palabras and temp:
                    unidades.append(" ".join(temp))
                    temp = [o]
                    temp_count = cnt
                else:
                    temp.append(o)
                    temp_count += cnt
            if temp:
                unidades.append(" ".join(temp))

    bloques: list[str] = []
    bloque_actual: list[str] = []
    conteo_palabras = 0

    for u in unidades:
        cnt = len(u.split())
        if conteo_palabras + cnt > max_palabras and bloque_actual:
            bloques.append("\n\n".join(bloque_actual))
            bloque_actual = [u]
            conteo_palabras = cnt
        else:
            bloque_actual.append(u)
            conteo_palabras += cnt

    if bloque_actual:
        bloques.append("\n\n".join(bloque_actual))

    return bloques


def cargar_herramientas_fonetica(ruta_motor_audio: Path):
    """
    Importa fonetica_es, SIGLAS_MEDICINA y REEMPLAZOS_MEDICINA desde
    extraer_literal_pdf agregando ruta_motor_audio a sys.path.
    """
    motor_str = str(ruta_motor_audio.resolve())
    if motor_str not in sys.path:
        sys.path.insert(0, motor_str)

    try:
        from extraer_literal_pdf import (  # type: ignore
            REEMPLAZOS_MEDICINA,
            SIGLAS_MEDICINA,
            fonetica_es,
        )
    except ModuleNotFoundError as exc:
        if exc.name != "fitz":
            raise
        # extraer_literal_pdf importa fitz arriba aunque no lo usa al cargar fonetica_es.
        sys.modules["fitz"] = types.ModuleType("fitz")
        try:
            from extraer_literal_pdf import (  # type: ignore
                REEMPLAZOS_MEDICINA,
                SIGLAS_MEDICINA,
                fonetica_es,
            )
        except Exception:
            sys.modules.pop("fitz", None)
            raise

    return fonetica_es, SIGLAS_MEDICINA, REEMPLAZOS_MEDICINA


def detectar_miles_en_palabras(texto: str) -> list[re.Match[str]]:
    """Devuelve las coincidencias de miles leidos como decimal en palabras."""
    return list(MILES_PALABRAS_RE.finditer(texto))


def _limpiar_para_extracto(fragmento: str) -> str:
    """Colapsa saltos y tabulaciones para mantener el CSV en una sola linea."""
    return re.sub(r"[\r\n\t]+", " ", fragmento)


def hacer_extracto(
    texto: str, inicio: int, fin: int, max_len: int = LARGO_EXTRACTO
) -> str:
    """Extrae hasta max_len caracteres centrados en el rango [inicio, fin)."""
    if not texto:
        return ""

    inicio = max(0, min(inicio, len(texto)))
    fin = max(inicio, min(fin, len(texto)))
    limpio_total = _limpiar_para_extracto(texto)
    if len(limpio_total) <= max_len:
        return limpio_total

    centro = (inicio + fin) // 2
    mitad = max_len // 2
    start = max(0, centro - mitad)
    end = min(len(texto), start + max_len)
    start = max(0, end - max_len)
    recorte = _limpiar_para_extracto(texto[start:end])
    return recorte[:max_len]


def _primer_indice_diferencia(viejo: str, nuevo: str) -> int:
    """Devuelve el primer indice donde difieren viejo y nuevo."""
    limite = min(len(viejo), len(nuevo))
    for i in range(limite):
        if viejo[i] != nuevo[i]:
            return i
    return limite


def _extracto_nuevo_si_cambio(
    bloque: str,
    nuevo: str,
    inicio: int,
    fin: int,
    fragmento_match: str,
) -> str:
    """Muestra la ventana en nuevo si normalizar toco ese tramo; si no, lo marca."""
    if nuevo == bloque:
        return f"[sin cambio] {fragmento_match}"[:LARGO_EXTRACTO]

    patron = re.compile(re.escape(fragmento_match), re.IGNORECASE)
    conteo_viejo = len(patron.findall(bloque))
    conteo_nuevo = len(patron.findall(nuevo))
    if conteo_nuevo >= conteo_viejo and conteo_nuevo > 0:
        return f"[sin cambio] {fragmento_match}"[:LARGO_EXTRACTO]

    return hacer_extracto(nuevo, inicio, fin)


def _ubicar_ejemplo(texto: str, ejemplo: str) -> tuple[int, int]:
    """Busca la primera ocurrencia de ejemplo en texto (exacta o insensible a caso)."""
    if not ejemplo:
        return 0, min(len(texto), 20)
    idx = texto.find(ejemplo)
    if idx != -1:
        return idx, idx + len(ejemplo)
    m = re.search(re.escape(ejemplo), texto, flags=re.IGNORECASE)
    if m:
        return m.start(), m.end()
    return 0, min(len(texto), 20)


def _parsear_mensaje_revisar(msg: str) -> tuple[str, str]:
    """Extrae categoria y primer ejemplo desde un mensaje de fonetica_es.revisar."""
    tipo = msg.split(" (", 1)[0].strip()
    primer_ej = ""
    if ": " in msg:
        cola = msg.split(": ", 1)[1]
        primer_ej = cola.split(", ", 1)[0].strip()
    return tipo, primer_ej


def analizar_bloque(
    nombre_archivo: str,
    num_bloque: int,
    bloque: str,
    normalizar_fn: Callable[..., str],
    revisar_fn: Callable[..., list[str]],
    siglas=(),
    reemplazos=(),
) -> tuple[list[HallazgoBloque], bool]:
    """
    Aplica normalizar y revisar a un bloque.
    Devuelve (lista_de_hallazgos, tiene_miles_como_decimal).
    """
    bloque_str = f"{num_bloque:03d}"
    nuevo = normalizar_fn(
        bloque,
        siglas=siglas,
        reemplazos=reemplazos,
        notas_al_pie=True,
    )

    hallazgos: list[HallazgoBloque] = []
    tiene_miles = False

    # 1. Miles ya escritos en palabras como decimal ("un coma cinco cero cero")
    coincidencias_miles = detectar_miles_en_palabras(bloque)
    if coincidencias_miles:
        tiene_miles = True
        m = coincidencias_miles[0]
        hallazgos.append(
            HallazgoBloque(
                archivo=nombre_archivo,
                bloque=bloque_str,
                tipo_problema="miles leídos como decimal",
                extracto_viejo=hacer_extracto(bloque, m.start(), m.end()),
                extracto_nuevo=_extracto_nuevo_si_cambio(
                    bloque, nuevo, m.start(), m.end(), m.group(0)
                ),
            )
        )

    # 2. Cambios al re-normalizar con la pieza nueva
    if nuevo != bloque:
        k = _primer_indice_diferencia(bloque, nuevo)
        hallazgos.append(
            HallazgoBloque(
                archivo=nombre_archivo,
                bloque=bloque_str,
                tipo_problema="cambio en normalizar",
                extracto_viejo=hacer_extracto(bloque, k, k + 20),
                extracto_nuevo=hacer_extracto(nuevo, k, k + 20),
            )
        )

    # 3. Errores ya escritos en palabras detectados por revisar()
    probs_bloque = revisar_fn(bloque, siglas=siglas)
    probs_nuevo = revisar_fn(nuevo, siglas=siglas) if nuevo != bloque else probs_bloque
    tipos_en_nuevo = {_parsear_mensaje_revisar(p)[0] for p in probs_nuevo}

    tipos_vistos: set[str] = set()
    combinados: list[tuple[str, bool]] = [(p, False) for p in probs_bloque]
    for p in probs_nuevo:
        tipo_p, _ = _parsear_mensaje_revisar(p)
        if tipo_p not in {_parsear_mensaje_revisar(x)[0] for x in probs_bloque}:
            combinados.append((p, True))

    for msg, solo_en_nuevo in combinados:
        tipo_rev, primer_ej = _parsear_mensaje_revisar(msg)
        if tipo_rev in tipos_vistos:
            continue
        tipos_vistos.add(tipo_rev)

        fuente_busqueda = nuevo if solo_en_nuevo else bloque
        ini, fin = _ubicar_ejemplo(fuente_busqueda, primer_ej)
        if solo_en_nuevo and len(nuevo) > 0:
            pos_aprox = round(ini * len(bloque) / len(nuevo))
            ev = hacer_extracto(bloque, pos_aprox, pos_aprox + (fin - ini))
        else:
            ev = hacer_extracto(bloque, ini, fin)

        if solo_en_nuevo or tipo_rev in tipos_en_nuevo:
            en = f"[sin cambio] {primer_ej or tipo_rev}"[:LARGO_EXTRACTO]
        else:
            en = hacer_extracto(nuevo, ini, fin)

        hallazgos.append(
            HallazgoBloque(
                archivo=nombre_archivo,
                bloque=bloque_str,
                tipo_problema=f"revisar: {tipo_rev}",
                extracto_viejo=ev,
                extracto_nuevo=en,
            )
        )

    # 4. Variantes de "coma un" con entero distinto de "un"/"veintiun" ("dos coma un")
    remanentes_coma_un = [
        m
        for m in COMA_UN_RE.finditer(bloque)
        if not _UN_COMA_INICIO_RE.match(m.group(0))
    ]
    if remanentes_coma_un:
        m = remanentes_coma_un[0]
        hallazgos.append(
            HallazgoBloque(
                archivo=nombre_archivo,
                bloque=bloque_str,
                tipo_problema="revisar: Uso de 'coma un'",
                extracto_viejo=hacer_extracto(bloque, m.start(), m.end()),
                extracto_nuevo=_extracto_nuevo_si_cambio(
                    bloque, nuevo, m.start(), m.end(), m.group(0)
                ),
            )
        )

    return hallazgos, tiene_miles


def analizar_archivo_md(
    ruta_md: Path,
    normalizar_fn: Callable[..., str],
    revisar_fn: Callable[..., list[str]],
    siglas=(),
    reemplazos=(),
) -> tuple[list[HallazgoBloque], ResumenArchivo]:
    """Corta un archivo *_LITERAL_TTS.md en bloques y analiza cada uno."""
    with open(ruta_md, "r", encoding="utf-8") as f:
        contenido = f.read()

    bloques = dividir_capitulo_en_bloques(contenido, max_palabras=MAX_PALABRAS_BLOQUE)
    hallazgos_archivo: list[HallazgoBloque] = []
    bloques_afectados = 0
    bloques_miles = 0

    for i, bloque in enumerate(bloques, start=1):
        hallazgos_b, tiene_miles = analizar_bloque(
            nombre_archivo=ruta_md.name,
            num_bloque=i,
            bloque=bloque,
            normalizar_fn=normalizar_fn,
            revisar_fn=revisar_fn,
            siglas=siglas,
            reemplazos=reemplazos,
        )
        if hallazgos_b:
            bloques_afectados += 1
            hallazgos_archivo.extend(hallazgos_b)
        if tiene_miles:
            bloques_miles += 1

    resumen = ResumenArchivo(
        archivo=ruta_md.name,
        bloques_totales=len(bloques),
        bloques_afectados=bloques_afectados,
        bloques_miles_decimal=bloques_miles,
    )
    return hallazgos_archivo, resumen


def resolver_archivos_md(
    ruta_motor_audio: Path, nombre_md: str | None = None
) -> list[Path]:
    """Localiza los archivos *_LITERAL_TTS.md a analizar a partir de _MOTOR_AUDIO."""
    dir_textos = ruta_motor_audio.resolve().parent / "_TEXTO_LITERAL_VERIFICADO"

    if nombre_md is None:
        if not dir_textos.is_dir():
            raise FileNotFoundError(
                f"No existe la carpeta de textos verificados: {dir_textos}"
            )
        archivos = sorted(dir_textos.glob("*_LITERAL_TTS.md"))
        if not archivos:
            raise FileNotFoundError(
                f"No se encontraron archivos *_LITERAL_TTS.md en: {dir_textos}"
            )
        return archivos

    candidato = Path(nombre_md)
    if candidato.is_file():
        return [candidato.resolve()]

    en_textos = dir_textos / nombre_md
    if en_textos.is_file():
        return [en_textos.resolve()]

    if not nombre_md.endswith(".md"):
        con_ext = dir_textos / f"{nombre_md}.md"
        if con_ext.is_file():
            return [con_ext.resolve()]

    raise FileNotFoundError(
        f"No se encontro el archivo '{nombre_md}' ni en '{dir_textos}'"
    )


def escribir_csv(ruta_csv: Path, hallazgos: list[HallazgoBloque]) -> None:
    """Escribe bloques_afectados.csv en UTF-8 con las columnas requeridas."""
    ruta_csv.parent.mkdir(parents=True, exist_ok=True)
    with open(ruta_csv, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(
            [
                "archivo",
                "bloque",
                "tipo_problema",
                "extracto_viejo",
                "extracto_nuevo",
            ]
        )
        for h in hallazgos:
            writer.writerow(
                [
                    h.archivo,
                    h.bloque,
                    h.tipo_problema,
                    h.extracto_viejo,
                    h.extracto_nuevo,
                ]
            )


def formatear_resumen(resumenes: list[ResumenArchivo]) -> str:
    """Genera el texto de resumen por archivo y total."""
    lineas = [
        "Resumen por archivo:",
        f"{'Archivo':<48} | {'Totales':>7} | {'Afectados':>9} | {'Miles como decimal':>18}",
        "-" * 91,
    ]
    total_bloques = 0
    total_afectados = 0
    total_miles = 0

    for r in resumenes:
        total_bloques += r.bloques_totales
        total_afectados += r.bloques_afectados
        total_miles += r.bloques_miles_decimal
        lineas.append(
            f"{r.archivo:<48} | {r.bloques_totales:>7} | {r.bloques_afectados:>9} | {r.bloques_miles_decimal:>18}"
        )

    if len(resumenes) > 1:
        lineas.append("-" * 91)
        lineas.append(
            f"{'TOTAL':<48} | {total_bloques:>7} | {total_afectados:>9} | {total_miles:>18}"
        )

    return "\n".join(lineas)


def ejecutar(
    ruta_motor_audio: Path,
    nombre_md: str | None = None,
    ruta_csv: Path = Path(NOMBRE_CSV_DEFECTO),
) -> tuple[list[HallazgoBloque], list[ResumenArchivo]]:
    """Ejecuta el analisis completo sobre los .md y genera el CSV de salida."""
    fonetica_es, siglas, reemplazos = cargar_herramientas_fonetica(ruta_motor_audio)
    archivos = resolver_archivos_md(ruta_motor_audio, nombre_md)

    todos_hallazgos: list[HallazgoBloque] = []
    resumenes: list[ResumenArchivo] = []

    for ruta_md in archivos:
        hallazgos, resumen = analizar_archivo_md(
            ruta_md=ruta_md,
            normalizar_fn=fonetica_es.normalizar,
            revisar_fn=fonetica_es.revisar,
            siglas=siglas,
            reemplazos=reemplazos,
        )
        todos_hallazgos.extend(hallazgos)
        resumenes.append(resumen)

    escribir_csv(ruta_csv, todos_hallazgos)
    return todos_hallazgos, resumenes


def main(argv: list[str] | None = None) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")

    parser = argparse.ArgumentParser(
        description=(
            "Lista los bloques *_LITERAL_TTS.md cuyo texto cambia o presenta "
            "problemas con la pieza fonetica nueva (sin sintetizar audio)."
        )
    )
    parser.add_argument(
        "ruta_motor_audio",
        help="Ruta a la carpeta _MOTOR_AUDIO",
    )
    parser.add_argument(
        "nombre_md",
        nargs="?",
        default=None,
        help="Nombre opcional de un archivo *_LITERAL_TTS.md puntual",
    )
    parser.add_argument(
        "--salida",
        default=NOMBRE_CSV_DEFECTO,
        help=f"Ruta del CSV de salida (por defecto: {NOMBRE_CSV_DEFECTO})",
    )
    args = parser.parse_args(argv)

    try:
        hallazgos, resumenes = ejecutar(
            ruta_motor_audio=Path(args.ruta_motor_audio),
            nombre_md=args.nombre_md,
            ruta_csv=Path(args.salida),
        )
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(formatear_resumen(resumenes))
    print(f"\nCSV generado: {Path(args.salida).resolve()} ({len(hallazgos)} filas)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
