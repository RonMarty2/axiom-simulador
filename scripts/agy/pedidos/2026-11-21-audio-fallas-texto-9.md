# Pedido a agy (--solo-texto): fallas de texto, tanda 9 (TODOS los hallazgos restantes de revisiones 3 a 8 en 5 capítulos de Saladin)

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\agentes\libro-audio-tts.md` (reglas 2, 3, 4, 6, 7, 10 y 18). No ejecutes nada; solo lees y propones.

## Qué leer (solo estos archivos cortos)
1. Contextos de hallazgos (con TODOS los hallazgos sin el límite de 10 por revisión, con ±220 caracteres del texto) en:
   `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`
   para estos 5 capítulos de Morfofunción (Saladin):
   - `Tema_07_Morfo_Saladin` (21 hallazgos finales)
   - `Tema_09_Morfo_Saladin` (32 hallazgos finales)
   - `Tema_13_Morfo_Saladin` (20 hallazgos finales)
   - `Tema_01_Morfo_Saladin` (74 hallazgos completos)
   - `Tema_10_Morfo_Saladin` (65 hallazgos completos)
2. Para verificar cifras, miles, palabras cortadas o si una frase es crédito o pie de figura, busca el fragmento en:
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt`

## Qué entregar (en tu respuesta, no en un archivo)
Un bloque ```json con una lista; un objeto por hallazgo:
`{"capitulo":"...","revision":N,"hallazgo":"<línea>","veredicto":"real|falso_positivo|no_verificado","buscar":"<fragmento EXACTO copiado del contexto, único, 30-160 caracteres>","reemplazar":"<mismo fragmento corregido, o null>","motivo":"<una línea>"}`
- Copia `buscar` LETRA POR LETRA del contexto (sin retocar espacios ni saltos de línea; si en el contexto hay `¶`, representa un salto de línea `\n`): se aplica por coincidencia exacta y debe aparecer UNA sola vez en el capítulo.
- Bloques de autoevaluación (`Antes de proseguir Responda las siguientes preguntas...`, `●¿...?`), encabezados de página incrustados (`PARTE UNO...`, `PARTE DOS...`, `CAPÍTULO...`), glosas etimológicas de notas al pie al final de página (`. un arthro igual a articulación; logi igual a estudio.`, `veinte uaru igual a pústula...`), créditos de imagen y referencias visuales (`En la figura...`, `véase el cuadro...`): quitarlos sin romper la oración.
- Llamadas de nota al pie pegadas a palabras o tras signo de puntuación (`palabra12`, `osteología,dos`, `epífisis.cinco`, `periostio.seis`): quitar la llamada conservando la puntuación. OJO: si es notación química o rango numérico real (`calcio, nueve.dos a diez.cuatro miligramos` = `9,2 a 10,4 mg`), corrige el punto decimal a `coma` (`nueve coma dos a diez coma cuatro miligramos`) o las fórmulas (`o hache,dos,` -> `O H dos`).
- Dígitos sin convertir (`1a.` -> `primera`, referencias `figura X.12a` -> quitar referencia visual).
- Recuadros pegados al párrafo (`...CONOCIMIENTO MÁS A FONDO...`): separarlos en su propia línea con salto de línea y título normalizado (`Conocimiento más a fondo X punto Y. Aplicación clínica: ...`). Si un título `FIGURA X coma Y` quedó pegado tras punto (`. FIGURA trece coma dos dos`), ponle salto de línea antes (`.\nFIGURA trece coma dos dos`).
- Palabras partidas por ligadura (`fi `, `fl `) o por guion: unirlas tras confirmar la palabra en `Saladin_texto_paginas.txt`.
Al final, agrega una tabla resumen: capítulo | real | falso_positivo | no_verificado.
