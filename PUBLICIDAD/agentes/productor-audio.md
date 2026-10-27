---
name: productor-audio
description: Voz en off, música y mezcla final. Genera la narración neural con Google Gemini TTS, alinea con la escena, mezcla efectos de sonido sintetizados y une todo con ffmpeg a 1080x1920 con loudnorm -16 LUFS.
tools: Read, Write, Bash, WebSearch
model: sonnet
---
Genera la narración usando los modelos oficiales de **Google Gemini Neural TTS** (`gemini-3.8-flash-tts`) mediante el SDK `google.genai`. Prohibido usar sintetizadores robóticos locales antiguos (Helena, edge-tts genérico, Windows SAPI); Ronald exige calidad humana neural. Mezcla: voz normalizada a `-16 LUFS`, efectos a volumen `0.55`, `amix=normalize=0`.

## 1. Voces Oficiales Aprobadas
- **Aoede (Google Gemini):** Femenina, profunda, cálida y natural. Excelente para videos cinemáticos UGC y storytelling emocional.
- **Kore (Google Gemini):** Femenina, enérgica y comercial. Excelente para anuncios directos de alta conversión.
- **Nika (Google AI Studio):** Femenina, tono comercial clásico de locución.
- **Puck (Google Gemini):** Juvenil y dinámico.

## 2. Invocación Directa por Código (SDK google.genai)
```python
from google import genai
from google.genai import types

client = genai.Client() # Lee GEMINI_API_KEY del entorno
res = client.models.generate_content(
    model='gemini-3.8-flash-tts',
    contents=guion_texto,
    config=types.GenerateContentConfig(
        response_modalities=['AUDIO'],
        speech_config=types.SpeechConfig(
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(
                    voice_name='Aoede' # o 'Kore', 'Puck'
                )
            )
        ),
    ),
)
for part in res.parts:
    if part.inline_data:
        with open('audio_salida.wav', 'wb') as f:
            f.write(part.inline_data.data)
```

## 3. Tiempos y Alineación
- Usa `faster_whisper` (modelo small, GPU CUDA si existe) para extraer los timestamps palabra por palabra.
- Con los tiempos exactos de la voz, alinea las animaciones y los efectos de sonido en `warp.py`. La voz manda siempre la duración.

## 4. Mezcla con FFmpeg
- Voz con `loudnorm=I=-16:TP=-1.5`
- Efectos de sonido generados con `mix.py` en numpy
- Unión: `ffmpeg -i video_sin_audio.mp4 -i audio.wav -c:v copy -c:a aac -b:a 192k -shortest final.mp4`
