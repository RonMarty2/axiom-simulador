# Estado del trabajo (leer ESTO primero al abrir o retomar una sesión)

Un solo archivo, corto, que se reescribe al cerrar cada tanda. Si tenés dudas de qué está hecho, **no confíes en esta lista: comprobalo con los comandos de abajo**. El código y el registro mandan, esto solo es el mapa.

Última actualización: 30-oct-2026, tarde (arreglo final hecho y medido; falta la lectura corta de lo cambiado, la mirada visual y el visto bueno).

## Cómo comprobar el estado real (en este orden, 2 minutos)

```bash
git fetch origin main && git status -sb && git log --oneline -8   # qué está subido y qué quedó sin commitear
node src/app/prueba-animacion/medir-reglas.ts                     # qué animaciones rompen reglas (meta: todo en 0)
npm test                                                          # 5xx tests; el trinquete de estilo.test.ts dice qué tipo empeoró
cat data/cambios-por-revisar.json                                  # detalles pendientes y revisados por agentes
```

Si hay archivos sin commitear de `src/app/prueba-animacion/` y nadie los reclama, **son de un agente que quedó a medias**: corré `npx tsc --noEmit`, `npm run lint` y `npm test`; si pasan, commitealos; si no, mirá `git diff` antes de seguir. No los borres.

## Meta actual: cerrar las animaciones de resolución de una vez

Método que decidió Ronald (30-oct): **un error se encuentra una sola vez, se convierte en regla medida por código (`hallazgosPasos` en `estilo.ts`), y el código lo busca y obliga a arreglarlo en todos los tipos**. Nada de auditorías abiertas que siempre encuentran algo nuevo. Cuando una animación pasa las reglas y una lectura final, queda cerrada y no se toca salvo que cambie su generador o entre una regla nueva.

### Hecho
- [x] Migración 007 aplicada en producción (Supabase de AXIOM: org «axiom», proyecto `opyfpoqvtaqoawssomhh`, cuenta rnd261190).
- [x] 4 detalles de pantalla arreglados en el motor (`Fusion.tsx`). Falta segunda mirada visual.
- [x] 6 reglas de pasos medidas por código con trinquete por tipo (commit `0969aba`).
- [x] Auditadas con hallazgos: mruv, charles, moles-atomos, estequiometria y las 9 de álgebra (ninguna `auditado`).

### Hecho (30-oct, tarde): arreglo final tras la lectura final (commit de esta tanda)
Los 12 tipos con hallazgos se arreglaron en sus generadores: cuentas de dos cifras «a lápiz» (`lapiz.ts` compartido), comprobaciones circulares reemplazadas (progresion, interes, logaritmos-propiedad), concepto antes de la propiedad (cuadrados, raiz, raiz-con-resto, logaritmos) y el 44 nombrado en estequiometria. `medir-reglas.ts` da 0 salvo punnett (10 y 5) y oxidacion (6 y 2), que son pasos de lectura. 536 tests, build OK. Ninguno de los 12 está `auditado` todavía: quedaron `con-hallazgos` «arreglado 30-oct, falta lectura».
**Lectura independiente con `agy` (30-oct, Claude Sonnet 5.5 vía `agy`, solo lectura, gasta la cuota de Google y no la de Claude):** leyó 10 de 13 tipos (fracciones, interes y molaridad quedaron sin leer por cuota; se renueva ~4 h 30 min después). Criterio de cierre confirmado por Ronald: se arreglan los errores de matemática y lo medible por código; el resto va a `docs/mejoras-opcionales-animaciones.md` y se mira cuando Ronald marque algo en `/prueba-animacion`. Un error real: paréntesis que faltan en cuadratica («144 − 10·9 + 2·9» en vez de «144 − (10·9 + 2·9)»), se arregla con un agente y una prueba. Cómo usar `agy`: `agy --print "<instrucción>" --mode plan --model "Claude Sonnet 5.5 (High)"` desde una carpeta con los archivos a leer (`node src/app/prueba-animacion/volcar.ts <tipo>` vuelca los pasos a texto; hay que llamarlo desde PowerShell, no Git Bash). Yo planifico y verifico, `agy` ejecuta.
**Lista para el visto bueno de Ronald (30-oct, noche):** el panel `/prueba-animacion` (solo desarrollo, `localhost:3001`) muestra 21 animaciones y 69 pasos marcados para mirar. Nunca aprobadas: lineal, mruv, charles, moles-atomos, estequiometria, dinamica, tiro, molaridad, oxidacion, trigonometria, progresion, pitagoras, punnett, interes. Aprobadas antes pero cambiadas después: cuadrados, fracciones, potencia, raiz, raizResto, logaritmos, cuadratica. Pasos por mirar: mruv 10, cuadratica 9, cuadrados 7, fracciones 5, raiz 5, charles 5, molaridad 5, raizResto 4, estequiometria 4, interes 4, moles-atomos 3, trigonometria 3, progresion 2, lineal 1, logaritmos 1, pitagoras 1. Auditadas por lectura independiente (sin hallazgos): lineal, potencia, dinamica, tiro, oxidacion, trigonometria, punnett. Lo que Ronald marque en el panel es lo que se corrige después. Quedan por leer con `agy` (cuota ~4 h 30 min): fracciones, interes, molaridad.
**Siguiente (anterior a la lista):** una lectura corta e independiente solo de lo que cambió (los 12 tipos), después registrar `auditado --independiente`, una pasada de `revisor-visual` a los pasos nuevos (cuadrados, fracciones, cuadratica, pitagoras, raiz) y la lista de visto bueno para Ronald. Abierto: fracciones tiene ~9 % de combinaciones con `n·k`/`d·k` de dos cifras (los casos fijos dan 0); decimales con `{,}` no los mide la regla; interes con centavos usa `viajar` para correr la coma.

### Pendiente, en este orden
1. [x] Cuadratica en 0 (hecho 30-oct, 530 tests): a=1 con la `a` al final y `·1` tachado, una suma por paso, cuentas de dos cifras «a lápiz». Abierto: la fila de referencia no tiene rótulo (con `debajo` se estira mucho); a negativa, discriminante negativo y resultado no entero los rechaza `validarCuadratica` (decisión de producto: ampliar o no el alcance).
2. [ ] Sumar a `casos.ts` los casos de borde que faltan (`logaritmos-propiedad`, `2,2,2`) y que las reglas los vean.
3. [ ] Pendientes visuales de álgebra que el código no ve (marcas, comas, renglones): una pasada de `revisor-visual` por tipo, después de lo anterior.
4. [ ] Una lectura final por animación con `auditor-de-pasos` (lo que el código no mide: comprobación circular, cambio de base sin avisar, química sin mostrar conteos, que se entienda). Registrar `auditado` solo con segunda lectura independiente.
5. [ ] Lista final para el visto bueno de Ronald (`/prueba-animacion`).
6. [ ] **Decisión de Ronald antes de hacerlo:** registro por caso o examen en vez de por tipo.
7. [ ] Conectar las animaciones a la app: aplazado por Ronald hasta completar todas.

### Reglas candidatas: qué se midió y qué quedó para el auditor
- Sumadas a `hallazgosPasos` (30-oct): cuenta grande también con fracciones de piezas (`nPiezas`/`dPiezas`) y dos pasos seguidos que solo marcan algo. Con eso quedan topes: molaridad 2, oxidacion 6, punnett 10, interes 5 (casos difíciles). punnett y oxidacion son pasos de lectura de una tabla o molécula: se miran en la lectura final, no son error seguro.
- NO se miden con código (dan falsos positivos): `÷1` como paso (`x = 3/1` es el cierre normal de lineal y raíz), `x·1` escrito en el texto (`1·3=3` es válido si el 1 es el numerador de una fracción), etiqueta `debajo` más ancha que su pieza. Los ve el auditor.
- Hecho 30-oct: interes y molaridad en 0 (cuenta grande exacta: Y = I·100 y tachar). El `·` suelto de progresión se arregló en el generador (el salto `Fsd` ahora va después del punto), no en el motor; `progresion` quedó `con-hallazgos` por cambiar la huella y necesita una lectura corta del auditor. Candidata sin medir: «un renglón forzado (`salto`) que empieza con `·`, `+`, `−` o `=` solo puede ser el primero de su fórmula».

## Después de las animaciones (orden acordado)
- Comparar los exámenes del banco contra su PDF con `auditor-facsimil` (6 de 150 hechos; de 1 a 2 por día).
- Mirar `/errores` y `/practicar` en celular (el repaso de errores ya está activo).
- Decisiones de Ronald: línea de créditos a MinerU (texto legal), colores del avatar.

## Reglas para no perder el hilo
0. **`agy` ejecuta, Claude planifica y verifica (Ronald, 30-oct).** Las tareas de edición van a `agy` en una copia aislada (`git worktree`), modo `accept-edits`, con un plan escrito; Claude revisa `git diff`, `tsc`, lint, tests y `medir-reglas.ts` antes de traer nada a `main`. Cómo llamarlo y sus límites (cuota, PowerShell, nombres de modelo): memoria `usar-agy-para-ejecutar` y la nota de «Lectura independiente con agy» más arriba. Hasta ahora `agy` solo se usó para LEER (10 tipos); todo el código lo hicieron agentes de Claude.
1. **Un lote cerrado por agente**: lista medida de qué arreglar y cómo comprobar. Nunca «revisá y encontrá».
2. **Commit al terminar cada agente**, no al final del día. Lo que no está en `main` se puede perder.
3. **Cada informe de agente se resume acá o en la bitácora en el momento**, no «después». Las reglas candidatas que devuelva un agente se suman a `hallazgosPasos`.
4. Al cerrar la sesión: actualizar este archivo, la entrada de `BITACORA.md` y subir a `main`.
5. Hablarle a Ronald simple y corto; una pregunta por vez con respuesta de una palabra.
