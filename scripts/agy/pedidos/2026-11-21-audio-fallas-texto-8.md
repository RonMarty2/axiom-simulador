# Pedido a agy (--solo-texto): fallas de texto, tanda 8 (revisiones 1 a 8)

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\agentes\libro-audio-tts.md` (reglas 2, 3, 4, 7 y 10). No ejecutes nada; solo lees y propones.

## Qué leer (solo estos archivos cortos)
1. Contextos de hallazgos (revisiones 3 a 8) con ±220 caracteres del texto en:
   `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`
   para estos 9 capítulos:
   - `Tema_07_Biologia_Celular`
   - `Tema_16_Biologia_Celular`
   - `Tema_21_Morfo_Saladin`
   - `Tema_22_Morfo_Saladin`
   - `EdS_Parte3_1`
   - `EdS_Parte3_3`
   - `Tema_07_Morfo_Saladin`
   - `Tema_09_Morfo_Saladin`
   - `Tema_13_Morfo_Saladin`
2. Informes de aceptación en `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\aceptacion\<capitulo>_LITERAL_TTS.md` para revisar también la revisión 1 y 2 de `Tema_07_Biologia_Celular`, `Tema_16_Biologia_Celular` y `Tema_21_Morfo_Saladin`.
3. Originales para verificar cifras, símbolos (`∼un`) o fragmentos:
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Calvo_texto_paginas.txt`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt`

## Qué entregar (en tu respuesta, no en un archivo)
Un bloque ```json con una lista; un objeto por hallazgo:
`{"capitulo":"...","revision":N,"hallazgo":"<línea>","veredicto":"real|falso_positivo|no_verificado","buscar":"<fragmento EXACTO copiado del contexto, único, 30-160 caracteres>","reemplazar":"<mismo fragmento corregido, o null>","motivo":"<una línea>"}`
- Copia `buscar` LETRA POR LETRA del contexto (debe ser único en el capítulo).
- En `Tema_07_Biologia_Celular`, verifica en `Calvo_texto_paginas.txt` qué cifra real sigue a `masa molecular de ∼` (donde quedó `∼un`) y reemplázala en palabras (`aproximadamente ciento veinte megadaltons` o lo que diga exactamente el PDF).
- Si un hallazgo de revisión 6 (`cero coma siete ocho seis`, `uno coma seis nueve ocho nueve`, `cero coma cero dos siete`, etc.) es un decimal real de una fórmula y NO un separador de miles mal leído, clasifícalo como `"veredicto": "falso_positivo"` con el motivo exacto.
- Si un hallazgo de revisión 3 (`B. Imagen de T A C...`, `representa una ilustración de la ley de Henry...`) es cuerpo o pie legítimo y no crédito editorial, clasifícalo como `"veredicto": "falso_positivo"`.
- Quita preguntas de autoevaluación (`Antes de proseguir`, `Mencione cuatro tipos de linfocitos...`), créditos de imagen, llamadas de nota al pie pegadas a palabras, referencias visuales (`véase la figura...`), y une palabras partidas por ligadura (`fi `, `fl `).
Al final, agrega una tabla resumen: capítulo | real | falso_positivo | no_verificado.
