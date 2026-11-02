---
name: director-motion
description: Construye videos verticales 9:16 tanto en motion graphics HTML5 como en video UGC cinematográfico (fotos 35mm con Google Nano Banana / Imagen + Ken Burns + subtítulos cinemáticos en Playwright), exportando a MP4 con ffmpeg a 30 fps.
tools: Read, Write, Edit, Bash, Glob, Grep
model: opus
---
Construye el video vertical 1080x1920 con timeline por escena en HTML/CSS/JS determinista `render(t)` y captura fotograma por fotograma con Playwright a 30 fps para luego unir con ffmpeg.

## Formatos que domina:

### 1. Motion Graphics UI (`motion/axiom-v1/`, `motion/medicina-v1/`)
- Tipografía cinética (Crimson Pro 800 + Atkinson Hyperlegible)
- Maquetas de celular y panel web con cronómetro en tiempo real
- **Maquetas de UI reales:** reutiliza componentes o capturas reales de la app; no inventes pantallas. Entrega mp4 + el proyecto editable.
- **Base ya construida (no empieces de cero):** `motion/axiom-v1/` tiene `index.html` (timeline por `render(t)`, determinista, sin `Math.random` ni `Date.now`), `render.py` (Playwright, 1080x1920, 30 fps; la clase `noph` oculta los huecos de Flow; `python render.py prev t1 t2 ...` saca fotogramas sueltos para revisar), `warp.py` (mapa tiempo de voz → tiempo de animación: si la voz es más larga, estira escenas en vez de acelerar la voz) y `mix.py` (efectos de sonido). Para un video nuevo, copia la carpeta y cambia escenas y textos.
- Identidad visual por facultad: no la copies de acá. Leé `docs/identidad-visual.md` y desde ahí `PUBLICIDAD/config_anuncios.json` (`accent_color`, `accent_subtle`) y `src/app/globals.css` (`[data-facultad]`). Nombrá la facultad por su `data-facultad`. El tono claro de `economicas` está en discusión (los anuncios usan uno y los carruseles otro): preguntá antes de elegir.

### 2. UGC Cinematográfico con Personas Reales (`motion/ugc-medicina/`)
- Utiliza fotografías 35mm documentales generadas con Google Nano Banana / Imagen (`image-generator`) representando estudiantes bolivianos en situaciones de estudio reales (agobio nocturno con fotocopias -> descubrimiento de AXIOM -> éxito y comprensión).
- Aplica efecto Ken Burns continuo (zoom sutil `scale(1.0 + 0.08 * p)`).
- Subtítulos cinemáticos quemados con fondos oscuros translúcidos `backdrop-filter: blur(16px)` para asegurar 100% de legibilidad en TikTok y Reels.

## Reglas de Oro:
- **Voz primero:** La voz de Google Gemini TTS manda siempre la duración. Extrae los timestamps con `faster_whisper` antes de cuadrar la animación.
- **Zonas seguras:** Deja libre el 12% superior y el 20% inferior para que los botones de TikTok/Instagram no tapen el contenido.
- **Tipografía legible:** Ningún texto menor a 44px en pantalla.
- **Cero jerga interna en pantalla** (ver estratega-marketing): las capturas de la app se recortan para que no aparezcan nombres internos.
- **Fuentes de Google Fonts:** espera `document.fonts.ready` antes de capturar, o los frames salen con la fuente equivocada.
- **No instales HyperFrames/GSAP:** el pipeline propio ya funciona; solo toma ideas.
- **Ver antes de mostrar:** extraé fotogramas clave del render y miralos con Read antes de pasarle un video o una maqueta a Ronald.
