# Pedido a agy: dos arreglos chicos de pantalla (editar en la copia aislada)

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md; el agente «verificador»: agentes/verificador.md. Texto que ve el alumno: TUTEO, nunca voseo. Cero cifras escritas a mano. Cambio mínimo, sin abstracciones nuevas.

## Arreglo 1 (ALTO): el onboarding muestra ids crudos de materias
En `src/app/onboarding/` (y lo que importe) se muestran ids como «ARITMETICA_ALGEBRA» o «MORFOFUNCION» en vez del nombre legible. Ya existe `etiquetaArea` en `src/lib/axiom/areas.ts` (lo usa `src/app/practicar/page.tsx`). Haz que el onboarding muestre el nombre legible usando lo que ya existe (o el `nombre` de la materia si viene en los datos). No inventes nombres a mano.

## Arreglo 2 (MEDIO): títulos con comilla suelta en Ingeniería 2025
En la lista de exámenes aparecen títulos como «"Examen Final» o «"Primer Parcial»: el frontmatter de algunos `.md` de `data/examenes/umss/ingenieria/` (gestión 2025) está mal escrito o mal leído. Busca la causa: si el `.md` tiene la comilla mal puesta, arréglalo en el `.md` (solo la línea del título, NADA de preguntas ni respuestas); si es el parser (`src/lib/axiom/banco-parser.ts`), arregla el parser y agrega un caso al test existente `src/lib/axiom/banco.test.ts`.

## Controles que tienes que correr
`npx tsc --noEmit`, `npm test`, `npm run lint` (0 errores).

## Formato de la entrega (ENTREGA_AGY.md)
Para cada arreglo: causa encontrada (archivo:línea), qué cambiaste, y antes/después de un ejemplo. Lista de archivos tocados. Resultado de los 3 controles.
