# Aceptación: Tema_26_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_26_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 18:42:25
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 39 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 52 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 10 / 24609 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 10 / 24609 palabras | Llamada numérica: gluconeogénesis8; Llamada tras puntuación: ida: • Grelina.un Es secret; Llamada tras puntuación: asa. • Leptina.dos Los adipo (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 2 / 24609 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: véase la figura; Ref. visual: la figura dos coma tres un |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 52 / 24609 palabras | Dígito sin convertir: eintiséis.6b, se mues; Dígito sin convertir: hidrógeno 2e– 2e– 2e–; Dígito sin convertir: ógeno 2e– 2e– 2e– Mat (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 7 / 24609 palabras | Título pegado al párrafo: a en la sangre. CUADRO veintiséis coma un Clases de nutrim; Título pegado al párrafo: da vegetariana. CUADRO veintiséis coma dos Requerimientos; Título pegado al párrafo: cido ascórbico. CUADRO veintiséis coma tres Requerimientos (+4 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 42 / 24609 palabras | Corte por guion: ace- cinco; Ligadura partida: fi siólogos; Ligadura partida: transfi ere (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (10 fallas / 24609 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (10 fallas / 24609 palabras)
- Llamada numérica: gluconeogénesis8
- Llamada tras puntuación: ida: • Grelina.un Es secret
- Llamada tras puntuación: asa. • Leptina.dos Los adipo
- Llamada tras puntuación: itocromos, Cyt,seis cinco enz
- Llamada tras puntuación: quimioosmótico,siete lo que su
- Llamada tras puntuación: stran caquexia,nueve una consu
- Llamada tras puntuación: se hematemesis,once vómito de
- Nota al pie leída: . ocho gleuk igual a azúcar; neo igual a nuevo; genesis igual a generación.
- Nota al pie leída: . diez ask igual a odre; tes igual a dedicado a.
- Nota al pie leída: . once haimia igual a sangre; eme igual a vomitar; sis igual a acción.

### 5. Figuras y tablas (sin 'ver figura', descripción) (2 fallas / 24609 palabras)
- Ref. visual: véase la figura
- Ref. visual: la figura dos coma tres un

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (52 fallas / 24609 palabras)
- Dígito sin convertir: eintiséis.6b, se mues
- Dígito sin convertir: hidrógeno 2e– 2e– 2e–
- Dígito sin convertir: ógeno 2e– 2e– 2e– Mat
- Dígito sin convertir: o 2e– 2e– 2e– Matriz
- Símbolo '+': hibidor + – + + –
- Símbolo '+': dor + – + + – – –
- Símbolo '+': r + – + + – – – –
- Símbolo '+': C6H12O6 + seis O2
- Símbolo '+': eis CO2 + seis H2
- Símbolo '+': o F A D + dos H →

### 7. Siglas, números de sección y títulos en su línea (7 fallas / 24609 palabras)
- Título pegado al párrafo: a en la sangre. CUADRO veintiséis coma un Clases de nutrim
- Título pegado al párrafo: da vegetariana. CUADRO veintiséis coma dos Requerimientos
- Título pegado al párrafo: cido ascórbico. CUADRO veintiséis coma tres Requerimientos
- Título pegado al párrafo: igual a empuje. FIGURA veintiséis coma seis Mecanismo quim
- Título pegado al párrafo: la circulación. CUADRO veintiséis coma cuatro Rutas del ca
- Título pegado al párrafo: suele ser malo. CUADRO veintiséis coma seis Funciones del
- Título pegado al párrafo: ácidos grasos. CUADRO veintiséis coma siete Aspectos prin

### 8. Palabras partidas y ligaduras (42 fallas / 24609 palabras)
- Corte por guion: ace- cinco
- Ligadura partida: fi siólogos
- Ligadura partida: transfi ere
- Ligadura partida: défi cit
- Ligadura partida: sufi cientes
- Ligadura partida: insignifi cantes
- Ligadura partida: sufi ciente
- Ligadura partida: fi jados
- Ligadura partida: efi caz
- Ligadura partida: fl agelos
