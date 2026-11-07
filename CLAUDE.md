# Punto de entrada para asistentes IA

**Si retomás una sesión o no sabés en qué estamos, leé primero [docs/estado-trabajo.md](./docs/estado-trabajo.md)** (un mapa corto con los comandos para comprobar el estado real). **Si sos una IA (Claude, GPT, etc.) trabajando en este repo, leé después [BITACORA.md](./BITACORA.md).** Tiene TODO: identidad del proyecto, decisiones arquitectónicas, errores históricos, principios de animación, roadmap. En 10 minutos sabés dónde estás parado.

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
6. **Modularidad y Cero cifras "quemadas" a mano (Single Source of Truth):** Precios SOLO salen de `@/lib/precios` (`PRECIOS_BOB`); métodos de pago de `@/lib/pagos-config`; cantidad de exámenes del banco de `listarMetadata()` o `/api/facultades`. **NUNCA escribas números de catálogo ("139 exámenes", precios fijos) clavados a mano en el JSX.** El software debe auto-calcularse para que cuando Ronald o un agente agregue un examen nuevo, todo se actualice automáticamente sin choques entre sesiones. Ver Decisión D9 en [BITACORA.md](./BITACORA.md).

7. **`agy` primero (decisión de Ronald, 1-nov-2026).** Antes de lanzar un agente de Claude o de leer, auditar o editar cosas largas, decidí si lo puede hacer `agy` y, si puede, delegalo: leé [agentes/ejecutor-agy.md](./agentes/ejecutor-agy.md) (sección «Puerta obligatoria») y usá `scripts/agy/agy_run.py`. Claude decide, revisa el DIFF y los CONTROLES y habla con Ronald; `agy` hace el resto (Flash 3.8 para lo mecánico y la lectura, Argon para lo que pide criterio). Un agente de Claude solo entra si necesita el navegador o hablar con Ronald. Si decís «lo hago con Claude», explicale a Ronald en una línea por qué `agy` no podía. Un hook (`scripts/agy/recordatorio.mjs`) te lo recuerda antes de cada subagente.
8. **Dejá registro SIEMPRE, por si se cierra la ventana (decisión de Ronald, 6-nov-2026).** Mientras trabajás, no al final: cada vez que cierres un paso, anotá en `BITACORA.md` qué hiciste, qué quedó pendiente y cuál es el próximo paso concreto; los inventarios y listas largas van a un archivo de `docs/` (ejemplo: [docs/pendientes-2026-11-06.md](./docs/pendientes-2026-11-06.md)) y se commitean. Una sesión nueva tiene que poder retomar solo con leer el repo, sin que Ronald explique nada. Si una tarea de `agy` o un agente está en curso, anotá su id y dónde queda el resultado.

9. **TODA MEJORA VISIBLE SE LE MUESTRA A RONALD EN SU TABLET/CELULAR (REGLA PRINCIPAL, decisión de Ronald, 6-nov-2026, en mayúsculas: «si corregimos cómo se ven las sumas, quiero que me muestres en mi tablet abriendo la app y mostrando una suma… extrapola a TODO, navegación incluida… y me dices qué debo hacer en la ventana para ver esa mejora»).** Prioridad absoluta: terminar AXIOM. **Después de CADA arreglo, mejora o corrección (también las que salen del informe de un subagente), la sesión abre ella misma la ruta en la tablet por USB, mira la captura (800×1340 y 360×740, restaurando con `wm size reset`) y recién ahí dice «listo»; nunca manda a Ronald a revisar ni a «dejar una ventana visible» (7-nov, repetido por Ronald en mayúsculas). Antes de abrir, mirar una captura de la tablet: si otra sesión la está usando (otra ruta, pestañas subiendo), esperar y avisar; una pestaña nueva no pisa nada.** Vale hasta que Ronald la cambie él mismo. Cada vez que un cambio se pueda ver en pantalla (texto, fórmulas, animaciones, navegación, colores, botones, cobros, lo que sea), antes de decir «listo»: **TODO se piensa y se comprueba para WEB (escritorio), CELULAR y TABLET, de TODOS los tamaños (Ronald, 6-nov, mayúsculas): un cambio visible no está listo si solo se vio en un tamaño. Mínimo tres vistas: escritorio (~1280 px, `resize_window` en Chrome), tablet (la de Ronald por USB, 800×1340) y celular chico (~360×740: `adb shell wm size 360x740`, y al terminar SIEMPRE `adb shell wm size reset`), mirando capturas de las tres; sin posiciones que dependan de un solo ancho (ej.: un modal pegado abajo tapado por la barra inferior, hallado el 6-nov en la tablet).** **Avisos, alertas y cuadros de confirmación van SIEMPRE AL CENTRO de la pantalla (`fixed inset-0` con `items-center justify-center`), nunca pegados abajo: Ronald los ve tarde y la barra inferior los tapa (6-nov: «¿no debería estar en el medio el cuadro?»). Barrido del 6-nov: los demás cuadros de la app ya están centrados (`simulador/[simId]/page.tsx` ×2, «Preparando tu examen»); `alert()`/`confirm()` del navegador los ubica el navegador. Al crear uno nuevo, probarlo en las 3 vistas.** **(0) la tablet de Ronald está conectada por depuración USB (6-nov): se le muestra DIRECTO ahí y ANTES de subir a `main`, como prueba: `node scripts/ver-en-tablet.mjs /<ruta> --usb` reenvía el puerto con adb, abre la ruta en el navegador de la tablet y deja una captura en `%TEMP%xiom-tablet.png`; después de abrir, mirá la captura (o `adb exec-out screencap -p`), y recién con su visto bueno se sube.** (1) corré `node scripts/ver-en-tablet.mjs /<ruta>` (levanta la app en la red local en `-H 0.0.0.0`, puerto 3001, e imprime las direcciones; si ya corre, solo las imprime); (2) en tu respuesta dale a Ronald la dirección exacta para escribir en el navegador de la tablet (misma WiFi; la `100.x` es por Tailscale), los pasos cortos dentro de la app hasta llegar al cambio («toca Prácticas, luego Suma, mirá el paso 3») y qué debe ver ahora frente a cómo se veía antes; (3) elegí vos la ruta con un ejemplo real de la corrección (la suma que cambió, la pantalla de navegación tocada), nunca la portada genérica. Si el cambio NO se ve (banco de datos, tests, bitácora, scripts), decí «no aplica» y por qué en una línea. Lo vigila el hook `revisar_respuesta.py` del taller: frena la respuesta que edita `src/**/*.tsx|css` sin explicar cómo verlo.

## Agentes del proyecto (`agentes/`)

Cada uno lleva adentro las lecciones de §7 que le tocan, así no hay que releer la bitácora entera para cada tarea chica.

**Se editan en `agentes/`, sin punto.** Claude Code los lee de `.claude/agents/`, pero Ronald sincroniza el repo entre PC y laptop con Synology Drive, que no lleva carpetas con punto. `scripts/sincronizar-agentes.mjs` copia entre las dos (gana el archivo más nuevo, nunca borra) y corre solo en `npm install`, en `npm run dev` y al abrir cada sesión de Claude Code. Para borrar un agente, borralo de las dos carpetas. El test `src/lib/agentes.test.ts` frena si llegan distintas al repo.

| Agente | Para qué | Cuándo |
|---|---|---|
| `transcriptor-examenes` | PDF → `.md` del banco, resolviendo cada respuesta | Uno por examen, en paralelo. Necesita los PDF (máquina de Ronald) |
| `auditor-figuras` | Contrasta preguntas contra el facsímil y dibuja la figura | Figuras pendientes, modos 1 a 4. Necesita los PDF |
| `auditor-facsimil` | Contrasta UN examen digitalizado contra su PDF y lo registra en `data/registro-verificacion.json`; solo los verificados se muestran como digitalizados | Uno por examen, de a poco. Necesita los PDF (máquina de Ronald) |
| `auditor-de-pasos` | Lee una animación de resolución transición por transición como alumno nuevo y reporta saltos ("como a lápiz": definir, reemplazar de a una, una operación por paso). Vale para toda materia | Siempre antes de mostrarle una animación a Ronald. No reescribe |
| `revisor-visual` | Mira las capturas de una animación (`scripts/capturas.mjs`) en celular y reporta cortes de fórmula, etiquetas pisadas, desbordes. Vale para toda materia | Después de generar o tocar una animación, antes de la fila de Ronald. No reescribe |
| `auditor-pedagogico` | Lee lecciones/láminas como alumno nuevo, reporta en `docs/auditoria-pedagogica.md` | 3 a 6 piezas por agente, varios en paralelo. No reescribe |
| `autor-laminas` | Escribe una lámina nueva en formato tarjetas (§4.5) | De a una: Ronald revisa cada una |
| `verificador` | Corre tsc/lint/test/build y lee el diff contra los errores conocidos | Antes de commitear cualquier cambio al banco, figuras, contenido o plan |
| `cronista` | Ramas sin mergear, roadmap contra código, entrada de bitácora | Al abrir y al cerrar sesión |

**Flujo típico:** `cronista` (estado) → agentes de trabajo en paralelo → `verificador` → `cronista` (entrada) → commit y push a `main`. Los agentes de trabajo **no commitean**: lo hace la sesión principal después del verificador.

## Cómo trabajar

Adaptado el 5-oct-2026 de una plantilla de flujo de trabajo que Ronald trajo. Lo que ya teníamos (cuaderno de lecciones, subagentes, bitácora) no se duplicó; esto es lo que faltaba.

- **Planificá antes de lo grande.** Si son más de 3 pasos, hay una decisión de arquitectura o algo que no se deshace fácil (cobros, borrar datos, un cambio masivo al banco), escribí un plan corto: qué vas a tocar y cómo vas a comprobar que quedó bien. Si a mitad de camino algo sale torcido, **frená y replanificá**; no sigas empujando (así salieron las 14 preguntas vaciadas). Un cambio chico no necesita plan.
- **Subagentes** para investigar y para trabajo en paralelo, uno por tarea. No para lo que se resuelve con dos lecturas.
- **Una corrección de Ronald es una lección.** Anotala en el cuaderno en el momento, no al final, y leé el cuaderno al empezar **cualquier** tanda (interfaz, cobros, legal), no solo las del banco.
- **No des nada por terminado sin probarlo.** `tsc`, lint, tests y build; si tocaste la interfaz, miralá en celular y en tablet; si es un bug, reproducí el fallo antes y mostrá que ya no pasa. Preguntate si un ingeniero senior lo aprobaría. Cambios a banco, figuras, cobros, legal o contenido pasan por `verificador`.
- **Bugs y CI rojo: arreglalos sin pedir permiso**, buscando la causa raíz y tocando solo lo necesario. Lo que NO se resuelve solo: decisiones de producto, precios, reglas de acceso y textos legales. Eso se pregunta.
- **Simple y mínimo.** El cambio más chico que ataque la causa; sin capas ni abstracciones "por las dudas". Si un arreglo se siente parche, pensá cómo lo harías sabiendo todo lo que ya sabés, salvo que sea simple y obvio.

## Cómo retomar

```bash
npm install
npm run dev
```

Después: bitácora § 10 ("Cómo retomar el proyecto") tiene el orden de lectura.

## El cuaderno de lecciones

6. **Toda tanda de trabajo tiene que dejar la siguiente más fácil.** Antes de digitalizar, verificar o tocar el banco (y al empezar cualquier otra tanda), leé [docs/lecciones-agentes.md](./docs/lecciones-agentes.md): errores, aciertos y casualidades de las tandas anteriores. Al terminar, agregá lo que aprendiste, con la forma `fecha · ERROR|ACIERTO|SUERTE · qué pasó · qué hacer la próxima vez`. Las SUERTES se anotan también: sirven para no generalizar. Los agentes (`agentes/`) leen el cuaderno al empezar y devuelven una sección "Lecciones nuevas" al terminar; el cronista las asienta.
