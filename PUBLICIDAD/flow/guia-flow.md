# Guía de Google Flow (Veo / Omni)

Actualizada: 2026-10-04. Etiquetas: [DOC] documentación o blog oficial de Google; [FORO] blogs de terceros, foros y guías de usuarios; [COMPROBADO EN UI] visto hoy en el Chrome de Ronald (solo lectura, no se generó nada y no se guardó ningún ajuste).

Aviso de fiabilidad: las búsquedas devolvieron resúmenes, y varias cifras vienen de sitios de terceros que se contradicen entre sí. Todo lo marcado [FORO] hay que confirmarlo en la UI antes de decidir con plata.

## 1. Modelos y versiones actuales

- [COMPROBADO EN UI 2026-10-04] El selector de modelo de vídeo del agente ofrece cuatro opciones: Omni 1.1 Flash, Veo 3.1 Lite, Veo 3.1 Fast (el predeterminado en la cuenta de Ronald) y Veo 3.1 Quality. Para imágenes: Nano Banana 2.
- [DOC] Gemini Omni Flash (I/O 2026) genera y edita vídeo desde texto, imagen, audio y vídeo; edición conversacional multi-turno que conserva personaje y escena; marca de agua SynthID. Requiere suscripción de Google AI. (blog.google, "New agents, mobile apps and Gemini Omni for Google Flow").
- [DOC] Omni mejora la consistencia: "identidad y voz se preservan en cada escena".
- [FORO] Gemini Omni 1.1 Flash es gratis en Google Vids con 1080p desde 2026-09-23 (unite.ai). No es Flow, pero indica que Omni 1.1 es el modelo más nuevo.
- [DOC] Flow Agent: asistente por chat dentro de un proyecto que planifica, genera y edita (también en lote). Es el modo que Ronald ya probó.

## 2. Duración y resoluciones

- [FORO] Cada generación Veo 3.1 dura como máximo 8 s (costgoat.com). Para 30-45 s hay que encadenar 5-6 clips.
- [COMPROBADO EN UI] El prompt que Ronald mandó al agente pedía "video de 8 segundos"; el agente lo aceptó.
- [FORO] Plan Pro: salida 720p, a veces con marca de agua; Ultra: 1080p sin marca (costgoat; no confirmado). [DOC] Veo 3.1 tiene reescalado a 1080p y 4K en Flow (TechCrunch, 2026-01-13).
- [COMPROBADO EN UI] En el menú de cuenta hay un interruptor "Marca de agua visible" (estaba apagado). No se tocó. Siempre queda SynthID invisible [DOC].

## 3. Aspect ratios

- [DOC] Veo 3.1 soporta 9:16 nativo (sin recortar), pensado para Shorts, Reels y TikTok (TechCrunch, 2026-01-13).
- [COMPROBADO EN UI] Ajustes del agente: vídeo 16:9 o 9:16 únicamente; imágenes 16:9, 4:3, 1:1, 3:4, 9:16; cantidad de salidas x1 a x4. El predeterminado de Ronald es 16:9 x1. Para el anuncio vertical hay que elegir 9:16 (o pedirlo en el prompt al agente y revisar lo que propone).

## 4. Créditos ("puntos") por generación

- [COMPROBADO EN UI] Saldo de Ronald hoy: 1.030 puntos de Google Flow, plan PRO. El banner de portada dice: "Your Google AI plan now comes with 50 additional Flow credits daily".
- [COMPROBADO EN UI] El agente, antes de generar, pregunta "¿Quieres que empiece a generar 1 vídeo, que cuesta 20 puntos?" para el clip de 8 s con Veo 3.1 Fast. Es decir, 20 puntos por clip Fast. Esto coincide con la tabla de terceros.
- [FORO] Tabla (costgoat.com, oct 2026), plan Pro: Lite 10, Fast 20, Quality 100 puntos por generación. Ultra (25.000 puntos/mes): Lite 5, Fast 10, Quality 100. Pro incluye 1.000 puntos/mes (~100 Lite, ~50 Fast, ~10 Quality). Sin suscripción: 50 puntos al día [FORO, felloai].
- [FORO] Google quitó los topes diarios fijos de Veo en 2026; en la app Gemini hay una cuota de cómputo que se renueva cada 5 h con techo semanal. Flow usa puntos.
- Cuenta para el anuncio: 6 clips x 20 = 120 puntos por una pasada completa en Fast. Con 1.030 puntos alcanzan unas 8 pasadas completas (más los 50 diarios). Quality (~100 por clip, no verificado en UI) costaría 600 por pasada: solo para tomas finales.
- NO comprobado: costo de Omni 1.1 Flash y de Lite en la UI (no se generó nada). Preguntar al agente o ver el botón de generar en el modo manual.
- El ajuste "Confirmar antes de generar: Siempre" está activo [COMPROBADO EN UI]. Dejarlo así: protege los puntos. "Nunca" gasta automáticamente.

## 5. Modos de generación

- [DOC] Texto a vídeo; Frames a vídeo (imagen inicial y final, Veo 3.1 interpola); Ingredientes a vídeo (hasta 3 imágenes de referencia: personaje, objeto, estilo).
- [DOC] Referencias con `@` para personajes y voces personalizadas; "las referencias de voz solo funcionan con generaciones basadas en ingredientes" (support.google.com/flow/answer/16353334).
- [COMPROBADO EN UI] Barra lateral del proyecto: Todo el contenido, Vídeos, Caracteres, Escenas, Herramientas. Existe sección de Caracteres (consistencia de personaje) y de Escenas (Scenebuilder). También "Crear avatar" en el menú de cuenta.
- [DOC] Imágenes de referencia en Veo 3.1 dan mejores expresiones y movimiento "aunque el prompt sea corto" y mejor consistencia de personaje, fondo y texturas (TechCrunch 2026-01-13).

## 6. Extender y Scenebuilder

- [DOC] Extend: abre un clip, pulsa Extender, describe cómo continúa la acción; solo funciona con vídeos generados por Veo y analiza los frames finales. No se pueden aplicar insertar, quitar ni cámara sobre un clip extendido (support.google.com/labs/answer/16935718).
- [DOC] Scenebuilder: ordenar clips en secuencia, reordenar y recortar inicio y fin con los tiradores. Se añade con "Add to Scene". Editar no pierde el original (queda en Historial).
- [FORO] Mejor opción para mantener cara, ropa y aspecto entre planos: Scenebuilder o ingredientes, no regenerar desde cero.

## 7. Audio y diálogo nativos

- [DOC] Veo 3.x genera audio (diálogo, efectos, ambiente) junto con el vídeo.
- [FORO] Sintaxis que rinde: acotación + frase entre comillas: `La mujer dice con calma: "Dos inversiones prometen lo mismo. ¿Cuál eliges?"`. Una frase larga o dos cortas por clip de 8 s (prompt-architects.com).
- [FORO] Límite de entrada 1.024 tokens por prompt (prompt-architects.com).
- [FORO] No hay persistencia documentada de voz entre clips: la voz puede cambiar de un clip a otro. Con Omni se promete voz consistente [DOC]; probar. Alternativa segura: voz en off generada aparte (TTS) y pegada en edición.
- [FORO] Planos medios y generales disimulan fallos de sincronía labial; los primeros planos los exponen.

## 8. Español, acentos y texto en pantalla

- [FORO] Google solo documenta evaluación en ciertos idiomas; español funciona pero "no está documentado" y el acento es poco fiable: el modelo tiende a ajustar acento al aspecto físico y entorno aunque se pida otro (arsturn, issue de kie-mcp). Tip: escribir la escena en inglés y el diálogo en español, indicando "habla en español de Bolivia, acento boliviano, neutro" y confiar poco.
- [COMPROBADO EN UI] Ronald ya probó un prompt en español con "Voz en off tranquila en espanol" y salió una escena de emprendedora en oficina con La Paz de fondo (vídeo en cola, no se pudo ver el resultado de audio).
- [FORO] Veo a veces añade subtítulos o texto que no pediste: poner "sin subtítulos, sin letras, sin logotipos" (negativo). Su texto legible en pantalla suele salir deformado: NO generar textos, números ni logos con la IA; agregarlos en edición (CapCut, etc.). Criterio del proyecto: logo y textos en postproducción.
- [FORO] Manos, dedos y objetos pequeños (monedas apiladas) pueden deformarse; usar planos que no dependan del detalle de las manos.

## 9. Anatomía de un buen prompt

[DOC] (blog de Google): sujeto y acción, composición y movimiento de cámara, lugar y luz, estilo visual; repetir todos los detalles esenciales de prompts anteriores al encadenar clips.

Fórmula recomendada (combina DOC y FORO):

`[Plano y cámara] + [Sujeto con descripción fija] + [Acción en un solo movimiento] + [Lugar y luz] + [Estilo/lente] + [Audio: ambiente + diálogo entre comillas con acotación] + [Negativos: sin subtítulos, sin texto, sin logotipos]`

## 10. Consistencia de personaje

1. [DOC] Crear primero el personaje como Ingrediente/Carácter (imagen generada con Nano Banana o foto subida) y reutilizarlo con `@` en cada clip.
2. [DOC] Repetir en cada prompt la misma descripción física y de vestuario, palabra por palabra.
3. [DOC] Usar Frames a vídeo: el último frame de un clip como primer frame del siguiente.
4. [FORO] Scenebuilder + Extend para continuidad de la misma toma.
5. [FORO] Mismo fondo y misma luz en toda la serie; cambiar solo el encuadre.

## 11. Fallos conocidos y trucos de foros

- [FORO] Voz y acento distintos entre clips; texto en pantalla deformado; subtítulos fantasma; manos y objetos pequeños; lip-sync débil en primeros planos.
- [FORO] Generar varias salidas (x2) de la toma importante y elegir la mejor; usar Fast para iterar y Quality solo para la versión final.
- [FORO] Evitar diálogo en español largo; mejor voz en off en un clip y planos sin hablar.

## 12. Recomendación para un anuncio de 30-45 s vertical

Estructura: 5-6 clips de 8 s (40-48 s, recortar a 30-45 en edición) en 9:16.

1. Crear el personaje (emprendedora boliviana de ~35 años, vestuario fijo) como Carácter con Nano Banana 2 en 9:16 antes de gastar en vídeo.
2. Elegir 9:16 en los ajustes del agente (hoy está en 16:9; cambiarlo requiere guardar ajustes, hazlo tú o autoriza). Usar Veo 3.1 Fast (20 puntos/clip) para iterar; probar Omni 1.1 Flash en una toma para comparar consistencia de voz (costo a verificar). Quality solo para el clip clave.
3. Generar un clip por beat del guion, cada uno con la misma descripción del personaje y del escenario. Encadenar con último frame a primer frame o Scenebuilder.
4. Voz: en español, una frase corta por clip, plano medio, acento indicado. Si el acento no sale boliviano, usar clips mudos con voz en off TTS aparte.
5. Todo el texto, números, logo y llamado a la acción (axiom-simulador) se agregan en edición, nunca en el prompt. Incluir negativos.
6. Presupuesto: 6 clips x 20 = 120 puntos por pasada; con x2 salidas, 240. Con 1.030 puntos hay margen para 3 a 4 pasadas con x2.
7. Mantener "Confirmar antes de generar: Siempre".

Plantilla de prompt (copiar y rellenar):

```
Vertical 9:16. Plano medio, cámara lenta con leve avance. @[personaje]: emprendedora boliviana de unos 35 años, pelo oscuro recogido, blazer azul marino y pañuelo estampado. Acción: [una acción simple]. Lugar: oficina pequeña de noche, ventana con La Paz al atardecer, luz cálida y suave. Estilo: cinematográfico realista, lente 35 mm. Audio: ambiente suave de oficina; ella dice con calma, en español de Bolivia: "[frase corta]". Sin subtítulos, sin texto en pantalla, sin logotipos, sin música con letra.
```

## Pendiente de comprobar en la UI (no se hizo para no gastar puntos)

- Costo en puntos de Omni 1.1 Flash, Lite y Quality.
- Duraciones elegibles distintas de 8 s y resolución máxima del plan PRO.
- Interfaz manual del modo Frames/Ingredientes y botón Extender.
- Resultado de audio del clip ya generado en el proyecto "oct 03 - 16:45".

## Fuentes

- support.google.com/flow/answer/16353334 y support.google.com/labs/answer/16935718
- blog.google/innovation-and-ai/models-and-research/google-labs/flow-updates/ y blog.google/innovation-and-ai/products/flow-video-tips/
- techcrunch.com/2026/01/13/googles-update-for-veo-3-1-lets-users-create-vertical-videos-through-reference-images
- costgoat.com/pricing/google-veo, felloai.com/google-flow, prompt-architects.com/blog/101-veo-dialogue-prompts, arsturn.com, unite.ai
