# Pedido a agy (--solo-texto): fallas de texto, tanda 6 (revisiones 3 a 8)

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\agentes\libro-audio-tts.md`. No ejecutes nada; solo lees y propones.

## QuÃ© leer (solo estos archivos, son cortos)
Por cada capÃ­tulo, su archivo de contexto con cada falla y Â±220 caracteres del texto:
`C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`
CapÃ­tulos (7): Tema_07_Biologia_Celular, Tema_16_Biologia_Celular, EdS_Parte3_1, EdS_Parte3_2, EdS_Parte3_3, Tema_21_Morfo_Saladin, Tema_22_Morfo_Saladin.
Ya pasaron por la tanda 5: quedan solo los hallazgos que siguen en su contexto (contextos regenerados 23:27). Las «∼» truncadas («∼1» sin dígitos) y similares: busca la página en el texto original con varios fragmentos antes de dejar «no_verificado».
Para ver el original (cifras, miles, sÃ­mbolos, si una frase es crÃ©dito o pie de figura), busca el fragmento en:
- BiologÃ­a Celular: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Calvo_texto_paginas.txt`
- Saladin (Morfo): `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt`
- EdS: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt`
NO leas los capÃ­tulos enteros. Ignora las revisiones 1, 2 y 9 a 12.

## QuÃ© entregar (en tu respuesta, no en un archivo)
Un bloque ```json con una lista; un objeto por hallazgo:
`{"capitulo":"...","revision":N,"hallazgo":"<lÃ­nea>","veredicto":"real|falso_positivo|no_verificado","buscar":"<fragmento EXACTO copiado del contexto, Ãºnico, 30-160 caracteres>","reemplazar":"<mismo fragmento corregido>","motivo":"<una lÃ­nea>"}`
En falso_positivo y no_verificado deja `"reemplazar": null`.
Copia `buscar` LETRA POR LETRA del contexto (sin retocar espacios ni signos): se aplica por coincidencia exacta y debe aparecer UNA sola vez en el capÃ­tulo.
- CrÃ©ditos, autores, Â«Dibujos procedentes deâ€¦Â», citas y doi: quitarlos.
- Referencias visuales (Â«la figura tres a uno muestraâ€¦Â», Â«(fig. 2)Â»): quitar la frase o el parÃ©ntesis sin romper la oraciÃ³n.
- Miles: Â«diez coma cero cero ceroÂ» viene de Â«10.000Â» â†’ Â«diez milÂ»; confÃ­rmalo en el texto original; Â«1.500Â» â†’ Â«mil quinientosÂ».
- SÃ­mbolos: Â«âˆ¼Â» â†’ Â«aproximadamenteÂ»; Â«+Â», Â«Ã—Â», griegas y unidades, a palabras.
- Llamadas de nota al pie (nÃºmero pegado a la palabra, Â«placenta6Â»): quitar el nÃºmero.
- Palabras partidas y ligaduras (Â«fl uyaÂ», Â«neutrÃ³fi losÂ», Â«propÃ³- treceÂ»): unirlas (Â«fluyaÂ», Â«neutrÃ³filosÂ»); confirma la palabra en el original.
- Autoevaluaciones y preguntas de repaso (Â«Antes de proseguirÂ», Â«Responda las siguientes preguntasÂ», Â«â—Â¿â€¦?Â»): quitarlas.
- Restos de la tanda 4 (ya se aplicaron 119 correcciones; NO repitas las que ya no aparecen en el contexto): miles leÃ­dos como decimal (Â«tres coma cero cero ceroÂ» â†’ Â«tres milÂ»); Â«âˆ¼Â» â†’ Â«aproximadamenteÂ»; Â«G + CÂ» â†’ Â«G mÃ¡s CÂ»; siglas en mayÃºsculas que quedan (p. ej. Â«RARÂ» â†’ Â«R A RÂ»); crÃ©ditos de imagen al final de pies de figura: quitarlos.
- Literalidad: no parafrasees ni agregues datos. Si no puedes verificar algo en el original, Â«no_verificadoÂ». EspaÃ±ol neutro.
Al final, una tabla: capÃ­tulo | real | falso_positivo | no_verificado.

