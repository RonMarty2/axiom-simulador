# Pedido a agy (lectura): clasificar hallazgos de aceptación de EdS Parte 1

Agentes cuyas reglas mandan: `.claude/agents/libro-audio-tts.md` (reglas 1-18, sobre todo 1, 2, 3, 4, 5, 10) y `.claude/agents/libro-audio-auditor.md` (PROTOCOLO ÚNICO, revisiones 1, 2, 7).

## Qué leer
- Informe: `C:/Users/lmigu/AppData/Local/Temp/claude/cf3c823a51e310ff/084b7aa5-e898-47a6-88e7-b79899a350d2/scratchpad/acep/EdS_Parte1_LITERAL_TTS.md` (sección «Detalle de hallazgos»).
- Texto para la voz: `examenes pasados/MEDICINA/PSA_2027_FUENTES/audio_eds/EdS_Parte1_LITERAL_TTS.md`.
- Referencia del libro (páginas 2 a 31): `examenes pasados/MEDICINA/LIBROS DE MEDICINA/libros_extraidos/EdS_texto_paginas.txt`.

## Qué hacer
Para CADA hallazgo de las revisiones 1, 2 y 7 del informe (los ejemplos listados y, para la 2, busca TODOS los párrafos de las páginas 2-31 del libro que no estén en el texto para la voz):
1. Busca el párrafo del libro y su equivalente en el texto para la voz.
2. Clasifícalo:
   - `ADAPTACION_OK`: está en el texto, solo cambia lo permitido (número/sigla/símbolo a palabras, «p. ej.» a «por ejemplo», viñeta, guion unido).
   - `EXCLUIDO_OK`: no está y no debe estar por regla 10 (bibliografía, fuente de figura, URL, crédito, número de página, encabezado).
   - `FALTA`: texto narrable del libro que no está en el audio.
   - `PARAFRASIS`: el texto para la voz dice otra cosa que el libro.
   - `SIGLA`: sigla que la voz leería mal (ej. «MI SALUD» es el nombre de un programa: proponer cómo escribirlo).

## Formato de la respuesta (ENTREGA_AGY.md)
Una tabla Markdown: `| rev | página libro | primeras 10 palabras del libro | clase | cita literal del texto para la voz (o «—») | corrección propuesta (o «—») |`.
Al final: conteo por clase. NO edites ningún archivo. Si no encuentras algo, escribe «no encontrado», no adivines.
