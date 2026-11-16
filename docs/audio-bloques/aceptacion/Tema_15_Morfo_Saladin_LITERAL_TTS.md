# Aceptación: Tema_15_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_15_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:51:41
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 27 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 21 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 8 / 9887 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 19 / 9887 palabras | Llamada numérica: suprarrenales6; Llamada numérica: simpatomiméticos12; Llamada numérica: simpatolíticos13 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 9 / 9887 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: La figura doce coma dos; Ref. visual: en el cuadro quince coma un; Ref. visual: en la figura quince coma cinco (+5 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 49 / 9887 palabras | Dígito sin convertir: érgicos: α1 y α2. Los; Dígito sin convertir: os: α1 y α2. Los del; Dígito sin convertir: del tipo α1 actúan al (+5 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 86 / 9887 palabras | Sigla en mayúsculas: ANS; Sigla en mayúsculas: CNS; Sigla en mayúsculas: NE (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 8 / 9887 palabras | Ligadura partida: prefi eren; Ligadura partida: barorrefl ejo; Ligadura partida: fi je (+4 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (8 fallas / 9887 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (19 fallas / 9887 palabras)
- Llamada numérica: suprarrenales6
- Llamada numérica: simpatomiméticos12
- Llamada numérica: simpatolíticos13
- Llamada tras puntuación: jos viscerales:un respuesta
- Llamada tras puntuación: barorrefl ejo.dos Éste esti
- Llamada tras puntuación: aravertebrales,tres que está
- Llamada tras puntuación: vio esplácnico.cuatro Algunas f
- Llamada tras puntuación: ganglio ótico,ocho cerca del
- Llamada tras puntuación: vioso entérico.nueve A diferen
- Llamada tras puntuación: e Hirschsprung.diez Durante e

### 5. Figuras y tablas (sin 'ver figura', descripción) (9 fallas / 9887 palabras)
- Ref. visual: La figura doce coma dos
- Ref. visual: en el cuadro quince coma un
- Ref. visual: en la figura quince coma cinco
- Ref. visual: En el cuadro quince coma dos
- Ref. visual: en la figura quince coma un
- Ref. visual: En el cuadro quince coma tres
- Ref. visual: En el cuadro quince coma cinco
- Ref. visual: En el cuadro quince coma seis

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (49 fallas / 9887 palabras)
- Dígito sin convertir: érgicos: α1 y α2. Los
- Dígito sin convertir: os: α1 y α2. Los del
- Dígito sin convertir: del tipo α1 actúan al
- Dígito sin convertir: ceptores α2 usan ione
- Dígito sin convertir: eptores, β1 y β2, que
- Dígito sin convertir: es, β1 y β2, que prod
- Letra griega: α
- Letra griega: β

### 7. Siglas, números de sección y títulos en su línea (86 fallas / 9887 palabras)
- Sigla en mayúsculas: ANS
- Sigla en mayúsculas: CNS
- Sigla en mayúsculas: NE
- Sigla en mayúsculas: PC
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: MAO
- Sigla en mayúsculas: COMT
- Sigla en mayúsculas: SSRI
- Sigla en mayúsculas: DNA
- Sigla en mayúsculas: RNA

### 8. Palabras partidas y ligaduras (8 fallas / 9887 palabras)
- Ligadura partida: prefi eren
- Ligadura partida: barorrefl ejo
- Ligadura partida: fi je
- Ligadura partida: fi jarse
- Ligadura partida: fi nes
- Ligadura partida: unifi cada
- Ligadura partida: sufi ciente
