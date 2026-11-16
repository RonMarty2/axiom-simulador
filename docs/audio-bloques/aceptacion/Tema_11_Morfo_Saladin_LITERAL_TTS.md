# Aceptación: Tema_11_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_11_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 14:55:21
- **Veredicto final:** **FALLA** (revisiones con fallas: 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 54 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 2 / 55 párrafos PDF | PDF#7 (75.9%): ●¿Qué características evidentes en el tejido de esta fotografía lo distinguen de l...; PDF#55 (5.7%): APARATO REPRODUCTOR Los músculos participan en la respuesta sexual, incluidas la e... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 14 / 22622 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 21 / 22622 palabras | Llamada numérica: mioblastos2; Llamada numérica: mortis8; Llamada numérica: miastenia17 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 15 / 22622 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: la figura once coma dos; Ref. visual: en la figura once coma tres; Ref. visual: en el cuadro once coma un (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 9 / 22622 palabras | Dígito sin convertir: gura once.3c y d, de; Dígito sin convertir: gura once.15a, se obse; Dígito sin convertir: gura once.15c, cada nu (+5 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 18 / 22622 palabras | Sigla en mayúsculas: FONDO; Título pegado al párrafo: n en ocasiones. once punto uno Tipos y características de tejido mu; Título pegado al párrafo: sculo estriado. once punto dos Anatomía microscópica del músculo es (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 28 / 22622 palabras | Ligadura partida: insignifi cante; Ligadura partida: fi jarse; Ligadura partida: fi lamenFilamento (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 2. Omisiones (PDF -> texto) (2 fallas / 55 párrafos PDF)
- PDF#7 (75.9%): ●¿Qué características evidentes en el tejido de esta fotografía lo distinguen de l...
- PDF#55 (5.7%): APARATO REPRODUCTOR Los músculos participan en la respuesta sexual, incluidas la e...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (14 fallas / 22622 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (21 fallas / 22622 palabras)
- Llamada numérica: mioblastos2
- Llamada numérica: mortis8
- Llamada numérica: miastenia17
- Llamada tras puntuación: s el sarcolema,un y su cito
- Llamada tras puntuación: llamada titina.tres Flanquean
- Llamada tras puntuación: lamada banda H,cuatro donde no
- Llamada tras puntuación: as, la línea M.cinco Cada band
- Llamada tras puntuación: s un sarcómero,siete la unidad
- Llamada tras puntuación: toria temporal,nueve porque es
- Llamada tras puntuación: ión isométrica,diez que es un

### 5. Figuras y tablas (sin 'ver figura', descripción) (15 fallas / 22622 palabras)
- Ref. visual: la figura once coma dos
- Ref. visual: en la figura once coma tres
- Ref. visual: en el cuadro once coma un
- Ref. visual: En el cuadro once coma dos
- Ref. visual: en la figura once coma ocho
- Ref. visual: en la figura once coma nueve
- Ref. visual: En la figura once coma un cero
- Ref. visual: la figura once coma ocho
- Ref. visual: la figura once coma nueve
- Ref. visual: en la figura once coma un un

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (9 fallas / 22622 palabras)
- Dígito sin convertir: gura once.3c y d, de
- Dígito sin convertir: gura once.15a, se obse
- Dígito sin convertir: gura once.15c, cada nu
- Símbolo '+': pico de +setenta
- Símbolo '+': a A D P + Pi; act
- Símbolo '+': e A T P + C P es
- Símbolo '+': e A D P + Pi. A m
- Letra griega: μ

### 7. Siglas, números de sección y títulos en su línea (18 fallas / 22622 palabras)
- Sigla en mayúsculas: FONDO
- Título pegado al párrafo: n en ocasiones. once punto uno Tipos y características de tejido mu
- Título pegado al párrafo: sculo estriado. once punto dos Anatomía microscópica del músculo es
- Título pegado al párrafo: es del músculo. FIGURA once coma cinco Estrías musculares
- Título pegado al párrafo: arte, segmento. CUADRO once coma un Componentes estructura
- Título pegado al párrafo: y los discos Z. once punto tres Relación entre nervios y músculos R
- Título pegado al párrafo: cial de acción? once punto cuatro Comportamiento de las fibras muscula
- Título pegado al párrafo: a estimulación. CUADRO once coma dos Componentes de la uni
- Título pegado al párrafo: ud en descanso? once punto cinco Comportamiento de los músculos como
- Título pegado al párrafo: e toma asiento. FIGURA once coma un siete Fases de contrac

### 8. Palabras partidas y ligaduras (28 fallas / 22622 palabras)
- Ligadura partida: insignifi cante
- Ligadura partida: fi jarse
- Ligadura partida: fi lamenFilamento
- Ligadura partida: efi caz
- Ligadura partida: fi no
- Ligadura partida: fi nos
- Ligadura partida: fl exionar
- Ligadura partida: fl exionara
- Ligadura partida: efi cacia
- Ligadura partida: sufi ciente
