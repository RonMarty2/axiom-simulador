# Aceptación: Tema_03_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_03_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:44:00
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 42 párrafos | P5 (89.9%): Resultados esperados del aprendizaje Cuando haya completado esta sección, el estud... |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 35 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 8 / 19124 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 29 / 19124 palabras | Llamada numérica: citología1; Llamada numérica: microvellosidades9; Llamada numérica: agelo13 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 9 / 19124 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: En el cuadro tres coma un; Ref. visual: En la figura tres coma cinco; Ref. visual: la figura tres coma dos seis (+6 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 153 / 19124 palabras | Dígito sin convertir: gura tres.6b se ilust; Dígito sin convertir: gura tres.30a, es un c; Símbolo '×': diez μm × diez μm (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 112 / 19124 palabras | Sigla en mayúsculas: LO; Sigla en mayúsculas: LM; Sigla en mayúsculas: SEM (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 389 / 19124 palabras | Corte por guion: coa- gulaba; Corte por guion: sur- gían; Corte por guion: desacredi- tada (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 42 párrafos)
- P5 (89.9%): Resultados esperados del aprendizaje Cuando haya completado esta sección, el estud...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (8 fallas / 19124 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (29 fallas / 19124 palabras)
- Llamada numérica: citología1
- Llamada numérica: microvellosidades9
- Llamada numérica: agelo13
- Llamada numérica: ósmosis14
- Llamada numérica: hipotónica15
- Llamada numérica: hipertónicas16
- Llamada numérica: cotransporte18
- Llamada numérica: fagocitosis21
- Llamada numérica: hipercolesterolemia26
- Llamada numérica: mitocondrias33

### 5. Figuras y tablas (sin 'ver figura', descripción) (9 fallas / 19124 palabras)
- Ref. visual: En el cuadro tres coma un
- Ref. visual: En la figura tres coma cinco
- Ref. visual: la figura tres coma dos seis
- Ref. visual: En la figura tres
- Ref. visual: El cuadro tres coma dos
- Ref. visual: En la figura tres coma un cinco
- Ref. visual: En el cuadro tres coma tres
- Ref. visual: Consúltese el cuadro
- Ref. visual: En el cuadro tres coma cuatro

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (153 fallas / 19124 palabras)
- Dígito sin convertir: gura tres.6b se ilust
- Dígito sin convertir: gura tres.30a, es un c
- Símbolo '×': diez μm × diez μm
- Símbolo '×': diez μm × seis la
- Símbolo '×': 3, diez × diez ×
- Símbolo '×': × diez × diez μm
- Símbolo '×': inte μm × veinte
- Símbolo '×': inte μm × seis la
- Símbolo '×': veinte × veinte
- Símbolo '×': inte μm × seis ig

### 7. Siglas, números de sección y títulos en su línea (112 fallas / 19124 palabras)
- Sigla en mayúsculas: LO
- Sigla en mayúsculas: LM
- Sigla en mayúsculas: SEM
- Sigla en mayúsculas: ICF
- Sigla en mayúsculas: ECF
- Sigla en mayúsculas: DNA
- Sigla en mayúsculas: CAM
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: CUDRO
- Sigla en mayúsculas: CF

### 8. Palabras partidas y ligaduras (389 fallas / 19124 palabras)
- Corte por guion: coa- gulaba
- Corte por guion: sur- gían
- Corte por guion: desacredi- tada
- Corte por guion: rea- lizados
- Corte por guion: pro- ductos
- Corte por guion: aun- que
- Corte por guion: cuan- tiosas
- Corte por guion: preexisten- tes
- Corte por guion: funda- mentales
- Corte por guion: siguien- tes
