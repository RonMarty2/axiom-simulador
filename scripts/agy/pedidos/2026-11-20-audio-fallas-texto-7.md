# Pedido a agy (--solo-texto): tanda 7, capítulos casi listos y revisiones 1 y 2

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\agentes\libro-audio-tts.md` (reglas 2, 7 y 10). No ejecutes nada; solo lees y propones.

## Parte A: hallazgos 3 a 8 que siguen (Tema_07_Biologia_Celular, Tema_16_Biologia_Celular, Tema_21_Morfo_Saladin, Tema_22_Morfo_Saladin, EdS_Parte3_2)
Contexto regenerado por capítulo en `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md`. Original en `...\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\` (Calvo_texto_paginas.txt, Saladin_texto_paginas.txt, EdS_texto_paginas.txt). Mismas reglas de la tanda 6: `buscar` copiado letra por letra y único en el capítulo; `reemplazar` null si no verificas; literalidad, sin parafrasear.

## Parte B: revisiones 1 y 2 de Tema_22_Morfo_Saladin y EdS_Parte3_2
Informe: `...\docs\audio-bloques\aceptacion\<capitulo>_LITERAL_TTS.md` (solo muestra 10 ejemplos por revisión). Texto: `...\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_22_Morfo_Saladin_LITERAL_TTS.md` y `...\PSA_2027_FUENTES\audio_eds\EdS_Parte3_2_LITERAL_TTS.md`.
Tema_22 marca 63 de 115 párrafos del PDF como omitidos (muchos al 0 %: p. ej. los objetivos «a) Identificar las tres líneas de defensa…», que SÍ deben leerse). Averigua con el texto original por qué: si el texto de voz de Tema_22 omite de verdad esos párrafos (omisión real) o si son cosas que la regla 10 excluye (figuras, preguntas de repaso, «Temas de conexión», notas al pie, bibliografía). EdS_Parte3_2 marca tablas narradas fila por fila (regla 7): son excepciones legítimas si la tabla del libro está dicha en palabras.
Entrega, además del JSON de la parte A (campo `parte`:"A"), una lista con `parte`:"B": `{"capitulo","revision":1|2,"clasificacion":"omision_real|excluida_regla|tabla_narrada|no_verificado","fragmento_original":"<30-120 caracteres del PDF>","pagina":N,"insertar_despues_de":"<fragmento EXACTO y único del texto de voz>","texto_a_insertar":"<texto literal listo para voz, o null>","motivo":"<una línea>"}`. Solo propón inserciones de omisiones reales; el resto se clasifica.
Al final, tabla: capítulo | real | falso_positivo | no_verificado | omisiones reales | excluidas.
