# Aceptación: Tema_06_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_06_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:45:48
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 2 / 34 párrafos | P6 (89.0%): Resultados esperados del aprendizaje Cuando haya completado esta sección, el estud...; P33 (70.0%): Temas de conexión: el sistema tegumentario en todos los sistemas |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 2 / 34 párrafos PDF | PDF#3 (83.3%): c) Describir los colores normales y patológicos que puede tener la piel y explicar...; PDF#11 (0.0%): 9 pap = pezón; ila = pequeño. 10 reti = red; cula = pequeño. 11 hypo = debajo de;... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 8 / 15845 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 38 / 15845 palabras | Llamada numérica: epidermis3; Llamada numérica: lúcido7; Llamada numérica: reticular10 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 7 / 15845 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en la figura seis coma cuatro; Ref. visual: la figura seis coma tres; Ref. visual: En el cuadro seis coma un (+4 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 22 / 15845 palabras | Dígito sin convertir: s grasos. 29sudor igua; Dígito sin convertir: gura seis.11b, se dist; Dígito sin convertir: ento seis.12b,. Las pr (+6 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 51 / 15845 palabras | Sigla en mayúsculas: UV; Sigla en mayúsculas: FONDO; Sigla en mayúsculas: DNA (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 289 / 15845 palabras | Corte por guion: diferen- cia; Corte por guion: grue- so; Corte por guion: intac- ta (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (2 fallas / 34 párrafos)
- P6 (89.0%): Resultados esperados del aprendizaje Cuando haya completado esta sección, el estud...
- P33 (70.0%): Temas de conexión: el sistema tegumentario en todos los sistemas

### 2. Omisiones (PDF -> texto) (2 fallas / 34 párrafos PDF)
- PDF#3 (83.3%): c) Describir los colores normales y patológicos que puede tener la piel y explicar...
- PDF#11 (0.0%): 9 pap = pezón; ila = pequeño. 10 reti = red; cula = pequeño. 11 hypo = debajo de;...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (8 fallas / 15845 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (38 fallas / 15845 palabras)
- Llamada numérica: epidermis3
- Llamada numérica: lúcido7
- Llamada numérica: reticular10
- Llamada numérica: hipodermis11
- Llamada numérica: caroteno14
- Llamada numérica: cianosis15
- Llamada numérica: eritema16
- Llamada numérica: albinismo17
- Llamada numérica: ictericia18
- Llamada numérica: hematoma19

### 5. Figuras y tablas (sin 'ver figura', descripción) (7 fallas / 15845 palabras)
- Ref. visual: en la figura seis coma cuatro
- Ref. visual: la figura seis coma tres
- Ref. visual: En el cuadro seis coma un
- Ref. visual: véase la figura
- Ref. visual: en la figura seis
- Ref. visual: En el cuadro seis coma dos
- Ref. visual: en el cuadro seis coma tres

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (22 fallas / 15845 palabras)
- Dígito sin convertir: s grasos. 29sudor igua
- Dígito sin convertir: gura seis.11b, se dist
- Dígito sin convertir: ento seis.12b,. Las pr
- Símbolo '~': en- to, ~noventa
- Unidad/símbolo suelto: mm
- Unidad/símbolo suelto: pH
- Unidad/símbolo suelto: cm
- Unidad/símbolo suelto: ml
- Uso de 'un coma': un coma

### 7. Siglas, números de sección y títulos en su línea (51 fallas / 15845 palabras)
- Sigla en mayúsculas: UV
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: DNA
- Sigla en mayúsculas: UVR
- Sigla en mayúsculas: BRAF
- Sigla en mayúsculas: UVA
- Sigla en mayúsculas: UVB
- Sigla en mayúsculas: ABCD
- Sección con 'coma': seis coma un P
- Sección con 'coma': seis coma dos P

### 8. Palabras partidas y ligaduras (289 fallas / 15845 palabras)
- Corte por guion: diferen- cia
- Corte por guion: grue- so
- Corte por guion: intac- ta
- Corte por guion: defen- sinas
- Corte por guion: barre- ra
- Corte por guion: alcan- ce
- Corte por guion: desa- rrollo
- Corte por guion: san- gre
- Corte por guion: libe- ra
- Corte por guion: nor- malizar
