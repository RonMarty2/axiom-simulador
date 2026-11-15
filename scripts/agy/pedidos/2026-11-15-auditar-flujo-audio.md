# Pedido de lectura (solo lectura, no edites nada)

Lee `CLAUDE.md` y `docs/mapa-libro-eds.md`.

Contexto: el audiolibro de Medicina (Calvo y Saladin) se generó con scripts en
`examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO/`. Falta producir el Libro 3 (Educación en Salud e Investigación): texto normal, un bloque ESCANEADO con capa de OCR de calidad dudosa (pág. 32-74) y un bloque de ESTADÍSTICA con tablas, fórmulas, símbolos griegos y cifras con separadores de miles y decimales (pág. 75-227).

Lee: `SKILL_AUDIOLIBROS_MEDICINA.md`, `linter_texto.py`, `extraer_literal_pdf.py`, `sintetizar_libro.py`, `sintetizar_paralelo.py`, `segmentador_semantico.py`, `auditor_whisper.py`, `cadena_continua_saladin.py`, un `extraer_morfo_cap_29.py`, un `procesar_morfo_cap_29_acelerado.py`, y los agentes `agentes/libro-audio-tts.md` y `agentes/libro-audio-auditor.md`.

Ya sabemos (no lo repitas, solo confirma o corrige): `adaptar_fonetica_literal` convierte `1.500` en «uno coma cinco cero cero» (trata el punto de miles como decimal); `extraer_capitulo_literal` descarta toda línea que sea solo un número de 1 a 4 dígitos (en tablas son datos); el linter no detecta letras griegas, superíndices, √, Σ ni «figura/tabla»; el agente dice que Educación en Salud está pausada.

Responde, con `archivo:línea` y solo lo comprobado (si no estás seguro: «no verificado»):
1. Pasos reales del flujo de punta a punta, en orden (extraer, adaptar, linter, trozar, sintetizar, cachear, ensamblar, Whisper, MP3), con el script de cada paso y cómo se invoca.
2. Qué hace el flujo con figuras, tablas y pies de figura hoy (¿inserta descripción hablada como dice el SKILL, o solo lee el pie?).
3. Qué hace con páginas sin texto o con texto basura (escaneadas): ¿falla, salta o lee basura?
4. Qué verifica Whisper exactamente (umbral de concordancia, qué se hace si falla) y si cubre omisiones.
5. Contradicciones entre el SKILL, los dos agentes y el código (ej. marcas `<short pause>` que el código nunca inserta, objetivos «Primero:...» frente a literalidad).
6. Qué le falta al flujo para el Libro 3 (OCR, tablas, fórmulas, siglas nuevas como SPSS, Excel, letras griegas, números con separador).
7. Parámetros de la API de voz: modelos, voz, instrucción de estilo (prompt) que se manda al TTS, tamaño de bloque, reintentos y cuota.

Formato: 7 secciones cortas, máximo 90 líneas.
