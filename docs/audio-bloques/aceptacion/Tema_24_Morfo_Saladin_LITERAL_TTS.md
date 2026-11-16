# Aceptación: Tema_24_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_24_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:55:48
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 19 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 35 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 6 / 13774 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 9 / 13774 palabras | Llamada numérica: hipernatremia3; Llamada tras puntuación: ración cutánea,un agua que; Llamada tras puntuación: n, hipovolemia,dos ocurre cu (+6 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 13774 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 147 / 13774 palabras | Símbolo '+': C6H12O6 + seis O2; Símbolo '+': eis CO2 + seis H2; Símbolo '°': e veinte°C, sesen (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 80 / 13774 palabras | Sigla en mayúsculas: TBW; Sigla en mayúsculas: ICF; Sigla en mayúsculas: ECF (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 16 / 13774 palabras | Ligadura partida: fl otado; Ligadura partida: sufi ciente; Ligadura partida: défi cit (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (6 fallas / 13774 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (9 fallas / 13774 palabras)
- Llamada numérica: hipernatremia3
- Llamada tras puntuación: ración cutánea,un agua que
- Llamada tras puntuación: n, hipovolemia,dos ocurre cu
- Llamada tras puntuación: elación veinte:un de HCO3 –
- Llamada tras puntuación: elación veinte:un entre los
- Llamada tras puntuación: s parenterales.cuatro La más co
- Nota al pie leída: . dos hypo igual a debajo de lo normal; uol igual a volumen; haemia igua...
- Nota al pie leída: . tres natr igual a sodio; haemia igual a sangre.
- Nota al pie leída: . cuatro para igual a además de; enter igual a intestino.

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (147 fallas / 13774 palabras)
- Símbolo '+': C6H12O6 + seis O2
- Símbolo '+': eis CO2 + seis H2
- Símbolo '°': e veinte°C, sesen
- Símbolo '°': a y ocho°F,. • cu
- Símbolo '+': rmal mV + – mV +
- Símbolo '+': + – mV + – mV +
- Símbolo '+': + – mV + – RMP a
- Símbolo '+': no: CO2 + H2O H2C
- Símbolo '+': 3 HCO3 –+ hidróge
- Símbolo '+': O4 dos– + hidróge

### 7. Siglas, números de sección y títulos en su línea (80 fallas / 13774 palabras)
- Sigla en mayúsculas: TBW
- Sigla en mayúsculas: ICF
- Sigla en mayúsculas: ECF
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: PCT
- Sigla en mayúsculas: GFR
- Sigla en mayúsculas: ANP
- Sigla en mayúsculas: BNP
- Sigla en mayúsculas: RMP
- Sigla en mayúsculas: COOH

### 8. Palabras partidas y ligaduras (16 fallas / 13774 palabras)
- Ligadura partida: fl otado
- Ligadura partida: sufi ciente
- Ligadura partida: défi cit
- Ligadura partida: efi caces
- Ligadura partida: efi caz
- Ligadura partida: efi cacia
- Ligadura partida: sufi cientes
- Ligadura partida: fl ujograma
- Ligadura partida: fi jado
- Ligadura partida: fi jarlo
