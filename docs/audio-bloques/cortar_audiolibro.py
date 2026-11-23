# -*- coding: utf-8 -*-
"""Cortador automático por subtítulo para audiolibros de Medicina (Pasos 3 y 4 de PLAN_CORTE_POR_SUBTITULO.md).

Alinea las fronteras del plan de cortes contra timestamps palabra por palabra de Whisper (con caché),
corta cada parte con ffmpeg SIN desvanecido, añade silencio limpio de 1 s al final, normaliza a
-16 LUFS / -1.5 dBTP (EBU R128) y verifica el 100 % de las pistas generadas.

Nunca modifica _AUDIO_V2 ni AUDIOS_MEDICINA_UMSS; escribe siempre en una carpeta aparte.
"""

from __future__ import annotations

import argparse
import difflib
import json
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path
from typing import Any

DIR_SCRIPT = Path(__file__).resolve().parent
if str(DIR_SCRIPT) not in sys.path:
    sys.path.insert(0, str(DIR_SCRIPT))

import mapa_titulos_psa as mt  # noqa: E402
import proponer_cortes as pc  # noqa: E402
try:
    import aceptacion as ac  # noqa: E402
except Exception:
    ac = None  # type: ignore[assignment]

DIR_MAPAS_DEFECTO = DIR_SCRIPT / "mapa_titulos"
DIR_CORTES_DEFECTO = DIR_SCRIPT / "cortes_v2"
DIR_CACHE_WHISPER_DEFECTO = DIR_SCRIPT / "transcripciones_whisper"
RUTA_LOUDNESS_SKILL = Path(
    r"C:\Users\lmigu\SynologyDrive\12.NUBES\_AGENTES_CENTRAL\skills\ffmpeg-skill\scripts\loudness.py"
)

LUFS_OBJETIVO = -16.0
TP_OBJETIVO = -1.5
LRA_OBJETIVO = 11.0
BITRATE_MP3 = "128k"

PAD_FINAL_S = 1.0
AIRE_INICIAL_S = 0.25
UMBRAL_AIRE_INICIAL_S = 0.15
UMBRAL_HUECO_PAUSA_S = 0.08
VENTANA_PROPORCIONAL_FRAC = 0.12
UMBRAL_CONFIANZA_ALINEACION = 0.55
VENTANA_SILENCEDETECT_S = 1.5

MIN_DURACION_PARTE_S = 180.0   # 3 min
MAX_DURACION_PARTE_S = 1200.0  # 20 min
MAX_VOLUME_LIMITE_DB = -0.1
MEAN_VOLUME_MIN_DB = -35.0
MEAN_VOLUME_MAX_DB = -8.0
MAX_CAIDA_DESVANECIDO_DB = 6.0
MAX_SILENCIO_BORDE_S = 3.0
VENTANA_BORDE_WHISPER_S = 15.0
UMBRAL_TITULO_INICIO = 0.6

_NO_NARRABLE_CIERRE_RE = re.compile(
    r"(?:preguntas\s+de\s+autoevaluaci[oó]n|autoevaluaci[oó]n|bibliograf[ií]a|"
    r"lecturas\s+recomendadas|glosario|gu[ií]a\s+de\s+estudio|respuesta\s+correcta)\b",
    re.IGNORECASE,
)

_NUM_PREFIJO_RE = re.compile(r"^\d+(?:\.\d+)*\s+")


def _configurar_stdout_utf8() -> None:
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")


def norm_palabras(texto: str) -> list[str]:
    """Normaliza texto a lista de tokens alfanuméricos en minúsculas sin tildes."""
    s = unicodedata.normalize("NFD", texto.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9 ]+", " ", s).split()


def slug_corto(texto: str, max_len: int = 32) -> str:
    """Genera un slug ASCII corto y seguro para nombres de archivo MP3."""
    limpio = _NUM_PREFIJO_RE.sub("", texto.strip())
    tokens = norm_palabras(limpio)
    if not tokens:
        return "parte"
    partes: list[str] = []
    largo = 0
    for tok in tokens:
        extra = len(tok) + (1 if partes else 0)
        if largo + extra > max_len:
            if not partes:
                partes.append(tok[:max_len])
            break
        partes.append(tok)
        largo += extra
    return "_".join(partes) or "parte"


def formatear_mmss(segundos: float) -> str:
    """Formatea segundos como mm:ss (o h:mm:ss si supera 1 hora)."""
    seg_int = max(0, int(round(segundos)))
    h, resto = divmod(seg_int, 3600)
    m, s = divmod(resto, 60)
    if h > 0:
        return f"{h:d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def _verificar_salida_segura(dir_salida: Path) -> None:
    """Impide escribir dentro de _AUDIO_V2 o AUDIOS_MEDICINA_UMSS."""
    partes_lower = {p.lower() for p in dir_salida.resolve().parts}
    prohibidas = {"_audio_v2", "audios_medicina_umss", "_cache", "_cache_v2"}
    cruce = partes_lower & prohibidas
    if cruce:
        raise ValueError(
            f"Carpeta de salida prohibida ({', '.join(sorted(cruce))}): {dir_salida}. "
            "Los cortes deben ir siempre a una carpeta aparte."
        )


def resolver_rutas_capitulo(
    capitulo: str,
    raiz: Path,
    *,
    ruta_mapa: Path | None = None,
    ruta_texto: Path | None = None,
    ruta_audio: Path | None = None,
    dir_salida: Path | None = None,
) -> dict[str, Any]:
    """Resuelve libro, nombre de capítulo y rutas por defecto desde --capitulo y --raiz."""
    dir_med = raiz / "examenes pasados" / "MEDICINA" / "LIBROS DE MEDICINA"
    dir_eds = raiz / "examenes pasados" / "MEDICINA" / "PSA_2027_FUENTES" / "audio_eds"
    dir_tts = dir_med / "_TEXTO_LITERAL_VERIFICADO"
    dir_audio_v2 = dir_med / "_MOTOR_AUDIO" / "_AUDIO_V2"
    dir_mapas = raiz / "docs" / "audio-bloques" / "mapa_titulos"
    if not dir_mapas.is_dir():
        dir_mapas = DIR_MAPAS_DEFECTO

    cap = capitulo.strip()
    libro = "General"
    nombre_cap = cap
    mapa_def: Path | None = None
    texto_def: Path | None = None
    candidatos_audio: list[Path] = []

    m_calvo = re.fullmatch(r"(?:Calvo_tema_|Tema_)(\d{1,2})(?:_Biologia_Celular)?", cap, re.IGNORECASE)
    m_saladin = re.fullmatch(r"(?:Saladin_tema_|Tema_)(\d{1,2})_Morfo_Saladin|Saladin_tema_(\d{1,2})", cap, re.IGNORECASE)

    if cap.lower().startswith("eds_"):
        libro = "EdS"
        nombre_cap = cap
        mapa_def = dir_mapas / f"{cap}.json"
        texto_def = dir_eds / f"{cap}_LITERAL_TTS.md"
        for stem in (f"{cap}_LITERAL_TTS", cap):
            for ext in (".wav", ".mp3"):
                candidatos_audio.append(dir_audio_v2 / f"{stem}{ext}")
    elif m_saladin:
        num = int(m_saladin.group(1) or m_saladin.group(2))
        libro = "Saladin"
        nombre_cap = f"Tema_{num:02d}_Morfo_Saladin"
        mapa_def = dir_mapas / f"Saladin_tema_{num:02d}.json"
        texto_def = dir_tts / f"{nombre_cap}_LITERAL_TTS.md"
        for stem in (f"{nombre_cap}_LITERAL_TTS", nombre_cap):
            for ext in (".wav", ".mp3"):
                candidatos_audio.append(dir_audio_v2 / f"{stem}{ext}")
    elif m_calvo:
        num = int(m_calvo.group(1))
        libro = "Calvo"
        nombre_cap = f"Tema_{num:02d}_Biologia_Celular"
        mapa_def = dir_mapas / f"Calvo_tema_{num:02d}.json"
        texto_def = dir_tts / f"{nombre_cap}_LITERAL_TTS.md"
        for stem in (f"{nombre_cap}_LITERAL_TTS", nombre_cap):
            for ext in (".wav", ".mp3"):
                candidatos_audio.append(dir_audio_v2 / f"{stem}{ext}")
    else:
        mapa_def = dir_mapas / f"{cap}.json"
        texto_def = dir_tts / f"{cap}_LITERAL_TTS.md"
        for stem in (f"{cap}_LITERAL_TTS", cap):
            for ext in (".wav", ".mp3"):
                candidatos_audio.append(dir_audio_v2 / f"{stem}{ext}")

    audio_def = next((p for p in candidatos_audio if p.is_file()), candidatos_audio[0] if candidatos_audio else None)

    mapa_final = ruta_mapa or mapa_def
    texto_final = ruta_texto or texto_def
    audio_final = ruta_audio or audio_def

    if mapa_final is not None and mapa_final.is_file() and libro == "General":
        try:
            datos_m = json.loads(mapa_final.read_text(encoding="utf-8"))
            if datos_m.get("libro"):
                libro = str(datos_m["libro"])
        except Exception:
            pass

    if dir_salida is not None:
        salida_final = dir_salida
    else:
        base_cortes = raiz / "docs" / "audio-bloques" / "cortes_v2"
        salida_final = base_cortes / libro / nombre_cap

    return {
        "libro": libro,
        "capitulo": nombre_cap,
        "mapa": mapa_final,
        "texto": texto_final,
        "audio": audio_final,
        "salida": salida_final,
    }


# ============================================================================
# TRANSCRIPCIÓN WHISPER + CACHÉ
# ============================================================================


def normalizar_lista_palabras_whisper(datos: Any) -> list[dict[str, Any]]:
    """Convierte distintos formatos JSON de transcripción a lista estándar [{word, start, end}]."""
    raw_items: list[dict[str, Any]] = []
    if isinstance(datos, list):
        raw_items = [x for x in datos if isinstance(x, dict)]
    elif isinstance(datos, dict):
        if isinstance(datos.get("palabras"), list):
            raw_items = [x for x in datos["palabras"] if isinstance(x, dict)]
        elif isinstance(datos.get("words"), list):
            raw_items = [x for x in datos["words"] if isinstance(x, dict)]
        elif isinstance(datos.get("segments"), list):
            for seg in datos["segments"]:
                if isinstance(seg, dict) and isinstance(seg.get("words"), list):
                    raw_items.extend(x for x in seg["words"] if isinstance(x, dict))

    palabras: list[dict[str, Any]] = []
    for item in raw_items:
        w = str(item.get("word") or item.get("palabra") or item.get("text") or "").strip()
        if not w:
            continue
        start = float(item.get("start", 0.0))
        end = float(item.get("end", start))
        if end < start:
            end = start
        palabras.append({"word": w, "start": round(start, 4), "end": round(end, 4)})
    palabras.sort(key=lambda x: (x["start"], x["end"]))
    return palabras


def cargar_o_transcribir_whisper(
    ruta_audio: Path | None,
    *,
    ruta_transcripcion: Path | None = None,
    dir_cache: Path = DIR_CACHE_WHISPER_DEFECTO,
    modelo: str = "small",
    dispositivo: str = "cpu",
    compute_type: str = "int8",
    modelo_whisper_inst: Any = None,
) -> tuple[list[dict[str, Any]], float | None, Any]:
    """Carga transcripción desde caché/archivo o transcribe con faster_whisper y guarda en caché."""
    if ruta_transcripcion is not None:
        if not ruta_transcripcion.is_file():
            raise FileNotFoundError(f"No se encontró la transcripción: {ruta_transcripcion}")
        data = json.loads(ruta_transcripcion.read_text(encoding="utf-8"))
        dur = float(data["duracion_s"]) if isinstance(data, dict) and data.get("duracion_s") else None
        return normalizar_lista_palabras_whisper(data), dur, modelo_whisper_inst

    if ruta_audio is None:
        raise ValueError("Debes indicar --audio o --transcripcion.")

    cache_path = dir_cache / f"{ruta_audio.stem}.json"
    if cache_path.is_file():
        data = json.loads(cache_path.read_text(encoding="utf-8"))
        dur = float(data["duracion_s"]) if isinstance(data, dict) and data.get("duracion_s") else None
        return normalizar_lista_palabras_whisper(data), dur, modelo_whisper_inst

    if not ruta_audio.is_file():
        raise FileNotFoundError(f"No se encontró el archivo de audio: {ruta_audio}")

    if modelo_whisper_inst is None:
        try:
            from faster_whisper import WhisperModel  # type: ignore
        except ImportError as exc:
            raise RuntimeError(
                "faster_whisper no está instalado y no existe caché de transcripción. "
                "Instala faster-whisper o pasa --transcripcion <json>."
            ) from exc
        modelo_whisper_inst = WhisperModel(modelo, device=dispositivo, compute_type=compute_type)

    segmentos, info = modelo_whisper_inst.transcribe(
        str(ruta_audio),
        language="es",
        word_timestamps=True,
    )
    palabras: list[dict[str, Any]] = []
    for seg in segmentos:
        for w in getattr(seg, "words", None) or []:
            txt = str(getattr(w, "word", "")).strip()
            if not txt:
                continue
            palabras.append(
                {
                    "word": txt,
                    "start": round(float(getattr(w, "start", 0.0)), 4),
                    "end": round(float(getattr(w, "end", 0.0)), 4),
                }
            )
    dur_s = float(getattr(info, "duration", 0.0) or 0.0)
    if dur_s <= 0.0 and palabras:
        dur_s = palabras[-1]["end"]

    dir_cache.mkdir(parents=True, exist_ok=True)
    payload = {
        "audio": ruta_audio.name,
        "duracion_s": round(dur_s, 3),
        "modelo": modelo,
        "idioma": "es",
        "palabras": palabras,
    }
    cache_path.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return palabras, dur_s, modelo_whisper_inst


# ============================================================================
# ALINEACIÓN TEXTO <-> TIMESTAMPS WHISPER
# ============================================================================


def _norm_whisper_tokens(texto: str) -> list[str]:
    """Normaliza cifras y secciones (1.8 <-> uno coma ocho, 4 <-> cuatro) usando aceptacion.py si existe."""
    if ac is not None and hasattr(ac, "_normalizar_para_whisper"):
        return list(ac._normalizar_para_whisper(texto))
    return norm_palabras(texto)


def _aplanar_tokens_whisper(palabras_whisper: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Aplana cada palabra de Whisper en tokens normalizados preservando sus timestamps."""
    flat: list[dict[str, Any]] = []
    for item in palabras_whisper:
        toks = _norm_whisper_tokens(item["word"])
        if not toks:
            continue
        s0 = float(item["start"])
        e0 = float(item["end"])
        for t in toks:
            flat.append({"tok": t, "raw": item["word"], "start": s0, "end": e0})
    return flat


def _numero_a_tokens_hablados(numero: str) -> list[str]:
    """Convierte '1.8' en tokens normalizados (compatibles con _norm_whisper_tokens)."""
    partes = [p for p in numero.split(".") if p.isdigit()]
    if not partes:
        return []
    out: list[str] = []
    for idx, p in enumerate(partes):
        n = int(p)
        pal = mt._INT_A_PALABRAS_ES.get(n, (str(n),))[0]
        if idx > 0:
            out.append("punto")
        out.append(pal)
    return _norm_whisper_tokens(" ".join(out))


def _construir_ancla_frontera(
    titulo_primero: str,
    inicio_palabra: int,
    palabras_texto_md: list[str],
) -> tuple[list[str], list[str]]:
    """Construye (tokens_titulo, tokens_ancla_completa) para localizar el inicio exacto de una parte."""
    m_num = _NUM_PREFIJO_RE.match(titulo_primero.strip())
    num_str = m_num.group(0).strip() if m_num else ""
    sin_num = titulo_primero[m_num.end() :].strip() if m_num else titulo_primero.strip()
    tit_toks_base = _norm_whisper_tokens(sin_num) or _norm_whisper_tokens(titulo_primero)

    num_hablados = _numero_a_tokens_hablados(num_str) if num_str else []
    tit_con_num = num_hablados + tit_toks_base

    # Tomar contexto real del .md en inicio_palabra (título + primeras ~10 palabras siguientes)
    n_md = len(palabras_texto_md)
    ini = max(0, min(inicio_palabra, n_md))
    ventana_raw = palabras_texto_md[ini : min(n_md, ini + 18)]
    ventana_md = _norm_whisper_tokens(" ".join(ventana_raw)) if ventana_raw else []

    if ventana_md:
        # Si el .md ya abre con el título (con o sin número hablado), usar ese arranque exacto
        if tit_con_num and ventana_md[: len(tit_con_num)] == tit_con_num:
            return tit_con_num, ventana_md[: max(len(tit_con_num) + 10, 14)]
        if tit_toks_base and ventana_md[: len(tit_toks_base)] == tit_toks_base:
            return tit_toks_base, ventana_md[: max(len(tit_toks_base) + 10, 14)]
        # Si el título aparece desplazado 1-4 tokens al inicio del slice, alinear a su inicio
        for off in range(1, min(5, len(ventana_md))):
            if tit_toks_base and ventana_md[off : off + len(tit_toks_base)] == tit_toks_base:
                recorte = ventana_md[off : off + len(tit_toks_base) + 10]
                return tit_toks_base, recorte
        ancla = (tit_con_num if num_hablados else tit_toks_base) + ventana_md[:10]
        return (tit_con_num if num_hablados else tit_toks_base), ancla[:16]

    return (tit_con_num if num_hablados else tit_toks_base), (tit_con_num if num_hablados else tit_toks_base)


def _puntuar_candidato(
    tit_toks: list[str],
    ancla: list[str],
    flat_toks: list[str],
    idx: int,
    t_idx: float,
    t_esperado: float,
    duracion_total_s: float,
) -> float:
    """Puntúa qué tan bien coincide el inicio del título + contexto narrativo en la posición idx de Whisper."""
    l_tit = max(1, len(tit_toks))
    l_anc = max(l_tit, len(ancla))
    slice_tit = flat_toks[idx : idx + l_tit + 1]
    slice_anc = flat_toks[idx : idx + l_anc + 2]

    sim_tit = difflib.SequenceMatcher(None, tit_toks, slice_tit[:l_tit]).ratio()
    sim_anc = difflib.SequenceMatcher(None, ancla, slice_anc).ratio()
    bonus_arranque = 0.10 if (tit_toks and idx < len(flat_toks) and flat_toks[idx] == tit_toks[0]) else 0.0
    score_directo = min(1.0, 0.35 * sim_tit + 0.55 * sim_anc + bonus_arranque)

    # Si Whisper omitió el título corto en la pasada larga, evaluar coincidencia directa con el cuerpo tras el título
    score_cuerpo = 0.0
    if len(ancla) >= l_tit + 4:
        cuerpo = ancla[l_tit:]
        slice_c = flat_toks[idx : idx + len(cuerpo) + 2]
        sim_c = difflib.SequenceMatcher(None, cuerpo, slice_c).ratio()
        if sim_c >= 0.70:
            score_cuerpo = 0.88 * sim_c

    penal_dist = 0.04 * abs(t_idx - t_esperado) / max(1.0, duracion_total_s)
    return max(score_directo, score_cuerpo) - penal_dist


def _buscar_mejor_indice_whisper(
    tit_toks: list[str],
    ancla: list[str],
    flat: list[dict[str, Any]],
    flat_toks: list[str],
    t_min: float,
    t_max: float,
    t_esperado: float,
    duracion_total_s: float,
    t_estricto_mayor_que: float,
) -> tuple[int | None, float]:
    """Busca el índice óptimo en flat dentro de [t_min, t_max] con start > t_estricto_mayor_que."""
    if not flat or not ancla:
        return None, 0.0

    # Incluir tanto tokens del título como los primeros del cuerpo tras el título (por si Whisper omitió un encabezado)
    l_tit = len(tit_toks)
    claves = set(tit_toks[:3]) | set(ancla[:4]) | set(ancla[l_tit : l_tit + 3])
    candidatos: list[int] = []
    todos_en_rango: list[int] = []
    for i, item in enumerate(flat):
        st = item["start"]
        if st <= t_estricto_mayor_que or st < t_min:
            continue
        if st > t_max:
            break
        todos_en_rango.append(i)
        if item["tok"] in claves:
            candidatos.append(i)

    a_evaluar = candidatos if candidatos else todos_en_rango
    mejor_idx: int | None = None
    mejor_score = -1.0
    for i in a_evaluar:
        sc = _puntuar_candidato(
            tit_toks, ancla, flat_toks, i, flat[i]["start"], t_esperado, duracion_total_s
        )
        if sc > mejor_score:
            mejor_score = sc
            mejor_idx = i

    if mejor_idx is None:
        return None, 0.0
    return mejor_idx, max(0.0, round(mejor_score, 4))


def _refinar_corte_con_silencedetect(
    ruta_audio: Path,
    t_prev_end: float,
    t_word_start: float,
    t_corte_defecto: float,
    duracion_total_s: float,
) -> float:
    """Refina t_corte con ffmpeg silencedetect en ±1.5 s sin jamás meterse dentro de una palabra."""
    if not ruta_audio.is_file() or shutil.which("ffmpeg") is None:
        return t_corte_defecto
    if t_word_start - t_prev_end < UMBRAL_HUECO_PAUSA_S:
        return t_corte_defecto

    win_ini = max(0.0, t_corte_defecto - VENTANA_SILENCEDETECT_S)
    win_fin = min(duracion_total_s, t_corte_defecto + VENTANA_SILENCEDETECT_S)
    win_dur = max(0.2, win_fin - win_ini)
    silencios_rel = medir_silencios(
        ruta_audio, ruido_db=-35.0, min_dur=0.08, inicio_s=win_ini, duracion_s=win_dur
    )
    mejor_sil: tuple[float, float] | None = None
    mejor_largo = 0.0
    for s_ini, s_fin in silencios_rel:
        abs_ini = max(win_ini + s_ini, t_prev_end)
        abs_fin = min(win_ini + s_fin, t_word_start)
        largo = abs_fin - abs_ini
        if largo >= 0.05 and largo > mejor_largo:
            mejor_largo = largo
            mejor_sil = (abs_ini, abs_fin)

    if mejor_sil is not None:
        return round((mejor_sil[0] + mejor_sil[1]) / 2.0, 4)
    return t_corte_defecto


def _texto_slice_whisper(palabras_whisper: list[dict[str, Any]], t_ini: float, t_fin: float) -> str:
    """Devuelve el texto de las palabras Whisper cuyos timestamps caen en [t_ini, t_fin]."""
    piezas = [
        w["word"]
        for w in palabras_whisper
        if float(w["end"]) >= t_ini and float(w["start"]) <= t_fin
    ]
    return " ".join(piezas).strip()


def alinear_fronteras_whisper(
    partes: list[pc.PartePropuesta],
    palabras_texto_md: list[str],
    palabras_whisper: list[dict[str, Any]],
    duracion_total_s: float,
    *,
    palabras_totales_mapa: int | None = None,
    capitulo: str = "Capitulo",
    ruta_audio: Path | None = None,
) -> list[dict[str, Any]]:
    """Alinea los límites de cada parte propuesta contra los timestamps palabra por palabra de Whisper."""
    if not partes:
        return []

    flat = _aplanar_tokens_whisper(palabras_whisper)
    flat_toks = [x["tok"] for x in flat]
    total_pal = palabras_totales_mapa or len(palabras_texto_md) or sum(p.palabras for p in partes)
    total_pal = max(1, int(total_pal))

    if len(partes) == 1:
        p0 = partes[0]
        return [
            {
                "indice": 1,
                "etiqueta": "Completo",
                "archivo": f"{capitulo}_Completo.mp3",
                "titulos": list(p0.titulos),
                "inicio_palabra": p0.inicio,
                "fin_palabra": p0.fin,
                "palabras": p0.palabras,
                "nota_propuesta": p0.nota,
                "t_inicio": 0.0,
                "t_fin": round(duracion_total_s, 4),
                "duracion_est_s": round(duracion_total_s, 3),
                "confianza": 1.0,
                "hueco_inicio_s": round(flat[0]["start"], 4) if flat else 0.0,
                "texto_borde_inicio": _texto_slice_whisper(
                    palabras_whisper, 0.0, min(duracion_total_s, VENTANA_BORDE_WHISPER_S)
                ),
                "texto_borde_fin": _texto_slice_whisper(
                    palabras_whisper, max(0.0, duracion_total_s - VENTANA_BORDE_WHISPER_S), duracion_total_s
                ),
            }
        ]

    cortes_t: list[float] = [0.0]
    confianzas: list[float] = [1.0]
    huecos_inicio: list[float] = [round(flat[0]["start"], 4) if flat else 0.0]
    t_anterior = 0.0

    for k in range(1, len(partes)):
        parte = partes[k]
        titulo_prim = parte.titulos[0] if parte.titulos else f"Parte {k + 1}"
        tit_toks, ancla = _construir_ancla_frontera(titulo_prim, parte.inicio, palabras_texto_md)

        frac = parte.inicio / total_pal
        t_esp = max(t_anterior + 0.1, min(duracion_total_s, frac * duracion_total_s))
        margen = VENTANA_PROPORCIONAL_FRAC * duracion_total_s
        w_min = max(t_anterior, t_esp - margen)
        w_max = min(duracion_total_s, t_esp + margen)

        best_idx, best_score = _buscar_mejor_indice_whisper(
            tit_toks, ancla, flat, flat_toks, w_min, w_max, t_esp, duracion_total_s, t_anterior
        )
        # Ampliar a todo el audio si la ventana proporcional no superó el umbral
        if best_idx is None or best_score < UMBRAL_CONFIANZA_ALINEACION:
            alt_idx, alt_score = _buscar_mejor_indice_whisper(
                tit_toks, ancla, flat, flat_toks, t_anterior, duracion_total_s, t_esp, duracion_total_s, t_anterior
            )
            if alt_idx is not None and alt_score > best_score:
                best_idx, best_score = alt_idx, alt_score

        if best_idx is not None:
            t_word_start = float(flat[best_idx]["start"])
            t_prev_end = float(flat[best_idx - 1]["end"]) if best_idx > 0 else 0.0
            hueco = t_word_start - t_prev_end
            if hueco > 1.5:
                # Hueco largo (>1.5 s): puede haber un encabezado hablado omitido por Whisper en la pasada larga;
                # cortar justo tras la frase previa (+0.25 s) para no rebanar el título.
                t_corte = t_prev_end + 0.25
            elif hueco >= UMBRAL_HUECO_PAUSA_S:
                t_corte = (t_prev_end + t_word_start) / 2.0
            else:
                t_corte = max(t_prev_end, t_word_start - 0.02)

            if ruta_audio is not None and hueco <= 1.5:
                t_corte = _refinar_corte_con_silencedetect(
                    ruta_audio, t_prev_end, t_word_start, t_corte, duracion_total_s
                )
            hueco_ini = max(0.0, t_word_start - t_corte)
        else:
            t_corte = t_esp
            best_score = 0.0
            hueco_ini = 0.0

        # Garantizar orden estrictamente creciente
        if t_corte <= t_anterior:
            t_corte = min(duracion_total_s, t_anterior + 0.05)

        t_corte = round(t_corte, 4)
        cortes_t.append(t_corte)
        confianzas.append(round(best_score, 4))
        huecos_inicio.append(round(hueco_ini, 4))
        t_anterior = t_corte

    cortes_t.append(round(duracion_total_s, 4))

    tramos: list[dict[str, Any]] = []
    for k, parte in enumerate(partes):
        t_ini = cortes_t[k]
        t_fin = cortes_t[k + 1]
        tit_prim = parte.titulos[0] if parte.titulos else f"parte_{k + 1:02d}"
        slug = slug_corto(tit_prim)
        archivo = f"{capitulo}_P{parte.indice:02d}_{slug}.mp3"
        tramos.append(
            {
                "indice": parte.indice,
                "etiqueta": f"P{parte.indice:02d}",
                "archivo": archivo,
                "titulos": list(parte.titulos),
                "inicio_palabra": parte.inicio,
                "fin_palabra": parte.fin,
                "palabras": parte.palabras,
                "nota_propuesta": parte.nota,
                "t_inicio": t_ini,
                "t_fin": t_fin,
                "duracion_est_s": round(max(0.0, t_fin - t_ini), 3),
                "confianza": confianzas[k],
                "hueco_inicio_s": huecos_inicio[k],
                "texto_borde_inicio": _texto_slice_whisper(
                    palabras_whisper, t_ini, min(t_fin, t_ini + VENTANA_BORDE_WHISPER_S)
                ),
                "texto_borde_fin": _texto_slice_whisper(
                    palabras_whisper, max(t_ini, t_fin - VENTANA_BORDE_WHISPER_S), t_fin
                ),
            }
        )
    return tramos


# ============================================================================
# CORTE FFMPEG + NORMALIZACIÓN EBU R128 (SIN DESVANECIDO)
# ============================================================================


def _requiere_binario(nombre: str) -> str:
    ruta = shutil.which(nombre)
    if not ruta:
        raise RuntimeError(f"No se encontró '{nombre}' en el PATH del sistema.")
    return ruta


def medir_parametros_audio_ffprobe(ruta_audio: Path) -> dict[str, Any]:
    """Obtiene duración, sample_rate y canales con ffprobe."""
    ffprobe = _requiere_binario("ffprobe")
    cmd = [
        ffprobe,
        "-v", "error",
        "-show_entries", "format=duration:stream=sample_rate,channels,channel_layout",
        "-select_streams", "a:0",
        "-of", "json",
        str(ruta_audio),
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if proc.returncode != 0:
        raise RuntimeError(f"ffprobe falló sobre {ruta_audio}: {proc.stderr.strip()}")
    info = json.loads(proc.stdout or "{}")
    dur = float((info.get("format") or {}).get("duration") or 0.0)
    streams = info.get("streams") or [{}]
    st0 = streams[0] if streams else {}
    sr = int(st0.get("sample_rate") or 44100)
    ch = int(st0.get("channels") or 1)
    raw_layout = str(st0.get("channel_layout") or "").strip().lower()
    if not raw_layout or raw_layout == "unknown":
        layout = "mono" if ch == 1 else "stereo"
    else:
        layout = raw_layout
    return {"duration": dur, "sample_rate": sr, "channels": ch, "channel_layout": layout}


def medir_duracion_ffprobe(ruta_audio: Path) -> float:
    return float(medir_parametros_audio_ffprobe(ruta_audio)["duration"])


def _normalizar_ffmpeg_dos_pasadas(
    ruta_wav_entrada: Path,
    ruta_mp3_salida: Path,
    sample_rate: int,
) -> None:
    """Normaliza a -16 LUFS / -1.5 dBTP con ffmpeg loudnorm (dos pasadas, respaldo 1 pasada) a MP3 128k."""
    ffmpeg = _requiere_binario("ffmpeg")
    cmd_p1 = [
        ffmpeg, "-hide_banner", "-nostdin", "-y",
        "-i", str(ruta_wav_entrada),
        "-af", f"loudnorm=I={LUFS_OBJETIVO}:TP={TP_OBJETIVO}:LRA={LRA_OBJETIVO}:print_format=json",
        "-f", "null", "-",
    ]
    p1 = subprocess.run(cmd_p1, capture_output=True, text=True, encoding="utf-8", errors="replace")
    m = re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", p1.stderr or "", re.S)
    usar_dos_pasadas = False
    stats: dict[str, str] = {}
    if p1.returncode == 0 and m:
        try:
            stats = json.loads(m.group(0))
            if all(
                stats.get(k) not in (None, "-inf", "inf", "nan")
                for k in ("input_i", "input_tp", "input_lra", "input_thresh", "target_offset")
            ):
                usar_dos_pasadas = True
        except Exception:
            usar_dos_pasadas = False

    if usar_dos_pasadas:
        af = (
            f"loudnorm=I={LUFS_OBJETIVO}:TP={TP_OBJETIVO}:LRA={LRA_OBJETIVO}"
            f":measured_I={stats['input_i']}:measured_TP={stats['input_tp']}"
            f":measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}"
            f":offset={stats['target_offset']}:linear=true"
        )
    else:
        af = f"loudnorm=I={LUFS_OBJETIVO}:TP={TP_OBJETIVO}:LRA={LRA_OBJETIVO}"

    cmd_p2 = [
        ffmpeg, "-hide_banner", "-nostdin", "-y",
        "-i", str(ruta_wav_entrada),
        "-af", af,
        "-ar", str(sample_rate),
        "-codec:a", "libmp3lame",
        "-b:a", BITRATE_MP3,
        str(ruta_mp3_salida),
    ]
    p2 = subprocess.run(cmd_p2, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if p2.returncode != 0 or not ruta_mp3_salida.is_file():
        raise RuntimeError(f"ffmpeg loudnorm falló al generar {ruta_mp3_salida}: {p2.stderr.strip()[-800:]}")


def normalizar_audio_ebu_r128(
    ruta_wav_entrada: Path,
    ruta_mp3_salida: Path,
    sample_rate: int,
    *,
    usar_loudness_skill: bool = True,
) -> str:
    """Normaliza un WAV a MP3 128k (-16 LUFS, -1.5 dBTP) usando loudness.py si existe o ffmpeg 2 pasadas."""
    ruta_mp3_salida.parent.mkdir(parents=True, exist_ok=True)
    if usar_loudness_skill and RUTA_LOUDNESS_SKILL.is_file():
        cmd = [
            sys.executable,
            str(RUTA_LOUDNESS_SKILL),
            str(ruta_wav_entrada),
            "-I", str(LUFS_OBJETIVO),
            "--tp", str(TP_OBJETIVO),
            "--lra", str(LRA_OBJETIVO),
            "--sample-rate", str(sample_rate),
            "--audio-bitrate", BITRATE_MP3,
            "-o", str(ruta_mp3_salida),
        ]
        proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
        if proc.returncode == 0 and ruta_mp3_salida.is_file() and ruta_mp3_salida.stat().st_size > 0:
            return "ffmpeg-skill/loudness.py"

    _normalizar_ffmpeg_dos_pasadas(ruta_wav_entrada, ruta_mp3_salida, sample_rate)
    return "ffmpeg-loudnorm-2pass"


def cortar_y_normalizar_tramo(
    ruta_audio: Path,
    t_inicio: float,
    t_fin: float,
    ruta_mp3_salida: Path,
    *,
    aire_inicial_s: float = 0.0,
    pad_final_s: float = PAD_FINAL_S,
    usar_loudness_skill: bool = True,
) -> dict[str, Any]:
    """Corta [t_inicio, t_fin] sin desvanecido, añade silencio limpio final y normaliza a -16 LUFS / -1.5 dBTP."""
    ffmpeg = _requiere_binario("ffmpeg")
    meta = medir_parametros_audio_ffprobe(ruta_audio)
    sr = int(meta["sample_rate"])
    layout = str(meta["channel_layout"])
    dur_tramo = max(0.05, t_fin - t_inicio)

    ruta_mp3_salida.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="axiom_corte_") as tmpdir:
        wav_tmp = Path(tmpdir) / "tramo.wav"
        # NUNCA usar afade: atrim=start:end garantiza corte exacto por muestra en MP3 (sin deriva de -ss)
        if aire_inicial_s > 0.0:
            filtro = (
                f"anullsrc=r={sr}:cl={layout}:d={aire_inicial_s:.4f}[lead];"
                f"[0:a]atrim=start={t_inicio:.4f}:end={t_fin:.4f},asetpts=PTS-STARTPTS,apad=pad_dur={pad_final_s:.4f}[body];"
                f"[lead][body]concat=n=2:v=0:a=1[out]"
            )
            cmd_cut = [
                ffmpeg, "-hide_banner", "-nostdin", "-y",
                "-i", str(ruta_audio),
                "-filter_complex", filtro,
                "-map", "[out]",
                "-ar", str(sr),
                "-c:a", "pcm_s16le",
                str(wav_tmp),
            ]
        else:
            cmd_cut = [
                ffmpeg, "-hide_banner", "-nostdin", "-y",
                "-i", str(ruta_audio),
                "-af", f"atrim=start={t_inicio:.4f}:end={t_fin:.4f},asetpts=PTS-STARTPTS,apad=pad_dur={pad_final_s:.4f}",
                "-ar", str(sr),
                "-c:a", "pcm_s16le",
                str(wav_tmp),
            ]

        res = subprocess.run(cmd_cut, capture_output=True, text=True, encoding="utf-8", errors="replace")
        if res.returncode != 0 or not wav_tmp.is_file():
            raise RuntimeError(f"ffmpeg falló al cortar tramo {t_inicio:.2f}-{t_fin:.2f}s: {res.stderr.strip()[-800:]}")

        mp3_tmp = Path(tmpdir) / "salida.mp3"
        sr_mp3 = max(44100, sr)
        motor_norm = normalizar_audio_ebu_r128(
            wav_tmp, mp3_tmp, sr_mp3, usar_loudness_skill=usar_loudness_skill
        )
        # Verificar integridad del MP3 antes de copiarlo a SynologyDrive (evita corrupcion por sync en vivo)
        chk = subprocess.run(
            [ffmpeg, "-v", "error", "-i", str(mp3_tmp), "-f", "null", "-"],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )
        if chk.returncode != 0 or chk.stderr.strip():
            raise RuntimeError(f"MP3 generado con errores de stream: {chk.stderr.strip()[:400]}")
        shutil.copy2(mp3_tmp, ruta_mp3_salida)

    return {"archivo": str(ruta_mp3_salida), "sample_rate": sr_mp3, "motor_normalizacion": motor_norm}


# ============================================================================
# VERIFICACIÓN OBLIGATORIA DE CADA PARTE (PASO 4 / CONTROL 16-11)
# ============================================================================


def medir_volumedetect(
    ruta_audio: Path,
    *,
    inicio_s: float | None = None,
    duracion_s: float | None = None,
) -> dict[str, float]:
    """Corre ffmpeg volumedetect y devuelve {max_volume, mean_volume} en dB."""
    ffmpeg = _requiere_binario("ffmpeg")
    cmd = [ffmpeg, "-hide_banner", "-nostdin", "-i", str(ruta_audio)]
    if inicio_s is not None:
        cmd += ["-ss", f"{max(0.0, inicio_s):.4f}"]
    if duracion_s is not None:
        cmd += ["-t", f"{max(0.05, duracion_s):.4f}"]
    cmd += ["-af", "volumedetect", "-f", "null", "-"]
    proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    stderr = proc.stderr or ""
    m_max = re.search(r"max_volume:\s*([-\d.]+)\s*dB", stderr)
    m_mean = re.search(r"mean_volume:\s*([-\d.]+)\s*dB", stderr)
    return {
        "max_volume": float(m_max.group(1)) if m_max else -91.0,
        "mean_volume": float(m_mean.group(1)) if m_mean else -91.0,
    }


def medir_silencios(
    ruta_audio: Path,
    *,
    ruido_db: float = -40.0,
    min_dur: float = 0.1,
    inicio_s: float | None = None,
    duracion_s: float | None = None,
) -> list[tuple[float, float]]:
    """Corre ffmpeg silencedetect y devuelve lista de intervalos (inicio_s, fin_s)."""
    ffmpeg = _requiere_binario("ffmpeg")
    cmd = [ffmpeg, "-hide_banner", "-nostdin", "-i", str(ruta_audio)]
    if inicio_s is not None:
        cmd += ["-ss", f"{max(0.0, inicio_s):.4f}"]
    if duracion_s is not None:
        cmd += ["-t", f"{max(0.05, duracion_s):.4f}"]
    cmd += ["-af", f"silencedetect=n={ruido_db}dB:d={min_dur}", "-f", "null", "-"]
    proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    stderr = proc.stderr or ""

    intervalos: list[tuple[float, float]] = []
    abierto: float | None = None
    for linea in stderr.splitlines():
        m_ini = re.search(r"silence_start:\s*([-\d.]+)", linea)
        if m_ini:
            abierto = max(0.0, float(m_ini.group(1)))
            continue
        m_fin = re.search(r"silence_end:\s*([-\d.]+)", linea)
        if m_fin:
            fin_v = float(m_fin.group(1))
            ini_v = abierto if abierto is not None else max(0.0, fin_v - min_dur)
            intervalos.append((ini_v, fin_v))
            abierto = None
    if abierto is not None:
        dur_ref = duracion_s if duracion_s is not None else medir_duracion_ffprobe(ruta_audio)
        intervalos.append((abierto, max(abierto, dur_ref)))
    return intervalos


def calcular_silencios_borde(
    silencios: list[tuple[float, float]],
    duracion_s: float,
) -> tuple[float, float, float]:
    """Devuelve (silencio_inicio_s, silencio_fin_s, max_silencio_interno_s)."""
    sil_ini = 0.0
    sil_fin = 0.0
    max_int = 0.0
    for a, b in silencios:
        dur = max(0.0, b - a)
        if a <= 0.08:
            sil_ini = max(sil_ini, dur)
        elif b >= duracion_s - 0.15:
            sil_fin = max(sil_fin, max(0.0, duracion_s - a))
        else:
            max_int = max(max_int, dur)
    return round(sil_ini, 3), round(sil_fin, 3), round(max_int, 3)


def medir_caida_desvanecido_db(
    ruta_audio: Path,
    duracion_s: float,
    silencio_fin_s: float,
) -> float:
    """Mide la caída de volumen en el último segundo hablado para detectar desvanecido (fade-out)."""
    fin_voz = max(0.0, duracion_s - silencio_fin_s)
    if fin_voz < 2.2:
        return 0.0
    v_penultimo = medir_volumedetect(ruta_audio, inicio_s=fin_voz - 2.0, duracion_s=1.0)["mean_volume"]
    v_ultimo = medir_volumedetect(ruta_audio, inicio_s=fin_voz - 1.0, duracion_s=1.0)["mean_volume"]
    # Si el último segundo ya es silencio profundo por imprecisión de borde, no inflar falsamente si ambos son bajos
    if v_penultimo <= -60.0:
        return 0.0
    return round(max(0.0, v_penultimo - v_ultimo), 2)


def transcribir_bordes_mp3(
    ruta_mp3: Path,
    duracion_s: float,
    *,
    modelo: str = "small",
    dispositivo: str = "cpu",
    compute_type: str = "int8",
    modelo_whisper_inst: Any = None,
) -> tuple[str, str, Any]:
    """Corre Whisper sobre los primeros 15 s y últimos 15 s reales de un MP3 cortado."""
    ffmpeg = _requiere_binario("ffmpeg")
    if modelo_whisper_inst is None:
        from faster_whisper import WhisperModel  # type: ignore

        modelo_whisper_inst = WhisperModel(modelo, device=dispositivo, compute_type=compute_type)

    with tempfile.TemporaryDirectory(prefix="axiom_bordes_") as tmpdir:
        wav_ini = Path(tmpdir) / "inicio.wav"
        wav_fin = Path(tmpdir) / "fin.wav"
        dur_borde = min(VENTANA_BORDE_WHISPER_S, max(0.5, duracion_s))
        ini_fin = max(0.0, duracion_s - dur_borde)

        subprocess.run(
            [ffmpeg, "-hide_banner", "-nostdin", "-y", "-i", str(ruta_mp3), "-ss", "0", "-t", f"{dur_borde:.3f}",
             "-ar", "16000", "-ac", "1", str(wav_ini)],
            capture_output=True, check=True,
        )
        subprocess.run(
            [ffmpeg, "-hide_banner", "-nostdin", "-y", "-i", str(ruta_mp3), "-ss", f"{ini_fin:.3f}", "-t", f"{dur_borde:.3f}",
             "-ar", "16000", "-ac", "1", str(wav_fin)],
            capture_output=True, check=True,
        )

        segs_i, _ = modelo_whisper_inst.transcribe(str(wav_ini), language="es", word_timestamps=True)
        segs_f, _ = modelo_whisper_inst.transcribe(str(wav_fin), language="es", word_timestamps=True)
        txt_ini = " ".join(s.text.strip() for s in segs_i).strip()
        txt_fin = " ".join(s.text.strip() for s in segs_f).strip()
    return txt_ini, txt_fin, modelo_whisper_inst


def similitud_titulo_inicio(titulo_esperado: str, texto_oido_inicio: str) -> float:
    """Calcula coincidencia [0..1] entre el título esperado y las primeras palabras oídas."""
    sin_num = _NUM_PREFIJO_RE.sub("", titulo_esperado.strip())
    tit_toks = norm_palabras(sin_num) or norm_palabras(titulo_esperado)
    oido_toks = norm_palabras(texto_oido_inicio)[: max(18, len(tit_toks) + 12)]
    if not tit_toks or not oido_toks:
        return 0.0

    # Cobertura de tokens del título dentro de la ventana inicial + mejor secuencia contigua
    coinciden = sum(1 for t in tit_toks if t in oido_toks)
    cob = coinciden / len(tit_toks)
    m = len(tit_toks)
    mejor_seq = 0.0
    for i in range(max(1, len(oido_toks) - m + 1)):
        r = difflib.SequenceMatcher(None, tit_toks, oido_toks[i : i + m]).ratio()
        if r > mejor_seq:
            mejor_seq = r
    return round(max(cob, mejor_seq), 4)


def cierre_frase_ok(texto_oido_fin: str) -> tuple[bool, str]:
    """Comprueba que el cierre no termine en relleno no narrable ni palabra partida."""
    s = texto_oido_fin.strip()
    if not s:
        return False, "Sin transcripción en el cierre"
    if _NO_NARRABLE_CIERRE_RE.search(s):
        return False, "El cierre contiene relleno no narrable"
    if s.endswith(("-", "–", "—")):
        return False, "Palabra partida al final"
    # Cierre con puntuación de fin de frase (o última palabra completa si la transcripción no puntualizó)
    if s.endswith((".", "?", "!", "…", "»", "”", '"')):
        return True, "OK"
    toks = norm_palabras(s)
    if len(toks) >= 2 and len(toks[-1]) >= 2:
        return True, "OK (sin punto final en transcripción)"
    return False, "Cierre incompleto o truncado"


def evaluar_parte_control(metricas: dict[str, Any]) -> dict[str, Any]:
    """Evalúa todas las reglas de control (16-11) sobre una pista y devuelve dict con ok y fallos."""
    fallos: list[str] = []
    dur_s = float(metricas.get("duracion_s") or 0.0)
    nota_prop = str(metricas.get("nota_propuesta") or "")
    es_completo_acomp = bool(metricas.get("es_completo_acompanante", False))
    es_completo_unico = bool(metricas.get("es_completo_unico", False))

    # 1. Duración 3-20 min (salvo Completo acompañante, >20 min sin sub-subtítulos o Completo <=15 min)
    permite_larga = es_completo_acomp or (">20 min" in nota_prop)
    permite_corta = es_completo_acomp or ("Completo (<3 min)" in nota_prop)
    if not permite_corta and dur_s < MIN_DURACION_PARTE_S:
        fallos.append(f"Duración < 3 min ({dur_s / 60.0:.2f} min)")
    if not permite_larga and dur_s > MAX_DURACION_PARTE_S:
        fallos.append(f"Duración > 20 min ({dur_s / 60.0:.2f} min)")
    if es_completo_unico and dur_s > MAX_DURACION_PARTE_S:
        fallos.append(f"Completo único > 20 min ({dur_s / 60.0:.2f} min)")

    # 2. Volumen sin clipping y en rango saludable
    max_vol = float(metricas.get("max_volume_db", -91.0))
    mean_vol = float(metricas.get("mean_volume_db", -91.0))
    if max_vol >= MAX_VOLUME_LIMITE_DB:
        fallos.append(f"Clipping o pico >= {MAX_VOLUME_LIMITE_DB} dB ({max_vol:.2f} dB)")
    if not (MEAN_VOLUME_MIN_DB <= mean_vol <= MEAN_VOLUME_MAX_DB):
        fallos.append(f"mean_volume fuera de [{MEAN_VOLUME_MIN_DB}, {MEAN_VOLUME_MAX_DB}] dB ({mean_vol:.2f} dB)")

    # 3. Sin desvanecido al final (caída < 6 dB en último segundo hablado)
    caida_db = float(metricas.get("caida_final_db", 0.0))
    if caida_db >= MAX_CAIDA_DESVANECIDO_DB:
        fallos.append(f"Posible desvanecido al final (caída {caida_db:.2f} dB >= {MAX_CAIDA_DESVANECIDO_DB} dB)")

    # 4. Silencios de borde <= 3 s
    sil_ini = float(metricas.get("silencio_inicio_s", 0.0))
    sil_fin = float(metricas.get("silencio_fin_s", 0.0))
    if sil_ini > MAX_SILENCIO_BORDE_S:
        fallos.append(f"Silencio inicial > {MAX_SILENCIO_BORDE_S} s ({sil_ini:.2f} s)")
    if sil_fin > MAX_SILENCIO_BORDE_S:
        fallos.append(f"Silencio final > {MAX_SILENCIO_BORDE_S} s ({sil_fin:.2f} s)")

    # 5. Coincidencia del título de inicio y cierre limpio (bordes Whisper)
    titulo_esp = str(metricas.get("titulo_inicio_esperado") or "")
    titulo_alt = str(metricas.get("titulo_inicio_alternativo") or "")
    txt_ini = str(metricas.get("texto_oido_inicio") or "")
    txt_fin = str(metricas.get("texto_oido_fin") or "")
    sim_ini = similitud_titulo_inicio(titulo_esp, txt_ini) if titulo_esp else 1.0
    if titulo_alt:
        sim_ini = max(sim_ini, similitud_titulo_inicio(titulo_alt, txt_ini))
    if titulo_esp and sim_ini < UMBRAL_TITULO_INICIO:
        fallos.append(
            f"Inicio no coincide con título '{titulo_esp}' (sim={sim_ini:.2f} < {UMBRAL_TITULO_INICIO})"
        )
    fin_ok, motivo_fin = cierre_frase_ok(txt_fin)
    if not fin_ok:
        fallos.append(f"Cierre inválido: {motivo_fin}")

    res = dict(metricas)
    res["similitud_inicio"] = sim_ini
    res["fallos"] = fallos
    res["ok"] = len(fallos) == 0
    res["veredicto"] = "APRUEBA" if res["ok"] else "FALLA"
    return res


def evaluar_veredicto_cortes(resultados_partes: list[dict[str, Any]]) -> dict[str, Any]:
    """Calcula el veredicto global: APRUEBA solo si 100 % de las partes aprueban; si 1 falla -> FALLA."""
    evaluadas = [
        r if ("ok" in r and "fallos" in r) else evaluar_parte_control(r)
        for r in resultados_partes
    ]
    total = len(evaluadas)
    aprobadas = sum(1 for r in evaluadas if r["ok"])
    fallidas = total - aprobadas
    veredicto = "APRUEBA" if (total > 0 and fallidas == 0) else "FALLA"
    return {
        "veredicto": veredicto,
        "total": total,
        "aprobadas": aprobadas,
        "fallidas": fallidas,
        "partes": evaluadas,
    }


def verificar_mp3_parte(
    ruta_mp3: Path,
    tramo: dict[str, Any],
    *,
    titulo_inicio_esperado: str,
    titulo_inicio_alternativo: str = "",
    es_completo_acompanante: bool = False,
    es_completo_unico: bool = False,
    sin_rewhisper_bordes: bool = False,
    modelo_whisper: str = "small",
    dispositivo: str = "cpu",
    compute_type: str = "int8",
    modelo_whisper_inst: Any = None,
) -> tuple[dict[str, Any], Any]:
    """Ejecuta todos los controles reales (ffprobe, volumedetect, silencedetect, Whisper bordes) sobre un MP3."""
    dur_s = medir_duracion_ffprobe(ruta_mp3)
    vol = medir_volumedetect(ruta_mp3)
    silencios = medir_silencios(ruta_mp3, ruido_db=-40.0, min_dur=0.1)
    sil_ini, sil_fin, max_sil_int = calcular_silencios_borde(silencios, dur_s)
    caida_db = medir_caida_desvanecido_db(ruta_mp3, dur_s, sil_fin)

    if sin_rewhisper_bordes:
        txt_ini = str(tramo.get("texto_borde_inicio") or "")
        txt_fin = str(tramo.get("texto_borde_fin") or "")
    else:
        txt_ini, txt_fin, modelo_whisper_inst = transcribir_bordes_mp3(
            ruta_mp3,
            dur_s,
            modelo=modelo_whisper,
            dispositivo=dispositivo,
            compute_type=compute_type,
            modelo_whisper_inst=modelo_whisper_inst,
        )

    metricas = {
        "archivo": ruta_mp3.name,
        "etiqueta": tramo["etiqueta"],
        "titulos": list(tramo["titulos"]),
        "t_inicio": tramo["t_inicio"],
        "t_fin": tramo["t_fin"],
        "duracion_s": round(dur_s, 3),
        "max_volume_db": vol["max_volume"],
        "mean_volume_db": vol["mean_volume"],
        "silencio_inicio_s": sil_ini,
        "silencio_fin_s": sil_fin,
        "max_silencio_interno_s": max_sil_int,
        "caida_final_db": caida_db,
        "titulo_inicio_esperado": titulo_inicio_esperado,
        "titulo_inicio_alternativo": titulo_inicio_alternativo,
        "texto_oido_inicio": txt_ini,
        "texto_oido_fin": txt_fin,
        "nota_propuesta": tramo.get("nota_propuesta", ""),
        "es_completo_acompanante": es_completo_acompanante,
        "es_completo_unico": es_completo_unico,
    }
    return evaluar_parte_control(metricas), modelo_whisper_inst


def renderizar_reporte_cortes_md(
    capitulo: str,
    libro: str,
    titulo_capitulo: str,
    resumen_veredicto: dict[str, Any],
) -> str:
    """Genera el contenido de REPORTE_CORTES.md con tabla detallada de cada pista."""
    ver = resumen_veredicto["veredicto"]
    aprob = resumen_veredicto["aprobadas"]
    total = resumen_veredicto["total"]

    lineas = [
        f"# Reporte de cortes por subtítulo — {capitulo}",
        "",
        f"- **Libro:** {libro}",
        f"- **Título:** {titulo_capitulo}",
        f"- **Veredicto global:** **{ver}** ({aprob}/{total} pistas aprobadas)",
        f"- **Estándar aplicado:** EBU R128 ({LUFS_OBJETIVO:g} LUFS, {TP_OBJETIVO:g} dBTP), sin desvanecido, +{PAD_FINAL_S:g} s silencio final.",
        "",
        "## Verificación pista por pista (100 % revisadas)",
        "",
        "| Pista | Archivo | Tramo | Duración | Max dB | Mean dB | Sil. ini/fin | Caída fin | Sim. título | Estado | Observaciones |",
        "|---|---|---|---:|---:|---:|---|---:|---:|---|---|",
    ]
    for p in resumen_veredicto["partes"]:
        tramo_str = f"{formatear_mmss(p['t_inicio'])} → {formatear_mmss(p['t_fin'])}"
        dur_str = formatear_mmss(p["duracion_s"])
        sil_str = f"{p['silencio_inicio_s']:.2f}s / {p['silencio_fin_s']:.2f}s"
        obs = "; ".join(p["fallos"]) if p["fallos"] else "OK"
        obs = obs.replace("|", "/")
        lineas.append(
            f"| {p['etiqueta']} | `{p['archivo']}` | {tramo_str} | {dur_str} | "
            f"{p['max_volume_db']:.1f} | {p['mean_volume_db']:.1f} | {sil_str} | "
            f"{p['caida_final_db']:.1f} dB | {p['similitud_inicio']:.2f} | **{p['veredicto']}** | {obs} |"
        )

    lineas.extend(["", "## Bordes oídos (primeros y últimos 15 s)", ""])
    for p in resumen_veredicto["partes"]:
        ini_rec = str(p.get("texto_oido_inicio") or "").replace("\n", " ")[:180]
        fin_rec = str(p.get("texto_oido_fin") or "").replace("\n", " ")[-180:]
        lineas.append(f"### {p['etiqueta']} — `{p['archivo']}` ({p['veredicto']})")
        lineas.append(f"- **Inicio oído:** {ini_rec or '(vacío)'}")
        lineas.append(f"- **Cierre oído:** {fin_rec or '(vacío)'}")
        lineas.append("")

    return "\n".join(lineas).rstrip() + "\n"


# ============================================================================
# ORQUESTACIÓN Y CLI
# ============================================================================


def ejecutar_corte_capitulo(
    *,
    capitulo: str,
    raiz: Path,
    ruta_mapa: Path | None = None,
    ruta_texto: Path | None = None,
    ruta_audio: Path | None = None,
    ruta_transcripcion: Path | None = None,
    dir_salida: Path | None = None,
    dir_cache_whisper: Path = DIR_CACHE_WHISPER_DEFECTO,
    seco: bool = False,
    sin_rewhisper_bordes: bool = False,
    modelo_whisper: str = "small",
    dispositivo: str = "cpu",
    compute_type: str = "int8",
    usar_loudness_skill: bool = True,
) -> dict[str, Any]:
    """Orquesta alineación, corte, normalización y verificación completa de un capítulo."""
    rutas = resolver_rutas_capitulo(
        capitulo,
        raiz,
        ruta_mapa=ruta_mapa,
        ruta_texto=ruta_texto,
        ruta_audio=ruta_audio,
        dir_salida=dir_salida,
    )
    mapa_path: Path = rutas["mapa"]
    texto_path: Path | None = rutas["texto"]
    audio_path: Path | None = rutas["audio"]
    salida_dir: Path = rutas["salida"]

    if not seco:
        _verificar_salida_segura(salida_dir)

    if mapa_path is None or not mapa_path.is_file():
        raise FileNotFoundError(f"No se encontró el mapa de títulos: {mapa_path}")

    mapa = json.loads(mapa_path.read_text(encoding="utf-8"))
    prop = pc.proponer_cortes_capitulo(
        mapa,
        clave=rutas["capitulo"],
        libro=rutas["libro"],
        nombre_mostrado=rutas["capitulo"],
    )

    palabras_md: list[str] = []
    if texto_path is not None and texto_path.is_file():
        palabras_md = norm_palabras(texto_path.read_text(encoding="utf-8"))

    palabras_whisper, dur_whisper, modelo_inst = cargar_o_transcribir_whisper(
        audio_path,
        ruta_transcripcion=ruta_transcripcion,
        dir_cache=dir_cache_whisper,
        modelo=modelo_whisper,
        dispositivo=dispositivo,
        compute_type=compute_type,
    )

    if audio_path is not None and audio_path.is_file() and shutil.which("ffprobe"):
        duracion_total_s = medir_duracion_ffprobe(audio_path)
    elif dur_whisper and dur_whisper > 0:
        duracion_total_s = dur_whisper
    elif palabras_whisper:
        duracion_total_s = float(palabras_whisper[-1]["end"])
    else:
        raise RuntimeError("No se pudo determinar la duración del audio.")

    tramos = alinear_fronteras_whisper(
        prop.partes,
        palabras_md,
        palabras_whisper,
        duracion_total_s,
        palabras_totales_mapa=prop.palabras_totales,
        capitulo=rutas["capitulo"],
        ruta_audio=audio_path if (audio_path is not None and audio_path.is_file()) else None,
    )

    if seco:
        return {
            "modo": "seco",
            "capitulo": rutas["capitulo"],
            "libro": rutas["libro"],
            "titulo_capitulo": prop.titulo_capitulo,
            "duracion_total_s": round(duracion_total_s, 3),
            "tramos": tramos,
            "veredicto": "SECO",
        }

    if audio_path is None or not audio_path.is_file():
        raise FileNotFoundError(f"No se encontró el archivo de audio para cortar: {audio_path}")

    salida_dir.mkdir(parents=True, exist_ok=True)
    resultados_verificacion: list[dict[str, Any]] = []
    archivos_generados: list[str] = []

    # 1. Generar siempre <Capitulo>_Completo.mp3 normalizado (sin desvanecido)
    ruta_completo = salida_dir / f"{rutas['capitulo']}_Completo.mp3"
    cortar_y_normalizar_tramo(
        audio_path,
        0.0,
        duracion_total_s,
        ruta_completo,
        aire_inicial_s=0.0,
        pad_final_s=PAD_FINAL_S,
        usar_loudness_skill=usar_loudness_skill,
    )
    archivos_generados.append(ruta_completo.name)

    es_una_sola_parte = len(tramos) <= 1
    tramo_completo = tramos[0] if es_una_sola_parte else {
        "indice": 0,
        "etiqueta": "Completo",
        "archivo": ruta_completo.name,
        "titulos": [prop.titulo_capitulo],
        "t_inicio": 0.0,
        "t_fin": round(duracion_total_s, 4),
        "nota_propuesta": "Completo",
        "texto_borde_inicio": _texto_slice_whisper(
            palabras_whisper, 0.0, min(duracion_total_s, VENTANA_BORDE_WHISPER_S)
        ),
        "texto_borde_fin": _texto_slice_whisper(
            palabras_whisper, max(0.0, duracion_total_s - VENTANA_BORDE_WHISPER_S), duracion_total_s
        ),
    }
    tit_esperado_comp = (
        prop.partes[0].titulos[0]
        if (es_una_sola_parte and prop.partes and prop.partes[0].titulos != ["Completo"])
        else (tramos[0]["titulos"][0] if (tramos and tramos[0]["titulos"] != ["Completo"]) else prop.titulo_capitulo)
    )
    ver_comp, modelo_inst = verificar_mp3_parte(
        ruta_completo,
        tramo_completo,
        titulo_inicio_esperado=tit_esperado_comp,
        titulo_inicio_alternativo=prop.titulo_capitulo,
        es_completo_acompanante=not es_una_sola_parte,
        es_completo_unico=es_una_sola_parte,
        sin_rewhisper_bordes=sin_rewhisper_bordes,
        modelo_whisper=modelo_whisper,
        dispositivo=dispositivo,
        compute_type=compute_type,
        modelo_whisper_inst=modelo_inst,
    )
    resultados_verificacion.append(ver_comp)

    # 2. Si tiene > 1 parte, cortar, normalizar y verificar CADA parte P01..PN
    if not es_una_sola_parte:
        for tramo in tramos:
            ruta_parte = salida_dir / tramo["archivo"]
            aire_ini = AIRE_INICIAL_S if (
                tramo["t_inicio"] > 0.0 and tramo["hueco_inicio_s"] < UMBRAL_AIRE_INICIAL_S
            ) else 0.0
            cortar_y_normalizar_tramo(
                audio_path,
                tramo["t_inicio"],
                tramo["t_fin"],
                ruta_parte,
                aire_inicial_s=aire_ini,
                pad_final_s=PAD_FINAL_S,
                usar_loudness_skill=usar_loudness_skill,
            )
            archivos_generados.append(ruta_parte.name)
            tit_esp = tramo["titulos"][0] if tramo["titulos"] else prop.titulo_capitulo
            tit_alt = prop.titulo_capitulo if tramo["t_inicio"] == 0.0 else ""
            ver_p, modelo_inst = verificar_mp3_parte(
                ruta_parte,
                tramo,
                titulo_inicio_esperado=tit_esp,
                titulo_inicio_alternativo=tit_alt,
                es_completo_acompanante=False,
                es_completo_unico=False,
                sin_rewhisper_bordes=sin_rewhisper_bordes,
                modelo_whisper=modelo_whisper,
                dispositivo=dispositivo,
                compute_type=compute_type,
                modelo_whisper_inst=modelo_inst,
            )
            resultados_verificacion.append(ver_p)

    resumen = evaluar_veredicto_cortes(resultados_verificacion)

    plan_aplicado = {
        "capitulo": rutas["capitulo"],
        "libro": rutas["libro"],
        "titulo_capitulo": prop.titulo_capitulo,
        "audio_origen": str(audio_path),
        "duracion_total_s": round(duracion_total_s, 3),
        "veredicto": resumen["veredicto"],
        "aprobadas": resumen["aprobadas"],
        "total_verificadas": resumen["total"],
        "archivos": archivos_generados,
        "tramos": tramos,
        "verificacion": resumen["partes"],
    }
    ruta_plan_json = salida_dir / "plan_cortes_aplicado.json"
    ruta_plan_json.write_text(json.dumps(plan_aplicado, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    reporte_md = renderizar_reporte_cortes_md(
        rutas["capitulo"], rutas["libro"], prop.titulo_capitulo, resumen
    )
    ruta_reporte = salida_dir / "REPORTE_CORTES.md"
    ruta_reporte.write_text(reporte_md, encoding="utf-8")

    return {
        "modo": "real",
        "capitulo": rutas["capitulo"],
        "libro": rutas["libro"],
        "salida": str(salida_dir),
        "plan_json": str(ruta_plan_json),
        "reporte_md": str(ruta_reporte),
        "veredicto": resumen["veredicto"],
        "aprobadas": resumen["aprobadas"],
        "total": resumen["total"],
        "tramos": tramos,
        "verificacion": resumen["partes"],
    }


def _imprimir_tabla_seco(res: dict[str, Any]) -> None:
    print(f"Simulación de cortes (--seco) — {res['capitulo']} ({res['libro']})")
    print(f"Título: {res['titulo_capitulo']} | Duración total: {formatear_mmss(res['duracion_total_s'])}")
    print(f"{'Parte':<9} {'Tramo':<17} {'Dur.':>7} {'Conf.':>6}  {'Archivo':<38}  {'Inicio oído'}")
    print("-" * 112)
    for t in res["tramos"]:
        tramo_str = f"{formatear_mmss(t['t_inicio'])} -> {formatear_mmss(t['t_fin'])}"
        dur_str = formatear_mmss(t["duracion_est_s"])
        borde = str(t.get("texto_borde_inicio") or "")[:45]
        print(
            f"{t['etiqueta']:<9} {tramo_str:<17} {dur_str:>7} {t['confianza']:>6.2f}  "
            f"{t['archivo']:<38}  {borde}"
        )


def main(argv: list[str] | None = None) -> int:
    _configurar_stdout_utf8()
    parser = argparse.ArgumentParser(
        description="Corta un audiolibro de _AUDIO_V2 por subtítulo, normaliza a -16 LUFS y verifica cada parte."
    )
    parser.add_argument("--capitulo", required=True, help="Clave del capítulo (ej. EdS_Parte3_1, Calvo_tema_03).")
    parser.add_argument("--seco", action="store_true", help="Alinea y muestra la tabla de cortes sin escribir MP3.")
    parser.add_argument(
        "--raiz",
        type=Path,
        default=DIR_SCRIPT.parents[1],
        help="Ruta raíz del repo (donde está 'examenes pasados/').",
    )
    parser.add_argument("--salida", type=Path, default=None, help="Carpeta destino (aparte de _AUDIO_V2).")
    parser.add_argument("--transcripcion", type=Path, default=None, help="JSON de transcripción Whisper con timestamps.")
    parser.add_argument("--audio", type=Path, default=None, help="Ruta explícita al audio fuente (.mp3 o .wav).")
    parser.add_argument("--texto", type=Path, default=None, help="Ruta explícita al .md TTS del capítulo.")
    parser.add_argument("--mapa", type=Path, default=None, help="Ruta explícita al JSON de mapa de títulos.")
    parser.add_argument(
        "--dir-cache-whisper",
        type=Path,
        default=DIR_CACHE_WHISPER_DEFECTO,
        help="Carpeta caché de transcripciones Whisper.",
    )
    parser.add_argument(
        "--sin-rewhisper-bordes",
        action="store_true",
        help="Usa el slice de la transcripción en vez de correr Whisper otra vez sobre los bordes (solo tests).",
    )
    parser.add_argument("--modelo-whisper", default="small", help="Modelo faster_whisper (por defecto: small).")
    parser.add_argument("--dispositivo", default="cpu", help="Dispositivo Whisper (por defecto: cpu).")
    parser.add_argument("--compute-type", default="int8", help="Precisión Whisper (por defecto: int8).")
    args = parser.parse_args(argv)

    res = ejecutar_corte_capitulo(
        capitulo=args.capitulo,
        raiz=args.raiz,
        ruta_mapa=args.mapa,
        ruta_texto=args.texto,
        ruta_audio=args.audio,
        ruta_transcripcion=args.transcripcion,
        dir_salida=args.salida,
        dir_cache_whisper=args.dir_cache_whisper,
        seco=args.seco,
        sin_rewhisper_bordes=args.sin_rewhisper_bordes,
        modelo_whisper=args.modelo_whisper,
        dispositivo=args.dispositivo,
        compute_type=args.compute_type,
    )

    if args.seco:
        _imprimir_tabla_seco(res)
        return 0

    print(
        f"Cortes generados en {res['salida']} — Veredicto: {res['veredicto']} "
        f"({res['aprobadas']}/{res['total']} pistas aprobadas). Reporte: {res['reporte_md']}"
    )
    return 0 if res["veredicto"] == "APRUEBA" else 1


if __name__ == "__main__":
    raise SystemExit(main())
