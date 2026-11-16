# Pedido a agy (lectura): clasificar hallazgos de aceptación de EdS Parte 3 (Estadística)

Agentes cuyas reglas mandan: `.claude/agents/libro-audio-tts.md` (reglas 1-18; sobre todo 1, 2, 3, 4, 5, 7, 10) y `.claude/agents/libro-audio-auditor.md` (PROTOCOLO ÚNICO, revisiones 1, 2, 5, 6, 7).

## Qué leer
- Informes: `C:/Users/lmigu/AppData/Local/Temp/claude/cf3c823a51e310ff/084b7aa5-e898-47a6-88e7-b79899a350d2/scratchpad/acep/EdS_Parte3_1_LITERAL_TTS.md`, `..._Parte3_2_...`, `..._Parte3_3_...` (sección «Detalle de hallazgos»).
- Textos para la voz: `examenes pasados/MEDICINA/PSA_2027_FUENTES/audio_eds/EdS_Parte3_1_LITERAL_TTS.md`, `EdS_Parte3_2_LITERAL_TTS.md`, `EdS_Parte3_3_LITERAL_TTS.md`.
- Referencia del libro: `examenes pasados/MEDICINA/LIBROS DE MEDICINA/libros_extraidos/EdS_texto_paginas.txt` (marcas «===== PAGINA N =====»; Estadística empieza en la pág. 84).

## Qué hacer
Para CADA hallazgo listado en las revisiones 1, 2, 5, 6 y 7 de los 3 informes:
1. Busca el párrafo del libro (con su página) y su equivalente en el texto para la voz.
2. Clasifícalo:
   - `ADAPTACION_OK`: dice lo mismo; solo cambia lo permitido (fórmula, número, símbolo o sigla dicha en palabras; tabla narrada fila por fila).
   - `EXCLUIDO_OK`: no está y no debe estar (regla 10: bibliografía, ejercicios de aplicación, créditos, fuente, URL, número de página).
   - `FALTA`: texto narrable del libro que no está en el audio.
   - `PARAFRASIS`: el texto para la voz dice otra cosa que el libro o inventa.
   - `ARREGLAR`: lo que la voz leería mal (símbolo, dígito o sigla sin convertir, «ver figura»). Propón el texto corregido exacto.
3. Para la revisión 7, di si la sigla debe deletrearse (A N O V A) o leerse como palabra.

## Formato de la respuesta (ENTREGA_AGY.md)
Una tabla Markdown por parte: `| rev | página libro | primeras 10 palabras del libro | clase | cita literal del texto para la voz (o «—») | corrección propuesta exacta (o «—») |`.
Al final, conteo por clase y por parte. NO edites ningún archivo. Si no encuentras algo, escribe «no encontrado»; no adivines.
