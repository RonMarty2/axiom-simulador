# Retomar: auditoría de lecciones de pago (estado al 6-nov-2026, tarde)

**Todo está en `main`, árbol limpio, sin tareas de `agy` en curso.** 24 de 103 lecciones auditadas; quedan 57.

## Qué se hizo
- Tandas 1 a 4 (24 lecciones): informes comprobados en `docs/auditoria-tanda-1.md` a `-4.md`.
- Corregido en el código: errores de contenido demostrados, voseos y respuestas de las prácticas repartidas (16 lecciones). Controles: 607 tests, tsc sin errores.

## Qué falta, en orden
1. **Tandas 5 en adelante (57 lecciones).** Lista = las de `src/app/aprende/*` que no aparezcan en `docs/auditoria-*.md`. Prioridad: química, física y biología de Ingeniería y Medicina. Receta: pedido de 6 lecciones (copiar el formato de las tandas anteriores: `agentes/auditor-pedagogico.md`, solo lectura), lanzar con `python scripts/agy/agy_run.py --tipo auditoria --nivel lectura --solo-texto --pedido <archivo>`, **separando los lanzamientos al menos 75 segundos** (dos en el mismo segundo chocan por el nombre de la rama). Resultado en `%LOCALAPPDATA%\axiom-agy\<id>\RESPUESTA.md`. Modelo Argon sin cuota hasta el 7-nov 07:00: usar Flash.
2. **Comprobar cada hallazgo contra el código antes de corregir** (Flash a veces inventa). Corregir lo demostrado; guardar el informe en `docs/auditoria-tanda-N.md`; `python scripts/agy/aplicar.py <id> --limpiar`.
3. Reparto de respuestas: script en el scratchpad de la sesión (`rep.py`); si no está, la idea es mover la opción correcta (la que está en `c: 0`) a otra posición y cambiar `c`. El test `autocheck-reparto` vigila los AutoCheck.

## Esperan a Ronald
- Mirar en el celular: la recta de ejemplo en `ecuacion-recta` (parece salirse del cuadro) y la batería de `circuitos-dc` (placas paralelas al cable).
- Aprobar los textos de `docs/lagunas-propuestas-tandas-1-2.md` (material para alumnos). Las lagunas de las tandas 3 y 4 están listadas en sus informes, sin textos todavía.
- Sin tocar y sin urgencia: trinomios con a ≠ 1 y cubos en factorización, esquema de rumbos, dibujo del helicóptero.

## Lo de siempre
- Al FINAL, y sin mencionarlo antes: QR de Bs. 50, Telegram, prueba de pago real, clave maestra, abogado.
- Otros pendientes: `docs/pendientes-2026-11-06.md`.
- No usar `git reset --hard`; los tests no importan módulos con alias `@/`; revisar siempre el DIFF de lo que haga `agy`.
