# Auditoría del flujo de audiolibros de Medicina · 15-nov-2026

Pedido de Ronald: revisar cómo se genera el audio «para que salga bien» antes de producir el Libro 3. Fuente: `agy` (lectura, `%LOCALAPPDATA%\axiom-agy\20261115-070158_lectura`) + comprobaciones de Claude con código sobre `_MOTOR_AUDIO/` y `_TEXTO_LITERAL_VERIFICADO/` (50 textos). Todo bajo `examenes pasados/MEDICINA/LIBROS DE MEDICINA/`.
Python: usar `C:/Program Files/Python311/python.exe` (tiene `fitz`), sin `-I`.

## Flujo real
1. `extraer_morfo_cap_NN.py` -> `extraer_capitulo_literal` + `adaptar_fonetica_literal` (`extraer_literal_pdf.py`) -> guarda `Tema_NN_..._LITERAL_TTS.md` y llama al linter.
2. `procesar_morfo_cap_NN_acelerado.py` -> lee ese `.md` TAL CUAL (sin más limpieza), trocea en bloques de ~100 palabras, sintetiza con Gemini TTS voz Puck (`sintetizar_paralelo.py`, hasta 7 claves en paralelo, caché `parte_NNN.wav`), arma pistas y MP3 128k con ffmpeg.
3. Whisper (`auditor_whisper.py`, modelo `base`, umbral 92 % de similitud): **no está conectado a ningún script de producción**. Solo lo llaman `auditar_tema_1..4.py`, `procesar_tema_1.py` y `ejecutar_auditoria_prueba.py` (Calvo temas 1-4).
4. No se manda instrucción de estilo a la voz (solo `voice_name=Puck`).

## Fallas COMPROBADAS (con ejemplos reales)
| # | Falla | Evidencia |
|---|---|---|
| 1 | **Miles leídos como decimal** (`3.000` -> «tres coma cero cero cero») | 63 casos en los textos ya producidos (Calvo 59, Saladin 4). Ej. Calvo Tema 07: «más de tres coma cero cero cero millones de nucleótidos» (son tres mil millones), «dos coma cero cero cero poros», «diez coma cero cero cero veces» |
| 2 | **Palabras cortadas por guion de fin de línea** («coa- gulaba», «sur- gían») no se unen en Saladin | 2.176 casos en Saladin (Calvo 5). `procesar_*` lee el `.md` sin limpiarlo. Cómo las pronuncia la voz: NO escuchado |
| 3 | **Pies y referencias de figura/tabla leídos como texto** («figura tres coma dos», «fi gura») | 2.714 menciones (Saladin 2.280, Calvo 434). El oyente no tiene la figura; no se inserta descripción hablada (el SKILL lo exige, el código no lo hace) |
| 4 | Símbolos sin pasar a palabras: `μ`, `×` | 259 `μ` y 72 `×` en los textos; el linter no los detecta |
| 5 | **Linter mal invocado en Saladin cap. 17-29**: recibe la ruta del archivo, no el texto (`extraer_morfo_cap_17..29.py`, 13 capítulos) | `auditar_texto_pre_tts(out_file)`; hoy esos textos pasan el linter real, pero entonces no se revisaron |
| 6 | `1` se lee «un» («capítulo un», «el un») y decimales `2,1` -> «dos coma un» | prueba con `adaptar_fonetica_literal` |
| 7 | `extraer_capitulo_literal` borra toda línea de 1-4 dígitos (page number) | en tablas son datos: crítico para Estadística |
| 8 | Páginas escaneadas: sin capa de texto se saltan en silencio; con OCR malo se manda basura al TTS | `extraer_literal_pdf.py:175-190` |
| 9 | Linter no cubre griegas, superíndices, `√`, `Σ`, siglas nuevas (SPSS, ANOVA, OMS...), «figura/tabla» | `linter_texto.py` |
| 10 | Agentes desactualizados y contradictorios (`libro-audio-tts` dice EdS pausada, pide reescribir objetivos y narrar diagramas; el SKILL manda literalidad) | `agentes/libro-audio-tts.md`, `agentes/libro-audio-auditor.md` |

Lo que NO se pudo comprobar: cómo suena cada defecto en el MP3 (no se escuchó nada). Whisper no se corrió sobre Saladin.

## Qué hacer (en orden)
1. Corregir `extraer_literal_pdf.py`: miles (`\d{1,3}(\.\d{3})+` = entero, resto decimal), «uno/un» según contexto, unir cortes de guion, no borrar números de tablas, convertir `μ`->«micro», `×`->«por», griegas por nombre.
2. Corregir el linter: revisar TEXTO (no ruta) en los 13 scripts; añadir griegas, superíndices, `×`, «figura|tabla|cuadro» y siglas nuevas; que falle de verdad (código de salida distinto de 0).
3. Decidir el tratamiento de figuras: (a) quitar las referencias («como se ve en la figura tres coma dos») y leer solo el pie; (b) insertar descripción hablada escrita aparte. Recomendada: (a) para texto literal, porque (b) añade palabras del autor que no existen.
4. Conectar Whisper al flujo (umbral 92 % no basta: una omisión menor al 8 % pasa).
5. Regenerar SOLO los bloques cuyo texto cambie (la caché `parte_NNN.wav` ya está por bloque): empezar por los 63 de «miles» en Calvo, que son error de dato.
6. Actualizar los dos agentes según lo anterior.
7. Libro 3: OCR de las págs. 32-74 y regla de fórmulas/tablas de Estadística, antes de sintetizar nada. Esperar el temario oficial.
