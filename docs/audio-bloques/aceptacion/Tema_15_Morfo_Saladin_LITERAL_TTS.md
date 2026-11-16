# Aceptación: Tema_15_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_15_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 17:55:14
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 3, 4, 5, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 30 párrafos | P28 (27.8%): PARTE TRES Integración y control doce mime igual a imitación. trece lys igual a de... |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 21 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 8 / 10000 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 19 / 10000 palabras | Llamada numérica: suprarrenales6; Llamada numérica: simpatomiméticos12; Llamada numérica: simpatolíticos13 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 9 / 10000 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: La figura doce coma dos; Ref. visual: en el cuadro quince coma un; Ref. visual: en la figura quince coma cinco (+5 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 10000 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 10 / 10000 palabras | Título pegado al párrafo: ciona el A N S. quince punto uno Propiedades generales del sistema ne; Título pegado al párrafo: pesado, grave. FIGURA quince coma un Un arco reflejo autó; Título pegado al párrafo: ual a vértebra. FIGURA quince coma tres Los ganglios nervi (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 8 / 10000 palabras | Ligadura partida: prefi eren; Ligadura partida: barorrefl ejo; Ligadura partida: fi je (+4 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 30 párrafos)
- P28 (27.8%): PARTE TRES Integración y control doce mime igual a imitación. trece lys igual a de...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (8 fallas / 10000 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (19 fallas / 10000 palabras)
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

### 5. Figuras y tablas (sin 'ver figura', descripción) (9 fallas / 10000 palabras)
- Ref. visual: La figura doce coma dos
- Ref. visual: en el cuadro quince coma un
- Ref. visual: en la figura quince coma cinco
- Ref. visual: En el cuadro quince coma dos
- Ref. visual: en la figura quince coma un
- Ref. visual: En el cuadro quince coma tres
- Ref. visual: En el cuadro quince coma cinco
- Ref. visual: En el cuadro quince coma seis

### 7. Siglas, números de sección y títulos en su línea (10 fallas / 10000 palabras)
- Título pegado al párrafo: ciona el A N S. quince punto uno Propiedades generales del sistema ne
- Título pegado al párrafo: pesado, grave. FIGURA quince coma un Un arco reflejo autó
- Título pegado al párrafo: ual a vértebra. FIGURA quince coma tres Los ganglios nervi
- Título pegado al párrafo: vidad torácica. CUADRO quince coma un Comparación entre lo
- Título pegado al párrafo: les de entrada. FIGURA quince coma cinco Rutas neurales a
- Título pegado al párrafo: igual a riñón. CUADRO quince coma dos Inervación de los g
- Título pegado al párrafo: estino delgado. quince punto tres Efectos autónomos en los órganos de
- Título pegado al párrafo: nervación dual? FIGURA quince coma un cero Tono simpático
- Título pegado al párrafo: médula espinal. CUADRO quince coma seis Algunos trastornos
- Título pegado al párrafo: nte más alerta. FIGURA quince coma un un Adenosina y cafeí

### 8. Palabras partidas y ligaduras (8 fallas / 10000 palabras)
- Ligadura partida: prefi eren
- Ligadura partida: barorrefl ejo
- Ligadura partida: fi je
- Ligadura partida: fi jarse
- Ligadura partida: fi nes
- Ligadura partida: unifi cada
- Ligadura partida: sufi ciente
