# Plan: cómo se parten los audiolibros (decisión de Ronald, 16-nov-2026)

Ejemplo de Ronald (solo ejemplo): libro de Estadística descriptiva, tema «Estadígrafos de tendencia central» = título 1, subtítulo 1.2, sub-subtítulo 1.2.1.

## Regla
1. **Un audio por subtítulo, entero.** Nunca se parte un subtítulo a mitad de idea ni a mitad de párrafo.
2. **Si el subtítulo es largo Y tiene sub-subtítulos, se divide en un audio por sub-subtítulo.** Si es largo pero no tiene sub-subtítulos, queda entero (o se corta solo en un cambio de idea claro, anotado).
3. **Ni audios largos ni audios demasiado cortos.** Se evalúa tema por tema:
   - Objetivo: 5 a 15 minutos (≈ 750 a 2.250 palabras a ~150 palabras/min).
   - Más de ~20 min: se busca dividir en el nivel de abajo. Menos de ~3 min: se junta con el hermano vecino del mismo nivel (nunca con otro tema).
   - Los hermanos cortos se agrupan hasta caer en el objetivo, respetando los límites de subtítulo.
4. Cada audio abre diciendo su título y cierra en el final de frase del subtítulo, con un silencio breve de ~1 s. **Sin desvanecido** (el fade lo introduje yo en una muestra el 16-nov; no va).
5. Se mantiene un «Completo» por capítulo, además de las partes.
6. Lo que no se narra (preguntas de práctica, glosario, bibliografía, tablas que solo se entienden mirándolas) no cuenta como contenido: una parte nunca termina ahí.

## Qué se sabe del material (comprobado 16-nov)
- **Calvo y Saladin (texto literal):** el texto NO conserva los títulos: vienen fundidos dentro del párrafo corrido. Los 496 MP3 publicados se cortaron por bloques, no por subtítulo: 2 de 3 partes revisadas terminan en material que no se narra (preguntas, glosario) o en una fila de tabla.
- **Libro 3 (EdS):** el texto sí trae jerarquía hablada («uno punto uno Historia»). Es el caso fácil.
- Los capítulos completos regrabados (`_AUDIO_V2`) se cortan DESPUÉS de grabar; no hay que regrabar para cambiar los cortes.

## Pasos
1. **Mapa de títulos** por capítulo (nivel 1/2/3, posición en el texto). EdS: sale del propio texto. Calvo/Saladin: sale del PDF (marcadores o tamaño de letra), trabajo de lectura para `agy`; salida `docs/audio-bloques/mapa_titulos/<capitulo>.json`.
2. **Propuesta de cortes por capítulo** (script, no a mano): suma palabras por subtítulo, aplica la regla 3 y deja una tabla «audio N = títulos X a Y, palabras, minutos estimados». **Se la muestro a Ronald con 2 capítulos de ejemplo (uno de Calvo, uno de EdS) antes de aplicarla a todos.**
3. **Corte del audio**: ubicar con Whisper (marcas de tiempo por palabra) el inicio de cada título en el audio completo y cortar con ffmpeg en la pausa entre frases, un silencio breve al final.
4. **Revisión**: Whisper a final y comienzo de cada parte (frase completa, sin palabra cortada, volumen normal) y una escucha de Ronald a 3 partes.
5. Nada publicado se reemplaza sin su OK; las partes nuevas van a una carpeta aparte.

## Ajustes del copiloto (16-nov, aceptados)
1. **Se revisa CADA parte, no una muestra:** Whisper a los primeros y últimos 15 s de cada una. Debe empezar en su título, cerrar con frase completa y durar entre ~3 y ~20 min. Si UNA sola falla, la tanda no se publica.
2. **Antes de cortar nada se miden las 496 publicadas** (`medir_cierres_publicados.py` → `medicion_cierres.csv`): cuántas terminan fuera de un cierre limpio. Ronald recibe ese número, no «3 de 496». Primera pasada sin mapa de títulos (frase completa + no termina en preguntas/glosario/tabla + duración); con el mapa se afina a «cierra un subtítulo».
3. **Mapa de títulos** del PDF con agy; para texto de PDF, `_AGENTES_CENTRAL/herramientas/a_texto.py` (deja las imágenes aparte, marcadas por página).
4. **Muestras para Ronald:** empiezan en un título y terminan en frase completa, sin desvanecido.

## Figuras (decisión de Ronald, 16-nov, opción A; regla 2 de libro-audio-tts)
Si el pie de una figura no se entiende sin verla, lleva una descripción hablada de 1 a 3 frases DESPUÉS del pie, sacada de la imagen, sin datos nuevos y sin «como ves». Si el pie ya se entiende solo, no se agrega nada. Cómo: `a_texto.py` deja cada imagen aparte marcada `[IMAGEN pág N: ...]`; agy (lectura) propone qué figuras necesitan descripción y la escribe; Claude revisa una muestra con la imagen delante; `auditor-figuras` revisa el resto. Todo entra al TEXTO antes del corte por subtítulo, para no regrabar dos veces; de lo ya grabado solo se regraban los bloques de las figuras que cambian. Orden: 1) mapa de títulos (agy en curso) → 2) descripciones de figuras (pedido aparte a agy) → 3) regrabar solo esos bloques → 4) cortes.

## Estado
- 16-nov: regla acordada. Grabación de los capítulos completos en curso. Paso 1 sin empezar.
