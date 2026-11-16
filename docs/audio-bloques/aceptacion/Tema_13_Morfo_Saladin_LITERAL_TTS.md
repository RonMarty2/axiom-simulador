# Aceptación: Tema_13_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_13_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:50:26
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 37 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 49 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 6 / 16155 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 28 / 16155 palabras | Llamada numérica: equina1; Llamada numérica: meninges2; Llamada numérica: aracnoides3 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 11 / 16155 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: La figura trece; Ref. visual: en la figura trece; Ref. visual: en el cuadro trece coma un y (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 25 / 16155 palabras | Dígito sin convertir: ura trece.2a muestra; Dígito sin convertir: ura trece.2b se ve la; Dígito sin convertir: ia, grupo 1a, que sur (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 32 / 16155 palabras | Sigla en mayúsculas: ESPS; Sigla en mayúsculas: IPSP; Sigla en mayúsculas: FONDO (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 9 / 16155 palabras | Ligadura partida: insignifi cante; Ligadura partida: sufi jo; Ligadura partida: fi na (+6 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (6 fallas / 16155 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (28 fallas / 16155 palabras)
- Llamada numérica: equina1
- Llamada numérica: meninges2
- Llamada numérica: aracnoides3
- Llamada numérica: piamadre4
- Llamada numérica: decusación8
- Llamada numérica: contralaterales9
- Llamada numérica: grácil11
- Llamada numérica: cinestesia12
- Llamada numérica: cuneiforme13
- Llamada numérica: lemnisco14

### 5. Figuras y tablas (sin 'ver figura', descripción) (11 fallas / 16155 palabras)
- Ref. visual: La figura trece
- Ref. visual: en la figura trece
- Ref. visual: en el cuadro trece coma un y
- Ref. visual: la figura trece coma cuatro
- Ref. visual: La figura trece coma nueve
- Ref. visual: La figura trece coma un cero
- Ref. visual: en la figura trece coma un cinco
- Ref. visual: la figura trece coma dos un
- Ref. visual: En el cuadro trece coma siete y
- Detalle solo visual: flecha

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (25 fallas / 16155 palabras)
- Dígito sin convertir: ura trece.2a muestra
- Dígito sin convertir: ura trece.2b se ve la
- Dígito sin convertir: ia, grupo 1a, que sur
- Símbolo '+': uscular + + + – –
- Símbolo '+': cular + + + – – U
- Símbolo '+': lar + + + – – Un
- Símbolo '+': derecha + + + + +
- Símbolo '+': recha + + + + + +
- Símbolo '+': cha + + + + + + +
- Símbolo '+': a + + + + + + + +

### 7. Siglas, números de sección y títulos en su línea (32 fallas / 16155 palabras)
- Sigla en mayúsculas: ESPS
- Sigla en mayúsculas: IPSP
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: SEM
- Sigla en mayúsculas: RG
- Sigla en mayúsculas: RH
- Sigla en mayúsculas: WH
- Sigla en mayúsculas: EPSP
- Sigla en mayúsculas: CT
- Sigla en mayúsculas: MRI

### 8. Palabras partidas y ligaduras (9 fallas / 16155 palabras)
- Ligadura partida: insignifi cante
- Ligadura partida: sufi jo
- Ligadura partida: fi na
- Ligadura partida: específi cos
- Ligadura partida: fi gs
- Ligadura partida: fi no
- Ligadura partida: fi la
- Ligadura partida: neurosífi lis
- Ligadura partida: benéfi co
