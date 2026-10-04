# Revisión legal de /terminos y /privacidad

Los dos textos los redactó una IA a partir de lo que la app hace de verdad (código y base de datos), **no un abogado**. Sirven para salir a cobrar con algo escrito y honesto, pero conviene que los lea un abogado boliviano antes de que haya volumen o menores pagando. Esta lista dice qué mirar.

## Decisiones de negocio que se tomaron por defecto (Ronald puede cambiarlas)

| Qué | Cómo quedó | Dónde |
|---|---|---|
| Reembolsos | Sin devolución por cambio de opinión. Sí si: pago doble, pago recibido sin acceso activado, o falla grave del servicio. Se pide dentro de 7 días. | `terminos`, sección 5 |
| Edad | Mayor de 18, o menor con permiso de madre, padre o tutor | `terminos` 2, `privacidad` 9 |
| Límite de responsabilidad | Lo pagado en el mes del problema, sin limitar derechos de consumidor | `terminos` 9 |
| Jurisdicción | Leyes de Bolivia, tribunales de Cochabamba | `terminos` 11 |
| Renovación | Nunca automática; cada pago es un mes | `terminos` 3 |
| Aviso de cambios | Dentro de la app; seguir usando = aceptar | `terminos` 10 |

## Afirmaciones que dependen de datos que solo Ronald tiene

- **Quién es el titular** (nombre completo o razón social) y **un canal de contacto**. Van en `src/lib/legal.ts` (`titular`, `correo`, `whatsapp`). Hoy están en `null` y las páginas lo dicen en la sección de contacto. **No se debe cobrar con eso así**: sin canal, nadie puede pedir un reembolso ni que le borren los datos.
- "AXIOM es independiente de la UMSS y no cuenta con su aval": confirmar que es así.
- Los exámenes pasados "pertenecen a sus titulares originales" y se usan "con fines de estudio": un abogado debería opinar sobre la reproducción de exámenes de la UMSS.

## Cosas que los textos prometen y la app todavía no hace por sí sola

- **Borrar una cuenta y quitarse del ranking no tiene botón.** Hoy se haría a mano en Supabase a pedido del alumno. Si entran muchos pedidos, conviene construirlo.
- **El ranking muestra el nombre de Google y la mejor nota a cualquier usuario**, sin posibilidad de salir desde la app. Los textos lo avisan y ofrecen quitarlo a pedido. Lo ideal es un interruptor en `/cuenta`.
- "Te avisaremos dentro de la aplicación" cuando cambien los términos: no existe un mecanismo de avisos.
- La conservación de pagos "por el tiempo que haga falta para la contabilidad" no fija un plazo; un abogado puede indicar el que corresponde.

## Qué se verificó contra el código (no es de memoria)

- Datos de Google: solo `openid email profile` (`src/lib/session.ts`); se guardan nombre, correo y foto.
- Tablas con datos del alumno: `usuarios`, `historial`, `errores`, `pagos`, `suscripciones` (`supabase/`).
- Cookie: una sola de sesión, `httpOnly`, 30 días (`COOKIE_MAX_AGE`). Sin analítica ni cookies de terceros (no hay ninguna librería de seguimiento en `package.json`).
- A los proveedores de IA no se les envía nombre ni correo: `plan-personalizado` manda enunciados fallados y temas.
- Precios: salen de `src/lib/precios.ts`; el test `legal.test.ts` impide escribirlos a mano en los textos.

## Cobros en cripto (agregado el 4-oct, al sumar Binance Pay y RedotPay)

- Recibir pagos en USDT puede tener tratamiento impositivo y regulatorio propio en Bolivia. **Consultarlo con un contador o abogado antes de depender de ese canal.** Los textos solo dicen que el pago en cripto no se puede deshacer y que los reembolsos se devuelven en la misma moneda.
- Los montos en USDT están fijados a mano (`PRECIOS_USDT` en `src/lib/precios.ts`); el tipo de cambio con el boliviano se mueve y nadie lo recalcula.
