# Punto de entrada para asistentes IA

**Si sos una IA (Claude, GPT, etc.) trabajando en este repo, leé primero [BITACORA.md](./BITACORA.md).** Tiene TODO: identidad del proyecto, decisiones arquitectónicas, errores históricos, principios de animación, roadmap. En 10 minutos sabés dónde estás parado.

## Reglas de oro

1. **Leé, y después anotá.** Dos mitades, las dos obligatorias:
   - **Antes de escribir código:** `git fetch origin main` y leé la bitácora de ESA versión. Hay varias sesiones en paralelo y `main` se mueve mientras trabajás. Leerla al abrir la sesión no alcanza: el 15-sep una sesión reescribió un parseo que ya existía testeado en `main` porque no volvió a mirar (bitácora §7).
   - **Al terminar:** agregá a BITACORA.md lo que hiciste, en el mismo commit, y subilo a `main`. Ya no hace falta pedir permiso para agregar tu entrada; lo que sí necesita el OK de Ronald es **reescribir o borrar** lo que ya está escrito, o tocar decisiones y reglas.
2. **Idioma — ojo, son dos:**
   - **Código, comentarios, commits y docs (incluida esta bitácora):** español rioplatense informal. Es para Ronald y para quien lea el repo.
   - **TEXTO QUE VE EL ALUMNO (toda la UI, lecciones y láminas): TUTEO, nunca voseo.** Los alumnos son de Cochabamba: "puedes", no "podés"; "haz", no "hacé"; "tú", no "vos". La app estaba mitad y mitad y se normalizó entera el 13-sep-2026 (ver bitácora §11). Si agregás texto nuevo para el alumno, escribilo en tuteo.

   Sin emojis decorativos en código o docs (salvo en títulos de sección si ayudan a navegar).
3. **Estilo de respuesta:** corto, directo, sin adornos. Ronald valora más la honestidad que la presunción de saber todo. Si no estás seguro, decilo.
4. **Antes de tocar animaciones SVG:** leé §4 "Sistema visual" de la bitácora — hay lecciones aprendidas a fuerza de romper cosas.
5. **Antes de tocar PWA:** leé §5 — la OTA y la supresión del banner ya funcionan bien.

## Agentes del proyecto (`agentes/`)

Cada uno lleva adentro las lecciones de §7 que le tocan, así no hay que releer la bitácora entera para cada tarea chica.

**Se editan en `agentes/`, sin punto.** Claude Code los lee de `.claude/agents/`, pero Ronald sincroniza el repo entre PC y laptop con Synology Drive, que no lleva carpetas con punto. `scripts/sincronizar-agentes.mjs` copia entre las dos (gana el archivo más nuevo, nunca borra) y corre solo en `npm install`, en `npm run dev` y al abrir cada sesión de Claude Code. Para borrar un agente, borralo de las dos carpetas. El test `src/lib/agentes.test.ts` frena si llegan distintas al repo.

| Agente | Para qué | Cuándo |
|---|---|---|
| `transcriptor-examenes` | PDF → `.md` del banco, resolviendo cada respuesta | Uno por examen, en paralelo. Necesita los PDF (máquina de Ronald) |
| `auditor-figuras` | Contrasta preguntas contra el facsímil y dibuja la figura | Figuras pendientes, modos 1 a 4. Necesita los PDF |
| `auditor-pedagogico` | Lee lecciones/láminas como alumno nuevo, reporta en `docs/auditoria-pedagogica.md` | 3 a 6 piezas por agente, varios en paralelo. No reescribe |
| `autor-laminas` | Escribe una lámina nueva en formato tarjetas (§4.5) | De a una: Ronald revisa cada una |
| `verificador` | Corre tsc/lint/test/build y lee el diff contra los errores conocidos | Antes de commitear cualquier cambio al banco, figuras, contenido o plan |
| `cronista` | Ramas sin mergear, roadmap contra código, entrada de bitácora | Al abrir y al cerrar sesión |

**Flujo típico:** `cronista` (estado) → agentes de trabajo en paralelo → `verificador` → `cronista` (entrada) → commit y push a `main`. Los agentes de trabajo **no commitean**: lo hace la sesión principal después del verificador.

## Cómo retomar

```bash
npm install
npm run dev
```

Después: bitácora § 10 ("Cómo retomar el proyecto") tiene el orden de lectura.

## El cuaderno de lecciones

6. **Toda tanda de trabajo tiene que dejar la siguiente más fácil.** Antes de digitalizar, verificar o tocar el banco, leé [docs/lecciones-agentes.md](./docs/lecciones-agentes.md): errores, aciertos y casualidades de las tandas anteriores. Al terminar, agregá lo que aprendiste, con la forma `fecha · ERROR|ACIERTO|SUERTE · qué pasó · qué hacer la próxima vez`. Las SUERTES se anotan también: sirven para no generalizar. Los agentes (`agentes/`) leen el cuaderno al empezar y devuelven una sección "Lecciones nuevas" al terminar; el cronista las asienta.
