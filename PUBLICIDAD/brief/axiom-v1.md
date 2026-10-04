# Brief: Axiom v1 (anuncio vertical 9:16, 30-35 s)

Agente: estratega-marketing. Base: `analisis/anatomia.md` (7 beats), `analisis/hallazgos-iniciales.md`, `flow/guia-flow.md`, y el repo padre. Cifras recontadas en el repo el 2026-10-04.

## 1. Qué ofrece Axiom de verdad (solo lo verificado)

| Dato | Valor | De dónde sale |
|---|---|---|
| Archivos de examen en el banco | **150** (139 Ingeniería, 10 Económicas, 1 Medicina) | `data/examenes/umss/*` |
| Preguntas con solución paso a paso | **3.848** (cada `## Pregunta` tiene su `**explicacion:**`) | recuento de `## Pregunta` y `**explicacion:**` en `data/examenes` |
| Gestiones cubiertas | 2005 a 2025, con hueco en 2021 | nombres de archivo |
| Lecciones animadas | **105** carpetas en `src/app/aprende` | `ls src/app/aprende` sin `_components` |
| Láminas de repaso | **64** páginas en `src/app/laminas/<tema>/<lámina>` | recuento de `page.tsx` |
| Simulador | exámenes cronometrados; 2 simulacros por semana en el plan Gratis | `src/app/simulador`, `/precios` |
| Mis errores / Mis debilidades | repaso de lo que fallaste, por sección | `src/app/errores`, `src/app/debilidades` |
| Simulacro inteligente con IA | arma exámenes nuevos según el temario (Premium) | `/precios` |
| Plan Gratis | existe (Unidad 01 de cada bloque, 2 simulacros/semana) | `/precios`, bitácora D2 |
| Marca | crema `#faf7f0`, terracota `#9c3d1c`, texto `#1a1f2e`; Crimson (títulos) + Atkinson (UI) | `src/app/globals.css` |

OJO: la bitácora dice 140 exámenes y 3.579 preguntas; está desactualizada (el banco creció). Usé el recuento de hoy. Del resto no se afirma nada más que "UMSS": Medicina tiene un solo examen.

**Lo que NO existe y por eso no se promete:** avisos por WhatsApp (el beat 2 de la referencia), ingreso garantizado, estadísticas de aprobados. El beat 2 se adapta a lo real: "te avisa dónde fallas" (Mis errores / Mis debilidades).

## 2. Público
- Primario: postulantes a Ingeniería (el banco es casi todo de ahí), 17-19 años, Cochabamba, estudian con el celular.
- Secundario: sus padres (deciden el pago; les importa "sirve de verdad" y "es barato").

## 3. Dolor y promesa
- Dolor (hipótesis, validar con alumnos): el material de examen pasado está disperso y sin resolver; mirar la respuesta no enseña.
- Promesa: todo lo que necesitas para el examen de la UMSS en un solo lugar, con cada pregunta explicada paso a paso.
- Prueba verificable: **más de 3.800 preguntas de exámenes pasados de la UMSS, cada una con su solución paso a paso**.
- Contraste de remate (equivalente al "de horas a minutos"): **de memorizar, a entender**.
- Oferta/CTA: **Empieza gratis**. Sin precio en el video.

## 4. Tres ángulos
1. **Todo en un solo lugar** (elegido para v1: replica la referencia).
2. **Entender, no memorizar**: cada pregunta, paso a paso.
3. **Practica como en el examen real**: simulacros cronometrados + tus errores.

## 5. Gancho de 2 s (dos variantes)
- **A (motion, principal):** "Tu ingreso a la UMSS, completo." Texto en pantalla igual.
- **B (persona, usa Flow):** "¿Exámenes en un lado, lecciones en otro?" Alumna agobiada con cuadernos, luego fundido a las tarjetas. Probar A/B por retención a 3 s.

## 6. Formato y canales
- 9:16, 1080x1920, 30 fps, 31-34 s, subtítulos quemados (se entiende sin sonido).
- Reels, TikTok, estados de WhatsApp, Facebook (ahí circula el material de exámenes). Para WhatsApp, versión sin música.
- Producción: motion graphics (HTML/CSS) con pantallas reales de la app + hasta 2 tomas Flow solo de personas.

## 7. Captions (3 variantes)
1. "Exámenes pasados, simulacros, lecciones y láminas de la UMSS en un solo lugar. Empieza gratis."
2. "Más de 3.800 preguntas de exámenes pasados, cada una explicada paso a paso. De memorizar a entender. Empieza gratis."
3. "Resuelve, falla, mira por qué y vuelve a intentar. Eso es prepararse. Empieza gratis."

Hashtags: #UMSS #Cochabamba #IngresoUMSS #Admisión #Bolivia (revisar cuáles usan los grupos reales).

## 8. Tono y límites
Tuteo siempre. Honesto: nada de "ingreso asegurado". Voz en español de Bolivia, cálida, ~2,5 palabras/s.

## 9. Medición A/B
Retención a 3 s, clics a la URL, registros nuevos. Variable a probar: gancho A vs B.
