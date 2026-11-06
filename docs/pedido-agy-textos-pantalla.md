# Pedido a agy: arreglos de TEXTO de pantalla (editar en la copia aislada)

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md (regla 6: cero cifras escritas a mano; precios de `@/lib/precios`, cantidades del banco de `listarMetadata()` o `/api/facultades`; texto del alumno en TUTEO); el agente «verificador»: agentes/verificador.md.

Lee en `docs/plan-accion-2026-11.md`, sección «Arreglos de pantalla», las casillas sin marcar que empiezan con «MEDIO. Textos que se contradicen» y «BAJO. Tildes faltantes». Haz SOLO lo que ahí se pide y esté decidido:

1. MEDIO · Textos que se contradicen entre `/precios` y `/aprende` sobre los exámenes pasados. La decisión de Ronald (6-nov, opción A) es: **exámenes pasados gratis para leer, explicaciones de pago**. Deja los dos textos diciendo eso, sin cifras escritas a mano. Arregla también el plural roto «Accede a los 1 exámenes» (singular/plural según la cantidad real).
2. BAJO · Tildes y textos: `estas` → `estás` donde es verbo (practicar, debilidades, onboarding, lección), «si aciertas una 3 veces» → redacción correcta, «Haz clic» → «Toca» en textos para el alumno. NO toques zonas táctiles, márgenes ni avatar (eso lo revisa Claude aparte).

No toques preguntas ni respuestas del banco. No cambies lógica, solo textos.

## Controles
`npx tsc --noEmit`, `npm test`, `npm run lint` (0 errores).

## Entrega (ENTREGA_AGY.md)
Por cada texto cambiado: archivo:línea, antes → después. Lo que NO hiciste y por qué. Resultado de los 3 controles.
