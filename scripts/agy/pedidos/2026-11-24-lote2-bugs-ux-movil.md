# Pedido Lote 2: Bugs de resultados, ciclo error→teoría, confirmación y presentación 360 px

Lee y sigue estas reglas antes de empezar:
- `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md`
- Usa las skills/agentes del proyecto: `auditor-pantallas-movil` (`agentes/auditor-pantallas-movil.md`), `probador-app` (`agentes/probador-app.md`) y `verificador` (`agentes/verificador.md`).

## Reglas duras
- TODO texto visible al alumno en **tuteo** (nunca voseo).
- Avisos y cuadros de confirmación SIEMPRE centrados (`fixed inset-0` con `items-center justify-center`), nunca pegados abajo ni con `alert()`/`confirm()` nativos.
- **SOLO puedes modificar estos 5 archivos:**
  1. `src/app/simulador/[simId]/resultados/page.tsx`
  2. `src/app/simulador/[simId]/page.tsx`
  3. `src/app/errores/page.tsx`
  4. `src/app/debilidades/page.tsx`
  5. `src/app/practicar/page.tsx`

## Cambios exactos

### 1. Bugs de lógica y enlace a teoría en `/resultados` (`src/app/simulador/[simId]/resultados/page.tsx`)
- Importa `bloqueDeArea` desde `@/lib/axiom/progreso-lecciones`.
- **Bug 1 (setState en render):** mueve el bloque que llama `setSeccionesAbiertas(todas)` y `setSeccionesAutoabiertas(true)` (alrededor de L359-363) dentro de un `useEffect`.
- **Bug 2 (`guardarSimulador`):** en `practicarArea` y `reforzarMisErrores`, antes de `router.push(...)`, guarda el simulador recién creado usando el mismo helper `guardarSimulador` que usan `practicar/page.tsx` y `debilidades/page.tsx`.
- **Bug 3 (`alert()` nativo):** reemplaza `alert(...)` (alrededor de L204) por un estado `errorAccion` mostrado en un aviso visual limpio (o modal centrado), nunca `alert()`.
- **Tilde:** corrige `"¡Excelente! Estas en el camino correcto."` → `"¡Excelente! Estás en el camino correcto."`.
- **Legibilidad:** cambia `lineHeight: 2.9` fijo (alrededor de L951) a `lineHeight: 1.85` para que explicaciones sin fracciones no se estiren de más.
- **Ciclo error → teoría:** junto al botón `"Practicar 10 →"` de cada área (y en el bloque del área más débil), agrega un enlace discreto `"Estudiar teoría →"` hacia `/aprende?bloque=${bloqueDeArea(area)}`.

### 2. Presentación móvil 360 px en simulador (`src/app/simulador/[simId]/page.tsx`)
- En la barra de hojas (L425-450), añade `truncate whitespace-nowrap` al rótulo inferior (`"✓ completada"` / `"N preg."`) para que a 360 px nunca se pegue ni parta en 2 líneas.
- En el contenedor de opciones de pregunta (alrededor de L515), cambia `ml-10` fijo a `ml-0 sm:ml-10` para devolver 40 px de ancho útil a fórmulas y textos en celular de 360 px.

### 3. Presentación 360 px y enlace a teoría en `/errores` (`src/app/errores/page.tsx`)
- Importa `bloqueDeArea` desde `@/lib/axiom/progreso-lecciones`.
- En el banner CTA rojo (alrededor de L95), añade `flexWrap: "wrap"` y `gap: 12` para que en 360 px el botón `"Repasar ahora"` baje limpio sin apretar el texto.
- En las áreas/elementos con errores, añade un enlace discreto `"Estudiar teoría"` hacia `/aprende?bloque=${bloqueDeArea(area)}`.

### 4. Contraste y enlace a teoría en `/debilidades` (`src/app/debilidades/page.tsx`)
- Importa `bloqueDeArea` desde `@/lib/axiom/progreso-lecciones`.
- Corrige el contraste del ícono `"documento"` sobre fondo acento oscuro (alrededor de L156): usa `color: "var(--accent-fg)"` (o `"#fff"`) en lugar de `"var(--fg-muted)"`.
- En las áreas débiles listadas, añade un enlace `"Estudiar teoría →"` hacia `/aprende?bloque=${bloqueDeArea(area)}` para que el alumno pueda ir directo a la lección antes de practicar.

### 5. Confirmación antes de iniciar `predictivo` y `mixto` (`src/app/practicar/page.tsx`)
- Extiende el cuadro de confirmación centrado existente (`porConfirmar`) para que también pida confirmación al tocar **«Simular examen de ingreso»** (`predictivo`) y **«Mezcla de años»** (`mixto`), avisando que el cronómetro empieza al tocar «Empezar» y, si es plan gratis, que cuenta para su límite semanal.

## Criterios de cierre
- No toques ningún archivo fuera de los 5 permitidos.
- En tu respuesta final, resume en máx. 20 líneas qué cambiaste en cada archivo.
