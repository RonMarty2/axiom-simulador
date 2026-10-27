import numpy as np
import wave
import os

SR = 44100
DUR = 24.0
N = int(DUR * SR)
rng = np.random.default_rng(42)

def lp(x, k):
    return np.convolve(x, np.ones(k) / k, mode='same')

def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(t / a, 1) * np.exp(-t / d)

def click(f=1800, d=0.018):
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) * 0.6 + rng.standard_normal(n) * 0.25) * env(n, 0.0008, d)

def pop(f=420, d=0.05):
    n = int(0.2 * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * (f + f * 1.2 * np.exp(-t / 0.02)) * t) * env(n, 0.001, d)

def whoosh(dur=0.5):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    t = np.linspace(0, 1, n)
    y = lp(x, 6) - lp(x, 60)
    y = y * np.sin(np.pi * t)**2
    return y / (np.abs(y).max() + 1e-9)

def buzzer(dur=0.4):
    n = int(dur * SR)
    t = np.arange(n) / SR
    # Onda cuadrada disonante para error
    y = np.sign(np.sin(2 * np.pi * 150 * t)) * 0.5 + np.sign(np.sin(2 * np.pi * 158 * t)) * 0.5
    e = np.minimum(t / 0.02, 1) * np.exp(-t / 0.25)
    return y * e

def chord(dur=2.5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = 0
    for f, g in [(440, 1.0), (554.37, 0.8), (659.25, 0.7), (880, 0.4)]:
        y = y + g * np.sin(2 * np.pi * f * t) * (1 + 0.002 * np.sin(2 * np.pi * 5 * t))
    e = np.minimum(t / 0.04, 1) * np.exp(-t / 0.9) * np.minimum((dur - t) / 0.4, 1)
    return y * e / (np.abs(y).max() + 1e-9)

def generar_audio():
    fx = np.zeros(N)
    
    def put(t_sec, s, g):
        i = int(t_sec * SR)
        s = s * g
        m = min(len(s), N - i)
        if m > 0 and i >= 0:
            fx[i:i+m] += s[:m]

    # Escena 1 (Gancho)
    put(0.3, whoosh(0.4), 0.25)
    put(1.2, pop(320), 0.35)
    put(2.5, click(2000), 0.30)
    put(4.0, whoosh(0.5), 0.30)

    # Escena 2 (Pregunta)
    put(4.8, pop(440), 0.40)
    put(6.2, click(1600), 0.25)
    put(7.8, click(1800), 0.30)
    put(9.2, pop(580), 0.45) # Marcar la respuesta equivocada

    # Escena 3 (El Error y Revelación)
    put(11.4, buzzer(0.35), 0.40) # Sello de error
    put(12.2, whoosh(0.4), 0.25)
    put(13.5, click(2200), 0.30)
    put(15.2, pop(500), 0.35)
    put(17.0, whoosh(0.5), 0.30)

    # Escena 4 (AXIOM CTA)
    put(17.8, pop(480), 0.40)
    put(19.2, click(1900), 0.30)
    put(20.5, pop(620), 0.45)
    put(21.0, chord(2.8), 0.35) # Acorde final
    put(22.0, click(2400), 0.25)

    fx = np.clip(fx, -1, 1)
    out_path = os.path.join(os.path.dirname(__file__), "fx.wav")
    with wave.open(out_path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((fx * 32767 * 0.9).astype(np.int16).tobytes())
    print(f"[AUDIO] fx.wav generado exitosamente: {out_path} ({DUR}s)")

if __name__ == "__main__":
    generar_audio()
