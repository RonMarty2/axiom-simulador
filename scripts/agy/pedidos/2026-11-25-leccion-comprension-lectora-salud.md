# Pedido: Lección nueva de Comprensión Lectora para Medicina PSA 2027 (textos de salud, 7 habilidades)

Lee y sigue estas reglas antes de empezar:
- `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md`
- Usa las skills/agentes del proyecto: `auditor-pedagogico` (`agentes/auditor-pedagogico.md`), `auditor-pantallas-movil` (`agentes/auditor-pantallas-movil.md`) y `verificador` (`agentes/verificador.md`).

## Contexto y objetivo
En Medicina (`BLOQUES_MEDICINA`), la Unidad 01 de Comprensión Lectora todavía apunta a `lectura-comprension` (que usa textos de inflación, IED y remesas hechos para Ciencias Económicas). Ronald decidió reemplazarla en Medicina por una lección propia con **textos de salud y ciencias biomédicas**, cubriendo las **7 habilidades oficiales de la lista PSA 2027**, sin tocar Económicas.

## Reglas duras
- **SOLO puedes crear/modificar estos 2 archivos:**
  1. `src/app/aprende/comprension-lectora-salud/page.tsx` (nuevo)
  2. `src/lib/axiom/catalogo-aprende.ts` (solo cambiar el slug/título de la Unidad 01 en `COMPRENSION_LECTORA_MED_UNIDADES`; NO tocar `RAZONAMIENTO_VERBAL_UNIDADES` ni `BLOQUES_ECONOMICAS`).
- **Tuteo estricto** en todo texto visible (nunca voseo: "puedes", "tienes", "lee", "identifica").
- **Cero rastros de Económicas, Ingeniería, FCyT, FCE o PREU.**
- **Cero emojis decorativos.**
- **Regla de dibujos SVG (`Pizarra`):** cada SVG debe usar `viewBox="0 0 360 <alto>"` con `alto <= 360`, `fontSize >= 13`, paleta `LIENZO`, sin textos pisados ni cortados. Incluye al menos 3 diagramas claros en `Pizarra` (ej. mapa de las 7 habilidades, pirámide de jerarquía de ideas, y esquema texto explícito vs. inferencia válida vs. suposición inválida).
- **Regla de `AutoCheck`:** al menos 5 preguntas tipo examen PSA 2027 (4 opciones cada una, clave única defendible 100 % desde el texto leído, **respuestas correctas repartidas en distintas posiciones 0, 1, 2, 3** — nunca todas en el mismo índice). No inventes cifras estadísticas externas: cada pregunta se responde estrictamente por el texto presentado.
- **Estilo y componentes:** sigue exactamente los imports y componentes reales de `src/app/aprende/_components/` (`LeccionShell`, `EscenaRica`, `Titulo`, `Parrafo`, `Definicion`, `Hook`, `CasoBolivia`, `Misconception`, `WorkedExample`, `AutoCheck`, `Resumen`, `Pizarra`, `LIENZO`). Lee una lección reciente de Medicina (ej. `src/app/aprende/eds-promocion-sistema-salud/page.tsx`) para copiar exactamente las firmas de props sin adivinar.

## Estructura requerida de `src/app/aprende/comprension-lectora-salud/page.tsx` (6 escenas)
- `unidad="CL-01"`, `tituloUnidad="Comprensión lectora aplicada a textos de salud"`
- **Escena 1:** Qué evalúa Comprensión Lectora en la PSA 2027 (mapa visual de las 7 habilidades: reconocimiento textual, paráfrasis, inferencia, significado en contexto, idea central, jerarquía de ideas y función del elemento textual) + `AutoCheck` (habilidad: reconocimiento textual sobre un texto breve de hidratación/altitud en Cochabamba).
- **Escena 2:** Idea central y jerarquía de ideas (tema vs. idea principal vs. idea secundaria vs. ejemplo; diagrama `Pizarra`) + texto breve sobre resistencia a antibióticos + `AutoCheck` (habilidad: idea central).
- **Escena 3:** Reconocimiento textual vs. Paráfrasis (cómo reconocer la reformulación fiel frente a trampas que cambian el alcance con «siempre», «nunca» o «solo») + `WorkedExample` + `AutoCheck` (habilidad: paráfrasis sobre texto de higiene de manos en hospitales).
- **Escena 4:** Inferencia válida vs. suposición sin sustento (esquema visual en `Pizarra`: «lo que dice el texto + lógica = inferencia válida; lo que viene de afuera = trampa») + texto breve sobre sueño y memoria en estudiantes de medicina + `AutoCheck` (habilidad: inferencia).
- **Escena 5:** Significado en contexto y función del elemento textual (conectores de causa, contraste, concesión y ejemplificación; pistas contextuales para términos técnicos) + texto breve sobre prevención del mal de Chagas en valles bolivianos + `AutoCheck` (habilidad: significado en contexto / función textual).
- **Escena 6:** Estrategia de lectura bajo tiempo de examen (leer la pregunta primero, subrayar palabras trampa, descartar extremos) + práctica integradora (`AutoCheck` de jerarquía/función) + `Resumen`.

## Cambio exacto en `src/lib/axiom/catalogo-aprende.ts`
- En `COMPRENSION_LECTORA_MED_UNIDADES`, reemplaza la Unidad 01 (`lectura-comprension`) por:
  `{ numero: "01", titulo: "Comprensión lectora en textos de salud", lecciones: [{ slug: "comprension-lectora-salud", titulo: "Las 7 habilidades de lectura crítica aplicadas a salud" }] }`
- Mantén las unidades `"02"` a `"05"` (`denotacion-connotacion`, `lexico-contextual`, `cohesion-textual`, `plan-redaccion`) intactas.

## Criterios de cierre
- No toques ningún archivo fuera de los 2 permitidos.
- En tu respuesta final, resume en máx. 15 líneas las 6 escenas creadas, las posiciones de respuesta correcta de los `AutoCheck` y los tamaños de `viewBox` usados.
