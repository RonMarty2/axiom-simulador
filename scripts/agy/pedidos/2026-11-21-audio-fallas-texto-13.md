# Pedido a agy (--solo-texto): fallas de texto, tanda 13 (remate de Tema_05 [11] y Tema_14 [24] + Tema_27 [53] y Tema_29 [44] de Saladin = 132 hallazgos)

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\agentes\libro-audio-tts.md` (reglas 2, 3, 4, 6, 7, 10 y 18). No ejecutes nada; solo lees y propones.

## Qué leer (solo estos archivos cortos)
1. Contextos de hallazgos regenerados (con los pocos hallazgos restantes de `Tema_05` y `Tema_14` más `Tema_27` y `Tema_29`, total 132 hallazgos) en:
   `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`
   para estos 4 capítulos de Morfofunción (Saladin):
   - `Tema_05_Morfo_Saladin` (11 hallazgos finales)
   - `Tema_14_Morfo_Saladin` (24 hallazgos finales)
   - `Tema_27_Morfo_Saladin` (53 hallazgos completos)
   - `Tema_29_Morfo_Saladin` (44 hallazgos completos)
2. Para verificar cifras, miles, palabras cortadas o si una frase es crédito o pie de figura, busca el fragmento en:
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt`

## Qué entregar (en tu respuesta, no en un archivo)
Un bloque ```json con una lista; un objeto por hallazgo:
`{"capitulo":"...","revision":N,"hallazgo":"<línea>","veredicto":"real|falso_positivo|no_verificado","buscar":"<fragmento EXACTO copiado del contexto, único, 30-900 caracteres>","reemplazar":"<mismo fragmento corregido, o null>","motivo":"<una línea>"}`
- Copia `buscar` LETRA POR LETRA del contexto (si en el contexto hay `¶`, pon `\n` en el JSON; respeta exactamente si dice `para probar la comprensión` o `para probar su comprensión`): se aplica por coincidencia exacta y debe aparecer UNA sola vez en el capítulo.
- Bloques de autoevaluación (`Antes de proseguir Responda las siguientes preguntas...`, `●¿...?`), encabezados de página incrustados (`PARTE UNO...`, `PARTE DOS...`, `PARTE TRES...`, `PARTE CUATRO...`, `PARTE CINCO...`, `CAPÍTULO...`), glosas etimológicas de notas al pie, créditos de imagen y referencias visuales (`En la figura...`, `véase el cuadro...`): quitarlos sin romper la oración.
- Llamadas de nota al pie pegadas a palabras o tras signo de puntuación (`palabra12`, `osteología,dos`, `epífisis.cinco`): quitar la llamada conservando la puntuación.
- Recuadros pegados al párrafo (`...CONOCIMIENTO MÁS A FONDO...`): separarlos en su propia línea con salto de línea y título normalizado (`Conocimiento más a fondo X punto Y. Aplicación clínica: ...`).
- Palabras partidas restantes en revisión 8: unirlas tras confirmar la palabra en `Saladin_texto_paginas.txt`.
Al final, agrega una tabla resumen: capítulo | real | falso_positivo | no_verificado.
