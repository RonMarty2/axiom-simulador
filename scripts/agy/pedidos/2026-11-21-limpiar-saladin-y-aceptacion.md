# Pedido a agy (código sobre copia): limpiador determinista de ruido residual de Saladin + refuerzo de aceptacion.py

Sigue las reglas de `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md` y usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero:
- `agentes/libro-audio-tts.md` (regla 10: quitar encabezados repetidos, preguntas de autoevaluación y notas al pie; mantener objetivos; regla 18: títulos en su propia línea)
- `agentes/libro-audio-auditor.md` (protocolo de 12 revisiones)
- `docs/audio-bloques/aceptacion.py` y `docs/audio-bloques/probar_aceptacion.py`
- `docs/audio-bloques/corregir_textos_v2.py` (para seguir el mismo estilo, convenciones y uso de `Saladin_texto_paginas.txt`)

## Problema medido hoy (21-11) en los 31 capítulos de Morfofunción (Saladin)
Al auditar los 31 archivos `*Saladin*_LITERAL_TTS.md` en `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/` (carpeta ignorada por git; usa los ejemplos reales de abajo y si necesitas leer ejemplos adicionales están en la ruta del repo principal `C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\`), todavía pasan sin ser detectados por `aceptacion.py`:
1. **388 encabezados de página incrustados**: `PARTE (UNO|DOS|TRES|CUATRO|CINCO) <título de la parte>` (ej.: `PARTE UNO Organización del cuerpo`, `PARTE DOS Soporte y movimiento`, `PARTE TRES Integración y control interno`, `PARTE CUATRO Regulación y mantenimiento`, `PARTE CINCO Reproducción y desarrollo`) y `CAPÍTULO <número en palabras> <título del capítulo>` repetidos en medio del texto (NO tocar el título principal al inicio del archivo).
   - OJO: a veces el encabezado parte una palabra en dos, ej.: `en las glánduPARTE CINCO Reproducción y desarrollo las mamarias` → debe quedar `en las glándulas mamarias` (si al quitar el encabezado queda una palabra cortada a la izquierda + fragmento a la derecha, verificar la unión contra el vocabulario del propio texto o de `Saladin_texto_paginas.txt`).
2. **172 preguntas de autoevaluación con viñeta `●`** al pie de figuras de Saladin, ej.:
   - `...del plano medio. ●¿Cae la mayor parte del corazón a la derecha o a la izquierda del plano medio?`
   - `...en el texto. ●Explique por qué la curva de presión aórtica empieza a subir de manera marcada a casi cero coma cinco segundos.`
   - `...el ácido cítrico. ●Mencione el equilibrio acidobásico que resulta de la acumulación de los cuerpos cetónicos mostrados en el óvalo.`
   - `...ácido cítrico. ●Encuentre en el diagrama una ruta para la gluconeogénesis.`
   - `...en el molar. ●De todos los componentes mostrados aquí, ¿cuál o cuáles no corresponden a tejidos vivos? Nombres de los dientes...` (ojo: quitar SOLO la pregunta hasta `?` o punto final de la oración de pregunta/imperativo, conservando cualquier texto/tabla que venga después!).
   - `...veintitrés pares. ●Aunque se pasen a los descendientes los mismos gametos que se heredan de los padres, no se pueden pasar los mismos cromosomas. ¿Qué proceso de esta figura es responsable de este último hecho?` (dos oraciones donde la segunda es `¿...?`).
   - `...intestino grueso. ●¿Cuál esfínter anal es controlado por el sistema nervioso autónomo? ¿Cuál es controlado por el sistema nervioso somático? Explique sus respuestas.` (varias preguntas seguidas tras `●`).
3. **895 glosas etimológicas de notas al pie** (regla 10), ej.:
   - `veintitrés lute igual a amarillo. veinticuatro alb igual a blanco.`
   - `cuatro gleuk igual a azúcar; lysis igual a separación.`
   - `seis kyto igual a célula; khrom igual a color.`
   - `...a y cuatro helik igual a espiral.` / `...acia fuera; iacul igual a lanzar.` / `...de color verde; asma igual a ser.` / `...l a cuantioso; par igual a parir.` / `...cia afuera; lamp igual a brillar.`
   - Notas biográficas al pie tras número en palabras: `catorce Caspar Bartholin, mil seiscientos cincuenta y cinco a mil setecientos treinta y ocho, anatomista danés. quince Alexander J. C. Skene, mil ochocientos treinta y ocho a mil novecientos, ginecólogo estadounidense.`
   - CUIDADO: NO tocar expresiones químicas o matemáticas legítimas del cuerpo como `pH igual a siete coma cuatro`, `R igual a región`, `presión igual a fuerza entre área`, `es igual a`. Las glosas etimológicas de Saladin llevan una raíz breve/griega-latina seguida de `igual a <traducción>` (frecuentemente precedidas por un número en palabras `uno..cincuenta` o punto y coma `;`).

## Qué construir (en esta copia del repo)
1. **`docs/audio-bloques/limpiar_saladin_ruido.py`**:
   - CLI: `python docs/audio-bloques/limpiar_saladin_ruido.py [--seco] [--solo Tema_XX_Morfo_Saladin]`
   - Recorre los `*Saladin*_LITERAL_TTS.md` en `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/` (resuelve la ruta relativa al repo o `--dir`).
   - Aplica de forma conservadora y 100 % determinista la limpieza de los 3 patrones anteriores, preservando saltos de párrafo, sin crear dobles espacios ni borrar texto del cuerpo.
   - Hace respaldo único por archivo en `bak_limpieza_saladin_21nov/` antes de escribir (si no es `--seco`).
   - Es idempotente (una segunda corrida en `--seco` reporta 0 cambios) e imprime resumen por capítulo y totales (PARTE, CAPÍTULO, viñetas `●`, glosas).
2. **Reforzar `docs/audio-bloques/aceptacion.py`**:
   - En revisión 3 (material no narrable) o 4 (notas al pie): detectar encabezados `PARTE (UNO|DOS|TRES|CUATRO|CINCO) ...`, preguntas con viñeta `●`, y glosas etimológicas de notas al pie (`<num> <raíz> igual a ...`), SIN generar falsos positivos en frases científicas con `igual a` (`pH igual a`, `es igual a`, `R igual a región`, etc.).
3. **Pruebas unitarias**:
   - `docs/audio-bloques/probar_limpiar_saladin.py`: banco amplio de casos reales de arriba + casos negativos que NO deben tocarse (`pH igual a siete`, `es igual a`, `R igual a región`, título inicial del capítulo, texto tras pregunta `●`) + prueba de idempotencia.
   - Ampliar `docs/audio-bloques/probar_aceptacion.py` con casos positivos y negativos para los 3 nuevos detectores.

## Controles obligatorios
- `python docs/audio-bloques/probar_limpiar_saladin.py` debe pasar 100 %.
- `python docs/audio-bloques/probar_aceptacion.py` debe pasar 100 % (todos los casos existentes + los nuevos).
- En tu respuesta final incluye un resumen breve de las reglas implementadas y los conteos de prueba.
