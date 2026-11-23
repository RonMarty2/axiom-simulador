# -*- coding: utf-8 -*-
"""Genera los mapas de títulos del PSA 2027 (EdS 5 partes + Calvo 14 capítulos + Saladin 20 capítulos).

Formato JSON estándar: capitulo, libro, titulo_capitulo, palabras_texto, titulos.
Solo lee fuentes y escribe mapas de títulos; no modifica textos ni audios.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from pathlib import Path
from typing import Any


DIR_SCRIPT = Path(__file__).resolve().parent
DIR_MAPAS_DEFECTO = DIR_SCRIPT / "mapa_titulos"

EDS_PARTES: tuple[str, ...] = (
    "EdS_Parte1",
    "EdS_Parte2",
    "EdS_Parte3_1",
    "EdS_Parte3_2",
    "EdS_Parte3_3",
)

CALVO_PSA_CAPS: tuple[int, ...] = (
    3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18,
)

SALADIN_PSA_CAPS: tuple[int, ...] = (
    1, 5, 6, 8, 9, 10, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 25, 27, 28,
)

NO_NARRABLE_RE = re.compile(
    r"^(?:gu[ií]a\s+de\s+estudio|temas\s+de\s+conexi[oó]n|prueba\s+tus\s+conocimientos|"
    r"autoevaluaci[oó]n|preguntas|cuestiones|glosario|bibliograf[ií]a|"
    r"lecturas\s+recomendadas|respuestas|ejercicios|evaluaci[oó]n\s+de\s+los\s+resultados)\b",
    re.IGNORECASE,
)

_NUM_PALABRA_A_INT: dict[str, int] = {
    "cero": 0, "un": 1, "uno": 1, "dos": 2, "tres": 3, "cuatro": 4,
    "cinco": 5, "seis": 6, "siete": 7, "ocho": 8, "nueve": 9, "diez": 10,
    "once": 11, "doce": 12, "trece": 13, "catorce": 14, "quince": 15,
    "dieciseis": 16, "diecisiete": 17, "dieciocho": 18, "diecinueve": 19,
    "veinte": 20, "veintiuno": 21, "veintiun": 21, "veintidos": 22,
    "veintitres": 23, "veinticuatro": 24, "veinticinco": 25, "veintiseis": 26,
    "veintisiete": 27, "veintiocho": 28, "veintinueve": 29, "treinta": 30,
}

_INT_A_PALABRAS_ES: dict[int, tuple[str, ...]] = {
    0: ("cero",),
    1: ("uno", "un"),
    2: ("dos",),
    3: ("tres",),
    4: ("cuatro",),
    5: ("cinco",),
    6: ("seis",),
    7: ("siete",),
    8: ("ocho",),
    9: ("nueve",),
    10: ("diez",),
    11: ("once",),
    12: ("doce",),
    13: ("trece",),
    14: ("catorce",),
    15: ("quince",),
    16: ("dieciseis",),
    17: ("diecisiete",),
    18: ("dieciocho",),
    19: ("diecinueve",),
    20: ("veinte",),
    21: ("veintiuno", "veintiun"),
    22: ("veintidos",),
    23: ("veintitres",),
    24: ("veinticuatro",),
    25: ("veinticinco",),
    26: ("veintiseis",),
    27: ("veintisiete",),
    28: ("veintiocho",),
    29: ("veintinueve",),
    30: ("treinta",),
}

_PAL_NUM_VARIANTES = tuple(_NUM_PALABRA_A_INT) + (
    "dieciséis", "veintiún", "veintidós", "veintitrés", "veintiséis",
)
_PAL_NUM_PAT = "|".join(sorted(_PAL_NUM_VARIANTES, key=len, reverse=True))

_EDS_SUBTITULO_PUNTO_RE = re.compile(
    rf"^(?P<n1>{_PAL_NUM_PAT})\s+punto\s+(?P<n2>{_PAL_NUM_PAT})"
    rf"(?:\s+punto\s+(?P<n3>{_PAL_NUM_PAT}))?[.:]?\s+(?P<tit>.+)$",
    re.IGNORECASE,
)

_EDS_UNIDAD_P3_RE = re.compile(
    rf"^(?P<n1>{_PAL_NUM_PAT})\.?\s+(?P<tit>[A-ZÁÉÍÓÚÑ][^\n]+)$",
)

_EDS_NUM_LISTA_RE = re.compile(
    rf"^(?P<n1>{_PAL_NUM_PAT})\.\s+(?P<tit>[A-ZÁÉÍÓÚÑ][^\n]+)$",
)

_EDS_EXCLUIR_LINEA_RE = re.compile(
    r"^(?:objetivos|contenido|gr[áa]ficas?|tablas?|figuras?|cuadros?|fuente|cr[eé]ditos|"
    r"nota|donde|totales?|total|paso\s+\w+|datos\s+ordenados|elementos\s+l[oó]gicos|"
    r"ejemplos?|veamos\s+el\s+siguiente|problema\s*:)\b",
    re.IGNORECASE,
)

_EDS_PARTE_TITULO_RE = re.compile(
    r"^(?:parte\s+\w+|cap[ií]tulo\s+\w+\b.*|introducci[oó]n)$",
    re.IGNORECASE,
)

_PALABRAS_FUNCION_2 = frozenset({
    "de", "en", "el", "la", "al", "un", "es", "se", "su", "no", "si", "lo", "le", "ya",
})


def _configurar_stdout_utf8() -> None:
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")


def norm(texto: str) -> list[str]:
    """Normaliza a lista de tokens alfanuméricos minúsculos sin tildes (igual que mapa_titulos_calvo.py)."""
    s = unicodedata.normalize("NFD", texto.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9 ]+", " ", s).split()


def _norm_sin_tilde(texto: str) -> str:
    s = unicodedata.normalize("NFD", texto.lower())
    return "".join(c for c in s if unicodedata.category(c) != "Mn")


def _limpiar_ligaduras_pdf(texto: str) -> str:
    """Repara ligaduras partidas comunes del PDF crudo (fi siología -> fisiología, fl ujo -> flujo)."""
    s = re.sub(r"\bfi\s+n\b", "fin", texto)

    def _unir(m: re.Match[str]) -> str:
        izq, der = m.group(1), m.group(2)
        if der.lower() in _PALABRAS_FUNCION_2:
            return m.group(0)
        return izq + der

    s = re.sub(
        r"(?<![A-Za-zÁÉÍÓÚÜÑáéíóúüñ])([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*(?:ffi|ffl|fi|fl))\s+([a-záéíóúüñ]{2,})",
        _unir,
        s,
    )
    return re.sub(r"\s+", " ", s).strip()


def _unir_lineas_pdf(partes: list[str]) -> str:
    """Une líneas envueltas de un título en PDF reparando cortes con guion."""
    acc = ""
    for p in partes:
        p = p.strip()
        if not p:
            continue
        if not acc:
            acc = p
        elif acc.endswith("-") and p[0].islower():
            acc = acc[:-1] + p
        else:
            acc = acc + " " + p
    return _limpiar_ligaduras_pdf(acc)


def _es_mayusculas_encabezado(texto: str) -> bool:
    """True si el texto es un encabezado principal en MAYÚSCULAS (tolera ', Concepto' o ', BOLIVIA')."""
    base = texto.split(",", 1)[0].strip()
    letras = [c for c in base if c.isalpha()]
    if len(letras) < 4:
        return False
    mayus = sum(1 for c in letras if c.isupper())
    return (mayus / len(letras)) >= 0.85


def _es_narrable(titulo: str) -> bool:
    return not bool(NO_NARRABLE_RE.match(titulo.strip()))


def _palabras_a_num_str(pal: str) -> str:
    k = _norm_sin_tilde(pal.strip())
    if k in _NUM_PALABRA_A_INT:
        return str(_NUM_PALABRA_A_INT[k])
    return k


# ============================================================================
# EXTRACTOR DE TÍTULOS PARA EDUCACIÓN EN SALUD (EdS, 5 PARTES)
# ============================================================================


def _extraer_titulos_eds_parte3(texto: str) -> list[dict[str, Any]]:
    """Extrae jerarquía (niveles 1/2/3) de EdS_Parte3_1, 3_2 y 3_3 ignorando bloques Contenido:."""
    lineas = texto.splitlines()
    titulos: list[dict[str, Any]] = []
    palabras_acum = 0
    en_contenido = False
    vistos_contenido: set[str] = set()
    ultimo_l1_num: str | None = None
    l1_sin_hijos_aun = False

    for raw in lineas:
        s = raw.strip()
        n_pal = len(norm(s))
        if not s:
            continue

        if re.fullmatch(r"contenido\s*:?", s, re.IGNORECASE):
            en_contenido = True
            vistos_contenido = set()
            palabras_acum += n_pal
            continue

        m_sub = _EDS_SUBTITULO_PUNTO_RE.match(s)
        if m_sub and len(s.split()) <= 18 and not s.endswith((".", ";", ",", ":")):
            tit_txt = m_sub.group("tit").strip()
            if tit_txt and tit_txt[0].isupper():
                n1 = _palabras_a_num_str(m_sub.group("n1"))
                n2 = _palabras_a_num_str(m_sub.group("n2"))
                n3 = _palabras_a_num_str(m_sub.group("n3")) if m_sub.group("n3") else None
                numero = f"{n1}.{n2}.{n3}" if n3 is not None else f"{n1}.{n2}"
                nivel = 3 if n3 is not None else 2

                if en_contenido:
                    if numero in vistos_contenido:
                        en_contenido = False
                    else:
                        vistos_contenido.add(numero)
                        palabras_acum += n_pal
                        continue

                titulos.append(
                    {
                        "nivel": nivel,
                        "numero": numero,
                        "titulo": tit_txt,
                        "palabra": palabras_acum,
                        "narrable": _es_narrable(tit_txt),
                    }
                )
                l1_sin_hijos_aun = False
                palabras_acum += n_pal
                continue

        # Encabezado de unidad nivel 1: «uno CONCEPTOS...» o «seis. TABULACIÓN...»
        m_u = _EDS_UNIDAD_P3_RE.match(s)
        if m_u and len(s.split()) <= 16 and _es_mayusculas_encabezado(m_u.group("tit")):
            n1 = _palabras_a_num_str(m_u.group("n1"))
            tit_txt = m_u.group("tit").strip()
            if en_contenido:
                en_contenido = False
                # Repetición inmediata del título de unidad tras «Contenido:» -> no duplicar
                if ultimo_l1_num == n1 and l1_sin_hijos_aun:
                    palabras_acum += n_pal
                    continue
            if ultimo_l1_num == n1 and l1_sin_hijos_aun:
                palabras_acum += n_pal
                continue
            titulos.append(
                {
                    "nivel": 1,
                    "numero": n1,
                    "titulo": tit_txt,
                    "palabra": palabras_acum,
                    "narrable": _es_narrable(tit_txt),
                }
            )
            ultimo_l1_num = n1
            l1_sin_hijos_aun = True
            palabras_acum += n_pal
            continue

        if re.fullmatch(r"introducci[oó]n", s, re.IGNORECASE):
            en_contenido = False
            titulos.append(
                {
                    "nivel": 1,
                    "numero": "",
                    "titulo": s,
                    "palabra": palabras_acum,
                    "narrable": True,
                }
            )
            ultimo_l1_num = None
            l1_sin_hijos_aun = False
            palabras_acum += n_pal
            continue

        # Cualquier párrafo narrativo cierra el bloque Contenido:
        if en_contenido:
            en_contenido = False

        palabras_acum += n_pal

    return titulos


def _siguiente_no_vacia(lineas: list[str], idx: int) -> str:
    for j in range(idx + 1, len(lineas)):
        t = lineas[j].strip()
        if t:
            return t
    return ""


def _anterior_no_vacia(lineas: list[str], idx: int) -> str:
    for j in range(idx - 1, -1, -1):
        t = lineas[j].strip()
        if t:
            return t
    return ""


def _parece_narrativo(linea: str) -> bool:
    """True si la línea parece abrir prosa narrativa (y no otro ítem suelto de lista)."""
    if not linea:
        return False
    if linea.startswith("-"):
        return False
    palabras = linea.split()
    if len(palabras) >= 11:
        return True
    if linea.endswith((".", ";", "?", "!")):
        return True
    if ":" in linea and len(palabras) >= 5:
        return True
    return False


def _extraer_titulos_eds_parte12(texto: str) -> list[dict[str, Any]]:
    """Extrae títulos nivel 1 y 2 en EdS_Parte1 y EdS_Parte2 (líneas propias sin punto final)."""
    lineas = texto.splitlines()
    titulos: list[dict[str, Any]] = []
    palabras_acum = 0
    indices_titulo: set[int] = set()
    en_objetivos = False

    for idx, raw in enumerate(lineas):
        s = raw.strip()
        n_pal = len(norm(s))
        if not s:
            continue

        if re.fullmatch(r"objetivos\s*:?", s, re.IGNORECASE):
            en_objetivos = True
            palabras_acum += n_pal
            continue

        if en_objetivos:
            if s.startswith("-") or re.match(rf"^(?:{_PAL_NUM_PAT})\.?\s+", s, re.IGNORECASE):
                palabras_acum += n_pal
                continue
            if len(s.split()) > 15 or s.endswith("."):
                palabras_acum += n_pal
                continue
            en_objetivos = False

        palabras_s = s.split()
        sig = _siguiente_no_vacia(lineas, idx)
        prev_idx = next((j for j in range(idx - 1, -1, -1) if lineas[j].strip()), None)
        prev = lineas[prev_idx].strip() if prev_idx is not None else ""
        prev_fue_titulo = prev_idx in indices_titulo if prev_idx is not None else False

        # Descartar líneas que claramente no son títulos
        if (
            len(palabras_s) > 15
            or s.startswith(("-", "¿", "¡"))
            or s.endswith((".", ";", ",", ":"))
            or _EDS_EXCLUIR_LINEA_RE.match(s)
        ):
            palabras_acum += n_pal
            continue

        # Descartar continuaciones de párrafo envuelto (línea anterior sin cierre de oración)
        if prev and not prev_fue_titulo and not prev.endswith((".", "?", "!", ":", ";")):
            palabras_acum += n_pal
            continue

        # Nivel 1: Parte uno / Capítulo N / Introducción / encabezados en MAYÚSCULAS
        if _EDS_PARTE_TITULO_RE.match(s) or _es_mayusculas_encabezado(s):
            # Evitar marcar líneas sueltas de lista corta en mayúsculas sin desarrollo
            if not sig:
                palabras_acum += n_pal
                continue
            titulos.append(
                {
                    "nivel": 1,
                    "numero": "",
                    "titulo": s,
                    "palabra": palabras_acum,
                    "narrable": _es_narrable(s),
                }
            )
            indices_titulo.add(idx)
            palabras_acum += n_pal
            continue

        # Nivel 2: subtítulos numerados («uno. Visión biomédica...») seguidos de texto narrativo
        m_num = _EDS_NUM_LISTA_RE.match(s)
        if m_num:
            tit_txt = m_num.group("tit").strip()
            # Evitar ítems de lista con definición en la misma línea («uno. Acción: ...») o lista seguida de otro ítem
            if ":" not in tit_txt and _parece_narrativo(sig) and not _EDS_NUM_LISTA_RE.match(sig):
                titulos.append(
                    {
                        "nivel": 2,
                        "numero": _palabras_a_num_str(m_num.group("n1")),
                        "titulo": tit_txt,
                        "palabra": palabras_acum,
                        "narrable": _es_narrable(tit_txt),
                    }
                )
                indices_titulo.add(idx)
            palabras_acum += n_pal
            continue

        # Nivel 2: encabezado en mayúscula inicial seguido de narrativa o subtema numerado
        if (
            s[0].isupper()
            and ":" not in s
            and not prev.endswith(":")
            and (_parece_narrativo(sig) or bool(_EDS_NUM_LISTA_RE.match(sig)))
        ):
            # Evitar falsos positivos de 1 sola palabra que sea ítem de lista
            if len(palabras_s) == 1 and len(s) < 6:
                palabras_acum += n_pal
                continue
            titulos.append(
                {
                    "nivel": 2,
                    "numero": "",
                    "titulo": s,
                    "palabra": palabras_acum,
                    "narrable": _es_narrable(s),
                }
            )
            indices_titulo.add(idx)

        palabras_acum += n_pal

    return titulos


def extraer_titulos_eds(nombre_parte: str, texto: str) -> dict[str, Any]:
    """Construye el mapa de títulos JSON para una parte de Educación en Salud (EdS)."""
    palabras_totales = len(norm(texto))
    es_parte3 = bool(re.search(r"parte3", nombre_parte, re.IGNORECASE))
    if es_parte3:
        titulos = _extraer_titulos_eds_parte3(texto)
    else:
        titulos = _extraer_titulos_eds_parte12(texto)

    # Título representativo del capítulo
    titulo_cap = nombre_parte
    if titulos:
        primero = titulos[0]["titulo"]
        if primero.lower() == "parte uno" and len(titulos) > 1:
            titulo_cap = titulos[1]["titulo"]
        elif primero.lower() == "introducción" and len(titulos) > 1:
            titulo_cap = titulos[1]["titulo"]
        else:
            titulo_cap = primero

    return {
        "capitulo": nombre_parte,
        "libro": "EdS",
        "titulo_capitulo": titulo_cap,
        "palabras_texto": palabras_totales,
        "titulos": titulos,
    }


# ============================================================================
# EXTRACTOR DE TÍTULOS PARA SALADIN (20 CAPÍTULOS PSA 2027)
# ============================================================================

_SALADIN_CAP_RE = re.compile(r"^Cap[ií]tulo\s+(\d+)\s*$", re.IGNORECASE)
_SALADIN_SEC_RE = re.compile(r"^(\d+)\.(\d+)\s*(.*)$")
_SALADIN_PAGINA_SEP_RE = re.compile(r"^={3,}\s*P[ÁA]GINA\s+\d+\s*={3,}$", re.IGNORECASE)
_SALADIN_PARTE_HEADER_RE = re.compile(
    r"^(?:PARTE\s+(?:UNO|DOS|TRES|CUATRO|CINCO)|"
    r"ORGANIZACI[ÓO]N\s+CORPORAL|SOPORTE\s+Y\s+MOVIMIENTO|"
    r"INTEGRACI[ÓO]N\s+Y\s+CONTROL|REGULACI[ÓO]N\s+Y\s+MANTENIMIENTO|"
    r"REPRODUCCI[ÓO]N\s+Y\s+DESARROLLO|xx[iv]+)$",
    re.IGNORECASE,
)


def _quitar_num_pagina_final(texto: str) -> tuple[str, bool]:
    """Si el texto termina en número de página, lo quita y devuelve (limpio, tenia_pagina)."""
    m = re.search(r"\s+(\d{1,4})\s*$", texto)
    if m:
        return texto[: m.start()].strip(), True
    return texto.strip(), False


def extraer_indice_saladin(texto_pdf: str) -> dict[int, dict[str, Any]]:
    """Extrae capítulos y secciones N.M desde la tabla 'Contenido' (págs. xxi-xxiv) de Saladin."""
    lineas = texto_pdf.splitlines()
    inicio = 0
    for i, raw in enumerate(lineas):
        if raw.strip() == "Contenido":
            inicio = i + 1
            break

    caps: dict[int, dict[str, Any]] = {}
    cap_actual: int | None = None
    esperando_titulo_cap = False
    buf_titulo_cap: list[str] = []
    sec_abierta: dict[str, Any] | None = None
    buf_sec: list[str] = []

    def _cerrar_sec() -> None:
        nonlocal sec_abierta, buf_sec
        if sec_abierta is not None and cap_actual is not None:
            unido = _unir_lineas_pdf(buf_sec)
            tit, _ = _quitar_num_pagina_final(unido)
            if tit:
                sec_abierta["titulo"] = tit
                sec_abierta["narrable"] = _es_narrable(tit)
                caps[cap_actual]["titulos"].append(sec_abierta)
        sec_abierta = None
        buf_sec = []

    for raw in lineas[inicio:]:
        s = raw.strip()
        if not s or _SALADIN_PAGINA_SEP_RE.match(s) or _SALADIN_PARTE_HEADER_RE.match(s):
            continue
        if re.match(r"^(?:Ap[eé]ndice\s+A|Carta\s+a\s+los\s+estudiantes)\b", s, re.IGNORECASE):
            _cerrar_sec()
            break
        if re.match(r"^Atlas\s+[AB]\b", s, re.IGNORECASE):
            _cerrar_sec()
            cap_actual = None
            esperando_titulo_cap = False
            buf_titulo_cap = []
            continue

        m_cap = _SALADIN_CAP_RE.match(s)
        if m_cap:
            _cerrar_sec()
            cap_actual = int(m_cap.group(1))
            caps[cap_actual] = {"titulo_capitulo": f"Capítulo {cap_actual}", "titulos": []}
            esperando_titulo_cap = True
            buf_titulo_cap = []
            continue

        if cap_actual is None:
            continue

        if esperando_titulo_cap:
            buf_titulo_cap.append(s)
            limpio, tenia_pag = _quitar_num_pagina_final(_unir_lineas_pdf(buf_titulo_cap))
            if tenia_pag:
                caps[cap_actual]["titulo_capitulo"] = limpio
                esperando_titulo_cap = False
                buf_titulo_cap = []
            continue

        # Sección N.M
        m_sec = _SALADIN_SEC_RE.match(s)
        if m_sec and int(m_sec.group(1)) == cap_actual:
            _cerrar_sec()
            numero = f"{m_sec.group(1)}.{m_sec.group(2)}"
            resto = m_sec.group(3).strip()
            sec_abierta = {"nivel": 1, "numero": numero, "titulo": "", "narrable": True}
            buf_sec = [resto] if resto else []
            if resto:
                _, tenia_pag = _quitar_num_pagina_final(resto)
                if tenia_pag:
                    _cerrar_sec()
            continue

        # Secciones finales no narrables (Temas de conexión / Guía de estudio)
        if re.match(r"^(?:Temas\s+de\s+conexi[oó]n|Gu[ií]a\s+de\s+estudio)\b", s, re.IGNORECASE):
            _cerrar_sec()
            tit, _ = _quitar_num_pagina_final(_limpiar_ligaduras_pdf(s))
            caps[cap_actual]["titulos"].append(
                {"nivel": 1, "numero": "", "titulo": tit, "narrable": False}
            )
            continue

        if sec_abierta is not None:
            buf_sec.append(s)
            _, tenia_pag = _quitar_num_pagina_final(s)
            if tenia_pag:
                _cerrar_sec()

    _cerrar_sec()
    return caps


def extraer_esquemas_saladin(texto_pdf: str) -> dict[int, list[dict[str, Any]]]:
    """Extrae secciones nivel 1 (N.M) y subsecciones nivel 2 (• ...) desde cada ESQUEMA DEL CAPÍTULO."""
    lineas = texto_pdf.splitlines()
    # Saltar páginas preliminares (que incluyen un esquema de muestra del cap. 12 en pág. xv)
    inicio = 0
    for i, raw in enumerate(lineas):
        if re.fullmatch(r"Carta\s+a\s+los\s+estudiantes", raw.strip(), re.IGNORECASE):
            inicio = i + 1
            break

    esquemas: dict[int, list[dict[str, Any]]] = {}
    i = inicio
    n = len(lineas)
    while i < n:
        s = lineas[i].strip()
        es_esquema = False
        if re.fullmatch(r"ESQUEMA\s+DEL\s+CAP[ÍI]TULO", s, re.IGNORECASE):
            es_esquema = True
            i += 1
        elif re.fullmatch(r"ESQUEMA", s, re.IGNORECASE):
            j = i + 1
            while j < n and not lineas[j].strip():
                j += 1
            if j < n and re.fullmatch(r"DEL\s+CAP[ÍI]TULO", lineas[j].strip(), re.IGNORECASE):
                es_esquema = True
                i = j + 1

        if not es_esquema:
            i += 1
            continue

        # Parsear bloque de esquema hasta CONOCIMIENTO MÁS A FONDO o fin de página
        entradas: list[dict[str, Any]] = []
        cap_bloque: int | None = None
        abierta: dict[str, Any] | None = None
        buf: list[str] = []

        def _cerrar() -> None:
            nonlocal abierta, buf
            if abierta is not None:
                unido = _unir_lineas_pdf(buf)
                tit, _ = _quitar_num_pagina_final(unido)
                if tit:
                    abierta["titulo"] = tit
                    abierta["narrable"] = _es_narrable(tit)
                    entradas.append(abierta)
            abierta = None
            buf = []

        while i < n:
            ln = lineas[i].strip()
            if (
                _SALADIN_PAGINA_SEP_RE.match(ln)
                or re.match(r"^CONOCIMIENTO\b", ln, re.IGNORECASE)
                or re.match(r"^C\s*A\s*P\s*[ÍI]\s*T\s*U\s*L\s*O\b", ln, re.IGNORECASE)
            ):
                _cerrar()
                break
            if not ln:
                i += 1
                continue

            m_sec = _SALADIN_SEC_RE.match(ln)
            if m_sec:
                c_num = int(m_sec.group(1))
                if cap_bloque is None:
                    cap_bloque = c_num
                if c_num == cap_bloque:
                    _cerrar()
                    resto = m_sec.group(3).strip()
                    abierta = {
                        "nivel": 1,
                        "numero": f"{c_num}.{m_sec.group(2)}",
                        "titulo": "",
                        "narrable": True,
                    }
                    buf = [resto] if resto else []
                    if resto and _quitar_num_pagina_final(resto)[1]:
                        _cerrar()
                    i += 1
                    continue

            m_bul = re.match(r"^[•●]\s*(.+)$", ln)
            if m_bul:
                _cerrar()
                resto = m_bul.group(1).strip()
                abierta = {"nivel": 2, "numero": "", "titulo": "", "narrable": True}
                buf = [resto]
                if _quitar_num_pagina_final(resto)[1]:
                    _cerrar()
                i += 1
                continue

            if re.match(r"^(?:Temas\s+de\s+conexi[oó]n|Gu[ií]a\s+de\s+estudio)\b", ln, re.IGNORECASE):
                _cerrar()
                tit, _ = _quitar_num_pagina_final(_limpiar_ligaduras_pdf(ln))
                entradas.append({"nivel": 1, "numero": "", "titulo": tit, "narrable": False})
                i += 1
                continue

            if abierta is not None:
                buf.append(ln)
                if _quitar_num_pagina_final(ln)[1]:
                    _cerrar()
            i += 1

        _cerrar()
        if cap_bloque is not None and entradas:
            esquemas[cap_bloque] = entradas

    return esquemas


def _tokenizar_con_contexto_ext(
    texto: str,
) -> tuple[list[str], list[str], list[bool], list[bool], list[bool], list[bool]]:
    """Tokeniza preservando normalizado, crudo, inicio de línea, tras puntuación, fin con punt y fin con punt fuerte."""
    pal_norm: list[str] = []
    pal_raw: list[str] = []
    es_inicio_linea: list[bool] = []
    tras_puntuacion: list[bool] = []
    fin_con_punt: list[bool] = []
    fin_con_punt_fuerte: list[bool] = []

    for linea in texto.splitlines():
        primera_de_linea = True
        prev_termino_oracion = True
        for chunk in linea.split():
            # Extraer subtokens alfanuméricos de cada chunk respetando puntuación al borde
            subtokens = re.findall(r"[0-9A-Za-z\u00C0-\u024F]+", chunk)
            if not subtokens:
                if any(ch in ".?!" for ch in chunk):
                    prev_termino_oracion = True
                continue
            chunk_termina_punt = bool(re.search(r"[.,;?!:]+$", chunk))
            chunk_termina_punt_fuerte = bool(re.search(r"[.;?!:]+$", chunk))
            chunk_termina_oracion = bool(re.search(r"[.?!]+$", chunk))
            for k, sub in enumerate(subtokens):
                tok_n = _norm_sin_tilde(sub)
                if not tok_n:
                    continue
                pal_norm.append(tok_n)
                pal_raw.append(sub)
                es_inicio_linea.append(primera_de_linea and k == 0)
                tras_puntuacion.append((primera_de_linea or prev_termino_oracion) and k == 0)
                fin_con_punt.append(chunk_termina_punt and k == len(subtokens) - 1)
                fin_con_punt_fuerte.append(chunk_termina_punt_fuerte and k == len(subtokens) - 1)
                primera_de_linea = False
            prev_termino_oracion = chunk_termina_oracion

    return pal_norm, pal_raw, es_inicio_linea, tras_puntuacion, fin_con_punt, fin_con_punt_fuerte


def _tokenizar_con_contexto(texto: str) -> tuple[list[str], list[str], list[bool], list[bool], list[bool]]:
    """Tokeniza preservando normalizado, crudo, inicio de línea, tras puntuación fuerte y fin con puntuación."""
    pal_norm, pal_raw, es_inicio_linea, tras_puntuacion, fin_con_punt, _ = _tokenizar_con_contexto_ext(texto)
    return pal_norm, pal_raw, es_inicio_linea, tras_puntuacion, fin_con_punt


def _variantes_numero_hablado(numero: str) -> list[list[str]]:
    """Genera secuencias de tokens hablados para una sección 'N.M' (ej. 1.4 -> ['uno', 'punto', 'cuatro'])."""
    partes = numero.split(".")
    if len(partes) != 2 or not all(p.isdigit() for p in partes):
        return []
    n1, n2 = int(partes[0]), int(partes[1])
    p1_opts = _INT_A_PALABRAS_ES.get(n1, (str(n1),))
    p2_opts = _INT_A_PALABRAS_ES.get(n2, (str(n2),))
    variantes: list[list[str]] = []
    for a in p1_opts:
        for b in p2_opts:
            variantes.append([a, "punto", b])
            variantes.append([a, "coma", b])
    return variantes


def _buscar_subsecuencia(
    pal_norm: list[str],
    aguja: list[str],
    inicio: int,
    fin: int,
    *,
    solo_inicio_linea: list[bool] | None = None,
) -> int | None:
    m = len(aguja)
    if m == 0 or inicio >= fin:
        return None
    limite = min(fin, len(pal_norm)) - m + 1
    for i in range(inicio, limite):
        if solo_inicio_linea is not None and not solo_inicio_linea[i]:
            continue
        if pal_norm[i : i + m] == aguja:
            return i
    return None


def _buscar_nivel1_saladin(
    entry: dict[str, Any],
    pal_norm: list[str],
    es_inicio_linea: list[bool],
    desde: int,
) -> int | None:
    """Ubica una sección nivel 1 de Saladin en el texto TTS a partir de `desde`."""
    tit_toks = norm(entry["titulo"])
    numero = entry.get("numero", "")
    fin = len(pal_norm)

    if numero:
        variantes = _variantes_numero_hablado(numero)
        # 1. Número hablado + título completo al inicio de línea
        for pref in variantes:
            idx = _buscar_subsecuencia(
                pal_norm, pref + tit_toks, desde, fin, solo_inicio_linea=es_inicio_linea
            )
            if idx is not None:
                return idx
        # 2. Número hablado + primeras 2 palabras del título en cualquier posición
        if len(tit_toks) >= 2:
            for pref in variantes:
                idx = _buscar_subsecuencia(pal_norm, pref + tit_toks[:2], desde, fin)
                if idx is not None:
                    return idx
        # 3. Número hablado exacto al inicio de línea (cubre variantes de redacción entre Contenido y cuerpo)
        for pref in variantes:
            idx = _buscar_subsecuencia(
                pal_norm, pref, desde, fin, solo_inicio_linea=es_inicio_linea
            )
            if idx is not None:
                return idx

    # 4. Solo título sin número: primero al inicio de línea, luego en cualquier parte
    if tit_toks:
        idx = _buscar_subsecuencia(
            pal_norm, tit_toks, desde, fin, solo_inicio_linea=es_inicio_linea
        )
        if idx is not None:
            return idx
        if len(tit_toks) >= 2:
            idx = _buscar_subsecuencia(pal_norm, tit_toks, desde, fin)
            if idx is not None:
                return idx

    return None


def _buscar_nivel2_saladin(
    titulo: str,
    pal_norm: list[str],
    pal_raw: list[str],
    es_inicio_linea: list[bool],
    tras_puntuacion: list[bool],
    fin_con_punt: list[bool],
    inicio: int,
    fin: int,
) -> int | None:
    """Ubica una subsección nivel 2 de Saladin dentro de [inicio, fin) evitando menciones en prosa."""
    t = norm(titulo)
    m = len(t)
    if m == 0 or inicio >= fin:
        return None
    limite = min(fin, len(pal_norm)) - m + 1
    if limite <= inicio:
        return None

    # Tier 1: encabezado embebido o en línea propia (Mayúscula inicial, tras puntuación/salto,
    # sin puntuación final y seguido de inicio de oración con Mayúscula o salto de línea)
    for i in range(inicio, limite):
        if pal_norm[i : i + m] != t:
            continue
        if not pal_raw[i][0].isupper():
            continue
        if not (es_inicio_linea[i] or tras_puntuacion[i]):
            continue
        if fin_con_punt[i + m - 1]:
            continue
        sig_idx = i + m
        if sig_idx >= len(pal_norm) or es_inicio_linea[sig_idx] or pal_raw[sig_idx][0].isupper():
            return i

    # Tier 2: en línea propia con mayúscula inicial
    for i in range(inicio, limite):
        if es_inicio_linea[i] and pal_raw[i][0].isupper() and pal_norm[i : i + m] == t:
            return i

    # Tier 3: frase específica (>= 3 palabras) tras puntuación con mayúscula inicial
    if m >= 3:
        for i in range(inicio, limite):
            if tras_puntuacion[i] and pal_raw[i][0].isupper() and pal_norm[i : i + m] == t:
                return i

    # Tier 4: frase muy específica (>= 4 palabras) en cualquier posición de la sección
    if m >= 4:
        for i in range(inicio, limite):
            if pal_norm[i : i + m] == t:
                return i

    return None


def ubicar_titulos_saladin(
    entradas: list[dict[str, Any]],
    texto_tts: str,
) -> tuple[int, list[dict[str, Any]]]:
    """Ubica en dos pasadas los títulos nivel 1 y 2 de Saladin dentro del texto TTS."""
    pal_norm, pal_raw, es_inicio_linea, tras_puntuacion, fin_con_punt = _tokenizar_con_contexto(texto_tts)
    total_palabras = len(pal_norm)

    # Pasada 1: ubicar todas las entradas de nivel 1 de forma monotónica
    pos_l1 = 0
    posiciones: list[int | None] = [None] * len(entradas)
    indices_l1: list[int] = []
    for idx, ent in enumerate(entradas):
        if ent["nivel"] == 1:
            indices_l1.append(idx)
            p = _buscar_nivel1_saladin(ent, pal_norm, es_inicio_linea, pos_l1)
            posiciones[idx] = p
            if p is not None:
                pos_l1 = p + 1

    # Pasada 2: ubicar hijos nivel 2 estrictamente dentro de la ventana [inicio_L1, siguiente_L1)
    for k, idx_l1 in enumerate(indices_l1):
        inicio_ventana = posiciones[idx_l1]
        if inicio_ventana is None:
            continue
        # Buscar siguiente nivel 1 ubicado para cerrar la ventana
        fin_ventana = total_palabras
        for next_idx in indices_l1[k + 1 :]:
            if posiciones[next_idx] is not None:
                fin_ventana = posiciones[next_idx]  # type: ignore[assignment]
                break

        # Avanzar el cursor justo después del propio encabezado nivel 1
        cursor = inicio_ventana + max(1, len(norm(entradas[idx_l1]["titulo"])))
        idx_fin_hijos = indices_l1[k + 1] if k + 1 < len(indices_l1) else len(entradas)
        for j in range(idx_l1 + 1, idx_fin_hijos):
            ent_h = entradas[j]
            if ent_h["nivel"] <= 1:
                break
            p_h = _buscar_nivel2_saladin(
                ent_h["titulo"],
                pal_norm,
                pal_raw,
                es_inicio_linea,
                tras_puntuacion,
                fin_con_punt,
                cursor,
                fin_ventana,
            )
            posiciones[j] = p_h
            if p_h is not None:
                cursor = p_h + 1

    resultado: list[dict[str, Any]] = []
    for ent, pos in zip(entradas, posiciones):
        resultado.append(
            {
                "nivel": ent["nivel"],
                "numero": ent.get("numero", ""),
                "titulo": ent["titulo"],
                "palabra": pos,
                "narrable": bool(ent.get("narrable", _es_narrable(ent["titulo"]))),
            }
        )
    return total_palabras, resultado


def construir_mapa_saladin(
    cap_num: int,
    indice_contenido: dict[int, dict[str, Any]],
    esquemas_cuerpo: dict[int, list[dict[str, Any]]],
    texto_tts: str,
) -> dict[str, Any]:
    """Construye el mapa de títulos JSON de un capítulo de Saladin."""
    info_cont = indice_contenido.get(cap_num, {})
    titulo_cap = str(info_cont.get("titulo_capitulo") or f"Capítulo {cap_num}")

    entradas_esq = esquemas_cuerpo.get(cap_num, [])
    entradas_cont = list(info_cont.get("titulos") or [])

    # Preferir ESQUEMA DEL CAPÍTULO (trae nivel 1 y nivel 2); usar Contenido como respaldo
    l1_esq = sum(1 for e in entradas_esq if e["nivel"] == 1 and e.get("narrable", True))
    l1_cont = sum(1 for e in entradas_cont if e["nivel"] == 1 and e.get("narrable", True))
    entradas = entradas_esq if (entradas_esq and l1_esq >= max(1, l1_cont - 1)) else entradas_cont

    total_palabras, titulos = ubicar_titulos_saladin(entradas, texto_tts)
    return {
        "capitulo": f"Saladin_tema_{cap_num:02d}",
        "libro": "Saladin",
        "titulo_capitulo": titulo_cap,
        "palabras_texto": total_palabras,
        "titulos": titulos,
    }


# ============================================================================
# EXTRACTOR DE TÍTULOS PARA BIOLOGÍA CELULAR — CALVO (14 CAPÍTULOS PSA 2027)
# ============================================================================

_CALVO_PAGINA_SEP_RE = re.compile(r"^={3,}\s*P[ÁA]GINA\s+\d+\s*={3,}$", re.IGNORECASE)
_CALVO_TOC_CAP_RE = re.compile(r"^Cap[ií]tulo\s+(\d+)\s*:\s*(.+)$", re.IGNORECASE)
_CALVO_CUERPO_CAP_RE = re.compile(r"^CAP[ÍI]TULO\s+(\d+)\s*$", re.IGNORECASE)
_CALVO_FIGURA_RE = re.compile(r"^FIGURA\s+[A-Z]?\d+[-–]\d+\b", re.IGNORECASE)
_CALVO_TABLA_RE = re.compile(r"^Tabla\s+[A-Z]?\d+[-–]\d+\b", re.IGNORECASE)
_CALVO_CUADRO_RE = re.compile(r"^Cuadro\s+[A-Z]?\d+[-–]\d+\b", re.IGNORECASE)
_CALVO_FIN_CAP_RE = re.compile(
    r"^(?:lecturas\s+recomendadas|preguntas\s+de\s+autoevaluaci[oó]n|"
    r"autoevaluaci[oó]n|cuestiones|respuestas|bibliograf[ií]a)\b",
    re.IGNORECASE,
)
_CALVO_NO_SUBTITULO_RE = re.compile(
    r"^(?:FIGURA\b|Tabla\b|Cuadro\b|CAP[ÍI]TULO\b|Objetivos\s+de\s+aprendizaje\b|"
    r"Fuente\b|Tomado\s+de\b|Adaptado\s+de\b|Modificado\s+de\b|Ilustraci[oó]n|"
    r"Por\s+cortes[ií]a\b|Reproducid[oa]\b|Procedente\s+de\b|Imagen\s+procedente\b|"
    r"Nota\b|Respuesta\s+correcta\b|Table\s+of\s+Contents\b|[ÍI]ndice\b|"
    r"[•○\-–—]|\d+[.)]\s|[a-e][.)]\s)",
    re.IGNORECASE,
)
_CALVO_CREDITO_FIN_RE = re.compile(
    r"\((?:Ilustraci|Imagen|Procedente|Reproducid|Adaptado|Modificado|Por\s+cortes|Con\s+autoriz|A\s+y\s+B|B,|C,)[^)]*\)\s*$",
    re.IGNORECASE,
)
_CALVO_CONECTORES_ENVUELTA = frozenset({
    "de", "del", "la", "las", "los", "el", "en", "y", "o", "u", "a", "al", "con", "por", "para", "sobre",
})
_ROMANOS_SET = frozenset({"I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"})
_GRIEGAS_TTS: dict[str, str] = {
    "α": "alfa", "β": "beta", "γ": "gamma", "δ": "delta",
    "ε": "epsilon", "κ": "kappa", "λ": "lambda", "μ": "micro",
    "σ": "sigma", "τ": "tau", "ω": "omega", "ψ": "psi",
}
_SIGLAS_BIO_COMPUESTAS: dict[str, list[str]] = {
    "arnm": ["a", "r", "n", "mensajero"],
    "arnr": ["a", "r", "n", "ribosomico"],
    "arnt": ["a", "r", "n", "de", "transferencia"],
    "adnmt": ["a", "d", "n", "mitocondrial"],
}


def extraer_indice_calvo(texto_pdf: str) -> dict[int, dict[str, Any]]:
    """Extrae capítulos y títulos nivel 1 desde el índice inicial (Table of Contents) de Calvo."""
    caps: dict[int, dict[str, Any]] = {}
    cur_cap: int | None = None

    for raw in texto_pdf.splitlines():
        s = raw.strip()
        if not s or _CALVO_PAGINA_SEP_RE.match(s) or re.fullmatch(r"\d+", s):
            continue
        if s in ("Table of Contents", "Índice de capítulos"):
            continue
        if re.fullmatch(r"[ÍI]ndice\s+alfab[eé]tico", s, re.IGNORECASE):
            if caps:
                break
            continue

        m = _CALVO_TOC_CAP_RE.match(s)
        if m:
            cap_num = int(m.group(1))
            if cap_num in caps:
                break  # El índice se repite en "Índice de capítulos"
            caps[cap_num] = {
                "titulo_capitulo": _limpiar_ligaduras_pdf(m.group(2).strip()),
                "titulos": [],
            }
            cur_cap = cap_num
            continue

        if cur_cap is not None and len(s) > 3:
            caps[cur_cap]["titulos"].append(_limpiar_ligaduras_pdf(s))

    return caps


def extraer_cuerpos_calvo(texto_pdf: str) -> dict[int, list[str]]:
    """Extrae las líneas del cuerpo de cada capítulo en Calvo_texto_paginas.txt."""
    cuerpos: dict[int, list[str]] = {}
    cap_actual: int | None = None

    for raw in texto_pdf.splitlines():
        s = raw.strip()
        m_cap = _CALVO_CUERPO_CAP_RE.match(s)
        if m_cap:
            cap_actual = int(m_cap.group(1))
            cuerpos[cap_actual] = []
            continue
        if cap_actual is None:
            continue
        if re.fullmatch(r"[ÍI]ndice\s+alfab[eé]tico", s, re.IGNORECASE):
            cap_actual = None
            continue
        cuerpos[cap_actual].append(raw)

    return cuerpos


def _limpiar_lineas_cuerpo_calvo(lineas_cap: list[str]) -> list[str]:
    """Quita separadores de página y números de página sueltos conservando líneas en blanco."""
    limpias: list[str] = []
    tras_sep_pagina = False
    for raw in lineas_cap:
        s = raw.strip()
        if _CALVO_PAGINA_SEP_RE.match(s):
            tras_sep_pagina = True
            if limpias and limpias[-1] != "":
                limpias.append("")
            continue
        if not s:
            if limpias and limpias[-1] != "":
                limpias.append("")
            continue
        if tras_sep_pagina and re.fullmatch(r"\d{1,4}", s):
            tras_sep_pagina = False
            continue
        tras_sep_pagina = False
        limpias.append(_limpiar_ligaduras_pdf(s))
    return limpias


def _saltar_portada_capitulo_calvo(lineas: list[str], titulos_l1_norm: set[tuple[str, ...]]) -> int:
    """Devuelve el índice donde termina la portada del capítulo (título, autores y Objetivos de aprendizaje)."""
    n = len(lineas)
    idx_obj: int | None = None
    no_vacias_vistas = 0
    for i, s in enumerate(lineas):
        if not s:
            continue
        no_vacias_vistas += 1
        if re.fullmatch(r"objetivos\s+de\s+aprendizaje:?", s, re.IGNORECASE):
            idx_obj = i
            break
        if no_vacias_vistas > 35:
            break

    if idx_obj is None:
        return 0

    en_objetivos = True
    bullet_cerrado = True
    for i in range(idx_obj + 1, n):
        s = lineas[i]
        if not s:
            continue
        if tuple(norm(s)) in titulos_l1_norm:
            return i
        if s.startswith(("•", "○", "-")):
            bullet_cerrado = s.endswith(".")
            continue
        if en_objetivos and not bullet_cerrado:
            bullet_cerrado = s.endswith(".")
            continue
        return i
    return n


def _es_candidato_linea_subtitulo_calvo(
    s: str,
    tit_cap_norm: tuple[str, ...],
    titulos_l1_norm: set[tuple[str, ...]],
) -> bool:
    """Valida las propiedades sintácticas de una línea candidata a subtítulo nivel 2 en Calvo."""
    if not s or not s[0].isupper():
        return False
    if s.endswith((".", ",", ";", ":", "?", "!")):
        return False
    if len(s) < 3 or len(s) > 115:
        return False
    palabras = s.split()
    if len(palabras) < 1 or len(palabras) > 15:
        return False
    if _CALVO_NO_SUBTITULO_RE.match(s) or NO_NARRABLE_RE.match(s):
        return False
    if any(ch in s for ch in ("=", "→", ";")) or ". " in s:
        return False
    fin_prosa = {
        "de", "del", "la", "las", "los", "el", "en", "y", "o", "u", "a", "al",
        "con", "por", "para", "sobre", "que", "junto", "entre", "como", "su",
        "sus", "un", "una", "unos", "unas", "se", "es", "son", "fue", "han",
        "ha", "donde", "cuando", "cual", "cuyo", "cuya", "hacia", "desde",
        "hasta", "sin", "tras", "mediante", "durante",
    }
    if palabras[-1].lower().strip(",;:()") in fin_prosa:
        return False
    toks = tuple(norm(s))
    if not toks or toks == tit_cap_norm or toks in titulos_l1_norm:
        return False
    # Evitar encabezados repetidos con solo siglas/números muy cortos (p. ej. "A", "II")
    if len(palabras) == 1 and len(s) < 5 and s.isupper():
        return False
    return True


def _seguido_de_prosa_calvo(
    lineas: list[str],
    idx: int,
    tit_cap_norm: tuple[str, ...],
    titulos_l1_norm: set[tuple[str, ...]],
    *,
    permitir_anidado: bool = True,
) -> bool:
    """True si tras la línea idx aparece un párrafo narrativo real (o un sub-subtítulo seguido de prosa)."""
    n = len(lineas)
    j = idx + 1
    while j < n and not lineas[j]:
        j += 1
    if j >= n:
        return False

    primera = lineas[j]
    if not primera[0].isupper():
        return False
    if _CALVO_NO_SUBTITULO_RE.match(primera) or _CALVO_FIN_CAP_RE.match(primera):
        return False

    # Acumular bloque contiguo de líneas de párrafo (tolerando salto de página en blanco si el bloque recién abre)
    palabras_bloque = 0
    tiene_cierre_oracion = False
    lineas_contadas = 0
    k = j
    while k < n and lineas_contadas < 7:
        ln = lineas[k]
        if not ln:
            if palabras_bloque > 0 and tiene_cierre_oracion:
                break
            k += 1
            continue
        if _CALVO_FIGURA_RE.match(ln) or _CALVO_TABLA_RE.match(ln) or _CALVO_CUADRO_RE.match(ln):
            break
        if ln.startswith(("•", "○", "-")) or _CALVO_FIN_CAP_RE.match(ln):
            break
        if lineas_contadas > 0 and tuple(norm(ln)) in titulos_l1_norm:
            break
        palabras_bloque += len(ln.split())
        if any(ch in ln for ch in (".", "?", "!")):
            tiene_cierre_oracion = True
        lineas_contadas += 1
        if palabras_bloque >= 15 and tiene_cierre_oracion:
            return True
        k += 1

    if palabras_bloque >= 15 and tiene_cierre_oracion:
        return True

    # Permitir un encabezado anidado (p. ej. subtema seguido inmediatamente de sub-subtema + prosa)
    if permitir_anidado and _es_candidato_linea_subtitulo_calvo(primera, tit_cap_norm, titulos_l1_norm):
        return _seguido_de_prosa_calvo(
            lineas, j, tit_cap_norm, titulos_l1_norm, permitir_anidado=False
        )

    return False


def extraer_subtitulos_cuerpo_calvo(
    lineas_cap: list[str],
    titulos_l1: list[str],
    titulo_capitulo: str,
) -> list[dict[str, Any]]:
    """Combina los títulos nivel 1 del índice de Calvo con los subtítulos nivel 2 detectados en el cuerpo."""
    lineas_limpias = _limpiar_lineas_cuerpo_calvo(lineas_cap)
    tit_cap_norm = tuple(norm(titulo_capitulo))
    titulos_l1_norm = {tuple(norm(t)) for t in titulos_l1 if norm(t)}

    ini_cuerpo = _saltar_portada_capitulo_calvo(lineas_limpias, titulos_l1_norm)
    cuerpo: list[str] = []
    for ln in lineas_limpias[ini_cuerpo:]:
        if ln and _CALVO_FIN_CAP_RE.match(ln):
            break
        cuerpo.append(ln)

    # 1. Ubicar cada título nivel 1 narrable del índice en el cuerpo (tolera encabezados envueltos en 2 líneas)
    pos_l1: list[tuple[int, int] | None] = [None] * len(titulos_l1)
    cursor = 0
    n_cuerpo = len(cuerpo)
    for idx_t, t1 in enumerate(titulos_l1):
        if not _es_narrable(t1):
            continue
        objetivo = tuple(norm(t1))
        if not objetivo:
            continue
        encontrado: tuple[int, int] | None = None
        for i in range(cursor, n_cuerpo):
            s = cuerpo[i]
            if not s:
                continue
            if tuple(norm(s)) == objetivo:
                encontrado = (i, 1)
                break
            if i + 1 < n_cuerpo and cuerpo[i + 1]:
                unido = _unir_lineas_pdf([s, cuerpo[i + 1]])
                if tuple(norm(unido)) == objetivo:
                    encontrado = (i, 2)
                    break
        pos_l1[idx_t] = encontrado
        if encontrado is not None:
            cursor = encontrado[0] + encontrado[1]

    # 2. Entre cada nivel 1 ubicado y el siguiente nivel 1 ubicado, detectar subtítulos nivel 2 genuinos
    ubicados_l1 = [(idx_t, p[0], p[1]) for idx_t, p in enumerate(pos_l1) if p is not None]
    rango_l1: dict[int, tuple[int, int]] = {}
    for k, (idx_t, ini_ln, span) in enumerate(ubicados_l1):
        fin_ln = ubicados_l1[k + 1][1] if k + 1 < len(ubicados_l1) else n_cuerpo
        rango_l1[idx_t] = (ini_ln + span, fin_ln)

    entradas: list[dict[str, Any]] = []
    for idx_t, t1 in enumerate(titulos_l1):
        es_narr = _es_narrable(t1)
        entradas.append({"nivel": 1, "numero": "", "titulo": t1, "narrable": es_narr})
        if not es_narr or idx_t not in rango_l1:
            continue

        seg_ini, seg_fin = rango_l1[idx_t]
        en_figura = False
        en_tabla = False
        en_cuadro = False
        prev_line = ""
        prev_fue_titulo = True
        hubo_blanco = True
        vistos_sec: set[tuple[str, ...]] = set()

        i = seg_ini
        while i < seg_fin:
            s = cuerpo[i]
            if not s:
                en_figura = False
                en_tabla = False
                en_cuadro = False
                hubo_blanco = True
                i += 1
                continue

            if _CALVO_FIGURA_RE.match(s):
                en_figura = not (s.endswith(")") and bool(_CALVO_CREDITO_FIN_RE.search(s)))
                if len(s) < 95 and s.endswith((".", ")")):
                    en_figura = False
                prev_line = s
                prev_fue_titulo = False
                hubo_blanco = False
                i += 1
                continue

            if en_figura:
                # Si la línea previa ya cerró oración/crédito y esta parece un subtítulo limpio, salir de figura
                if (
                    prev_line.endswith((".", ")"))
                    and _es_candidato_linea_subtitulo_calvo(s, tit_cap_norm, titulos_l1_norm)
                    and _seguido_de_prosa_calvo(cuerpo[:seg_fin], i, tit_cap_norm, titulos_l1_norm)
                ):
                    en_figura = False
                else:
                    if _CALVO_CREDITO_FIN_RE.search(s) or (len(s) < 95 and s.endswith((".", ")"))):
                        en_figura = False
                    prev_line = s
                    prev_fue_titulo = False
                    hubo_blanco = False
                    i += 1
                    continue

            if _CALVO_TABLA_RE.match(s):
                en_tabla = True
                prev_line = s
                prev_fue_titulo = False
                hubo_blanco = False
                i += 1
                continue

            if en_tabla:
                # Las líneas del título de la tabla continúan hasta la primera línea en blanco
                prev_line = s
                prev_fue_titulo = False
                hubo_blanco = False
                i += 1
                continue

            if _CALVO_CUADRO_RE.match(s):
                en_cuadro = True
                prev_line = s
                prev_fue_titulo = False
                hubo_blanco = False
                i += 1
                continue

            if en_cuadro:
                if s.startswith(("•", "○", "-")) or len(s) < 85:
                    prev_line = s
                    prev_fue_titulo = False
                    hubo_blanco = False
                    i += 1
                    continue
                en_cuadro = False

            # Posible subtítulo nivel 2 (1 línea o envuelto en 2 líneas si cierra con conector/guion)
            cand = s
            salto = 1
            if (
                i + 1 < seg_fin
                and cuerpo[i + 1]
                and s[0].isupper()
                and not s.endswith((".", ",", ";", ":", "?", "!"))
                and not cuerpo[i + 1].startswith(("•", "○", "-"))
                and not cuerpo[i + 1].endswith((".", ",", ";", ":", "?", "!"))
                and (
                    s.endswith("-")
                    or s.split()[-1].lower() in _CALVO_CONECTORES_ENVUELTA
                )
                and cuerpo[i + 1][0].islower()
            ):
                cand_2 = _unir_lineas_pdf([s, cuerpo[i + 1]])
                if _es_candidato_linea_subtitulo_calvo(cand_2, tit_cap_norm, titulos_l1_norm):
                    cand = cand_2
                    salto = 2

            borde_previo_ok = (
                hubo_blanco
                or prev_fue_titulo
                or not prev_line
                or prev_line.endswith((".", "?", "!", ")", "»", "”"))
            ) and not prev_line.endswith(":")

            if (
                borde_previo_ok
                and _es_candidato_linea_subtitulo_calvo(cand, tit_cap_norm, titulos_l1_norm)
                and _seguido_de_prosa_calvo(
                    cuerpo[:seg_fin], i + salto - 1, tit_cap_norm, titulos_l1_norm
                )
            ):
                clave_n = tuple(norm(cand))
                if clave_n not in vistos_sec:
                    vistos_sec.add(clave_n)
                    entradas.append({"nivel": 2, "numero": "", "titulo": cand, "narrable": True})
                prev_line = cand
                prev_fue_titulo = True
                hubo_blanco = False
                i += salto
                continue

            prev_line = s
            prev_fue_titulo = False
            hubo_blanco = False
            i += 1

    return entradas


def _expandir_tokens_tts_calvo(titulo: str) -> list[str]:
    """Convierte un título del PDF de Calvo a la forma fonética usada en *_LITERAL_TTS.md."""
    texto = titulo
    for griega, nombre in _GRIEGAS_TTS.items():
        texto = texto.replace(griega, f" {nombre} ")
    out: list[str] = []
    for sub in re.findall(r"[0-9A-Za-z\u00C0-\u024F]+", texto):
        low = _norm_sin_tilde(sub)
        if not low:
            continue
        if low in _SIGLAS_BIO_COMPUESTAS:
            out.extend(_SIGLAS_BIO_COMPUESTAS[low])
        elif sub.isdigit() and int(sub) in _INT_A_PALABRAS_ES:
            out.append(_INT_A_PALABRAS_ES[int(sub)][0])
        elif (
            sub.isascii()
            and sub.isalpha()
            and sub.isupper()
            and 2 <= len(sub) <= 4
            and sub not in _ROMANOS_SET
        ):
            out.extend(list(low))
        else:
            out.append(low)
    return out


def _variantes_tokens_calvo(titulo: str) -> list[list[str]]:
    """Genera variantes ordenadas de tokens para ubicar un título de Calvo en el texto TTS."""
    variantes: list[list[str]] = []
    vistas: set[tuple[str, ...]] = set()

    def _agregar(toks: list[str]) -> None:
        if toks:
            clave = tuple(toks)
            if clave not in vistas:
                vistas.add(clave)
                variantes.append(toks)

    _agregar(norm(titulo))
    _agregar(_expandir_tokens_tts_calvo(titulo))
    sin_par = re.sub(r"\s*\([^)]*\)\s*", " ", titulo).strip()
    if sin_par and sin_par != titulo:
        _agregar(norm(sin_par))
        _agregar(_expandir_tokens_tts_calvo(sin_par))

    return variantes


def _inicio_cuerpo_tts_calvo(texto_tts: str) -> int:
    """Calcula el índice de palabra tras 'Objetivos de aprendizaje' para no casar menciones de portada."""
    cabecera = texto_tts[:4000]
    m_obj = re.search(r"Objetivos\s+de\s+aprendizaje\b", cabecera, re.IGNORECASE)
    if not m_obj:
        return 0
    sub = cabecera[m_obj.end() :]
    pos_ultimo_bullet = sub.rfind("•")
    if pos_ultimo_bullet == -1:
        return len(norm(cabecera[: m_obj.end()]))
    # El último objetivo cierra en el primer punto seguido de espacio o salto de línea
    m_fin = re.search(r"\.(?:\s|$)", sub[pos_ultimo_bullet:])
    if not m_fin:
        return len(norm(cabecera[: m_obj.end() + pos_ultimo_bullet]))
    corte_char = m_obj.end() + pos_ultimo_bullet + m_fin.end()
    return len(norm(texto_tts[:corte_char]))


def _buscar_encabezado_calvo(
    titulo: str,
    pal_norm: list[str],
    pal_raw: list[str],
    es_inicio_linea: list[bool],
    tras_puntuacion: list[bool],
    fin_con_punt: list[bool],
    fin_con_punt_fuerte: list[bool],
    inicio: int,
    fin: int,
) -> int | None:
    """Ubica un encabezado nivel 1 o 2 de Calvo en [inicio, fin) evitando menciones en prosa."""
    if inicio >= fin:
        return None
    variantes = _variantes_tokens_calvo(titulo)
    if not variantes:
        return None
    # Si el título original cierra con paréntesis (p. ej. '(MEC)'), el adaptador TTS deja coma final
    fin_punt = fin_con_punt_fuerte if titulo.rstrip().endswith(")") else fin_con_punt

    # Tier 1: encabezado embebido o en línea propia (Mayúscula inicial, tras puntuación/salto,
    # sin puntuación final y seguido de inicio de oración con Mayúscula o salto de línea)
    for t in variantes:
        m = len(t)
        limite = min(fin, len(pal_norm)) - m + 1
        for i in range(inicio, limite):
            if pal_norm[i : i + m] != t:
                continue
            if not pal_raw[i][0].isupper():
                continue
            if not (i == inicio or es_inicio_linea[i] or tras_puntuacion[i]):
                continue
            if fin_punt[i + m - 1]:
                continue
            sig_idx = i + m
            if sig_idx >= len(pal_norm) or es_inicio_linea[sig_idx] or pal_raw[sig_idx][0].isupper():
                return i

    # Tier 2: en línea propia con mayúscula inicial
    for t in variantes:
        m = len(t)
        limite = min(fin, len(pal_norm)) - m + 1
        for i in range(inicio, limite):
            if es_inicio_linea[i] and pal_raw[i][0].isupper() and pal_norm[i : i + m] == t:
                return i

    # Tier 3: frase específica (>= 3 palabras) tras puntuación con mayúscula inicial
    for t in variantes:
        m = len(t)
        if m < 3:
            continue
        limite = min(fin, len(pal_norm)) - m + 1
        for i in range(inicio, limite):
            if tras_puntuacion[i] and pal_raw[i][0].isupper() and pal_norm[i : i + m] == t:
                return i

    # Tier 4: frase muy específica (>= 4 palabras) en cualquier posición de la ventana
    for t in variantes:
        m = len(t)
        if m < 4:
            continue
        limite = min(fin, len(pal_norm)) - m + 1
        for i in range(inicio, limite):
            if pal_norm[i : i + m] == t:
                return i

    return None


def ubicar_titulos_calvo(
    entradas: list[dict[str, Any]],
    texto_tts: str,
) -> tuple[int, list[dict[str, Any]]]:
    """Ubica en dos pasadas los títulos nivel 1 y subtítulos nivel 2 de Calvo dentro del texto TTS."""
    (
        pal_norm,
        pal_raw,
        es_inicio_linea,
        tras_puntuacion,
        fin_con_punt,
        fin_con_punt_fuerte,
    ) = _tokenizar_con_contexto_ext(texto_tts)
    total_palabras = len(pal_norm)
    inicio_cuerpo = _inicio_cuerpo_tts_calvo(texto_tts)

    # Pasada 1: ubicar todas las entradas nivel 1 de forma monotónica tras la portada/Objetivos
    pos_l1 = inicio_cuerpo
    posiciones: list[int | None] = [None] * len(entradas)
    indices_l1: list[int] = []
    for idx, ent in enumerate(entradas):
        if ent["nivel"] == 1:
            indices_l1.append(idx)
            p = _buscar_encabezado_calvo(
                ent["titulo"],
                pal_norm,
                pal_raw,
                es_inicio_linea,
                tras_puntuacion,
                fin_con_punt,
                fin_con_punt_fuerte,
                pos_l1,
                total_palabras,
            )
            posiciones[idx] = p
            if p is not None:
                pos_l1 = p + 1

    # Pasada 2: ubicar hijos nivel 2 estrictamente dentro de [inicio_L1, siguiente_L1)
    for k, idx_l1 in enumerate(indices_l1):
        inicio_ventana = posiciones[idx_l1]
        if inicio_ventana is None:
            continue
        fin_ventana = total_palabras
        for next_idx in indices_l1[k + 1 :]:
            if posiciones[next_idx] is not None:
                fin_ventana = posiciones[next_idx]  # type: ignore[assignment]
                break

        cursor = inicio_ventana + max(1, len(norm(entradas[idx_l1]["titulo"])))
        idx_fin_hijos = indices_l1[k + 1] if k + 1 < len(indices_l1) else len(entradas)
        for j in range(idx_l1 + 1, idx_fin_hijos):
            ent_h = entradas[j]
            if ent_h["nivel"] <= 1:
                break
            p_h = _buscar_encabezado_calvo(
                ent_h["titulo"],
                pal_norm,
                pal_raw,
                es_inicio_linea,
                tras_puntuacion,
                fin_con_punt,
                fin_con_punt_fuerte,
                cursor,
                fin_ventana,
            )
            posiciones[j] = p_h
            if p_h is not None:
                cursor = p_h + 1

    resultado: list[dict[str, Any]] = []
    for ent, pos in zip(entradas, posiciones):
        # Conservar todos los nivel 1 del índice; en nivel 2 conservar solo los ubicados en TTS
        if ent["nivel"] >= 2 and pos is None:
            continue
        resultado.append(
            {
                "nivel": ent["nivel"],
                "numero": ent.get("numero", ""),
                "titulo": ent["titulo"],
                "palabra": pos,
                "narrable": bool(ent.get("narrable", _es_narrable(ent["titulo"]))),
            }
        )
    return total_palabras, resultado


def construir_mapa_calvo(
    cap_num: int,
    indice_calvo: dict[int, dict[str, Any]],
    cuerpos_calvo: dict[int, list[str]],
    texto_tts: str,
) -> dict[str, Any]:
    """Construye el mapa de títulos JSON (nivel 1 + nivel 2) de un capítulo de Calvo."""
    info = indice_calvo.get(cap_num, {})
    titulo_cap = str(info.get("titulo_capitulo") or f"Capítulo {cap_num}")
    titulos_l1 = list(info.get("titulos") or [])
    lineas_cuerpo = cuerpos_calvo.get(cap_num, [])

    if lineas_cuerpo:
        entradas = extraer_subtitulos_cuerpo_calvo(lineas_cuerpo, titulos_l1, titulo_cap)
    else:
        entradas = [
            {"nivel": 1, "numero": "", "titulo": t, "narrable": _es_narrable(t)}
            for t in titulos_l1
        ]

    total_palabras, titulos = ubicar_titulos_calvo(entradas, texto_tts)
    return {
        "capitulo": f"Calvo_tema_{cap_num:02d}",
        "libro": "Calvo",
        "titulo_capitulo": titulo_cap,
        "palabras_texto": total_palabras,
        "titulos": titulos,
    }


# ============================================================================
# ORQUESTACIÓN Y CLI
# ============================================================================


def generar_mapas_psa(
    raiz: Path,
    dir_salida: Path = DIR_MAPAS_DEFECTO,
    *,
    seco: bool = False,
    libro: str = "todos",
) -> list[dict[str, Any]]:
    """Genera (o simula con seco=True) los mapas del PSA 2027 (5 EdS + 14 Calvo + 20 Saladin)."""
    libro_norm = libro.lower().strip()
    if libro_norm not in ("todos", "eds", "calvo", "saladin"):
        raise ValueError(f"Libro no reconocido: {libro!r}. Usa todos, eds, calvo o saladin.")

    dir_eds = raiz / "examenes pasados" / "MEDICINA" / "PSA_2027_FUENTES" / "audio_eds"
    dir_med = raiz / "examenes pasados" / "MEDICINA" / "LIBROS DE MEDICINA"
    ruta_calvo_pdf = dir_med / "libros_extraidos" / "Calvo_texto_paginas.txt"
    ruta_saladin_pdf = dir_med / "libros_extraidos" / "Saladin_texto_paginas.txt"
    dir_tts_verif = dir_med / "_TEXTO_LITERAL_VERIFICADO"

    mapas: list[dict[str, Any]] = []

    if not seco:
        dir_salida.mkdir(parents=True, exist_ok=True)

    # 1. EdS (5 partes)
    if libro_norm in ("todos", "eds"):
        for parte in EDS_PARTES:
            ruta_md = dir_eds / f"{parte}_LITERAL_TTS.md"
            if not ruta_md.is_file():
                raise FileNotFoundError(f"No se encontró el archivo de EdS: {ruta_md}")
            texto = ruta_md.read_text(encoding="utf-8")
            mapa = extraer_titulos_eds(parte, texto)
            mapas.append(mapa)
            if not seco:
                (dir_salida / f"{parte}.json").write_text(
                    json.dumps(mapa, ensure_ascii=False, indent=1) + "\n",
                    encoding="utf-8",
                )

    # 2. Calvo PSA 2027 (14 capítulos con nivel 1 + subtítulos nivel 2)
    if libro_norm in ("todos", "calvo"):
        if not ruta_calvo_pdf.is_file():
            raise FileNotFoundError(f"No se encontró Calvo_texto_paginas.txt: {ruta_calvo_pdf}")
        texto_calvo_pdf = ruta_calvo_pdf.read_text(encoding="utf-8")
        indice_calvo = extraer_indice_calvo(texto_calvo_pdf)
        cuerpos_calvo = extraer_cuerpos_calvo(texto_calvo_pdf)

        for cap in CALVO_PSA_CAPS:
            ruta_md = dir_tts_verif / f"Tema_{cap:02d}_Biologia_Celular_LITERAL_TTS.md"
            if not ruta_md.is_file():
                raise FileNotFoundError(f"No se encontró el TTS de Calvo cap. {cap:02d}: {ruta_md}")
            texto_tts = ruta_md.read_text(encoding="utf-8")
            mapa = construir_mapa_calvo(cap, indice_calvo, cuerpos_calvo, texto_tts)
            mapas.append(mapa)
            if not seco:
                (dir_salida / f"Calvo_tema_{cap:02d}.json").write_text(
                    json.dumps(mapa, ensure_ascii=False, indent=1) + "\n",
                    encoding="utf-8",
                )

    # 3. Saladin PSA 2027 (20 capítulos)
    if libro_norm in ("todos", "saladin"):
        if not ruta_saladin_pdf.is_file():
            raise FileNotFoundError(f"No se encontró Saladin_texto_paginas.txt: {ruta_saladin_pdf}")
        texto_pdf = ruta_saladin_pdf.read_text(encoding="utf-8")
        indice_cont = extraer_indice_saladin(texto_pdf)
        esquemas = extraer_esquemas_saladin(texto_pdf)

        for cap in SALADIN_PSA_CAPS:
            ruta_md = dir_tts_verif / f"Tema_{cap:02d}_Morfo_Saladin_LITERAL_TTS.md"
            if not ruta_md.is_file():
                raise FileNotFoundError(f"No se encontró el TTS de Saladin cap. {cap:02d}: {ruta_md}")
            texto_tts = ruta_md.read_text(encoding="utf-8")
            mapa = construir_mapa_saladin(cap, indice_cont, esquemas, texto_tts)
            mapas.append(mapa)
            if not seco:
                (dir_salida / f"Saladin_tema_{cap:02d}.json").write_text(
                    json.dumps(mapa, ensure_ascii=False, indent=1) + "\n",
                    encoding="utf-8",
                )

    return mapas


def imprimir_resumen(mapas: list[dict[str, Any]], *, seco: bool) -> None:
    modo = "SIMULACIÓN (--seco, sin escribir archivos)" if seco else "ESCRITO EN DISCO"
    print(f"Mapas de títulos PSA 2027 — {modo}")
    print(f"{'Capítulo':<18} {'Libro':<8} {'Títulos':>7} {'Narr.':>6} {'Ubic.':>6} {'Cob.%':>7} {'Palabras':>9}")
    print("-" * 68)
    tot_t = tot_n = tot_u = tot_p = 0
    for m in mapas:
        tits = m["titulos"]
        narr = [t for t in tits if t.get("narrable", True)]
        ubic = [t for t in narr if t.get("palabra") is not None]
        cob = (100.0 * len(ubic) / len(narr)) if narr else 0.0
        pal = int(m.get("palabras_texto") or 0)
        tot_t += len(tits)
        tot_n += len(narr)
        tot_u += len(ubic)
        tot_p += pal
        print(
            f"{m['capitulo']:<18} {m['libro']:<8} {len(tits):>7} "
            f"{len(narr):>6} {len(ubic):>6} {cob:>6.1f}% {pal:>9}"
        )
    print("-" * 68)
    cob_tot = (100.0 * tot_u / tot_n) if tot_n else 0.0
    print(
        f"{'TOTAL (' + str(len(mapas)) + ')':<18} {'':<8} {tot_t:>7} "
        f"{tot_n:>6} {tot_u:>6} {cob_tot:>6.1f}% {tot_p:>9}"
    )


def main(argv: list[str] | None = None) -> int:
    _configurar_stdout_utf8()
    parser = argparse.ArgumentParser(
        description="Genera los mapas de títulos JSON del PSA 2027 (5 EdS + 14 Calvo + 20 Saladin)."
    )
    parser.add_argument(
        "--libro",
        choices=("todos", "eds", "saladin", "calvo"),
        default="todos",
        help="Libro a procesar (por defecto: todos = 39 capítulos PSA 2027).",
    )
    parser.add_argument(
        "--seco",
        action="store_true",
        help="Ejecuta la extracción e imprime el resumen sin escribir archivos JSON.",
    )
    parser.add_argument(
        "--raiz",
        type=Path,
        default=DIR_SCRIPT.parents[1],
        help="Ruta raíz del repo (donde está 'examenes pasados/').",
    )
    parser.add_argument(
        "--salida",
        type=Path,
        default=DIR_MAPAS_DEFECTO,
        help="Carpeta destino para los JSON (por defecto docs/audio-bloques/mapa_titulos).",
    )
    args = parser.parse_args(argv)
    mapas = generar_mapas_psa(args.raiz, args.salida, seco=args.seco, libro=args.libro)
    imprimir_resumen(mapas, seco=args.seco)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
