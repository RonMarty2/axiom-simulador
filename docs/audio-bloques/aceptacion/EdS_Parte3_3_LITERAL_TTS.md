# Aceptación: EdS_Parte3_3_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\PSA_2027_FUENTES\audio_eds\EdS_Parte3_3_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt"
- **Fecha:** 2026-11-19 08:26:00
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 6)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 9 / 29 párrafos | P3 (25.7%): g uno igual a sigma, x i menos equis barra, al cubo sobre, n s al cubo; para datos...; P6 (82.6%): Sesgo mayor que cero: sesgo positivo o a la derecha. Sesgo igual a cero: simetría...; P8 (88.9%): Tabla treinta y seis. Sesgo para la puntuación de la evaluación de desempeño de si... (+6 más en Detalle) |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 20 / 32 párrafos PDF | PDF#13 (0.0%): A partir de los datos presentados en los capítulos 8 y 9, sobre la prueba; PDF#14 (33.3%): esta herramienta se encuentra inactiva en la mayoría de los equipos y; PDF#15 (0.0%): denciar si la función se encuentra activa o inactiva en el equipo. (+7 más en Detalle) |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 1183 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 1183 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 1183 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 25 / 1183 palabras | Miles como decimal: cero coma cero cero uno; Miles como decimal: cero coma siete dos nueve; Miles como decimal: cero coma dos uno seis (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 1183 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 1183 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (9 fallas / 29 párrafos)
- P3 (25.7%): g uno igual a sigma, x i menos equis barra, al cubo sobre, n s al cubo; para datos...
- P6 (82.6%): Sesgo mayor que cero: sesgo positivo o a la derecha. Sesgo igual a cero: simetría...
- P8 (88.9%): Tabla treinta y seis. Sesgo para la puntuación de la evaluación de desempeño de si...
- P9 (0.0%): Tabla. Para cada Empleado, se dan: Calificación, x i, Media de la muestra, equis b...
- P11 (0.0%): g uno igual a sigma, x i menos equis barra, al cubo sobre, N s al cubo, igual a ce...
- P15 (23.1%): g dos igual a, sigma, x i menos equis barra, a la cuatro sobre, n s a la cuatro, m...
- P25 (88.9%): Tabla treinta y siete. Curtosis para la puntuación de la evaluación de desempeño d...
- P26 (0.0%): Tabla. Para cada Empleado, se dan: Calificación, x i, Media de la muestra, equis b...
- P28 (0.0%): g dos igual a, sigma, x i menos equis barra, a la cuatro sobre, N s a la cuatro, m...

### 2. Omisiones (PDF -> texto) (20 fallas / 32 párrafos PDF)
- PDF#13 (0.0%): A partir de los datos presentados en los capítulos 8 y 9, sobre la prueba
- PDF#14 (33.3%): esta herramienta se encuentra inactiva en la mayoría de los equipos y
- PDF#15 (0.0%): denciar si la función se encuentra activa o inactiva en el equipo.
- PDF#16 (0.0%): »» En la pestaña superior izquierda, al dar clic en el menú ARCHIVO
- PDF#17 (0.0%): Gráfica 15. Ubicación del icono “Opciones” para la activación de la función “Análi...
- PDF#18 (0.0%): Gráfica 16. Ubicación de la opción “Complementos” para la activación de la función...
- PDF#19 (0.0%): Gráfica 19. Confirmación de la activación de la herramienta “Análisis de datos aná...
- PDF#20 (0.0%): De esta manera queda activa la función “Análisis de datos” en el
- PDF#21 (0.0%): la función “Análisis de datos” se debe generar la base de datos,
- PDF#22 (0.0%): o característica que se está estudiando y facilitar la toma de decisio-

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (25 fallas / 1183 palabras)
- Miles como decimal: cero coma cero cero uno
- Miles como decimal: cero coma siete dos nueve
- Miles como decimal: cero coma dos uno seis
- Miles como decimal: cero coma cero dos siete
- Miles como decimal: cero coma cero seis cuatro
- Miles como decimal: cero coma cero tres seis
- Miles como decimal: cero coma cero uno siete
- Miles como decimal: cero coma seis cinco seis
- Miles como decimal: cero coma uno dos nueve
- Miles como decimal: cero coma cero cero ocho
