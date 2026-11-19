# Aceptación: Tema_23_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_23_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-19 07:53:32
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 43 párrafos | P31 (81.7%): CAPÍTULO veintitrés El aparato urinario sencia de estas sustancias es un indicador... |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 3 / 52 párrafos PDF | PDF#4 (78.6%): ●¿Cómo se produce en el cuerpo cada uno de estos desechos? 1 azoe = nitrógeno; hai...; PDF#22 (82.4%): –18 mmHgentrada NFP 10 salida Presión de filtración neta (NFP) 60 salida 32 entrad...; PDF#39 (81.8%): HCO3– Ácido úrico H2O Na+ K+ Cl– H2O Túbulo colector Asa de Henle: Extremidad desc... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 15 / 20693 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Crédito: e, a, fue tomada de R. G. Kessel y R. H. Kardon, Tissu |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 33 / 20693 palabras | Llamada numérica: azoemia1; Llamada numérica: pelvis2; Llamada numérica: miogénico11 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 1 / 20693 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: Como se observa |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 30 / 20693 palabras | Dígito sin convertir: eintitrés.5b se prese; Dígito sin convertir: N F P, de 60salida – 1; Dígito sin convertir: 0salida – 18entrada – (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 4 / 20693 palabras | Sigla en mayúsculas: HN; Sigla en mayúsculas: TEMAS; Sigla en mayúsculas: TODOS |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 14 / 20693 palabras | Corte por guion: pre- dieciocho; Ligadura partida: fi nas; Ligadura partida: fi jados (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 43 párrafos)
- P31 (81.7%): CAPÍTULO veintitrés El aparato urinario sencia de estas sustancias es un indicador...

### 2. Omisiones (PDF -> texto) (3 fallas / 52 párrafos PDF)
- PDF#4 (78.6%): ●¿Cómo se produce en el cuerpo cada uno de estos desechos? 1 azoe = nitrógeno; hai...
- PDF#22 (82.4%): –18 mmHgentrada NFP 10 salida Presión de filtración neta (NFP) 60 salida 32 entrad...
- PDF#39 (81.8%): HCO3– Ácido úrico H2O Na+ K+ Cl– H2O Túbulo colector Asa de Henle: Extremidad desc...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (15 fallas / 20693 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Crédito: e, a, fue tomada de R. G. Kessel y R. H. Kardon, Tissu

### 4. Notas al pie (llamadas y glosas) (33 fallas / 20693 palabras)
- Llamada numérica: azoemia1
- Llamada numérica: pelvis2
- Llamada numérica: miogénico11
- Llamada numérica: mácula12
- Llamada numérica: diuresis17
- Llamada numérica: oliguria21
- Llamada numérica: anuria22
- Llamada numérica: mellitus24
- Llamada numérica: cálculo25
- Llamada numérica: litotripsia26

### 5. Figuras y tablas (sin 'ver figura', descripción) (1 fallas / 20693 palabras)
- Ref. visual: Como se observa

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (30 fallas / 20693 palabras)
- Dígito sin convertir: eintitrés.5b se prese
- Dígito sin convertir: N F P, de 60salida – 1
- Dígito sin convertir: 0salida – 18entrada –
- Dígito sin convertir: entrada – 32entrada ig
- Símbolo '+': dos NH3 + CO2 → H
- Símbolo '+': N–C–NH2 + H2O Otr
- Símbolo '×': a N F P × Kf igua
- Símbolo '×': a diez × doce co
- Símbolo '+': P A D P + Pi Gluc
- Símbolo '×': ticinco × dos com

### 7. Siglas, números de sección y títulos en su línea (4 fallas / 20693 palabras)
- Sigla en mayúsculas: HN
- Sigla en mayúsculas: TEMAS
- Sigla en mayúsculas: TODOS

### 8. Palabras partidas y ligaduras (14 fallas / 20693 palabras)
- Corte por guion: pre- dieciocho
- Ligadura partida: fi nas
- Ligadura partida: fi jados
- Ligadura partida: fi ltren
- Ligadura partida: sufi ciente
- Ligadura partida: fl uya
- Ligadura partida: fl uctuaciones
- Ligadura partida: fi nes
- Ligadura partida: efi cacia
- Ligadura partida: transfi eren
