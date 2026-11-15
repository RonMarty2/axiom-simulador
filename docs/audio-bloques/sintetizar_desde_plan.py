# -*- coding: utf-8 -*-
"""Graba solo los bloques nuevos de un plan TTS y arma el capitulo en _cache_v2 y _AUDIO_V2."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import time
import wave
from pathlib import Path
from typing import Callable

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))

for _cand in (_SCRIPT_DIR / "script_agy", _SCRIPT_DIR / "scripts" / "audio"):
    if (_cand / "bloques_afectados.py").is_file() and str(_cand) not in sys.path:
        sys.path.insert(0, str(_cand))
        break

import bloques_afectados as B  # noqa: E402

try:
    from plan_sintesis import (  # type: ignore  # noqa: E402
        LARGO_INICIO,
        MAX_PALABRAS_BLOQUE,
        NOMBRE_TEXTOS,
        TAMANO_MIN_WAV,
        carpeta_cache_de_stem,
        resumir_inicio,
    )
except ModuleNotFoundError:
    MAX_PALABRAS_BLOQUE = 100
    TAMANO_MIN_WAV = 1000
    LARGO_INICIO = 60
    NOMBRE_TEXTOS = "_TEXTO_LITERAL_VERIFICADO"

    def carpeta_cache_de_stem(stem: str) -> str:
        """Aplica la regla de coincide.py para mapear el nombre del .md a su carpeta en _cache."""
        m = re.match(r"Tema_(\d+)_Morfo_Saladin", stem)
        if m:
            return f"Morfo_Cap_{m[1]}_Saladin_LITERAL_TTS"
        if stem.startswith("Atlas_B"):
            return "Morfo_Atlas_B_Saladin_LITERAL_TTS"
        return stem

    def resumir_inicio(texto_bloque: str, max_chars: int = LARGO_INICIO) -> str:
        """Devuelve los primeros max_chars caracteres en una sola linea."""
        limpio = re.sub(r"\s+", " ", texto_bloque).strip()
        return limpio[:max_chars]

try:
    from google import genai  # type: ignore
    from google.genai import types  # type: ignore
except ImportError:
    genai = None  # type: ignore
    types = None  # type: ignore

VOZ_OFICIAL = "Puck"
MODELO_DEFECTO = "gemini-3.1-flash-tts-preview"
ANTES_PARTE_RE = re.compile(r"antes\s+(parte_\d+(?:\.wav)?)", re.IGNORECASE)


def cargar_pool_keys(ruta_motor_audio: Path) -> list[str]:
    """Carga las claves API de Google desde _MOTOR_AUDIO/google_api_keys.json y GEMINI_API_KEY."""
    json_path = ruta_motor_audio.resolve() / "google_api_keys.json"
    keys: list[str] = []
    if json_path.is_file():
        try:
            data = json.loads(json_path.read_text(encoding="utf-8"))
            keys = [str(k).strip() for k in data.get("api_keys", []) if str(k).strip()]
        except Exception as exc:
            print(f"Error al leer pool de claves ({json_path}): {exc}", file=sys.stderr)

    env_key = os.environ.get("GEMINI_API_KEY")
    if env_key and env_key.strip() and env_key.strip() not in keys:
        keys.append(env_key.strip())

    return keys


def sanitizar_texto_para_tts(texto: str) -> str:
    """
    Normaliza el texto para que el modelo TTS lo lea con total naturalidad
    sin interpretar etiquetas como palabras (copiado de sintetizar_libro.py).
    """
    t = re.sub(r"<\s*long\s+pause\s*>", "... ", texto, flags=re.IGNORECASE)
    t = re.sub(r"<\s*short\s+pause\s*>", ", ", t, flags=re.IGNORECASE)
    t = re.sub(r"<\s*breath\s*>", "... ", t, flags=re.IGNORECASE)
    t = re.sub(r"</[^>]+>", "", t)

    tags_permitidos = {"<chuckle>", "<sigh>", "<gasp>", "<laugh>", "<laughter>"}
    for tag in re.findall(r"<[^>]+>", t):
        if tag.lower().strip() not in tags_permitidos:
            t = t.replace(tag, "")

    t = re.sub(r",\s*,", ",", t)
    t = re.sub(r" +", " ", t)
    return t.strip()


def concatenar_archivos_wav(lista_wavs: list[str], archivo_final_wav: str) -> None:
    """Concatena multiples fragmentos WAV en un unico archivo master."""
    if not lista_wavs:
        return

    dir_salida = os.path.dirname(os.path.abspath(archivo_final_wav))
    os.makedirs(dir_salida, exist_ok=True)

    if len(lista_wavs) == 1:
        shutil.copyfile(lista_wavs[0], archivo_final_wav)
        return

    params = None
    data: list[bytes] = []
    for w in lista_wavs:
        with wave.open(w, "rb") as f:
            if params is None:
                params = f.getparams()
            data.append(f.readframes(f.getnframes()))

    with wave.open(archivo_final_wav, "wb") as out:
        out.setparams(params)
        for chunk in data:
            out.writeframes(chunk)


def convertir_wav_a_mp3(archivo_wav: str, archivo_mp3: str) -> bool:
    """Convierte un WAV a MP3 usando ffmpeg si esta disponible en el sistema."""
    try:
        cmd = [
            "ffmpeg",
            "-y",
            "-i",
            archivo_wav,
            "-codec:a",
            "libmp3lame",
            "-b:a",
            "128k",
            archivo_mp3,
        ]
        res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if res.returncode == 0 and os.path.exists(archivo_mp3):
            return True
    except Exception:
        pass
    return False


def resolver_dir_cache_capitulo(ruta_motor_audio: Path, stem_plan: str) -> Path:
    """Ubica la carpeta original de lectura dentro de _MOTOR_AUDIO/_cache."""
    cache_raiz = ruta_motor_audio.resolve() / "_cache"
    candidato = cache_raiz / carpeta_cache_de_stem(stem_plan)
    if candidato.is_dir():
        return candidato
    if not stem_plan.endswith("_LITERAL_TTS"):
        candidato_tts = cache_raiz / carpeta_cache_de_stem(f"{stem_plan}_LITERAL_TTS")
        if candidato_tts.is_dir():
            return candidato_tts
    return candidato


def resolver_ruta_md_actual(ruta_motor_audio: Path, stem_plan: str) -> Path:
    """Ubica el archivo .md actual correspondiente al plan en _TEXTO_LITERAL_VERIFICADO."""
    dir_textos = ruta_motor_audio.resolve().parent / NOMBRE_TEXTOS
    candidato = dir_textos / f"{stem_plan}.md"
    if candidato.is_file():
        return candidato
    if not stem_plan.endswith("_LITERAL_TTS"):
        candidato_tts = dir_textos / f"{stem_plan}_LITERAL_TTS.md"
        if candidato_tts.is_file():
            return candidato_tts
    return candidato


def _resolver_origen_wav(motor: Path, dir_cache: Path, origen_str: str, j: int) -> Path:
    """Resuelve y valida un WAV origen dentro de _cache (solo lectura)."""
    nombre = str(origen_str or "").strip()
    if not nombre:
        raise ValueError(f"Bloque j={j} sin 'origen'.")
    if not nombre.endswith(".wav"):
        nombre = f"{nombre}.wav"

    if "/" in nombre or "\\" in nombre:
        origen_wav = (motor / "_cache" / nombre).resolve()
    else:
        origen_wav = (dir_cache / nombre).resolve()

    if not origen_wav.is_file():
        raise FileNotFoundError(f"No existe el audio origen para bloque j={j}: {origen_wav}")
    if origen_wav.stat().st_size <= TAMANO_MIN_WAV:
        raise ValueError(
            f"Audio origen demasiado pequeno (<= {TAMANO_MIN_WAV} bytes): {origen_wav}"
        )
    return origen_wav


def _extraer_parte_anterior(motivo: str, j: int) -> str:
    """Extrae el nombre de archivo 'parte_XXX.wav' desde 'antes parte_XXX' del motivo."""
    m = ANTES_PARTE_RE.search(motivo)
    if not m:
        raise ValueError(
            f"Bloque j={j} con error audible no indica 'antes parte_XXX' en motivo: {motivo!r}"
        )
    nombre = m.group(1)
    if not nombre.endswith(".wav"):
        nombre = f"{nombre}.wav"
    return nombre


def _es_error_cuota(err_msg: str) -> bool:
    """Indica si el mensaje corresponde a un limite 429 o agotamiento de cuota."""
    upper = err_msg.upper()
    return (
        "429" in err_msg
        or "RESOURCE_EXHAUSTED" in upper
        or "QUOTA" in upper
        or "RATE" in upper
    )


def _escribir_wav_atomico(destino_wav: Path, audio_data: bytes) -> None:
    """Escribe bytes PCM o RIFF WAV a disco de forma atomica."""
    destino_wav.parent.mkdir(parents=True, exist_ok=True)
    tmp_wav = destino_wav.with_name(f"{destino_wav.name}.tmp")
    if not audio_data.startswith(b"RIFF"):
        with wave.open(str(tmp_wav), "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(24000)
            wf.writeframes(audio_data)
    else:
        tmp_wav.write_bytes(audio_data)
    os.replace(tmp_wav, destino_wav)


def sintetizar_bloque_tts(
    texto_limpio: str,
    destino_wav: Path,
    modelo: str,
    keys_pool: list[str],
    estado_pool: dict[str, int],
    pausa_exito: float = 3.0,
    espera_error: float = 4.0,
    espera_pool: float = 30.0,
    max_rondas: int = 10,
) -> None:
    """
    Sintetiza un bloque con voz Puck y un unico modelo fijo.
    Ante 429 o error temporal rota claves (no modelos); si se agotan, espera y reintenta.
    """
    if not keys_pool:
        raise RuntimeError(
            "No hay claves en _MOTOR_AUDIO/google_api_keys.json ni en GEMINI_API_KEY."
        )
    if genai is None or types is None:
        raise RuntimeError(
            "El paquete google-genai no esta disponible en este entorno de Python."
        )

    config = types.GenerateContentConfig(
        response_modalities=["AUDIO"],
        speech_config=types.SpeechConfig(
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=VOZ_OFICIAL)
            )
        ),
    )

    total_keys = len(keys_pool)
    max_intentos = max(1, total_keys * max_rondas)
    fallos_en_ronda = 0

    for _ in range(max_intentos):
        key_idx = estado_pool["key_idx"] % total_keys
        client = genai.Client(api_key=keys_pool[key_idx])
        try:
            response = client.models.generate_content(
                model=modelo,
                contents=texto_limpio,
                config=config,
            )

            if not response.candidates or not response.candidates[0].content:
                raise RuntimeError("Respuesta sin candidatos de audio.")

            audio_data = None
            for part in response.candidates[0].content.parts:
                if getattr(part, "inline_data", None):
                    audio_data = part.inline_data.data
                    break

            if not audio_data:
                raise RuntimeError("Sin datos de audio en la respuesta.")

            _escribir_wav_atomico(destino_wav, audio_data)

            estado_pool["key_idx"] = (key_idx + 1) % total_keys
            if pausa_exito > 0:
                time.sleep(pausa_exito)
            return

        except Exception as exc:
            err_msg = str(exc)
            estado_pool["reintentos_totales"] = estado_pool.get("reintentos_totales", 0) + 1
            if _es_error_cuota(err_msg):
                estado_pool["rotaciones_429"] = estado_pool.get("rotaciones_429", 0) + 1

            estado_pool["key_idx"] = (key_idx + 1) % total_keys
            fallos_en_ronda += 1

            if fallos_en_ronda >= total_keys:
                estado_pool["rondas_agotadas"] = estado_pool.get("rondas_agotadas", 0) + 1
                fallos_en_ronda = 0
                print(
                    f"  [Cuota] Todas las claves ({total_keys}) agotadas o con error "
                    f"en modelo {modelo}; esperando {espera_pool:g}s para reintentar...",
                    flush=True,
                )
                if espera_pool > 0:
                    time.sleep(espera_pool)
            else:
                print(
                    f"  [Aviso 429/error] Rotando clave ({fallos_en_ronda}/{total_keys}) "
                    f"en modelo {modelo}: {err_msg[:90]}",
                    flush=True,
                )
                if espera_error > 0:
                    time.sleep(espera_error)

    raise RuntimeError(
        f"Fallo al sintetizar bloque tras {max_intentos} intentos con modelo '{modelo}' "
        f"(rotaciones_429={estado_pool.get('rotaciones_429', 0)}, "
        f"rondas_agotadas={estado_pool.get('rondas_agotadas', 0)})."
    )


def _wav_valido(ruta: Path) -> bool:
    """Devuelve True si el archivo existe y supera el tamano minimo valido."""
    return ruta.is_file() and ruta.stat().st_size > TAMANO_MIN_WAV


def _sha1_texto(texto: str) -> str:
    """Devuelve el SHA-1 hexadecimal UTF-8 de un bloque de texto."""
    return hashlib.sha1(texto.encode("utf-8")).hexdigest()


def _cargar_textos_reextraidos(ruta_textos_json: Path) -> dict[int, dict]:
    """Carga el JSON generado por reextraer_errores.py indexado por `j`."""
    ruta = ruta_textos_json.resolve()
    if not ruta.is_file():
        raise FileNotFoundError(f"No existe el archivo --textos: {ruta}")
    datos = json.loads(ruta.read_text(encoding="utf-8"))
    if not isinstance(datos, list):
        raise ValueError(f"El archivo --textos debe ser una lista JSON: {ruta}")
    por_j: dict[int, dict] = {}
    for entry in datos:
        j = int(entry["j"])
        por_j[j] = entry
    return por_j


def _cargar_manifiesto_previo(ruta_manifiesto: Path) -> dict[int, dict]:
    """Lee un manifiesto previo de _cache_v2 si existe, indexado por `j`."""
    if not ruta_manifiesto.is_file():
        return {}
    try:
        datos = json.loads(ruta_manifiesto.read_text(encoding="utf-8"))
    except Exception:
        return {}
    if not isinstance(datos, list):
        return {}
    return {int(entry["j"]): entry for entry in datos if "j" in entry}


def _es_parte_copiada_vieja(
    destino_wav: Path,
    cand_viejo: Path | None,
    reg_previo: dict | None,
    sha1_nuevo: str,
) -> bool:
    """Indica si `destino_wav` corresponde a una copia vieja o texto distinto y debe rehacerse."""
    if reg_previo is not None:
        accion_prev = reg_previo.get("accion")
        if accion_prev in ("REUSAR_ANTERIOR", "REUSAR"):
            return True
        if reg_previo.get("origen") is not None:
            return True
        if reg_previo.get("texto_fuente") != "reextraido":
            return True
        if reg_previo.get("sha1") != sha1_nuevo:
            return True
        return False

    if cand_viejo is not None and cand_viejo.is_file() and destino_wav.is_file():
        return destino_wav.read_bytes() == cand_viejo.read_bytes()
    return False


def _sintetizar_y_validar_parte(
    j: int,
    texto_bloque: str,
    destino_wav: Path,
    dir_cache_v2: Path,
    modelo: str,
    keys_pool: list[str],
    estado_pool: dict[str, int],
    fn_sintesis: Callable[..., None],
    seco: bool,
    prefijo: str,
    etiqueta_log: str = "",
) -> None:
    """Sanitiza y sintetiza una parte hacia `_cache_v2`, respetando `--seco`."""
    texto_limpio = sanitizar_texto_para_tts(texto_bloque)
    palabras = len(texto_limpio.split())
    extra = f"{etiqueta_log}, " if etiqueta_log else ""
    if seco:
        print(
            f"{prefijo}SINTETIZAR parte_{j:03d}.wav ({extra}{palabras} palabras, modelo={modelo})"
        )
        return

    dir_cache_v2.mkdir(parents=True, exist_ok=True)
    print(f"SINTETIZAR parte_{j:03d}.wav ({extra}{palabras} palabras, modelo={modelo})...")
    fn_sintesis(
        texto_limpio=texto_limpio,
        destino_wav=destino_wav,
        modelo=modelo,
        keys_pool=keys_pool,
        estado_pool=estado_pool,
    )
    if not _wav_valido(destino_wav):
        raise RuntimeError(
            f"El WAV sintetizado para parte_{j:03d}.wav es invalido o <= {TAMANO_MIN_WAV} bytes."
        )


def procesar_capitulo(
    ruta_motor_audio: Path,
    ruta_plan_json: Path,
    solo_nuevos: bool = False,
    seco: bool = False,
    modelo: str = MODELO_DEFECTO,
    sintetizar_fn: Callable[..., None] | None = None,
    ruta_textos_json: Path | None = None,
) -> dict:
    """
    Ejecuta el plan de un capitulo hacia _cache_v2 y _AUDIO_V2 sin tocar _cache ni los audios publicados.
    Devuelve un diccionario con estadisticas, pendientes y rutas de salida.
    """
    motor = ruta_motor_audio.resolve()
    plan_path = ruta_plan_json.resolve()
    if not plan_path.is_file():
        raise FileNotFoundError(f"No existe el plan: {plan_path}")

    datos = json.loads(plan_path.read_text(encoding="utf-8"))
    if not isinstance(datos, list) or not datos:
        raise ValueError(f"El plan debe ser una lista JSON no vacia: {plan_path}")

    items = sorted(datos, key=lambda x: int(x["j"]))
    indices = [int(x["j"]) for x in items]
    if indices != list(range(1, len(items) + 1)):
        raise ValueError(f"Los indices 'j' del plan no son contiguos 1..N: {plan_path}")

    capitulo = plan_path.stem
    carpeta_cache = carpeta_cache_de_stem(capitulo)
    dir_cache_vieja = resolver_dir_cache_capitulo(motor, capitulo)
    dir_cache_v2 = (motor / "_cache_v2" / carpeta_cache).resolve()
    dir_audio_v2 = (motor / "_AUDIO_V2").resolve()

    if dir_cache_v2 == dir_cache_vieja:
        raise ValueError("La carpeta destino _cache_v2 no puede coincidir con _cache.")

    # Verificar si hay bloques "nuevo" o si existe el .md actual para validar inicio y calcular sha1.
    necesita_texto_nuevo = any(
        item.get("accion") == "SINTETIZAR"
        and str(item.get("motivo") or "").strip().lower() == "nuevo"
        for item in items
    )
    ruta_md = resolver_ruta_md_actual(motor, capitulo)
    bloques_actuales: list[str] | None = None

    if ruta_md.is_file():
        contenido_md = ruta_md.read_text(encoding="utf-8")
        bloques_actuales = B.dividir_capitulo_en_bloques(
            contenido_md, max_palabras=MAX_PALABRAS_BLOQUE
        )
        if len(bloques_actuales) != len(items):
            raise ValueError(
                f"Cantidad de bloques del texto actual ({len(bloques_actuales)}) "
                f"no coincide con el plan ({len(items)}) en '{capitulo}'."
            )
    elif necesita_texto_nuevo:
        raise FileNotFoundError(
            f"No existe el texto actual necesario para sintetizar bloques 'nuevo': {ruta_md}"
        )

    # Validar antes de copiar o gastar cuota que todos los bloques "nuevo" coinciden con texto_inicio.
    if bloques_actuales is not None:
        for item in items:
            j = int(item["j"])
            motivo = str(item.get("motivo") or "").strip().lower()
            if item.get("accion") == "SINTETIZAR" and motivo == "nuevo":
                inicio_actual = resumir_inicio(bloques_actuales[j - 1])
                inicio_plan = str(item.get("texto_inicio") or "")
                if inicio_actual != inicio_plan:
                    raise ValueError(
                        f"Bloque j={j} en '{capitulo}' no coincide con texto_inicio del plan "
                        f"(plan={inicio_plan!r}, actual={inicio_actual!r}). Capitulo abortado."
                    )

    textos_reextraidos = (
        _cargar_textos_reextraidos(ruta_textos_json)
        if ruta_textos_json is not None
        else None
    )
    ruta_manifiesto = dir_cache_v2 / "manifiesto.json"
    manifiesto_previo = (
        _cargar_manifiesto_previo(ruta_manifiesto)
        if textos_reextraidos is not None
        else {}
    )

    keys_pool = cargar_pool_keys(motor)
    estado_pool: dict[str, int] = {
        "key_idx": 0,
        "rotaciones_429": 0,
        "rondas_agotadas": 0,
        "reintentos_totales": 0,
    }
    fn_sintesis = sintetizar_fn if sintetizar_fn is not None else sintetizar_bloque_tts

    prefijo = "[SECO] " if seco else ""
    reusados = 0
    sintetizados = 0
    copiados_viejos = 0
    retomados = 0
    pendientes_error: list[dict] = []
    pendientes_revisar: list[dict] = []
    registros_manifiesto: list[dict] = []

    for item in items:
        j = int(item["j"])
        accion = str(item.get("accion") or "").strip()
        motivo = str(item.get("motivo") or "").strip()
        motivo_lower = motivo.lower()
        texto_inicio = str(item.get("texto_inicio") or "")
        destino_wav = dir_cache_v2 / f"parte_{j:03d}.wav"
        sha1_bloque = (
            _sha1_texto(bloques_actuales[j - 1])
            if bloques_actuales is not None
            else None
        )
        texto_fuente_bloque: str | None = None

        # Determinar accion/origen/modelo logicos para este bloque
        if accion == "REUSAR":
            origen_nombre = str(item.get("origen") or "").strip()
            origen_wav = _resolver_origen_wav(motor, dir_cache_vieja, origen_nombre, j)
            modelo_bloque: str | None = None
            origen_manifiesto: str | None = origen_wav.name
            accion_manifiesto = "REUSAR"

            if _wav_valido(destino_wav):
                retomados += 1
                print(
                    f"{prefijo}RETOMAR parte_{j:03d}.wav (ya existe >{TAMANO_MIN_WAV} bytes)"
                )
            else:
                if not seco:
                    dir_cache_v2.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(origen_wav, destino_wav)
                reusados += 1
                print(f"{prefijo}REUSAR parte_{j:03d}.wav <- {origen_wav.name}")

        elif accion == "SINTETIZAR" and motivo_lower == "nuevo":
            assert bloques_actuales is not None
            bloque_completo = bloques_actuales[j - 1]
            modelo_bloque = modelo
            origen_manifiesto = None
            accion_manifiesto = "SINTETIZAR"

            if _wav_valido(destino_wav):
                retomados += 1
                print(
                    f"{prefijo}RETOMAR parte_{j:03d}.wav (sintesis previa >{TAMANO_MIN_WAV} bytes)"
                )
            else:
                _sintetizar_y_validar_parte(
                    j=j,
                    texto_bloque=bloque_completo,
                    destino_wav=destino_wav,
                    dir_cache_v2=dir_cache_v2,
                    modelo=modelo,
                    keys_pool=keys_pool,
                    estado_pool=estado_pool,
                    fn_sintesis=fn_sintesis,
                    seco=seco,
                    prefijo=prefijo,
                )
                sintetizados += 1

        elif accion == "SINTETIZAR" and motivo_lower.startswith("error audible"):
            parte_vieja = _extraer_parte_anterior(motivo, j)
            if textos_reextraidos is not None:
                info_texto = textos_reextraidos.get(j)
                estado_reext = (
                    str(info_texto.get("estado") or "").strip().upper()
                    if info_texto is not None
                    else "REVISAR"
                )
                if estado_reext == "OK":
                    assert info_texto is not None
                    texto_nuevo = str(info_texto.get("texto_nuevo") or "").strip()
                    if not texto_nuevo:
                        raise ValueError(
                            f"Bloque j={j} en --textos marcado OK pero sin texto_nuevo."
                        )
                    sha1_bloque = _sha1_texto(texto_nuevo)
                    texto_fuente_bloque = "reextraido"
                    modelo_bloque = modelo
                    origen_manifiesto = None
                    accion_manifiesto = "SINTETIZAR"

                    cand_viejo = dir_cache_vieja / parte_vieja
                    reg_previo = manifiesto_previo.get(j)
                    es_copia_vieja = _es_parte_copiada_vieja(
                        destino_wav=destino_wav,
                        cand_viejo=cand_viejo,
                        reg_previo=reg_previo,
                        sha1_nuevo=sha1_bloque,
                    )

                    if _wav_valido(destino_wav) and not es_copia_vieja:
                        retomados += 1
                        print(
                            f"{prefijo}RETOMAR parte_{j:03d}.wav (reextraido ya sintetizado)"
                        )
                    else:
                        etiqueta = "reextraido, rehace copia vieja" if _wav_valido(destino_wav) else "reextraido"
                        _sintetizar_y_validar_parte(
                            j=j,
                            texto_bloque=texto_nuevo,
                            destino_wav=destino_wav,
                            dir_cache_v2=dir_cache_v2,
                            modelo=modelo,
                            keys_pool=keys_pool,
                            estado_pool=estado_pool,
                            fn_sintesis=fn_sintesis,
                            seco=seco,
                            prefijo=prefijo,
                            etiqueta_log=etiqueta,
                        )
                        sintetizados += 1
                else:
                    origen_wav = _resolver_origen_wav(motor, dir_cache_vieja, parte_vieja, j)
                    modelo_bloque = None
                    origen_manifiesto = origen_wav.name
                    accion_manifiesto = "REUSAR_ANTERIOR"
                    motivo_rev = (
                        str(info_texto.get("motivo") or "REVISAR")
                        if info_texto is not None
                        else "sin entrada en --textos"
                    )
                    pendientes_revisar.append(
                        {
                            "j": j,
                            "motivo": motivo_rev,
                            "texto_inicio": texto_inicio,
                        }
                    )

                    if _wav_valido(destino_wav):
                        retomados += 1
                        print(
                            f"{prefijo}RETOMAR parte_{j:03d}.wav (REVISAR, copia previa existente)"
                        )
                    else:
                        if not seco:
                            dir_cache_v2.mkdir(parents=True, exist_ok=True)
                            shutil.copy2(origen_wav, destino_wav)
                        copiados_viejos += 1
                        print(
                            f"{prefijo}REUSAR_ANTERIOR parte_{j:03d}.wav <- {origen_wav.name} (REVISAR)"
                        )
            elif solo_nuevos:
                origen_wav = _resolver_origen_wav(motor, dir_cache_vieja, parte_vieja, j)
                modelo_bloque = None
                origen_manifiesto = origen_wav.name
                accion_manifiesto = "REUSAR_ANTERIOR"

                if _wav_valido(destino_wav):
                    retomados += 1
                    print(
                        f"{prefijo}RETOMAR parte_{j:03d}.wav (error audible copiado previamente)"
                    )
                else:
                    if not seco:
                        dir_cache_v2.mkdir(parents=True, exist_ok=True)
                        shutil.copy2(origen_wav, destino_wav)
                    copiados_viejos += 1
                    print(
                        f"{prefijo}REUSAR_ANTERIOR parte_{j:03d}.wav <- {origen_wav.name} (--solo-nuevos)"
                    )
            else:
                modelo_bloque = None
                origen_manifiesto = None
                accion_manifiesto = "PENDIENTE"
                if _wav_valido(destino_wav):
                    retomados += 1
                    print(
                        f"{prefijo}RETOMAR parte_{j:03d}.wav (ya existe >{TAMANO_MIN_WAV} bytes)"
                    )
                else:
                    pendientes_error.append(item)
                    print(
                        f"{prefijo}PENDIENTE parte_{j:03d}.wav | {motivo} | {texto_inicio}"
                    )
        else:
            raise ValueError(
                f"Combinacion accion/motivo no soportada en bloque j={j}: "
                f"accion={accion!r}, motivo={motivo!r}"
            )

        registro = {
            "j": j,
            "accion": accion_manifiesto,
            "origen": origen_manifiesto,
            "modelo": modelo_bloque,
            "texto_inicio": texto_inicio,
            "sha1": sha1_bloque,
        }
        if texto_fuente_bloque is not None:
            registro["texto_fuente"] = texto_fuente_bloque
        registros_manifiesto.append(registro)

    partes_wav = [dir_cache_v2 / f"parte_{j:03d}.wav" for j in range(1, len(items) + 1)]
    armado = False
    mp3_generado = False
    ruta_wav_final = dir_audio_v2 / f"{capitulo}.wav"
    ruta_mp3_final = dir_audio_v2 / f"{capitulo}.mp3"

    if pendientes_error:
        print("")
        print(
            f"Pendientes por error audible ({len(pendientes_error)}) sin --solo-nuevos; "
            "no se arma el capitulo:"
        )
        for p in pendientes_error:
            print(
                f"  parte_{int(p['j']):03d}.wav | {p.get('motivo', '')} | {p.get('texto_inicio', '')}"
            )
    elif seco:
        print("")
        print(f"[SECO] Armaria WAV master: {ruta_wav_final}")
        print(f"[SECO] Convertiria a MP3: {ruta_mp3_final}")
        print(f"[SECO] Escribiria manifiesto: {ruta_manifiesto}")
    elif all(_wav_valido(p) for p in partes_wav):
        dir_audio_v2.mkdir(parents=True, exist_ok=True)
        concatenar_archivos_wav([str(p) for p in partes_wav], str(ruta_wav_final))
        mp3_generado = convertir_wav_a_mp3(str(ruta_wav_final), str(ruta_mp3_final))
        dir_cache_v2.mkdir(parents=True, exist_ok=True)
        ruta_manifiesto.write_text(
            json.dumps(registros_manifiesto, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        armado = True
        print("")
        print(f"WAV armado: {ruta_wav_final}")
        if mp3_generado:
            print(f"MP3 armado: {ruta_mp3_final}")
        else:
            print("Aviso: ffmpeg no disponible o fallo; se genero solo WAV.")
        print(f"Manifiesto escrito: {ruta_manifiesto}")
    else:
        faltantes = [p.name for p in partes_wav if not _wav_valido(p)]
        print("")
        print(
            f"No se arma el capitulo porque faltan {len(faltantes)} partes en {dir_cache_v2}: "
            f"{', '.join(faltantes[:10])}"
        )

    if pendientes_revisar:
        print("")
        print(
            f"Pendientes de revision por reextraccion ({len(pendientes_revisar)}):"
        )
        for p in pendientes_revisar:
            print(
                f"  parte_{int(p['j']):03d}.wav | {p.get('motivo', '')} | {p.get('texto_inicio', '')}"
            )

    pendientes_total = (
        len(pendientes_revisar)
        if textos_reextraidos is not None
        else len(pendientes_error)
    )

    print("")
    print(
        f"Resumen ({capitulo}): total={len(items)}, reusados={reusados}, "
        f"sintetizados={sintetizados}, copiados_viejos={copiados_viejos}, "
        f"retomados={retomados}, pendientes={pendientes_total}, "
        f"modelo={modelo}, rotaciones_429={estado_pool['rotaciones_429']}, "
        f"rondas_agotadas={estado_pool['rondas_agotadas']}, armado={armado}"
    )

    return {
        "capitulo": capitulo,
        "carpeta_cache": carpeta_cache,
        "total": len(items),
        "reusados": reusados,
        "sintetizados": sintetizados,
        "copiados_viejos": copiados_viejos,
        "retomados": retomados,
        "pendientes": pendientes_total,
        "pendientes_revisar": pendientes_revisar,
        "rotaciones_429": estado_pool["rotaciones_429"],
        "rondas_agotadas": estado_pool["rondas_agotadas"],
        "armado": armado,
        "mp3_generado": mp3_generado,
        "ruta_wav_final": ruta_wav_final,
        "ruta_mp3_final": ruta_mp3_final,
        "ruta_manifiesto": ruta_manifiesto,
    }


def main(argv: list[str] | None = None) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")

    parser = argparse.ArgumentParser(
        description=(
            "Graba solo los bloques nuevos de un plan y arma el capitulo en "
            "_cache_v2 y _AUDIO_V2 sin tocar _cache."
        )
    )
    parser.add_argument("ruta_motor_audio", help="Ruta a la carpeta _MOTOR_AUDIO")
    parser.add_argument("plan_json", help="Ruta al archivo plan/<capitulo>.json")
    parser.add_argument(
        "--solo-nuevos",
        action="store_true",
        help="En bloques 'error audible...', copia el wav viejo de 'antes parte_XXX' en lugar de sintetizar",
    )
    parser.add_argument(
        "--textos",
        default=None,
        help="Ruta a reextraido/<capitulo>.json para sintetizar bloques 'error audible' OK",
    )
    parser.add_argument(
        "--seco",
        action="store_true",
        help="No llama a la API ni copia archivos; imprime que haria",
    )
    parser.add_argument(
        "--modelo",
        default=MODELO_DEFECTO,
        help=f"Modelo TTS fijo a utilizar (por defecto: {MODELO_DEFECTO})",
    )
    args = parser.parse_args(argv)

    try:
        procesar_capitulo(
            ruta_motor_audio=Path(args.ruta_motor_audio),
            ruta_plan_json=Path(args.plan_json),
            solo_nuevos=args.solo_nuevos,
            seco=args.seco,
            modelo=args.modelo,
            ruta_textos_json=Path(args.textos) if args.textos else None,
        )
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
