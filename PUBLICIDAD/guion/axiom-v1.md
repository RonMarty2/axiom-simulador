# Guion Axiom v1 (9:16, 34 s)

Agentes: guionista-prompts, con el copy del redactor-publicitario y el brief en `brief/axiom-v1.md`. Estructura de `analisis/anatomia.md`.
Voz: 79 palabras, ~2,5 palabras/s, español de Bolivia, tuteo, cálida y segura. Pronunciar "Áxiom". Cifra hablada: "tres mil ochocientas".
Estilo visual (MOTION): fondo crema `#faf7f0` con degradado suave a `#f2ece0`, texto `#1a1f2e`, acento terracota `#9c3d1c`, títulos Crimson 800, UI Atkinson, entrada de texto con blur + translateY, transiciones con fundido + desenfoque (sin cortes), como la referencia. Pantallas reales de la app (capturas de `/simulador`, `/errores`, `/debilidades`, `/aprende`, `/laminas`), no pantallas inventadas.

## Tabla por escena

| # | Tiempo | Voz en off (exacta) | Texto en pantalla | Visual | Herramienta |
|---|---|---|---|---|---|
| 1 Gancho + integración | 0.0-7.6 | "Tu ingreso a la UMSS, completo: exámenes pasados, simulacros, lecciones, láminas, errores y debilidades, en un solo lugar." (19 p.) | "Tu ingreso a la UMSS," / "completo." (terracota). Píldora "6 herramientas → 1". Cierra: "En un solo lugar." | "Tu / ingreso / a la UMSS," entra palabra a palabra (blur-reveal); "completo." en terracota. 6 tarjetas entran cada ~0,8 s al ritmo de la voz: Exámenes pasados, Simulacros, Lecciones, Láminas, Mis errores, Mis debilidades. Se funden en un panel móvil (captura real). | MOTION |
| 2 Aviso | 7.6-12.8 | "Te avisa dónde fallas: tus errores y tus puntos débiles, listos para repasar." (13 p.) | "Te avisa dónde **fallas**" (terracota). Sub gris: "Errores · debilidades · repaso" | Panel desenfocado de fondo. Entran 3-4 banners tipo notificación que caen con rebote suave, con textos tomados de la app ("Mis errores", "Tus secciones más débiles"), sin números inventados. | MOTION |
| 3 IA | 12.8-16.4 | "Y un simulacro con IA que arma exámenes nuevos." (9 p.) | Kicker "EL SIMULACRO" / "INTELIGENTE", debajo "con IA." (terracota) | Kicker pequeño espaciado + título grande en 2 líneas; aparece el botón de crear simulacro (captura real de `/practicar`). | MOTION |
| 4 Demostración | 16.4-19.6 (voz 16.4-18.8) | "Resuelve como en el examen real." (6 p.) | "Resuelve como en el examen real." / chip "5 opciones" | Alumna con celular (Flow-A) en los primeros ~2 s; sobre la pantalla del celular se compone en postproducción la captura real del simulador con una pregunta y 5 opciones, y se marca una. Push-in hasta llenar el cuadro con la UI. | **FLOW (A)** + MOTION encima |
| 5 Explicación | 19.6-24.8 (voz 18.8-24.0) | "Cada pregunta, resuelta paso a paso: ves el porqué, no solo la letra." (13 p.) | "Cada pregunta, **paso a paso**" (terracota) | Tarjeta de pregunta con la opción marcada y debajo la explicación real de una pregunta del banco (copiar de `data/examenes`, con su KaTeX) que se escribe por bloques. Líneas de la pregunta a 3 pasos que se encienden de a uno. | MOTION |
| 6 Prueba + contraste | 24.8-31.2 (voz 24.0-30.4) | "Más de tres mil ochocientas preguntas de exámenes pasados de la UMSS, de memorizar a entender." (16 p.) | "+3.800 preguntas · 2005-2025". Remate: "MEMORIZAR" (gris) → "ENTENDER" (terracota, más grande y pesado) | Contador que sube hasta 3.848 y se queda en "+3.800"; fila de años 2005 a 2025. Pausa casi en blanco 0,4 s y crossfade MEMORIZAR → ENTENDER con ícono lineal de bombilla. | MOTION |
| 7 CTA | 31.2-34.0 (voz 30.4-31.6) | "Axiom. Empieza gratis." (3 p.) | Logo (ícono de `src/app/icon.tsx`) + "Axiom", botón negro "Empieza gratis", URL (ver verificaciones) | Logo scale 0,9→1 + fade, botón, URL. Aire final ~2,5 s sin movimiento fuerte. | MOTION |

Total voz: 19+13+9+6+13+16+3 = 79 palabras. La imagen entra 0,3-0,8 s antes de la voz (regla de la referencia). Música: cama suave -28 dB opcional; versión sin música para estados de WhatsApp.

## Variantes de gancho (reemplazan SOLO la escena 1)

**Gancho A (motion, principal):** el de la tabla.

**Gancho B (persona, Flow-B + MOTION):** misma duración (0.0-7.6).
- Voz: "¿Exámenes en un lado, lecciones en otro? Aquí está todo en un solo lugar: exámenes, simulacros, lecciones y láminas." (19 p.)
- 0-2.6: toma Flow-B (alumna agobiada); texto en pantalla "¿Exámenes en un lado, lecciones en otro?"
- 2.6-7.6: fundido/desenfoque a 4 tarjetas que se funden en el panel móvil, con "En un solo lugar.". Desde la escena 2 todo igual.

## Flow: qué escenas y por qué
Máximo 2, solo personas y ambiente, nada de texto ni UI dentro del cuadro:
- **Flow-A, escena 4:** alumna usando el celular. Se genera con la pantalla en blanco y la UI real se compone encima. Se usan ~3 s del clip de 8 s.
- **Flow-B, gancho B (opcional):** la misma alumna, agobiada. Solo se genera si Ronald elige correr la variante B.
Todo lo demás es MOTION: la referencia es motion graphics y Veo deforma el texto.
Voz: NO usar audio de Flow (voces y acentos inconsistentes según `flow/guia-flow.md`). Voz en off aparte (TTS o Ronald); clips Flow sin diálogo.

Parámetros: Veo 3.1 Fast, 9:16, 8 s, x2 salidas para elegir. Costo según la guía: 20 puntos por clip Fast [COMPROBADO EN UI]. Máximo: 2 clips x 2 salidas x 20 = 80 puntos. Dejar "Confirmar antes de generar: Siempre".

### Bloque de consistencia (pegar al inicio de CADA prompt Flow, palabra por palabra)
```
CHARACTER (identical in every clip): Camila, a Bolivian high-school graduate of about 18, warm brown skin, round face, long dark brown hair tied in a low ponytail, small silver stud earrings, mustard-yellow zip hoodie over a plain white t-shirt, no other jewelry. SETTING (identical): a small bedroom study corner in Cochabamba, Bolivia, wooden desk against a window, late-afternoon warm golden light, plain cream-colored wall, a few notebooks and a pencil case on the desk. STYLE (identical): realistic cinematic look, 35 mm lens, shallow depth of field, soft natural light, warm color grade with cream and terracotta tones.
```

### Prompt Flow-A (escena 4)
```
Vertical 9:16. [paste CONSISTENCY BLOCK above.]
Medium close-up from slightly over her shoulder. Camila sits at the desk holding her smartphone in her right hand at chest height, screen tilted toward her face and partly toward the camera. The phone screen is a plain, evenly lit blank white-cream panel with absolutely no content, no text, no icons. She reads attentively, taps once with her thumb, then gives a small, relieved nod and a slight smile. Camera: slow push-in toward the phone screen over 8 seconds, ending with the phone screen filling most of the frame, steady and straight-on. Audio: soft room ambience and a faint street sound through the window, no speech, no music. Negative: no subtitles, no on-screen text, no logos, no readable writing on notebooks, no extra people, no deformed hands.
```

### Prompt Flow-B (gancho B, opcional)
```
Vertical 9:16. [paste CONSISTENCY BLOCK above.]
Medium shot, slightly low angle, steady. Camila is seated at the desk with open notebooks and loose sheets of paper spread out in a messy, overwhelmed way; the papers are out of focus and any writing is an illegible blur. She exhales, rubs her eyes with the back of her hand, then looks down at her phone resting on the desk. Camera: slow, gentle drift to the right, ending on her face looking down with a tired but determined expression. Audio: quiet room ambience, pencil tapping, a soft sigh, no speech, no music. Negative: no subtitles, no on-screen text, no logos, no readable writing, no extra people, no close-up of hands.
```
Texto/UI que se agrega después: captura del simulador (sobre la pantalla en Flow-A), titulares de la tabla, rótulos, logo y URL. Todo en postproducción.

## Para Ronald: qué verificar antes de producir
1. **Precio:** el video no lo dice. En el código Premium es Bs. 100/mes y Pro Bs. 50 (`src/lib/precios.ts`), pero `/precios` solo muestra Gratis y Premium. ¿Quieres mencionar precio?
2. **URL del CTA:** la bitácora lista `axiom-simulador.vercel.app`. ¿Hay dominio propio o es ese el que sale en pantalla?
3. **Nombre de marca y CTA:** ¿"Axiom" a secas o "Axiom Simulador"? ¿"Empieza gratis" o "Prueba gratis"? ¿Cómo se pronuncia en voz?
4. **Cifra:** 3.848 preguntas resueltas en 150 archivos (recuento del 2026-10-04); la bitácora aún dice 140 y 3.579. Si agregas exámenes antes de publicar, actualizar.
5. **Plan Gratis:** `/precios` dice "Todos los exámenes pasados con sus respuestas" gratis, y la bitácora D8 dice que la solución paso a paso en la biblioteca es de pago (gratis solo en los 2 simulacros semanales). La escena 5 dice "cada pregunta, paso a paso" junto a "Empieza gratis": confirma que es correcto decirlo así.
6. **Simulacro inteligente con IA:** confirma que funciona en producción (es Premium) antes de nombrarlo en el video.
7. **Cobertura:** Medicina tiene 1 examen y Derecho ninguno en `data/examenes`; por eso el video dice solo "UMSS". ¿Está bien?
8. **Voz:** ¿TTS (productor-audio propone opciones) o tu propia voz? Acento boliviano.
9. **Personaje Flow:** ¿te sirve "Camila"? Es ficticia; no usar rostros de alumnos reales sin permiso.
10. **Hipótesis del gancho B** ("exámenes en un lado, lecciones en otro"): validar con 2-3 alumnos.


---

# v1.1 copy corregido (veracidad del plan Gratis)

Motivo: en Axiom es gratis LEER los exámenes pasados y la Unidad 01 de cada área, con límite semanal de simulacros. La respuesta correcta y la solución paso a paso de la biblioteca son Premium (`/precios`, motivo "resolucion"). La v1 de la escena 5 ("Cada pregunta, resuelta paso a paso") junto a "Empieza gratis" insinuaba lo contrario. Decisiones de Ronald: marca "AXIOM", CTA "Empieza gratis", URL `axiom-simulador.vercel.app`, voz sintética.

## Voz exacta final por escena (es la que se graba)

| # | Tiempo | Voz en off (exacta) | Palabras | Texto en pantalla |
|---|---|---|---|---|
| 1 | 0.0-7.6 | "Tu ingreso a la UMSS, completo: exámenes pasados, simulacros, lecciones, láminas, errores y debilidades, en un solo lugar." | 19 | "Tu ingreso a la UMSS, completo." + "6 herramientas → 1" + "En un solo lugar." |
| 2 | 7.6-12.8 | "Te avisa dónde fallas: tus errores y tus puntos débiles, listos para repasar." | 13 | "Te avisa dónde fallas" / "Errores · debilidades · repaso" |
| 3 | 12.8-16.4 | "Y un simulacro con IA que arma exámenes nuevos." | 9 | "EL SIMULACRO INTELIGENTE con IA." |
| 4 | 16.4-19.6 | "Resuelve como en el examen real." | 6 | "Resuelve como en el examen real." + chip "5 opciones" |
| 5 | 19.6-24.8 | **"Lee todos los exámenes pasados gratis. Con Premium, cada pregunta paso a paso."** | 13 | 19.6-22.0: "Lee todos los exámenes pasados gratis". 22.0-24.8: "Con Premium: paso a paso" (la respuesta y los pasos aparecen marcados con insignia PREMIUM) |
| 6 | 24.8-31.2 | "Más de tres mil ochocientas preguntas de exámenes pasados de la UMSS, de memorizar a entender." | 16 | "+3.800 preguntas · 2005-2025" → MEMORIZAR → ENTENDER |
| 7 | 31.2-34.0 | "Axiom. Empieza gratis." | 3 | Logo + "AXIOM" + botón "Empieza gratis" + URL + nota "Plan Gratis: exámenes pasados, Unidad 01 de cada área y simulacros con límite semanal." |

Total: 19+13+9+6+13+16+3 = 79 palabras (igual que v1, mismo ritmo).

Cambios respecto a v1:
- Escena 5: se separa lo gratis (leer los exámenes) de lo Premium (paso a paso). El paso a paso ya no se presenta como gratis ni con el CTA pegado.
- Escena 7: nota chica con el alcance real del plan Gratis (límite semanal de simulacros).
- Ya no se dice en ninguna escena "cada pregunta, paso a paso" sin la condición Premium. En el brief (`brief/axiom-v1.md`) los captions 2 y 3 y la promesa "cada pregunta explicada paso a paso" deben ajustarse igual antes de publicar.
- Escena 6: "más de tres mil ochocientas preguntas de exámenes pasados" es cierto (banco de 3.848); no afirma que las soluciones sean gratis.
