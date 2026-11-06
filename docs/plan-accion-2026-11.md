# Plan de acción urgente: plataforma completa antes de publicidad (desde 7-nov-2026)

Por qué existe (Ronald, 6-nov): Rindex «se nos está adelantando y nosotros seguimos haciendo no sé qué cosas»; «a veces me meto a hacer publicidad sin tener toda la plataforma, generando huecos». Este plan dice qué se hace cada sesión. **Una sesión nueva lee este archivo, toma la primera casilla sin marcar y no hace otra cosa.**

## Regla de oro: la PUERTA
No se hace publicidad, ni animaciones nuevas, ni láminas nuevas, ni la app de Play Store, hasta que las 6 casillas de la puerta estén marcadas. La auditoría de lecciones sigue solo en segundo plano con agy (no ocupa sesiones).

- [x] P0. Seguridad del simulacro publicada (hecho: commit `3b96395` en `main`, 6-nov; el disco tenía el mismo cambio sin commit porque otra sesión ya lo había subido). Crear, ver y finalizar un simulacro exige sesión y ser el dueño. Lo que queda de `/api/usuarios` (público, lista nombre real, plan y notas de todos) se arregla junto con P3.
- [ ] P1. Un pago real probado de punta a punta (QR, aviso por Telegram, aprobación en admin, plan activo).
- [ ] P2. Contraseña maestra rotada en Vercel.
- [x] P3. Ranking sin nombre real (hecho 6-nov, opción A de Ronald): apodo que elige el alumno en «Mi cuenta» o «Alumno anónimo» por defecto; `/api/usuarios` ya no da nombre real, id ni plan. Migración 008 aplicada en producción el 6-nov.
- [ ] P4. Ingeniería: los exámenes de riesgo (opción B) contrastados contra el escaneo y registrados.
- [ ] P5. Medicina: los PDF de Medicina que hay, digitalizados y verificados (hoy hay 1 examen; Rindex muestra 16).
- [ ] P6. Un examen completo hecho en el celular por `probador-app` sin fallas graves, en Ingeniería y en Medicina.

## Cifras de partida (medidas por script el 6-nov)
- Banco: 150 exámenes (Ingeniería 139, Económicas 10, Medicina 1).
- Verificados contra el escaneo: 19 (14 completos, 5 parciales). Sin verificar: 131.
- Escaneos: FCYT 140 PDF, FCE 3 PDF, MEDICINA 8 PDF + 6 imágenes; 443 fotos sueltas sin clasificar en `examenes pasados/`.

## Semana 1

**Día 1 · Sesión 0 (Claude, lo primero de todo):** correr `tsc`, lint y tests sobre los 3 archivos del simulacro sin commit, `verificador`, commit y push → P0. Si el cambio era de otra sesión a medias, mirar `git log` y la bitácora antes.

**Día 1 · Sesión A (Ronald, ~1 hora, solo él puede):**
- [ ] Generar el QR de BNB del monto Pro (o sin monto) y pasarlo para `src/lib/pagos-qr.json`.
- [ ] Crear el bot de Telegram y cargar sus datos en Vercel (`docs/avisos-telegram.md`).
- [ ] Rotar `MASTER_LOGIN_PASSWORD` en Vercel → P2.
- [ ] Pagar él mismo con otra cuenta y comprobar aviso, aprobación y plan activo → P1.
- [ ] Decidir: opción B de auditoría (A aprobar los 48 exámenes de riesgo / B acotar) y cuántos exámenes de Medicina entran.

**Día 1 · Sesión B (Claude + agy):** ranking con apodo generado, anónimo y switch «salir del ranking» en `/cuenta`. agy escribe el código con tests; Claude revisa, `verificador`, commit → P3.

**Día 2 · Sesión A:** opción B lote 1 con `auditor-facsimil` (preguntas con figura o reconstruidas sin PDF). Registrar en `data/registro-verificacion.json`.
**Día 2 · Sesión B:** `auditor-figuras` sobre los circuitos y figuras con medidas del lote 1 (agy NO juzga figuras).

**Día 3 · Sesión A:** Medicina: `transcriptor-examenes`, un agente por examen, los 2 primeros PDF.
**Día 3 · Sesión B:** Medicina: `auditor-facsimil` y `auditor-clave-oficial` sobre esos 2.

**Día 4 · A y B:** Medicina, los PDF siguientes, igual que el día 3.

**Día 5 · Sesión A:** opción B lote 2 (igual que el día 2).
**Día 5 · Sesión B:** cerrar los 5 verificados parciales (figuras P16/P18 de 2005-1, P11/P12 de 2006-1) y la P7 de Económicas 2/2011.

**Día 6 · Sesión A:** lo último de Medicina → P5. **Sesión B:** lo último de la opción B → P4.

**Día 7 · Revisión:** `probador-app` hace un examen completo en celular, en Ingeniería y en Medicina → P6. Claude marca la puerta y le dice a Ronald qué falta.

## Semana 2 (solo cuando la puerta está cerrada): lo que nos pone por delante de Rindex
1. Inicio con un «siguiente paso» que cambia según lo pendiente (errores por repasar, lección a medias) y una meta del día.
2. Paquetes por periodo (1, 3 y 6 meses, pago único, «no se renueva solo»). **Decisión de Ronald: los precios.**
3. Comparación con otros postulantes de la misma facultad («aciertas más que el X %»).
4. Flashcards armadas desde los errores del alumno, con el repaso por cajas que ya existe en `src/lib/axiom/repaso.ts`.
5. Ranking serio: solo cuentan los simulacros completos con tiempo, y piden un mínimo en días distintos.
6. Recién ahí: publicidad, con piezas que pasaron por `revisor-piezas`.

## Lo que ya tenemos y Rindex no (para la publicidad, después)
Lecciones y láminas que enseñan; exámenes por tema y año, no un solo área «General»; precio visible y QR boliviano; se puede leer sin crear cuenta.

## Cómo cierra cada sesión
1. Marcar la casilla en este archivo. 2. Una línea en `BITACORA.md`. 3. Commit y push. 4. Si algo quedó a medias: qué falta y la carpeta de agy.

## Arreglos de pantalla (auditoría en celular del 6-nov, `auditor-pantallas-movil`)
Van en el **Día 1 · Sesión C** (después de P0 y P3), con agy escribiendo y Claude revisando:
- [x] (HECHO 6-nov: `/simulador` pide elegir el examen del año y manda `examen_id`; mensaje del servidor en tuteo y sin ids. Probado en local: Económicas 2014, 3 exámenes, arranca el 2/2014 con sus 24 preguntas. Pasaba también en Económicas, no solo en Ingeniería. Falta el test por facultad.) CRÍTICO. El «Examen oficial de admisión» de Ingeniería NO arranca en `/simulador`: la API responde «Hay 9 exámenes del año 2025… Especificá 'examen_id'» (con voseo e ids internos), en cualquier año, porque ningún año tiene un examen solo. En Medicina sí arranca, y por `/practicar` → Examen real también. Arreglo: que la pantalla pida elegir el examen del año (o lo mande con `examen_id`), y un test que arranque un simulacro por facultad (hoy `test:pantallas` solo carga rutas). Ojo: `src/app/api/axiom/simulador/route.ts` es uno de los archivos de P0, así que va después de P0.
- [x] (HECHO 6-nov, `etiquetaArea`) ALTO. El onboarding muestra los ids crudos de las materias («ARITMETICA_ALGEBRA», «MORFOFUNCION»): es la primera pantalla de todo alumno.
- [ ] MEDIO. Textos que se contradicen: `/precios` dice que el plan gratis trae los exámenes pasados (con la cifra escrita a mano) y `/aprende` los pone tras el plan pago. «Accede a los 1 exámenes». **Decidido por Ronald el 6-nov (A): los exámenes pasados se leen gratis; las explicaciones y soluciones son de pago.** Corregir `/aprende` para que diga eso y sacar la cifra escrita a mano de `/precios` (regla 6).
- [x] (HECHO 6-nov: hoja «Examen real» con título, preguntas, aviso del cronómetro y del límite semanal del plan gratis; botones «Ahora no» / «Empezar») MEDIO. Un toque en un examen de la lista arranca el cronómetro y gasta un simulacro gratis sin confirmar: falta una pantalla de detalle (como la de Rindex).
- [x] (HECHO 6-nov: el parser no quitaba las comillas del frontmatter; 10 exámenes de Ingeniería) MEDIO. Títulos con comilla suelta en Ingeniería 2025 («"Examen Final», «"Primer Parcial»): frontmatter mal leído.
- [ ] MEDIO. «Tu próximo paso» del dashboard con fondo oscuro (contra `docs/identidad-visual.md` §4); la pregunta del simulacro usa ~260 de 375 px por tarjeta dentro de tarjeta; la estrella de marcar es chica (28x26).
- [ ] BAJO. Tildes faltantes (`estas` → `estás` en practicar, debilidades, onboarding, lección), «si aciertas una 3 veces», «Haz clic» → «Toca», zonas táctiles chicas, márgenes laterales distintos, avatar «R(».
Lo demás pasó: `npm run test:pantallas` 24 de 24 y ningún desborde a 375 ni a 360. Capturas (temporales) en la carpeta `scratchpad\caps\` de la sesión 825b6f8b. Seguridad ya revisada: el resto de las rutas (pagos, admin, cuenta, login) salió sin problemas; `admin/banco` POST ya responde 501 en Vercel.
