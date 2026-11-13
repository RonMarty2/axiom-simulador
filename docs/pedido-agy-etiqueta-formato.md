# Pedido a agy: etiquetar exámenes de Medicina con su formato

Repo: axiom-simulador. Español simple; texto al alumno en tuteo, sin emojis. No cambies ninguna pregunta ni respuesta. No hagas commit.

Ya existen `data/formatos-examen.json` (fichas `psa-2027` y `curso-basico`) y `src/lib/formatos-examen.ts`.

Hacer:
1. En el frontmatter de los 5 `.md` de `data/examenes/umss/medicina/` agregar la línea `formato: curso-basico` justo antes del `---` de cierre, respetando CRLF/LF del archivo.
2. `src/lib/axiom/banco-parser.ts`: agregar `formato?: string` a `FrontmatterCrudo` (~l.27-43) y `formato: front.formato` al objeto que devuelve `parseExamenMD` (~l.85-99). Confirmar que `parseFrontmatter` deja pasar la clave.
3. `src/lib/axiom/types.ts`: `formato?: string` en `ExamenBanco` (~l.94) y `ExamenMetadata` (~l.124).
4. `src/lib/axiom/banco-loader.ts`: en `listarMetadata` (~l.64-88) agregar `formato: e.formato`.
5. `src/app/api/axiom/examenes/route.ts` (~l.13-23): agregar `formato_nombre` con `formatoPorId` de `src/lib/data-store.ts` solo si el examen tiene formato.
6. `src/app/simulador/page.tsx`: en `ExamenElegible` (~l.13-21) agregar `formato_nombre?: string` y mostrarlo como etiqueta pequeña («Formato Curso Básico») en la tarjeta del examen (~l.428-433). Sin formato no cambia nada. Sin colores nuevos a mano.
7. Test nuevo (node --test, estilo de `src/lib/formatos-examen.test.ts`): los 5 exámenes de Medicina declaran un formato que existe en `data/formatos-examen.json`.
8. Correr `npx tsc --noEmit` y `npm test`.

Devolver: archivos tocados y resultados de los comandos.

Usa la skill `transcriptor-medicina` para entender el formato de los .md de Medicina. Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; el agente transcriptor-medicina: .claude\agents\transcriptor-medicina.md; el agente transcriptor-examenes: .claude\agents\transcriptor-examenes.md.
