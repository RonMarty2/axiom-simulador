# -*- coding: utf-8 -*-
"""Corrección determinista de textos de audio (*_LITERAL_TTS.md).

Aplica solo correcciones seguras y reproducibles (R8, R3, R5, R6, R7) sin
parafrasear ni reescribir el texto literal, crea respaldo antes de modificar
y reporta los cambios y los casos ambiguos que requieren revisión humana.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import sys
import unicodedata
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable


NOMBRE_DIR_RESPALDO = "bak_correccion_16nov"

# ============================================================================
# DICCIONARIOS CERRADOS Y LISTAS SEGURAS
# ============================================================================

# R8: palabras legítimas terminadas en ff/fi/fl que nunca deben unirse a la siguiente.
_PALABRAS_LEGITIMAS_IZQ: frozenset[str] = frozenset({
    "wifi", "hi-fi", "staff", "bluff", "off", "riff", "sufi", "cheff", "puff",
})

# R8: palabras independientes frecuentes que nunca son la segunda mitad de una ligadura partida.
_NO_UNIR_DERECHA: frozenset[str] = frozenset({
    "al", "ante", "aunque", "bajo", "cada", "como", "con", "contra", "cual",
    "cuales", "cuando", "cuya", "cuyo", "de", "del", "desde", "donde",
    "durante", "el", "en", "entre", "era", "eran", "es", "esa", "esas",
    "ese", "eso", "esos", "esta", "estan", "están", "estas", "este", "esto",
    "estos", "fue", "fueron", "griega", "griego", "hacia", "han", "hasta",
    "igual", "la", "las", "le", "les", "lo", "los", "mas", "más", "mayor",
    "me", "mediante", "menor", "menos", "mi", "mientras", "misma", "mismo",
    "muy", "ni", "no", "nos", "otra", "otro", "para", "pero", "por", "porque",
    "pues", "que", "quien", "quienes", "se", "sea", "segun", "según", "ser",
    "si", "sin", "sino", "sobre", "son", "su", "sus", "tan", "te", "tiene",
    "tienen", "toda", "todo", "tras", "tu", "un", "una", "unas", "uno",
    "unos", "ya",
})

# R8: prefijos españoles/biomédicos seguros que terminan en ff/fi/fl/ffi/ffl
# (no son palabras independientes y en los PDF se parten tras la ligadura).
_PREFIJOS_LIGADURA_SEGUROS: frozenset[str] = frozenset({
    "acidifi", "afi", "afl", "amplifi", "anfi", "apofi", "apófi", "artifi",
    "asfi", "basófi", "benefi", "calcifi", "califi", "camufl", "certifi",
    "chifl", "clarifi", "clasifi", "clorofi", "confi", "confl", "cromófi",
    "cualifi", "cuantifi", "defi", "desafi", "desfi", "desfl", "desinfl",
    "diáfi", "diafi", "difi", "dignifi", "edifi", "efl", "enfi", "enfl",
    "eosinófi", "epífi", "epifi", "esclerifi", "esfi", "especifi",
    "estratifi", "fortifi", "fructifi", "gratifi", "halófi", "hemófi",
    "hidrófi", "hipofi", "hipófi", "humidifi", "identifi", "infi", "infl",
    "insufl", "justifi", "lipófi", "magnifi", "malefi", "mesófi", "metáfi",
    "metafi", "miofi", "modifi", "morfi", "necrófi", "neurofi", "neutrófi",
    "notifi", "ofi", "orifi", "osifi", "pacifi", "parafi", "perfi", "perfl",
    "personifi", "petrifi", "planifi", "porfi", "profi", "prolifi", "purifi",
    "ramifi", "ratifi", "rectifi", "refi", "refl", "rifl", "sacrifi",
    "santifi", "saprófi", "signifi", "simplifi", "sínfi", "sinfi", "sofl",
    "solidifi", "sufl", "superfi", "termófi", "tipifi", "tonifi", "trifl",
    "unifi", "verifi", "versifi", "vitrifi", "vivifi",
})

# R8: terminaciones seguras cuando la parte izquierda es exactamente "fi".
_SUFIJOS_FI_SUELTO: frozenset[str] = frozenset({
    "bra", "bras", "brilla", "brillas", "brina", "brinógeno", "brosa",
    "brosas", "brosis", "broso", "brosos", "chero", "cheros", "delidad",
    "gura", "gurar", "guras", "ja", "jación", "jan", "jar", "jas", "jo",
    "jos", "lamento", "lamentos", "lia", "lial", "liales", "lias", "lio",
    "lios", "logenia", "logenética", "logenético", "ltra", "ltración",
    "ltrado", "ltrados", "ltran", "ltrar", "ltro", "ltros", "lum", "mbria",
    "mbrias", "nal", "nales", "nalidad", "nalmente", "nanzas", "nidad",
    "nita", "nitas", "nito", "nitos", "rma", "rmación", "rman", "rmar",
    "rme", "rmes", "rmeza", "sica", "sicas", "sico", "sicos", "siología",
    "siológica", "siológicas", "siológico", "siológicos", "sonomía",
    "stula", "stulas", "sura", "suras", "tocromo", "tohormona",
})

# R8: terminaciones seguras cuando la parte izquierda es exactamente "fl".
_SUFIJOS_FL_SUELTO: frozenset[str] = frozenset({
    "ácida", "ácidas", "ácido", "ácidos", "anco", "ancos", "auta", "autas",
    "echa", "echas", "ego", "ema", "emón", "exible", "exibles", "exiona",
    "exión", "exiones", "exiva", "exivo", "exor", "exores", "oema", "ora",
    "oración", "oraciones", "orescente", "orescencia", "ota", "otan",
    "otante", "otación", "uctuación", "uctúa", "uctúan", "uida", "uidas",
    "uidez", "uido", "uidos", "uir", "ujo", "ujos", "uor", "úor", "uoruro",
    "uye", "uyen",
})

# R8: sufijos seguros para fragmentos compuestos con prefijo + fi/fl/ff.
_SUFIJOS_LIGADURA_COMPUESTOS: frozenset[str] = (
    _SUFIJOS_FI_SUELTO
    | _SUFIJOS_FL_SUELTO
    | frozenset({
        "amación", "amaciones", "amatoria", "amatorio", "ama", "aman", "amar",
        "bio", "bios", "ca", "cación", "caciones", "cada", "cadas", "cado",
        "cados", "can", "cando", "car", "cativa", "cativas", "cativo",
        "cativos", "cia", "cial", "ciales", "cialmente", "cias", "ciencia",
        "ciencias", "ciente", "cientes", "cie", "cies", "cio", "cios", "cita",
        "cito", "citos", "culta", "cultad", "cultades", "cultan", "cultar",
        "cultaría", "cultosa", "cultoso", "da", "das", "dad", "dades", "do",
        "dor", "dora", "doras", "dores", "dos", "lo", "los", "na", "nas",
        "ne", "nen", "nición", "niciones", "nida", "nidad", "nido", "nidos",
        "nir", "nitiva", "nitivo", "nter", "nteres", "saria", "sarias",
        "sario", "sarios", "sema", "semas", "sis", "ta", "tas", "te", "tes",
        "tiva", "tivas", "tivo", "tivos", "to", "tos", "xia", "xias", "xión",
        "xiones",
    })
)

# R6: mapa cerrado de iones con carga explícita -> nombre en palabras.
MAPA_IONES: dict[str, str] = {
    "Na+": "sodio",
    "K+": "potasio",
    "Ca2+": "calcio",
    "Ca+": "calcio",
    "Mg2+": "magnesio",
    "Mg+": "magnesio",
    "H+": "hidrógeno",
    "H3O+": "hidronio",
    "NH4+": "amonio",
    "Cl-": "cloruro",
    "HCO3-": "bicarbonato",
    "OH-": "hidroxilo",
    "SO42-": "sulfato",
    "SO4-": "sulfato",
    "PO43-": "fosfato",
    "PO4-": "fosfato",
    "HPO42-": "fosfato ácido",
    "H2PO4-": "dihidrógeno fosfato",
    "CO32-": "carbonato",
    "NO3-": "nitrato",
    "Fe2+": "hierro",
    "Fe3+": "hierro",
    "Zn2+": "zinc",
    "Cu2+": "cobre",
    "Cu+": "cobre",
    "Mn2+": "manganeso",
    "Li+": "litio",
    "Br-": "bromuro",
    "F-": "fluoruro",
}

# R7: lista cerrada de siglas frecuentes y su deletreo/expansión oficial TTS.
MAPA_SIGLAS: dict[str, str] = {
    "AMPc": "A M P c",
    "GMPc": "G M P c",
    "ADNbc": "A D N bicatenario",
    "ADNmc": "A D N monocatenario",
    "ARNbc": "A R N bicatenario",
    "ARNmc": "A R N monocatenario",
    "ARNm": "A R N mensajero",
    "ARNt": "A R N de transferencia",
    "ARNr": "A R N ribosómico",
    "ELISA": "E L I S A",
    "ANOVA": "A N O V A",
    "CFTR": "C F T R",
    "SGLT": "S G L T",
    "GLUT": "G L U T",
    "FISH": "F I S H",
    "SIDA": "S I D A",
    "SPSS": "S P S S",
    "MALT": "M A L T",
    "NADH": "N A D H",
    "FADH": "F A D H",
    "ADN": "A D N",
    "ARN": "A R N",
    "ATP": "A T P",
    "ADP": "A D P",
    "AMP": "A M P",
    "GTP": "G T P",
    "GDP": "G D P",
    "VIH": "V I H",
    "LPS": "L P S",
    "PCR": "P C R",
    "MET": "M E T",
    "MEB": "M E B",
    "HPV": "H P V",
    "OMS": "O M S",
    "OPS": "O P S",
    "ECJ": "E C J",
    "TMJ": "T M J",
    "GAG": "G A G",
    "WBC": "W B C",
    "TEM": "T E M",
    "KDA": "K D A",
    "ADH": "A D H",
    "REL": "R E L",
    "RER": "R E R",
    "LEC": "L E C",
    "LIC": "L I C",
    "AQP": "A Q P",
    "NPA": "N P A",
    "ABC": "A B C",
    "NBD": "N B D",
    "MDR": "M D R",
    "TTX": "T T X",
    "STX": "S T X",
    "PRA": "P R A",
    "PRR": "P R R",
    "MBP": "M B P",
    "SNC": "S N C",
    "SNP": "S N P",
    "LCR": "L C R",
    "ECG": "E C G",
    "EEG": "E E G",
    "EMG": "E M G",
}

_ROMANOS_IGNORAR: frozenset[str] = frozenset({
    "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
    "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI",
})

_PALABRAS_MAYUS_IGNORAR: frozenset[str] = frozenset({
    "FIGURA", "FIGURAS", "TABLA", "TABLAS", "CUADRO", "CUADROS",
    "PARTE", "CAPITULO", "CAPÍTULO", "TITULO", "TÍTULO", "SECCION", "SECCIÓN",
    "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ",
    "EL", "LA", "LOS", "LAS", "UN", "UNA", "DE", "DEL", "EN", "CON", "SIN", "POR",
    "PARA", "QUE", "COMO", "MAS", "MÁS", "ES", "SON", "AL", "SE", "SU", "NO", "SI",
    "YA", "EE", "UU", "DR", "DRA", "SR", "SRA", "FONDO",
})


# ============================================================================
# EXPRESIONES REGULARES
# ============================================================================

# R8
_RE_LIGADURA_CANDIDATO = re.compile(
    r"\b([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*(?:[Ff][Ff][Ii]|[Ff][Ff][Ll]|[Ff][Ii]|[Ff][Ll]|[Ff][Ff]))"
    r"[ \t]+([a-záéíóúüñ]{2,}[a-záéíóúüñ]*)\b"
)
_RE_CORTE_GUION = re.compile(
    r"\b[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,}-\s+(?!(?:y|o|u|e|ni)\b)[a-záéíóúüñ]{2,}[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*"
)

# R3
_CREDITO_KW_PAT = (
    r"(?:(?:dibujo|imagen|esquema|fotograf[ií]a)\s+)?"
    r"(?:procedente\s+de|ilustraci[oó]n\s+de|fuente\s*:|"
    r"modificad[oa]\s+de|tomad[oa]\s+de|adaptad[oa]\s+de|"
    r"reproducid[oa]\s+de|cortes[ií]a\s+de)"
)
_RE_CREDITO_PAREN = re.compile(
    rf"[ \t]*[\(\[]\s*{_CREDITO_KW_PAT}\s*:?[^()\[\]\n]{{0,350}}[\)\]]",
    re.IGNORECASE,
)
_RE_CREDITO_COMA_PAREN = re.compile(
    rf"[ \t]*,\s*(?:[A-C]\s*,\s*)?{_CREDITO_KW_PAT}\s*:?[^\n]{{1,350}}?\.,",
    re.IGNORECASE,
)
_RE_CREDITO_ETIQUETA_VACIA = re.compile(
    r"(?:[ \t]*,\s*(?:[A-C]\s*,\s*)?|(?:^|(?<=[.!?\n])[ \t]*)[A-C]\s*,\s*)"
    r"(?:procedente\s+de|ilustraci[oó]n\s+de|fuente|modificad[oa]\s+de|tomad[oa]\s+de)\s*:"
    r"(?=[ \t]*$|[ \t]+[A-ZÁÉÍÓÚÑ])",
    re.IGNORECASE | re.MULTILINE,
)
_RE_CREDITO_FRASES = re.compile(
    rf"(?:^|(?<=[.!?\n])[ \t]*){_CREDITO_KW_PAT}(?:\s*:)?[ \t]*"
    rf"(?:(?:(?-i:\b[A-Z]\.)|[^.\n]){{1,300}}?\.(?=[ \t]|$)|[^\n]{{1,300}}$)",
    re.IGNORECASE | re.MULTILINE,
)
_RE_CREDITO_RESIDUAL = re.compile(
    r"(?i:\bilustraci[oó]n\s+(?:de\b|d,\s+(?-i:[A-ZÁÉÍÓÚÑ])))"
    r"|(?i:\b(?:fotograf[ií]a|imagen|dibujo|esquema)\s+(?:de\s+(?-i:[A-ZÁÉÍÓÚÑ])|procedente\s+de|tomad[oa]\s+de|cortes[ií]a\s+de))"
    r"|(?i:\b(?:tomad[oa]|adaptad[oa]|modificad[oa]|reproducid[oa]|procedente)\s+de\s*(?::|\s*(?-i:[A-ZÁÉÍÓÚÑ]\.\s*[A-ZÁÉÍÓÚÑ])))"
    r"|(?:^|[.\n])\s*(?i:fuente|cr[eé]ditos)\s*:"
    r"|©|(?i:\bcopyright\b|\bderechos\s+reservados\b)"
)
_RE_VERBO_CUERPO_INICIAL = re.compile(
    r"\b(?:son|es|est[aá]n?|tienen?|pueden?|constituyen?|forman?|presentan?|poseen?|incluyen?)\b",
    re.IGNORECASE,
)

# R5
_NUM_PAL_R5 = (
    r"(?:cero|uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|"
    r"diez|once|doce|trece|catorce|quince|diecis[eé]is|diecisiete|dieciocho|diecinueve|"
    r"veinte|veintiuno|veinti[uú]n|veintiuna|veintid[oó]s|veintitr[eé]s|veinticuatro|"
    r"veinticinco|veintiseis|veintis[eé]is|veintisiete|veintiocho|veintinueve|"
    r"treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa)"
)
_NUM_SIMPLE_R5 = (
    rf"(?:\d+(?:[.\-–—−]\d+)*[a-zA-Z]?"
    rf"|{_NUM_PAL_R5}(?:[.\-–—−]\d+[a-zA-Z]?|(?:\s+(?:punto|coma|y|a|al|{_NUM_PAL_R5}))*))"
)
_LISTA_NUM_R5 = (
    rf"{_NUM_SIMPLE_R5}"
    rf"(?:\s*(?:,|;|y|e|a|al|[-–—−])\s*(?:(?:v\.|tambi[eé]n|v[eé]ase|v[eé]anse)\s+)?"
    rf"(?:(?:las?\s+|los?\s+|el\s+)?(?:fi\s*guras?|figs?\.|tablas?|cuadros?)\s+)?{_NUM_SIMPLE_R5})*"
    rf"(?:\s*,?\s*(?:[A-C]|pasos?\s+[\w-]+(?:\s+(?:y|e)\s+[\w-]+)?|secuencias?\s+[\w-]+))*"
)
_OBJ_VISUAL_R5 = rf"(?:las?\s+|los?\s+|el\s+)?(?:fi\s*guras?|figs?\.|tablas?|cuadros?)\s+{_LISTA_NUM_R5}"
_COMO_VERBO_R5 = r"como\s+(?:se\s+)?(?:ve|observa|muestra|indica|ilustra|aprecia|representa|resume|detalla)\s+en"
_VER_VERBO_R5 = r"(?:v[eé]ase|v[eé]anse|ver|obs[eé]rvese|cons[uú]ltese|v\.|cf\.)"

_RE_R5_PAREN = re.compile(
    rf"[ \t]*[\(\[]\s*"
    rf"(?:(?:{_VER_VERBO_R5}|{_COMO_VERBO_R5})\s+)?"
    rf"(?:tambi[eé]n\s+)?{_OBJ_VISUAL_R5}"
    rf"(?:\s*,\s*pp?\.\s*[^()\[\]\n]{{1,30}})?"
    rf"\s*[\)\]]",
    re.IGNORECASE,
)
_RE_R5_PAREN_COLA = re.compile(
    rf"\s*[;,]\s*(?:{_VER_VERBO_R5}\s+)?(?:tambi[eé]n\s+)?{_OBJ_VISUAL_R5}(?=\s*[\)\]])",
    re.IGNORECASE,
)
_RE_R5_COMO_COMAS = re.compile(
    rf"[ \t]*,\s*{_COMO_VERBO_R5}\s+{_OBJ_VISUAL_R5}\s*(?:,(?=[ \t]*[.;:!?]|[ \t]+\S|$)|(?=[.;:!?]|$))",
    re.IGNORECASE,
)
_RE_R5_COMO_INICIO = re.compile(
    rf"(?P<pre>(?:^|(?<=[.!?\n]))[ \t]*){_COMO_VERBO_R5}\s+{_OBJ_VISUAL_R5}\s*,\s*",
    re.IGNORECASE | re.MULTILINE,
)
_RE_R5_COMO_SUELTO = re.compile(
    rf"[ \t]*\b{_COMO_VERBO_R5}\s+{_OBJ_VISUAL_R5}",
    re.IGNORECASE,
)
_RE_R5_COMA_ENVUELTA = re.compile(
    rf"[ \t]*,\s*(?:(?P<ver>{_VER_VERBO_R5})\s+)?(?:tambi[eé]n\s+)?"
    rf"(?P<obj>{_OBJ_VISUAL_R5})\s*,(?=(?P<post>[ \t]*(?:[.,;:!?]|\S{{1,25}}|$)))",
    re.IGNORECASE,
)
_RE_R5_VEASE_SUELTO = re.compile(
    rf"(?:^|(?<=[.!?\n])[ \t]*){_VER_VERBO_R5}\s+(?:tambi[eé]n\s+)?{_OBJ_VISUAL_R5}[ \t]*[.,]?",
    re.IGNORECASE | re.MULTILINE,
)
_RE_R5_BLOQUEO_RELATIVO = re.compile(
    r"^[ \t]*(?:que|donde|muestran?|ilustran?|indican?|resumen?|presentan?|representan?|contienen?|describen?|se[nñ]alan?|es|son)\b",
    re.IGNORECASE,
)
_RE_R5_RESIDUAL = re.compile(
    rf"\b(?:ver|v[eé]ase|v[eé]anse|obs[eé]rvese|cons[uú]ltese|v\.|cf\.)\s+(?:tambi[eé]n\s+)?(?:las?\s+|los?\s+|el\s+)?(?:fi\s*guras?|figs?\.|tablas?|cuadros?)\b"
    rf"|\bcomo\s+(?:se\s+)?(?:ve|observa|muestra|indica|ilustra|aprecia|representa|resume|detalla)\s+en\s+(?:las?\s+|el\s+)?(?:fi\s*guras?|figs?\.|tablas?|cuadros?|imagen)\b"
    rf"|\bcomo\s+se\s+observa\b"
    rf"|\bcomo\s+(?:ves|puedes\s+ver)\b"
    rf"|\bfigs?\.\s*{_NUM_SIMPLE_R5}\b"
    rf"|\(\s*(?:(?:v\.|cf\.)\s*)?(?:fi\s*guras?|tablas?|cuadros?)\s+{_NUM_SIMPLE_R5}"
    rf"|\b(?:en\s+la|la|en\s+el|el)\s+(?:fi\s*gura|tabla|cuadro)\s+{_NUM_SIMPLE_R5}\b",
    re.IGNORECASE,
)

# R6 iones
_SUP_MAP: dict[str, str] = {
    "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
    "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
    "⁻": "-", "⁺": "+",
}
_SUB_MAP: dict[str, str] = {
    "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
    "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
}
_RE_ION = re.compile(
    r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])"
    r"((?:[A-Z][a-z]?[₀-₉\d]*)+[⁰¹²³⁴⁵⁶⁷⁸⁹]*[+−\-⁺⁻–])"
    r"(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d+−⁺⁻–])"
)
_RE_ION_MAL_LEIDO = re.compile(
    r"\b(?:NA|CA|CL|MG|FE|ZN|CU|NH|SO|PO|HCO)\d*\s+(?:m[aá]s|menos)\b"
    r"|\b(?:NA|CA|CL|MG|FE|ZN|CU)\s+(?:uno|dos|tres)\s+(?:m[aá]s|menos)\b"
    r"|\b(?:Na|Ca|Cl|Mg|Fe|Zn|Cu|NH4|SO4|PO4|HCO3)\d*\s+(?:m[aá]s|menos)\b"
    r"|\b[A-Z]{1,2}\d+\s+(?:m[aá]s|menos)\b"
)

# R6 conversiones rotas
_RE_LOCUS_CROMOSOMICO = re.compile(
    r"\b(\d{1,2})([pq])(\d{1,2})(?:\.(\d{1,2}|uno|un))?(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])"
)
_RE_CROMOSOMA_BRAZO = re.compile(
    r"(?<=\b[Cc]romosoma\s)(\d{1,2})([pq])(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])"
)
_RE_DIGITO_SUELTO = re.compile(r"(?<![A-Za-z0-9])\d+")
_RE_ALFANUM_ROTO = re.compile(
    r"\b\d+\.(?:un|uno)\b|[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\u0370-\u03ff]+\d+[A-Za-z\d]*"
)

# R7 siglas
RUTA_SIGLAS_CLASIFICADAS = Path(__file__).resolve().parent / "siglas_clasificadas.json"
_PATRON_SIGLAS = "|".join(re.escape(k) for k in sorted(MAPA_SIGLAS, key=len, reverse=True))
_RE_SIGLAS = re.compile(
    rf"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])(?:{_PATRON_SIGLAS})(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])"
)
_RE_SIGLA_CAPS = re.compile(r"\b[A-Z]{2,6}\b")
_SIGLAS_PALABRA_ES_MAYUS: frozenset[str] = frozenset({
    "HA", "ME", "MI", "IR", "GAS", "MAR", "USA", "PA", "PE", "RE", "SO",
})

# R6/R7 nuevos pasos (unidades en palabras, griegas, un coma, iones en siglas, no tocar PDF crudo)
_MAPA_UNIDADES_PALABRAS: dict[str, tuple[str, str]] = {
    "μm": ("micrómetro", "micrómetros"),
    "µm": ("micrómetro", "micrómetros"),
    "nm": ("nanómetro", "nanómetros"),
    "mmHg": ("milímetro de mercurio", "milímetros de mercurio"),
    "mm": ("milímetro", "milímetros"),
    "cm": ("centímetro", "centímetros"),
    "mL": ("mililitro", "mililitros"),
    "ml": ("mililitro", "mililitros"),
    "mg": ("miligramo", "miligramos"),
    "kg": ("kilogramo", "kilogramos"),
    "kDa": ("kilodalton", "kilodaltons"),
    "kPa": ("kilopascal", "kilopascales"),
    "°C": ("grado Celsius", "grados Celsius"),
    "°F": ("grado Fahrenheit", "grados Fahrenheit"),
    "°": ("grado", "grados"),
    "pH": ("pe hache", "pe hache"),
}
_UNIDADES_LETRAS_PAT = "|".join(
    re.escape(k)
    for k in sorted(
        (u for u in _MAPA_UNIDADES_PALABRAS if not u.startswith("°")),
        key=len,
        reverse=True,
    )
)
_RE_UNIDAD_SUELTA = re.compile(
    rf"(?P<u>"
    rf"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\u0370-\u03ff\u00b5])(?:{_UNIDADES_LETRAS_PAT})(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d\u0370-\u03ff\u00b5])"
    rf"|°[CF](?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])"
    rf"|°"
    rf")"
)
_RE_UN_COMPUESTO_PREV = re.compile(
    r"(?:\bcoma|\bpunto|\b(?:treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa)[ \t]+y|\b(?:ciento|doscient[oa]s|trescient[oa]s|cuatrocient[oa]s|quinient[oa]s"
    r"|seiscient[oa]s|setecient[oa]s|ochocient[oa]s|novecient[oa]s|mil|mill[oó]n|millones))[ \t]+$",
    re.IGNORECASE,
)
_RE_UN_SINGULAR_PREV = re.compile(r"\b(?:un|una)[ \t]*$", re.IGNORECASE)
_RE_CONCORDANCIA_UN_FIX = re.compile(
    r"\b(?P<un>un)[ \t]+(?P<plur>"
    r"micr[oó]metros|mil[ií]metros(?:\s+de\s+mercurio)?|cent[ií]metros|nan[oó]metros|"
    r"kilogramos|miligramos|mililitros|kilodaltons|kilopascales|gramos|litros|"
    r"grados(?:\s+(?:Celsius|Fahrenheit))?"
    r")\b",
    re.IGNORECASE,
)
_SINGULAR_DE_PLURAL_UNIDAD: dict[str, str] = {
    "micrómetros": "micrómetro",
    "micrometros": "micrómetro",
    "milímetros": "milímetro",
    "milimetros": "milímetro",
    "centímetros": "centímetro",
    "centimetros": "centímetro",
    "nanómetros": "nanómetro",
    "nanometros": "nanómetro",
    "kilogramos": "kilogramo",
    "miligramos": "miligramo",
    "mililitros": "mililitro",
    "kilodaltons": "kilodalton",
    "kilopascales": "kilopascal",
    "gramos": "gramo",
    "litros": "litro",
    "grados": "grado",
}
_RE_UNIDAD_RESIDUAL = re.compile(r"\b(?:MHz|kHz)\b")

_MAPA_GRIEGAS: dict[str, str] = {
    "α": "alfa",
    "β": "beta",
    "γ": "gamma",
    "δ": "delta",
    "ε": "épsilon",
    "ζ": "zeta",
    "η": "eta",
    "θ": "theta",
    "κ": "kappa",
    "λ": "lambda",
    "μ": "mi",
    "µ": "mi",
    "π": "pi",
    "σ": "sigma",
    "τ": "tau",
    "φ": "fi",
    "ϕ": "fi",
    "χ": "ji",
    "ψ": "psi",
    "ω": "omega",
    "Δ": "delta",
    "∆": "delta",
}
_RE_PREFIJO_UNIDAD_MU = re.compile(
    r"^(?:mol|Eq|Osm|[mglLsMVAWΩΩ])(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])"
)
_RE_GRIEGA_TOKEN = re.compile(
    r"(?P<pre_dig>(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])\d+)?"
    r"(?P<g>[" + "".join(re.escape(k) for k in _MAPA_GRIEGAS) + r"])"
    r"(?P<post_dig>\d+|un(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d]))?"
)
_RE_GRIEGA_RESIDUAL = re.compile(r"[\u0370-\u03ff\u1f00-\u1fff\u00b5\u2206\u2126]")

_NUM_PAL_UN_COMA = (
    r"(?:cero|uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|"
    r"diez|once|doce|trece|catorce|quince|diecis[eé]is|diecisiete|dieciocho|diecinueve|"
    r"veinte|veintiuno|veinti[uú]n|veintiuna|veintid[oó]s|veintitr[eé]s|veinticuatro|"
    r"veinticinco|veintiseis|veintis[eé]is|veintisiete|veintiocho|veintinueve|"
    r"treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa)"
)
_NUM_PAL_DESPUES_COMA = (
    rf"(?:{_NUM_PAL_UN_COMA}|cien|ciento|doscient[oa]s|trescient[oa]s|cuatrocient[oa]s|"
    r"quinient[oa]s|seiscient[oa]s|setecient[oa]s|ochocient[oa]s|novecient[oa]s|mil)"
)
_DIGITO_PAL_COMA = r"(?:cero|uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)"
_RE_MILES_PALABRAS = re.compile(
    rf"\b(?i:{_NUM_PAL_UN_COMA}(?:\s+{_NUM_PAL_UN_COMA})*\s+coma\s+"
    rf"{_DIGITO_PAL_COMA}\s+{_DIGITO_PAL_COMA}\s+{_DIGITO_PAL_COMA})\b"
    rf"|\b(?i:coma\s+(?:cero\s+cero\s+cero|\w+\s+cero\s+cero))\b"
)
_RE_SECCION_COMA = re.compile(
    rf"(?m)(?P<pre>^|[.!?][ \t]+)"
    rf"(?P<sec>(?i:{_NUM_PAL_UN_COMA}(?:\s+coma\s+{_NUM_PAL_UN_COMA})+))"
    rf"(?P<sep>[ \t]+)(?P<ini>[A-ZÁÉÍÓÚÑ])"
)
_RE_UN_COMA_DECIMAL = re.compile(
    rf"\b(?P<un>un|veinti[uú]n)[ \t]+(?P<coma>coma)[ \t]+(?P<sig>{_NUM_PAL_DESPUES_COMA}|\d+)\b",
    re.IGNORECASE,
)
_RE_ION_SIGLA_RESIDUAL = re.compile(
    r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])"
    r"(?P<sigla>[A-Z]{2,6})"
    r"(?P<signo>[+⁺−⁻]|–(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d]))"
    r"(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d+⁺−⁻])"
)
_RE_POTENCIA_POR_PERDIDA = re.compile(r"(?:\S+[ \t]+)?×(?:[ \t]+\S+){0,3}")


# ============================================================================
# MODELOS DE DATOS Y UTILIDADES
# ============================================================================


@dataclass
class ResultadoPaso:
    """Resultado de una función de corrección determinista."""

    texto: str
    cambios: int
    no_resueltos: list[str]


@dataclass
class ResultadoArchivo:
    """Resumen de ejecución sobre un archivo .md."""

    ruta: Path
    cambios_por_tipo: dict[str, int]
    no_resueltos_por_tipo: dict[str, list[str]]
    respaldo: Path | None
    modificado: bool


def _citar_ruta(ruta: Path | str) -> str:
    """Envuelve rutas con espacios entre comillas dobles (Windows)."""
    s = str(ruta)
    return f'"{s}"' if " " in s else s


def _dedup_ordenado(items: list[str]) -> list[str]:
    vistos: set[str] = set()
    salida: list[str] = []
    for item in items:
        limpio = re.sub(r"\s+", " ", item).strip()
        if limpio and limpio not in vistos:
            vistos.add(limpio)
            salida.append(limpio)
    return salida


def _limpiar_espacios_linea(texto: str) -> str:
    """Limpia espacios dobles y espacios antes de puntuación sin alterar saltos de párrafo."""
    lineas: list[str] = []
    for linea in texto.splitlines(keepends=True):
        salto = ""
        cuerpo = linea
        if cuerpo.endswith("\r\n"):
            cuerpo, salto = cuerpo[:-2], "\r\n"
        elif cuerpo.endswith("\n"):
            cuerpo, salto = cuerpo[:-1], "\n"
        cuerpo = re.sub(r"[ \t]+([.,;:!?])", r"\1", cuerpo)
        cuerpo = re.sub(r"[ \t]{2,}", " ", cuerpo)
        cuerpo = re.sub(r"\.\s*,+\s*\.", ".", cuerpo)
        cuerpo = re.sub(r",\s*,+", ",", cuerpo)
        cuerpo = cuerpo.strip(" \t")
        lineas.append(cuerpo + salto)
    return "".join(lineas)


def _entero_a_palabras(n: int) -> str:
    """Convierte enteros 0..999 a palabras en español (sin dependencias externas)."""
    if n < 0 or n > 999:
        return str(n)
    if n == 0:
        return "cero"
    unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"]
    diez_y = [
        "diez", "once", "doce", "trece", "catorce",
        "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve",
    ]
    veinti = [
        "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro",
        "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve",
    ]
    decenas = [
        "", "", "", "treinta", "cuarenta", "cincuenta",
        "sesenta", "setenta", "ochenta", "noventa",
    ]
    centenas = [
        "", "ciento", "doscientos", "trescientos", "cuatrocientos",
        "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos",
    ]

    if n == 100:
        return "cien"
    partes: list[str] = []
    c = n // 100
    d = n % 100
    if c > 0:
        partes.append(centenas[c])
    if d > 0:
        if d < 10:
            partes.append(unidades[d])
        elif d <= 19:
            partes.append(diez_y[d - 10])
        elif d <= 29:
            partes.append(veinti[d - 20])
        else:
            dec = decenas[d // 10]
            uni = d % 10
            partes.append(dec if uni == 0 else f"{dec} y {unidades[uni]}")
    return " ".join(partes)


# ============================================================================
# FUNCIONES DE CORRECCIÓN DETERMINISTA (UNA POR TIPO)
# ============================================================================


def corregir_ligaduras_partidas(texto: str) -> ResultadoPaso:
    """R8: une ligaduras partidas seguras (fi/fl/ff) y reporta cortes por guion o casos ambiguos."""
    cambios = 0
    no_resueltos: list[str] = []

    def _es_union_segura(izq: str, der: str) -> tuple[bool, bool]:
        """Devuelve (unir, reportar_como_ambiguo)."""
        izq_l = izq.lower()
        der_l = der.lower()
        if izq_l in _PALABRAS_LEGITIMAS_IZQ:
            return False, False
        if der_l in _NO_UNIR_DERECHA:
            if izq_l in {"fi", "fl", "ff"}:
                return False, False
            return False, True
        if izq_l == "fi":
            return (True, False) if der_l in _SUFIJOS_FI_SUELTO else (False, True)
        if izq_l == "fl":
            return (True, False) if der_l in _SUFIJOS_FL_SUELTO else (False, True)
        if izq_l == "ff":
            return False, True
        if izq_l in _PREFIJOS_LIGADURA_SEGUROS or der_l in _SUFIJOS_LIGADURA_COMPUESTOS:
            return True, False
        return False, True

    def _repl(m: re.Match[str]) -> str:
        nonlocal cambios
        izq, der = m.group(1), m.group(2)
        unir, ambiguo = _es_union_segura(izq, der)
        if unir:
            cambios += 1
            return izq + der
        if ambiguo:
            no_resueltos.append(f"Ligadura ambigua: {m.group(0)}")
        return m.group(0)

    nuevo = _RE_LIGADURA_CANDIDATO.sub(_repl, texto)

    for m in _RE_CORTE_GUION.finditer(nuevo):
        no_resueltos.append(f"Corte por guion (no adivinar): {m.group(0)}")

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


def eliminar_creditos(texto: str) -> ResultadoPaso:
    """R3: elimina créditos de ilustración o fuente sin tocar el texto del cuerpo."""
    cambios = 0
    nuevo = texto

    def _contar_y_borrar(patron: re.Pattern[str], txt: str) -> str:
        nonlocal cambios
        txt_out, n = patron.subn("", txt)
        cambios += n
        return txt_out

    nuevo = _contar_y_borrar(_RE_CREDITO_PAREN, nuevo)

    def _repl_coma_paren(m: re.Match[str]) -> str:
        nonlocal cambios
        frag = m.group(0)
        cuerpo = re.sub(r"^[ \t]*,\s*(?:[A-C]\s*,\s*)?", "", frag)
        cuerpo = re.sub(rf"^{_CREDITO_KW_PAT}\s*:?\s*", "", cuerpo, flags=re.IGNORECASE)
        # Si parece el inicio de una oración real del cuerpo (p. ej. "Hongos Los hongos son..."),
        # no debe borrarse más allá de la etiqueta vacía.
        if len(frag) > 85 and _RE_VERBO_CUERPO_INICIAL.search(cuerpo[:70]):
            return frag
        cambios += 1
        return ""

    nuevo = _RE_CREDITO_COMA_PAREN.sub(_repl_coma_paren, nuevo)
    nuevo = _contar_y_borrar(_RE_CREDITO_FRASES, nuevo)
    nuevo = _contar_y_borrar(_RE_CREDITO_ETIQUETA_VACIA, nuevo)

    if cambios > 0:
        nuevo = _limpiar_espacios_linea(nuevo)

    no_resueltos: list[str] = []
    for m in _RE_CREDITO_RESIDUAL.finditer(nuevo):
        ctx = nuevo[max(0, m.start() - 10) : min(len(nuevo), m.end() + 30)]
        no_resueltos.append(f"Posible crédito residual: {ctx.strip()}")

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


def eliminar_referencias_figuras(texto: str) -> ResultadoPaso:
    """R5: elimina referencias cortas a figuras/cuadros/tablas sin tocar pies ni romper oraciones."""
    cambios = 0
    nuevo = texto

    nuevo, n = _RE_R5_PAREN.subn("", nuevo)
    cambios += n

    nuevo, n = _RE_R5_PAREN_COLA.subn("", nuevo)
    cambios += n

    nuevo, n = _RE_R5_COMO_COMAS.subn("", nuevo)
    cambios += n

    # Tras quitar "Como se muestra en la figura ..., ", la palabra siguiente pasa a mayúscula.
    def _limpiar_como_inicio(txt: str) -> str:
        nonlocal cambios
        out: list[str] = []
        pos = 0
        for m in _RE_R5_COMO_INICIO.finditer(txt):
            out.append(txt[pos : m.start()])
            out.append(m.group("pre"))
            pos = m.end()
            cambios += 1
            if pos < len(txt) and txt[pos].islower():
                out.append(txt[pos].upper())
                pos += 1
        out.append(txt[pos:])
        return "".join(out)

    nuevo = _limpiar_como_inicio(nuevo)

    nuevo, n = _RE_R5_COMO_SUELTO.subn("", nuevo)
    cambios += n

    def _repl_coma_envuelta(m: re.Match[str]) -> str:
        nonlocal cambios
        ver = m.group("ver")
        obj = m.group("obj")
        post = m.group("post")
        if not ver and not re.match(r"^[ \t]*[.;:!?]", post):
            es_abrev = bool(re.match(r"^(?:las?\s+|los?\s+|el\s+)?figs?\.", obj, re.IGNORECASE))
            if not es_abrev and _RE_R5_BLOQUEO_RELATIVO.match(post):
                return m.group(0)
        cambios += 1
        return ""

    nuevo = _RE_R5_COMA_ENVUELTA.sub(_repl_coma_envuelta, nuevo)

    nuevo, n = _RE_R5_VEASE_SUELTO.subn("", nuevo)
    cambios += n

    if cambios > 0:
        nuevo = _limpiar_espacios_linea(nuevo)

    no_resueltos: list[str] = []
    for m in _RE_R5_RESIDUAL.finditer(nuevo):
        no_resueltos.append(f"Referencia visual sin resolver: {m.group(0).strip()}")

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


def _normalizar_clave_ion(bruto: str) -> str:
    """Convierte superíndices, subíndices y guiones unicode de un ion a forma ASCII canónica."""
    chars: list[str] = []
    for ch in bruto:
        if ch in _SUP_MAP:
            chars.append(_SUP_MAP[ch])
        elif ch in _SUB_MAP:
            chars.append(_SUB_MAP[ch])
        elif ch in ("−", "–"):
            chars.append("-")
        else:
            chars.append(ch)
    return "".join(chars)


def corregir_iones(texto: str) -> ResultadoPaso:
    """R6 (iones): convierte símbolos químicos con carga a palabras; reporta iones mal convertidos."""
    cambios = 0
    no_resueltos: list[str] = []

    def _repl(m: re.Match[str]) -> str:
        nonlocal cambios
        bruto = m.group(1)
        canon = _normalizar_clave_ion(bruto)
        nombre = MAPA_IONES.get(canon)
        if nombre is not None:
            cambios += 1
            return nombre
        if re.fullmatch(r"[A-Z]{2,6}[+−⁺⁻–]", bruto):
            return bruto
        no_resueltos.append(f"Ion/carga sin convertir: {bruto}")
        return bruto

    nuevo = _RE_ION.sub(_repl, texto)

    for m in _RE_ION_MAL_LEIDO.finditer(nuevo):
        no_resueltos.append(f"Ion mal convertido previo: {m.group(0)}")

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


def corregir_conversiones_rotas(texto: str) -> ResultadoPaso:
    """R6 (conversiones rotas): corrige loci cromosómicos (p. ej. 19q13.un, 12p13) y reporta restos."""
    cambios = 0
    no_resueltos: list[str] = []

    def _repl_locus(m: re.Match[str]) -> str:
        nonlocal cambios
        crom_s, brazo, banda_s, sub_s = m.group(1), m.group(2), m.group(3), m.group(4)
        crom = int(crom_s)
        banda = int(banda_s)
        if not (1 <= crom <= 22):
            no_resueltos.append(f"Posible locus fuera de rango: {m.group(0)}")
            return m.group(0)
        partes = [_entero_a_palabras(crom), brazo, _entero_a_palabras(banda)]
        if sub_s is not None:
            sub_pal = "uno" if sub_s in ("un", "uno") else _entero_a_palabras(int(sub_s))
            partes.extend(["punto", sub_pal])
        cambios += 1
        return " ".join(partes)

    nuevo = _RE_LOCUS_CROMOSOMICO.sub(_repl_locus, texto)

    def _repl_brazo(m: re.Match[str]) -> str:
        nonlocal cambios
        crom = int(m.group(1))
        brazo = m.group(2)
        if not (1 <= crom <= 22):
            return m.group(0)
        cambios += 1
        return f"{_entero_a_palabras(crom)} {brazo}"

    nuevo = _RE_CROMOSOMA_BRAZO.sub(_repl_brazo, nuevo)

    for m in _RE_DIGITO_SUELTO.finditer(nuevo):
        ctx = nuevo[max(0, m.start() - 10) : min(len(nuevo), m.end() + 10)]
        no_resueltos.append(f"Dígito sin convertir: {ctx.strip()}")

    for m in _RE_ALFANUM_ROTO.finditer(nuevo):
        no_resueltos.append(f"Código alfanumérico / conversión rota: {m.group(0)}")

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


def _cargar_siglas_clasificadas(
    ruta: Path = RUTA_SIGLAS_CLASIFICADAS,
) -> dict[str, dict[str, Any]]:
    """Carga siglas_clasificadas.json si existe; devuelve {} si falta o falla."""
    if not ruta.is_file():
        return {}
    try:
        datos = json.loads(ruta.read_text(encoding="utf-8"))
    except Exception:
        return {}
    if not isinstance(datos, dict):
        return {}
    return {
        str(k): v
        for k, v in datos.items()
        if isinstance(k, str) and isinstance(v, dict)
    }


def _normalizar_un_en_token(tok: str) -> str:
    low = tok.lower()
    if low in ("un", "una"):
        return "Uno" if tok[0].isupper() else "uno"
    if low in ("veintiún", "veintiun"):
        return "Veintiuno" if tok[0].isupper() else "veintiuno"
    return tok


def corregir_un_coma(texto: str) -> ResultadoPaso:
    """R6/R7: corrige 'un coma' decimal a 'uno coma' y secciones con coma a 'punto' en su línea."""
    cambios = 0
    no_resueltos: list[str] = []

    def _repl_seccion(m: re.Match[str]) -> str:
        nonlocal cambios
        pre = m.group("pre")
        sec = m.group("sec")
        sep = m.group("sep")
        ini = m.group("ini")

        nuevas = [
            "punto" if p.lower() == "coma" else _normalizar_un_en_token(p)
            for p in sec.split()
        ]
        sec_nueva = " ".join(nuevas)
        pre_out = (pre[0] + "\n\n") if (pre and pre[0] in ".!?") else pre
        cambios += 1
        return f"{pre_out}{sec_nueva}{sep}{ini}"

    nuevo = _RE_SECCION_COMA.sub(_repl_seccion, texto)

    spans_miles = [
        (m.start(), m.end(), m.group(0))
        for m in _RE_MILES_PALABRAS.finditer(nuevo)
    ]

    partes: list[str] = []
    pos = 0
    for m in _RE_UN_COMA_DECIMAL.finditer(nuevo):
        solapa = next(
            (txt for s, e, txt in spans_miles if m.start() >= s and m.start() < e),
            None,
        )
        if solapa is not None:
            no_resueltos.append(f"Mil leído como decimal (regla 12, no tocar): {solapa}")
            continue
        partes.append(nuevo[pos : m.start("un")])
        partes.append(_normalizar_un_en_token(m.group("un")))
        pos = m.end("un")
        cambios += 1
    partes.append(nuevo[pos:])
    nuevo = "".join(partes)

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


def corregir_unidades_en_palabras(texto: str) -> ResultadoPaso:
    """R6: expande unidades sueltas o tras número en palabras con concordancia de 'un/una'."""
    cambios = 0
    no_resueltos: list[str] = []

    def _repl_unidad(m: re.Match[str]) -> str:
        nonlocal cambios
        unidad = m.group("u")
        sing, plur = _MAPA_UNIDADES_PALABRAS[unidad]
        antes = texto[: m.start()]
        m_un = _RE_UN_SINGULAR_PREV.search(antes)
        if m_un and not _RE_UN_COMPUESTO_PREV.search(antes[: m_un.start()]):
            forma = sing
        else:
            forma = plur

        pref = ""
        if m.start() > 0:
            prev_ch = texto[m.start() - 1]
            if (unidad.startswith("°") and prev_ch.isalnum()) or prev_ch.isdigit():
                pref = " "

        suf = ""
        if m.end() < len(texto) and unidad.startswith("°") and texto[m.end()].isalpha():
            suf = " "

        cambios += 1
        return f"{pref}{forma}{suf}"

    nuevo = _RE_UNIDAD_SUELTA.sub(_repl_unidad, texto)

    def _repl_concordancia(m: re.Match[str]) -> str:
        nonlocal cambios
        if _RE_UN_COMPUESTO_PREV.search(nuevo[: m.start()]):
            return m.group(0)
        plur_txt = m.group("plur")
        partes = plur_txt.split(None, 1)
        cabeza = partes[0]
        cola = (" " + partes[1]) if len(partes) > 1 else ""
        sing_cabeza = _SINGULAR_DE_PLURAL_UNIDAD.get(cabeza.lower())
        if not sing_cabeza:
            return m.group(0)
        cambios += 1
        return f"{m.group('un')} {sing_cabeza}{cola}"

    nuevo = _RE_CONCORDANCIA_UN_FIX.sub(_repl_concordancia, nuevo)

    for m in _RE_UNIDAD_RESIDUAL.finditer(nuevo):
        no_resueltos.append(f"Unidad sin convertir: {m.group(0)}")

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


def corregir_griegas(texto: str) -> ResultadoPaso:
    """R6: convierte letras griegas a palabras (μ/µ='mi' solo si no es prefijo de unidad)."""
    cambios = 0
    no_resueltos: list[str] = []

    def _num_a_pal(digs: str) -> str:
        val = int(digs)
        if val <= 999:
            return _entero_a_palabras(val)
        return " ".join(_entero_a_palabras(int(d)) for d in digs)

    def _repl_griega(m: re.Match[str]) -> str:
        nonlocal cambios
        g = m.group("g")
        pre_dig = m.group("pre_dig")
        post_dig = m.group("post_dig")

        if g in ("μ", "µ") and not post_dig:
            if _RE_PREFIJO_UNIDAD_MU.match(texto[m.end() :]):
                return m.group(0)

        nombre = _MAPA_GRIEGAS[g]
        cambios += 1

        if pre_dig:
            pre_str = _num_a_pal(pre_dig) + " "
        elif m.start() > 0 and texto[m.start() - 1].isalpha():
            pre_str = " "
        else:
            pre_str = ""

        if post_dig:
            post_pal = "uno" if post_dig.lower() == "un" else _num_a_pal(post_dig)
            post_str = " " + post_pal
            if m.end() < len(texto) and texto[m.end()].isalpha():
                post_str += " "
        elif m.end() < len(texto) and texto[m.end()].isalpha():
            post_str = " "
        else:
            post_str = ""

        return f"{pre_str}{nombre}{post_str}"

    nuevo = _RE_GRIEGA_TOKEN.sub(_repl_griega, texto)

    for m in _RE_GRIEGA_RESIDUAL.finditer(nuevo):
        ch = m.group(0)
        if ch in ("μ", "µ") and _RE_PREFIJO_UNIDAD_MU.match(nuevo[m.end() :]):
            continue
        no_resueltos.append(f"Letra griega sin convertir: {ch}")

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


def _formatear_deletreo_y(lectura: str) -> str:
    """En lecturas deletreadas, reemplaza la letra 'Y' suelta por 'i griega'."""
    return re.sub(r"\bY\b", "i griega", lectura)


def corregir_iones_residuales(
    texto: str,
    *,
    ruta_clasificadas: Path = RUTA_SIGLAS_CLASIFICADAS,
) -> ResultadoPaso:
    """R6: convierte iones residuales con carga pegada a una sigla (p. ej. NAD+, NADP+)."""
    cambios = 0
    clasificadas = _cargar_siglas_clasificadas(ruta_clasificadas)

    def _repl(m: re.Match[str]) -> str:
        nonlocal cambios
        sigla = m.group("sigla")
        signo = m.group("signo")
        canon = f"{sigla}{'-' if signo in ('−', '⁻', '–') else '+'}"
        if canon in MAPA_IONES:
            return m.group(0)

        if sigla in MAPA_SIGLAS:
            base = MAPA_SIGLAS[sigla]
        elif (
            sigla in clasificadas
            and clasificadas[sigla].get("tipo") in ("deletrear", "formula")
            and clasificadas[sigla].get("lectura")
        ):
            base = str(clasificadas[sigla]["lectura"])
            if clasificadas[sigla].get("tipo") == "deletrear":
                base = _formatear_deletreo_y(base)
        else:
            base = " ".join("i griega" if ch == "Y" else ch for ch in sigla)

        signo_pal = "más" if signo in ("+", "⁺") else "menos"
        cambios += 1
        return f"{base} {signo_pal}"

    nuevo = _RE_ION_SIGLA_RESIDUAL.sub(_repl, texto)
    return ResultadoPaso(nuevo, cambios, [])


def reportar_errores_pdf_crudo(texto: str) -> ResultadoPaso:
    """R6 (regla 12): detecta miles como decimal y '×' sin modificar el texto."""
    no_resueltos: list[str] = []
    for m in _RE_MILES_PALABRAS.finditer(texto):
        no_resueltos.append(f"Mil como decimal (regla 12, reextraer del PDF): {m.group(0)}")
    for m in _RE_POTENCIA_POR_PERDIDA.finditer(texto):
        no_resueltos.append(f"Potencia perdida / signo × (regla 12, reextraer del PDF): {m.group(0).strip()}")
    return ResultadoPaso(texto, 0, _dedup_ordenado(no_resueltos))


def corregir_siglas(
    texto: str,
    *,
    ruta_clasificadas: Path = RUTA_SIGLAS_CLASIFICADAS,
) -> ResultadoPaso:
    """R7: aplica MAPA_SIGLAS y siglas_clasificadas.json; reporta restos y desconocidas."""
    cambios = 0
    clasificadas = _cargar_siglas_clasificadas(ruta_clasificadas)

    mapa_reemplazos: dict[str, str] = dict(MAPA_SIGLAS)
    no_tocar: dict[str, str] = {}
    for sigla, info in clasificadas.items():
        tipo = str(info.get("tipo") or "")
        lectura = str(info.get("lectura") or "")
        if tipo in ("deletrear", "palabra", "formula") and lectura:
            if tipo == "deletrear":
                lectura = _formatear_deletreo_y(lectura)
            if sigla not in mapa_reemplazos:
                mapa_reemplazos[sigla] = lectura
        elif tipo in ("resto_figura", "titulo_recuadro"):
            no_tocar[sigla] = tipo

    if mapa_reemplazos:
        patron = "|".join(
            re.escape(k) for k in sorted(mapa_reemplazos, key=len, reverse=True)
        )
        re_siglas = re.compile(
            rf"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])(?:{patron})(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])"
        )
        lineas_out: list[str] = []
        for linea in texto.splitlines(keepends=True):
            palabras_l = linea.split()
            es_titulo_todo_mayus = (
                len(palabras_l) >= 3
                and all(p.isupper() for p in palabras_l if len(p) > 1 and any(c.isalpha() for c in p))
            )

            def _repl(m: re.Match[str], _todo_mayus: bool = es_titulo_todo_mayus) -> str:
                nonlocal cambios
                tok = m.group(0)
                if _todo_mayus and tok not in MAPA_SIGLAS and tok in _SIGLAS_PALABRA_ES_MAYUS:
                    return tok
                reemplazo = mapa_reemplazos.get(tok)
                if reemplazo is None:
                    return tok
                cambios += 1
                return reemplazo

            lineas_out.append(re_siglas.sub(_repl, linea))
        nuevo = "".join(lineas_out)
    else:
        nuevo = texto

    no_resueltos: list[str] = []
    for tok, tipo in no_tocar.items():
        if re.search(rf"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d]){re.escape(tok)}(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])", nuevo):
            etiqueta = "Resto de figura" if tipo == "resto_figura" else "Título de recuadro"
            no_resueltos.append(f"{etiqueta}: {tok}")

    for linea in nuevo.splitlines():
        palabras_l = linea.split()
        if not palabras_l:
            continue
        mayus_l = sum(1 for p in palabras_l if p.isupper() and len(p) > 1)
        if mayus_l / len(palabras_l) >= 0.5 and len(palabras_l) >= 2:
            continue
        for m in _RE_SIGLA_CAPS.finditer(linea):
            tok = m.group(0)
            if tok in no_tocar:
                continue
            if tok in mapa_reemplazos or tok in _ROMANOS_IGNORAR or tok in _PALABRAS_MAYUS_IGNORAR:
                continue
            no_resueltos.append(f"Sigla fuera de lista: {tok}")

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


# ============================================================================
# RECUADROS «CONOCIMIENTO MÁS A FONDO» DE SALADIN
# ============================================================================

_UNIDADES_PAL_FONDO: dict[str, int] = {
    "cero": 0, "un": 1, "uno": 1, "una": 1,
    "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5,
    "seis": 6, "siete": 7, "ocho": 8, "nueve": 9,
}
_ESPECIALES_PAL_FONDO: dict[str, int] = {
    "diez": 10, "once": 11, "doce": 12, "trece": 13, "catorce": 14,
    "quince": 15, "dieciséis": 16, "dieciseis": 16, "diecisiete": 17,
    "dieciocho": 18, "diecinueve": 19,
    "veinte": 20, "veintiuno": 21, "veintiún": 21, "veintiun": 21, "veintiuna": 21,
    "veintidós": 22, "veintidos": 22, "veintitrés": 23, "veintitres": 23,
    "veinticuatro": 24, "veinticinco": 25, "veintiséis": 26, "veintiseis": 26,
    "veintisiete": 27, "veintiocho": 28, "veintinueve": 29,
}
_DECENAS_PAL_FONDO: dict[str, int] = {
    "treinta": 30, "cuarenta": 40, "cincuenta": 50,
    "sesenta": 60, "setenta": 70, "ochenta": 80, "noventa": 90,
}
_PALABRAS_EXCLUIDAS_FONDO: frozenset[str] = frozenset({
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
    "coma", "punto", "por", "ciento", "igual", "mas", "menos",
})

_NUM_FONDO_PAT = rf"(?:\d+|{_NUM_PAL_UN_COMA}(?:\s+y\s+{_DIGITO_PAL_COMA}|\s+{_DIGITO_PAL_COMA})?)"
_RE_RECUADRO_FONDO_INICIO = re.compile(
    rf"CONOCIMIENTO\s+M[ÁA]S\s+A\s+FONDO(?:\s+(?P<cap>{_NUM_FONDO_PAT})\s+(?:coma|punto)\s+(?P<num>{_NUM_FONDO_PAT}))?",
)
_RE_PDF_FONDO_HDR = re.compile(
    r"^\s*CONOCIMIENTO\s+M[ÁA]S\s+A\s+FONDO\s+(?P<cap>\d+)\.(?P<num>\d+)\s*$"
)
_RE_PDF_PAGINA = re.compile(r"^\s*={3,}\s*P[ÁA]GINA\s+\d+\s*={3,}\s*$", re.IGNORECASE)
_RE_PDF_SOLO_NUM = re.compile(r"^\s*\d{1,4}\s*$")
_RE_PDF_ENCABEZADO = re.compile(
    r"^\s*(?:CAP[ÍI]TULO\s+\d+|PARTE\s+(?:UNO|DOS|TRES|CUATRO|CINCO))\b"
)
_RE_PDF_CONTINUA = re.compile(r"^\s*Contin[úu]a\s*$", re.IGNORECASE)
_RE_PDF_STOP_BLOQUE = re.compile(
    r"^\s*(?:CUADRO\s+\d|TABLA\s+\d|Antes de proseguir\b|Aplicaci[oó]n de lo aprendido\b|"
    r"Resultados esperados del aprendizaje\b|Repaso\b|Gu[ií]a de estudio\b|"
    r"CONOCIMIENTO\s+M[ÁA]S\s+A\s+FONDO\b|\d+\.\d+\s+[A-ZÁÉÍÓÚÑ])"
)
_RE_PDF_FIGURA = re.compile(r"^\s*FIGURA\s+\d+\.\d+")
_RE_PDF_NOTA_PIE = re.compile(
    r"^\s*\d{1,3}\s+(?:[a-záéíóúüñA-ZÁÉÍÓÚÑ-]+\s*=|[A-ZÁÉÍÓÚÑ][^(]{2,50}\(\d{4}\s+a\s+\d{4}\))"
)
_RE_REF_FIG_PAREN_PDF = re.compile(
    r"\(\s*(?:(?:v\.|cf\.|v[eé]ase|v[eé]anse|ver|cons[uú]ltese)\s+)?"
    r"(?:figs?\.|figuras?|tablas?|cuadros?)[^()]{0,45}\)",
    re.IGNORECASE,
)
_RE_ABREV_FIN_ORACION = re.compile(
    r"(?:\bp\.\s*ej|\betc|\bp|\bpp|\bfig|\bfigs|\bcons|\baprox|\bDr|\bDra|\bSr|\bSra|\ba\.C|\bd\.C|\bS\.\s*A|\b[A-Z])$",
    re.IGNORECASE,
)


def _palabras_a_entero(texto_num: str) -> int | None:
    """Convierte dígitos o números en palabras (0..99) a entero."""
    s = texto_num.strip().lower()
    if not s:
        return None
    if s.isdigit():
        return int(s)
    toks = s.split()
    if len(toks) == 1:
        t = toks[0]
        if t in _UNIDADES_PAL_FONDO:
            return _UNIDADES_PAL_FONDO[t]
        if t in _ESPECIALES_PAL_FONDO:
            return _ESPECIALES_PAL_FONDO[t]
        if t in _DECENAS_PAL_FONDO:
            return _DECENAS_PAL_FONDO[t]
        return None
    if len(toks) == 2 and toks[0] in _UNIDADES_PAL_FONDO and toks[1] in _UNIDADES_PAL_FONDO:
        return _UNIDADES_PAL_FONDO[toks[0]] * 10 + _UNIDADES_PAL_FONDO[toks[1]]
    if len(toks) == 3 and toks[1] == "y" and toks[0] in _DECENAS_PAL_FONDO and toks[2] in _UNIDADES_PAL_FONDO:
        return _DECENAS_PAL_FONDO[toks[0]] + _UNIDADES_PAL_FONDO[toks[2]]
    return None


def _resolver_ruta_saladin_pdf(ruta_pdf: Path | None = None) -> Path | None:
    """Busca Saladin_texto_paginas.txt en ruta explícita o subiendo desde el repo."""
    if ruta_pdf is not None:
        return ruta_pdf if ruta_pdf.is_file() else None
    for base in (Path(__file__).resolve(), Path.cwd().resolve()):
        cur = base if base.is_dir() else base.parent
        for _ in range(7):
            for cand in (
                cur / "examenes pasados" / "MEDICINA" / "LIBROS DE MEDICINA" / "libros_extraidos" / "Saladin_texto_paginas.txt",
                cur / "libros_extraidos" / "Saladin_texto_paginas.txt",
            ):
                if cand.is_file():
                    return cand
            if cur.parent == cur:
                break
            cur = cur.parent
    return None


def _normalizar_token_fondo(tok: str) -> str:
    """Normaliza una palabra a minúsculas sin tildes preservando la ñ."""
    descompuesto = unicodedata.normalize("NFD", tok.lower())
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


def _tokenizar_con_spans(texto: str) -> list[tuple[str, int, int]]:
    """Devuelve [(token_normalizado, inicio, fin)] excluyendo números/símbolos expandidos."""
    salida: list[tuple[str, int, int]] = []
    for m in re.finditer(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+", texto):
        norm = _normalizar_token_fondo(m.group(0))
        if norm and norm not in _PALABRAS_EXCLUIDAS_FONDO:
            salida.append((norm, m.start(), m.end()))
    return salida


def _tokenizar_todas_palabras_con_spans(texto: str) -> list[tuple[str, int, int]]:
    """Devuelve [(token_normalizado, inicio, fin)] sin excluir ninguna palabra ni dígito."""
    return [
        (_normalizar_token_fondo(m.group(0)), m.start(), m.end())
        for m in re.finditer(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+", texto)
    ]


def _contar_palabras_fondo(texto: str) -> Counter[str]:
    """Multiconjunto de palabras en minúsculas para verificar conservación literal."""
    return Counter(
        m.group(0).lower()
        for m in re.finditer(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+", texto)
    )


def _unir_lineas_pdf(lineas: list[str]) -> str:
    """Une líneas del PDF crudo resolviendo cortes de palabra por guion al final de línea."""
    out: list[str] = []
    for ln in lineas:
        s = ln.strip()
        if not s:
            continue
        if out and out[-1].endswith("-") and re.match(r"^[a-záéíóúüñ]", s):
            out[-1] = out[-1][:-1] + s
        else:
            out.append(s)
    return " ".join(out)


def _extraer_recuadros_saladin_pdf(texto_pdf: str) -> dict[tuple[int, int], list[dict[str, Any]]]:
    """Indexa los bloques 'CONOCIMIENTO MÁS A FONDO X.Y' desde Saladin_texto_paginas.txt."""
    lineas = texto_pdf.splitlines()
    indice: dict[tuple[int, int], list[dict[str, Any]]] = {}
    pagina_actual = 0

    for i, linea in enumerate(lineas):
        if _RE_PDF_PAGINA.match(linea):
            m_pag = re.search(r"(\d+)", linea)
            if m_pag:
                pagina_actual = int(m_pag.group(1))
            continue

        m_hdr = _RE_PDF_FONDO_HDR.match(linea)
        if not m_hdr:
            continue
        clave = (int(m_hdr.group("cap")), int(m_hdr.group("num")))

        j = i + 1
        while j < len(lineas) and not lineas[j].strip():
            j += 1
        if j >= len(lineas):
            continue
        categoria = lineas[j].strip()

        j += 1
        while j < len(lineas) and not lineas[j].strip():
            j += 1
        if j >= len(lineas):
            continue

        titulo_partes = [lineas[j].strip()]
        while titulo_partes[-1].endswith("-") and j + 1 < len(lineas) and lineas[j + 1].strip():
            j += 1
            titulo_partes[-1] = titulo_partes[-1][:-1] + lineas[j].strip()
        if j + 1 < len(lineas):
            t1 = titulo_partes[-1]
            nxt = lineas[j + 1].strip()
            nxt2 = lineas[j + 2].strip() if j + 2 < len(lineas) else ""
            if (
                len(t1) >= 48
                and not t1.endswith((".", "?", "!"))
                and nxt
                and len(nxt) < 55
                and not nxt.endswith((".", "?", "!"))
                and (nxt[0].islower() or (len(nxt) < 40 and len(nxt2) >= 50))
            ):
                j += 1
                titulo_partes.append(nxt)
        titulo = " ".join(titulo_partes)
        j += 1

        cuerpo_lineas: list[str] = []
        continua_pendiente = False
        while j < len(lineas) and len(cuerpo_lineas) < 250:
            ln = lineas[j].strip()
            ultimo_termino = bool(cuerpo_lineas and re.search(r"[.!?:\"”»]$", cuerpo_lineas[-1]))

            if not ln:
                k = j + 1
                while k < len(lineas) and not lineas[k].strip():
                    k += 1
                if k >= len(lineas):
                    break
                nxt_ln = lineas[k].strip()
                if (
                    (_RE_PDF_PAGINA.match(nxt_ln) and not continua_pendiente)
                    or _RE_PDF_STOP_BLOQUE.match(nxt_ln)
                    or (_RE_PDF_FIGURA.match(nxt_ln) and ultimo_termino and not continua_pendiente)
                    or (ultimo_termino and nxt_ln[0].islower())
                ):
                    break
                j += 1
                continue

            if _RE_PDF_CONTINUA.match(ln):
                continua_pendiente = True
                j += 1
                continue
            if _RE_PDF_STOP_BLOQUE.match(ln):
                break
            if _RE_PDF_PAGINA.match(ln):
                if not continua_pendiente:
                    break
                continua_pendiente = False
                j += 1
                while j < len(lineas) and (
                    not lineas[j].strip()
                    or _RE_PDF_SOLO_NUM.match(lineas[j])
                    or _RE_PDF_ENCABEZADO.match(lineas[j])
                    or re.match(r"^\s*[a-e]\)\s*$", lineas[j])
                ):
                    j += 1
                continue
            if _RE_PDF_NOTA_PIE.match(ln):
                if ultimo_termino and not continua_pendiente:
                    break
                while j < len(lineas) and _RE_PDF_NOTA_PIE.match(lineas[j].strip()):
                    j += 1
                continue
            if _RE_PDF_FIGURA.match(ln):
                if continua_pendiente:
                    while j < len(lineas) and lineas[j].strip() and not _RE_PDF_PAGINA.match(lineas[j]):
                        j += 1
                    continue
                if ultimo_termino:
                    break
                j += 1
                while j < len(lineas):
                    s_fig = lineas[j].strip()
                    if not s_fig or _RE_PDF_PAGINA.match(s_fig) or _RE_PDF_STOP_BLOQUE.match(s_fig):
                        break
                    if re.match(r"^\d{4}\)", s_fig) or s_fig[0].islower():
                        break
                    j += 1
                continue
            if continua_pendiente:
                j += 1
                continue

            cuerpo_lineas.append(ln)
            j += 1

        # Extraer primeros renglones tras el cierre en misma página o siguiente página (continuación)
        same_page_lines: list[str] = []
        k = j
        while k < len(lineas) and not lineas[k].strip():
            k += 1
        while (
            k < len(lineas)
            and len(same_page_lines) < 3
            and lineas[k].strip()
            and not _RE_PDF_PAGINA.match(lineas[k])
            and not _RE_PDF_STOP_BLOQUE.match(lineas[k])
            and not _RE_PDF_FIGURA.match(lineas[k])
            and not _RE_PDF_NOTA_PIE.match(lineas[k])
        ):
            same_page_lines.append(lineas[k].strip())
            k += 1

        post_page_lines: list[str] = []
        k_pag = j
        while k_pag < len(lineas) and not _RE_PDF_PAGINA.match(lineas[k_pag]):
            k_pag += 1
        if k_pag < len(lineas):
            k_pag += 1
            while k_pag < len(lineas) and (
                not lineas[k_pag].strip()
                or _RE_PDF_SOLO_NUM.match(lineas[k_pag])
                or _RE_PDF_ENCABEZADO.match(lineas[k_pag])
            ):
                k_pag += 1
            while (
                k_pag < len(lineas)
                and len(post_page_lines) < 3
                and lineas[k_pag].strip()
                and not _RE_PDF_PAGINA.match(lineas[k_pag])
            ):
                post_page_lines.append(lineas[k_pag].strip())
                k_pag += 1

        cuerpo_bruto = _unir_lineas_pdf(cuerpo_lineas)
        indice.setdefault(clave, []).append({
            "pagina": pagina_actual,
            "categoria": categoria,
            "titulo": titulo,
            "cuerpo": cuerpo_bruto,
            "same_page_next": _unir_lineas_pdf(same_page_lines),
            "post_page_prefix": _unir_lineas_pdf(post_page_lines),
        })

    return indice


def _buscar_subsecuencia_tokens(
    tokens: list[tuple[str, int, int]],
    aguja: list[str],
    inicio: int = 0,
) -> int | None:
    """Devuelve el índice inicial donde `aguja` coincide exactamente en `tokens`."""
    m = len(aguja)
    if m == 0 or inicio + m > len(tokens):
        return None
    for idx in range(inicio, len(tokens) - m + 1):
        if all(tokens[idx + k][0] == aguja[k] for k in range(m)):
            return idx
    return None


def _termina_oracion(s: str) -> bool:
    """True si el fragmento termina con cierre de oración (no abreviatura)."""
    st = s.rstrip()
    if not st:
        return True
    if st[-1] not in ".?!:":
        return False
    if st[-1] == "." and _RE_ABREV_FIN_ORACION.search(st[:-1]):
        return False
    return True


def _encontrar_fin_oracion(s: str, inicio: int = 0) -> int | None:
    """Devuelve el índice tras el primer cierre real de oración a partir de `inicio`."""
    sub = s[inicio:]
    for m in re.finditer(r"[.!?](?:[»”\"'\)]+)?(?=\s|$)", sub):
        if m.group(0)[0] == ".":
            ctx = sub[: m.start()]
            if _RE_ABREV_FIN_ORACION.search(ctx):
                continue
        return inicio + m.end()
    return None


def _unir_fragmento_oracion(antes: str, resto: str) -> str:
    """Une el inicio interrumpido de la oración con su continuación."""
    resto_st = resto.lstrip(" \t\r\n")
    antes_st = antes.rstrip(" \t\r\n")
    if not antes_st:
        return resto_st
    if not resto_st:
        return antes_st
    if antes_st.endswith("-") and resto_st[0].islower():
        return antes_st[:-1] + resto_st
    sin_espacio_previo = bool(antes) and antes[-1].isalpha()
    if sin_espacio_previo and resto_st[0].islower():
        return antes_st + resto_st
    return f"{antes_st} {resto_st}"


def mover_recuadros_fondo(
    texto: str,
    texto_pdf: str | None = None,
    *,
    ruta_pdf: Path | None = None,
) -> ResultadoPaso:
    """R7: mueve recuadros 'CONOCIMIENTO MÁS A FONDO' al final del párrafo interrumpido con título aparte."""
    hallazgos_ini = list(_RE_RECUADRO_FONDO_INICIO.finditer(texto))
    if not hallazgos_ini:
        return ResultadoPaso(texto, 0, [])

    if texto_pdf is None:
        ruta = _resolver_ruta_saladin_pdf(ruta_pdf)
        if ruta is None:
            no_res = [
                f"Recuadro {m.group('cap')} coma {m.group('num')}: no se encontró Saladin_texto_paginas.txt"
                if m.group("cap") and m.group("num")
                else "Recuadro CONOCIMIENTO MÁS A FONDO: no se encontró Saladin_texto_paginas.txt"
                for m in hallazgos_ini
            ]
            return ResultadoPaso(texto, 0, _dedup_ordenado(no_res))
        texto_pdf = ruta.read_text(encoding="utf-8", errors="replace")

    if not texto_pdf.strip():
        no_res = [
            f"Recuadro {m.group('cap')} coma {m.group('num')}: Saladin_texto_paginas.txt vacío"
            if m.group("cap") and m.group("num")
            else "Recuadro CONOCIMIENTO MÁS A FONDO: Saladin_texto_paginas.txt vacío"
            for m in hallazgos_ini
        ]
        return ResultadoPaso(texto, 0, _dedup_ordenado(no_res))

    indice_pdf = _extraer_recuadros_saladin_pdf(texto_pdf)
    actual = texto
    cambios = 0
    no_resueltos: list[str] = []
    pos_busqueda = 0

    while True:
        m_hdr = _RE_RECUADRO_FONDO_INICIO.search(actual, pos_busqueda)
        if not m_hdr:
            break

        cap_s = m_hdr.group("cap")
        num_s = m_hdr.group("num")
        if not cap_s or not num_s:
            no_resueltos.append("Recuadro CONOCIMIENTO MÁS A FONDO sin número identificable")
            pos_busqueda = m_hdr.end()
            continue

        cap = _palabras_a_entero(cap_s)
        num = _palabras_a_entero(num_s)
        etq_num = f"{cap_s} coma {num_s}"
        if cap is None or num is None:
            no_resueltos.append(f"Recuadro {etq_num}: número no interpretable")
            pos_busqueda = m_hdr.end()
            continue

        candidatos = indice_pdf.get((cap, num), [])
        if not candidatos:
            no_resueltos.append(f"Recuadro {etq_num} ({cap}.{num}): no encontrado en Saladin_texto_paginas.txt")
            pos_busqueda = m_hdr.end()
            continue

        # Preferir candidatos del cuerpo del libro (>= pág. 29) frente a muestras del prefacio.
        candidatos_ord = sorted(candidatos, key=lambda c: (0 if c["pagina"] >= 29 or c["pagina"] == 0 else 1))
        md_tokens_hdr = _tokenizar_todas_palabras_con_spans(actual[m_hdr.end() : m_hdr.end() + 500])

        elegido: dict[str, Any] | None = None
        coincidio_titulo = False
        cat_md = ""
        tit_md = ""
        pos_body_start = -1
        pos_box_end = -1

        for cand in candidatos_ord:
            cat_limpia = corregir_ligaduras_partidas(cand["categoria"]).texto
            tit_limpio = corregir_ligaduras_partidas(cand["titulo"]).texto
            cat_toks = [t[0] for t in _tokenizar_todas_palabras_con_spans(cat_limpia)]
            tit_toks = [t[0] for t in _tokenizar_todas_palabras_con_spans(tit_limpio)]
            hdr_toks = cat_toks + tit_toks
            if not cat_toks or not tit_toks or len(md_tokens_hdr) <= len(hdr_toks):
                continue
            if not all(md_tokens_hdr[k][0] == hdr_toks[k] for k in range(len(hdr_toks))):
                continue
            coincidio_titulo = True

            cat_s_idx = m_hdr.end() + md_tokens_hdr[0][1]
            cat_e_idx = m_hdr.end() + md_tokens_hdr[len(cat_toks) - 1][2]
            tit_s_idx = m_hdr.end() + md_tokens_hdr[len(cat_toks)][1]
            while tit_s_idx > cat_e_idx and actual[tit_s_idx - 1] in "¿¡":
                tit_s_idx -= 1
            tit_e_idx = m_hdr.end() + md_tokens_hdr[len(hdr_toks) - 1][2]
            tit_pdf_st = tit_limpio.rstrip()
            if tit_e_idx < len(actual) and (
                actual[tit_e_idx] in "?!"
                or (tit_pdf_st and actual[tit_e_idx] == tit_pdf_st[-1] and tit_pdf_st[-1] in ".:»”\"')")
            ):
                tit_e_idx += 1

            # El cuerpo empieza exactamente donde termina el título en el PDF crudo.
            c_start = tit_e_idx
            while c_start < len(actual) and actual[c_start].isspace():
                c_start += 1

            cuerpo_con_fig = corregir_ligaduras_partidas(cand["cuerpo"]).texto
            cuerpo_sin_fig = _RE_REF_FIG_PAREN_PDF.sub(" ", cuerpo_con_fig)
            fin_ventana = min(len(actual), c_start + max(1800, int(len(cuerpo_con_fig) * 2.5) + 1200))
            tramo_body = actual[c_start:fin_ventana]
            md_body_exact = _tokenizar_todas_palabras_con_spans(tramo_body)
            md_body_tokens = _tokenizar_con_spans(tramo_body)

            for cuerpo_var in (cuerpo_sin_fig, cuerpo_con_fig):
                cuerpo_exact = [t[0] for t in _tokenizar_todas_palabras_con_spans(cuerpo_var)]
                if len(cuerpo_exact) >= 3:
                    open_k_ex = min(4, len(cuerpo_exact))
                    open_set_ex = set(cuerpo_exact[:open_k_ex])
                    head_window_ex = {t[0] for t in md_body_exact[: open_k_ex + 2]}
                    if len(open_set_ex & head_window_ex) >= max(2, open_k_ex - 1):
                        for k_tail in (min(10, len(cuerpo_exact)), min(6, len(cuerpo_exact))):
                            if k_tail < 3:
                                continue
                            idx_tail = _buscar_subsecuencia_tokens(md_body_exact, cuerpo_exact[-k_tail:])
                            if idx_tail is not None:
                                tok_fin = md_body_exact[idx_tail + k_tail - 1]
                                b_end = c_start + tok_fin[2]
                                m_punct = re.match(r"^(?:\d{1,2})?[.,;:!?»”\"'\)]+", actual[b_end:])
                                if m_punct:
                                    b_end += m_punct.end()
                                elegido = cand
                                cat_md = re.sub(r"\s+", " ", actual[cat_s_idx:cat_e_idx]).strip()
                                tit_md = re.sub(r"\s+", " ", actual[tit_s_idx:tit_e_idx]).strip()
                                pos_body_start = c_start
                                pos_box_end = b_end
                                break
                        if elegido is not None:
                            break

                cuerpo_toks = [t[0] for t in _tokenizar_con_spans(cuerpo_var)]
                if len(cuerpo_toks) < 3:
                    continue
                open_k = min(4, len(cuerpo_toks))
                open_set = set(cuerpo_toks[:open_k])
                head_window = {t[0] for t in md_body_tokens[: open_k + 2]}
                if len(open_set & head_window) < max(2, open_k - 1):
                    continue

                for k_tail in (min(10, len(cuerpo_toks)), min(6, len(cuerpo_toks))):
                    if k_tail < 3:
                        continue
                    idx_tail = _buscar_subsecuencia_tokens(md_body_tokens, cuerpo_toks[-k_tail:])
                    if idx_tail is not None:
                        tok_fin = md_body_tokens[idx_tail + k_tail - 1]
                        b_end = c_start + tok_fin[2]
                        m_punct = re.match(r"^(?:\d{1,2})?[.,;:!?»”\"'\)]+", actual[b_end:])
                        if m_punct:
                            b_end += m_punct.end()
                        elegido = cand
                        cat_md = re.sub(r"\s+", " ", actual[cat_s_idx:cat_e_idx]).strip()
                        tit_md = re.sub(r"\s+", " ", actual[tit_s_idx:tit_e_idx]).strip()
                        pos_body_start = c_start
                        pos_box_end = b_end
                        break
                if elegido is not None:
                    break
            if elegido is not None:
                break

        if elegido is None or pos_box_end <= pos_body_start:
            motivo = (
                "no se pudo ubicar con seguridad el fin del recuadro"
                if coincidio_titulo
                else "el título o la categoría no coinciden palabra por palabra con Saladin_texto_paginas.txt"
            )
            no_resueltos.append(f"Recuadro {etq_num} ({cap}.{num}): {motivo}")
            pos_busqueda = m_hdr.end()
            continue

        cuerpo_md = actual[pos_body_start:pos_box_end].strip()
        if re.search(r"\n\s*\n\s*(?:CAP[ÍI]TULO|PARTE)\b", cuerpo_md):
            no_resueltos.append(f"Recuadro {etq_num} ({cap}.{num}): cruza salto de página")
            pos_busqueda = m_hdr.end()
            continue

        cap_pal = _entero_a_palabras(cap)
        num_pal = _entero_a_palabras(num)
        encabezado_nuevo = f"Conocimiento más a fondo {cap_pal} punto {num_pal}. {cat_md}: {tit_md}"
        bloque_recuadro = f"{encabezado_nuevo}\n{cuerpo_md}"

        antes = actual[: m_hdr.start()]
        despues = actual[pos_box_end:]
        termina_antes = _termina_oracion(antes)

        necesita_cerrar_frase = not termina_antes
        continuacion_minusc = False
        if termina_antes and elegido["post_page_prefix"]:
            p_pref = elegido["post_page_prefix"].lstrip()
            if p_pref and p_pref[0].islower():
                continuacion_minusc = True

        cabecera_orig_cnt = _contar_palabras_fondo(m_hdr.group(0))
        cabecera_nueva_cnt = _contar_palabras_fondo(
            f"Conocimiento más a fondo {cap_pal} punto {num_pal}"
        )

        if not necesita_cerrar_frase and not continuacion_minusc:
            antes_limpio = antes.rstrip(" \t\r\n")
            despues_limpio = despues.lstrip(" \t\r\n")
            pref = f"{antes_limpio}\n\n" if antes_limpio else ""
            if despues_limpio:
                suf = f"\n\n{despues_limpio}"
            elif actual.endswith("\n"):
                suf = "\n"
            else:
                suf = ""
            nuevo_tramo = f"{pref}{bloque_recuadro}{suf}"
            if (
                _contar_palabras_fondo(actual) - cabecera_orig_cnt
                != _contar_palabras_fondo(nuevo_tramo) - cabecera_nueva_cnt
            ):
                no_resueltos.append(
                    f"Recuadro {etq_num} ({cap}.{num}): pérdida de palabras al mover; no se modifica"
                )
                pos_busqueda = m_hdr.end()
                continue
            actual = nuevo_tramo
            cambios += 1
            pos_busqueda = len(pref) + len(bloque_recuadro)
            continue

        # Ubicar la continuación de la frase principal en `despues`
        start_cont: int | None = None
        despues_exact = _tokenizar_todas_palabras_con_spans(despues[:8000])
        despues_tokens = _tokenizar_con_spans(despues[:8000])
        for cand_pref in (elegido["post_page_prefix"], elegido["same_page_next"]):
            pref_exact = [t[0] for t in _tokenizar_todas_palabras_con_spans(cand_pref)]
            k_exact = min(5, len(pref_exact))
            if k_exact >= 2:
                idx_p = _buscar_subsecuencia_tokens(despues_exact, pref_exact[:k_exact])
                if idx_p is not None:
                    start_cont = despues_exact[idx_p][1]
                    break
            pref_toks = [t[0] for t in _tokenizar_con_spans(cand_pref)]
            k_pref = min(5, len(pref_toks))
            if k_pref >= 2:
                idx_p = _buscar_subsecuencia_tokens(despues_tokens, pref_toks[:k_pref])
                if idx_p is not None:
                    start_cont = despues_tokens[idx_p][1]
                    break

        if start_cont is None and necesita_cerrar_frase:
            despues_st = despues.lstrip(" \t")
            if (
                despues_st
                and not despues_st.startswith("\n")
                and not re.match(r"^(?:FIGURA|CUADRO|TABLA|CAP[ÍI]TULO|PARTE)\b", despues_st)
                and not re.match(rf"^(?:\d+|{_NUM_PAL_UN_COMA})\s+[a-záéíóúüñ]+\s+igual\s+a\b", despues_st, re.I)
            ):
                start_cont = len(despues) - len(despues_st)

        if start_cont is None:
            no_resueltos.append(
                f"Recuadro {etq_num} ({cap}.{num}): no se encontró la continuación de la frase principal"
            )
            pos_busqueda = m_hdr.end()
            continue

        fin_sent = _encontrar_fin_oracion(despues, start_cont)
        if fin_sent is None:
            no_resueltos.append(
                f"Recuadro {etq_num} ({cap}.{num}): no se encontró el cierre de la frase principal"
            )
            pos_busqueda = m_hdr.end()
            continue

        entre_medio = despues[:start_cont]
        resto_frase = despues[start_cont:fin_sent].strip()
        cola = despues[fin_sent:]
        entre_limpio = entre_medio.strip()
        cola_limpia = "" if not cola.strip() else cola.lstrip(" \t")

        if necesita_cerrar_frase:
            texto_antes_recuadro = _unir_fragmento_oracion(antes, resto_frase)
            if entre_limpio:
                if cola_limpia:
                    if cola_limpia[0] in "\r\n":
                        salida_despues = f"\n\n{entre_limpio}{cola_limpia}"
                    else:
                        salida_despues = f"\n\n{entre_limpio} {cola_limpia}"
                else:
                    salida_despues = f"\n\n{entre_limpio}"
            elif cola_limpia:
                if cola_limpia[0] in "\r\n":
                    salida_despues = f"\n\n{cola_limpia.lstrip()}"
                else:
                    salida_despues = f"\n\n{cola_limpia}"
            else:
                salida_despues = "\n" if actual.endswith("\n") else ""

            nuevo_tramo = f"{texto_antes_recuadro}\n\n{bloque_recuadro}{salida_despues}"
            sig_pos = len(nuevo_tramo) - len(salida_despues)
        else:
            antes_limpio = antes.rstrip(" \t\r\n")
            cierre_entre = f"{entre_limpio} {resto_frase}".strip()
            if cola_limpia:
                if cola_limpia[0] in "\r\n":
                    salida_cola = f"\n\n{cola_limpia.lstrip()}"
                else:
                    salida_cola = f"\n\n{cola_limpia}"
            else:
                salida_cola = "\n" if actual.endswith("\n") else ""
            nuevo_tramo = f"{antes_limpio}\n\n{cierre_entre}\n\n{bloque_recuadro}{salida_cola}"
            sig_pos = len(nuevo_tramo) - len(salida_cola)

        if (
            _contar_palabras_fondo(actual) - cabecera_orig_cnt
            != _contar_palabras_fondo(nuevo_tramo) - cabecera_nueva_cnt
        ):
            no_resueltos.append(
                f"Recuadro {etq_num} ({cap}.{num}): pérdida de palabras al mover; no se modifica"
            )
            pos_busqueda = m_hdr.end()
            continue

        pos_busqueda = sig_pos
        actual = nuevo_tramo
        cambios += 1

    return ResultadoPaso(actual, cambios, _dedup_ordenado(no_resueltos))


_NUM_PIE_FIGURA_PAT = (
    rf"(?:"
    rf"[A-Z](?:[.\-–—−]?(?:\d+(?:[.\-–—−](?:\d+|{_NUM_PAL_R5}))*|(?:{_NUM_PAL_R5}))"
    rf"|\s+(?:punto|coma)\s+(?:{_NUM_PAL_R5}|\d+))"
    rf"|\d+(?:[.\-–—−](?:\d+|{_NUM_PAL_R5}))*[a-zA-Z]?"
    rf"|{_NUM_PAL_R5}(?:[.\-–—−](?:\d+|{_NUM_PAL_R5})|\s+(?:punto|coma|y|a|al|{_NUM_PAL_R5}))*"
    rf")"
)
_RE_PIE_FIGURA_PEGADO = re.compile(
    rf"(?P<fin>[.!?](?:[»”\"'\)]+)?)[ \t]+(?=(?:FIGURA|CUADRO|TABLA)[ \t]+{_NUM_PIE_FIGURA_PAT}\b)"
)


def separar_pies_figura(texto: str) -> ResultadoPaso:
    """R7 (regla 18): pone los pies de FIGURA/CUADRO/TABLA en una línea nueva tras fin de frase."""
    nuevo, cambios = _RE_PIE_FIGURA_PEGADO.subn(r"\g<fin>\n", texto)
    return ResultadoPaso(nuevo, cambios, [])


# ============================================================================
# ORQUESTACIÓN, RESPALDO Y REPORTE
# ============================================================================

_PASOS: tuple[tuple[str, Callable[[str], ResultadoPaso]], ...] = (
    ("R8_ligaduras", corregir_ligaduras_partidas),
    ("R3_creditos", eliminar_creditos),
    ("R5_figuras", eliminar_referencias_figuras),
    ("R6_iones", corregir_iones),
    ("R6_conversiones_rotas", corregir_conversiones_rotas),
    ("R7_recuadros_fondo", mover_recuadros_fondo),
    ("R6_un_coma", corregir_un_coma),
    ("R6_unidades", corregir_unidades_en_palabras),
    ("R6_griegas", corregir_griegas),
    ("R6_iones_siglas", corregir_iones_residuales),
    ("R6_pdf_crudo", reportar_errores_pdf_crudo),
    ("R7_pies_figura", separar_pies_figura),
    ("R7_siglas", corregir_siglas),
)


def corregir_texto(texto: str) -> tuple[str, dict[str, int], dict[str, list[str]]]:
    """Ejecuta todas las correcciones deterministas en orden fijo."""
    actual = texto
    cambios_por_tipo: dict[str, int] = {}
    no_resueltos_por_tipo: dict[str, list[str]] = {}

    for nombre, fn in _PASOS:
        res = fn(actual)
        actual = res.texto
        cambios_por_tipo[nombre] = res.cambios
        no_resueltos_por_tipo[nombre] = res.no_resueltos

    return actual, cambios_por_tipo, no_resueltos_por_tipo


def crear_respaldo(ruta_archivo: Path) -> Path:
    """Crea copia en <carpeta>/bak_correccion_16nov/ sin sobrescribir respaldos existentes."""
    dir_bak = ruta_archivo.parent / NOMBRE_DIR_RESPALDO
    dir_bak.mkdir(parents=True, exist_ok=True)
    ruta_bak = dir_bak / ruta_archivo.name
    if not ruta_bak.exists():
        shutil.copy2(ruta_archivo, ruta_bak)
    return ruta_bak


def procesar_archivo(ruta_archivo: Path, *, solo_reportar: bool = False) -> ResultadoArchivo:
    """Procesa un archivo .md; en modo normal respalda antes de escribir cambios."""
    texto_orig = ruta_archivo.read_text(encoding="utf-8")
    texto_nuevo, cambios_por_tipo, no_resueltos_por_tipo = corregir_texto(texto_orig)

    respaldo: Path | None = None
    modificado = False
    if not solo_reportar:
        respaldo = crear_respaldo(ruta_archivo)
        if texto_nuevo != texto_orig:
            ruta_archivo.write_text(texto_nuevo, encoding="utf-8")
            modificado = True

    return ResultadoArchivo(
        ruta=ruta_archivo,
        cambios_por_tipo=cambios_por_tipo,
        no_resueltos_por_tipo=no_resueltos_por_tipo,
        respaldo=respaldo,
        modificado=modificado,
    )


def listar_archivos_objetivo(entrada: Path) -> list[Path]:
    """Resuelve la lista de archivos .md a procesar desde un archivo o carpeta."""
    if entrada.is_file():
        return [entrada]
    if entrada.is_dir():
        tts = sorted(p for p in entrada.glob("*_LITERAL_TTS.md") if p.is_file())
        if tts:
            return tts
        todos_md = sorted(p for p in entrada.glob("*.md") if p.is_file())
        if todos_md:
            return todos_md
        raise FileNotFoundError(f"No se encontraron archivos .md en: {_citar_ruta(entrada)}")
    raise FileNotFoundError(f"No existe la ruta indicada: {_citar_ruta(entrada)}")


def formatear_reporte(resultados: list[ResultadoArchivo], *, solo_reportar: bool = False) -> str:
    """Genera un resumen legible por archivo con contadores y casos pendientes."""
    modo = "SOLO REPORTAR (sin modificar archivos)" if solo_reportar else "CORRECCIÓN APLICADA"
    lineas: list[str] = [f"=== Resumen ({modo}) ===", ""]

    for res in resultados:
        total_cambios = sum(res.cambios_por_tipo.values())
        estado = "sin cambios" if not res.modificado else "modificado"
        if solo_reportar:
            estado = f"detectados {total_cambios} cambios posibles"
        lineas.append(f"Archivo: {_citar_ruta(res.ruta)} [{estado}]")
        if res.respaldo is not None:
            lineas.append(f"  Respaldo: {_citar_ruta(res.respaldo)}")
        for nombre, _ in _PASOS:
            cant = res.cambios_por_tipo.get(nombre, 0)
            pend = res.no_resueltos_por_tipo.get(nombre, [])
            lineas.append(f"  - {nombre}: {cant} cambios, {len(pend)} sin resolver")

        pendientes_totales = [
            f"[{nombre}] {item}"
            for nombre, _ in _PASOS
            for item in res.no_resueltos_por_tipo.get(nombre, [])
        ]
        if pendientes_totales:
            lineas.append("  Casos no resueltos (revisión humana):")
            for item in pendientes_totales:
                lineas.append(f"    * {item}")
        lineas.append("")

    return "\n".join(lineas).rstrip() + "\n"


def _configurar_stdout_utf8() -> None:
    if sys.platform == "win32":
        for stream in (sys.stdout, sys.stderr):
            if hasattr(stream, "reconfigure"):
                stream.reconfigure(encoding="utf-8", errors="replace")


def main(argv: list[str] | None = None) -> int:
    """Punto de entrada CLI."""
    _configurar_stdout_utf8()
    parser = argparse.ArgumentParser(
        description="Corrección determinista de textos de audio (*_LITERAL_TTS.md)."
    )
    parser.add_argument(
        "entrada",
        help="Ruta a un archivo .md o carpeta con archivos *_LITERAL_TTS.md.",
    )
    parser.add_argument(
        "--solo-reportar",
        action="store_true",
        help="Analiza y muestra el reporte sin crear respaldos ni modificar archivos.",
    )
    args = parser.parse_args(argv)

    try:
        archivos = listar_archivos_objetivo(Path(args.entrada))
        resultados = [
            procesar_archivo(archivo, solo_reportar=args.solo_reportar)
            for archivo in archivos
        ]
        print(formatear_reporte(resultados, solo_reportar=args.solo_reportar))
        return 0
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
