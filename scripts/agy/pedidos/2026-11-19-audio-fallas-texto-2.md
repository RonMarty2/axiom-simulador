# Pedido a agy (lectura, --solo-texto): fallas de texto, tanda 2 (revisiones 3, 4, 5, 6, 7 y 8)

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `agentes/libro-audio-tts.md`. No ejecutes nada; solo lees y propones.

## Qué leer (solo estos archivos, son cortos)
Por cada capítulo, el archivo de contexto con cada falla y ±220 caracteres del texto:
`C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`
Capítulos: Tema_12_Biologia_Celular, Tema_13_Biologia_Celular, Tema_15_Morfo_Saladin, Tema_24_Morfo_Saladin, EdS_Parte3_3.
Si necesitas ver el original (cifras, miles, símbolos): `...\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Calvo_texto_paginas.txt` (Saladin: `Saladin_texto_paginas.txt`; EdS: `...\PSA_2027_FUENTES\...EdS_texto_paginas.txt` si existe). NO leas el capítulo entero (pasa de 46 KB).
Ignora las revisiones 1 y 2 y 9 a 12.

## Qué entregar
Un bloque ```json con una lista; un objeto por hallazgo:
`{"capitulo":"...","revision":N,"hallazgo":"<línea>","veredicto":"real|falso_positivo","buscar":"<fragmento EXACTO copiado del contexto, único, 30-160 caracteres>","reemplazar":"<mismo fragmento corregido>","motivo":"<una línea>"}`
Copia `buscar` LETRA POR LETRA del contexto (sin retocar espacios ni signos): después se aplica por coincidencia exacta.
- Créditos, autores de portada, citas y doi: quitarlos.
- Referencias visuales («la figura tres a uno muestra…»): quitar la frase o el paréntesis sin romper la oración.
- Miles: «diez coma cero cero cero» viene de «10.000» → «diez mil»; confirma en el PDF crudo; «1.500» → «mil quinientos».
- Símbolos: «∼» → «aproximadamente»; «+», «×», griegas y unidades, a palabras.
- Llamadas de nota al pie (número pegado a la palabra): quitar el número.
- Literalidad: no parafrasees ni agregues datos. Si no puedes verificar algo, di «no verificado». Tuteo, español neutro.
Al final: cuenta por capítulo (real / falso_positivo / no verificado).
