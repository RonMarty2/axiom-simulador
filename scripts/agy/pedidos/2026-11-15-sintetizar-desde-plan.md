# Pedido: grabar solo los bloques nuevos de un plan y armar el capítulo en una carpeta nueva

Lee y sigue C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/CLAUDE.md. Usa la skill `libro-audio-tts`. Contexto: `docs/audio-bloques/README.md`, `docs/audio-bloques/plan_sintesis.py`, `docs/audio-bloques/armar_desde_plan.py` (los planes ya existen en `docs/audio-bloques/plan/*.json`).

Motor de referencia (NO está en git, NO lo edites, solo impórtalo o copia funciones): `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO/sintetizar_libro.py` (`cargar_pool_keys`, `sanitizar_texto_para_tts`, el armado de `GenerateContentConfig` con voz Puck, `concatenar_archivos_wav`, `convertir_wav_a_mp3`, el manejo de 429 rotando claves). Ruta real: C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO/

## Escribir `docs/audio-bloques/sintetizar_desde_plan.py`
`python sintetizar_desde_plan.py <ruta _MOTOR_AUDIO> <plan/capitulo.json> [--solo-nuevos] [--seco] [--modelo gemini-3.1-flash-tts-preview]`
- Destino: `<_MOTOR_AUDIO>/_cache_v2/<carpeta_cache>/parte_{j:03d}.wav` (carpeta_cache con la regla de `plan_sintesis.carpeta_cache_de_stem`). NUNCA escribe, borra ni mueve nada en `_cache/`.
- REUSAR → copia el wav de `_cache/<carpeta>/<origen>`.
- SINTETIZAR con motivo «nuevo» → sintetiza el TEXTO COMPLETO del bloque j (recalcula los bloques del texto actual con `bloques_afectados.dividir_capitulo_en_bloques(..., max_palabras=100)` y verifica que el inicio coincide con `texto_inicio` del plan; si no coincide, aborta ese capítulo), pasándolo por `sanitizar_texto_para_tts`, voz Puck, con UN SOLO modelo fijo (`--modelo`; ante 429 rota claves, no modelos; si se agotan, espera y reintenta, y al final lo informa).
- SINTETIZAR con motivo «error audible…» → con `--solo-nuevos`, copia el wav viejo de `antes parte_XXX` (sale del texto del motivo) en lugar de sintetizar; sin esa bandera, lo lista como pendiente y no arma el capítulo.
- Si un wav de destino ya existe y >1000 bytes, no lo rehace (permite retomar).
- Al final, si están las N partes: une los wav en orden a `<_MOTOR_AUDIO>/_AUDIO_V2/<capitulo>.wav` y `.mp3` (no toca los audios publicados) y escribe `<_MOTOR_AUDIO>/_cache_v2/<carpeta>/manifiesto.json` con {j, accion, origen, modelo, texto_inicio, sha1 del texto del bloque}.
- `--seco`: no llama a la API ni copia; imprime qué haría.
- `sys.stdout.reconfigure(encoding='utf-8')`. Sin dependencias nuevas (usa `google.genai` como el motor).

## Pruebas `docs/audio-bloques/probar_sintetizar_desde_plan.py`
Con un capítulo falso en carpeta temporal y la función de síntesis reemplazada por una falsa (no llama a la API): copia los REUSAR, sintetiza solo «nuevo», con `--solo-nuevos` copia el viejo en «error audible», no toca `_cache/`, retoma sin rehacer, aborta si `texto_inicio` no coincide, y arma el manifiesto.

## Respuesta
Archivos creados y salida de las pruebas.
