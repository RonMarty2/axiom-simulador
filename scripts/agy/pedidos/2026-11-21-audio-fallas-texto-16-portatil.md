# Pedido a agy (--solo-texto): fallas de texto, tanda 16 (Tema_26 [50], Tema_28 [49] y remate de Tema_19 [1] y Tema_25 [5] de Saladin = 105 hallazgos)

REPITE PORQUE: la corrida anterior fallo porque git worktree saco copia vieja de _agents/hooks.json con Python311 (ya commiteado portable en 81798fa) (anterior: C:\Users\lmigu\AppData\Local\axiom-agy\20261121-184012_audio-texto)

Sigue las reglas de `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md` y usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `C:\SynologyDrive\SynologyDrive\axiom-simulador\agentes\libro-audio-tts.md` (reglas 2, 3, 4, 6, 7, 10 y 18) y `C:\SynologyDrive\SynologyDrive\axiom-simulador\agentes\libro-audio-auditor.md`. No ejecutes nada; solo lees y propones.

## Qué leer (solo estos archivos cortos)
1. Contextos de hallazgos (total 105 hallazgos de criterio de revisiones 3 a 8 con ventana de 950 caracteres en `Antes de proseguir`) en:
   `C:\SynologyDrive\SynologyDrive\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`
   para estos 4 capítulos de Morfofunción (Saladin):
   - `Tema_19_Morfo_Saladin` (1 hallazgo final)
   - `Tema_25_Morfo_Saladin` (5 hallazgos finales)
   - `Tema_26_Morfo_Saladin` (50 hallazgos)
   - `Tema_28_Morfo_Saladin` (49 hallazgos)
2. Para verificar cifras, miles, palabras cortadas o si una frase es crédito o pie de figura, busca el fragmento en:
   - `C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt`

## Qué entregar (en tu respuesta, no en un archivo)
Un bloque ```json con una lista; un objeto por hallazgo:
`{"capitulo":"...","revision":N,"hallazgo":"<línea>","veredicto":"real|falso_positivo|no_verificado","buscar":"<fragmento EXACTO copiado del contexto, único, 30-900 caracteres>","reemplazar":"<mismo fragmento corregido, o null>","motivo":"<una línea>"}`
- Copia `buscar` LETRA POR LETRA del contexto (si en el contexto hay `¶`, pon `\n` en el JSON; respeta exactamente si dice `para probar la comprensión` o `para probar su comprensión`): se aplica por coincidencia exacta y debe aparecer UNA sola vez en el capítulo.
- Bloques de autoevaluación (`Antes de proseguir Responda las siguientes preguntas...`, `●¿...?`), encabezados de página incrustados (`PARTE UNO...`, `PARTE DOS...`, `PARTE TRES...`, `PARTE CUATRO...`, `PARTE CINCO...`, `CAPÍTULO...`), glosas etimológicas de notas al pie, créditos de imagen y referencias visuales (`En la figura...`, `véase el cuadro...`): quitarlos sin romper la oración.
- Llamadas de nota al pie pegadas a palabras o tras signo de puntuación (`palabra12`, `osteología,dos`, `epífisis.cinco`): quitar la llamada conservando la puntuación.
- Recuadros pegados al párrafo (`...CONOCIMIENTO MÁS A FONDO...`): separarlos en su propia línea con salto de línea y título normalizado (`Conocimiento más a fondo X punto Y. Aplicación clínica: ...`).
- Palabras partidas restantes en revisión 8: unirlas tras confirmar la palabra en `Saladin_texto_paginas.txt`.
Al final, agrega una tabla resumen: capítulo | real | falso_positivo | no_verificado.
