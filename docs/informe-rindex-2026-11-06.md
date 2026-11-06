# Informe completo: qué es Rindex por dentro y qué puede copiar Axiom

> Nota (6-nov-2026): se quitaron las cifras fijas del original (exámenes, preguntas, lecciones, precios) por la regla 6 de CLAUDE.md. R1 (no mandar la clave durante el examen) ya se cerró en el commit `ef0d8e0`. R3 (política y términos) y R6 (ranking) ya existen en Axiom (`/privacidad`, `/terminos`, `/ranking`); la racha existe en parte y no vi flashcards. El resto son ideas sin aprobar. Este informe sirve como mirada a la competencia, no como lista de tareas.

**Fecha:** 6 de noviembre de 2026
**Fuentes usadas:** el archivo `Rindex.apk` entregado por Asad (análisis estático: manifiesto, permisos, componentes, recursos y textos internos) y la web pública `rindexapp.com` (consultada el mismo día).
**Alcance y límite honesto:** no se ejecutó la app (no hay emulador disponible) y el archivo recibido es el APK base de una instalación por partes: **no contiene el código compilado de Flutter** (`libapp.so` / `libflutter.so`). Todo lo que sigue es lo verificable desde el manifiesto, los recursos, los textos legales internos y la web oficial. Cuando algo es una inferencia y no un hecho, está marcado como *(inferencia)*.

---

## 1. Ficha técnica verificada

| Dato | Valor |
|---|---|
| Nombre de la app | Rindex |
| Nombre del paquete | `com.rindexsimulator.app` |
| Versión | 0.13.0 (código de versión 10) |
| Tamaño del archivo analizado | 5,4 MB (269 archivos) |
| Huella del archivo (SHA-256) | `35a2b0acdf6acde4086058153e8a0a476bfe5783b4421893fa04880f7688b290` |
| Tecnología | Flutter (Dart) + plugins de Google/Firebase |
| Android mínimo | 7.0 (API 24) |
| Android objetivo | API 36 (Android 16, al día) |
| Servidor propio | `api.rindexapp.com` (vivo; su raíz responde 404 en JSON, es decir, atiende solo rutas concretas y con sesión) |
| Web oficial | `rindexapp.com` (activa, HTTP 200) |
| Correo de soporte | `support@rindexapp.com` |
| Firma | APK firmado esquema v2 + v3, certificado atribuido a Google; coherente con **Google Play App Signing** y distribución por Play |
| Protección antipiratería | Sí: actividad `com.pairip.licensecheck.LicenseActivity` (PairIP, la protección de Google Play) + permiso `com.android.vending.CHECK_LICENSE` |
| Modo depuración | Desactivado (`debuggable` ausente = falso). Es compilación de producción |
| Copia de seguridad de datos | Desactivada (`allowBackup=false`) |
| Idioma de los textos internos | Español; tuteo neutro en sus documentos legales |

**Posicionamiento declarado en su web:** «RINDEX — Eficiencia en movimiento». «Simulador de exámenes de ingreso · Bolivia». Promesa principal: *“Llega al examen de ingreso como si ya lo hubieras dado.”* No es solo UMSS: apunta a **universidades, escuelas e institutos de toda Bolivia** (multinstitución).

---

## 2. La diferencia de fondo: la arquitectura

Es la lección más importante de todo el informe.

| | Rindex | Axiom hoy |
|---|---|---|
| Dónde vive el banco de exámenes | **En el servidor.** La app pide cada examen a `api.rindexapp.com` con sesión iniciada. En el instalador hay **cero** archivos de preguntas | En archivos dentro del repo (`data/examenes/umss/`; la cantidad sale de `listarMetadata()`) que la web carga |
| Qué trae el instalador/paquete | Solo pantallas, animaciones, logos, fuentes y textos legales | La web pública + el banco accesible |
| Para ver un examen hay que | Descargar la app, entrar con Google y pedirlo al servidor | Entrar a la web |
| Riesgo de que se filtre el banco entero | Bajo: nadie puede extraerlo del instalador | Alto si no se protege: el contenido está en archivos |
| Riesgo de trampa durante el examen | Depende de su API *(no auditable sin cuenta)*, pero la arquitectura permite que el servidor nunca entregue la respuesta correcta antes de tiempo | **Conocido y abierto:** la API del simulador devuelve `respuesta_correcta` y `explicacion` durante el examen activo (ver `docs/estado-saas-2026-11-04.md` del propio repo) |

**Conclusión práctica:** Rindex separó «pantalla» de «contenido». La pantalla viaja en el teléfono; el contenido valioso nunca sale del servidor completo ni se entrega antes de tiempo. Axiom puede aplicar la misma idea **sin cambiar de tecnología**: basta con que el servidor deje de mandar las respuestas correctas al navegador durante un simulacro y califique él.

---

## 3. Permisos: un ejemplo de higiene

La app pide solo 10 permisos, todos justificables en una frase. No pide ubicación, contactos, cámara, micrófono ni acceso a archivos, y eso coincide con lo que su política de privacidad promete («Lo que no recogemos»).

| Permiso | Para qué sirve en Rindex |
|---|---|
| `INTERNET` | Hablar con su servidor |
| `ACCESS_NETWORK_STATE` | Saber si hay conexión |
| `POST_NOTIFICATIONS` | Avisos push (racha, recordatorios) |
| `com.google.android.c2dm.permission.RECEIVE` | Recibir push de Firebase |
| `WAKE_LOCK` | Despertar el teléfono para procesar avisos |
| `USE_BIOMETRIC` / `USE_FINGERPRINT` | Desbloqueo con huella/cara |
| `com.android.vending.BILLING` | Cobros dentro de Google Play |
| `com.android.vending.CHECK_LICENSE` | Verificación de licencia de Play (antipiratería) |
| `DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION` | Permiso interno propio de Android 13+ |

Detalle fino: las librerías de Google Play Services de ubicación y lugares vienen *empaquetadas* (llegan con otros paquetes de Google), pero **no se declara permiso de ubicación**: no lo usa. En Android, lo que manda es el permiso declarado, no la librería presente.

**Aplicable a Axiom:** pedir solo lo que se usa y decirlo en una lista pública corta («qué no te pedimos») es un argumento de confianza barato de copiar en la landing y en `/precios`.

---

## 4. Componentes detectados y la función que revela cada uno

Lo que el manifiesto declara (resumen en lenguaje simple):

**Pantallas (actividades) ajenas a la pantalla principal, todas de servicios:**
- `SignInHubActivity` y `HiddenActivity` de credenciales → **inicio de sesión con Google** y gestor de credenciales de Android.
- `ProxyBillingActivity(V2)` → **cobro con Google Play Billing**.
- `LicenseActivity` (PairIP) → **chequeo de licencia/antipiratería** al abrir.
- `PlayCoreDialogWrapperActivity` + `app-update.properties` → **actualizaciones dentro de la app** (Play In-App Updates): la app puede avisar «hay una versión nueva» sin ir a la tienda.
- `WebViewActivity` de url_launcher → abre enlaces/páginas dentro de la app (términos, ayuda).

**Servicios en segundo plano:**
- `FirebaseMessagingService` y servicios de Flutter de mensajería → **notificaciones push** (FCM), también con la app cerrada.
- Componentes de `datatransport` de Google → envío interno de eventos/datos de Firebase.

**Receptores:** el de Firebase (tokens de push) y `ProfileInstallReceiver` (optimización de arranque de Android). Nada exótico.

**Proveedores de contenido:** solo inicialización de Firebase y de AndroidX. Ningún proveedor exporta datos propios a otras apps.

En el código de los plugins (los dos archivos `.dex`, 2,4 MB combinados) las únicas direcciones que aparecen son las estándar de Google (OAuth, Firebase Installations, registro FCM, Play Core) y enlaces a documentación de Flutter/Google. **No hay rastreadores de publicidad ni destinos de datos desconocidos.**

---

## 5. Funciones del producto detectadas (con su evidencia)

Cada función está respaldada por un archivo, un componente o un texto de la propia app/web. Nada de esta lista es suposición libre.

| Función | Evidencia |
|---|---|
| Simulacros cronometrados con el tiempo y formato del examen real, o práctica a medida | Web oficial; animación `TimerWarning.json` (aviso cuando queda poco tiempo) |
| Dos modos de pregunta: **con alternativas** y **respuesta abierta escrita** | Web y términos de uso |
| **Corrección de respuestas abiertas con IA**: califica *la idea*, no las palabras exactas, y dice qué faltó; análisis a pedido | Web, política de privacidad §2 y términos §4 |
| **Flashcards con repetición espaciada**: el alumno se autocalifica («qué tan bien la recordaste») y el algoritmo programa el próximo repaso | Web (FAQ) y política §1 («tu progreso en las flashcards») |
| **Repaso de errores** hasta dominarlos | Animación `revision.json`; política §1; web («Tus errores se convierten en tu plan de estudio») |
| **Racha de estudio diaria** | Animación `StreakFire.json` (fuego de racha); política §1 |
| **Logros** | Política §1 («tus logros») |
| **Ranking entre postulantes del mismo examen**, con privacidad cuidada: por defecto apodo y sin foto; opción de mostrar nombre/foto o figurar como «Estudiante anónimo»; el correo nunca se muestra | Política §2 |
| **Estadísticas por área** y rendimiento por materia; progreso últimos 30 días (gratis) / evolución 90 días (Premium) | Política §1; web (planes) |
| **Meta de estudio personal**: institución, carreras de interés y fecha del examen, para personalizar la práctica | Política §1 |
| **Reporte de preguntas** con error, desde la propia pregunta | Política §1; términos §4 |
| **Notificaciones push** sobre práctica y examen, desactivables en Ajustes | Servicio FCM; política §2 |
| **Desbloqueo con huella** y sesión guardada en el almacenamiento seguro del sistema | Permisos biométricos; política §7 |
| **Textos legales dentro de la app** (privacidad y términos como archivos propios) y páginas de eliminación de cuenta | Archivos `assets/legal/privacy_policy.md` y `terms_of_use.md` internos |
| **Estados vacíos con animación** (sin intentos todavía, sin errores) | Animaciones `EmptyStateNoAttempts.json`, `EmptyStateNoErrorsBig.json`, `Welcome.json` |
| **Fórmulas matemáticas bien dibujadas** (KaTeX) y texto enriquecido tipo chat/IA (`gpt_markdown`) | Fuentes KaTeX y paquete `gpt_markdown` en los assets |
| Tipografía propia cuidada | Fuente PlusJakartaSans incluida |
| Preparación multiplataforma | Archivo de configuración con `APP_STORE_ID` vacío *(inferencia: planean iPhone; su web dice “llegará próximamente”)* |

---

## 6. Modelo de negocio: gratis vs. Premium (según su web, 2026-11-06)

**Plan Gratis (Bs 0):**
- Simulacros tipo examen con **corrección al final**
- Explicaciones solo de las preguntas **fáciles**
- Flashcards con repetición espaciada
- Ranking y racha de estudio
- Progreso de los **últimos 30 días**

**Plan Premium (todo lo gratis, y además):**
- **Corrección al instante**, pregunta por pregunta
- **Todas** las explicaciones (también medias y difíciles)
- Práctica por área y tema
- Prácticas a medida (prioriza lo no dominado o nunca visto)
- Respuesta abierta corregida con IA + análisis de qué te faltó
- Evolución completa: **90 días**
- **Todos los exámenes** del banco, sin candados

**Forma de cobro (términos §5 y web):**
- Pago **único por periodo**: 1, 3, 6 o 12 meses, vía **Google Play**
- **No se renueva automáticamente**: al vencer, vuelves a Gratis sin perder tu progreso
- El precio **no se muestra en la web** («Ver precios en la app»): solo dentro de la app antes de comprar

### Qué copiar y qué NO copiar de este modelo

**Sí copiar:**
1.  **El candado por dificultad en las explicaciones** (gratis = fáciles, Premium = todas). Es un paywall más fino que «todo o nada» y deja probar el valor real del paso a paso. En Axiom hoy el corte es más tosco (Premium = soluciones paso a paso en general).
2.  **La corrección al final como lo gratis, al instante como lo premium.** El modo examen realista queda gratis (es la promesa publicitaria) y la comodidad se cobra.
3.  **Ventanas de progreso como beneficio** (30 vs. 90 días): cuesta cero implementar y se entiende en una frase.
4.  **El mensaje «pago único, no se renueva solo».** En Bolivia la desconfianza a la suscripción que se cobra sola es real; decirlo explícito vende.
5.  **Periodos escalonados con descuento implícito** (1/3/6/12 meses) en vez de un solo «mensual».

**NO copiar:**
1.  **Esconder el precio hasta la app.** Axiom ya hace bien en publicar sus precios (`PRECIOS_BOB`) en la web: eso filtra curiosos y da confianza. Rindex obliga a instalar y entrar para saber el precio — fricción que en Bolivia cuesta ventas.
2.  **Cobrar solo por Google Play.** Play se queda una comisión (15 % en suscripciones/programas para pequeños), exige al alumno un medio de pago válido en Play y a ti una cuenta de desarrollador. El **QR BNB de Axiom llega mejor al bolsillo boliviano** (sin tarjeta). Lo copiable es el *empaque* (periodos, pago único), no el canal.
3.  **Exigir cuenta de Google para todo desde el minuto cero.** Rindex no deja ni mirar sin sesión. Axiom deja leer exámenes gratis: esa puerta abierta es una ventaja de captación, no la cierres.

---

## 7. Su máquina de crecer el banco: «aporta exámenes, gana Premium»

La web de Rindex tiene un programa que a Axiom le sirve oro, porque ataca justo su problema abierto (banco grande, verificación lenta):

1.  El usuario envía material (PDF, fotos o documentos) indicando institución y año.
2.  El equipo lo **verifica antes de publicar** (y declara que no publica material que indique estar protegido por derechos de autor).
3.  Si se publica, el usuario recibe **días de Premium** según cantidad y calidad.

Aplicado a Axiom: los postulantes tienen los facsímiles que a ti te faltan contrastar. Cambiar «días de Premium» por material verificado convierte a tus propios usuarios en tu equipo de verificación y te ahorra depender solo de los PDF de tu escritorio. Requiere un canal simple de recepción y una regla clara (solo se paga el Premium cuando el material pasa la verificación).

---

## 8. Privacidad y textos legales (resumen fiel de sus documentos)

**Política de privacidad** (actualizada el 17 de octubre de 2026, guardada dentro de la app):
- Recoge: datos de la cuenta de Google (nombre, correo, foto, identificador — **nunca la contraseña**), la meta de estudio, los datos de práctica (intentos, respuestas **incluidas las abiertas escritas por el alumno**, tiempos, puntajes, flashcards, racha, logros, estadísticas por área, reportes), un identificador de dispositivo generado por la app, el token de notificaciones y los datos de compra de Play (pedido, producto, estado — **nunca la tarjeta**).
- Declara lo que **no** recoge: ubicación, contactos, cámara, micrófono, archivos; y que no usa analítica ni publicidad de terceros (ver la observación en §9).
- Usos: dar el servicio, personalizar la práctica, corregir abiertas con IA, ranking con privacidad por defecto, avisos, verificar compras, seguridad y estadísticas agregadas no identificables.
- Comparte **solo** con: Google (inicio de sesión), Google Play (compras) y el proveedor de alojamiento del servidor. «No vendemos ni alquilamos tus datos.»
- Conservación: mientras la cuenta exista. Al eliminar la cuenta, **borrado inmediato** de los datos personales; se conservan solo resultados anonimizados para estadísticas y el registro de compras por obligación contable/reembolsos.
- Derechos del usuario: acceso, copia, corrección, eliminación y retiro de consentimiento, escribiendo a `support@rindexapp.com` (respuesta en máximo 30 días).
- Eliminación de cuenta: desde la app (Perfil → Ajustes → Eliminar cuenta, inmediata) o por correo sin la app. Advierte que se pierde el Premium restante sin reembolso automático.
- Seguridad declarada: HTTPS en todo, sesión en almacenamiento seguro del teléfono, acceso restringido en servidores y aviso al usuario si hay un incidente.
- Menores: mínimo 13 años; menores de 18, con conocimiento de padre/madre/tutor.

**Términos de uso** (actualizados el 6 de octubre de 2026):
- Se define como herramienta **independiente, sin afiliación con universidades**; practicar no garantiza aprobar; las preguntas no son necesariamente las del examen real.
- Las preguntas provienen de exámenes de admisión de gestiones anteriores y material de libre circulación, con fines educativos; ofrece retiro a titulares de derechos que lo pidan.
- Reconoce que el contenido **puede contener errores** y que la vía oficial es reportarlos desde la pregunta; las correcciones con IA son «orientativas».
- Cuenta personal e intransferible; prohibido acceder a cuentas ajenas o interferir el servicio.
- Premium: pago único por periodo vía Play, sin renovación; reembolsos según políticas de Google Play.
- Servicio «tal cual», sin garantía de disponibilidad continua.

**Aplicable a Axiom, tal cual:**
1.  Tener **política y términos propios, dentro del producto y en la web**, con fecha de actualización visible. Axiom cobra dinero: sin estos textos, cualquier reclamo queda a la palabra.
2.  La frase de **no afiliación con la UMSS** y «practicar no garantiza tu ingreso»: protección legal básica que deberías tener visible en landing, precios y repo.
3.  Un **correo de soporte con dominio propio** como único canal oficial de derechos y reclamos (cuando Axiom tenga su dominio; ver §10).
4.  El **borrado de cuenta self-service**: Google Play lo exige a apps con cuentas, y aunque Axiom es web, dar esa salida aumenta la confianza para pagar.

---

## 9. Seguridad: lo que hace bien y lo que hay que mirar con lupa

**Bien (verificado en el archivo):**
- Compilación de producción, sin modo depuración; respaldo de datos desactivado.
- Firma v2+v3 con firmado de Play y protección PairIP + chequeo de licencia: dificulta copias pirateadas y APK modificados.
- Su archivo de configuración interno (`.env`) trae solo datos públicos por diseño: modo de entorno, la dirección de su API (`api.rindexapp.com`), el identificador de cliente de Google (es un identificador, no una contraseña) y el tiempo de espera. **Ninguna clave secreta de servidor viaja en el instalador.** Regla de oro que se cumple aquí y que Axiom debe mantener: *todo lo que va dentro de la app/web pública se considera público*; los secretos viven solo en el servidor.
- La sesión se guarda en el almacenamiento seguro del sistema (declarado en su política) y el tráfico va por HTTPS.

**Observaciones (no escándalos, detalles):**
- La política dice «no usamos herramientas de analítica de terceros», pero el paquete incluye componentes de Firebase que incluyen piezas de medición (`firebase-measurement-connector`, `client_analytics.proto`). Probablemente llegan como dependencia de Mensajería y no como decisión de analítica, pero el texto y el paquete no calzan al 100 %. Lección para Axiom: **prometer en la política solo lo que el paquete realmente trae**.
- Su API no se puede juzgar sin cuenta: que el banco viva en el servidor no garantiza por sí solo que la API no filtre respuestas correctas en las peticiones (el mismo pecado que hoy tiene Axiom podría existir ahí dentro, no auditable desde fuera). La arquitectura *permite* hacerlo bien; no lo *prueba*.
- Versión 0.13.0: producto joven, en evolución rápida. Sus textos legales tienen fechas de octubre de 2026: se actualizan seguido.

---

## 10. Pormenores que parecen chicos y no lo son

1.  **Dominio propio coherente en todo:** web `rindexapp.com`, API `api.rindexapp.com`, correo `support@rindexapp.com`. Tres piezas, un solo nombre. En Axiom hoy conviven un dominio que no resuelve (`axiom-simulador.com`) y el de Vercel: cuando compres tu dominio, la ganancia no es «tener .com», es esta coherencia completa (web + correo de soporte + enlaces que no se rompen).
2.  **Micro-animaciones con propósito:** aviso visual cuando el cronómetro entra en zona crítica (`TimerWarning`), celebración de racha (fuego), pantallas vacías amables («todavía no hiciste intentos», «sin errores» con animación grande). Son archivos Lottie de 16–535 KB: baratos y hacen que la app se sienta viva. Axiom puede lograr lo mismo en web con Lottie o CSS.
3.  **La bienvenida también vende:** la animación `Welcome.json` es la más pesada (535 KB): invierten la primera impresión en el onboarding, no en pantallas internas.
4.  **Preguntas frecuentes que responden objeciones reales** en su web: ¿es gratis?, ¿cuánto cuesta?, ¿se renueva solo?, ¿mi universidad no aparece?, ¿qué hacen con mis datos?, ¿cómo elimino mi cuenta? Estructura copiable para la landing de Axiom casi 1:1, adaptando respuestas.
5.  **Cómo funciona en 3 pasos** (descarga → elige examen → practica y mide): la landing entera se entiende en 30 segundos. Axiom tiene más contenido (lecciones, láminas) pero lo explica menos ordenado.
6.  **Versión honesta:** 0.13.0 comunica «estamos creciendo» y baja la expectativa justa para un producto nuevo. Nada de inflar.

---

## 11. Dónde Axiom ya está por delante (no todo es copiar)

- **Foco y profundidad local:** Axiom es *el* simulador de la UMSS con sus exámenes de Ingeniería ya transcritos y en verificación contra facsímiles. Rindex es amplio (toda Bolivia) pero su banco por institución es opaco desde fuera. La profundidad verificable es tu foso.
- **Contenido que Rindex no anuncia:** lecciones y láminas propias en Axiom. Rindex no promete clases: solo práctica. Axiom puede decir «practica **y aprende**» con sustento.
- **Precio visible y en bolivianos**, con QR local: más transparente que «Ver precios en la app».
- **Web sin instalación ni cuenta obligatoria para leer:** fricción de entrada mucho menor para un postulante que llega desde TikTok o WhatsApp.
- **Precios simples ya definidos** (Pro y Premium por facultad, en `src/lib/precios.ts`): la estructura existe; falta empaquetarla mejor (ver §12).

---

## 12. Recomendaciones para Axiom, en orden de prioridad

### Prioridad 0 — lo que bloquea cobrar con confianza

**R1. Que el servidor deje de entregar las respuestas durante el examen.**
El simulador debe recibir las preguntas *sin* `respuesta_correcta` ni `explicacion`, y la calificación debe ocurrir en el servidor al responder/entregar. Es el cambio número uno que este análisis le deja a Axiom: es exactamente el diseño que la arquitectura de Rindex sugiere, y cierra el hueco de trampa ya documentado en tu propio informe de estado del 4 de noviembre. Sin esto, cualquier función nueva se construye sobre un examen «hackeable» con dos clics.

**R2. Probar un pago real completo y que el pago avise.**
(Nada que ver con Rindex, pero sigue siendo tu bloqueante conocido: pago real nunca probado de punta a punta y alertas de Telegram sin configurar en Vercel.) Ninguna mejora de producto vende si el primer cliente paga y no pasa nada en silencio.

**R3. Publicar política de privacidad y términos de Axiom.**
Redactarlos tomando §8 como plantilla de estructura (datos, usos, terceros, borrado, menores, no afiliación a la UMSS, errores de contenido y cómo reportarlos). Con fecha visible y correo de contacto. Antes de empujar publicidad pagada, no después.

### Prioridad 1 — producto y retención (lo copiable de Rindex con mejor retorno)

**R4. Flashcards generadas desde los errores del alumno, con repetición espaciada y autocalificación.**
Axiom ya registra errores y tiene práctica de puntos débiles en Premium: la tarjeta que vuelve «justo cuando estás por olvidarla» es la evolución natural y la función que más hábito crea.

**R5. Racha diaria visible + recordatorio.**
Contador de días seguidos, animación simple y un aviso (la PWA/TWA puede notificar; si no, recordatorio dentro de la app y por el canal que ya uses). Barato de hacer, ataca el abandono entre simulacros.

**R6. Ranking con la privacidad de Rindex.**
Por defecto con apodo y sin foto; opciones: mostrar nombre/foto o «Estudiante anónimo»; jamás el correo. Y acotado a postulantes del **mismo examen/facultad** para que la comparación tenga sentido.

**R7. Reordenar el paywall como el de Rindex, con tus precios.**
Gratis: simulacro realista con corrección al final + explicaciones paso a paso de las preguntas fáciles. Premium: corrección al instante, **todas** las explicaciones, práctica por área/tema y a medida, progreso extendido. Mantén tus precios actuales y el QR; cambia el *corte* de funciones, no el canal.

**R8. Paquetes por periodo con pago único y la frase mágica.**
1 / 3 / 6 / 12 meses, «pago único, no se renueva solo, al vencer vuelves a gratis sin perder tu progreso». Empaque probado por Rindex, compatible con QR.

**R9. Programa «aporta un examen, gana Premium».**
Canal de recepción de facsímiles (PDF/foto) con institución y año, verificación antes de publicar (tu proceso de verificación actual), recompensa en días de Premium solo si el material pasa. Te ayuda a completar y contrastar el banco sin depender solo de tu escritorio (los PDF de “examenes pasados”).

**R10. Landing y FAQ con la estructura de rindexapp.com.**
Promesa en una línea, beneficios, «cómo funciona» en 3 pasos, planes con precio visible (tu ventaja), FAQ que responda objeciones (¿es gratis?, ¿cómo pago?, ¿se renueva?, ¿es de la UMSS? — no, independiente —, ¿qué hacen con mis datos?, ¿cómo elimino mi cuenta?).

### Prioridad 2 — cuando lo anterior esté firme

**R11. Corrección con IA estilo Rindex, en dos sabores.**
(a) Corto plazo: para preguntas de opción múltiple, «análisis de tu error»: la IA explica por qué tu alternativa era tentadora y qué concepto repasar. (b) Largo plazo: preguntas de respuesta abierta corregidas por la idea. Es Premium puro y diferenciador, pero exige banco de abiertas y costo por corrección: fase 2, no ahora.

**R12. Micro-detalles de experiencia.**
Aviso visual al entrar en los últimos minutos del cronómetro, estados vacíos con mensaje y una animación ligera, pantalla de «sin errores» celebrada. Pulido barato que sube la percepción de calidad.

**R13. Acceso con Google en un toque como *alternativa* (sin volverlo obligatorio).**
Reduce el abandono del registro; mantén la puerta abierta a leer gratis sin cuenta.

**R14. Dominio propio, pero como proyecto completo.**
Cuando lo compres: web + correo de soporte con ese dominio + cambiar todos los enlaces en una sola pasada (lo ya acordado). Hoy todo sigue en `axiom-simulador.vercel.app`.

**Lo que no hay que copiar:**
- Reescribir Axiom en Flutter «porque Rindex lo hizo». Axiom es web/PWA con TWA ya armada: el costo de reescribir supera cualquier ganancia hoy.
- Cobrar solo por Google Play (comisión y fricción local, ver §6).
- Esconder precios hasta instalar/entrar.
- Cerrar la lectura gratuita con registro obligatorio.

---

## 13. Checklist accionable (resumen de una página)

- [ ] R1 — La API del simulador ya no envía `respuesta_correcta` / `explicacion` durante el examen; califica el servidor
- [ ] R2 — Pago real probado de punta a punta + alerta de pago funcionando
- [ ] R3 — Política de privacidad y términos de Axiom publicados (web y repo), con fecha
- [ ] R4 — Flashcards desde errores, con repetición espaciada
- [ ] R5 — Racha diaria + recordatorio
- [ ] R6 — Ranking por facultad/examen con apodo por defecto y opción anónimo
- [ ] R7 — Paywall reordenado: gratis = corrección al final + paso a paso de fáciles; Premium = todo
- [ ] R8 — Paquetes 1/3/6/12 meses, pago único, «no se renueva solo»
- [ ] R9 — Programa «aporta un examen verificado, gana días Premium»
- [ ] R10 — Landing con promesa + 3 pasos + precios visibles + FAQ de objeciones
- [ ] R11 — (Fase 2) Análisis de error con IA; abiertas corregidas por idea
- [ ] R12 — Aviso de tiempo crítico y estados vacíos cuidados
- [ ] R13 — Acceso con Google opcional
- [ ] R14 — Dominio propio con web y correo coherentes (cuando todo esté bien hecho)

---

## Anexo A. Datos crudos del análisis (para quien quiera verificar)

**Permisos completos:** `android.permission.INTERNET`, `ACCESS_NETWORK_STATE`, `POST_NOTIFICATIONS`, `USE_BIOMETRIC`, `USE_FINGERPRINT`, `WAKE_LOCK`, `com.android.vending.BILLING`, `com.android.vending.CHECK_LICENSE`, `com.google.android.c2dm.permission.RECEIVE`, `com.rindexsimulator.app.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION`.

**Actividad principal:** `com.rindexsimulator.app.MainActivity`.

**Otras actividades:** `com.google.android.gms.auth.api.signin.internal.SignInHubActivity`, `androidx.credentials.playservices.controllers.identityauth.HiddenActivity`, `androidx.credentials.playservices.controllers.identitycredentials.IdentityCredentialApiHiddenActivity`, `com.android.billingclient.api.ProxyBillingActivity`, `ProxyBillingActivityV2`, `com.pairip.licensecheck.LicenseActivity`, `com.google.android.play.core.common.PlayCoreDialogWrapperActivity`, `io.flutter.plugins.urllauncher.WebViewActivity`, `com.google.android.gms.common.api.GoogleApiActivity`.

**Servicios:** `com.google.firebase.messaging.FirebaseMessagingService`, `io.flutter.plugins.firebase.messaging.FlutterFirebaseMessagingService`, `FlutterFirebaseMessagingBackgroundService`, `com.google.android.gms.auth.api.signin.RevocationBoundService`, `com.google.firebase.components.ComponentDiscoveryService`, `com.google.android.datatransport.runtime.backends.TransportBackendDiscovery`, `TransportBackendDiscovery`/`JobInfoSchedulerService` de datatransport, `androidx.credentials.playservices.CredentialProviderMetadataHolder`.

**Receptores:** `com.google.firebase.iid.FirebaseInstanceIdReceiver`, `io.flutter.plugins.firebase.messaging.FlutterFirebaseMessagingReceiver`, `androidx.profileinstaller.ProfileInstallReceiver`, `AlarmManagerSchedulerBroadcastReceiver` (datatransport).

**Proveedores:** `com.google.firebase.provider.FirebaseInitProvider`, `io.flutter.plugins.firebase.messaging.FlutterFirebaseMessagingInitProvider`, `androidx.startup.InitializationProvider`.

**Assets declarados por la app:** animaciones (`Welcome`, `revision`, `StreakFire`, `TimerWarning`, `EmptyStateNoAttempts`, `EmptyStateNoErrorsBig`), marca (`app_icon`, `logo`, `logo_mark`), `google_g_logo.svg`, legal (`privacy_policy.md`, `terms_of_use.md`). Sin archivos de datos/preguntas.

**Claves del `.env` interno (solo nombres):** `ENV`, `API_BASE_URL` (= `api.rindexapp.com`), `GOOGLE_CLIENT_ID`, `API_TIMEOUT_MS`, `APP_STORE_ID` (vacío).

**Certificado de firma:** sujeto/emisor «Android, Google Inc., Mountain View, California, US»; serie `0x641f36274fd848246bef006c0a164fc20e001f3b`; esquemas v2 y v3 presentes, v1 ausente.

**Prueba de servidor:** `GET https://api.rindexapp.com/` → HTTP 404, JSON `{error: {code: "not_found", message: "Cannot GET /"}}` (2026-11-06). `https://rindexapp.com/` → HTTP 200.

## Anexo B. Limitaciones de este informe

1.  El APK recibido no incluye las librerías nativas de Flutter (carpeta `lib/` ausente): no se pudo auditar la lógica compilada de la app ni sus rutas exactas de API.
2.  No se ejecutó la app ni se inició sesión: las funciones se documentan desde sus propios textos, componentes y web oficial, no desde un uso real.
3.  Los precios de Rindex no son públicos (solo dentro de la app): no hay comparación de precios posible.
4.  La web `rindexapp.com` puede cambiar; lo citado corresponde al 6 de noviembre de 2026.
5.  La relación entre Rindex y Axiom no está declarada en ninguno de los dos productos; este informe los trata como productos separados del mismo rubro.

*Fin del informe.*
