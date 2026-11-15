# Lista de bloques de audio cuyo texto cambia con la pieza fonética nueva

Contexto: los audiolibros de Medicina se sintetizan desde `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/*_LITERAL_TTS.md`, cortados en bloques que quedan en `_MOTOR_AUDIO/_cache/<nombre>/parte_NNN.wav`. La conversión a palabras cambió (pieza `fonetica_es.py`, ver `extraer_literal_pdf.py`: `adaptar_fonetica_literal` ahora delega en ella; la vieja está en `extraer_literal_pdf.py.bak_1115`). NO se sintetiza nada: solo se quiere saber QUÉ bloques habría que rehacer.

Lee (solo lectura) `_MOTOR_AUDIO/sintetizar_libro.py` y `sintetizar_paralelo.py` para entender EXACTAMENTE cómo se corta un .md en bloques `parte_NNN` (tamaño, separadores, numeración, qué se limpia antes). Lee también uno o dos `extraer_tema_*.py` / `extraer_morfo_cap_*.py` / `preparar_*_limpio.py` para ver si el .md sale directo de `adaptar_fonetica_literal` o tiene pasos a mano después.

Escribe `scripts/audio/bloques_afectados.py` (solo biblioteca estándar; no importes fitz ni toques archivos de audio):
1. Argumentos: ruta de `_MOTOR_AUDIO` y, opcional, nombre de un .md.
2. Para cada `*_LITERAL_TTS.md`: lo corta en bloques con la MISMA regla que el sintetizador (copia la función de corte o impórtala si se puede sin efectos secundarios).
3. A cada bloque le aplica `fonetica_es.normalizar(bloque, siglas=SIGLAS_MEDICINA, reemplazos=REEMPLAZOS_MEDICINA, notas_al_pie=True)` importando desde `extraer_literal_pdf` (agrega `_MOTOR_AUDIO` a sys.path). Como el .md ya es texto convertido, lo que cambie al re-normalizarlo es lo que la pieza nueva arregla o tocaría. Ojo: si el .md ya no tiene dígitos, compara además con lo que sale de `revisar` (miles mal leídos tipo «un coma cinco cero cero», «coma un», palabras cortadas «xxx- yyy», «figura», «fi gura», «p. »), porque esos errores ya están escritos en palabras y `normalizar` no los ve.
4. Salida: un CSV `bloques_afectados.csv` (archivo, bloque NNN, tipo de problema, extracto viejo de 80 caracteres, extracto nuevo) y un resumen por archivo: bloques totales, bloques afectados, de ellos cuántos por «miles leídos como decimal».
5. Detecta los «miles» ya escritos con un patrón sobre palabras: número en palabras + «coma» + dígitos sueltos en palabras de 3 cifras exactas («un coma cinco cero cero»).

Pruebas en `scripts/audio/probar_bloques_afectados.py` con textos de ejemplo (sin depender de archivos reales). En RESPUESTA.md explica la regla de corte que encontraste (con archivo y línea) y cómo correr el script.
