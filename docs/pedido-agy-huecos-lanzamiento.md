# Pedido de lectura (solo lectura, no edites nada)

Lee `CLAUDE.md`, `docs/plan-lanzamiento-cobro.md`, `docs/estado-saas-2026-11-04.md` y `docs/legal-revision.md`.

Contexto: Ronald quiere publicar AXIOM y empezar a cobrar y facturar. Ya tenemos una lista de lo que falta, pero sospecha que hay huecos que nadie vio. Tu tarea: encontrar lo que NO está en esas listas y que un negocio que cobra a estudiantes necesita ANTES de abrir.

Revisa el código real (`src/app/api`, `src/lib`, `supabase/`, `src/app/pagar`, `src/app/admin`, `src/app/cuenta`, `src/app/terminos`, `src/app/privacidad`, `vercel.json`/`next.config*`, `package.json`) y busca, por área:
1. Cobro: qué pasa si el alumno paga y el admin tarda; pago duplicado; comprobante falso; suscripción vencida (¿se corta el acceso?); aviso de vencimiento; recibos o constancia de pago al alumno; cómo ve Ronald sus ingresos (reporte, exportar para contador).
2. Facturación y contabilidad: todo lo que exista o falte (datos fiscales, NIT, exportar pagos).
3. Operación: respaldo de la base, errores en producción (¿hay registro/alertas?), correo o canal de soporte, límites de cuota de Supabase/Vercel, dominio propio, HTTPS, variables de entorno faltantes.
4. Cuentas: recuperación, cuenta duplicada con otro correo, quién puede entrar como admin, qué pasa con menores.
5. Legal: lo que los textos prometen y la app no cumple (ya hay una lista en legal-revision.md; agrega solo lo nuevo).
6. Contenido vendido: lo que se anuncia (cantidad de exámenes, "digitalizado", resoluciones) frente a lo que de verdad hay verificado.
NO incluyas: QR, contraseña maestra, lo visual, el motor, puntajes, ranking, publicidad (Ronald los dejó para el final).

Formato: una lista ordenada de más grave a menos grave: `archivo:línea (o "no existe") | el hueco | quién lo resuelve (Ronald / agente / contador / abogado) | tamaño`. Solo hallazgos comprobados en el código; si no estás seguro escribe "no verificado". Máximo 25 filas.
