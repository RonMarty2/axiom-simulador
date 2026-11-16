# Aceptación: Tema_29_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_29_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 15:04:44
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 38 párrafos | P22 (88.2%): CAPÍTULO veintinueve Desarrollo humano y envejecimiento f veinte semanas cinco com... |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 42 párrafos PDF | PDF#22 (75.0%): CAPÍTULO 29 Desarrollo humano y envejecimiento f) 20 semanas 5.0 cm Útero Amnios e... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 9 / 22438 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Encabezado/autor/portada: PARTE CINCO Reproducción y desarrollo denomina cavidad amniótica. |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 24 / 22438 palabras | Llamada numérica: deciduales5; Llamada numérica: placenta6; Llamada numérica: lanugo8 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 1 / 22438 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: véase la figura |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 12 / 22438 palabras | Dígito sin convertir: diploide, 2n,. La fec; Dígito sin convertir: riploide, 3n, o mayor; Dígito sin convertir: intinueve.4c en una f (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 10 / 22438 palabras | Sigla en mayúsculas: FONDO; Título pegado al párrafo: al a que nutre. CUADRO veintinueve coma un Etapas del desa; Título pegado al párrafo: igual a célula. FIGURA veintinueve coma tres Gemelos dicig (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 27 / 22438 palabras | Corte por guion: espon- diez; Ligadura partida: transfi ere; Ligadura partida: sufi ciente (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 38 párrafos)
- P22 (88.2%): CAPÍTULO veintinueve Desarrollo humano y envejecimiento f veinte semanas cinco com...

### 2. Omisiones (PDF -> texto) (1 fallas / 42 párrafos PDF)
- PDF#22 (75.0%): CAPÍTULO 29 Desarrollo humano y envejecimiento f) 20 semanas 5.0 cm Útero Amnios e...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (9 fallas / 22438 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Encabezado/autor/portada: PARTE CINCO Reproducción y desarrollo denomina cavidad amniótica.

### 4. Notas al pie (llamadas y glosas) (24 fallas / 22438 palabras)
- Llamada numérica: deciduales5
- Llamada numérica: placenta6
- Llamada numérica: lanugo8
- Llamada numérica: teratógenos12
- Llamada numérica: progeria18
- Llamada numérica: vitro20
- Llamada tras puntuación: o blastómeros.un Éstos se
- Llamada tras puntuación: tiotrofoblasto.tres, Un sinci
- Llamada tras puntuación: arazo ectópico.cuatro La mayorí
- Llamada tras puntuación: ación de Apgar,nueve y es un b

### 5. Figuras y tablas (sin 'ver figura', descripción) (1 fallas / 22438 palabras)
- Ref. visual: véase la figura

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (12 fallas / 22438 palabras)
- Dígito sin convertir: diploide, 2n,. La fec
- Dígito sin convertir: riploide, 3n, o mayor
- Dígito sin convertir: intinueve.4c en una f
- Dígito sin convertir: intinueve.6b, que más
- Dígito sin convertir: intinueve.4c en una e
- Dígito sin convertir: intinueve.11a y b, las
- Dígito sin convertir: intinueve.11c. La cabe
- Dígito sin convertir: intinueve.4a. Mientra
- Dígito sin convertir: intinueve.10a. La sang
- Símbolo '+': , madre + lactant

### 7. Siglas, números de sección y títulos en su línea (10 fallas / 22438 palabras)
- Sigla en mayúsculas: FONDO
- Título pegado al párrafo: al a que nutre. CUADRO veintinueve coma un Etapas del desa
- Título pegado al párrafo: igual a célula. FIGURA veintinueve coma tres Gemelos dicig
- Título pegado al párrafo: ición prenatal? FIGURA veintinueve coma nueve Placenta y c
- Título pegado al párrafo: n más adelante. CUADRO veintinueve coma tres Funciones de
- Título pegado al párrafo: a pelusa, lana. CUADRO veintinueve coma cuatro Principales
- Título pegado al párrafo: sultan de ésta. FIGURA veintinueve coma un cuatro Síndrome
- Título pegado al párrafo: igual a parte. FIGURA veintinueve coma un siete Progeria.
- Título pegado al párrafo: ética y humana. FIGURA veintinueve coma un ocho Nuevos ini
- Recuadro pegado al párrafo: a senescencia. CONOCIMIENTO MÁS A FONDO veintinueve coma cuatro Apl...

### 8. Palabras partidas y ligaduras (27 fallas / 22438 palabras)
- Corte por guion: espon- diez
- Ligadura partida: transfi ere
- Ligadura partida: sufi ciente
- Ligadura partida: fl anqueado
- Ligadura partida: fl uctuaciones
- Ligadura partida: desafi ante
- Ligadura partida: fi bróticas
- Ligadura partida: efi caz
- Ligadura partida: fi nes
- Ligadura partida: científi co
