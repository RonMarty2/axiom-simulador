# Aceptación: Tema_05_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_05_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 14:53:05
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 49 párrafos | P37 (39.4%): veintisiete desmo igual a banda, unión, ligamento; soma igual a cuerpo. veintiocho... |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 27 párrafos PDF | PDF#24 (43.5%): ●Pronostique y dibuje un bosquejo del aspecto de una glándula acinar simple. 31 ác... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 13 / 19268 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Crédito: vaginal., Tomada de R. G. Kessel y R. H. Kardon, Tissu |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 36 / 19268 palabras | Llamada numérica: histología1; Llamada numérica: ectodermo3; Llamada numérica: epitelial6 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 31 / 19268 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: En el cuadro cinco coma un; Ref. visual: la figura cinco coma un; Ref. visual: En la figura cinco coma dos (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 24 / 19268 palabras | Símbolo '×': lgado., ×cuatroci; Símbolo '×': nales., ×mil, Asp; Símbolo '×': áquea., ×cuatroci (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 16 / 19268 palabras | Sigla en mayúsculas: FONDO; Título pegado al párrafo: ntes capítulos. cinco punto uno El estudio de los tejidos Resultado; Título pegado al párrafo: l a estudio de. CUADRO cinco coma un Las cuatro principale (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 430 / 19268 palabras | Corte por guion: célu- las; Corte por guion: fun- ción; Corte por guion: simila- res (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 49 párrafos)
- P37 (39.4%): veintisiete desmo igual a banda, unión, ligamento; soma igual a cuerpo. veintiocho...

### 2. Omisiones (PDF -> texto) (1 fallas / 27 párrafos PDF)
- PDF#24 (43.5%): ●Pronostique y dibuje un bosquejo del aspecto de una glándula acinar simple. 31 ác...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (13 fallas / 19268 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Crédito: vaginal., Tomada de R. G. Kessel y R. H. Kardon, Tissu

### 4. Notas al pie (llamadas y glosas) (36 fallas / 19268 palabras)
- Llamada numérica: histología1
- Llamada numérica: ectodermo3
- Llamada numérica: epitelial6
- Llamada numérica: moso8
- Llamada numérica: areolar15
- Llamada numérica: hialino18
- Llamada numérica: eritrocitos22
- Llamada numérica: miocitos25
- Llamada numérica: desmosoma27
- Llamada numérica: exocrinas29

### 5. Figuras y tablas (sin 'ver figura', descripción) (31 fallas / 19268 palabras)
- Ref. visual: En el cuadro cinco coma un
- Ref. visual: la figura cinco coma un
- Ref. visual: En la figura cinco coma dos
- Ref. visual: la figura cinco coma un cuatro
- Ref. visual: En el cuadro cinco coma dos
- Ref. visual: la figura cinco coma cuatro a
- Ref. visual: en el cuadro cinco coma tres
- Ref. visual: En la figura cinco coma dos ocho
- Ref. visual: En la figura cinco coma tres cero
- Ref. visual: En la figura cinco coma tres cuatro

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (24 fallas / 19268 palabras)
- Símbolo '×': lgado., ×cuatroci
- Símbolo '×': nales., ×mil, Asp
- Símbolo '×': áquea., ×cuatroci
- Símbolo '×': l pie., ×cuatroci
- Símbolo '×': ginal., ×cuatroci
- Símbolo '×': ípara., ×cuatroci
- Símbolo '×': riñón., ×cuatroci
- Símbolo '×': ndida., ×cuatroci
- Símbolo '×': bazo., ×cuatroci
- Símbolo '×': endón., ×cuatroci

### 7. Siglas, números de sección y títulos en su línea (16 fallas / 19268 palabras)
- Sigla en mayúsculas: FONDO
- Título pegado al párrafo: ntes capítulos. cinco punto uno El estudio de los tejidos Resultado
- Título pegado al párrafo: l a estudio de. CUADRO cinco coma un Las cuatro principale
- Título pegado al párrafo: un microscopio? cinco punto dos Tejido epitelial Resultados esperad
- Título pegado al párrafo: igual a cuerno. CUADRO cinco coma dos Epitelio simple Epit
- Título pegado al párrafo: ivas funciones? cinco punto tres Tejido conjuntivo Resultados espera
- Título pegado al párrafo: al a cartílago. CUADRO cinco coma seis Tejido adiposo FIGU
- Título pegado al párrafo: es respectivas? cinco punto cuatro Tejidos nervioso y muscular: tej...
- Título pegado al párrafo: igual a célula. CUADRO cinco coma nueve Sangre FIGURA cinc
- Título pegado al párrafo: ejido nervioso. FIGURA cinco coma dos cuatro Una neurona y

### 8. Palabras partidas y ligaduras (430 fallas / 19268 palabras)
- Corte por guion: célu- las
- Corte por guion: fun- ción
- Corte por guion: simila- res
- Corte por guion: colabo- ran
- Corte por guion: con- juntivos
- Corte por guion: gene- ral
- Corte por guion: mane- ras
- Corte por guion: especiali- za
- Corte por guion: especiali- zan
- Corte por guion: fundamen- tal
