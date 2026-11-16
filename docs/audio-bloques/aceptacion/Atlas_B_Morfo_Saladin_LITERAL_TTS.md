# Aceptación: Atlas_B_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Atlas_B_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:41:59
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 5, 6, 7)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 20 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 24 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 3 / 2984 palabras | Crédito: ratorio o ilustración de libro: el propio cuerpo. Para; Crédito: ado en la ilustración de la izquierda y orientado de l; Crédito: ado en la ilustración de la derecha y orientado de la |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 28 / 2984 palabras | Llamada tras puntuación: y movimiento B.un Anatomía; Llamada tras puntuación: ndividuales. B.dos Importanc; Llamada tras puntuación: se la figura A.cinco, p. trein (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 5 / 2984 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: consúltese la figura; Ref. visual: véase la figura; Ref. visual: la figura ocho coma cuatro dos |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 2 / 2984 palabras | Dígito sin convertir: figura A-6a, p. trei; Unidad/símbolo suelto: mm |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 16 / 2984 palabras | Sigla en mayúsculas: ATLAS; Título pegado al párrafo: vidad torácica. FIGURA B.once Corte transversal del tórax.; Título pegado al párrafo: idad abdominal. FIGURA B.trece Corte transversal del abdom (+4 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 2984 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (3 fallas / 2984 palabras)
- Crédito: ratorio o ilustración de libro: el propio cuerpo. Para
- Crédito: ado en la ilustración de la izquierda y orientado de l
- Crédito: ado en la ilustración de la derecha y orientado de la

### 4. Notas al pie (llamadas y glosas) (28 fallas / 2984 palabras)
- Llamada tras puntuación: y movimiento B.un Anatomía
- Llamada tras puntuación: ndividuales. B.dos Importanc
- Llamada tras puntuación: se la figura A.cinco, p. trein
- Llamada tras puntuación: cho al diez. B.tres Estrategi
- Llamada tras puntuación: de la figura B.un. Estúdies
- Llamada tras puntuación: de la figura B.nueve. Búsquese
- Llamada tras puntuación: se la figura B.diecinueve, con los
- Llamada tras puntuación: se la figura B.quince, con la e
- Llamada tras puntuación: teral FIGURA B.un La cabeza
- Llamada tras puntuación: rales FIGURA B.dos Sección m

### 5. Figuras y tablas (sin 'ver figura', descripción) (5 fallas / 2984 palabras)
- Ref. visual: consúltese la figura
- Ref. visual: véase la figura
- Ref. visual: la figura ocho coma cuatro dos

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (2 fallas / 2984 palabras)
- Dígito sin convertir: figura A-6a, p. trei
- Unidad/símbolo suelto: mm

### 7. Siglas, números de sección y títulos en su línea (16 fallas / 2984 palabras)
- Sigla en mayúsculas: ATLAS
- Título pegado al párrafo: vidad torácica. FIGURA B.once Corte transversal del tórax.
- Título pegado al párrafo: idad abdominal. FIGURA B.trece Corte transversal del abdom
- Título pegado al párrafo: cra , flechas,. FIGURA B.dieciséis Región axilar. PARTE D
- Título pegado al párrafo: Vista lateral. FIGURA B.dieciocho El antebrazo. ●Sólo apa
- Título pegado al párrafo: ista posterior. FIGURA B.veintitrés El pie, vistas plantar
- Sin líneas de título propias (regla 18) en 2984 palabras
