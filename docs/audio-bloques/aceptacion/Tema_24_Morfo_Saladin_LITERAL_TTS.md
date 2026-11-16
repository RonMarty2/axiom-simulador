# Aceptación: Tema_24_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_24_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 15:01:13
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 2 / 21 párrafos | P15 (89.9%): CAPÍTULO veinticuatro Equilibrios hídrico, hidroelectrolítico y acidobásico El sis...; P17 (87.2%): CAPÍTULO veinticuatro Equilibrios hídrico, hidroelectrolítico y acidobásico H2CO3... |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 35 párrafos PDF | PDF#23 (71.4%): ●Si el pH del líquido tubular se redujera, ¿cómo cambiaría la concentración de Na+? |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 6 / 14017 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 9 / 14017 palabras | Llamada numérica: hipernatremia3; Llamada tras puntuación: ración cutánea,un agua que; Llamada tras puntuación: n, hipovolemia,dos ocurre cu (+6 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 14017 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 23 / 14017 palabras | Símbolo '+': C6H12O6 + seis O2; Símbolo '+': eis CO2 + seis H2; Símbolo '+': rmal mV + – mV + (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 8 / 14017 palabras | Sigla en mayúsculas: FONDO; Título pegado al párrafo: do en el edema? FIGURA veinticuatro coma dos Ingesta y exc; Título pegado al párrafo: guíneo estable. CUADRO veinticuatro coma un Formas de dese (+5 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 16 / 14017 palabras | Ligadura partida: fl otado; Ligadura partida: sufi ciente; Ligadura partida: défi cit (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (2 fallas / 21 párrafos)
- P15 (89.9%): CAPÍTULO veinticuatro Equilibrios hídrico, hidroelectrolítico y acidobásico El sis...
- P17 (87.2%): CAPÍTULO veinticuatro Equilibrios hídrico, hidroelectrolítico y acidobásico H2CO3...

### 2. Omisiones (PDF -> texto) (1 fallas / 35 párrafos PDF)
- PDF#23 (71.4%): ●Si el pH del líquido tubular se redujera, ¿cómo cambiaría la concentración de Na+?

### 3. Relleno leído (biblio, autoeval, créditos, portada) (6 fallas / 14017 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (9 fallas / 14017 palabras)
- Llamada numérica: hipernatremia3
- Llamada tras puntuación: ración cutánea,un agua que
- Llamada tras puntuación: n, hipovolemia,dos ocurre cu
- Llamada tras puntuación: elación veinte:un de HCO3 –
- Llamada tras puntuación: elación veinte:un entre los
- Llamada tras puntuación: s parenterales.cuatro La más co
- Nota al pie leída: . dos hypo igual a debajo de lo normal; uol igual a volumen; haemia igua...
- Nota al pie leída: . tres natr igual a sodio; haemia igual a sangre.
- Nota al pie leída: . cuatro para igual a además de; enter igual a intestino.

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (23 fallas / 14017 palabras)
- Símbolo '+': C6H12O6 + seis O2
- Símbolo '+': eis CO2 + seis H2
- Símbolo '+': rmal mV + – mV +
- Símbolo '+': + – mV + – mV +
- Símbolo '+': + – mV + – R M P
- Símbolo '+': no: CO2 + H2O H2C
- Símbolo '+': 3 HCO3 –+ hidróge
- Símbolo '+': O4 dos– + hidróge
- Símbolo '+': o menos + hidróge
- Símbolo '+': l. –NH2 + hidróge

### 7. Siglas, números de sección y títulos en su línea (8 fallas / 14017 palabras)
- Sigla en mayúsculas: FONDO
- Título pegado al párrafo: do en el edema? FIGURA veinticuatro coma dos Ingesta y exc
- Título pegado al párrafo: guíneo estable. CUADRO veinticuatro coma un Formas de dese
- Título pegado al párrafo: os metabólicos. FIGURA veinticuatro coma nueve Efectos de
- Título pegado al párrafo: en la sangre,. FIGURA veinticuatro coma un cero Secreción
- Título pegado al párrafo: hasta la orina. FIGURA veinticuatro coma un dos La relació
- Título pegado al párrafo: ache del E C F? CUADRO veinticuatro coma dos Algunas causa
- Recuadro pegado al párrafo: y acidobásico CONOCIMIENTO MÁS A FONDO veinticuatro coma dos Aplica...

### 8. Palabras partidas y ligaduras (16 fallas / 14017 palabras)
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
