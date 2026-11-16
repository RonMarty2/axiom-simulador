# -*- coding: utf-8 -*-
"""Corrección determinista de textos de audio (*_LITERAL_TTS.md).

Aplica solo correcciones seguras y reproducibles (R8, R3, R5, R6, R7) sin
parafrasear ni reescribir el texto literal, crea respaldo antes de modificar
y reporta los cambios y los casos ambiguos que requieren revisión humana.
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Callable


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
_PATRON_SIGLAS = "|".join(re.escape(k) for k in sorted(MAPA_SIGLAS, key=len, reverse=True))
_RE_SIGLAS = re.compile(
    rf"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])(?:{_PATRON_SIGLAS})(?![A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d])"
)
_RE_SIGLA_CAPS = re.compile(r"\b[A-Z]{2,6}\b")


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


def corregir_siglas(texto: str) -> ResultadoPaso:
    """R7: deletrea solo siglas de la lista cerrada; reporta otras siglas en mayúsculas."""
    cambios = 0

    def _repl(m: re.Match[str]) -> str:
        nonlocal cambios
        tok = m.group(0)
        reemplazo = MAPA_SIGLAS.get(tok)
        if reemplazo is None:
            return tok
        cambios += 1
        return reemplazo

    nuevo = _RE_SIGLAS.sub(_repl, texto)

    no_resueltos: list[str] = []
    for linea in nuevo.splitlines():
        palabras_l = linea.split()
        if not palabras_l:
            continue
        mayus_l = sum(1 for p in palabras_l if p.isupper() and len(p) > 1)
        if mayus_l / len(palabras_l) >= 0.5 and len(palabras_l) >= 2:
            continue
        for m in _RE_SIGLA_CAPS.finditer(linea):
            tok = m.group(0)
            if tok in MAPA_SIGLAS or tok in _ROMANOS_IGNORAR or tok in _PALABRAS_MAYUS_IGNORAR:
                continue
            no_resueltos.append(f"Sigla fuera de lista: {tok}")

    return ResultadoPaso(nuevo, cambios, _dedup_ordenado(no_resueltos))


# ============================================================================
# ORQUESTACIÓN, RESPALDO Y REPORTE
# ============================================================================

_PASOS: tuple[tuple[str, Callable[[str], ResultadoPaso]], ...] = (
    ("R8_ligaduras", corregir_ligaduras_partidas),
    ("R3_creditos", eliminar_creditos),
    ("R5_figuras", eliminar_referencias_figuras),
    ("R6_iones", corregir_iones),
    ("R6_conversiones_rotas", corregir_conversiones_rotas),
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
