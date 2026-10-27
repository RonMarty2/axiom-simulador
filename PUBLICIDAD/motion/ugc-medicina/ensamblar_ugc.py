import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(os.path.dirname(HERE))
FINAL_DIR = os.path.join(BASE_DIR, "final")
FRAMES_DIR = os.path.join(HERE, "frames")
VOZ_WAV = os.path.join(BASE_DIR, "audio", "voz_gemini_aoede.wav")
MP4_NO_AUDIO = os.path.join(FINAL_DIR, "ugc-medicina-sin-audio.mp4")
MP4_FINAL = os.path.join(FINAL_DIR, "ugc-medicina-v1.mp4")

def main():
    os.makedirs(FINAL_DIR, exist_ok=True)

    print("==================================================")
    print("ENSAMBLADOR UGC: MEDICINA UMSS (Google Neural)")
    print("==================================================")

    # 1. Renderizar frames con Playwright
    print("\n[PASO 1/2] Renderizando 837 frames en Playwright...")
    render_script = os.path.join(HERE, "render.py")
    subprocess.run([sys.executable, render_script, "full"], check=True)

    # 2. Compilar con ffmpeg uniendo con la voz de Google
    print("\n[PASO 2/2] Compilando y mezclando con voz de Google Gemini...")
    # Frames a MP4
    cmd_video = [
        "ffmpeg", "-y", "-r", "30",
        "-i", os.path.join(FRAMES_DIR, "f_%04d.png"),
        "-c:v", "libx264", "-pix_fmt", "yuv420p",
        "-preset", "fast", "-crf", "18",
        MP4_NO_AUDIO
    ]
    subprocess.run(cmd_video, check=True)
    print(f"Video base listo: {MP4_NO_AUDIO}")

    # Unir con la voz de Google
    cmd_mux = [
        "ffmpeg", "-y",
        "-i", MP4_NO_AUDIO,
        "-i", VOZ_WAV,
        "-filter_complex", "[1:a]loudnorm=I=-16:TP=-1.5[a]",
        "-map", "0:v", "-map", "[a]",
        "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        MP4_FINAL
    ]
    subprocess.run(cmd_mux, check=True)

    print("\n==================================================")
    print(f"VIDEO FINAL UGC GENERADO EXITOSAMENTE!")
    print(f"Archivo: {MP4_FINAL}")
    print("==================================================")

if __name__ == "__main__":
    main()
