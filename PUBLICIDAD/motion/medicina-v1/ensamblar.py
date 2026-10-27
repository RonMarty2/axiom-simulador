import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(os.path.dirname(HERE))
FINAL_DIR = os.path.join(BASE_DIR, "final")
FRAMES_DIR = os.path.join(HERE, "frames")
FX_WAV = os.path.join(HERE, "fx.wav")
MP4_NO_AUDIO = os.path.join(FINAL_DIR, "medicina-v1-sin-audio.mp4")
MP4_FINAL = os.path.join(FINAL_DIR, "medicina-v1.mp4")

def main():
    os.makedirs(FINAL_DIR, exist_ok=True)

    print("==================================================")
    print("ENSAMBLADOR DE VIDEO: MEDICINA UMSS v1 (9:16)")
    print("==================================================")

    # 1. Generar audio FX
    print("\n[PASO 1/3] Generando efectos de sonido sintetizados (fx.wav)...")
    import mix
    mix.generar_audio()

    # 2. Renderizar frames con Playwright
    print("\n[PASO 2/3] Renderizando 720 frames en Playwright...")
    render_script = os.path.join(HERE, "render.py")
    subprocess.run([sys.executable, render_script, "full"], check=True)

    # 3. Compilar con ffmpeg
    print("\n[PASO 3/3] Compilando con ffmpeg...")
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

    # Unir con audio FX
    cmd_mux = [
        "ffmpeg", "-y",
        "-i", MP4_NO_AUDIO,
        "-i", FX_WAV,
        "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        MP4_FINAL
    ]
    subprocess.run(cmd_mux, check=True)

    print("\n==================================================")
    print(f"VIDEO FINAL GENERADO EXITOSAMENTE!")
    print(f"Archivo: {MP4_FINAL}")
    print("==================================================")

if __name__ == "__main__":
    main()
