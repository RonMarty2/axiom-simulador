# Plan para dejar el producto pulido (13-nov-2026)

**Aclaración de Ronald (13-nov):** «facturar» = llegar a generar dinero, y eso no se puede sin el producto pulido. Por eso este plan es SOLO del producto. **Cobros, factura, correos, recibos, contador, abogado, QR y publicidad NO se tocan ahora.** Tampoco lo visual, el motor, la estructura, la organización ni los puntajes (también al final).

Fuentes: [plan-accion-2026-11.md](./plan-accion-2026-11.md) (puerta P0 a P6), [pendientes-2026-11-06.md](./pendientes-2026-11-06.md), [retomar-auditoria-lecciones.md](./retomar-auditoria-lecciones.md). Comprobar en el disco antes de marcar algo hecho.

## Qué es «pulido» (lo que pesa para el alumno, en este orden)
1. **Exámenes correctos y completos** (lo que más pesa).
   - [ ] Ingeniería: exámenes de riesgo contrastados contra el escaneo (P4, opción B). Verificados hoy: 19 de 150.
   - [ ] Medicina: los PDF que hay, digitalizados y verificados (P5). En curso: final 2024-25, luego 2025-26.
   - [ ] Económicas: lo que falta del banco 2025-2026 (no bloquea).
   - [ ] Figuras pendientes de dibujar (`docs/figuras-pendientes.md`; necesitan PDF).
2. **Resoluciones bien explicadas.**
   - [ ] Razones flojas de Medicina (preguntas 59 y 60) con `auditor-clave-oficial`.
   - [ ] Explicaciones del banco al método paso a paso.
3. **Lecciones y láminas sin errores.**
   - [x] Auditoría de las 57 lecciones restantes (hecha, subida a main).
   - [ ] Decisiones dudosas con la guía UMSS: cadena epidemiológica 5 vs 6, pirámide de evidencia, POIDC/Fayol, Art. 410, % piel/peso, trapecio.
   - [ ] Lagunas de las lecciones (textos que Ronald aprueba).
4. **Datos y acceso seguros** (no es cobro: es que nadie vea respuestas ni datos ajenos).
   - [x] P0 simulacro con sesión y dueño; P3 ranking con apodo.
   - [ ] Rate limit en crear simulacro; `api/admin/banco` falla en Vercel (decidir si queda solo local).
   - [ ] Contenido de lecciones visible en el navegador (se acepta o no: decisión de producto).

## AL FINAL (Ronald, en mayúsculas): no se toca hasta cerrar 1 a 4
Lo visual, el motor, la estructura, la organización, los puntajes y el ranking; el QR; todo lo de cobros (pago real, avisos de Telegram, precios, recibos, correos, reporte de ingresos, factura y contador); lo legal (abogado); dominio propio; y, después de todo, la publicidad.

## Qué hace quién
- **agy** (cuando vuelva la cuota, ~19:00 del 13-nov): Medicina, explicaciones, auditorías de lectura.
- **Claude:** revisar diffs, comprobar contra el PDF, bitácora.
- **Ronald:** aprobar decisiones de contenido (lista del punto 3) y aportar PDF.
