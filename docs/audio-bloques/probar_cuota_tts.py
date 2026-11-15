"""Prueba si la voz de Google (Gemini TTS, Puck, modelo fijo) tiene cuota: una frase corta por clave.
Sale 0 si alguna clave sintetiza, 1 si todas fallan. Uso: python probar_cuota_tts.py <_MOTOR_AUDIO>"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
import sintetizar_desde_plan as S
motor = Path(sys.argv[1])
cfg = S.types.GenerateContentConfig(response_modalities=["AUDIO"], speech_config=S.types.SpeechConfig(
    voice_config=S.types.VoiceConfig(prebuilt_voice_config=S.types.PrebuiltVoiceConfig(voice_name=S.VOZ_OFICIAL))))
modelo = "gemini-3.1-flash-tts-preview"
for i, k in enumerate(S.cargar_pool_keys(motor)):
    try:
        c = S.genai.Client(api_key=k)
        r = c.models.generate_content(model=modelo, contents="Hola.", config=cfg)
        if r.candidates and r.candidates[0].content:
            print(f"CUOTA OK (clave {i})"); sys.exit(0)
    except Exception as e:
        print(f"clave {i}: {str(e)[:80]}")
print("SIN CUOTA"); sys.exit(1)
