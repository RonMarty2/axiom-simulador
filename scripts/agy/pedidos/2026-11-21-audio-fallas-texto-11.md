# Pedido a agy (--solo-texto): fallas de texto, tanda 11 (Tema_03, Tema_04 y Tema_06 de Saladin = 209 hallazgos)

REPITE PORQUE: la entrega anterior volvió vacía por corte de cuota 429 en Neon High de cuenta B; se relanza tras pasar a la cuenta A al 90 % (anterior: C:\Users\lmigu\AppData\Local\axiom-agy\20261121-102941_audio-texto)

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\agentes\libro-audio-tts.md` (reglas 2, 3, 4, 6, 7, 10 y 18). No ejecutes nada; solo lees y propones.

## Qué leer (solo estos archivos cortos)
1. Contextos de hallazgos (ya limpiadas por vocabulario las 2.125 palabras partidas por guion/ligadura; quedan solo los 209 hallazgos de criterio de revisiones 3 a 8 con ventana de 950 caracteres en `Antes de proseguir`) en:
   `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`
   para estos 3 capítulos de Morfofunción (Saladin):
   - `Tema_03_Morfo_Saladin` (81 hallazgos)
   - `Tema_04_Morfo_Saladin` (69 hallazgos)
   - `Tema_06_Morfo_Saladin` (59 hallazgos)
2. Para verificar cifras, miles, palabras cortadas o si una frase es crédito o pie de figura, busca el fragmento en:
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt`

## Qué entregar (en tu respuesta, no en un archivo)
Un bloque ```json con una lista; un objeto por hallazgo:
`{"capitulo":"...","revision":N,"hallazgo":"<línea>","veredicto":"real|falso_positivo|no_verificado","buscar":"<fragmento EXACTO copiado del contexto, único, 30-900 caracteres>","reemplazar":"<mismo fragmento corregido, o null>","motivo":"<una línea>"}`
- Copia `buscar` LETRA POR LETRA del contexto (si en el contexto hay `¶`, pon `\n` en el JSON; respeta exactamente si dice `para probar la comprensión` o `para probar su comprensión`): se aplica por coincidencia exacta y debe aparecer UNA sola vez en el capítulo.
- Bloques de autoevaluación (`Antes de proseguir Responda las siguientes preguntas...`, `●¿...?`), encabezados de página incrustados (`PARTE UNO...`, `PARTE DOS...`, `CAPÍTULO...`), glosas etimológicas de notas al pie, créditos de imagen y referencias visuales (`En la figura...`, `véase el cuadro...`): quitarlos sin romper la oración.
- Llamadas de nota al pie pegadas a palabras o tras signo de puntuación (`palabra12`, `osteología,dos`, `epífisis.cinco`): quitar la llamada conservando la puntuación.
- Recuadros pegados al párrafo (`...CONOCIMIENTO MÁS A FONDO...`): separarlos en su propia línea con salto de línea y título normalizado (`Conocimiento más a fondo X punto Y. Aplicación clínica: ...`).
- Palabras partidas restantes en revisión 8: unirlas tras confirmar la palabra en `Saladin_texto_paginas.txt`.
Al final, agrega una tabla resumen: capítulo | real | falso_positivo | no_verificado.
