import os
import sys
from google import genai
from google.genai import types

KEY = os.environ.get("GEMINI_API_KEY", "")
client = genai.Client(api_key=KEY)

text = "Hola, esta es una prueba de voz con el modelo oficial Gemini de Google."
out_file = r"c:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\PUBLICIDAD\audio\gemini_tts_test.wav"

try:
    print("Invocando gemini-3.8-flash-tts...")
    sys.stdout.flush()
    response = client.models.generate_content(
        model="gemini-3.8-flash-tts",
        contents=text,
        config=types.GenerateContentConfig(
            response_modalities=["AUDIO"],
            speech_config=types.SpeechConfig(
                voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(
                        voice_name="Aoede"
                    )
                )
            ),
        ),
    )
    for part in response.parts:
        if part.inline_data:
            with open(out_file, "wb") as f:
                f.write(part.inline_data.data)
            print(f"EXITO: Audio generado en {out_file}")
            sys.stdout.flush()
            break
except Exception as e:
    print(f"Error: {e}")
    sys.stdout.flush()
