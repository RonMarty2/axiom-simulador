# -*- coding: utf-8 -*-
"""Protocolo único de aceptación de audiolibros (12 revisiones).

Solo detecta y reporta; no reescribe libros ni regraba audios.
Revisiones 1 a 8 sobre el TEXTO; revisiones 9 a 12 sobre el AUDIO (opcional).
Si algo no se puede revisar, se informa «sin revisar», nunca como bueno.
"""

from __future__ import annotations

import argparse
import difflib
import json
import os
import re
import subprocess
import sys
import tempfile
import types
import unicodedata
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any, Callable


# ============================================================================
# UMBRALES Y CONSTANTES DE ACEPTACIÓN (visibles al principio, con comentario)
# ============================================================================

# Revisión 1 y 2 (literalidad y omisiones contra *_texto_paginas.txt):
NGRAM_LITERALIDAD = 4  # Tamaño de n-grama en palabras normalizadas para alinear texto y PDF.
UMBRAL_LITERALIDAD_PARRAFO = 0.90  # Cobertura mínima (90 %) de n-gramas del párrafo presentes en el PDF.
UMBRAL_VOCABULARIO_TABLA_FORMULA = 0.80  # Cobertura mínima (80 %) de vocabulario sustantivo en tablas narradas y fórmulas verbalizadas.
UMBRAL_OMISION_PARRAFO = 0.85  # Cobertura mínima (85 %) de un párrafo del PDF en el texto TTS para no considerarlo omitido.
MIN_TOKENS_PARRAFO_LITERALIDAD = 4  # Mínimo de tokens normalizados para evaluar por n-gramas; por debajo se exige coincidencia exacta de secuencia.
MIN_TOKENS_PARRAFO_OMISION = 12  # Párrafos del PDF más cortos (etiquetas sueltas, títulos de columna) no disparan omisión por sí solos.
MIN_ANCHOR_COBERTURA = 0.50  # Cobertura mínima para anclar inicio/fin del capítulo dentro de un PDF completo.

# Revisión 7 (títulos en línea aparte, regla 18):
MIN_PALABRAS_EXIGIR_TITULOS = 500  # Si el capítulo supera estas palabras sin ninguna línea de título propia, se reporta falla.

# Revisión 9 (Whisper pista entera contra texto):
WHISPER_MODELO = "small"  # Modelo faster_whisper exigido por el protocolo.
WHISPER_DEVICE = "cpu"  # Dispositivo de ejecución local estable en Windows.
WHISPER_COMPUTE_TYPE = "int8"  # Cuantización para CPU.
MAX_DISCREPANCIA_WHISPER_PALABRAS = 3  # Discrepancias de más de 3 palabras se listan como falla.

# Revisión 10 (cortes por subtítulo, regla 17):
MIN_DURACION_PARTE_MIN = 3.0  # Duración mínima en minutos para una parte (no aplica a *_Completo_*).
MAX_DURACION_PARTE_MIN = 20.0  # Duración máxima en minutos para una parte (no aplica a *_Completo_*).
VENTANA_CORTE_SEG = 15.0  # Segundos iniciales y finales revisados en cada parte.
UMBRAL_DESVANECIDO_DB = 6.0  # Caída de dB en el último segundo de voz frente a los 2 s previos que indica fade-out.
MAX_SILENCIO_BORDE_SEG = 3.0  # Silencio inicial o final excesivo en una parte.

# Revisión 11 (volumen y silencios con ffmpeg):
UMBRAL_SILENCIO_DB = -40.0  # Nivel por debajo del cual silencedetect considera silencio.
MAX_SILENCIO_INTERNO_SEG = 3.0  # Silencio interno máximo permitido en segundos.
MIN_VOLUMEN_MEDIO_DB = -35.0  # Volumen medio mínimo aceptable (audio demasiado bajo o casi mudo).
MAX_VOLUMEN_MEDIO_DB = -8.0  # Volumen medio máximo aceptable.
MAX_VOLUMEN_PICO_CLIPPING_DB = -0.1  # Pico desde el cual se considera saturación / clipping.
MAX_SALTO_VOLUMEN_DB = 8.0  # Diferencia máxima en dB entre segmentos del mismo audio o entre partes.
NUM_VENTANAS_SALTO_VOLUMEN = 6  # Cantidad de ventanas de muestreo para detectar saltos bruscos de volumen.
DURACION_VENTANA_VOLUMEN_SEG = 20.0  # Duración de cada ventana de muestreo de volumen.

# Revisión 12 (voz y modelo únicos por libro, regla 11):
VOZ_OFICIAL = "Puck"  # Voz fija de Gemini TTS.
MODELO_TTS_OFICIAL = "gemini-3.1-flash-tts-preview"  # Modelo fijo de Gemini TTS.

# Reporte:
MAX_EJEMPLOS = 10  # Máximo de ejemplos mostrados por revisión en la tabla e informe.


# ============================================================================
# RUTAS Y SIGLAS DE REFERENCIA
# ============================================================================

DIR_SCRIPT = Path(__file__).resolve().parent
DIR_ACEPTACION_DEFECTO = DIR_SCRIPT / "aceptacion"
RUTA_SIGLAS_CLASIFICADAS = DIR_SCRIPT / "siglas_clasificadas.json"
RUTA_HERRAMIENTAS_CENTRAL = Path(
    r"C:\Users\lmigu\SynologyDrive\12.NUBES\_AGENTES_CENTRAL\herramientas"
)

SIGLAS_BASE = [
    "ADN", "ARN", "ATP", "VIH", "SIDA", "LPS", "PCR", "MET", "MEB", "FISH", "ELISA",
    "HPV", "SPSS", "ANOVA", "OMS", "OPS", "ECJ", "GAG", "WBC", "TEM", "AMPc",
    "ARNm", "ARNt", "ARNr", "ADNbc", "ADNmc", "ARNmc", "ARNbc", "KDA",
]

ROMANOS_IGNORAR = frozenset({
    "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
    "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI",
})

PALABRAS_MAYUS_IGNORAR = frozenset({
    "FIGURA", "FIGURAS", "TABLA", "TABLAS", "CUADRO", "CUADROS",
    "PARTE", "CAPITULO", "CAPÍTULO", "TITULO", "TÍTULO", "SECCION", "SECCIÓN",
    "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ",
    "EL", "LA", "LOS", "LAS", "UN", "UNA", "DE", "DEL", "EN", "CON", "SIN", "POR",
    "PARA", "QUE", "COMO", "MAS", "MÁS", "ES", "SON", "AL", "SE", "SU", "NO", "SI",
    "YA", "EE", "UU", "DR", "DRA", "SR", "SRA",
})

PALABRAS_NUMERO = frozenset({
    "cero", "un", "uno", "una", "unos", "unas", "dos", "tres", "cuatro", "cinco",
    "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce",
    "quince", "dieciseis", "diecisiete", "dieciocho", "diecinueve", "veinte",
    "veintiuno", "veintiun", "veintiuna", "veintidos", "veintitres", "veinticuatro",
    "veinticinco", "veintiseis", "veintisiete", "veintiocho", "veintinueve",
    "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa",
    "cien", "ciento", "cientos", "doscientos", "doscientas", "trescientos",
    "trescientas", "cuatrocientos", "cuatrocientas", "quinientos", "quinientas",
    "seiscientos", "seiscientas", "setecientos", "setecientas", "ochocientos",
    "ochocientas", "novecientos", "novecientas", "mil", "millon", "millones",
    "coma", "punto",
})

PALABRAS_SIMBOLO_NORM = frozenset({
    "mas", "menos", "por", "ciento", "igual", "distinto", "menor", "mayor",
    "aproximadamente", "raiz", "cuadrada", "cuadrado", "cubo",
    "micrometro", "micrometros", "microlitro", "microlitros", "microgramo",
    "microgramos", "nanometro", "nanometros", "angstrom", "angstroms",
    "milimetro", "milimetros", "centimetro", "centimetros", "mililitro",
    "mililitros", "miligramo", "miligramos", "grado", "grados", "celsius",
    "fahrenheit", "positivo", "negativo",
})

PALABRAS_EXCLUIDAS_NGRAM = PALABRAS_NUMERO | PALABRAS_SIMBOLO_NORM


# ============================================================================
# EXPRESIONES REGULARES POR REVISIÓN
# ============================================================================

_ETIQUETA_VOZ_RE = re.compile(r"<[a-z]+(?: [a-z]+)*>")
_PAGINA_MARCA_RE = re.compile(r"^\s*={3,}\s*P[ÁA]GINA\s+\d+\s*={3,}\s*$", re.IGNORECASE)
_SOLO_DIGITOS_PAG_RE = re.compile(r"^\s*\d{1,4}\s*$")
_RE_COLAPSAR_SIGLA_ESPACIADA = re.compile(
    r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])(?:[A-Z]\s+){1,6}[A-Z](?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])"
)
_RE_TOKEN_ALFA = re.compile(r"[a-zñ]+")

# Revisión 3: Relleno leído (bibliografía, autoevaluación, glosario, créditos, encabezados/portada)
_REV3_BIBLIO_HEADING_RE = re.compile(
    r"(?im)^\s*(?:bibliograf[ií]a|lecturas\s+recomendadas|referencias\s+bibliogr[aá]ficas|lista\s+de\s+referencias)\b"
    r"|(?i:\b(?:lecturas\s+recomendadas|referencias\s+bibliogr[aá]ficas)\b)",
)
_REV3_BIBLIO_CITA_RE = re.compile(
    r"(?i:\bet\s+al\.?\b)"
    r"|(?i:\bI\s*S\s*B\s*N\b|\bISBN\b)"
    r"|(?i:\b(?:elsevier|mcgraw[\s-]*hill|scientific\s+american\s+books|panamericana(?!\s+de\s+la\s+salud)|lippincott|springer|wiley|saunders|mosby|masson)\b)"
    r"|(?i:\b(?:primera|segunda|tercera|cuarta|quinta|sexta|s[eé]ptima|octava|novena|d[eé]cima|\d+[.ªº])\s+edici[oó]n\b)"
    r"|\b[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-Z]{1,3}|,\s*[A-Z]\.(?:\s*[A-Z]\.)?)\s*,\s*(?:[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\s+[A-Z]{1,3}|[A-Z]\.)[^.\n]{0,120}\b(?:19\d{2}|20\d{2}|(?i:mil\s+novecientos|dos\s+mil))\b"
    r"|\(\s*(?:19\d{2}|20\d{2})\s*\)[.;]?"
    r"|(?i:\bpp?\.\s*\d+\s*[-–a]\s*\d+\b)",
)
_REV3_AUTOEVAL_RE = re.compile(
    r"\bpreguntas?\s+de\s+autoevaluaci[oó]n\b"
    r"|\bautoevaluaci[oó]n\b"
    r"|\bantes\s+de\s+proseguir\b"
    r"|\bpara\s+la\s+reflexi[oó]n\b"
    r"|\bejercicios?\s+de\s+aplicaci[oó]n\b"
    r"|\bgu[ií]a\s+de\s+estudio\b"
    r"|\brespuesta\s+correcta\b"
    r"|\bcuestionario\b"
    r"|\bresponda\s+(?:a\s+)?las\s+siguientes\s+preguntas\b"
    r"|\b(?:todas|ninguna|nada)\s+de\s+l[oa]s?\s+anteriores?\b"
    r"|\blas\s+respuestas\s+[A-E]\s+y\s+[A-E]\s+son\b",
    re.IGNORECASE,
)
_REV3_TEMAS_CONEXION_RE = re.compile(r"^\s*Temas de conexi[oó]n\b.*$", re.IGNORECASE | re.MULTILINE)
_REV3_GLOSARIO_RE = re.compile(
    r"(?im)^\s*glosario\b|(?i:\bglosario\s+de\s+t[eé]rminos\b)",
)
_REV3_CREDITO_RE = re.compile(
    r"(?i:\bilustraci[oó]n\s+(?:de\b|d,\s+(?-i:[A-ZÁÉÍÓÚÑ])))"
    r"|(?i:\b(?:fotograf[ií]a|imagen|dibujo|esquema)\s+(?:de\s+(?-i:[A-ZÁÉÍÓÚÑ])|procedente\s+de|tomad[oa]\s+de|cortes[ií]a\s+de))"
    r"|(?i:\b(?:tomad[oa]|adaptad[oa]|modificad[oa]|reproducid[oa]|procedente)\s+de\s*(?::|\s*(?-i:[A-ZÁÉÍÓÚÑ]\.\s*[A-ZÁÉÍÓÚÑ])))"
    r"|(?:^|[.\n])\s*(?i:fuente|cr[eé]ditos)\s*:"
    r"|©|(?i:\bcopyright\b|\bderechos\s+reservados\b)",
)
_NUM_NOTA_2_50_PAT = (
    r"(?i:cincuenta"
    r"|(?:treinta|cuarenta)\s+y\s+(?:uno|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)"
    r"|treinta|cuarenta"
    r"|veinti(?:uno|[uú]n|d[oó]s|tr[eé]s|cuatro|cinco|s[eé]is|siete|ocho|nueve)|veinte"
    r"|diecis[eé]is|diecisiete|dieciocho|diecinueve|quince|catorce|trece|doce|once|diez"
    r"|nueve|ocho|siete|seis|cinco|cuatro|tres|dos)"
)
_REV3_ENCABEZADO_RE = re.compile(
    r"(?m)^\s*PARTE\s+(?:UNO|DOS|TRES|CUATRO|CINCO|I|II|III|IV|V|\d+)\s+[A-ZÁÉÍÓÚÑ][^\n]{2,60}$"
    r"|\b(?:Alfonso\s+Calvo|Kenneth\s+Saladin|Posada\s+Hern[aá]ndez)\b"
    r"|\b(?:Table\s+of\s+Contents|P[aá]gina\s+de\s+cr[eé]ditos|Regulaci[oó]n\s+y\s+mantenimiento\s+lun[aá]tico)\b",
)
_REV3_PARTE_INCRUSTADA_RE = re.compile(
    r"(?<![A-ZÁÉÍÓÚÜÑ])PARTE\s+(?:UNO|DOS|TRES|CUATRO|CINCO)\s+"
    r"(?:Organizaci[oó]n\s+(?:corporal|del\s+cuerpo)"
    r"|Soporte\s+y\s+movimiento"
    r"|Integraci[oó]n\s+y\s+control\s+interno"
    r"|Regulaci[oó]n\s+y\s+mantenimiento"
    r"|Reproducci[oó]n\s+y\s+desarrollo)"
)
_REV3_CAPITULO_REPETIDO_RE = re.compile(
    rf"(?<![A-ZÁÉÍÓÚÜÑ])CAP[ÍI]TULO\s+(?:{_NUM_NOTA_2_50_PAT}|(?i:uno|un))\s+[A-ZÁÉÍÓÚÜÑ][^\n]{{2,90}}"
)
_REV3_VINYETA_AUTOEVAL_RE = re.compile(r"●[ \t]*[^\n]{0,120}")

# Revisión 4: Notas al pie
_REV4_LLAMADA_DIGITO_RE = re.compile(
    r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])([a-záéíóúüñ]{4,})\d{1,2}(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d.,+\-−°%‰])"
)
_REV4_LLAMADA_PUNT_RE = re.compile(
    r"(?<=[A-Za-zÁÉÍÓÚÜÑáéíóúüñ»”\"')\]][.,:])"
    r"(?:\d{1,2}|un|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|diecis[eé]is|diecisiete|dieciocho|diecinueve|veinte)"
    r"(?=\s|$|[.,;:])"
)
_REV4_LLAMADA_SUP_RE = re.compile(
    r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ.,;:)][¹²³⁴⁵⁶⁷⁸⁹\*†‡]+(?=\s|$|[.,;:])"
)
_REV4_ANCLA_INICIO_UNO = r"(?:^|(?<=\n)|(?<=[.!?;:])|(?<=[.!?;:] )|(?<=  ))"
_REV4_NUM_NOTA_PAT = (
    rf"(?:{_REV4_ANCLA_INICIO_UNO}(?:\d{{1,2}}|[Uu]no|un)|(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ]){_NUM_NOTA_2_50_PAT})"
)
_REV4_CLAUSULA_ETIM_PAT = (
    r"(?!(?:es|son|era|eran|sea|sean|ser|fue|fueron|est[aá]n?|coma|punto|por|m[aá]s|menos|entre|sobre|veces)\b)"
    r"[a-záéíóúüñ]{2,20}(?:-[a-záéíóúüñ]{1,15})?"
    r"(?:\s*(?:,|o|y)\s*[a-záéíóúüñ]{2,18})?"
    r"\s+(?i:igual\s+a|=)\s+"
    r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][^.;\n]{0,110}"
)
_REV4_NOMBRE_BIO_TOKEN = (
    r"(?:[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ'\-]*\.?|(?:de|del|la|las|los|van|von|da|di|du|le|y))"
)
_REV4_NOMBRE_BIO_PAT = (
    rf"[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ'\-]*\.?(?:\s+{_REV4_NOMBRE_BIO_TOKEN}){{1,6}}"
)
_REV4_PAL_ANIO_PAT = (
    r"(?:mil|cien|ciento|doscientos|trescientos|cuatrocientos|quinientos|"
    r"seiscientos|setecientos|ochocientos|novecientos|"
    r"diez|once|doce|trece|catorce|quince|diecis[eé]is|diecisiete|dieciocho|diecinueve|"
    r"veinte|veinti(?:uno|una|[uú]n|d[oó]s|tr[eé]s|cuatro|cinco|s[eé]is|siete|ocho|nueve)|"
    r"treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa|"
    r"uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|"
    r"y|al|de|del|en|antes|despu[eé]s|Cristo|presente|hacia|circa|aproximadamente|\d{3,4})"
)
_REV4_ANIOS_BIO_PAT = (
    rf"(?:(?:hacia|circa|aproximadamente)\s+)?"
    rf"(?:mil\s+(?:[a-záéíóúüñ]+\s+){{0,6}}(?:a|al)\s+(?:mil|dos\s+mil|el\s+presente|presente)(?:\s+{_REV4_PAL_ANIO_PAT}){{0,8}}"
    rf"|mil(?:\s+{_REV4_PAL_ANIO_PAT}){{1,8}}"
    rf"|(?:{_REV4_PAL_ANIO_PAT}\s+){{1,6}}a\s+(?:{_REV4_PAL_ANIO_PAT}\s+){{1,6}}(?:antes|despu[eé]s)\s+de\s+Cristo"
    rf"|\d{{3,4}}\s*[-–a]\s*\d{{3,4}})"
)
_REV4_GLOSA_PIE_RE = re.compile(
    rf"{_REV4_NUM_NOTA_PAT}\s+{_REV4_CLAUSULA_ETIM_PAT}(?:;\s*{_REV4_CLAUSULA_ETIM_PAT})*[.;]"
    rf"|{_REV4_NUM_NOTA_PAT}\s+{_REV4_NOMBRE_BIO_PAT},\s*{_REV4_ANIOS_BIO_PAT},\s*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][^.\n]{{2,120}}\."
)

# Revisión 5: Figuras y tablas
_NUM_PAL_PAT = (
    r"(?:cero|uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|"
    r"diez|once|doce|trece|catorce|quince|diecis[eé]is|diecisiete|dieciocho|diecinueve|"
    r"veinte|veintiuno|veintid[oó]s|treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa)"
)
_NUM_EXPR_PAT = rf"(?:\d+(?:[.\-–—−]\d+)*|(?:{_NUM_PAL_PAT})(?:\s+(?:punto|coma|a|y|{_NUM_PAL_PAT}))*)"
_REV5_REF_VISUAL_RE = re.compile(
    rf"\b(?:ver|v[eé]ase|v[eé]anse|obs[eé]rvese|cons[uú]ltese|v\.|cf\.)\s+(?:tamb[ií][eé]n\s+)?(?:las?\s+|los?\s+|el\s+)?(?:fi\s*guras?|figs?\.|tablas?|cuadros?)\b"
    rf"|\bcomo\s+(?:se\s+)?(?:ve|observa|muestra|indica|ilustra|aprecia|representa|resume|detalla)\s+en\s+(?:las?\s+|el\s+)?(?:fi\s*guras?|figs?\.|tablas?|cuadros?|imagen)\b"
    rf"|\bcomo\s+se\s+observa\b"
    rf"|\bcomo\s+(?:ves|puedes\s+ver)\b"
    rf"|\bfigs?\.\s*{_NUM_EXPR_PAT}\b"
    rf"|\(\s*(?:(?:v\.|cf\.)\s*)?(?:fi\s*guras?|tablas?|cuadros?)\s+{_NUM_EXPR_PAT}"
    rf"|\b(?:en\s+la|la|en\s+el|el)\s+(?:fi\s*gura|tabla|cuadro)\s+{_NUM_EXPR_PAT}\b",
    re.IGNORECASE,
)
_REV5_IMAGEN_PENDIENTE_RE = re.compile(r"\[IMAGEN\s+p[áa]g", re.IGNORECASE)
_REV5_TABLA_MD_RE = re.compile(r"(?m)^\s*\|.+\|.+\|\s*$")
_REV5_AUMENTO_VISUAL_RE = re.compile(
    r"×\s*(?:\d+|cien|doscient[oa]s|cuatrocient[oa]s|mil)\b"
    r"|\b(?:flecha|punta\s+de\s+flecha|panel\s+(?:superior|inferior|izquierdo|derecho)|arriba\s+a\s+la\s+(?:izquierda|derecha))\b",
    re.IGNORECASE,
)

# Revisión 6: Símbolos, iones, fórmulas, unidades, griegas, miles
_REV6_GRIEGAS_RE = re.compile(r"[\u0370-\u03ff\u1f00-\u1fff\u00b5\u2206\u2126]")
_REV6_SIMBOLOS_RE = re.compile(r"[<>≤≥=≠%％‰+±×÷/\\*(){}[\]√Σ≈∼~°^#_]")
_REV6_SUPER_SUB_RE = re.compile(r"[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿⁱ₀₁₂₃₄₅₆₇₈₉]")
_REV6_ION_SIMBOLO_RE = re.compile(
    r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])(?:[A-Z][a-z]?\d*)+[⁰¹²³⁴⁵⁶⁷⁸⁹]*[+−⁺⁻]"
    r"|(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])(?:Na|Ca|Cl|Mg|Fe|Zn|Cu|K|H|HCO3|SO4|PO4|NH4)[-–](?=\s|,|\.|$)"
)
_REV6_ION_MAL_LEIDO_RE = re.compile(
    r"\b(?:NA|CA|CL|MG|FE|ZN|CU|NH|SO|PO|HCO)\d*\s+(?:m[aá]s|menos)\b"
    r"|\b(?:NA|CA|CL|MG|FE|ZN|CU)\s+(?:uno|dos|tres)\s+(?:m[aá]s|menos)\b"
    r"|\b[A-Z]{1,2}\d+\s+(?:m[aá]s|menos)\b"
)
_REV6_FORMULA_IGUALA_RE = re.compile(
    r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])[b-df-hj-np-tv-xzA-Zα-ωΑ-Ω]\s+(?i:iguala)\b"
    r"|\b(?i:iguala)\s+(?i:constante|la\s+constante|cero|un[oa]?|dos|tres|\d)\b",
)
_REV6_COMA_CERO_CERO_RE = re.compile(
    r"\bcoma\s+(?:cero\s+cero\s+cero|\w+\s+cero\s+cero)\b",
    re.IGNORECASE,
)
_REV6_MILES_PALABRAS_RE = re.compile(  # 22-11: [ \t] no cruza líneas; excluye "cero coma...", decimales de 4+ cifras y negativos ("menos ...")
    rf"(?<!\bmenos[ \t])\b(?!cero[ \t]+coma\b){_NUM_PAL_PAT}(?:[ \t]+{_NUM_PAL_PAT})*[ \t]+coma[ \t]+"
    r"(?:cero|uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)[ \t]+"
    r"(?:cero|uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)[ \t]+"
    r"(?:cero|uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)\b"
    r"(?![ \t]+(?:cero|uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)\b)",
    re.IGNORECASE,
)
_REV6_UN_COMA_RE = re.compile(r"\b(?:un|veinti[uú]n)\s+coma\b", re.IGNORECASE)
_REV6_CONCORDANCIA_UN_RE = re.compile(
    r"(?<!\by\s)\bun\s+(?:micr[oó]metros|mil[ií]metros|cent[ií]metros|nan[oó]metros|gramos|litros|kilogramos|miligramos|mililitros|grados)\b",
    re.IGNORECASE,
)
_REV6_UNIDADES_SUELTAS_RE = re.compile(
    r"\b(?:nm|μm|µm|mg|ml|mL|mm|cm|kg|mmHg|kPa|MHz|kHz|kDa|KDA|pH)\b"
)

# Revisión 7: Siglas, números de sección y títulos
_REV7_SECCION_DIGITOS_RE = re.compile(
    r"\b\d+\s+a\s+\d+(?:\.\d+)+\b"
    r"|\b\d+\.\d+(?:\.\d+)*\b"
    r"|^\s*\d+(?:[.\-–]\d+)*\s+[A-ZÁÉÍÓÚÑ]",
    re.M,
)
_REV7_SECCION_WHISPER_RE = re.compile(
    r"\b\d+\s+a\s+\d+(?:\.\d+)+\b"
    r"|\b\d+\.\d+\.\d+\b"
)
_REV7_SECCION_COMA_RE = re.compile(
    rf"(?m)(?:^|[.!?]\s+){_NUM_PAL_PAT}\s+coma\s+{_NUM_PAL_PAT}(?:\s+coma\s+{_NUM_PAL_PAT})*\s+[A-ZÁÉÍÓÚÑ]"
)
_REV7_TITULO_PEGADO_RE = re.compile(
    # [ \t]+ y no \s+: un título que ya empieza en línea nueva NO está pegado (regla 18).
    r"(?<=[.!?])[ \t]+(?:Objetivos\s+de\s+aprendizaje|Resultados\s+esperados\s+del\s+aprendizaje|FIGURA\s+|CUADRO\s+|TABLA\s+)"
    rf"|(?<=[.!?])[ \t]+{_NUM_PAL_PAT}\s+(?:punto|coma)\s+{_NUM_PAL_PAT}\s+[A-ZÁÉÍÓÚÑ]"
)
_REV7_RECUADRO_PEGADO_RE = re.compile(
    r"CONOCIMIENTO\s+M[ÁA]S\s+A\s+FONDO\b"
    r"|(?<=[^\n])Conocimiento\s+m[áa]s\s+a\s+fondo\s+[^.\n]+\.\s+(?:Medicina\s+evolutiva|Aplicaci[oó]n\s+cl[ií]nica|Historia\s+m[eé]dica)\s*:"
)
_REV7_SIGLA_CAPS_RE = re.compile(r"\b[A-Z]{2,6}\b")

# Revisión 8: Palabras partidas y ligaduras
_REV8_CORTE_GUION_RE = re.compile(
    r"\b[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,}-\s+(?!(?:y|o|u|e|ni)\b)[a-záéíóúüñ]{2,}[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*"
)
_REV8_LIGADURA_PARTIDA_RE = re.compile(
    r"\b(?!(?:wifi|hi-fi)\b)[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*(?:ffi|ffl|fi|fl)[ \t]+[a-záéíóúüñ]{2,}[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*",
    re.IGNORECASE,
)
_REV8_LIGADURA_UNICODE_RE = re.compile(r"[\ufb00-\ufb04]")

# Revisión 10: Cierre no narrable (consistente con medir_cierres_publicados.py)
_REV10_NO_NARRABLE_RE = re.compile(
    r"autoevaluaci|preguntas?\s+de|glosario|bibliograf|ejercicio|iguala|verdadero|falso|"
    r"describa|explique|responda|cuestionario|respuesta\s+correcta",
    re.IGNORECASE,
)


# ============================================================================
# MODELOS DE DATOS
# ============================================================================


@dataclass
class ResultadoRevision:
    """Resultado individual de una de las 12 revisiones del protocolo."""

    numero: int
    nombre: str
    sobre: str
    estado: str  # "APRUEBA" | "FALLA" | "sin revisar"
    fallas: int
    revisado: int
    unidad: str
    ejemplos: list[str] = field(default_factory=list)
    nota: str = ""


@dataclass
class ResultadoCapitulo:
    """Resultado consolidado de aceptación de un capítulo o pieza de audio."""

    capitulo: str
    ruta_texto: Path | None
    ruta_audio: Path | None
    ruta_pdf_texto: Path | None
    veredicto: str  # "APRUEBA" | "FALLA"
    detalle_veredicto: str
    revisiones: list[ResultadoRevision]
    ruta_reporte: Path | None = None


# ============================================================================
# UTILIDADES GENERALES
# ============================================================================


def _configurar_stdout_utf8() -> None:
    if sys.platform == "win32":
        for stream in (sys.stdout, sys.stderr):
            if hasattr(stream, "reconfigure"):
                stream.reconfigure(encoding="utf-8", errors="replace")


def _citar_ruta(ruta: Path | str) -> str:
    """Envuelve rutas con espacios entre comillas dobles para salidas en Windows."""
    s = str(ruta)
    return f'"{s}"' if " " in s else s


def _recortar(texto: str, max_len: int = 110) -> str:
    limpio = re.sub(r"\s+", " ", texto).strip()
    if len(limpio) <= max_len:
        return limpio
    return limpio[: max_len - 3].rstrip() + "..."


def _dedup_limitar(ejemplos: list[str], limite: int = MAX_EJEMPLOS) -> list[str]:
    vistos: set[str] = set()
    salida: list[str] = []
    for ej in ejemplos:
        limpio = _recortar(ej)
        if limpio and limpio not in vistos:
            vistos.add(limpio)
            salida.append(limpio)
            if len(salida) >= limite:
                break
    return salida


def _cargar_siglas_medicina() -> list[str]:
    """Intenta cargar SIGLAS_MEDICINA desde _MOTOR_AUDIO/extraer_literal_pdf.py; usa respaldo si falla."""
    try:
        repo = Path(__file__).resolve().parents[2]
        motor = repo / "examenes pasados" / "MEDICINA" / "LIBROS DE MEDICINA" / "_MOTOR_AUDIO"
        ruta_mod = motor / "extraer_literal_pdf.py"
        if ruta_mod.is_file():
            if RUTA_HERRAMIENTAS_CENTRAL.is_dir() and str(RUTA_HERRAMIENTAS_CENTRAL) not in sys.path:
                sys.path.insert(0, str(RUTA_HERRAMIENTAS_CENTRAL))
            if str(motor) not in sys.path:
                sys.path.insert(0, str(motor))
            inyecto_fitz = False
            if "fitz" not in sys.modules:
                sys.modules["fitz"] = types.ModuleType("fitz")
                inyecto_fitz = True
            try:
                import importlib.util

                spec = importlib.util.spec_from_file_location("extraer_literal_pdf", ruta_mod)
                if spec and spec.loader:
                    mod = importlib.util.module_from_spec(spec)
                    spec.loader.exec_module(mod)
                    siglas = list(getattr(mod, "SIGLAS_MEDICINA", []))
                    if siglas:
                        return list(dict.fromkeys(SIGLAS_BASE + siglas))
            finally:
                if inyecto_fitz:
                    sys.modules.pop("fitz", None)
    except Exception:
        pass
    return list(SIGLAS_BASE)


def _cargar_siglas_palabra(ruta: Path = RUTA_SIGLAS_CLASIFICADAS) -> frozenset[str]:
    """Carga siglas clasificadas como 'palabra' en siglas_clasificadas.json (falsos positivos rev. 7)."""
    if not ruta.is_file():
        return frozenset()
    try:
        datos = json.loads(ruta.read_text(encoding="utf-8"))
    except Exception:
        return frozenset()
    if not isinstance(datos, dict):
        return frozenset()
    return frozenset(
        str(k)
        for k, v in datos.items()
        if isinstance(k, str) and isinstance(v, dict) and v.get("tipo") == "palabra"
    )


_MAPA_UNIDADES_SIMBOLO_NGRAM: dict[str, str] = {
    "μm": "um",
    "µm": "um",
    "nm": "nm",
    "mmHg": "mmhg",
    "mm": "mm",
    "cm": "cm",
    "mL": "ml",
    "ml": "ml",
    "mg": "mg",
    "kg": "kg",
    "kDa": "kda",
    "kPa": "kpa",
    "pH": "ph",
    "μg": "ug",
    "µg": "ug",
    "μl": "ul",
    "µl": "ul",
    "μL": "ul",
    "µL": "ul",
}
_UNIDADES_SIMBOLO_NGRAM_PAT = "|".join(
    re.escape(k) for k in sorted(_MAPA_UNIDADES_SIMBOLO_NGRAM, key=len, reverse=True)
)
_RE_UNIDAD_SIMBOLO_NGRAM = re.compile(
    rf"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\u0370-\u03ff\u00b5])"
    rf"(?P<u>{_UNIDADES_SIMBOLO_NGRAM_PAT})"
    rf"(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d\u0370-\u03ff\u00b5])"
)
_RE_GRADOS_CF_NGRAM = re.compile(
    r"[°º]\s*(?P<escala>[CF])(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])"
)
_MAPA_UNIDADES_PALABRA_NGRAM: tuple[tuple[re.Pattern[str], str], ...] = (
    (re.compile(r"\bmilimetros?\s+de\s+mercurio\b"), "mmhg"),
    (re.compile(r"\bgrados?\s+celsius\b"), "gradoscelsius"),
    (re.compile(r"\bgrados?\s+fahrenheit\b"), "gradosfahrenheit"),
    (re.compile(r"\bpe\s+hache\b"), "ph"),
    (re.compile(r"\bmicrometros?\b"), "um"),
    (re.compile(r"\bnanometros?\b"), "nm"),
    (re.compile(r"\bmilimetros?\b"), "mm"),
    (re.compile(r"\bcentimetros?\b"), "cm"),
    (re.compile(r"\bmililitros?\b"), "ml"),
    (re.compile(r"\bmiligramos?\b"), "mg"),
    (re.compile(r"\bkilogramos?\b"), "kg"),
    (re.compile(r"\bkilodalton(?:es|s)?\b"), "kda"),
    (re.compile(r"\bkilopascal(?:es)?\b"), "kpa"),
    (re.compile(r"\bmicrogramos?\b"), "ug"),
    (re.compile(r"\bmicrolitros?\b"), "ul"),
)
_MAPA_GRIEGAS_NGRAM: dict[str, str] = {
    "α": "alfa",
    "β": "beta",
    "γ": "gamma",
    "Γ": "gamma",
    "δ": "delta",
    "Δ": "delta",
    "∆": "delta",
    "ε": "epsilon",
    "ζ": "zeta",
    "η": "eta",
    "θ": "theta",
    "ϑ": "theta",
    "Θ": "theta",
    "κ": "kappa",
    "λ": "lambda",
    "Λ": "lambda",
    "μ": "mi",
    "µ": "mi",
    "ξ": "xi",
    "Ξ": "xi",
    "π": "pi",
    "Π": "pi",
    "σ": "sigma",
    "ς": "sigma",
    "Σ": "sigma",
    "τ": "tau",
    "φ": "fi",
    "ϕ": "fi",
    "Φ": "fi",
    "χ": "ji",
    "ψ": "psi",
    "Ψ": "psi",
    "ω": "omega",
    "Ω": "omega",
    "Ω": "omega",
}
_RE_PREFIJO_UNIDAD_MU_NGRAM = re.compile(
    r"^(?:mol|Eq|Osm|[mglLsMVAWΩΩ])(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])"
)
_RE_GRIEGA_NGRAM = re.compile(
    "[" + "".join(re.escape(k) for k in _MAPA_GRIEGAS_NGRAM) + "]"
)
_RE_I_GRIEGA_NGRAM = re.compile(
    r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])i\s+griega(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])",
    re.IGNORECASE,
)
_RE_SIGLA_CON_C_NGRAM = re.compile(
    r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])([AG])\s+M\s+P\s+c(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])"
)
_EXPANSIONES_SIGLAS_MIX_NGRAM: dict[str, str] = {
    "ADNbc": "ADN bicatenario",
    "ADNmc": "ADN monocatenario",
    "ARNbc": "ARN bicatenario",
    "ARNmc": "ARN monocatenario",
    "ARNm": "ARN mensajero",
    "ARNt": "ARN de transferencia",
    "ARNr": "ARN ribosomico",
}
_RE_SIGLAS_MIX_NGRAM = re.compile(
    r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])(?:"
    + "|".join(re.escape(k) for k in _EXPANSIONES_SIGLAS_MIX_NGRAM)
    + r")(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])"
)
_CACHE_LECTURAS_SIGLAS_NGRAM: tuple[Path, int, tuple[tuple[re.Pattern[str], str], ...]] | None = None


def _quitar_tildes_bajar(texto: str) -> str:
    """Convierte a minúsculas sin tildes preservando la ñ."""
    descompuesto = unicodedata.normalize("NFD", texto.lower())
    chars: list[str] = []
    i = 0
    while i < len(descompuesto):
        ch = descompuesto[i]
        if ch == "n" and i + 1 < len(descompuesto) and descompuesto[i + 1] == "\u0303":
            chars.append("ñ")
            i += 2
            continue
        if unicodedata.category(ch) != "Mn":
            chars.append(ch)
        i += 1
    return "".join(chars)


def _cargar_lecturas_siglas_ngram(
    ruta: Path = RUTA_SIGLAS_CLASIFICADAS,
) -> tuple[tuple[re.Pattern[str], str], ...]:
    """Compila pares (patron_lectura, sigla_norm) para entradas 'palabra' y 'formula'."""
    global _CACHE_LECTURAS_SIGLAS_NGRAM
    if not ruta.is_file():
        return ()
    try:
        mtime_ns = ruta.stat().st_mtime_ns
    except OSError:
        return ()
    if (
        _CACHE_LECTURAS_SIGLAS_NGRAM is not None
        and _CACHE_LECTURAS_SIGLAS_NGRAM[0] == ruta
        and _CACHE_LECTURAS_SIGLAS_NGRAM[1] == mtime_ns
    ):
        return _CACHE_LECTURAS_SIGLAS_NGRAM[2]
    try:
        datos = json.loads(ruta.read_text(encoding="utf-8"))
    except Exception:
        return ()
    if not isinstance(datos, dict):
        return ()

    pares: list[tuple[str, str]] = []
    for sigla, info in datos.items():
        if not isinstance(sigla, str) or not isinstance(info, dict):
            continue
        if info.get("tipo") not in ("palabra", "formula"):
            continue
        lectura = info.get("lectura")
        if not isinstance(lectura, str) or not lectura.strip():
            continue
        sigla_norm = _quitar_tildes_bajar(sigla.strip())
        lectura_norm = " ".join(_quitar_tildes_bajar(lectura).split())
        if not sigla_norm or not lectura_norm or lectura_norm == sigla_norm:
            continue
        pares.append((lectura_norm, sigla_norm))

    pares.sort(key=lambda par: len(par[0]), reverse=True)
    compilados = tuple(
        (
            re.compile(
                rf"(?<![a-zñ])"
                + r"\s+".join(re.escape(tok) for tok in lect.split())
                + rf"(?![a-zñ])"
            ),
            sigla_norm,
        )
        for lect, sigla_norm in pares
    )
    _CACHE_LECTURAS_SIGLAS_NGRAM = (ruta, mtime_ns, compilados)
    return compilados


def _normalizar_para_ngramas(texto: str) -> list[str]:
    """Convierte texto escrito o TTS en tokens alfabéticos canónicos sin números ni símbolos expandidos."""
    t = unicodedata.normalize("NFC", texto)
    t = _ETIQUETA_VOZ_RE.sub(" ", t)
    # Unir cortes de palabra por guion y ligaduras rotas antes de tokenizar
    t = re.sub(r"([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)-\s+([a-záéíóúüñ]+)", r"\1\2", t)
    t = re.sub(
        r"\b(?!(?:wifi|hi-fi)\b)([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*(?:ffi|ffl|fi|fl))[ \t]+([a-záéíóúüñ]{2,})",
        r"\1\2",
        t,
        flags=re.IGNORECASE,
    )
    # 16-nov (calibración EdS): adaptaciones permitidas que la voz lee distinto del libro
    t = re.sub(r"\bp\.\s*ej\.", "por ejemplo", t, flags=re.IGNORECASE)  # «p. ej.» -> «por ejemplo»
    # 19-nov: iones en el PDF (Na+, K+, Ca2+, Cl−, H+, Mg2+) que fonetica_es convierte a «sodio», «potasio», «calcio», etc.
    t = re.sub(r"\bNa\s*(?:\+|m[aá]s)\b", " sodio ", t)
    t = re.sub(r"\bK\s*(?:\+|m[aá]s)\b", " potasio ", t)
    t = re.sub(r"\bCa\s*(?:2\s*\+|\+\s*2|dos\s+m[aá]s|\+\s*dos)\b", " calcio ", t)
    t = re.sub(r"\bMg\s*(?:2\s*\+|\+\s*2|dos\s+m[aá]s|\+\s*dos)\b", " magnesio ", t)
    t = re.sub(r"\bCl\s*(?:[-−]|menos)\b", " cloro ", t)
    t = re.sub(r"\bH\s*(?:\+|m[aá]s)\b", " hidrogeno ", t)
    t = re.sub(r"/", " o ", t)  # «Na+/glucosa» -> «sodio o glucosa»
    t = re.sub(r"\b([A-ZÁÉÍÓÚÑ]{1,5})-([A-ZÁÉÍÓÚÑ]{1,5})\b", r"\1\2", t)  # «PN-TB» = «P N T B»
    t = re.sub(r"\b([A-ZÁÉÍÓÚÑ]{2,})/([A-ZÁÉÍÓÚÑ]{2,})\b", r"\1 o \2", t)  # «OPS/OMS» = «O P S o O M S»
    # Unidades en símbolo a clave canónica antes de griegas y minúsculas
    t = _RE_GRADOS_CF_NGRAM.sub(
        lambda m: " gradoscelsius " if m.group("escala") == "C" else " gradosfahrenheit ",
        t,
    )
    t = _RE_UNIDAD_SIMBOLO_NGRAM.sub(
        lambda m: f" {_MAPA_UNIDADES_SIMBOLO_NGRAM[m.group('u')]} ",
        t,
    )
    # Griegas por su nombre (respetando prefijo μ de unidad no listado)
    t = _RE_GRIEGA_NGRAM.sub(
        lambda m: (
            m.group(0)
            if m.group(0) in ("μ", "µ") and _RE_PREFIJO_UNIDAD_MU_NGRAM.match(t[m.end() :])
            else f" {_MAPA_GRIEGAS_NGRAM[m.group(0)]} "
        ),
        t,
    )
    # Colapsar siglas deletreadas («C P H» -> «CPH», «P i griega i griega» -> «PYY», «A M P c» -> «AMPc»)
    t = _RE_I_GRIEGA_NGRAM.sub("Y", t)
    t = _RE_SIGLA_CON_C_NGRAM.sub(r"\1MPc", t)
    t = _RE_COLAPSAR_SIGLA_ESPACIADA.sub(lambda m: m.group(0).replace(" ", ""), t)
    t = _RE_SIGLAS_MIX_NGRAM.sub(lambda m: _EXPANSIONES_SIGLAS_MIX_NGRAM[m.group(0)], t)

    plano = _quitar_tildes_bajar(t)
    # 22-nov (EdS Estadística): el PDF pega subíndices (ni, xi, hi, Qk, Dk) y el TTS los separa (n i, x i, h i, Q k, D k).
    plano = re.sub(r"\b([nxhqd])\s+([ik])\b", r"\1\2", plano)
    for patron_u, clave_u in _MAPA_UNIDADES_PALABRA_NGRAM:
        plano = patron_u.sub(clave_u, plano)
    for patron_s, sigla_s in _cargar_lecturas_siglas_ngram():
        plano = patron_s.sub(sigla_s, plano)

    crudos = _RE_TOKEN_ALFA.findall(plano)
    # Eliminar «y» conectiva entre palabras numéricas («cincuenta y tres») y excluir números/símbolos
    filtrados: list[str] = []
    n = len(crudos)
    for idx, tok in enumerate(crudos):
        if tok == "y" and 0 < idx < n - 1:
            if crudos[idx - 1] in PALABRAS_NUMERO and crudos[idx + 1] in PALABRAS_NUMERO:
                continue
        if tok in PALABRAS_EXCLUIDAS_NGRAM:
            continue
        filtrados.append(tok)
    return filtrados


def _cobertura_ngramas(
    tokens_objetivo: list[str],
    indice_ngramas: set[tuple[str, ...]],
    tokens_referencia: list[str] | None = None,
    n: int = NGRAM_LITERALIDAD,
) -> float:
    """Devuelve fracción [0.0, 1.0] de tokens cubiertos por n-gramas presentes en la referencia."""
    m = len(tokens_objetivo)
    if m == 0:
        return 1.0
    if m < MIN_TOKENS_PARRAFO_LITERALIDAD:
        # Párrafos muy cortos: buscar coincidencia exacta de secuencia contigua
        if tokens_referencia is None:
            return 0.0
        for i in range(0, len(tokens_referencia) - m + 1):
            if tokens_referencia[i : i + m] == tokens_objetivo:
                return 1.0
        # Si es 1-3 tokens, aceptar si cada token existe en ventana cercana
        return 0.0

    k = min(n, m)
    cubiertos = [False] * m
    for i in range(0, m - k + 1):
        ng = tuple(tokens_objetivo[i : i + k])
        if ng in indice_ngramas:
            for j in range(i, i + k):
                cubiertos[j] = True
    return sum(1 for c in cubiertos if c) / m


def _construir_indice_ngramas(tokens: list[str], n: int = NGRAM_LITERALIDAD) -> set[tuple[str, ...]]:
    if len(tokens) < n:
        return set()
    return {tuple(tokens[i : i + n]) for i in range(0, len(tokens) - n + 1)}


def _es_linea_titulo(linea: str) -> bool:
    """Heurística para reconocer líneas que funcionan como título o subtítulo propio."""
    s = linea.strip()
    if not s or len(s) > 120:
        return False
    palabras = s.split()
    if len(palabras) > 16:
        return False
    if s.endswith((".", ";", ",")) and not re.match(r"^(?:Cap[ií]tulo|Tema|Parte|Secci[oó]n)\b", s, re.I):
        return False
    return bool(s[0].isupper() or re.match(r"^(?:uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|\d+)\b", s, re.I))


# ============================================================================
# LOCALIZACIÓN DE ARCHIVOS DE REFERENCIA (PDF crudo, manifiesto, audio)
# ============================================================================


def _buscar_raiz_libros(ruta_origen: Path) -> Path | None:
    """Busca la carpeta libros_extraidos subiendo desde ruta_origen o desde el repo."""
    candidatos_raiz = [ruta_origen.resolve(), Path(__file__).resolve()]
    for base in candidatos_raiz:
        cur = base if base.is_dir() else base.parent
        for _ in range(7):
            for cand in (
                cur / "libros_extraidos",
                cur / "examenes pasados" / "MEDICINA" / "LIBROS DE MEDICINA" / "libros_extraidos",
            ):
                if cand.is_dir():
                    return cand
            if cur.parent == cur:
                break
            cur = cur.parent
    return None


def resolver_pdf_texto(ruta_md: Path, pdf_texto_explicito: Path | None = None) -> Path | None:
    """Localiza el archivo *_texto_paginas.txt correspondiente al capítulo."""
    if pdf_texto_explicito is not None:
        return pdf_texto_explicito if pdf_texto_explicito.is_file() else None

    dir_libros = _buscar_raiz_libros(ruta_md)
    if dir_libros is None:
        return None

    candidatos = sorted(dir_libros.rglob("*_texto_paginas.txt"))
    if not candidatos:
        return None

    clave = ruta_md.stem.lower()
    ruta_str = str(ruta_md).lower()
    if "biologia_celular" in clave or "calvo" in clave:
        for c in candidatos:
            if "calvo" in c.name.lower() or "biologia" in c.name.lower():
                return c
    if "saladin" in clave or "morfo" in clave or clave.startswith("atlas_"):
        for c in candidatos:
            if "saladin" in c.name.lower() or "morfo" in c.name.lower():
                return c
    if "eds" in clave or "audio_eds" in ruta_str or "educacion" in clave or "estadistica" in clave:
        for c in candidatos:
            nom = c.name.lower()
            if any(k in nom for k in ("eds", "educacion", "salud", "investigacion", "estadistica")):
                return c

    # Respaldo: elegir el *_texto_paginas.txt con mayor coincidencia de 4-gramas en el inicio del .md
    muestra_tokens = _normalizar_para_ngramas(ruta_md.read_text(encoding="utf-8", errors="replace")[:4000])
    if len(muestra_tokens) < NGRAM_LITERALIDAD:
        return candidatos[0] if len(candidatos) == 1 else None
    muestra_ng = _construir_indice_ngramas(muestra_tokens, NGRAM_LITERALIDAD)
    mejor: Path | None = None
    mejor_hits = 0
    for c in candidatos:
        txt_c = c.read_text(encoding="utf-8", errors="replace")
        ng_c = _construir_indice_ngramas(_normalizar_para_ngramas(txt_c), NGRAM_LITERALIDAD)
        hits = len(muestra_ng & ng_c)
        if hits > mejor_hits:
            mejor_hits = hits
            mejor = c
    return mejor if mejor_hits > 0 else None


def _carpeta_cache_de_stem(stem: str) -> str:
    m = re.match(r"Tema_(\d+)_Morfo_Saladin", stem)
    if m:
        return f"Morfo_Cap_{m[1]}_Saladin_LITERAL_TTS"
    if stem.startswith("Atlas_B"):
        return "Morfo_Atlas_B_Saladin_LITERAL_TTS"
    return stem


def resolver_manifiesto(
    ruta_audio: Path | None,
    ruta_texto: Path | None,
    manifiesto_explicito: Path | None = None,
) -> Path | None:
    """Busca el manifiesto.json de síntesis para la revisión 12."""
    if manifiesto_explicito is not None:
        return manifiesto_explicito if manifiesto_explicito.is_file() else None

    candidatos: list[Path] = []
    stems: list[str] = []
    if ruta_texto is not None:
        stems.append(ruta_texto.stem)
    if ruta_audio is not None:
        stems.append(ruta_audio.stem)
        candidatos.append(ruta_audio.parent / "manifiesto.json")
        candidatos.append(ruta_audio.parent.parent / "manifiesto.json")

    bases_motor: list[Path] = []
    for origen in [p for p in (ruta_audio, ruta_texto, Path(__file__).resolve()) if p is not None]:
        cur = origen if origen.is_dir() else origen.parent
        for _ in range(6):
            for m_dir in (
                cur / "_MOTOR_AUDIO",
                cur / "examenes pasados" / "MEDICINA" / "LIBROS DE MEDICINA" / "_MOTOR_AUDIO",
            ):
                if m_dir.is_dir() and m_dir not in bases_motor:
                    bases_motor.append(m_dir)
            if cur.parent == cur:
                break
            cur = cur.parent

    for motor in bases_motor:
        for stem in stems:
            carpeta = _carpeta_cache_de_stem(stem)
            candidatos.append(motor / "_cache_v2" / carpeta / "manifiesto.json")
            candidatos.append(motor / "_cache" / carpeta / "manifiesto.json")

    for c in candidatos:
        if c.is_file():
            return c
    return None


# ============================================================================
# REVISIONES 1 A 8 (SOBRE EL TEXTO)
# ============================================================================


_PDF_CLAUSULA_ETIM_CRUDA_PAT = (
    r"(?!(?:es|son|era|eran|sea|sean|ser|fue|fueron|est[aá]n?|coma|punto|por|m[aá]s|menos|entre|sobre|veces)\b)"
    r"-?[a-záéíóúüñ]{2,20}(?:-[a-záéíóúüñ]{0,15})?"
    r"(?:\s*(?:,|o|y|/)\s*-?[a-záéíóúüñ]{2,18}-?)?"
    r"\s*=\s*"
    r"[\"«'“(]?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][^.;\n]{0,110}"
)
_PDF_CLAUSULA_ETIM_CONT_PAT = (
    r"(?!(?:es|son|era|eran|sea|sean|ser|fue|fueron|est[aá]n?|coma|punto|por|m[aá]s|menos|entre|sobre|veces)\b)"
    r"-?[a-záéíóúüñ]{1,20}(?:-[a-záéíóúüñ]{0,15})?"
    r"(?:\s*(?:,|o|y|/)\s*-?[a-záéíóúüñ]{1,18}-?)?"
    r"\s*=\s*"
    r"[\"«'“(]?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][^.;\n]{0,110}"
)
_PDF_ANIOS_BIO_CRUDO_PAT = (
    r"(?:(?:hacia|circa|c\.|aprox\.|aproximadamente)\s+)?"
    r"\d{3,4}\s*[-–—a]\s*(?:\d{3,4}|presente|actualidad)"
    r"(?:\s*(?:a\.?\s*C\.?|d\.?\s*C\.?|a\.?\s*e\.?\s*c\.?))?"
)
_PDF_GLOSA_PIE_CRUDO_RE = re.compile(
    rf"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d.,-])\d{{1,2}}\s*{_PDF_CLAUSULA_ETIM_CRUDA_PAT}"
    rf"(?:;\s*{_PDF_CLAUSULA_ETIM_CONT_PAT})*(?:[.;]|(?=\s*$))"
    rf"|(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d.,-])\d{{1,2}}\s+{_REV4_NOMBRE_BIO_PAT},\s*{_PDF_ANIOS_BIO_CRUDO_PAT},\s*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][^.\n]{{2,120}}(?:\.|(?=\s*$))"
)
_PDF_CAPITULO_LINEA_RE = re.compile(
    rf"^\s*CAP[ÍI]TULO\s+(?:\d+|{_NUM_NOTA_2_50_PAT}|(?i:uno|un)):?\s+[A-ZÁÉÍÓÚÜÑ][^.\n]{{2,90}}\s*$"
)
_PDF_CAPITULO_INCRUSTADO_RE = re.compile(
    rf"(?<![A-ZÁÉÍÓÚÜÑ])CAP[ÍI]TULO\s+(?:\d+|{_NUM_NOTA_2_50_PAT}|(?i:uno|un)):?\s+"
    r"[A-ZÁÉÍÓÚÜÑ](?:[A-ZÁÉÍÓÚÜÑ\s,:-]{2,90}(?=\s*$)|[a-záéíóúüñ]+(?:\s+[a-záéíóúüñ,:-]+){0,14})"
)
_PDF_VINYETA_PREGUNTA_RE = re.compile(r"●\s*¿[^?]{1,350}\?")
_PDF_VINYETA_LINEA_RE = re.compile(r"●[ \t]*[^\n]{0,200}")
_PDF_NUM_REF_PAT = r"\d+(?:[.\-–]\d+)*[a-z]?(?:\s*(?:y|a|,)\s*\d+(?:[.\-–]\d+)*[a-z]?)*"
_PDF_OBJ_VISUAL_PAT = (
    rf"(?:las?\s+|los?\s+|el\s+)?(?:fi\s*guras?|figs?\.|tablas?|cuadros?|gr[aá]fic[oa]s?|im[aá]gen(?:es)?)\s+{_PDF_NUM_REF_PAT}"
)
_PDF_REF_VISUAL_CUERPO_RE = re.compile(
    rf"\b(?:tal\s+)?como\s+(?:se\s+)?(?:ve|ven|observan?|muestran?|indican?|ilustran?|aprecian?|representan?|resumen?|detallan?|presentan?)\s+en\s+{_PDF_OBJ_VISUAL_PAT}\b"
    rf"|\ben\s+{_PDF_OBJ_VISUAL_PAT}(?:\s+se\s+(?:ve|ven|observan?|muestran?|indican?|ilustran?|aprecian?|representan?|resumen?|detallan?|presentan?)(?:\s+que)?)?\b"
    rf"|\b(?:ver|v[eé]ase|v[eé]anse|obs[eé]rvese|cons[uú]ltese|v\.|cf\.)\s+(?:tamb[ií][eé]n\s+)?{_PDF_OBJ_VISUAL_PAT}\b"
    rf"|\b(?:la|el)\s+(?:fi\s*gura|tabla|cuadro|gr[aá]fic[oa])\s+{_PDF_NUM_REF_PAT}\s+(?:muestra|ilustra|presenta|indica|resume|detalla|representa)(?:\s+que)?\b",
    re.IGNORECASE,
)


def _quitar_parte_incrustada(texto: str) -> str:
    """Quita encabezados PARTE UNO..CINCO incrustados sin romper palabras contiguas."""
    def _rep(m: re.Match[str]) -> str:
        antes = texto[m.start() - 1] if m.start() > 0 else " "
        despues = texto[m.end()] if m.end() < len(texto) else " "
        if antes.islower() and despues.islower():
            return ""
        return " "

    return _REV3_PARTE_INCRUSTADA_RE.sub(_rep, texto)


def _limpiar_paginas_pdf_crudo(texto_pdf: str) -> list[str]:
    """Limpia encabezados de página y reconstruye párrafos del PDF crudo sin lo excluido por regla 10."""
    # Unir palabras partidas por guion al final de línea ANTES de separar párrafos (incl. doble salto en EdS).
    texto_pdf = re.sub(
        r"([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,})-\s*\n+(?:\s*\n+)*\s*([a-záéíóúüñ]{2,})",
        r"\1\2",
        texto_pdf,
    )
    lineas_limpias: list[str] = []
    en_seccion_excluida = False

    for linea in texto_pdf.splitlines():
        s = linea.strip()
        if _PAGINA_MARCA_RE.match(s) or _SOLO_DIGITOS_PAG_RE.match(s):
            continue
        if _REV3_ENCABEZADO_RE.match(s):
            continue

        # Detectar entrada a sección excluida por regla 10 (bibliografía, autoevaluación, glosario)
        if re.match(
            r"^(?:lecturas\s+recomendadas|bibliograf[ií]a|preguntas?\s+de\s+autoevaluaci[oó]n|"
            r"autoevaluaci[oó]n\b(?!\s*:\s*ejercicios\s+de\s+aplicaci[oó]n)|antes\s+de\s+proseguir|para\s+la\s+reflexi[oó]n|"
            r"ejercicios?\s+de\s+aplicaci[oó]n|glosario|referencias\s+bibliogr[aá]ficas)\b",
            s,
            re.IGNORECASE,
        ):
            en_seccion_excluida = True
            continue
        if en_seccion_excluida:
            # 16-nov (EdS): los capítulos del Libro 3 abren con «PARTE» o un título en MAYÚSCULAS, no «CAPÍTULO N»;
            # sin esto se descartaba casi todo el tramo págs. 38-74 tras el primer «Para la reflexión».
            # 19-nov (Calvo Tema 2 Parte 2): tras «Lecturas recomendadas» (pág. 74-75) siguen las secciones en línea
            # de técnicas moleculares («Tecnología del ADN recombinante…», «FIGURA E2-…»).
            if re.match(
                r"^(?:CAP[IÍ]TULO\s+\d+|\d+\.\d+\s+[A-ZÁÉÍÓÚÑ]|PARTE\b|FIGURA\s+E\d+-|Tecnolog[ií]a\s+del\s+ADN\s+recombinante|[A-ZÁÉÍÓÚÑÜ¿?¡!,:\s]{15,}$)",
                s,
            ):
                en_seccion_excluida = False
            else:
                continue

        # Quitar encabezados incrustados PARTE UNO..CINCO y CAPÍTULO N / en palabras (Saladin, regla 10)
        if s and not _PDF_FIN_NARRABLE_RE.search(s):
            if _PDF_CAPITULO_LINEA_RE.match(s):
                continue
            s = _quitar_parte_incrustada(s)
            s = _PDF_CAPITULO_INCRUSTADO_RE.sub(" ", s)
            s = re.sub(r"[ \t]{2,}", " ", s).strip()
            if not s:
                continue

        if not s:
            lineas_limpias.append("")
        else:
            lineas_limpias.append(s)

    unido = "\n".join(lineas_limpias)
    unido = re.sub(
        r"([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,})-\s*\n+(?:\s*\n+)*\s*([a-záéíóúüñ]{2,})",
        r"\1\2",
        unido,
    )
    # Quitar referencias parentéticas a figuras/páginas que el TTS omite intencionalmente
    unido = re.sub(
        r"\(\s*(?:(?:v\.|cf\.|véase|véanse|ver)\s+)?(?:figs?\.|figuras?|tablas?|cuadros?|pp?\.)[^()]{0,40}\)",
        " ",
        unido,
        flags=re.IGNORECASE,
    )

    bloques_crudos = [b.strip() for b in re.split(r"\n\s*\n", unido) if b.strip()]
    parrafos: list[str] = []
    for b in bloques_crudos:
        # Quitar preguntas de autoevaluación con viñeta ● (pueden cruzar líneas dentro del bloque)
        b_limpio = _PDF_VINYETA_PREGUNTA_RE.sub(" ", b)
        b_limpio = _PDF_VINYETA_LINEA_RE.sub(" ", b_limpio)
        b_linea = re.sub(r"\s+", " ", b_limpio).strip()
        if not b_linea:
            continue
        # Omitir pies de figura/cuadro o restos de índice muy cortos
        if re.match(r"^(?:FIGURA|CUADRO|TABLA)\s+\d", b_linea, re.IGNORECASE):
            continue
        if _REV3_BIBLIO_CITA_RE.search(b_linea) and len(b_linea.split()) < 45:
            continue
        # Quitar glosas etimológicas/biográficas de notas al pie (formato crudo PDF y verbalizado)
        b_linea = _PDF_GLOSA_PIE_CRUDO_RE.sub(" ", b_linea)
        b_linea = _REV4_GLOSA_PIE_RE.sub(" ", b_linea)
        b_linea = _quitar_parte_incrustada(b_linea)
        # Quitar referencias visuales de tabla/figura en cuerpo (regla 2/5 de libro-audio-tts)
        b_linea = _PDF_REF_VISUAL_CUERPO_RE.sub(" ", b_linea)
        b_linea = re.sub(r"\s+", " ", b_linea).strip()
        if not b_linea:
            continue
        parrafos.append(b_linea)
    return parrafos


_PAL_NUM_TABLA_PAT = (
    r"(?:cero|un[oa]?|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|"
    r"diez|once|doce|trece|catorce|quince|diecis[eé]is|diecisiete|dieciocho|diecinueve|"
    r"veinte|veinti(?:uno|una|[uú]n|d[oó]s|tr[eé]s|cuatro|cinco|s[eé]is|siete|ocho|nueve)|"
    r"treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa|"
    r"cien|ciento|doscient[oa]s|trescient[oa]s|cuatrocient[oa]s|quinient[oa]s|"
    r"seiscient[oa]s|setecient[oa]s|ochocient[oa]s|novecient[oa]s|mil)"
)
_REV1_TABLA_NARRADA_RE = re.compile(
    rf"^\s*Tabla(?:\s+(?:\d+(?:\.\d+)*|{_PAL_NUM_TABLA_PAT}(?:\s+(?:y|punto|{_PAL_NUM_TABLA_PAT}))*))?\s*\.",
    re.IGNORECASE,
)
_REV1_FORMULA_OP_FUERTE_RE = re.compile(
    r"\b(?:igual\s+a|distinto\s+de|diferente\s+de|dividido\s+(?:entre|por)|"
    r"(?:equis|x|ye|y|efe|f)\s+barra|ra[ií]z\s+(?:cuadrada|c[uú]bica)|"
    r"al\s+(?:cuadrado|cubo)|elevado\s+a|sumatoria|sigma|"
    r"(?:mayor|menor)(?:\s+o\s+igual)?\s+que)\b",
    re.IGNORECASE,
)
_REV1_FORMULA_OP_SOLO_RE = re.compile(
    r"\b(?:dividido\s+(?:entre|por)|(?:equis|x|ye|y|efe|f)\s+barra|"
    r"ra[ií]z\s+(?:cuadrada|c[uú]bica)|al\s+(?:cuadrado|cubo)|elevado\s+a|sumatoria|sigma)\b",
    re.IGNORECASE,
)
_REV1_FORMULA_OP_SEC_RE = re.compile(
    r"\b(?:sobre|m[aá]s|menos|por|entre|hasta)\b",
    re.IGNORECASE,
)
_PALABRAS_NUMERO_SIN_ARTICULO = PALABRAS_NUMERO - {"un", "una", "unos", "unas"}
_PALABRAS_ESTRUCTURA_TABLA_FORMULA = frozenset({
    "tabla", "para", "cada", "se", "dan", "donde", "dividido", "entre", "sobre",
    "hasta", "igual", "equis", "ye", "barra", "sigma", "sumatoria",
    "alfa", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta",
    "kappa", "lambda", "mu", "mi", "xi", "pi", "rho", "tau", "fi", "ji", "psi", "omega",
    "elevado", "cubica", "distinto", "diferente",
    "al", "del", "mayor", "menor", "que", "de", "la", "el", "las", "los", "en", "y", "o", "a",
})


def _es_parrafo_tabla_narrada(parrafo: str) -> bool:
    """Detecta párrafos de tablas narradas fila por fila (regla 7 de libro-audio-tts)."""
    return bool(_REV1_TABLA_NARRADA_RE.match(parrafo))


def _es_parrafo_formula_estadistica(parrafo: str) -> bool:
    """Detecta párrafos de fórmulas y cálculos estadísticos verbalizados (regla 4 de libro-audio-tts)."""
    fuertes = len(_REV1_FORMULA_OP_FUERTE_RE.findall(parrafo))
    if fuertes == 0:
        return False
    palabras_norm = _RE_TOKEN_ALFA.findall(_quitar_tildes_bajar(parrafo))
    n_pal = len(palabras_norm)
    if n_pal == 0:
        return False
    sec = len(_REV1_FORMULA_OP_SEC_RE.findall(parrafo))
    nums_y_vars = sum(
        1
        for w in palabras_norm
        if w in _PALABRAS_NUMERO_SIN_ARTICULO or (len(w) == 1 and w not in {"a", "y", "o", "e", "u"})
    )
    if fuertes >= 2:
        return (fuertes * 2 + sec + nums_y_vars) / n_pal >= 0.25
    return n_pal <= 22 and (nums_y_vars >= 1 or bool(_REV1_FORMULA_OP_SOLO_RE.search(parrafo)))


def _cobertura_vocabulario_tabla_formula(tokens: list[str], pdf_vocab: set[str]) -> float:
    """Fracción de tokens sustantivos presentes en el vocabulario del PDF para tablas/fórmulas."""
    sustantivos = [
        t for t in tokens
        if len(t) > 1 and t not in _PALABRAS_ESTRUCTURA_TABLA_FORMULA
    ]
    if not sustantivos:
        return 1.0
    cubiertos = sum(1 for t in sustantivos if t in pdf_vocab)
    return cubiertos / len(sustantivos)


def _revision_1_literalidad(texto: str, ruta_pdf_texto: Path | None) -> ResultadoRevision:
    """Revisión 1: literalidad del texto frente a *_texto_paginas.txt por n-gramas."""
    if ruta_pdf_texto is None or not ruta_pdf_texto.is_file():
        return ResultadoRevision(
            numero=1,
            nombre="Literalidad (texto vs PDF crudo)",
            sobre="texto",
            estado="sin revisar",
            fallas=0,
            revisado=0,
            unidad="párrafos",
            ejemplos=[],
            nota="No se encontró *_texto_paginas.txt",
        )

    parrafos = [p.strip() for p in re.split(r"\n\s*\n", texto) if p.strip()]
    if not parrafos:
        return ResultadoRevision(1, "Literalidad (texto vs PDF crudo)", "texto", "FALLA", 1, 0, "párrafos", ["Texto vacío"])

    pdf_raw = ruta_pdf_texto.read_text(encoding="utf-8", errors="replace")
    # Unir cortes de línea del PDF antes de tokenizar
    pdf_raw = re.sub(r"([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)-\s*\n+\s*([a-záéíóúüñ]+)", r"\1\2", pdf_raw)
    pdf_tokens = _normalizar_para_ngramas(pdf_raw)
    pdf_ngrams = _construir_indice_ngramas(pdf_tokens, NGRAM_LITERALIDAD)
    pdf_vocab = set(pdf_tokens)

    fallas_ej: list[str] = []
    fallas = 0
    evaluados = 0
    for idx, parrafo in enumerate(parrafos, start=1):
        toks = _normalizar_para_ngramas(parrafo)
        if not toks:
            continue
        evaluados += 1
        if _es_parrafo_tabla_narrada(parrafo) or _es_parrafo_formula_estadistica(parrafo):
            cob = _cobertura_vocabulario_tabla_formula(toks, pdf_vocab)
            umbral = UMBRAL_VOCABULARIO_TABLA_FORMULA
        else:
            cob = _cobertura_ngramas(toks, pdf_ngrams, tokens_referencia=pdf_tokens, n=NGRAM_LITERALIDAD)
            umbral = UMBRAL_LITERALIDAD_PARRAFO
        if cob < umbral:
            fallas += 1
            fallas_ej.append(f"P{idx} ({cob * 100:.1f}%): {_recortar(parrafo, 85)}")

    estado = "FALLA" if fallas > 0 else "APRUEBA"
    return ResultadoRevision(
        numero=1,
        nombre="Literalidad (texto vs PDF crudo)",
        sobre="texto",
        estado=estado,
        fallas=fallas,
        revisado=evaluados,
        unidad="párrafos",
        ejemplos=_dedup_limitar(fallas_ej, limite=30),
    )


# Revisión 2: material que el audio omite a propósito (regla 10 de libro-audio-tts)
GAP_MAX_CLUSTER_ANCLAS = 25  # párrafos de PDF sin ancla que cortan un cluster
_PDF_FIN_NARRABLE_RE = re.compile(
    r"Para (?:com)?probar (?:sus|los) conocimientos|^\s*Cuestiones\b|^\s*Respuestas\b"
    r"|^\s*(?:Preguntas?\s+de\s+)?Autoevaluaci[oó]n\b(?!\s*:\s*ejercicios\s+de\s+aplicaci[oó]n)"
    r"|^\s*Bibliograf[ií]a|^\s*Referencias(\s+bibliogr[aá]ficas)?\s*$|^\s*Temas de conexi[oó]n\b"
    r"|10\.3\s+Ejercicios\s+de\s+aplicaci[oó]n"
    r"|^\s*11\s+ESTAD[ÍI]STICA\s+DESCRIPTIVA\s+MEDIANTE\s+MICROSOFT\s+EXCEL",
    re.I | re.M,
)
# 16-nov (calibración EdS): fuentes de figura, URLs y citas sueltas del PDF no se narran (regla 10): no son omisión.
_PDF_NO_NARRABLE_RE = re.compile(
    r"^\s*Antes de proseguir|Responda las siguientes preguntas|Glosario|ESQUEMA DEL CAP[ÍI]TULO"
    r"|^\s*Fuente\s*:|https?://|www\.|Disponible en\s*:|Recuperado de|\bet al\b"
    r"|^\s*(?:\d+(?:\.\d+)*\s+)?Ejercicios\s+de\s+aplicaci[oó]n\b"
    r"|^\s*Realice\s+las\s+tablas\b",
    re.I,
)


def _es_indice_o_portada(p: str) -> bool:
    """Índice/portada del PDF (no se narra, no cuenta como omisión): varios «Capítulo N:», marcas de
    portada, o un bloque largo de títulos sin un solo punto (un párrafo real siempre trae punto)."""
    if len(re.findall(r"Cap[ií]tulo\s+\d+\s*:", p)) >= 2:
        return True
    if re.search(r"Table of Contents|[ÍI]ndice de cap[ií]tulos|Instrucciones para el acceso|P[aá]gina de cr[eé]ditos", p):
        return True
    return "." not in p and len(p.split()) > 15


def _revision_2_omisiones(texto: str, ruta_pdf_texto: Path | None) -> ResultadoRevision:
    """Revisión 2: párrafos del PDF que faltan en el texto TTS (excluyendo regla 10)."""
    if ruta_pdf_texto is None or not ruta_pdf_texto.is_file():
        return ResultadoRevision(
            numero=2,
            nombre="Omisiones (PDF -> texto)",
            sobre="texto",
            estado="sin revisar",
            fallas=0,
            revisado=0,
            unidad="párrafos PDF",
            ejemplos=[],
            nota="No se encontró *_texto_paginas.txt",
        )

    tts_tokens = _normalizar_para_ngramas(texto)
    if not tts_tokens:
        return ResultadoRevision(2, "Omisiones (PDF -> texto)", "texto", "FALLA", 1, 0, "párrafos PDF", ["Texto TTS vacío"])
    tts_ngrams = _construir_indice_ngramas(tts_tokens, NGRAM_LITERALIDAD)

    pdf_raw = ruta_pdf_texto.read_text(encoding="utf-8", errors="replace")
    parrafos_pdf = _limpiar_paginas_pdf_crudo(pdf_raw)
    parrafos_eval = [
        p for p in parrafos_pdf
        if (len(_normalizar_para_ngramas(p)) >= MIN_TOKENS_PARRAFO_OMISION and not _es_indice_o_portada(p))
        or _PDF_FIN_NARRABLE_RE.search(p)
    ]
    if not parrafos_eval:
        return ResultadoRevision(2, "Omisiones (PDF -> texto)", "texto", "sin revisar", 0, 0, "párrafos PDF", [], "PDF sin párrafos evaluables")

    # Si el PDF tiene muchos párrafos (libro entero), anclar el rango del capítulo [ini, fin]
    total_pdf_tokens = sum(len(_normalizar_para_ngramas(p)) for p in parrafos_eval)
    if total_pdf_tokens > 3000:
        indices_anclados: list[int] = []
        for idx, p in enumerate(parrafos_eval):
            toks_p = _normalizar_para_ngramas(p)
            cob = _cobertura_ngramas(toks_p, tts_ngrams, tokens_referencia=tts_tokens, n=NGRAM_LITERALIDAD)
            if cob >= MIN_ANCHOR_COBERTURA:
                indices_anclados.append(idx)
        if not indices_anclados:
            return ResultadoRevision(
                numero=2,
                nombre="Omisiones (PDF -> texto)",
                sobre="texto",
                estado="sin revisar",
                fallas=0,
                revisado=0,
                unidad="párrafos PDF",
                ejemplos=[],
                nota="No se pudo anclar el capítulo dentro del PDF completo",
            )
        # Cluster más grande de anclas: un ancla suelta en otro capítulo no debe estirar el rango
        # (16-nov: Saladin daba ~1700 «párrafos omitidos» porque el rango abarcaba todo el libro).
        clusters: list[list[int]] = [[indices_anclados[0]]]
        for a in indices_anclados[1:]:
            prev = clusters[-1][-1]
            cruce_fin = any(_PDF_FIN_NARRABLE_RE.search(parrafos_eval[k]) for k in range(prev, a))
            if a - prev > GAP_MAX_CLUSTER_ANCLAS or cruce_fin:
                clusters.append([a])
            else:
                clusters[-1].append(a)
        mejor = max(clusters, key=len)
        ini_idx, fin_idx = mejor[0], mejor[-1]
        tramo = parrafos_eval[ini_idx : fin_idx + 1]
    else:
        tramo = parrafos_eval
    # Autoevaluación, cuestiones y similares se quitan a propósito del audio (regla 10): no son omisión.
    tramo_ok: list[str] = []
    for p in tramo:
        if _PDF_FIN_NARRABLE_RE.search(p):
            break  # de aquí al final del capítulo es material excluido
        if _PDF_NO_NARRABLE_RE.search(p):
            continue
        tramo_ok.append(p)
    tramo = tramo_ok

    fallas = 0
    fallas_ej: list[str] = []
    for idx, p in enumerate(tramo, start=1):
        toks_p = _normalizar_para_ngramas(p)
        cob = _cobertura_ngramas(toks_p, tts_ngrams, tokens_referencia=tts_tokens, n=NGRAM_LITERALIDAD)
        if cob < UMBRAL_OMISION_PARRAFO:
            fallas += 1
            fallas_ej.append(f"PDF#{idx} ({cob * 100:.1f}%): {_recortar(p, 85)}")

    estado = "FALLA" if fallas > 0 else "APRUEBA"
    return ResultadoRevision(
        numero=2,
        nombre="Omisiones (PDF -> texto)",
        sobre="texto",
        estado=estado,
        fallas=fallas,
        revisado=len(tramo),
        unidad="párrafos PDF",
        ejemplos=_dedup_limitar(fallas_ej, limite=30),
    )


def _revision_3_relleno(texto: str, *, modo_whisper: bool = False) -> ResultadoRevision:
    """Revisión 3: bibliografía, autoevaluación, glosario, créditos, encabezados y portada."""
    hallazgos: list[str] = []

    for m in _REV3_BIBLIO_HEADING_RE.finditer(texto):
        hallazgos.append(f"Bibliografía: {m.group(0).strip()}")
    for m in _REV3_BIBLIO_CITA_RE.finditer(texto):
        hallazgos.append(f"Cita bibliográfica: {m.group(0).strip()}")
    for m in _REV3_AUTOEVAL_RE.finditer(texto):
        hallazgos.append(f"Autoevaluación: {m.group(0).strip()}")
    for m in _REV3_GLOSARIO_RE.finditer(texto):
        hallazgos.append(f"Glosario: {m.group(0).strip()}")
    # 16-nov, decisión de Ronald («a»): el recuadro «Temas de conexión» de Saladin no va al audio (regla 19 de libro-audio-tts)
    for m in _REV3_TEMAS_CONEXION_RE.finditer(texto):
        hallazgos.append(f"Recuadro Temas de conexión: {m.group(0).strip()[:60]}")
    for m in _REV3_CREDITO_RE.finditer(texto):
        ctx = texto[max(0, m.start() - 10) : min(len(texto), m.end() + 30)]
        hallazgos.append(f"Crédito: {_recortar(ctx, 70)}")
    spans_encabezado: list[tuple[int, int]] = []
    for m in _REV3_ENCABEZADO_RE.finditer(texto):
        spans_encabezado.append((m.start(), m.end()))
        hallazgos.append(f"Encabezado/autor/portada: {m.group(0).strip()}")
    for m in _REV3_PARTE_INCRUSTADA_RE.finditer(texto):
        if any(ini <= m.start() and m.end() <= fin for ini, fin in spans_encabezado):
            continue
        hallazgos.append(f"Encabezado PARTE incrustado: {m.group(0).strip()}")
    for m in _REV3_CAPITULO_REPETIDO_RE.finditer(texto):
        if m.start() < 200:
            continue
        hallazgos.append(f"Encabezado CAPÍTULO repetido: {_recortar(m.group(0).strip(), 70)}")
    for m in _REV3_VINYETA_AUTOEVAL_RE.finditer(texto):
        hallazgos.append(f"Pregunta con viñeta ●: {_recortar(m.group(0).strip(), 70)}")

    if not modo_whisper:
        for linea in texto.splitlines():
            if _SOLO_DIGITOS_PAG_RE.match(linea):
                hallazgos.append(f"Número de página suelto: {linea.strip()}")

    palabras = len(texto.split())
    ejemplos = _dedup_limitar(hallazgos)
    estado = "FALLA" if hallazgos else "APRUEBA"
    return ResultadoRevision(
        numero=3,
        nombre="Relleno leído (biblio, autoeval, créditos, portada)",
        sobre="texto" if not modo_whisper else "audio (transcripción)",
        estado=estado,
        fallas=len(hallazgos),
        revisado=palabras,
        unidad="palabras",
        ejemplos=ejemplos,
    )


def _revision_4_notas_pie(texto: str, *, modo_whisper: bool = False) -> ResultadoRevision:
    """Revisión 4: llamadas de notas al pie y glosas etimológicas leídas."""
    hallazgos: list[str] = []
    sin_etq = _ETIQUETA_VOZ_RE.sub(" ", texto)

    if not modo_whisper:
        for m in _REV4_LLAMADA_DIGITO_RE.finditer(sin_etq):
            hallazgos.append(f"Llamada numérica: {m.group(0)}")
        for m in _REV4_LLAMADA_PUNT_RE.finditer(sin_etq):
            ctx = sin_etq[max(0, m.start() - 15) : min(len(sin_etq), m.end() + 10)]
            hallazgos.append(f"Llamada tras puntuación: {_recortar(ctx, 50)}")
        for m in _REV4_LLAMADA_SUP_RE.finditer(sin_etq):
            hallazgos.append(f"Llamada superíndice/asterisco: {m.group(0)}")

    for m in _REV4_GLOSA_PIE_RE.finditer(sin_etq):
        hallazgos.append(f"Nota al pie leída: {_recortar(m.group(0), 75)}")

    palabras = len(sin_etq.split())
    return ResultadoRevision(
        numero=4,
        nombre="Notas al pie (llamadas y glosas)",
        sobre="texto" if not modo_whisper else "audio (transcripción)",
        estado="FALLA" if hallazgos else "APRUEBA",
        fallas=len(hallazgos),
        revisado=palabras,
        unidad="palabras",
        ejemplos=_dedup_limitar(hallazgos),
    )


def _revision_5_figuras_tablas(texto: str, *, modo_whisper: bool = False) -> ResultadoRevision:
    """Revisión 5: referencias visuales en cuerpo, «como ves», tablas crudas o pies visuales."""
    hallazgos: list[str] = []
    sin_etq = _ETIQUETA_VOZ_RE.sub(" ", texto)

    for m in _REV5_REF_VISUAL_RE.finditer(sin_etq):
        hallazgos.append(f"Ref. visual: {m.group(0).strip()}")
    for m in _REV5_IMAGEN_PENDIENTE_RE.finditer(sin_etq):
        hallazgos.append(f"Marca de imagen sin resolver: {m.group(0)}")
    if not modo_whisper:
        for m in _REV5_TABLA_MD_RE.finditer(sin_etq):
            hallazgos.append(f"Tabla cruda: {_recortar(m.group(0), 60)}")
    for m in _REV5_AUMENTO_VISUAL_RE.finditer(sin_etq):
        # 19-nov: «puntas de flecha» / «punta de la flecha» en filamentos de actina/miosina es metáfora anatómica, no flecha visual
        ctx_v = sin_etq[max(0, m.start() - 18) : min(len(sin_etq), m.end() + 10)]
        if re.search(r"\bpuntas?\s+de\s+(?:la\s+)?flecha", ctx_v, re.IGNORECASE):
            continue
        hallazgos.append(f"Detalle solo visual: {m.group(0).strip()}")

    palabras = len(sin_etq.split())
    return ResultadoRevision(
        numero=5,
        nombre="Figuras y tablas (sin 'ver figura', descripción)",
        sobre="texto + imagen" if not modo_whisper else "audio (transcripción)",
        estado="FALLA" if hallazgos else "APRUEBA",
        fallas=len(hallazgos),
        revisado=palabras,
        unidad="palabras",
        ejemplos=_dedup_limitar(hallazgos),
        nota="Solo texto; verificación con imagen requiere auditor-figuras" if not modo_whisper else "",
    )


# 21-11 (copiloto): el número 1 leído «un» suelto («V I H-un», «tipo un,», «FIGURA un a un»).
_REV6_UN_NUMERO_RE = re.compile(
    r"(?:\w-|\b(?:tipo|calle|clase|grupo|fase|fig\.|figura|tabla|capítulo|parte|nivel|estadio|grado|"
    r"número|carril|paso|columna|fila|cromosoma|canal|receptor|complejo|fotosistema|región)\s+(?:uno\s+a\s+)?)"
    r"un\b(?!\s+poco\b)",
    re.IGNORECASE,
)


def _revision_6_simbolos_iones_miles(texto: str, *, modo_whisper: bool = False) -> ResultadoRevision:
    """Revisión 6: símbolos, iones mal leídos, leyendas de fórmula, unidades, griegas y miles."""
    hallazgos: list[str] = []
    sin_etq = _ETIQUETA_VOZ_RE.sub(" ", texto)

    if not modo_whisper:
        # Nombres propios con dígito pegado a letra (E6, H5N1, p53, CD4) no son «dígito sin convertir»
        for m in re.finditer(r"(?<![A-Za-z0-9])\d+", sin_etq):
            ctx = sin_etq[max(0, m.start() - 10) : min(len(sin_etq), m.end() + 10)]
            hallazgos.append(f"Dígito sin convertir: {_recortar(ctx, 45)}")
        for m in _REV6_SIMBOLOS_RE.finditer(sin_etq):
            ctx = sin_etq[max(0, m.start() - 8) : min(len(sin_etq), m.end() + 8)]
            hallazgos.append(f"Símbolo '{m.group(0)}': {_recortar(ctx, 45)}")
        for m in _REV6_GRIEGAS_RE.finditer(sin_etq):
            hallazgos.append(f"Letra griega: {m.group(0)}")
        for m in _REV6_SUPER_SUB_RE.finditer(sin_etq):
            hallazgos.append(f"Super/subíndice: {m.group(0)}")
        for m in _REV6_ION_SIMBOLO_RE.finditer(sin_etq):
            hallazgos.append(f"Ion sin convertir: {m.group(0)}")
        for m in _REV6_UNIDADES_SUELTAS_RE.finditer(sin_etq):
            hallazgos.append(f"Unidad/símbolo suelto: {m.group(0)}")

    for m in _REV6_ION_MAL_LEIDO_RE.finditer(sin_etq):
        hallazgos.append(f"Ion mal leído: {m.group(0)}")
    for m in _REV6_FORMULA_IGUALA_RE.finditer(sin_etq):
        hallazgos.append(f"Fórmula/leyenda ('iguala'): {m.group(0)}")
    for m in _REV6_COMA_CERO_CERO_RE.finditer(sin_etq):
        hallazgos.append(f"Posible mil como decimal: {m.group(0)}")
    for m in _REV6_MILES_PALABRAS_RE.finditer(sin_etq):
        prefijo = sin_etq[max(0, m.start() - 40) : m.start()]
        if re.search(rf"\bmenos(?:[ \t]+(?:y|{_NUM_PAL_PAT})){{0,3}}[ \t]+$", prefijo, re.IGNORECASE):
            continue
        hallazgos.append(f"Miles como decimal: {m.group(0)}")
    for m in _REV6_UN_COMA_RE.finditer(sin_etq):
        hallazgos.append(f"Uso de 'un coma': {m.group(0)}")
    for m in _REV6_CONCORDANCIA_UN_RE.finditer(sin_etq):
        hallazgos.append(f"Concordancia: {m.group(0)}")
    for m in _REV6_UN_NUMERO_RE.finditer(sin_etq):
        hallazgos.append(f"Número 1 leído 'un' (va 'uno'): {m.group(0)}")

    palabras = len(sin_etq.split())
    return ResultadoRevision(
        numero=6,
        nombre="Símbolos, iones, fórmulas, unidades, griegas, miles",
        sobre="texto" if not modo_whisper else "audio (transcripción)",
        estado="FALLA" if hallazgos else "APRUEBA",
        fallas=len(hallazgos),
        revisado=palabras,
        unidad="palabras",
        ejemplos=_dedup_limitar(hallazgos),
    )


def _revision_7_siglas_secciones_titulos(
    texto: str,
    siglas: list[str],
    *,
    modo_whisper: bool = False,
    siglas_palabra: frozenset[str] | None = None,
) -> ResultadoRevision:
    """Revisión 7: siglas sin espaciar, números de sección sueltos y títulos en su línea."""
    hallazgos: list[str] = []
    sin_etq = _ETIQUETA_VOZ_RE.sub(" ", texto)
    palabras_sigla = (
        _cargar_siglas_palabra() if siglas_palabra is None else siglas_palabra
    )

    # 1. Siglas conocidas sin deletrear
    siglas_set = set(siglas)
    for s in sorted(siglas_set, key=len, reverse=True):
        if not s:
            continue
        for m in re.finditer(rf"(?<!\w){re.escape(s)}(?!\w)", sin_etq):
            hallazgos.append(f"Sigla sin deletrear: {m.group(0)}")

    # 2. Otras siglas en mayúsculas (en líneas que no estén totalmente en mayúsculas)
    for linea in sin_etq.splitlines():
        palabras_l = linea.split()
        if not palabras_l:
            continue
        mayus_l = sum(1 for p in palabras_l if p.isupper() and len(p) > 1)
        if mayus_l / len(palabras_l) >= 0.5 and len(palabras_l) >= 2:
            continue
        for m in _REV7_SIGLA_CAPS_RE.finditer(linea):
            tok = m.group(0)
            if (
                tok in siglas_set
                or tok in ROMANOS_IGNORAR
                or tok in PALABRAS_MAYUS_IGNORAR
                or tok in palabras_sigla
            ):
                continue
            hallazgos.append(f"Sigla en mayúsculas: {tok}")

    # 3. Números de sección sueltos o mal convertidos («2 a 3.1», «cinco coma un ...»)
    patron_sec = _REV7_SECCION_WHISPER_RE if modo_whisper else _REV7_SECCION_DIGITOS_RE
    for m in patron_sec.finditer(sin_etq):
        hallazgos.append(f"Número de sección suelto: {m.group(0).strip()}")
    for m in _REV7_SECCION_COMA_RE.finditer(sin_etq):
        hallazgos.append(f"Sección con 'coma': {_recortar(m.group(0), 60)}")

    # 4. Títulos pegados al párrafo y verificación de títulos en línea aparte (regla 18)
    if not modo_whisper:
        for m in _REV7_TITULO_PEGADO_RE.finditer(sin_etq):
            ctx = sin_etq[max(0, m.start() - 15) : min(len(sin_etq), m.end() + 35)]
            hallazgos.append(f"Título pegado al párrafo: {_recortar(ctx, 70)}")

        for m in _REV7_RECUADRO_PEGADO_RE.finditer(sin_etq):
            ctx = sin_etq[max(0, m.start() - 15) : min(len(sin_etq), m.end() + 45)]
            hallazgos.append(f"Recuadro pegado al párrafo: {_recortar(ctx, 70)}")

        total_palabras = len(sin_etq.split())
        if total_palabras >= MIN_PALABRAS_EXIGIR_TITULOS:
            hay_titulo_propio = any(_es_linea_titulo(ln) for ln in sin_etq.splitlines())
            if not hay_titulo_propio:
                hallazgos.append(
                    f"Sin líneas de título propias (regla 18) en {total_palabras} palabras"
                )

    palabras = len(sin_etq.split())
    return ResultadoRevision(
        numero=7,
        nombre="Siglas, números de sección y títulos en su línea",
        sobre="texto" if not modo_whisper else "audio (transcripción)",
        estado="FALLA" if hallazgos else "APRUEBA",
        fallas=len(hallazgos),
        revisado=palabras,
        unidad="palabras",
        ejemplos=_dedup_limitar(hallazgos),
    )


def _revision_8_palabras_partidas(texto: str, *, modo_whisper: bool = False) -> ResultadoRevision:
    """Revisión 8: palabras cortadas por guion y ligaduras partidas («fi gura», «fl ujo»)."""
    hallazgos: list[str] = []
    sin_etq = _ETIQUETA_VOZ_RE.sub(" ", texto)

    if not modo_whisper:
        for m in _REV8_CORTE_GUION_RE.finditer(sin_etq):
            hallazgos.append(f"Corte por guion: {m.group(0)}")
        for m in _REV8_LIGADURA_PARTIDA_RE.finditer(sin_etq):
            hallazgos.append(f"Ligadura partida: {m.group(0)}")
        for m in _REV8_LIGADURA_UNICODE_RE.finditer(sin_etq):
            ctx = sin_etq[max(0, m.start() - 8) : min(len(sin_etq), m.end() + 8)]
            hallazgos.append(f"Ligadura Unicode: {_recortar(ctx, 40)}")

    palabras = len(sin_etq.split())
    return ResultadoRevision(
        numero=8,
        nombre="Palabras partidas y ligaduras",
        sobre="texto" if not modo_whisper else "audio (transcripción)",
        estado="FALLA" if hallazgos else "APRUEBA",
        fallas=len(hallazgos),
        revisado=palabras,
        unidad="palabras",
        ejemplos=_dedup_limitar(hallazgos),
    )


# ============================================================================
# REVISIONES 9 A 12 (SOBRE EL AUDIO)
# ============================================================================


def _numero_a_palabras_es(n: int) -> str:
    """Conversión básica de enteros >=0 a palabras en español para normalizar cifras de Whisper."""
    if n < 0 or n > 999_999_999:
        return str(n)
    if n == 0:
        return "cero"
    unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"]
    decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"]
    diez_y = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"]
    veinti = ["veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"]
    centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"]

    partes: list[str] = []
    if n >= 1_000_000:
        m = n // 1_000_000
        r = n % 1_000_000
        partes.append("un millón" if m == 1 else f"{_numero_a_palabras_es(m)} millones")
        if r:
            partes.append(_numero_a_palabras_es(r))
        return " ".join(partes)
    if n >= 1000:
        m = n // 1000
        r = n % 1000
        partes.append("mil" if m == 1 else f"{_numero_a_palabras_es(m)} mil")
        n = r
    if n > 0:
        c = n // 100
        d = n % 100
        if c == 1 and d == 0:
            partes.append("cien")
        elif c > 0:
            partes.append(centenas[c])
        if d > 0:
            if d < 10:
                partes.append(unidades[d])
            elif d <= 19:
                partes.append(diez_y[d - 10])
            elif d <= 29:
                partes.append(veinti[d - 20])
            else:
                partes.append(decenas[d // 10] if d % 10 == 0 else f"{decenas[d // 10]} y {unidades[d % 10]}")
    return " ".join(partes)


_PALABRAS_NUMERO_EXACTAS = PALABRAS_NUMERO - {"coma", "punto"}


def _normalizar_para_whisper(texto: str) -> list[str]:
    """Normaliza texto esperado o salida de Whisper para comparar sin falsos positivos por cifras."""
    t = unicodedata.normalize("NFC", texto)
    t = _ETIQUETA_VOZ_RE.sub(" ", t)
    t = t.replace("%", " por ciento ")
    # 22-nov (calibración Rev 9): separadores de miles inequívocos antes de decimales
    t = re.sub(
        r"\b\d{1,3}(?:,\d{3}){2,}\b|\b\d{1,3}(?:\.000){2,}\b",
        lambda m: _numero_a_palabras_es(int(m.group(0).replace(",", "").replace(".", ""))),
        t,
    )
    t = re.sub(
        r"\b([1-9]\d{0,2})[.,]000\b(?![.,]\d)",
        lambda m: _numero_a_palabras_es(int(m.group(1)) * 1000),
        t,
    )
    # 22-nov (calibración Rev 9): numeraciones de 3+ niveles (1.8.1, 2.1.4) antes de la regla decimal
    t = re.sub(
        r"\b(\d+(?:\.\d+){2,})\b",
        lambda m: " punto ".join(_numero_a_palabras_es(int(p)) for p in m.group(1).split(".")),
        t,
    )
    t = re.sub(
        r"(\d+)[.,](\d+)",
        lambda m: f"{_numero_a_palabras_es(int(m.group(1)))} coma {' '.join(_numero_a_palabras_es(int(ch)) for ch in m.group(2))}",
        t,
    )
    t = re.sub(r"\d+", lambda m: _numero_a_palabras_es(int(m.group(0))), t)
    t = _RE_COLAPSAR_SIGLA_ESPACIADA.sub(lambda m: m.group(0).replace(" ", ""), t)
    descompuesto = unicodedata.normalize("NFD", t.lower())
    plano = "".join(ch for ch in descompuesto if unicodedata.category(ch) != "Mn")
    tokens = re.findall(r"[a-zñ0-9]+", plano)
    # 22-nov (calibración Rev 9): normalizar «punto» -> «coma» solo entre palabras numéricas
    n = len(tokens)
    for i in range(1, n - 1):
        if (
            tokens[i] == "punto"
            and tokens[i - 1] in _PALABRAS_NUMERO_EXACTAS
            and tokens[i + 1] in _PALABRAS_NUMERO_EXACTAS
        ):
            tokens[i] = "coma"
    return tokens


def _transcribir_audio_whisper(
    ruta_audio: Path,
    modelo_instancia: Any = None,
) -> tuple[str, list[dict[str, Any]], float] | None:
    """Transcribe la pista completa con faster_whisper small; devuelve (texto, words, duracion) o None."""
    try:
        if modelo_instancia is None:
            from faster_whisper import WhisperModel  # type: ignore

            modelo_instancia = WhisperModel(
                WHISPER_MODELO,
                device=WHISPER_DEVICE,
                compute_type=WHISPER_COMPUTE_TYPE,
            )
        segments, info = modelo_instancia.transcribe(
            str(ruta_audio), language="es", word_timestamps=True
        )
        partes_txt: list[str] = []
        palabras: list[dict[str, Any]] = []
        for seg in segments:
            txt_s = str(getattr(seg, "text", "") or "").strip()
            if txt_s:
                partes_txt.append(txt_s)
            for w in getattr(seg, "words", None) or []:
                palabras.append(
                    {
                        "word": str(getattr(w, "word", "") or "").strip(),
                        "start": float(getattr(w, "start", 0.0)),
                        "end": float(getattr(w, "end", 0.0)),
                    }
                )
        dur = float(getattr(info, "duration", 0.0) or 0.0)
        return " ".join(partes_txt).strip(), palabras, dur
    except Exception:
        return None


def _transcribir_trozo_whisper(
    ruta_audio: Path,
    inicio_seg: float,
    dur_seg: float,
    modelo_instancia: Any,
) -> str | None:
    """Extrae un trozo con ffmpeg a WAV 16 kHz mono y lo transcribe con Whisper."""
    try:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tf:
            tmp_wav = Path(tf.name)
        try:
            subprocess.run(
                [
                    "ffmpeg", "-y", "-v", "error",
                    "-ss", f"{max(0.0, inicio_seg):.3f}",
                    "-t", f"{dur_seg:.3f}",
                    "-i", str(ruta_audio),
                    "-ac", "1", "-ar", "16000",
                    str(tmp_wav),
                ],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            seg, _ = modelo_instancia.transcribe(str(tmp_wav), language="es")
            return " ".join(str(x.text).strip() for x in seg).strip()
        finally:
            if tmp_wav.exists():
                tmp_wav.unlink(missing_ok=True)
    except Exception:
        return None


def _obtener_duracion_ffprobe(ruta_audio: Path) -> float | None:
    try:
        out = subprocess.check_output(
            [
                "ffprobe", "-v", "error",
                "-show_entries", "format=duration",
                "-of", "csv=p=0",
                str(ruta_audio),
            ],
            stderr=subprocess.DEVNULL,
            text=True,
        ).strip()
        return float(out)
    except Exception:
        return None


def _medir_volumedetect(
    ruta_audio: Path,
    inicio_seg: float | None = None,
    dur_seg: float | None = None,
) -> tuple[float, float] | None:
    """Ejecuta ffmpeg volumedetect y devuelve (mean_volume_db, max_volume_db)."""
    cmd = ["ffmpeg", "-hide_banner", "-nostats"]
    if inicio_seg is not None:
        cmd.extend(["-ss", f"{max(0.0, inicio_seg):.3f}"])
    if dur_seg is not None:
        cmd.extend(["-t", f"{dur_seg:.3f}"])
    cmd.extend(["-i", str(ruta_audio), "-af", "volumedetect", "-f", "null", "-"])
    try:
        proc = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        m_mean = re.search(r"mean_volume:\s*(-?\d+(?:\.\d+)?)\s*dB", proc.stderr)
        m_max = re.search(r"max_volume:\s*(-?\d+(?:\.\d+)?)\s*dB", proc.stderr)
        if not m_mean or not m_max:
            return None
        return float(m_mean.group(1)), float(m_max.group(1))
    except Exception:
        return None


def _detectar_silencios_ffmpeg(
    ruta_audio: Path,
    umbral_db: float = UMBRAL_SILENCIO_DB,
    min_dur_seg: float = MAX_SILENCIO_INTERNO_SEG,
) -> list[tuple[float, float, float]] | None:
    """Ejecuta ffmpeg silencedetect y devuelve [(start, end, duration), ...]."""
    cmd = [
        "ffmpeg", "-hide_banner", "-nostats",
        "-i", str(ruta_audio),
        "-af", f"silencedetect=noise={umbral_db:g}dB:d={min_dur_seg:g}",
        "-f", "null", "-",
    ]
    try:
        proc = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if proc.returncode != 0 and "silence_" not in proc.stderr and "Duration:" not in proc.stderr:
            return None
        silencios: list[tuple[float, float, float]] = []
        ultimo_ini: float | None = None
        for linea in proc.stderr.splitlines():
            m_ini = re.search(r"silence_start:\s*(\d+(?:\.\d+)?)", linea)
            if m_ini:
                ultimo_ini = float(m_ini.group(1))
                continue
            m_fin = re.search(
                r"silence_end:\s*(\d+(?:\.\d+)?)\s*\|\s*silence_duration:\s*(\d+(?:\.\d+)?)",
                linea,
            )
            if m_fin:
                fin = float(m_fin.group(1))
                dur = float(m_fin.group(2))
                ini = ultimo_ini if ultimo_ini is not None else max(0.0, fin - dur)
                silencios.append((ini, fin, dur))
                ultimo_ini = None
        return silencios
    except Exception:
        return None


def _revision_9_whisper_vs_texto(
    texto_esperado: str | None,
    transcripcion: tuple[str, list[dict[str, Any]], float] | None,
) -> ResultadoRevision:
    """Revisión 9: Whisper de la pista entera contra el texto esperado (>3 palabras = falla)."""
    if texto_esperado is None or transcripcion is None:
        motivo = "Sin texto esperado" if texto_esperado is None else "Whisper no disponible o falló"
        return ResultadoRevision(
            numero=9,
            nombre="Audio = texto (Whisper pista entera)",
            sobre="audio",
            estado="sin revisar",
            fallas=0,
            revisado=0,
            unidad="palabras",
            ejemplos=[],
            nota=motivo,
        )

    texto_oido, _, _ = transcripcion
    pal_esp = _normalizar_para_whisper(texto_esperado)
    pal_oido = _normalizar_para_whisper(texto_oido)
    matcher = difflib.SequenceMatcher(None, pal_esp, pal_oido, autojunk=False)

    discrepancias: list[str] = []
    fallas = 0
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == "equal":
            continue
        largo = max(i2 - i1, j2 - j1)
        if largo > MAX_DISCREPANCIA_WHISPER_PALABRAS:
            fallas += 1
            frag_esp = " ".join(pal_esp[i1:i2]) or "(vacío)"
            frag_oido = " ".join(pal_oido[j1:j2]) or "(vacío)"
            discrepancias.append(
                f"[{tag}] esperado: '{_recortar(frag_esp, 45)}' vs oído: '{_recortar(frag_oido, 45)}'"
            )

    sim_pct = matcher.ratio() * 100.0
    return ResultadoRevision(
        numero=9,
        nombre="Audio = texto (Whisper pista entera)",
        sobre="audio",
        estado="FALLA" if fallas > 0 else "APRUEBA",
        fallas=fallas,
        revisado=len(pal_esp),
        unidad="palabras",
        ejemplos=_dedup_limitar(discrepancias),
        nota=f"similitud {sim_pct:.1f}%",
    )


def _revision_10_cortes(
    ruta_audio: Path,
    texto_esperado: str | None,
    transcripcion: tuple[str, list[dict[str, Any]], float] | None,
    modelo_whisper: Any = None,
) -> ResultadoRevision:
    """Revisión 10: empieza en título, cierra frase y subtítulo, 3 a 20 min, sin desvanecido."""
    dur_seg = _obtener_duracion_ffprobe(ruta_audio)
    if dur_seg is None and transcripcion is not None and transcripcion[2] > 0:
        dur_seg = transcripcion[2]
    if dur_seg is None or dur_seg <= 0:
        return ResultadoRevision(
            numero=10,
            nombre="Cortes (título, cierre, 3-20 min, sin desvanecido)",
            sobre="audio",
            estado="sin revisar",
            fallas=0,
            revisado=0,
            unidad="partes",
            ejemplos=[],
            nota="No se pudo medir la duración (ffprobe/Whisper no disponible)",
        )

    hallazgos: list[str] = []
    dur_min = dur_seg / 60.0
    es_completo = "_completo" in ruta_audio.stem.lower()

    if not es_completo and not (MIN_DURACION_PARTE_MIN <= dur_min <= MAX_DURACION_PARTE_MIN):
        hallazgos.append(
            f"Duración fuera de rango ({dur_min:.1f} min; esperado {MIN_DURACION_PARTE_MIN:g}-{MAX_DURACION_PARTE_MIN:g} min)"
        )

    # Extraer texto de los primeros y últimos 15 s
    ini_txt: str | None = None
    fin_txt: str | None = None
    if transcripcion is not None and transcripcion[1]:
        words = transcripcion[1]
        ini_txt = " ".join(w["word"] for w in words if w["start"] <= VENTANA_CORTE_SEG).strip()
        fin_txt = " ".join(w["word"] for w in words if w["end"] >= max(0.0, dur_seg - VENTANA_CORTE_SEG)).strip()
    elif transcripcion is not None and transcripcion[0] and dur_seg <= VENTANA_CORTE_SEG * 2:
        ini_txt = transcripcion[0]
        fin_txt = transcripcion[0]
    elif modelo_whisper is not None:
        ini_txt = _transcribir_trozo_whisper(ruta_audio, 0.0, VENTANA_CORTE_SEG, modelo_whisper)
        fin_txt = _transcribir_trozo_whisper(ruta_audio, max(0.0, dur_seg - VENTANA_CORTE_SEG), VENTANA_CORTE_SEG, modelo_whisper)

    if ini_txt is None or fin_txt is None:
        return ResultadoRevision(
            numero=10,
            nombre="Cortes (título, cierre, 3-20 min, sin desvanecido)",
            sobre="audio",
            estado="sin revisar",
            fallas=0,
            revisado=1,
            unidad="partes",
            ejemplos=hallazgos,
            nota="No se pudo revisar inicio/final con Whisper",
        )

    # 1) Inicio: si la primera palabra es minúscula o conector de mitad de frase, o no inicia en título cuando hay mapa en texto
    primera_pal = re.sub(r"^[^\wÁÉÍÓÚÜÑáéíóúüñ]+", "", ini_txt.strip()).split(" ", 1)[0]
    if primera_pal and (
        primera_pal[0].islower()
        or primera_pal.lower() in {"y", "o", "pero", "que", "porque", "donde", "cual", "cuyo"}
    ):
        hallazgos.append(f"Inicio cortado a media frase: '{_recortar(ini_txt, 60)}'")
    elif texto_esperado:
        titulos_texto = [
            " ".join(_normalizar_para_whisper(ln)[:4])
            for ln in texto_esperado.splitlines()
            if _es_linea_titulo(ln) and len(_normalizar_para_whisper(ln)) >= 2
        ]
        ini_norm = " ".join(_normalizar_para_whisper(ini_txt)[:6])
        if titulos_texto and not any(t and t in ini_norm for t in titulos_texto):
            hallazgos.append(f"Inicio no coincide con un título del texto: '{_recortar(ini_txt, 60)}'")

    # 2) Cierre: frase completa y no terminar en material no narrable
    if not re.search(r"[.?!»”\"]\s*$", fin_txt.strip()):
        hallazgos.append(f"Final sin cierre de frase: '{_recortar(fin_txt[-80:], 65)}'")
    if _REV10_NO_NARRABLE_RE.search(fin_txt):
        hallazgos.append(f"Final en material no narrable: '{_recortar(fin_txt[-80:], 65)}'")

    # 3) Detección de desvanecido (fade-out) al final de la voz activa
    if dur_seg >= 6.0:
        silencios_cola = _detectar_silencios_ffmpeg(ruta_audio, UMBRAL_SILENCIO_DB, 0.3)
        t_fin_voz = dur_seg
        if silencios_cola:
            ult_ini, ult_fin, _ = silencios_cola[-1]
            if ult_fin >= dur_seg - 0.5:
                t_fin_voz = ult_ini
        if t_fin_voz >= 4.0:
            vol_prev = _medir_volumedetect(ruta_audio, max(0.0, t_fin_voz - 3.0), 2.0)
            vol_cola = _medir_volumedetect(ruta_audio, max(0.0, t_fin_voz - 1.0), 1.0)
            if vol_prev and vol_cola:
                if vol_cola[0] < vol_prev[0] - UMBRAL_DESVANECIDO_DB:
                    hallazgos.append(
                        f"Posible desvanecido al final ({vol_prev[0]:.1f} dB -> {vol_cola[0]:.1f} dB)"
                    )

    return ResultadoRevision(
        numero=10,
        nombre="Cortes (título, cierre, 3-20 min, sin desvanecido)",
        sobre="audio",
        estado="FALLA" if hallazgos else "APRUEBA",
        fallas=len(hallazgos),
        revisado=1,
        unidad="partes",
        ejemplos=_dedup_limitar(hallazgos),
        nota=f"{dur_min:.1f} min",
    )


def _revision_11_volumen_silencios(ruta_audio: Path) -> ResultadoRevision:
    """Revisión 11: saltos de volumen, silencios > 3 s y niveles de audio con ffmpeg."""
    vol_global = _medir_volumedetect(ruta_audio)
    silencios = _detectar_silencios_ffmpeg(ruta_audio, UMBRAL_SILENCIO_DB, MAX_SILENCIO_INTERNO_SEG)
    if vol_global is None or silencios is None:
        return ResultadoRevision(
            numero=11,
            nombre="Volumen y silencios (ffmpeg)",
            sobre="audio",
            estado="sin revisar",
            fallas=0,
            revisado=0,
            unidad="pistas",
            ejemplos=[],
            nota="ffmpeg no disponible o falló al analizar el audio",
        )

    hallazgos: list[str] = []
    mean_db, max_db = vol_global
    if mean_db < MIN_VOLUMEN_MEDIO_DB:
        hallazgos.append(f"Volumen medio muy bajo: {mean_db:.1f} dB (< {MIN_VOLUMEN_MEDIO_DB:g} dB)")
    if mean_db > MAX_VOLUMEN_MEDIO_DB:
        hallazgos.append(f"Volumen medio muy alto: {mean_db:.1f} dB (> {MAX_VOLUMEN_MEDIO_DB:g} dB)")
    if max_db >= MAX_VOLUMEN_PICO_CLIPPING_DB:
        hallazgos.append(f"Saturación / clipping: pico {max_db:.1f} dB (>= {MAX_VOLUMEN_PICO_CLIPPING_DB:g} dB)")

    for ini, fin, dur in silencios:
        hallazgos.append(f"Silencio > {MAX_SILENCIO_INTERNO_SEG:g} s: {dur:.2f} s ({ini:.1f}s - {fin:.1f}s)")

    # Saltos de volumen entre ventanas del audio
    dur_total = _obtener_duracion_ffprobe(ruta_audio)
    if dur_total and dur_total >= DURACION_VENTANA_VOLUMEN_SEG * 2:
        n_win = min(NUM_VENTANAS_SALTO_VOLUMEN, max(2, int(dur_total // DURACION_VENTANA_VOLUMEN_SEG)))
        paso = max(0.0, (dur_total - DURACION_VENTANA_VOLUMEN_SEG) / max(1, n_win - 1))
        medias: list[float] = []
        for idx in range(n_win):
            v = _medir_volumedetect(ruta_audio, idx * paso, DURACION_VENTANA_VOLUMEN_SEG)
            if v is not None and v[0] > -70.0:
                medias.append(v[0])
        if len(medias) >= 2:
            salto = max(medias) - min(medias)
            if salto > MAX_SALTO_VOLUMEN_DB:
                hallazgos.append(
                    f"Salto de volumen entre tramos: {salto:.1f} dB (min {min(medias):.1f}, max {max(medias):.1f})"
                )

    return ResultadoRevision(
        numero=11,
        nombre="Volumen y silencios (ffmpeg)",
        sobre="audio",
        estado="FALLA" if hallazgos else "APRUEBA",
        fallas=len(hallazgos),
        revisado=1,
        unidad="pistas",
        ejemplos=_dedup_limitar(hallazgos),
        nota=f"medio {mean_db:.1f} dB, pico {max_db:.1f} dB",
    )


def _revision_12_voz_modelo_manifiesto(ruta_manifiesto: Path | None) -> ResultadoRevision:
    """Revisión 12: verifica voz Puck y modelo único en manifiesto.json."""
    if ruta_manifiesto is None or not ruta_manifiesto.is_file():
        return ResultadoRevision(
            numero=12,
            nombre="Voz y modelo únicos (manifiesto)",
            sobre="audio",
            estado="sin revisar",
            fallas=0,
            revisado=0,
            unidad="bloques",
            ejemplos=[],
            nota="No se encontró manifiesto.json",
        )

    try:
        datos = json.loads(ruta_manifiesto.read_text(encoding="utf-8"))
    except Exception as exc:
        return ResultadoRevision(
            numero=12,
            nombre="Voz y modelo únicos (manifiesto)",
            sobre="audio",
            estado="sin revisar",
            fallas=0,
            revisado=0,
            unidad="bloques",
            ejemplos=[],
            nota=f"No se pudo leer manifiesto.json: {exc}",
        )

    if isinstance(datos, dict):
        items = list(datos.get("bloques") or [datos])
    elif isinstance(datos, list):
        items = datos
    else:
        items = []

    if not items:
        return ResultadoRevision(12, "Voz y modelo únicos (manifiesto)", "audio", "sin revisar", 0, 0, "bloques", [], "Manifiesto vacío")

    hallazgos: list[str] = []
    modelos_vistos: set[str] = set()
    voces_vistas: set[str] = set()
    sin_modelo = 0

    for item in items:
        if not isinstance(item, dict):
            continue
        j = item.get("j", "?")
        accion = str(item.get("accion") or "").strip().upper()
        modelo = item.get("modelo")
        voz = item.get("voz")

        if accion == "REUSAR_ANTERIOR":
            hallazgos.append(f"Bloque j={j} reusado del audio anterior sin modelo verificado")
            continue

        if modelo is None or str(modelo).strip() == "":
            sin_modelo += 1
        else:
            m_str = str(modelo).strip()
            modelos_vistos.add(m_str)
            if m_str != MODELO_TTS_OFICIAL:
                hallazgos.append(f"Bloque j={j} usa modelo distinto ({m_str} != {MODELO_TTS_OFICIAL})")

        if voz is not None and str(voz).strip() != "":
            v_str = str(voz).strip()
            voces_vistas.add(v_str)
            if v_str != VOZ_OFICIAL:
                hallazgos.append(f"Bloque j={j} usa voz distinta ({v_str} != {VOZ_OFICIAL})")

    if len(modelos_vistos) > 1:
        hallazgos.append(f"Modelos mezclados: {', '.join(sorted(modelos_vistos))}")
    if len(voces_vistas) > 1:
        hallazgos.append(f"Voces mezcladas: {', '.join(sorted(voces_vistas))}")

    if hallazgos:
        return ResultadoRevision(
            numero=12,
            nombre="Voz y modelo únicos (manifiesto)",
            sobre="audio",
            estado="FALLA",
            fallas=len(hallazgos),
            revisado=len(items),
            unidad="bloques",
            ejemplos=_dedup_limitar(hallazgos),
        )

    if sin_modelo > 0:
        return ResultadoRevision(
            numero=12,
            nombre="Voz y modelo únicos (manifiesto)",
            sobre="audio",
            estado="sin revisar",
            fallas=0,
            revisado=len(items),
            unidad="bloques",
            ejemplos=[],
            nota=f"{sin_modelo}/{len(items)} bloques sin campo modelo en manifiesto",
        )

    nota_voz = "voz verificada" if voces_vistas else "voz no registrada en esquema de manifiesto"
    return ResultadoRevision(
        numero=12,
        nombre="Voz y modelo únicos (manifiesto)",
        sobre="audio",
        estado="APRUEBA",
        fallas=0,
        revisado=len(items),
        unidad="bloques",
        ejemplos=[],
        nota=f"{MODELO_TTS_OFICIAL}; {nota_voz}",
    )


# ============================================================================
# ORQUESTACIÓN POR CAPÍTULO Y REPORTE MARKDOWN
# ============================================================================


def renderizar_reporte_markdown(res: ResultadoCapitulo) -> str:
    """Genera el informe Markdown por capítulo para docs/audio-bloques/aceptacion/<capitulo>.md."""
    ahora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    txt_str = _citar_ruta(res.ruta_texto) if res.ruta_texto else "sin archivo de texto"
    aud_str = _citar_ruta(res.ruta_audio) if res.ruta_audio else "sin revisar (no se pasó audio)"
    pdf_str = _citar_ruta(res.ruta_pdf_texto) if res.ruta_pdf_texto else "sin revisar (no se encontró *_texto_paginas.txt)"

    lineas = [
        f"# Aceptación: {res.capitulo}",
        "",
        f"- **Texto:** {txt_str}",
        f"- **Audio:** {aud_str}",
        f"- **Referencia PDF:** {pdf_str}",
        f"- **Fecha:** {ahora}",
        f"- **Veredicto final:** **{res.veredicto}** ({res.detalle_veredicto})",
        "",
        "| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |",
        "|---|---|---|---|---|---|",
    ]

    for rev in res.revisiones:
        if rev.estado == "sin revisar":
            ratio_str = f"sin revisar ({rev.nota})" if rev.nota else "sin revisar"
            ej_str = "sin revisar"
        else:
            ratio_str = f"{rev.fallas} / {rev.revisado} {rev.unidad}"
            if rev.nota:
                ratio_str += f" ({rev.nota})"
            ej_str = "; ".join(rev.ejemplos[:3]).replace("|", "\\|") if rev.ejemplos else "—"
            if len(rev.ejemplos) > 3:
                ej_str += f" (+{len(rev.ejemplos) - 3} más en Detalle)"
        lineas.append(
            f"| {rev.numero} | {rev.nombre} | {rev.sobre} | {rev.estado} | {ratio_str} | {ej_str} |"
        )

    con_detalle = [r for r in res.revisiones if r.ejemplos]
    if con_detalle:
        lineas.extend(["", "## Detalle de hallazgos (hasta 10 por revisión)", ""])
        for rev in con_detalle:
            lineas.append(f"### {rev.numero}. {rev.nombre} ({rev.fallas} fallas / {rev.revisado} {rev.unidad})")
            for ej in rev.ejemplos[:MAX_EJEMPLOS]:
                lineas.append(f"- {ej}")
            lineas.append("")

    return "\n".join(lineas).rstrip() + "\n"


RUTA_EXCEPCIONES = Path(__file__).resolve().parent / "aceptacion" / "excepciones.json"


def aplicar_excepciones(capitulo: str, revs: list[ResultadoRevision], ruta: Path = RUTA_EXCEPCIONES) -> None:
    """Excepciones revisadas a mano (16-nov): {capitulo: [{"rev": n, "contiene": "...", "motivo": "...", "reviso": "..."}]}.
    Solo se aplican si la revisión lista TODAS sus fallas (fallas == len(ejemplos)); si no, no se puede comprobar
    que la excepción cubre lo que se cree. Quedan escritas en la nota del informe."""
    if not ruta.is_file():
        return
    try:
        datos = json.loads(ruta.read_text(encoding="utf-8")).get(capitulo, [])
    except Exception:
        return
    for r in revs:
        exc = [e for e in datos if e.get("rev") == r.numero and e.get("contiene")]
        if not exc or r.fallas == 0 or (r.fallas != len(r.ejemplos) and r.fallas > MAX_EJEMPLOS):
            continue
        quedan, usadas = [], []
        for ej in r.ejemplos:
            e = next((e for e in exc if e["contiene"] in ej), None)
            (usadas if e else quedan).append((ej, e))
        if not usadas:
            continue
        r.ejemplos = [ej for ej, _ in quedan]
        r.fallas = len(r.ejemplos)
        notas = "; ".join(f"«{e['contiene'][:40]}»: {e.get('motivo', '')} ({e.get('reviso', '?')})" for _, e in usadas)
        r.nota = (r.nota + " | " if r.nota else "") + f"{len(usadas)} excepción(es) revisada(s): {notas}"
        if r.fallas == 0:
            r.estado = "APRUEBA"


def evaluar_capitulo(
    ruta_texto: Path | None = None,
    ruta_audio: Path | None = None,
    ruta_pdf_texto: Path | None = None,
    ruta_manifiesto: Path | None = None,
    dir_salida: Path | None = DIR_ACEPTACION_DEFECTO,
    transcribir_fn: Callable[[Path], tuple[str, list[dict[str, Any]], float] | None] | None = None,
    modelo_whisper: Any = None,
    solo_bordes_audio: bool = False,
) -> ResultadoCapitulo:
    """Ejecuta las 12 revisiones (1-8 texto, 9-12 audio si se pasa audio) y guarda el .md."""
    if ruta_texto is None and ruta_audio is None:
        raise ValueError("Debe indicarse al menos un archivo de texto (.md) o de audio.")

    siglas = _cargar_siglas_medicina()
    capitulo = (ruta_texto or ruta_audio).stem  # type: ignore[union-attr]

    texto_md: str | None = None
    if ruta_texto is not None:
        ruta_texto = Path(ruta_texto).resolve()  # ruta absoluta en el informe: capitulo_aceptado.py la compara por fecha
        if not ruta_texto.is_file():
            raise FileNotFoundError(f"No existe el archivo de texto: {_citar_ruta(ruta_texto)}")
        texto_md = ruta_texto.read_text(encoding="utf-8")
        pdf_resuelto = resolver_pdf_texto(ruta_texto, ruta_pdf_texto)
    else:
        pdf_resuelto = ruta_pdf_texto

    transcripcion: tuple[str, list[dict[str, Any]], float] | None = None
    if ruta_audio is not None:
        if not ruta_audio.is_file():
            raise FileNotFoundError(f"No existe el archivo de audio: {_citar_ruta(ruta_audio)}")
        if not solo_bordes_audio:
            if transcribir_fn is not None:
                transcripcion = transcribir_fn(ruta_audio)
            else:
                transcripcion = _transcribir_audio_whisper(ruta_audio, modelo_instancia=modelo_whisper)

    # Si solo se pasó audio (sin .md), auditar texto 3-8 sobre lo transcrito por Whisper
    texto_para_3_8 = texto_md if texto_md is not None else (transcripcion[0] if transcripcion else None)
    modo_whisper_3_8 = texto_md is None

    if texto_md is not None:
        rev1 = _revision_1_literalidad(texto_md, pdf_resuelto)
        rev2 = _revision_2_omisiones(texto_md, pdf_resuelto)
    else:
        rev1 = ResultadoRevision(1, "Literalidad (texto vs PDF crudo)", "texto", "sin revisar", 0, 0, "párrafos", [], "Sin archivo de texto .md")
        rev2 = ResultadoRevision(2, "Omisiones (PDF -> texto)", "texto", "sin revisar", 0, 0, "párrafos PDF", [], "Sin archivo de texto .md")

    if texto_para_3_8 is not None:
        rev3 = _revision_3_relleno(texto_para_3_8, modo_whisper=modo_whisper_3_8)
        rev4 = _revision_4_notas_pie(texto_para_3_8, modo_whisper=modo_whisper_3_8)
        rev5 = _revision_5_figuras_tablas(texto_para_3_8, modo_whisper=modo_whisper_3_8)
        rev6 = _revision_6_simbolos_iones_miles(texto_para_3_8, modo_whisper=modo_whisper_3_8)
        rev7 = _revision_7_siglas_secciones_titulos(texto_para_3_8, siglas, modo_whisper=modo_whisper_3_8)
        rev8 = _revision_8_palabras_partidas(texto_para_3_8, modo_whisper=modo_whisper_3_8)
    else:
        rev3 = ResultadoRevision(3, "Relleno leído (biblio, autoeval, créditos, portada)", "texto", "sin revisar", 0, 0, "palabras", [], "Sin texto ni transcripción")
        rev4 = ResultadoRevision(4, "Notas al pie (llamadas y glosas)", "texto", "sin revisar", 0, 0, "palabras", [], "Sin texto ni transcripción")
        rev5 = ResultadoRevision(5, "Figuras y tablas (sin 'ver figura', descripción)", "texto + imagen", "sin revisar", 0, 0, "palabras", [], "Sin texto ni transcripción")
        rev6 = ResultadoRevision(6, "Símbolos, iones, fórmulas, unidades, griegas, miles", "texto", "sin revisar", 0, 0, "palabras", [], "Sin texto ni transcripción")
        rev7 = ResultadoRevision(7, "Siglas, números de sección y títulos en su línea", "texto", "sin revisar", 0, 0, "palabras", [], "Sin texto ni transcripción")
        rev8 = ResultadoRevision(8, "Palabras partidas y ligaduras", "texto", "sin revisar", 0, 0, "palabras", [], "Sin texto ni transcripción")

    aplicar_excepciones(capitulo, [rev1, rev2, rev3, rev4, rev5, rev6, rev7, rev8])
    for _rv in (rev1, rev2):
        _rv.ejemplos = _rv.ejemplos[:MAX_EJEMPLOS]

    if ruta_audio is None:
        rev9 = ResultadoRevision(9, "Audio = texto (Whisper pista entera)", "audio", "sin revisar", 0, 0, "palabras", [], "No se pasó audio")
        rev10 = ResultadoRevision(10, "Cortes (título, cierre, 3-20 min, sin desvanecido)", "audio", "sin revisar", 0, 0, "partes", [], "No se pasó audio")
        rev11 = ResultadoRevision(11, "Volumen y silencios (ffmpeg)", "audio", "sin revisar", 0, 0, "pistas", [], "No se pasó audio")
        rev12 = ResultadoRevision(12, "Voz y modelo únicos (manifiesto)", "audio", "sin revisar", 0, 0, "bloques", [], "No se pasó audio")
    else:
        manifiesto = resolver_manifiesto(ruta_audio, ruta_texto, ruta_manifiesto)
        rev9 = _revision_9_whisper_vs_texto(texto_md, transcripcion)
        rev10 = _revision_10_cortes(ruta_audio, texto_md, transcripcion, modelo_whisper=modelo_whisper)
        rev11 = _revision_11_volumen_silencios(ruta_audio)
        rev12 = _revision_12_voz_modelo_manifiesto(manifiesto)

    revisiones = [rev1, rev2, rev3, rev4, rev5, rev6, rev7, rev8, rev9, rev10, rev11, rev12]

    hay_falla = any(r.estado == "FALLA" for r in revisiones)
    texto_sin_revisar = [r.numero for r in revisiones[:8] if r.estado == "sin revisar"]
    audio_sin_revisar = [r.numero for r in revisiones[8:] if r.estado == "sin revisar"]

    if hay_falla:
        veredicto = "FALLA"
        falladas = [str(r.numero) for r in revisiones if r.estado == "FALLA"]
        detalle = f"revisiones con fallas: {', '.join(falladas)}"
    elif texto_sin_revisar:
        veredicto = "FALLA"
        detalle = f"no verificado (texto sin revisar: {', '.join(map(str, texto_sin_revisar))})"
    elif ruta_audio is not None and audio_sin_revisar:
        veredicto = "FALLA"
        detalle = f"no verificado (audio sin revisar: {', '.join(map(str, audio_sin_revisar))})"
    elif ruta_audio is None:
        veredicto = "APRUEBA"
        detalle = "solo texto (revisiones 9-12 de audio sin revisar)"
    else:
        veredicto = "APRUEBA"
        detalle = "12 de 12 revisiones aprobadas"

    resultado = ResultadoCapitulo(
        capitulo=capitulo,
        ruta_texto=ruta_texto,
        ruta_audio=ruta_audio,
        ruta_pdf_texto=pdf_resuelto,
        veredicto=veredicto,
        detalle_veredicto=detalle,
        revisiones=revisiones,
    )

    if dir_salida is not None:
        dir_salida.mkdir(parents=True, exist_ok=True)
        ruta_md_out = dir_salida / f"{capitulo}.md"
        ruta_md_out.write_text(renderizar_reporte_markdown(resultado), encoding="utf-8")
        resultado.ruta_reporte = ruta_md_out

    return resultado


# ============================================================================
# MODO --resumen SOBRE CARPETA DE MP3 PUBLICADOS
# ============================================================================


def resumir_carpeta_mp3(
    carpeta_mp3: Path,
    *,
    usar_whisper: bool = True,
    solo_bordes: bool = False,
    transcribir_fn: Callable[[Path], tuple[str, list[dict[str, Any]], float] | None] | None = None,
    ruta_salida: Path | None = None,
) -> dict[str, Any]:
    """Audita todos los MP3 de una carpeta y devuelve un número por tipo de falla (sin tabla por capítulo)."""
    if not carpeta_mp3.is_dir():
        raise FileNotFoundError(f"No existe la carpeta de MP3: {_citar_ruta(carpeta_mp3)}")

    archivos_mp3 = sorted(carpeta_mp3.rglob("*.mp3"))
    if not archivos_mp3:
        raise FileNotFoundError(f"No se encontraron archivos .mp3 en: {_citar_ruta(carpeta_mp3)}")

    modelo_whisper = None
    if usar_whisper and transcribir_fn is None and not solo_bordes:
        try:
            from faster_whisper import WhisperModel  # type: ignore

            modelo_whisper = WhisperModel(
                WHISPER_MODELO,
                device=WHISPER_DEVICE,
                compute_type=WHISPER_COMPUTE_TYPE,
            )
        except Exception:
            modelo_whisper = None
    elif usar_whisper and solo_bordes:
        try:
            from faster_whisper import WhisperModel  # type: ignore

            modelo_whisper = WhisperModel(
                WHISPER_MODELO,
                device=WHISPER_DEVICE,
                compute_type=WHISPER_COMPUTE_TYPE,
            )
        except Exception:
            modelo_whisper = None

    conteo_piezas_con_falla: dict[int, int] = {i: 0 for i in range(1, 13)}
    conteo_total_fallas: dict[int, int] = {i: 0 for i in range(1, 13)}
    conteo_sin_revisar: dict[int, int] = {i: 0 for i in range(1, 13)}
    nombres_rev: dict[int, str] = {}

    for mp3 in archivos_mp3:
        fn_t = transcribir_fn if (usar_whisper and not solo_bordes) else None
        res = evaluar_capitulo(
            ruta_texto=None,
            ruta_audio=mp3,
            dir_salida=None,
            transcribir_fn=fn_t,
            modelo_whisper=modelo_whisper if usar_whisper else None,
            solo_bordes_audio=solo_bordes or not usar_whisper,
        )
        for rev in res.revisiones:
            nombres_rev[rev.numero] = rev.nombre
            if rev.estado == "sin revisar":
                conteo_sin_revisar[rev.numero] += 1
            elif rev.estado == "FALLA":
                conteo_piezas_con_falla[rev.numero] += 1
                conteo_total_fallas[rev.numero] += rev.fallas

    lineas = [
        f"# Resumen de aceptación: {_citar_ruta(carpeta_mp3)}",
        "",
        f"- **Piezas MP3 revisadas:** {len(archivos_mp3)}",
        "",
        "## Conteo por tipo de falla (un número por tipo)",
        "",
    ]
    for i in range(1, 13):
        nom = nombres_rev.get(i, f"Revisión {i}")
        sr = conteo_sin_revisar[i]
        pf = conteo_piezas_con_falla[i]
        tf = conteo_total_fallas[i]
        if sr == len(archivos_mp3):
            lineas.append(f"- **{i}. {nom}:** sin revisar ({sr}/{len(archivos_mp3)})")
        else:
            extra_sr = f" ({sr} sin revisar)" if sr > 0 else ""
            lineas.append(f"- **{i}. {nom}:** {pf} piezas con falla ({tf} hallazgos){extra_sr}")

    texto_resumen = "\n".join(lineas) + "\n"
    if ruta_salida is not None:
        ruta_salida.parent.mkdir(parents=True, exist_ok=True)
        ruta_salida.write_text(texto_resumen, encoding="utf-8")

    return {
        "total_mp3": len(archivos_mp3),
        "piezas_con_falla": conteo_piezas_con_falla,
        "total_fallas": conteo_total_fallas,
        "sin_revisar": conteo_sin_revisar,
        "texto": texto_resumen,
    }


# ============================================================================
# CLI
# ============================================================================


def main(argv: list[str] | None = None) -> int:
    _configurar_stdout_utf8()
    parser = argparse.ArgumentParser(
        description="Protocolo único de aceptación de audiolibros (12 revisiones)."
    )
    parser.add_argument(
        "entrada",
        help="Ruta al .md del capítulo (o carpeta de MP3 si se usa --resumen).",
    )
    parser.add_argument(
        "audio_posicional",
        nargs="?",
        default=None,
        help="Ruta opcional al archivo de audio (.mp3/.wav) del capítulo.",
    )
    parser.add_argument(
        "--audio",
        default=None,
        help="Ruta opcional al archivo de audio del capítulo.",
    )
    parser.add_argument(
        "--pdf-texto",
        default=None,
        help="Ruta explícita a *_texto_paginas.txt (si no se infiere automáticamente).",
    )
    parser.add_argument(
        "--manifiesto",
        default=None,
        help="Ruta explícita a manifiesto.json para la revisión 12.",
    )
    parser.add_argument(
        "--salida",
        default=None,
        help="Carpeta donde guardar <capitulo>.md (o archivo de salida en --resumen).",
    )
    parser.add_argument(
        "--resumen",
        action="store_true",
        help="Resume una carpeta de MP3 publicados: un número por tipo de falla, sin tabla por capítulo.",
    )
    parser.add_argument(
        "--solo-bordes",
        action="store_true",
        help="En --resumen, usa Whisper solo en los primeros y últimos 15 s (más rápido en lotes grandes).",
    )
    parser.add_argument(
        "--sin-whisper",
        action="store_true",
        help="Omite transcripción Whisper (las revisiones dependientes quedarán como 'sin revisar').",
    )
    args = parser.parse_args(argv)

    try:
        entrada = Path(args.entrada)
        if args.resumen:
            ruta_out = Path(args.salida) if args.salida else None
            res = resumir_carpeta_mp3(
                entrada,
                usar_whisper=not args.sin_whisper,
                solo_bordes=args.solo_bordes,
                ruta_salida=ruta_out,
            )
            print(res["texto"])
            return 0

        audio_arg = args.audio or args.audio_posicional
        ruta_audio = Path(audio_arg) if audio_arg else None
        ruta_texto: Path | None = entrada
        if entrada.suffix.lower() in (".mp3", ".wav", ".m4a", ".ogg", ".flac") and ruta_audio is None:
            ruta_audio = entrada
            ruta_texto = None

        dir_salida = Path(args.salida) if args.salida else DIR_ACEPTACION_DEFECTO
        res_cap = evaluar_capitulo(
            ruta_texto=ruta_texto,
            ruta_audio=ruta_audio,
            ruta_pdf_texto=Path(args.pdf_texto) if args.pdf_texto else None,
            ruta_manifiesto=Path(args.manifiesto) if args.manifiesto else None,
            dir_salida=dir_salida,
            solo_bordes_audio=args.sin_whisper,
        )
        print(renderizar_reporte_markdown(res_cap))
        if res_cap.ruta_reporte is not None:
            print(f"Informe guardado en: {_citar_ruta(res_cap.ruta_reporte)}")
        return 0 if res_cap.veredicto == "APRUEBA" else 1
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
