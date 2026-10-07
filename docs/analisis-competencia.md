# Análisis de competencia y decisiones abiertas

Fecha: 7-oct-2026. Hecho a partir de 13 sitios que Ronald marcó como competencia.
**Limitación de método:** las lecturas son de la portada y las páginas de precios (resumidas por un modelo pequeño), no de usar las apps. Los números (precios, usuarios, preguntas) son lo que cada sitio dice de sí mismo; no los verifiqué. No se midió tráfico ni conversión de nadie.

---

## 1. Quién es quién

### Competidores reales (7)

| Sitio | País / examen | Modelo | Precio declarado | Lo más notable |
|---|---|---|---|---|
| **cachimbo.app** | Perú, 6 universidades, 9.500+ preguntas | Suscripción mensual + gratis limitado | Gratis: 3 simulacros/semana. Pago: S/39.99/mes (oferta S/27.99) | Racha, bienestar emocional, tutor IA, banco de errores, "mapa del examen", subir prácticas de academia, código de embajador, figuras propias |
| **sanmarcosgo.com** | Perú, UNMSM | Suscripción mensual o anual | S/99.90/mes o S/349.90/año | 200+ videos por curso, plan de estudio, garantía 7 días, testimonios con foto, cuenta regresiva, RUC visible |
| **profepaulo.com** | Ecuador, 19 simuladores (EPN, ESPE, Policía, militares) | Pago por uso, sin suscripción | Gratis para empezar; $5 por 5 simuladores, $1 suma uno, $10 acceso total 180 días; curso en vivo $200 (máx. 6 alumnos) | Escalera de micropagos, cara de un profesor real, herramienta gratis de captación (Física 360), tarjetas de simulacro con "temario 2026" |
| **unam.examen.mx** | México, UNAM | Pago único, 6 meses de acceso | $149 / $249 / $399 MXN (3 planes) | Diagnóstico gratis de ~30 preguntas **sin cuenta**, puntaje vs. corte real de 119 carreras, reporte con IA, etiqueta "Más elegido" |
| **lobosimulador.com** | México, BUAP | Tienda, pago por simulador | $150 MXN c/u, paquete $699 (tachados $199 / $999) | "Hecho por estudiantes de la BUAP", precio tachado, venta por WhatsApp |
| **prephelp.in** | India, universitario (no admisión) | Suscripción, 4 niveles | ₹249 / ₹399 / ₹699 (6 meses) / ₹1499 | Mapa de riesgo por materia, generador de exámenes por frecuencia de temas, ranking de contribución |
| **admisionuniversitaria.com** | México, UNAM / IPN / EXANI | Todo gratis | Gratis | Flashcards, blog de estrategia, filtros por institución |

### No son competencia (4)
- **sankosho-hyoka.com y daisystudy.com:** blogs japoneses de reseñas de libros. Sin producto. Solo sirven como recordatorio de que el contenido de "cómo estudiar" atrae tráfico.
- **tercihdonemi.net:** simulador de postulación turco (simula en qué carrera quedás según tu puntaje). Útil solo como idea.
- **mustard-ui.com:** la lectura salió contaminada. Por el nombre parece una plantilla de diseño. No evaluado.

### No se pudieron leer
- **examendeadmision.com.mx:** error 522 del servidor en dos intentos (el sitio estaba caído).
- **educsit.com:** el dominio no existe (probablemente escrito mal en la captura).

### Hallazgo de contexto
No encontré **ninguna** plataforma de preparación para la UMSS ni para Bolivia. Los competidores son de Perú, México, Ecuador e India. Es un hueco de mercado, pero también quiere decir que **nadie probó que los alumnos bolivianos paguen por esto**. Ese riesgo hay que decirlo claro.

---

## 2. Dónde está Axiom hoy (verificado en el código)

**Modelo actual:**
- Gratis: 2 simulacros de exámenes pasados + 2 pronosticados por semana. Unidad 01 de cada bloque. Se puede **leer** toda la biblioteca de exámenes (sin respuestas ni resolución).
- Pago: Pro Bs. 50 / Premium Bs. 100 **por mes y por facultad**. Cambiar de facultad cuesta Bs. 50. Premium da simulacro con IA, práctica de errores, programa personalizado, todas las lecciones y láminas, resoluciones de la biblioteca.
- Cobro: manual (QR BNB, Binance Pay, RedotPay), el alumno declara y el admin aprueba.

**Ya existe y no hay que construir:** banco de errores, `/debilidades`, ranking top 10, `/progreso` con evolución y promedio por área, plan personalizado con IA tras un simulacro, PWA instalable, 104 figuras dibujadas y verificadas, lecciones animadas y láminas (**ninguno de los competidores tiene esto**), `registro-verificacion.json` que dice qué exámenes se contrastaron con el facsímil.

**No existe:** racha de estudio, calendario de actividad, fecha del examen del alumno, cuenta regresiva, meta de puntaje, diagnóstico sin cuenta, testimonios, garantía, referidos, flashcards, tutor IA conversacional, informe descargable de resultados, pase por tiempo, pago único.

**Bloqueantes de negocio ya conocidos (§8 de la bitácora):** el circuito de cobro **nunca se probó de punta a punta con plata real**; faltan el QR de Bs. 50 del cambio de facultad, el bot de Telegram para avisos, y que un abogado lea los textos legales.

---

## 3. Decisiones, con todas las opciones

Cada decisión indica: opciones, qué ganás, qué arriesgás, esfuerzo, de qué depende. Al final de cada una va mi recomendación, marcada como opinión.

### D1. Modelo de precio y acceso

El de Axiom es el más caro por estructura: mensual **y** por facultad. Referencias: Profe Paulo cobra $10 (unos Bs. 70) por 180 días de todo; UNAM México, 6 meses por $149 a $399 MXN; Cachimbo S/27.99 a S/39.99 al mes.

| Opción | Cómo sería | A favor | En contra |
|---|---|---|---|
| **A. Quedarse como está** | Pro 50 / Premium 100 mensual por facultad | Cero trabajo. Ya está programado y el admin ya lo sabe aprobar | El alumno que estudia 4 meses paga Bs. 200 a 400. El precio mensual repite la fricción del cobro manual cada mes: **cada renovación es un pago que alguien aprueba a mano** |
| **B. Pase hasta el examen** | Pago único, acceso hasta la fecha del examen (o 4-6 meses) | Alinea con cómo estudia el alumno: tiene una fecha. Menos cobros manuales para Ronald. Más fácil de explicar. Es lo que hacen UNAM y Profe Paulo | Se pierde el ingreso recurrente de quien se quede más tiempo. Hay que decidir qué pasa con el que no ingresa y quiere seguir. Cambia `agregarOExtenderSuscripcion` y el esquema de suscripciones |
| **C. Escalera de micropagos** | Estilo Profe Paulo: $5 por un paquete, se suma hasta abrir todo | Barrera de entrada mínima, el alumno prueba pagando poco. Buen fit con QR de montos chicos | Muchos pagos chicos = muchas aprobaciones manuales. Complejidad de producto. Con comisiones de Binance/RedotPay un pago chico puede salir poco rentable |
| **D. Híbrido** | Mensual para el que quiere probar + pase hasta el examen con descuento | Cubre los dos perfiles | Más planes = más confusión. Más superficie de error en `precios.ts` y en el trinquete que ya lo cuida |

**Consecuencia clave que nadie mencionó:** como el cobro es manual, **el costo operativo de Ronald crece con el número de pagos, no con el número de alumnos**. Eso favorece B (menos pagos por alumno) sobre A, C y D.
**Dependencia:** B necesita que el alumno diga su fecha de examen (ver D4).
**Mi opinión:** B o D. Pero **es decisión de Ronald** (precios). Si querés, antes de decidir se puede preguntar a 10 alumnos reales cuánto estudian y cuánto pagarían.

### D2. Puerta de entrada gratis

Hoy hay que registrarse y elegir facultad antes de ver nada. UNAM regala ~30 preguntas **sin cuenta ni tarjeta**, con un reporte que muestra tu puntaje y qué reforzar, y bloquea lo demás.

| Opción | A favor | En contra |
|---|---|---|
| **A. Dejarlo así** | Cero trabajo; cada visitante que se registra es un lead con correo | Todo el que no se registra se pierde. En celular, registrarse con correo y contraseña espanta |
| **B. Diagnóstico sin cuenta** (10 a 30 preguntas, resultado al final, pide registro para guardar o ver más) | Es el mayor gancho de conversión observado en todos los sitios. Muestra el valor antes de pedir nada | Hay que construir un flujo anónimo (sesión temporal, no persistir hasta registrarse). Riesgo de abuso (scraping del banco) |
| **C. Diagnóstico con registro mínimo** (solo nombre y facultad, sin correo) | Más fácil que B; sigue bajando la barrera | Sin correo no hay forma de volver a contactar |

**Riesgo a vigilar en B:** las preguntas del banco son tu activo más valioso. Un diagnóstico anónimo debería usar un **subconjunto fijo y chico** de preguntas, no el banco entero.
**Mi opinión:** B con subconjunto fijo. Es el cambio de más impacto por esfuerzo.

### D3. Garantía de devolución

San Marcos GO ofrece 7 días. Ningún otro de los 7 la menciona.

| Opción | A favor | En contra |
|---|---|---|
| **A. Sin garantía** | Cero riesgo económico | En un mercado donde nadie conoce la marca, pagar por QR a una persona desconocida da desconfianza |
| **B. Garantía de 7 días** | Reduce la objeción principal de quien nunca pagó por algo así | Devolver plata por QR es manual. Puede ser abusada (usar 7 días y pedir devolución). **Toca los Términos y Condiciones y el consejo del abogado** |
| **C. "Prueba gratis más larga" en lugar de garantía** | No hay que devolver nada: se amplía el plan gratis | Menos efectivo emocionalmente que "te devolvemos tu plata" |

**Mi opinión:** C primero (no cuesta nada), y B solo si después de lanzar ves que la desconfianza frena los pagos.

### D4. Fecha del examen y cuenta regresiva

Cachimbo y San Marcos GO la ponen en la portada. En Axiom, `Usuario` no guarda fecha de examen.

- **Costo:** bajo. Un campo en el onboarding y una tarjeta en el dashboard.
- **Qué desbloquea:** D1-B (pase hasta el examen), un plan de estudio con días reales, recordatorios.
- **Riesgo:** hay que **tener la fecha real del examen UMSS** de cada facultad y mantenerla al día. Si la fecha es incorrecta, el contador miente. Se puede dejar que el alumno la escriba, pero entonces cada uno pone la suya.
- **Pregunta abierta para Ronald:** ¿existe un calendario oficial de admisión UMSS que se pueda citar?
- **Mi opinión:** hacerlo. Es barato y habilita otras cosas.

### D5. Retención: racha, calendario, metas

Cachimbo tiene racha, calendarios de 30 y 90 días, check-in emocional, "Tu porqué" y metas por materia.

| Opción | Esfuerzo | Efecto esperado |
|---|---|---|
| **A. Solo racha** (días seguidos con actividad) | Bajo | Es el mecanismo de hábito más probado |
| **B. Racha + calendario de actividad** | Medio | Se ve la constancia; sirve de prueba social interna |
| **C. Todo el paquete de Cachimbo** (emocional, porqué, metas) | Alto | Posiblemente exagerado para el estilo sobrio de Axiom |
| **D. Nada** | Cero | Axiom depende solo de que el alumno tenga motivación propia |

**Riesgos:** una racha mal diseñada **castiga** al alumno que falta un día (y puede desmotivarlo). Con un ranking top 10 público ya hay un elemento competitivo; sumar rachas puede dejar a los nuevos sintiendo que no alcanzan.
**Qué no sabemos:** si los alumnos bolivianos responden a rachas. Es una hipótesis tomada de Perú.
**Mi opinión:** A, y medir si cambia cuántos días por semana entra el alumno antes de seguir con B.

### D6. Mapa del examen (qué temas caen de verdad)

Cachimbo y PrepHelp lo usan como argumento de venta. Axiom ya tiene los datos: 139 exámenes de Ingeniería con `area` y `tema`. Existe el agente `analista-temas` que mide frecuencia y la cruza con las lecciones.

- **Uso doble:** (1) producto: ordenar la ruta de estudio por lo que más cae; (2) marketing: "el 23% del examen es álgebra".
- **Riesgo:** si las etiquetas `area/tema` del banco no son consistentes, el mapa miente. El propio agente valida eso.
- **Costo:** bajo para el análisis; medio para mostrarlo en la app.
- **Mi opinión:** hacerlo, empezando por el análisis (barato) y decidiendo después si se muestra.

### D7. Puntajes de corte y meta por carrera

UNAM compara tu puntaje con el corte real de 119 carreras. Es potente porque responde "¿me alcanza?".
- **Obstáculo:** necesitás los puntajes de corte de la UMSS. No sé si se publican por carrera. Si no existen, esta función no se puede hacer honestamente.
- **Alternativa:** que el alumno ponga **su propia meta** de puntaje y la app muestre cuánto le falta.
- **Mi opinión:** primero averiguar si hay datos. Sin datos reales, solo la versión de meta propia.

### D8. Tutor con IA conversacional

Cachimbo tiene CachimboIA (3 consultas gratis); PrepHelp responde con base en el temario subido.

| Opción | A favor | En contra |
|---|---|---|
| **A. No** | Sin costo variable, sin riesgo de respuestas erradas | Se queda atrás en el argumento "IA" de la competencia |
| **B. Tutor limitado a explicar una pregunta del banco** | El contexto es chico y controlado; ya hay explicaciones verificadas para fundamentar | Costo por consulta. Hay que acotar para que no alucine |
| **C. Tutor libre** | Mayor impacto percibido | Riesgo real de errores matemáticos (ya tuviste ~50 errores de contenido en lecciones). **Un tutor que se equivoca daña la marca de una plataforma que se vende por exactitud** |

**Consecuencia importante:** tu diferenciador es la exactitud (figuras verificadas, respuestas auditadas). Un tutor libre pone eso en riesgo.
**Mi opinión:** dejarlo para después; si se hace, B.

### D9. Informe descargable (PDF) tras el simulacro

UNAM lo ofrece. En Axiom ya existe `axiomPDF` y el plan personalizado.
- **Costo:** bajo a medio. **Valor:** moderado (el alumno comparte con un profesor o los padres).
- **Mi opinión:** buena mejora chica, sin urgencia.

### D10. Prueba social: testimonios y autoridad

San Marcos GO muestra ingresantes con foto, carrera y puntaje. Profe Paulo pone la cara de un profesor con "15+ años". Cachimbo usa tres testimonios con nombre.

- **Axiom hoy no tiene ninguno.** Y es el mayor hueco de confianza si el cobro es por QR a una persona.
- **Riesgos legales:** testimonios falsos o inventados son engaño al consumidor, **no** los pongas de relleno. Necesitás autorización escrita de cada alumno (foto, nombre, carrera). Profe Paulo mismo dice "los testimonios se publicarán únicamente cuando estén verificados y autorizados", y eso es buena práctica.
- **Opciones:** (A) esperar a tener los primeros alumnos reales; (B) pedirle a los primeros 10 beta testers un testimonio a cambio de acceso gratis; (C) mostrar **números reales** en vez de testimonios (ej: "X simulacros completados") cuando haya cifras.
- **Sobre la autoridad:** ¿quién es Ronald en esto? Hoy la landing no dice quién está detrás. Profe Paulo vende **a la persona**. Es una decisión personal tuya: poner tu cara o quedarte como marca.
- **Mi opinión:** B ahora, C después. La decisión de la cara es tuya.

### D11. Referidos / código de embajador

Cachimbo: ambos ganan. Con cobro manual:
- **A favor:** adquisición de bajo costo en un mercado donde la recomendación boca a boca pesa mucho.
- **En contra:** necesita rastrear códigos, acreditar beneficios y evitar fraude (cuentas falsas para auto-referirse). Todo eso suma trabajo manual al admin.
- **Mi opinión:** no ahora. Primero que el cobro funcione sin intervención.

### D12. Servicio humano de alto precio

Profe Paulo vende un curso en vivo de $200 con máximo 6 alumnos. Es un ingreso grande por persona.
- **A favor:** margen alto, también es prueba de autoridad.
- **En contra:** es tiempo de Ronald, no escala, y desvía del producto digital.
- **Opción liviana:** una sesión de "revisión de tu simulacro" con un profesor, pagada aparte.
- **Mi opinión:** no es prioridad, pero tenerlo como idea para Premium plus.

### D13. Contenido gratis de captación

Profe Paulo regala "Física 360". admisionuniversitaria.com tiene blog y flashcards. Los blogs japoneses viven de contenido de "cómo estudiar".
- **Opciones:** (A) un recurso gratis fuerte (ej: "10 errores típicos del examen UMSS" o las láminas de muestra); (B) blog con SEO; (C) nada.
- **Axiom tiene ventaja:** las lecciones animadas son material único. Regalar **más** que la Unidad 01 puede ser un buen anzuelo, a costa de menos incentivo para pagar.
- **Riesgo:** el SEO es lento (meses). No ayuda para el próximo examen.
- **Mi opinión:** A. Elegir qué regalar es una decisión de producto de Ronald.

### D14. Expandirse a otras universidades

Cachimbo cubre 6, Profe Paulo 19. Ellos crecen horizontal porque su banco no es el cuello de botella.
- **A favor de expandirse:** mercado mayor (San Simón es una sola universidad).
- **En contra:** tu valor es **exactitud en UMSS**. Expandir diluye eso y multiplica el costo de verificación. Hoy faltan Medicina, Derecho y Económicas completas dentro de la propia UMSS.
- **Mi opinión:** no. Completar y verificar UMSS primero. Expandirse cuando haya ingresos que lo paguen.

### D15. Otras ideas observadas
- **Flashcards** (admisionuniversitaria): barato de hacer a partir de láminas, valor medio.
- **Subir prácticas de academia y convertirlas en examen** (Cachimbo): muy costoso. Pero **ya tenés fotos de exámenes resueltos de institutos** en `examenes pasados/` y agentes (`catalogador-fotos`, `analista-resolucion`) para procesarlas. Eso es una versión propia: **convertir los exámenes de institutos en contenido del banco**.
- **Test vocacional / sección para padres** (Cachimbo): el padre suele ser quien paga en Bolivia. Una página para padres que explique qué es Axiom y cuánto cuesta puede ayudar a convertir. Costo bajo.
- **Precio tachado y etiqueta "Más elegido"** (Lobo, UNAM): trucos de presentación, sin costo. Cuidado: **un precio tachado "falso" es publicidad engañosa**. Solo si de verdad hubo un precio mayor.
- **Canal de soporte visible** (WhatsApp, Telegram, Discord): ya tenés WhatsApp en `legal.ts`. Mostrarlo en el pie y en `/pagar`.

---

## 4. Lo que Axiom NO debería copiar

| De quién | Qué | Por qué no |
|---|---|---|
| Cachimbo | Precio en soles y mensual | Otro mercado y poder adquisitivo |
| San Marcos GO | 200 videos por curso | Producir video no es tu ventaja; las animaciones propias sí |
| Lobo, UNAM | Precio tachado sin precio anterior real | Riesgo legal y de reputación |
| Todos | Testimonios genéricos | Un testimonio falso destruye la confianza que Axiom necesita |
| admisionuniversitaria | Todo gratis | No hay modelo de ingreso |

---

## 5. Riesgos que atraviesan todas las decisiones

1. **El cobro no está probado de punta a punta.** Invertir en atraer gente (diagnóstico gratis, publicidad) **antes** de poder cobrar sin fricción desperdicia el esfuerzo. Es el primer bloqueante, no una mejora más.
2. **No hay evidencia local de disposición a pagar.** Todos los números de los competidores vienen de otros países.
3. **Los reclamos de marketing tienen que ser verdaderos.** Las ventajas de Axiom (figuras verificadas, respuestas contrastadas con el facsímil) están respaldadas en `registro-verificacion.json`. Decir "exámenes reales verificados" está bien **solo** para los verificados; para los demás hay que decir otra cosa.
4. **Carga manual de Ronald.** Cada función que implique aprobar, devolver, acreditar o contestar suma trabajo humano. Hay que sumarlo al costo de cada opción.
5. **Legal.** Garantía, testimonios, datos de menores (los alumnos de colegio pueden ser menores de edad). Todo pasa por el abogado que todavía no leyó los textos.

---

## 6. Tres rutas posibles

### Ruta 1: Mínima (poco trabajo, bajo riesgo)
Fecha de examen + cuenta regresiva (D4), racha simple (D5-A), análisis de temas (D6, solo análisis), prueba gratis más larga (D3-C).
- **Resultado:** el alumno que ya llega se queda más; no trae gente nueva.
- **No cambia:** conversión ni precio.

### Ruta 2: Equilibrada (la que yo elegiría)
Todo lo de la ruta 1, más diagnóstico sin cuenta (D2-B), pase hasta el examen o híbrido (D1-B/D), primeros testimonios reales (D10-B), mapa del examen visible (D6), página para padres (D15).
- **Resultado:** baja la barrera de entrada, mejora la conversión y reduce cobros manuales.
- **Depende de:** que el cobro esté probado antes, y de decidir precios.
- **Riesgo:** más superficie de cambio en pagos; hay que cuidar el trinquete de `precios.ts`.

### Ruta 3: Ambiciosa
La ruta 2 más tutor IA acotado (D8-B), informe PDF (D9), referidos (D11), curso en vivo (D12).
- **Resultado:** paridad de funciones con Cachimbo.
- **Riesgo:** mucha construcción antes de saber si alguien paga. Tentación de gastar tiempo en funciones en vez de en exámenes, que es el contenido que vendés.

---

## 7. Qué necesito que decida o aporte Ronald

**Decisiones suyas (no las puedo tomar yo):**
1. Modelo de precio (D1).
2. Si se ofrece garantía (D3).
3. Si poner su cara y nombre como autoridad (D10).
4. Qué regalar de captación (D13).

**Datos que solo él tiene:**
5. ¿Hay calendario oficial de admisión UMSS citable? (D4)
6. ¿Se publican puntajes de corte UMSS por carrera? (D7)
7. ¿Hay alumnos reales dispuestos a probar y dar testimonio? (D10)

**Antes de todo lo anterior:** probar un pago real de punta a punta y activar el aviso por Telegram.

---

## 8. Fuentes consultadas
cachimbo.app, cachimbo.app/precios, sanmarcosgo.com, profepaulo.com (leído en navegador), lobosimulador.com, unam.examen.mx, admisionuniversitaria.com, tercihdonemi.net, prephelp.in, sankosho-hyoka.com, daisystudy.com, mustard-ui.com. Fecha de lectura: 7-oct-2026. Búsquedas web de "plataforma UMSS" y "Profe Paulo precios": sin resultados útiles.
