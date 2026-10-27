# Cuaderno de lecciones (PUBLICIDAD)

Formato: `fecha · ERROR|ACIERTO|SUERTE · qué pasó · qué hacer la próxima vez`. Léelo antes de empezar un video; al terminar, agrega lo aprendido.

- 2026-10-04 · ERROR · El video v1 cerró con la nota "Unidad 01 de cada área": es jerga de quien programó, el espectador no la entiende. · Todo texto en pantalla se escribe para quien ve Axiom por primera vez; pasa `revisor-video` antes de entregar.
- 2026-10-04 · ERROR · La v1 del guion decía "cada pregunta paso a paso" junto a "Empieza gratis", pero el paso a paso es Premium. · Verifica gratis/Premium en `src/app/precios` antes de escribir; una promesa por video (ver serie en estratega-marketing).
- 2026-10-04 · ERROR · Se puso la instrucción de estilo dentro del texto de Gemini TTS y la voz la iba a leer. · Va en el campo Style.
- 2026-10-04 · ACIERTO · Estirar las animaciones a la voz (`warp.py`) en vez de acelerar la voz: la voz conserva su naturalidad. · Repetir en todos los videos.
- 2026-10-04 · ACIERTO · Gemini TTS (voz Nika) sonó natural a Ronald; Helena (Windows) fue "horrible". · Usar Gemini TTS; no perder tiempo en voces de Windows ni Coqui.
- 2026-10-04 · SUERTE · Playwright de Python ya estaba instalado y renderizó 1.140 frames sin problemas. · No asumir que está en otra máquina.
- 2026-10-04 · ACIERTO · Analizar el audio de la referencia (espectrograma) mostró que no hay música sino decenas de efectos de interfaz. · Analizar el audio de una referencia antes de decidir si hace falta música.
- 2026-10-04 · PENDIENTE · Etiquetas "2005"/"2025" cortadas en la escena 6; escena 4 sin clip de Flow. · Corregir cuando termine Axiom.
- 2026-10-26 · ACIERTO · Las voces sintéticas tipo robótico suenan mal para Ronald; usar exclusivamente Google Gemini Neural TTS (`gemini-3.8-flash-tts` con SDK `google.genai` y voces oficiales Aoede, Kore o Nika).
- 2026-10-26 · ERROR · Claves vinculadas a proyectos de Google Cloud sin créditos activos arrojan 402 RESOURCE_EXHAUSTED. La clave de Ronald asociada a Google AI Studio Premium funciona directamente con los modelos 3.8 TTS.
- 2026-10-26 · ACIERTO · Formato UGC cinematográfico (Opción A): 3 tomas 35mm con Google Imagen 3 de estudiante boliviana real (dolor/fotocopias -> descubrimiento de AXIOM -> alivio/éxito) animadas con zoom Ken Burns continuo y subtítulos cinemáticos sincronizados en Playwright a 30 fps. Es el formato de mayor retención para TikTok/Reels.
- 2026-10-26 · ERROR · Confusión de calendario en Medicina UMSS: la admisión es ANUAL (Curso Básico único al año). Decir "te cuesta el semestre" era un error académico y sonaba a cuota comercial. La redacción correcta es "te cuesta tu cupo en la facultad".
- 2026-10-26 · ACIERTO · Desacople total de afiches en `PUBLICIDAD/config_anuncios.json`: `"anio": null` renderiza automáticamente afiches perennes sin año, y `"anio": "2026"` actualiza todas las piezas en 5 segundos con `python scripts/generar_anuncios.py`.
