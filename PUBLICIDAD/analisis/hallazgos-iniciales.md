# Hallazgos iniciales del video de referencia

- Archivo: `referencia/referencia.mp4`, 720x1280 (9:16), 30 fps, 33 s, con audio (voz en off en español, acento mexicano).
- Producto anunciado: **DespachoEnLínea** (software para despachos jurídicos, México).
- Tipo de video: **motion graphics / tipografía cinética** sobre fondo crema. No hay personas ni tomas reales. Sin cortes de cámara detectados: todo es animación continua de texto y maquetas de interfaz.
- Contacto de fotogramas: `analisis/contacto.jpg` (1 frame por segundo). Frames sueltos en `analisis/frames/`.

## Guion (transcripción Whisper)
| t (s) | Voz | Visual |
|---|---|---|
| 0-7.8 | "Tu despacho, completo: clientes, expedientes, acuerdos, agenda, documentos y cobranza, en un solo lugar." | Título "Tu despacho, completo." y luego tarjetas de UI (Clientes, Expedientes, Acuerdos, Agenda, Documentos, Cobranza) que van apareciendo y se acomodan en un panel móvil "En un solo lugar." |
| 7.8-12.6 | "Te avisa de todo por WhatsApp: audiencias, plazos, tareas y acuerdos." | Texto "Te avisa de todo por WhatsApp" (WhatsApp en verde) y notificaciones tipo WhatsApp que caen apiladas |
| 12.6-15.9 | "Y el mejor investigador jurídico con inteligencia artificial." | "EL MEJOR INVESTIGADOR JURÍDICO con Inteligencia Artificial" y aparece una barra de búsqueda |
| 15.9-17.4 | "Pregúntale como a un colega." | Texto + pregunta escribiéndose en la barra |
| 17.4-24.0 | "Tu agente buscará por ti en la Suprema Corte, el DOF, las leyes federales y las de tu estado." | "Tu agente busca por ti." con líneas que conectan la búsqueda a 4 chips de fuentes |
| 24.0-28.6 | "Y citará la fuente de cada respuesta, de horas de búsqueda a minutos." | Tarjeta de respuesta con cita, "Cada respuesta, con su fuente." y contador "HORAS" que cambia a "MINUTOS" |
| 28.6-30.8 | "Despacho en línea. Empieza gratis." | Logo (cuadrado marrón con D), botón "Empieza gratis", URL |

## Implicación para Google Flow
Flow (Veo) genera video fotorrealista/cinematográfico y es **malo para texto exacto, maquetas de UI y tipografía animada**. Replicar este estilo tal cual con Veo saldría mal (texto deformado). Opciones:
1. Motion graphics programático (HTML/CSS + captura, o Remotion/After Effects-like) con voz en off sintética. Es lo que realmente se parece al original.
2. Híbrido: Flow para escenas con personas/ambiente (alumno estudiando, celular, Cochabamba) y el texto/UI de Axiom encima en postproducción.
3. Solo Flow: estilo distinto al de referencia (live action).
