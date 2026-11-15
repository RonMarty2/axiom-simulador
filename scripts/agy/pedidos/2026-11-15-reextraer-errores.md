# Pedido: re-extraer del PDF el texto de los bloques con «error audible» y grabarlos

Lee y sigue C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/CLAUDE.md. Usa la skill `libro-audio-tts`. Contexto: `docs/audio-bloques/README.md`, `docs/audio-bloques/plan_sintesis.py`, `docs/audio-bloques/sintetizar_desde_plan.py`, `docs/audio-bloques/audible.py`, los planes `docs/audio-bloques/plan/*.json`.

## Problema
En 26 capítulos hay 381 bloques con motivo `error audible (iones|μ|miles…; antes parte_XXX.wav)`. Su texto en `_TEXTO_LITERAL_VERIFICADO/*_LITERAL_TTS.md` ya fue convertido a palabras por un motor viejo que leía mal iones, μ y miles («Na más», «un coma cinco cero cero», «cero, un»). Volver a pasar `fonetica_es.normalizar` sobre ese texto NO lo arregla. Hay que tomar el texto CRUDO del PDF para ese mismo tramo y convertirlo con el extractor nuevo.

Piezas (NO están en git; solo léelas/impórtalas, no las edites):
- `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO/extraer_literal_pdf.py`: `extraer_capitulo_literal(pdf, pag_ini, pag_fin)` (texto crudo, PyMuPDF) y `adaptar_fonetica_literal(texto)` (usa `fonetica_es` de `C:/Users/lmigu/SynologyDrive/12.NUBES/_AGENTES_CENTRAL/herramientas/`).
- PDFs en `examenes pasados/MEDICINA/LIBROS DE MEDICINA/libros_extraidos/Libros del curso básico de Medicina UMSS.Prepa William Osler/`: Calvo = `Biologia_Celular_Biomedica_St_Alfonso_Ca-1.pdf` (capítulos `Tema_NN_Biologia_Celular_*`), Saladin = `morfofisiliologia-saladin-anatomia-y-fisiologia (1).pdf` (`Tema_NN_Morfo_Saladin_*`, `Atlas_*`).
- Ruta real de todo: C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/examenes pasados/MEDICINA/LIBROS DE MEDICINA/

## 1. `docs/audio-bloques/reextraer_errores.py`
`python reextraer_errores.py <ruta _MOTOR_AUDIO> <plan/capitulo.json> [--salida docs/audio-bloques/reextraido]`
- Recalcula los bloques del texto actual como lo hace `sintetizar_desde_plan.py` (mismo divisor, `max_palabras=100`) y comprueba `texto_inicio`.
- Extrae el texto crudo del libro que corresponde (todas las páginas una vez; guarda caché en la carpeta de salida para no releer el PDF en cada capítulo).
- Para cada bloque j con motivo «error audible»: ubica en el crudo el tramo que corresponde, anclando por las PALABRAS ALFABÉTICAS (sin números ni símbolos, minúsculas, sin tildes) del principio y del final del bloque, buscando después de donde quedó el bloque anterior con error (orden del libro). Toma el crudo desde la primera palabra del bloque hasta la última, inclusive (si el bloque termina en número o símbolo, incluye ese número/símbolo). Lo convierte con `adaptar_fonetica_literal`.
- Control por bloque: similitud (difflib) entre las palabras alfabéticas del bloque viejo y del nuevo, quitando de ambos las palabras-número («uno», «cero», «coma», «mil», «más», «menos»…, la lista que uses, escríbela). Estado `OK` si ≥ 0,92, primera y última palabra alfabética iguales, y el texto nuevo no tiene dígitos ni `μ µ + − ± % ° ×` sueltos; si no, `REVISAR` con el motivo.
- Escribe `<salida>/<capitulo>.json`: lista de {j, estado, motivo, similitud, pagina, texto_viejo, texto_nuevo}. No modifica `_TEXTO_LITERAL_VERIFICADO/` ni nada de `_MOTOR_AUDIO/`.
- Imprime por capítulo: N bloques, OK, REVISAR. Con `--todos` recorre los 26 planes y al final imprime el total y 10 ejemplos viejo→nuevo de los cambios.

## 2. `sintetizar_desde_plan.py`: opción `--textos <reextraido/capitulo.json>`
- Con `--textos`, los bloques «error audible» con estado `OK` se SINTETIZAN con `texto_nuevo` (mismo modelo fijo, voz Puck, misma sanitización); los `REVISAR` copian el wav viejo y se listan al final como pendientes. Sin `--textos`, todo sigue exactamente igual que hoy.
- Destino el mismo `_cache_v2/`; si existe una parte copiada del wav viejo (no sintetizada), debe rehacerla: usa el `manifiesto.json` (acción/origen por j) para saber si la parte actual es copia vieja; agrega al manifiesto `texto_fuente: "reextraido"` y el sha1 de `texto_nuevo`.
- Rearma `_AUDIO_V2/<capitulo>.wav/.mp3` al final, como hoy. `--seco` sigue sin llamar a la API.

## Pruebas
`docs/audio-bloques/probar_reextraer_errores.py`: crudo falso (sin PDF real; reemplaza la extracción por un texto fijo) con «Na+», «1,500 μm», «0,1 %» dentro de bloques; comprueba que ubica el tramo correcto aunque haya dos tramos parecidos, que marca REVISAR cuando no encuentra el ancla, y que no toca archivos fuera de la salida. Amplía `probar_sintetizar_desde_plan.py` para `--textos`: sintetiza OK con texto_nuevo, copia REVISAR, rehace una parte que antes era copia vieja, no toca `_cache/`. Las pruebas viejas deben seguir pasando.

## Respuesta
Archivos creados/cambiados y salida de las pruebas. No corras la extracción real ni la síntesis real.
