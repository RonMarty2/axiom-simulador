# Estado del SaaS por áreas · 4-nov-2026

Informe generado por `agy` (Argon Medium, solo lectura) y **comprobado por Claude contra el código** en los puntos de seguridad. Dónde el informe se quedó viejo se aclara aquí abajo; el resto va tal como salió.

## Correcciones de Claude al informe
- **Auditoría pedagógica:** el informe cuenta 15 lecciones auditadas. Desde el 4-nov las 19 lecciones gratis (Unidad 01) están auditadas; el total exacto no se recalculó (la bitácora habla de ~25 antes de esta tanda).
- **Seguridad, hallazgo 1 (respuestas en el simulacro):** CONFIRMADO leyendo `banco-parser.ts:78` y `simulador-builder.ts`; el simulacro viaja con `respuesta_correcta` y `explicacion`. Solo `resultados/page.tsx:876` las usa.
- **Hallazgos 2 y 4 (sin sesión):** CONFIRMADOS en `simulador/[id]/route.ts:10` y `simulador/route.ts:64`; el flujo anónimo es a propósito (comentario en el código), pero deja leer y finalizar simulacros ajenos por id.
- **Hallazgo 3 (finalizar acepta el `simulador` del cliente):** CONFIRMADO en `finalizar/route.ts:25-28`; permite calificar un examen con respuestas armadas por el cliente.
- **Hallazgo 5 (`/api/usuarios` público):** NO es bloqueante: lo usa el ranking, no expone emails.
- **Hallazgos 6, 8, 9:** no verificados por Claude; baja prioridad.

---


---

## 1. Cobro y pagos

- **ESTADO:** CASI
- **Qué funciona:**
  - El circuito técnico completo de pago manual: el alumno elige método en [`/pagar`](src/app/pagar/page.tsx), sube comprobante opcional en base64 y registra la orden vía [`POST /api/pagos`](src/app/api/pagos/route.ts#L28). El admin revisa y aprueba en [`/admin/pagos`](src/app/admin/pagos/page.tsx) llamando a [`PATCH /api/pagos/[id]`](src/app/api/pagos/[id]/route.ts#L5), el cual invoca [`agregarOExtenderSuscripcion`](src/lib/data-store.ts) en Supabase por 1 mes.
  - El plan activo del alumno se deriva dinámicamente de sus suscripciones vigentes para su `facultad_objetivo` en [`src/lib/session.ts`](src/lib/session.ts#L13-L20).
  - Precios centralizados como fuente única en [`src/lib/precios.ts`](src/lib/precios.ts) (`PRECIOS_BOB` y `PRECIOS_USDT`).
  - Métodos y datos de destino cargados: BNB (QR), Binance Pay (`RonMarty`) y RedotPay (`1939601201`) en [`src/lib/pagos-config.ts`](src/lib/pagos-config.ts#L53-L80).
- **Qué falta o está roto:**
  - **Falta QR de BNB para Cambio de Facultad (Bs. 50):** El QR bancario actual en [`src/lib/pagos-qr.json:4`](src/lib/pagos-qr.json#L4) (`/pagos/qr_bancario-2026-10-05-25182.png`) tiene monto grabado fijo de Bs. 100. Si un alumno compra un cambio de carrera (Bs. 50 según [`src/lib/precios.ts:16`](src/lib/precios.ts#L16)), no tiene QR en bolivianos adecuado.
  - **Avisos de pago desactivados en producción:** Las variables `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` no están configuradas en Vercel ([`docs/avisos-telegram.md:27-35`](docs/avisos-telegram.md#L27-L35)). Sin esto, los pagos entran en silencio y Ronald no se entera a menos que abra `/admin/pagos` manualmente.
  - **Pago real nunca probado:** Sigue pendiente realizar una transacción real de punta a punta con dinero real ([`BITACORA.md`](BITACORA.md) §8).
- **Quién lo resuelve:** Ronald (generar QR BNB de Bs. 50 o sin monto, configurar el bot de Telegram en Vercel y ejecutar la prueba de pago real).
- **Riesgo si se lanza así:** **Alto** (los alumnos que quieran pagar Bs. 50 por QR bancario no podrán hacerlo o pagarán de más, y los pagos declarados quedarán sin atender por falta de aviso inmediato).

---

## 2. Seguridad y acceso

- **ESTADO:** NO LISTO
- **Qué funciona:**
  - Guards de servidor en layouts de [`/aprende`](src/app/aprende/layout.tsx) y [`/laminas`](src/app/laminas/layout.tsx) mediante [`src/lib/acceso-contenido.ts`](src/lib/acceso-contenido.ts#L43-L66) bloqueando acceso directo por URL a no suscriptores.
  - Biblioteca de exámenes protegida en [`GET /api/axiom/examenes/[id]`](src/app/api/axiom/examenes/[id]/route.ts#L33-L41): limpia respuestas correctas y explicaciones si el usuario no tiene plan pagado para la facultad del examen.
  - Autenticación Google OAuth con verificación de token JWT firmado con `jose` y protección anti-CSRF con cookie `state` httpOnly ([`src/app/api/auth/google/route.ts`](src/app/api/auth/google/route.ts#L23) y [`src/app/api/auth/callback/google/route.ts`](src/app/api/auth/callback/google/route.ts#L28)).
  - Endpoints admin protegidos con [`isAdmin()`](src/lib/session.ts#L226) (basado en `ADMIN_EMAILS`) y [`requireAdmin()`](src/lib/api-auth.ts#L37).
  - Endpoint [`/api/auth/dev-login`](src/app/api/auth/dev-login/route.ts#L22) cancelado en producción (responde 404 estricto si `NODE_ENV === "production"`).
  - Login maestro con [`timingSafeEqual`](src/app/api/auth/master-login/route.ts#L10) y rate limit en memoria.
- **Qué falta o está roto (auditoría ruta por ruta de las dudosas):**
  1. **Filtración de respuestas y soluciones durante el examen:**  
     [`src/app/api/axiom/simulador/route.ts:95`](src/app/api/axiom/simulador/route.ts#L95) y [`src/app/api/axiom/simulador/[id]/route.ts:28,81`](src/app/api/axiom/simulador/[id]/route.ts#L28). Al crear, consultar o responder un simulacro activo, el backend devuelve el objeto `simulador` completo con las preguntas generadas por [`construirSimulador`](src/lib/axiom/simulador-builder.ts). Cada pregunta contiene su `respuesta_correcta` y `explicacion` en texto plano. Cualquier alumno puede ver la clave correcta en tiempo real abriendo la pestaña Network del navegador.
  2. **Bypass de acceso a simulacros ajenos:**  
     [`src/app/api/axiom/simulador/[id]/route.ts:10`](src/app/api/axiom/simulador/[id]/route.ts#L10). La función `bloqueoCruzado` indica `if (!user) return null;`. Si una petición GET o PATCH no envía cookie de sesión, el guard retorna `null` (permitido). Un usuario no autenticado puede consultar y modificar las respuestas del simulacro de cualquier alumno si conoce o adivina el ID.
  3. **Bypass en finalización de examen e inyección de estado:**  
     [`src/app/api/axiom/simulador/[id]/finalizar/route.ts:36-39`](src/app/api/axiom/simulador/[id]/finalizar/route.ts#L36-L39). La condición `if (user && user.id !== simulador.usuario_id)` se salta si `user` es `null`, permitiendo a un anónimo finalizar exámenes ajenos. Además, en las líneas 25-28 se acepta un objeto `simulador` arbitrario enviado desde el body del cliente si la lambda serverless no lo tenía en memoria.
  4. **Bypass freemium por usuarios anónimos:**  
     [`src/app/api/axiom/simulador/route.ts:36,64`](src/app/api/axiom/simulador/route.ts#L36). Si `user` es `null`, la comprobación de facultad objetivo no se ejecuta (un anónimo puede simular exámenes de cualquier carrera sin registrarse) y el control de límites semanales (`if (user)` en línea 64) se salta completamente, otorgando simulacros ilimitados a quien use modo incógnito sin loguearse.
  5. **Exposición pública de la base de usuarios:**  
     [`src/app/api/usuarios/route.ts:6-20`](src/app/api/usuarios/route.ts#L6-L20). Endpoint público sin autenticación ni rate limit que retorna a todos los usuarios de la plataforma con su ID, nombre, puntajes y facultad.
  6. **Ruta admin con fallo fatal en Vercel:**  
     [`src/app/api/admin/banco/route.ts:96-97`](src/app/api/admin/banco/route.ts#L96-L97). `POST` intenta escribir archivos Markdown con `fs.writeFile` en `data/examenes/`. En el entorno serverless de Vercel el sistema de archivos es de solo lectura, lo que provocará un error de ejecución (`EROFS`).
  7. **Contraseña maestra comprometida:**  
     [`src/app/api/auth/master-login/route.ts:35`](src/app/api/auth/master-login/route.ts#L35). La clave fue compartida en un chat el 12-sep-2026 ([`BITACORA.md`](BITACORA.md) §8) y sigue pendiente de rotación en Vercel.
  8. **Rate limiting ausente en rutas críticas:**  
     [`src/lib/rate-limit.ts`](src/lib/rate-limit.ts) solo se utiliza en `master-login`. No existe limitación en [`POST /api/pagos`](src/app/api/pagos/route.ts), [`DELETE /api/cuenta`](src/app/api/cuenta/route.ts) ni [`POST /api/axiom/simulador`](src/app/api/axiom/simulador/route.ts).
  9. **Contenido de lecciones expuesto en bundles JavaScript:**  
     Tal como reconoce [`src/lib/acceso-contenido.ts:15-19`](src/lib/acceso-contenido.ts#L15-L19), las 103 lecciones y 64 láminas son componentes cliente estáticos y viajan empaquetadas en los archivos `.js` descargados por el navegador, siendo accesibles para usuarios con conocimientos técnicos.
- **Quién lo resuelve:** Agente (reparar filtración de respuestas en simulador activo, corregir verificaciones de sesión en `simulador/[id]`, bloquear abuso de anónimos) y Ronald (rotar `MASTER_LOGIN_PASSWORD` en Vercel).
- **Riesgo si se lanza así:** **Alto** (hacer trampa en simulacros es trivial inspeccionando el tráfico de red, los anónimos pueden burlar los límites freemium, y se pueden manipular estados de exámenes ajenos).

---

## 3. Cuentas y planes

- **ESTADO:** CASI
- **Qué funciona:**
  - Esquema de planes desacoplado por facultad mediante la tabla `suscripciones` de Supabase.
  - Plan gratis: Unidad 01 gratis en cada bloque de `/aprende` (Decisión D2), acceso de lectura al catálogo de exámenes, y límite de 2 simulacros semanales.
  - Cambio de facultad controlado en [`src/app/api/perfil/facultad/route.ts:39-44`](src/app/api/perfil/facultad/route.ts#L39-L44): bloquea con código `REQUIERE_PAGO` (403) si no existe suscripción activa previa a la carrera destino.
  - Cuentas de prueba exentas de pago mediante `FREE_FACULTY_CHANGE_EMAILS`, `TESTER_EMAILS` y `DUENO_EMAIL` (`rnd261190@gmail.com`) en [`src/lib/session.ts:116-147`](src/lib/session.ts#L116-L147).
  - Borrado de cuenta operativo en [`DELETE /api/cuenta`](src/app/api/cuenta/route.ts#L8) requiriendo confirmación con la palabra `"BORRAR"`.
- **Qué falta o está roto:**
  - **Falta opción de salir del ranking:** Aunque los Términos y la Política de Privacidad prometen que el alumno puede excluirse del ranking oficial ([`docs/legal-revision.md:24-25`](docs/legal-revision.md#L24-L25)), en [`/cuenta`](src/app/cuenta/page.tsx) no existe ningún botón o switch para ello, ni existe un campo booleano en la tabla `usuarios` para ocultar el perfil.
- **Quién lo resuelve:** Agente (agregar columna de visibilidad en ranking y switch en pantalla de cuenta).
- **Riesgo si se lanza así:** **Bajo** (compromiso legal pendiente que solo genera fricción si un alumno solicita expresamente ser retirado del podio).

---

## 4. Banco de exámenes

- **ESTADO:** CASI para Ingeniería, NO LISTO para el resto de facultades
- **Qué funciona:**
  - Carga modular en tiempo de ejecución desde archivos Markdown vía [`src/lib/axiom/banco-loader.ts`](src/lib/axiom/banco-loader.ts) sin números quemados en código (Decisión D9).
  - 139 exámenes digitalizados de la Facultad de Ciencias y Tecnología (Ingeniería) entre 2005 y 2025.
  - 104 figuras vectoriales exactas construidas geométricamente y testeadas en CI ([`src/lib/figuras/figuras.test.ts`](src/lib/figuras/figuras.test.ts)).
  - Registro riguroso de contraste contra PDF en [`data/registro-verificacion.json`](data/registro-verificacion.json).
- **Qué falta o está roto:**
  - **Ingeniería:** De los 139 exámenes, solo **19 están registrados** en [`data/registro-verificacion.json`](data/registro-verificacion.json):
    - **14 verificados completos:** `2007-1op-1-2007`, `2008-1op-1-2008`, `2006-2op-1-2006`, `2006-parcial1-1-2006`, `2018-2op-1-2018`, `2005-2op-1-2005`, `2005-2op-2-2005`, `2006-parcial1-2-2006`, `2010-1op-1-2010`, `2014-1op-1-2014`, `2017-1op-1-2017`, `2011-1op-1-2011`, `2016-1op-1-2016`, `2023-1op-1-2023`.
    - **5 con verificación incompleta (`completo: false`):** `2005-1op-1-2005` (figuras P16 y P18 sin dibujar), `2006-1op-1-2006` (figuras P11 y P12 sin dibujar), `2005-1op-2-2005` (P12 retirada), `2012-1op-1-2012` (duda en P11), `2024-Uop-2-2024` (duda en arco de G6).
    - **120 exámenes de Ingeniería están sin contrastar contra sus facsímiles oficiales.**
  - **Ciencias Económicas:** Solo cuenta con **10 exámenes**, incompletos (solo cubren Matemáticas y parte de Lenguaje; falta Historia y falta reescribir 2024 a nivel real, [`BITACORA.md:430`](BITACORA.md#L430)). **Cero (0) verificados** en `registro-verificacion.json`.
  - **Medicina y Derecho:** **Cero (0) exámenes cargados.** Las carpetas no existen en el disco o están vacías ([`src/app/api/facultades/route.ts:9-13`](src/app/api/facultades/route.ts#L9-L13)).
- **Quién lo resuelve:** Ronald (proveer PDFs facsímiles pendientes) y agentes `auditor-facsimil` / `transcriptor-examenes`.
- **Riesgo si se lanza así:** **Alto** si se publicita la plataforma para Medicina o Derecho (el simulador queda vacío), **Medio** para Ingeniería (el catálogo es amplio y funcional, aunque con exámenes antiguos no contrastados).

---

## 5. Contenido de aprendizaje

- **ESTADO:** NO LISTO
- **Qué funciona:**
  - Sistema de láminas en formato tarjetas interactivas (v5) adaptado para dispositivos móviles ([`BITACORA.md:195-209`](BITACORA.md#L195-L209)).
  - Componentes didácticos y de visualización en [`_components/pedagogia.tsx`](src/app/aprende/_components/pedagogia.tsx) y [`lienzo.tsx`](src/app/aprende/_components/lienzo.tsx).
  - 14 correcciones críticas de contenido matemático y visual ya aplicadas en producción ([`docs/auditoria-pedagogica.md:33-50`](docs/auditoria-pedagogica.md#L33-L50)).
- **Qué falta o está roto:**
  - **Lecciones (`/aprende`):** De 103 lecciones, solo **15 fueron auditadas** ([`docs/auditoria-pedagogica.md:6-29`](docs/auditoria-pedagogica.md#L6-L29)), detectando 183 lagunas explicativas y 41 errores de contenido (de los cuales 27 siguen pendientes de decisión editorial). **88 lecciones permanecen sin auditar.**
  - **Biología de Ingeniería:** Las 7 lecciones (BIO-01 a BIO-07) fueron auditadas pero quedaron **sin commitear ni publicar** ([`BITACORA.md:443`](BITACORA.md#L443)).
  - **Láminas de repaso (`/laminas`):** Hay 64 láminas en producción, pero **solo el piloto (Teorema del Resto) fue aprobado por Ronald**. Las otras 63 láminas están sin auditar bajo las reglas visuales 10 a 12 ([`BITACORA.md:212-226`](BITACORA.md#L212-L226)).
  - **Animaciones de resolución (`/prueba-animacion`):** Los 21 tipos de animaciones tienen 69 pasos marcados para revisión y **ninguna está marcada como auditada y cerrada por Ronald** ([`docs/estado-trabajo.md:31`](docs/estado-trabajo.md#L31)). Además, están **desconectadas de la app real** por decisión de Ronald hasta terminarlas todas ([`docs/estado-trabajo.md:41`](docs/estado-trabajo.md#L41)).
- **Quién lo resuelve:** Agentes `auditor-pedagogico` y `auditor-de-pasos` para el relevamiento; Ronald para el visto bueno de las animaciones y decisiones editoriales.
- **Riesgo si se lanza así:** **Alto** (los alumnos de pago encontrarán lecciones con errores de cálculo y láminas que no cumplen el estándar visual prometido).

---

## 6. Legal y privacidad

- **ESTADO:** CASI
- **Qué funciona:**
  - Términos y condiciones ([`/terminos`](src/app/terminos/page.tsx)) y Política de privacidad ([`/privacidad`](src/app/privacidad/page.tsx)) redactados y publicados con datos de contacto reales de Ronald en [`src/lib/legal.ts`](src/lib/legal.ts).
  - Privacidad de datos: cookie única de sesión `httpOnly`, sin trackers ni analíticas de terceros en `package.json`.
- **Qué falta o está roto:**
  - **Sin revisión jurídica:** Los textos fueron redactados por IA y **no han sido revisados por un abogado boliviano** ([`docs/legal-revision.md:3`](docs/legal-revision.md#L3)).
  - **Incertidumbre regulatoria en cripto:** El cobro en USDT por Binance Pay y RedotPay no cuenta con respaldo contable o impositivo confirmado para Bolivia ([`docs/legal-revision.md:37-40`](docs/legal-revision.md#L37-L40)).
  - **Reproducción de exámenes UMSS:** Falta dictamen legal respecto a la utilización de exámenes oficiales pasados bajo fines de estudio.
- **Quién lo resuelve:** Ronald (consulta con abogado y contador local en Cochabamba).
- **Riesgo si se lanza así:** **Medio** (viable para una etapa beta acotada; riesgoso ante reclamos formales o crecimiento acelerado de cobros en USDT).

---

## 7. Móvil, tablet y PWA/TWA

- **ESTADO:** CASI
- **Qué funciona:**
  - PWA web completamente operativa con manifest `standalone` en [`src/app/manifest.ts`](src/app/manifest.ts), Service Worker network-first en [`public/sw.js`](public/sw.js) y actualización silenciosa OTA en [`src/app/components/PWARegister.tsx`](src/app/components/PWARegister.tsx).
  - Componente [`AvisoNavegadorApp.tsx`](src/app/components/AvisoNavegadorApp.tsx) que advierte a usuarios que ingresan desde WebViews de Instagram, Facebook, Messenger o TikTok para abrir la app en Chrome.
  - Auditoría a 375px ejecutada previamente, resolviendo cortes de fórmulas matemáticas y deformación de avatares ([`BITACORA.md:314`](BITACORA.md#L314)).
- **Qué falta o está roto:**
  - **Tablet no testeada en hardware físico:** El diseño para pantallas medianas (panel lateral con mapa de hoja) fue verificado solo en emuladores de escritorio; no se ha probado en un dispositivo físico real ([`BITACORA.md:407`](BITACORA.md#L407)).
  - **App Android TWA sin publicar:** El proyecto existe en `android/`, pero mantiene placeholders en [`public/.well-known/assetlinks.json`](public/.well-known/assetlinks.json) (`REEMPLAZAR_CON_EL_SHA256_DE_TU_KEYSTORE_DE_FIRMA`) y strings de Android. Falta compilar en Android Studio, firmar el APK/AAB y pagar la cuenta de Google Play Console (USD 25) ([`BITACORA.md:243-248`](BITACORA.md#L243-L248)).
- **Quién lo resuelve:** Ronald (probar en tablet física y compilar/firmar la app Android en su equipo).
- **Riesgo si se lanza así:** **Bajo** si se promociona como aplicación web instalable (PWA); **Alto** si se promete descarga directa en Google Play Store.

---

## 8. Avisos, métricas y operación

- **ESTADO:** CASI
- **Qué funciona:**
  - Integración continua en GitHub Actions ejecutando chequeos de TypeScript (`tsc`), ESLint, tests unitarios y build en cada push.
  - Más de 500 tests automatizados con `node --test` que protegen la integridad de fórmulas, figuras y reglas de estilo.
  - Módulo de retención y refuerzo intermitente implementado en [`src/lib/refuerzo*.ts`](src/lib/refuerzo.ts) y endpoint administrativo de métricas en [`GET /api/admin/retencion`](src/app/api/admin/retencion/route.ts#L6).
  - Cron diario configurado en [`vercel.json:2-6`](vercel.json#L2-L6) apuntando a `/api/facultades` para evitar que el proyecto en Supabase se pause por inactividad.
- **Qué falta o está roto:**
  - **Bot de avisos por Telegram inoperativo:** Sin las credenciales cargadas en Vercel, no hay alertas en tiempo real de pagos ([`docs/avisos-telegram.md`](docs/avisos-telegram.md)).
  - **Pruebas de interfaz e2e no automatizadas en CI:** El script `npm run test:pantallas` existe en `package.json`, pero no está integrado al flujo principal de integración continua.
- **Quién lo resuelve:** Ronald (cargar credenciales de Telegram en Vercel).
- **Riesgo si se lanza así:** **Medio** (operación a ciegas respecto a los pagos entrantes).

---

## (a) Lista de BLOQUEANTES para lanzar (ordenada por prioridad)

1. **Cerrar la filtración de respuestas en los simulacros:**  
   Modificar [`src/app/api/axiom/simulador/route.ts`](src/app/api/axiom/simulador/route.ts) y [`src/app/api/axiom/simulador/[id]/route.ts`](src/app/api/axiom/simulador/[id]/route.ts) para que el backend **omita** `respuesta_correcta` y `explicacion` mientras el simulador esté en estado `activo`, entregándolas únicamente tras la calificación final.
2. **Corregir los accesos no autorizados en la API de simulacros:**  
   Arreglar `bloqueoCruzado` en [`src/app/api/axiom/simulador/[id]/route.ts:10`](src/app/api/axiom/simulador/[id]/route.ts#L10) y [`finalizar/route.ts:36`](src/app/api/axiom/simulador/[id]/finalizar/route.ts#L36) para que peticiones sin sesión no puedan leer ni finalizar exámenes ajenos, y exigir login obligatorio para crear simulacros evitando el bypass freemium.
3. **Cargar QR bancario de Bs. 50:**  
   Añadir en [`src/lib/pagos-qr.json`](src/lib/pagos-qr.json) un QR de BNB sin monto pregrabado o con Bs. 50 para permitir cobros de cambios de carrera y plan pro.
4. **Activar el bot de Telegram en Vercel:**  
   Configurar `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` en el panel de Vercel para recibir las alertas de cobro.
5. **Realizar una prueba de pago real de punta a punta:**  
   Declarar un pago real por QR o USDT, verificar el aviso por Telegram, aprobarlo en `/admin/pagos` y constatar la activación automática de la suscripción en la cuenta.
6. **Definir el alcance de facultades para el lanzamiento:**  
   Desactivar o marcar explícitamente como "Próximamente" Medicina y Derecho en el selector de carreras, ya que no poseen exámenes en el banco y de lo contrario conducen a un simulador vacío.
7. **Rotar `MASTER_LOGIN_PASSWORD`:**  
   Actualizar la variable en Vercel tras haber sido divulgada en chat.

---

## (b) Lo que puede esperar al después del lanzamiento

1. **Publicación del TWA en Google Play Store:** La PWA directa desde Chrome en Android e iOS funciona de forma autónoma con pantalla completa y actualización OTA.
2. **Conectar las 21 animaciones de resolución a la app:** Ronald decidió aplazar su enlace a producción hasta completar y aprobar los 21 tipos.
3. **Auditoría de las 88 lecciones restantes de `/aprende` y 63 láminas:** Se puede arrancar vendiendo el contenido actual, priorizando la corrección de las 27 observaciones ya detectadas en la Unidad 01.
4. **Verificación contra facsímil de los 120 exámenes restantes de Ingeniería:** El banco actual está operativo; los exámenes restantes se pueden contrastar a un ritmo de 1 o 2 por día con `auditor-facsimil`.
5. **Completar los exámenes de Ciencias Económicas (Historia y 2024):** Puede lanzarse inicialmente como "Banco de Matemáticas y Lenguaje".
6. **Botón para salir del ranking en `/cuenta`:** Puede gestionarse manualmente en base de datos si algún usuario lo pide.

---

## (c) Contradicciones detectadas entre la Bitácora y el código

1. **Facultad de Derecho en el banco:**  
   - *Qué dice la bitácora:* En [`BITACORA.md:44`](BITACORA.md#L44) (§1) afirma: *"Facultades cubiertas (banco de exámenes): Ciencias Económicas, Ingeniería, Medicina, Derecho"*.  
   - *Qué hay en el código:* No existe ninguna carpeta ni archivo para Derecho en `data/examenes/umss/derecho/`. La propia bitácora lo admite más adelante en el roadmap de pendientes ([`BITACORA.md:445`](BITACORA.md#L445)), pero la sección de identidad §1 quedó desactualizada.
2. **Borrado de cuenta y ranking:**  
   - *Qué dice la bitácora:* En [`BITACORA.md:363`](BITACORA.md#L363) marca como resuelto el botón de borrar cuenta el 4-oct (`[~] Botón para borrar la cuenta hecho el 4-oct`).  
   - *Qué dice el documento legal:* En [`docs/legal-revision.md:24`](docs/legal-revision.md#L24) afirma: *"Borrar una cuenta y quitarse del ranking no tiene botón. Hoy se haría a mano en Supabase a pedido del alumno"*.  
   - *Qué hay en el código:* El botón de borrado de cuenta **sí existe** en [`src/app/cuenta/page.tsx:61`](src/app/cuenta/page.tsx#L61) y llama a [`/api/cuenta`](src/app/api/cuenta/route.ts); el documento `legal-revision.md` quedó desfasado respecto al borrado, aunque sigue teniendo razón en que falta el switch para salir del ranking.
3. **Guardado en el panel administrativo de banco:**  
   - *Qué dice el código en `src/app/api/admin/banco/route.ts:96-97`:* Presenta un método `POST` para escribir exámenes en caliente en el disco del proyecto.  
   - *Qué dice la arquitectura y la bitácora:* La plataforma corre sobre Vercel Serverless con un sistema de archivos de solo lectura y el flujo real de carga es por git/commits locales. El endpoint de escritura en disco está roto conceptualmente para el entorno de producción.
