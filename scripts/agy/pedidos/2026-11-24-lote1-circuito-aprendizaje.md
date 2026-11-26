# Pedido Lote 1: Circuito de aprendizaje (guía diaria, avance en lecciones y enlace a práctica)

REPITE PORQUE: la corrida anterior (`20261124-193309_codigo`) se cortó por suspensión de la PC (`wsasend` / `print_timeout`) antes de entregar DIFF.

Lee y sigue estas reglas antes de empezar:
- `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md`
- Usa las skills/agentes del proyecto: `disenador-refuerzo` (`agentes/disenador-refuerzo.md`), `auditor-pantallas-movil` (`agentes/auditor-pantallas-movil.md`) y `verificador` (`agentes/verificador.md`).

## Reglas duras
- TODO texto visible al alumno en **tuteo** (nunca voseo: "puedes", "tienes", "haz").
- Sin emojis decorativos en la UI (`🚧`, `🔒`, etc.): usa texto limpio o `<Icono>` existente.
- Todos los botones/enlaces táctiles ≥ 44 px de alto en móvil y sin desborde horizontal a 360 px.
- **SOLO puedes crear/modificar estos 5 archivos:**
  1. `src/lib/axiom/progreso-lecciones.ts` (nuevo)
  2. `src/lib/axiom/progreso-lecciones.test.ts` (nuevo)
  3. `src/app/dashboard/page.tsx`
  4. `src/app/aprende/_components/LeccionShell.tsx`
  5. `src/app/aprende/page.tsx`

## Cambios exactos

### 1. Helper puro de progreso de lecciones y mapeo área → bloque (`src/lib/axiom/progreso-lecciones.ts` + `.test.ts`)
- Exporta `CLAVE_PROGRESO_LECCIONES = "axiom-lecciones-completadas"`.
- Exporta funciones seguras para SSR (`typeof window === "undefined"`):
  - `leerLeccionesCompletadas(): string[]` (lee array JSON de slugs desde `localStorage`, deduplicado, tolerante a JSON corrupto).
  - `marcarLeccionCompletada(slug: string): string[]` (agrega `slug` si no existe, guarda en `localStorage` y dispara `window.dispatchEvent(new Event("axiom-progreso-lecciones"))`).
  - `estaLeccionCompletada(slug: string, lista?: string[]): boolean`.
  - `contarCompletadasEnBloque(slugsBloque: string[], completadas: Set<string>): { hechas: number; total: number; porcentaje: number }` (función pura).
  - `bloqueDeArea(areaId: string): string` (función pura que mapea IDs de área del banco/simulador a los `id` de bloque en `catalogo-aprende.ts`:
    - `morfofuncion` → `"morfofuncion"`
    - `biologia_celular`, `biologia` → `"biologia-celular"`
    - `investigacion`, `educacion_salud` → `"investigacion"`
    - `quimica` → `"quimica"`
    - `fisica` → `"fisica"`
    - `matematicas`, `aritmetica_algebra`, `geometria_trigonometria` → `"matematicas"`
    - `comprension_lectora`, `razonamiento`, `lenguaje` → `"comprension-lectora"`
    - `economicas` → `"economicas"`
    - fallback: `areaId.replace(/_/g, "-")`).
- En `src/lib/axiom/progreso-lecciones.test.ts` (usando `node:test` y `node:assert/strict`, como los demás tests de `src/lib/`): prueba `contarCompletadasEnBloque` (vacío, parcial, 100%, slugs repetidos) y `bloqueDeArea` (todas las áreas de Medicina + Ingeniería + Económicas + fallback).

### 2. Guía diaria inteligente en `/dashboard` (`src/app/dashboard/page.tsx`)
- Además de `/api/auth/me`, `/api/historial` y `/api/facultades`, consulta en paralelo `/api/axiom/errores` y `/api/axiom/debilidades` (con `.catch(() => null)` para que nunca rompa si un endpoint falla o viene vacío).
- En la pieza dominante `"Tu próximo paso"` (cuando `!limiteAlcanzado`):
  1. Si hay errores pendientes para hoy (`erroresParaHoy > 0`, leyendo `erroresData?.para_hoy` o `erroresData?.total` según la forma real que devuelve `/api/axiom/errores` — revisa `src/app/errores/page.tsx` para confirmar el campo exacto):
     - Título: `Tienes ${erroresParaHoy} ${erroresParaHoy === 1 ? "error pendiente" : "errores pendientes"} por repasar hoy`
     - Descripción breve explicando que repasar errores recientes fija el concepto antes del examen (si hay `diasParaExamen`, menciónalo de forma natural).
     - CTA principal: `"Repasar errores"` → `/errores`.
     - Enlace secundario discreto: `"Ir a lecciones"` → `/aprende`.
  2. Si no hay errores para hoy pero `/api/axiom/debilidades` reporta un área débil (`< 70%`, revisa `src/app/debilidades/page.tsx` para el nombre exacto de los campos):
     - Título: `Refuerza ${nombreAreaDebil} (${porcentaje}%)`
     - Descripción: repasa la teoría y luego ponla a prueba con 10 preguntas.
     - CTA principal: `"Estudiar esta área"` → `/aprende?bloque=${bloqueDeArea(areaDebilId)}`.
     - Enlace secundario discreto: `"Empezar simulacro"` → `/practicar`.
  3. Si es alumno nuevo o va bien en todo: mantiene la invitación a practicar, con enlace secundario a `/aprende`.
- En `"Acciones rápidas"`, agrega accesos claros a **`/aprende` ("Lecciones")** y **`/debilidades` ("Mis debilidades")**, manteniendo el diseño y responsividad actual.

### 3. Persistir avance en `LeccionShell` y enlazar a práctica (`src/app/aprende/_components/LeccionShell.tsx`)
- Usa el `slug` actual (ya detectado vía `usePathname()`).
- Al llegar a la última escena o al hacer clic en `"✓ Terminar"` / `"Practicar este tema"`, llama a `marcarLeccionCompletada(slug)`.
- En el footer de la última escena (`i === escenas.length - 1`), muestra dos acciones limpias con `flexWrap: "wrap"` y `gap: 8`:
  - Secundaria: `<Link href="/aprende" onClick={() => slug && marcarLeccionCompletada(slug)}>` `"✓ Terminar"`
  - Primaria (en `LIENZO.accent`): `<Link href="/practicar" onClick={() => slug && marcarLeccionCompletada(slug)}>` `"Practicar preguntas →"`

### 4. Mostrar progreso real y soporte `?bloque=` en `/aprende` (`src/app/aprende/page.tsx`)
- Lee las lecciones completadas en cliente con `leerLeccionesCompletadas()` (y suscríbete al evento `"axiom-progreso-lecciones"` / `"focus"`).
- Al cargar, lee `?bloque=<id>` de `window.location.search` (en `useEffect`, sin `useSearchParams` para no romper build estático). Si viene un bloque válido, ábrelo automáticamente y haz scroll suave hacia él (`id={`bloque-${b.id}`}`). Si no viene ninguno, abre por defecto el primer bloque para evitar doble clic innecesario.
- En cada bloque muestra `"${hechas}/${total} completadas"` y una barra de progreso fina (`height: 4px`).
- En cada lección completada muestra una marca discreta `"✓"` (o insignia `"Completada"` en verde `--ok`) sin romper el layout a 360 px.
- Quita los emojis decorativos `🚧` y `🔒` (reemplázalos por texto limpio `"Próximamente"` / `"Premium"` o `<Icono>`).

## Criterios de cierre
- No toques ningún archivo fuera de los 5 permitidos.
- En tu respuesta final, resume en máx. 20 líneas qué cambiaste en cada archivo.
