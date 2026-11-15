# Pedido: plan de síntesis que reusa el audio por TEXTO del bloque (no por número)

Lee y sigue C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/CLAUDE.md. Usa la skill `libro-audio-tts` (y `libro-audio-auditor` para las clases de error audible). Contexto: `docs/audio-bloques/README.md`.

## Problema
El motor (`examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO/sintetizar_libro.py`, NO está en git: no lo edites) guarda cada bloque como `_cache/<capítulo>/parte_NNN.wav` y lo reusa por NÚMERO. Recortamos los textos (`_TEXTO_LITERAL_VERIFICADO/`); el texto de antes está en `_RESPALDO_TEXTO_LITERAL_2026-11-15_antes_de_recorte/`. Al cambiar la cantidad de bloques, reusar por número pega audio de otro bloque. Hay que reusar por el TEXTO.

## Qué escribir (en `docs/audio-bloques/`, solo archivos nuevos)
1. `plan_sintesis.py <ruta _MOTOR_AUDIO> [--salida <dir>]`. Por cada `*_LITERAL_TTS.md` de `_TEXTO_LITERAL_VERIFICADO`:
   - Bloques viejos = `bloques_afectados.dividir_capitulo_en_bloques(texto_respaldo, max_palabras=100)` (módulo en `docs/audio-bloques/script_agy/`). Carpeta de caché: mismo nombre que el texto sin `.md`, salvo Saladin: `Tema_NN_Morfo_Saladin…` → `Morfo_Cap_NN_Saladin_LITERAL_TTS`, `Atlas_B…` → `Morfo_Atlas_B_Saladin_LITERAL_TTS` (copia la regla de `coincide.py`).
   - Si la cantidad de `parte_*.wav` == cantidad de bloques viejos → capítulo MAPEABLE: bloque viejo i ↔ `parte_{i:03d}.wav`. Si no → `SIN_MAPA` (no se toca; se lista aparte).
   - Bloques nuevos = misma división del texto actual. Para cada bloque nuevo j de un capítulo mapeable: si su texto exacto está entre los viejos → `REUSAR parte_XXX`; si no → `SINTETIZAR (nuevo)`. Además marca `SINTETIZAR (error audible)` los reusables que tengan iones (Na+, K+, Ca2+, Cl−…), μ o miles leídos como decimal, con la misma lógica de `cuentaA.py`.
   - Salida: `plan/<capítulo>.json` (lista ordenada de {j, accion, origen, motivo, texto_inicio(60 chars)}) y `plan/RESUMEN.txt` (por capítulo: bloques, reusar, sintetizar nuevos, sintetizar por error, o SIN_MAPA con texto/audio; y totales).
   - Solo LEE la caché; nunca borra, mueve ni renombra audio.
2. `armar_desde_plan.py <ruta _MOTOR_AUDIO> <plan/capítulo.json> --destino <dir> [--seco]`: copia (no mueve) los `REUSAR` a `<destino>/parte_{j:03d}.wav` y lista los `SINTETIZAR` pendientes. En `--seco` solo imprime. No llama a la API.
3. `probar_plan_sintesis.py`: pruebas con un capítulo falso en una carpeta temporal (wav falsos de >1000 bytes): bloque quitado al medio → los siguientes se reusan con su parte correcta (desplazada); bloque nuevo → SINTETIZAR; capítulo con cuenta distinta → SIN_MAPA; armar copia y no borra el original.

Scripts: `sys.stdout.reconfigure(encoding='utf-8')`, Python 3.11 estándar, sin dependencias nuevas.

## Formato de la respuesta
Lista de archivos creados, salida de las pruebas, y nada más.
