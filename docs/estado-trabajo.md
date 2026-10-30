# Estado del trabajo (leer ESTO primero al abrir o retomar una sesión)

Un solo archivo, corto, que se reescribe al cerrar cada tanda. Si tenés dudas de qué está hecho, **no confíes en esta lista: comprobalo con los comandos de abajo**. El código y el registro mandan, esto solo es el mapa.

Última actualización: 30-oct-2026, tarde (todo medido en 0 salvo punnett y oxidacion, que son pasos de lectura; falta la lectura final por animación y el visto bueno).

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

### En curso (30-oct, tarde): arreglo final tras la lectura final
La lectura final dejó 10 animaciones `auditado` y 12 `con-hallazgos` (cuadrados, raiz, raiz-con-resto, logaritmos, logaritmos-propiedad, cuadratica, mruv, charles, estequiometria, progresion, pitagoras, interes). Dos agentes arreglan en paralelo, uno por conjunto de archivos (el 1 toca `generadores-algebra.ts` y `generadores.ts`; el 2, geometría, física, cuadrática, química, soluciones, progresiones y economicas). Se cortaron una vez por el límite de 5 horas; sus cambios quedan en disco SIN commitear. **Si la sesión murió: corré `npx tsc --noEmit`, `npm run lint`, `npm test` y `node src/app/prueba-animacion/medir-reglas.ts`; si pasan, commiteá; si no, mirá `git diff`.** Borrá `medir-tmp.ts` y `ver-tmp.ts` si siguen en `src/app/prueba-animacion/` (son de un agente). Lista cerrada de lo que arreglan:
- Regla de producto de dos cifras por dos cifras de un golpe (hoy: cuadrados 1, molaridad 2; pitagoras, charles, mruv, cuadratica, estequiometria y fracciones ya en 0), partiendo «a lápiz» con `lapiz.ts`.
- Comprobaciones circulares: progresion, interes, logaritmos-propiedad (cambiarlas por una independiente).
- Concepto: cuadrados (fórmula antes de usarla), raiz (divisiones sucesivas y significado de raíz), raiz-con-resto (cambio de base sin avisar), logaritmos (no nombrar una propiedad que no se enseñó), estequiometria (nombrar cuál 44 se tacha).
- Al terminar: una lectura corta e independiente solo de lo que cambió, registrar `auditado`, subir, y lista de visto bueno para Ronald.

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
1. **Un lote cerrado por agente**: lista medida de qué arreglar y cómo comprobar. Nunca «revisá y encontrá».
2. **Commit al terminar cada agente**, no al final del día. Lo que no está en `main` se puede perder.
3. **Cada informe de agente se resume acá o en la bitácora en el momento**, no «después». Las reglas candidatas que devuelva un agente se suman a `hallazgosPasos`.
4. Al cerrar la sesión: actualizar este archivo, la entrada de `BITACORA.md` y subir a `main`.
5. Hablarle a Ronald simple y corto; una pregunta por vez con respuesta de una palabra.
