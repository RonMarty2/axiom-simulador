# Corrección 1 (paso 2)

Los controles fallan, la entrega no se acepta así:
- `src/lib/axiom/areas.test.ts(13,10)`: `parsearExamenMd` no existe en `banco-parser.ts`; el nombre real es `parseExamenMD` (revisa su firma antes de usarlo).
- `areas.test.ts(90,13)`: `filtradas` sin tipo (TS7022). Dale tipo explícito.
- El archivo de prueba entero falla en `npm test`. Tiene que pasar.

Además: en «Mis errores» NO agregues funciones nuevas (practicar «todos los errores de hoy»). Si lo agregaste, quítalo; el pedido era solo agrupar/filtrar por tema actual. Quita también `RESPUESTA.md` y `ENTREGA_AGY.md` de la raíz del repo (la respuesta va fuera del repo, como siempre).

Corre de nuevo tsc, lint y test: los tres en código 0.
