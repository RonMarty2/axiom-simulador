# Estado del trabajo (leer ESTO primero al abrir o retomar una sesión)

Un solo archivo, corto, que se reescribe al cerrar cada tanda. Si tenés dudas de qué está hecho, **no confíes en esta lista: comprobalo con los comandos de abajo**. El código y el registro mandan, esto solo es el mapa.

Última actualización: 30-oct-2026, tarde (todas las animaciones medidas en 0; falta sumar reglas candidatas y la lectura final).

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

### En curso (sesión del 30-oct). Los agentes escriben a disco; si la sesión murió, mirá `git status`
- [x] `revisor-visual` (hecho 30-oct): los 4 casos del arreglo del motor salen BIEN en 343 px y no se rompió cuadratica ni fracciones. Único hallazgo, viejo: progresion «todo_negativo_extremos» pasos 15 y 16, el `·` queda solo al principio del renglón en `(30 − 1) · (−10)`. Arreglo ya anotado en la bitácora: permitir el corte antes del `·` solo cuando los dos operandos son paréntesis y el punto abre el renglón de abajo. Falta hacerlo en `Fusion.tsx`.
- [x] Física y química (hecho 30-oct): mruv, charles, moles-atomos, estequiometria, molaridad y trigonometria en 0 en `medir-reglas.ts`; topes bajados (solo queda cuadratica: 10 y 2). 529 tests. Ninguna marcada `auditado`. NO se pudo: comprobación del valor en moles-atomos (30 g/180 = 1/6 mol) y conservación de masa en estequiometria (piden dejar visibles masas molares; decidir si vale la pena); `÷1` como paso propio en molaridad con V=1. A mirar por `revisor-visual`: etiqueta `H:4=4` del balanceo (deja un hueco entre coeficiente y fórmula) y el gesto del tachado de los `1`.

### Pendiente, en este orden
1. [x] Cuadratica en 0 (hecho 30-oct, 530 tests): a=1 con la `a` al final y `·1` tachado, una suma por paso, cuentas de dos cifras «a lápiz». Abierto: la fila de referencia no tiene rótulo (con `debajo` se estira mucho); a negativa, discriminante negativo y resultado no entero los rechaza `validarCuadratica` (decisión de producto: ampliar o no el alcance).
2. [ ] Sumar a `casos.ts` los casos de borde que faltan (`logaritmos-propiedad`, `2,2,2`) y que las reglas los vean.
3. [ ] Pendientes visuales de álgebra que el código no ve (marcas, comas, renglones): una pasada de `revisor-visual` por tipo, después de lo anterior.
4. [ ] Una lectura final por animación con `auditor-de-pasos` (lo que el código no mide: comprobación circular, cambio de base sin avisar, química sin mostrar conteos, que se entienda). Registrar `auditado` solo con segunda lectura independiente.
5. [ ] Lista final para el visto bueno de Ronald (`/prueba-animacion`).
6. [ ] **Decisión de Ronald antes de hacerlo:** registro por caso o examen en vez de por tipo.
7. [ ] Conectar las animaciones a la app: aplazado por Ronald hasta completar todas.

### Reglas candidatas pendientes de sumar a `hallazgosPasos` (vistas en 2 o más tipos)
1. Paso que solo resalta (sin fusión, brote ni visita) tras otro paso de lectura (charles, mruv, trigonometria).
2. `÷1` o `/1` como paso propio (molaridad V=1, trigonometria).
3. `×1` dentro de un texto o un `1` que nace pegado a un factor (hoy solo ve fusiones de 3 piezas).
4. Cuenta grande en fracciones con piezas: leer `nPiezas`/`dPiezas`, no solo `frac.n`/`frac.d`.
5. Etiqueta `debajo` más ancha que su pieza (reacomoda renglones).
6. Progresión «todo_negativo_extremos» pasos 15 y 16: `·` suelto al principio del renglón (arreglo en `Fusion.tsx`).

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
