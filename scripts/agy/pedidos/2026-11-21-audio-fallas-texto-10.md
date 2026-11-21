# Pedido a agy (--solo-texto): fallas de texto, tanda 10 (Atlas_A, Tema_11 y remate final de Tema_07, Tema_09, Tema_13, Tema_01 y Tema_10 de Saladin)

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\agentes\libro-audio-tts.md` (reglas 2, 3, 4, 6, 7, 10 y 18). No ejecutes nada; solo lees y propones.

## Qué leer (solo estos archivos cortos)
1. Contextos de hallazgos regenerados (con ventana ampliada de 950 caracteres para `Antes de proseguir` y hasta 25 apariciones por hallazgo) en:
   `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`
   para:
   - `Atlas_A_Morfo_Saladin`
   - `Tema_11_Morfo_Saladin`
   - y los pocos hallazgos restantes en `Tema_07_Morfo_Saladin`, `Tema_09_Morfo_Saladin`, `Tema_13_Morfo_Saladin`, `Tema_01_Morfo_Saladin` y `Tema_10_Morfo_Saladin`.
2. Para verificar cifras, miles, palabras cortadas o si una frase es crédito o pie de figura, busca el fragmento en:
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt`

## Qué entregar (en tu respuesta, no en un archivo)
Un bloque ```json con una lista; un objeto por hallazgo:
`{"capitulo":"...","revision":N,"hallazgo":"<línea>","veredicto":"real|falso_positivo|no_verificado","buscar":"<fragmento EXACTO copiado del contexto, único, 30-900 caracteres>","reemplazar":"<mismo fragmento corregido, o null>","motivo":"<una línea>"}`
- Copia `buscar` LETRA POR LETRA del contexto (si en el contexto hay `¶`, pon `\n` en el JSON): se aplica por coincidencia exacta y debe aparecer UNA sola vez en el capítulo.
- Los bloques de autoevaluación (`Antes de proseguir Responda las siguientes preguntas...`) ahora traen ventana ampliada (950 letras) para que puedas incluir el bloque completo en `buscar` y dejar `"reemplazar": ""`.
- Encabezados de página incrustados (`PARTE UNO...`, `PARTE DOS...`, `CAPÍTULO...`), glosas etimológicas de notas al pie (`veinte uaru igual a pústula...`, `diez apo igual a a partir de...`), créditos de imagen y referencias visuales (`En la figura...`, `véase el cuadro...`): quitarlos sin romper la oración.
- Llamadas de nota al pie pegadas a palabras o tras signo de puntuación (`palabra12`, `osteología,dos`, `epífisis.cinco`): quitar la llamada conservando la puntuación.
- Recuadros pegados al párrafo (`...CONOCIMIENTO MÁS A FONDO...`): separarlos en su propia línea con salto de línea y título normalizado (`Conocimiento más a fondo X punto Y. Aplicación clínica: ...`).
- Palabras partidas por ligadura (`fi `, `fl `) o por guion: unirlas tras confirmar la palabra en `Saladin_texto_paginas.txt`.
Al final, agrega una tabla resumen: capítulo | real | falso_positivo | no_verificado.
