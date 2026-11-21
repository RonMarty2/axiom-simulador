# Pedido a agy (--solo-texto): fallas de texto, tanda 5 (revisiones 3 a 8)

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\agentes\libro-audio-tts.md`. No ejecutes nada; solo lees y propones.

## Qué leer (solo estos archivos, son cortos)
Por cada capítulo, su archivo de contexto con cada falla y ±220 caracteres del texto:
`C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`
Capítulos (7): Tema_07_Biologia_Celular, Tema_16_Biologia_Celular, EdS_Parte3_1, EdS_Parte3_2, EdS_Parte3_3, Tema_21_Morfo_Saladin, Tema_22_Morfo_Saladin.
Los 5 primeros ya pasaron por una tanda anterior: quedan solo los hallazgos que siguen en su contexto.
Para ver el original (cifras, miles, símbolos, si una frase es crédito o pie de figura), busca el fragmento en:
- Biología Celular: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Calvo_texto_paginas.txt`
- Saladin (Morfo): `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt`
- EdS: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt`
NO leas los capítulos enteros. Ignora las revisiones 1, 2 y 9 a 12.

## Qué entregar (en tu respuesta, no en un archivo)
Un bloque ```json con una lista; un objeto por hallazgo:
`{"capitulo":"...","revision":N,"hallazgo":"<línea>","veredicto":"real|falso_positivo|no_verificado","buscar":"<fragmento EXACTO copiado del contexto, único, 30-160 caracteres>","reemplazar":"<mismo fragmento corregido>","motivo":"<una línea>"}`
En falso_positivo y no_verificado deja `"reemplazar": null`.
Copia `buscar` LETRA POR LETRA del contexto (sin retocar espacios ni signos): se aplica por coincidencia exacta y debe aparecer UNA sola vez en el capítulo.
- Créditos, autores, «Dibujos procedentes de…», citas y doi: quitarlos.
- Referencias visuales («la figura tres a uno muestra…», «(fig. 2)»): quitar la frase o el paréntesis sin romper la oración.
- Miles: «diez coma cero cero cero» viene de «10.000» → «diez mil»; confírmalo en el texto original; «1.500» → «mil quinientos».
- Símbolos: «∼» → «aproximadamente»; «+», «×», griegas y unidades, a palabras.
- Llamadas de nota al pie (número pegado a la palabra, «placenta6»): quitar el número.
- Palabras partidas y ligaduras («fl uya», «neutrófi los», «propó- trece»): unirlas («fluya», «neutrófilos»); confirma la palabra en el original.
- Autoevaluaciones y preguntas de repaso («Antes de proseguir», «Responda las siguientes preguntas», «●¿…?»): quitarlas.
- Restos de la tanda 4 (ya se aplicaron 119 correcciones; NO repitas las que ya no aparecen en el contexto): miles leídos como decimal («tres coma cero cero cero» → «tres mil»); «∼» → «aproximadamente»; «G + C» → «G más C»; siglas en mayúsculas que quedan (p. ej. «RAR» → «R A R»); créditos de imagen al final de pies de figura: quitarlos.
- Literalidad: no parafrasees ni agregues datos. Si no puedes verificar algo en el original, «no_verificado». Español neutro.
Al final, una tabla: capítulo | real | falso_positivo | no_verificado.
