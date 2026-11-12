# reanimate (github.com/reanimate/reanimate) — evaluado 07-11-2026 por el taller

1. **Qué es:** biblioteca de **Haskell** para hacer animaciones a partir de dibujos SVG (como Manim, pero en Haskell). Escribes código, sale un MP4/GIF/WebM. Trae LaTeX, transformación de formas (morph), física, Blender y POV-Ray, y un módulo `Voice.hs` que sincroniza la animación con la voz usando una transcripción alineada (Gentle).
2. **Licencia:** Unlicense (dominio público), leída en el archivo LICENSE. Uso comercial libre.
3. **Salud:** 1.297 estrellas, 31 issues abiertos, no archivado. Versión 1.1.7.0. Los commits reales son de dic-2022 (el de feb-2025 es suelto). Compila con GHC 8.10 / LTS 17 (2021). **Prácticamente sin mantenimiento.**
4. **Peso y dónde corre:** el clon superficial pesa 18 MB. Necesita GHC + stack, que **no están instalados** en esta PC, más LaTeX y ffmpeg. Solo sirve para producir videos fuera de la app: no corre en el celular ni en Next.js.
5. **Contra lo que hacemos:**
   - Animaciones de resolución de Axiom: hoy son generadores TS/HTML en la app. Reanimate es **peor**, porque produce video, no pasos interactivos.
   - Videos del libro jamovi / `video-tutorial` (Playwright + HTML + FFmpeg + `mix.py`) y `director-motion` (HTML5): reanimate rinde **igual o peor** y añade un lenguaje (Haskell) que nadie del sistema usa, ni agy.
   - **Lo único valioso:** `Voice.hs`. Cada palabra de la narración trae su segundo exacto y la animación se engancha a la palabra, en vez de cuadrar los tiempos a mano.
6. **Prueba chica:** no se hizo. Instalar GHC cuesta varios GB y no se justifica para un DESCARTAR.
7. **Costo de integrar:** alto (cadena Haskell en 2 PC, sin mantenimiento).
8. **Decisión: TOMAR LA IDEA, no la biblioteca.** La idea: alinear la voz por palabra (con whisper con marcas por palabra, o con las marcas del TTS) y que el guion diga «al decir *media*, aparece la flecha». Mejora `video-tutorial` (`mix.py`) y `director-motion`. Si algún día hace falta animar matemáticas a video, conviene Manim (Python), no esto.

Confianza: media (se leyeron el código y la licencia, no se compiló).
