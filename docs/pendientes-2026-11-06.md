# Pendientes reales de Axiom · 6-nov-2026

Inventario hecho por `agy` (Flash Medium, solo lectura) y **comprobado por Claude** contra el código. Qué decidió Ronald: el QR, Telegram, el pago real, la clave maestra y el abogado van AL FINAL; primero la robustez.

## Comprobado por Claude
- CONFIRMADOS en el código: #1 (`api/admin/banco` escribe a disco), #18 (cifras fijas en `/aprende`), #19 (cifras fijas en el panel), #20 (semana corta a las 20:00 del domingo), #22 (borrar errores borra también lo dominado).
- CORRECCIÓN a #6: las lecciones BIO-01 a BIO-07 SÍ están en el repo y en el catálogo, con 48 errores ya corregidos. Lo que sigue abierto: mirarlas en celular, datos dudosos contra la guía UMSS, 2 figuras de ecología y decidir 38 ATP o 36–38.
- No verificados uno por uno: el resto de filas. Antes de trabajar una, comprobarla.

## Orden acordado para trabajar
1. Con `agy`: #1, #20, #21, #18, #19, #22 y rate limit (#24, #25).
2. Biología (#6, #10).
3. Auditoría de lecciones y láminas (#7, #8, #9).
4. Exámenes de Ingeniería contra el PDF (#2, #3) y Económicas (#4, #5): necesitan los PDF de Ronald.
5. Animaciones (#11 a #13): Ronald decide cuándo conectarlas.

---

# Inventario de tareas pendientes, incompletas e interrumpidas en Axiom

Este inventario reúne el trabajo que permanece inconcluso, a medias o interrumpido en el proyecto, contrastado directamente contra el código actual, los registros de verificación y la bitácora viva. Se han excluido expresamente todos los puntos ya resueltos (ocultamiento de clave en simulacro, exigencia de sesión del 6-nov, "Próximamente" en Medicina y Derecho, opciones repartidas en prácticas de economía y auditoría de las 19 lecciones de Unidad 01) y los puntos que Ronald postergó para el final (QR Bs. 50, bot de Telegram, prueba de pago real, clave maestra, consulta con abogado).

---

### Tabla de pendientes (ordenada de mayor a menor impacto en el alumno)

| # | Qué falta | Evidencia | Comprobado contra el código? (sí/no) | Tamaño | Quién |
|---|---|---|---|---|---|
| 1 | `POST /api/admin/banco` intenta escribir archivos Markdown con `fs.writeFile` en `data/examenes/`, lo que provoca error fatal de ejecución (`EROFS`) en el entorno de solo lectura de Vercel Serverless. | [`src/app/api/admin/banco/route.ts:96-97`](src/app/api/admin/banco/route.ts) | Sí | Chico | Agente |
| 2 | 120 de los 139 exámenes de Ingeniería permanecen sin contrastar contra facsímil oficial (riesgo comprobado de respuestas o enunciados invertidos en el banco, como ocurrió en 2010 P12, 2022-1op-2 P11 y 2023-1op-2 P11). | [`data/registro-verificacion.json`](data/registro-verificacion.json) y [`docs/registro-examenes.md:38`](docs/registro-examenes.md) | Sí | Grande | Agente / Ronald (PDFs) |
| 3 | 5 exámenes de Ingeniería registrados tienen verificación incompleta (`completo: false`) por figuras pendientes o dudas abiertas: 2005-1op-1 (figuras P16 y P18), 2006-1op-1 (figuras P11 y P12), 2005-1op-2 (P12 retirada), 2012-1op-1 (duda P11) y 2024-Uop-2 (duda G6). | [`data/registro-verificacion.json:10,21,76,87,109`](data/registro-verificacion.json) | Sí | Medio | Agente / Ronald |
| 4 | Los 10 exámenes de Ciencias Económicas tienen 0 % de verificación contra facsímil oficial; 9 de ellos tienen Historia ausente y Lenguaje incompleto (`secciones_pendientes`), y el examen 2024 sigue en borrador simplón. | [`docs/registro-examenes.md:21`](docs/registro-examenes.md) y [`BITACORA.md:129`](BITACORA.md) | Sí | Grande | Agente / Ronald |
| 5 | El examen de Admisión 2/2011 de Ciencias Económicas tiene un conteo que no cuadra (13 preguntas reales contra 14 declaradas) porque la pregunta 7 quedó como faltante ilegible sin resolver. | [`data/examenes/umss/economicas/2011-2op-1-2011.md:10,18-22`](data/examenes/umss/economicas/2011-2op-1-2011.md) | Sí | Chico | Agente / Ronald |
| 6 | 7 lecciones de Biología para Ingeniería (BIO-01 a BIO-07) fueron auditadas con 6 errores graves (bocio como hipertiroidismo, sudor como calor específico, 4 gametos en la mujer, ATP discordante) y quedaron frenadas como "ARREGLAR ANTES", sin corregir ni publicar en catálogo. | [`docs/auditoria-biologia-1.md:6-16`](docs/auditoria-biologia-1.md) y [`docs/auditoria-biologia-2.md:11-21`](docs/auditoria-biologia-2.md) | Sí | Medio | Agente |
| 7 | ~84 lecciones pagadas de `/aprende` permanecen sin auditar pedagógicamente (solo se revisaron 19 lecciones gratuitas de Unidad 01). | [`docs/auditoria-pedagogica.md:29`](docs/auditoria-pedagogica.md) y [`BITACORA.md:1081`](BITACORA.md) | Sí | Grande | Agente |
| 8 | 27 errores de contenido detectados en lecciones de `/aprende` siguen pendientes de corrección editorial (escasez cuentas que no dan en L294, triángulos con rectángulos en teorema de Pitágoras L326, cinemática signos mal despejados en L430, rótulos de ejes invertidos). | [`docs/auditoria-pedagogica.md:88-219`](docs/auditoria-pedagogica.md) | Sí | Medio | Agente / Ronald |
| 9 | 63 de las 64 láminas interactivas de `/laminas` permanecen sin auditar ni aprobar bajo las reglas visuales 10 a 12 (solo el piloto de Teorema del Resto cuenta con visto bueno). | [`BITACORA.md:212-226`](BITACORA.md) y [`docs/estado-saas-2026-11-04.md:115`](docs/estado-saas-2026-11-04.md) | Sí | Grande | Agente / Ronald |
| 10 | Ejercicios de autoevaluación (`AutoCheck`) con respuestas concentradas en el mismo botón en lecciones no corregidas (detectado en BIO-01 con 6/8 en botón 2, BIO-03 con 5/6 en botón 3, y BIO-05/06/07 sin ninguna opción en botón 1; pendiente test de distribución). | [`docs/auditoria-biologia-1.md:9,54`](docs/auditoria-biologia-1.md), [`docs/auditoria-biologia-2.md:27-29`](docs/auditoria-biologia-2.md) y [`BITACORA.md:1084`](BITACORA.md) | Sí | Medio | Agente |
| 11 | Los 21 tipos de animaciones de resolución de `/prueba-animacion` están desconectados de la app real: simulador y exámenes resueltos solo muestran texto plano parseado por [`SolucionPasos.tsx`](src/app/components/SolucionPasos.tsx). | [`BITACORA.md:894`](BITACORA.md) y [`docs/estado-trabajo.md:41`](docs/estado-trabajo.md) | Sí | Grande | Agente / Ronald |
| 12 | Ninguna de las 21 animaciones de resolución está cerrada con visto bueno final de Ronald (69 pasos marcados pendientes de revisión en `/prueba-animacion`); 3 tipos (fracciones, interés, molaridad) quedaron sin lectura independiente por corte de cuota. | [`docs/estado-trabajo.md:30-31`](docs/estado-trabajo.md) y [`docs/mejoras-opcionales-animaciones.md:10`](docs/mejoras-opcionales-animaciones.md) | Sí | Medio | Ronald / Agente |
| 13 | 16 tipos de animaciones carecen de versión rápida: solo 5 tipos tienen implementado el parámetro `rapido` (fracciones, molaridad, tiro, mruv y cuadrática). | [`BITACORA.md:962-968`](BITACORA.md) y [`src/app/prueba-animacion/construir.ts`](src/app/prueba-animacion/construir.ts) | Sí | Medio | Agente |
| 14 | En [`/cuenta`](src/app/cuenta/page.tsx) no existe ningún botón o switch para retirarse del ranking público, incumpliendo la promesa expresa de los Términos y la Política de Privacidad. | [`docs/legal-revision.md:24-25`](docs/legal-revision.md) y [`src/app/cuenta/page.tsx`](src/app/cuenta/page.tsx) | Sí | Chico | Agente |
| 15 | Falta interfaz gráfica para el interruptor "No mostrar mensajes de ánimo" en [`/cuenta`](src/app/cuenta/page.tsx) (Decisión D5 aprobada; el backend ya consulta la bandera pero el alumno no puede alternarla). | [`docs/plan-refuerzo-intermitente.md:384`](docs/plan-refuerzo-intermitente.md) y [`src/app/cuenta/page.tsx`](src/app/cuenta/page.tsx) | Sí | Chico | Agente |
| 16 | El progreso de lecciones y escenas vistas no se guarda en ningún sitio (Lote 5 de refuerzo): no hay tabla ni estado en BD, por lo que el avance se reinicia al recargar o cambiar de dispositivo. | [`docs/plan-refuerzo-intermitente.md:55,368`](docs/plan-refuerzo-intermitente.md) y [`src/app/aprende/_components/LeccionShell.tsx:22`](src/app/aprende/_components/LeccionShell.tsx) | Sí | Medio | Agente |
| 17 | La pantalla para saltar directamente a una pregunta específica de un examen resuelto (`/resueltos/<id>#N`) solicitada por Ronald el 18-oct nunca se construyó. | [`BITACORA.md:916`](BITACORA.md) y [`src/app/resueltos/page.tsx`](src/app/resueltos/page.tsx) | Sí | Medio | Agente |
| 18 | Cifras de catálogo quemadas a mano en [`src/app/aprende/page.tsx:107,115`](src/app/aprende/page.tsx) ("150 exámenes reales" fijo y "desde Bs 49" cuando el precio oficial en `PRECIOS_BOB` es Bs 50). | [`src/app/aprende/page.tsx:107,115`](src/app/aprende/page.tsx) | Sí | Chico | Agente |
| 19 | Cifras quemadas a mano en el Dashboard: "6 modos disponibles" en [`src/app/dashboard/page.tsx:166`](src/app/dashboard/page.tsx) (solo hay 5) y límite semanal duplicado en línea 64 (`const limiteSemanal = 4`) sin importar `plan.ts`. | [`src/app/dashboard/page.tsx:64,166`](src/app/dashboard/page.tsx) | Sí | Chico | Agente |
| 20 | Inconsistencia de zona horaria en límites semanales: `inicioSemanaISO` calcula `setHours(0,0,0,0)` con la hora de la máquina y emite ISO UTC, cortando la semana a las 20:00 del domingo en Vercel en vez de medianoche de La Paz (UTC-4). | [`src/lib/plan.ts:76-82`](src/lib/plan.ts) y [`docs/plan-refuerzo-intermitente.md:22`](docs/plan-refuerzo-intermitente.md) | Sí | Chico | Agente |
| 21 | Inconsistencias de fecha UTC vs La Paz en `promedioMes` de [`src/app/historial/page.tsx:29`](src/app/historial/page.tsx) (`slice(0, 7)`) y en `examenes_hoy` de [`src/lib/data-store.ts:515-516`](src/lib/data-store.ts) (`slice(0, 10)`). | [`src/app/historial/page.tsx:29`](src/app/historial/page.tsx) y [`src/lib/data-store.ts:515-516`](src/lib/data-store.ts) | Sí | Chico | Agente |
| 22 | La ruta `DELETE /api/axiom/errores` borra indiscriminadamente todas las filas del alumno, incluidas las preguntas ya dominadas, dejando en 0 el contador de logros de repaso. | [`src/app/api/axiom/errores/route.ts:42-46`](src/app/api/axiom/errores/route.ts) y [`docs/plan-refuerzo-intermitente.md:360`](docs/plan-refuerzo-intermitente.md) | Sí | Chico | Agente |
| 23 | Volatilidad de datos en fallback de serverless: si Supabase no está conectado o falla la consulta, `data-store.ts` y `axiomDB` guardan usuarios, pagos y simuladores en memoria que se volatiliza en cada reciclado de instancia. | [`src/lib/data-store.ts:25-37`](src/lib/data-store.ts) y [`src/lib/axiom/db.ts:16-25`](src/lib/axiom/db.ts) | Sí | Medio | Agente |
| 24 | Rate limiting ausente en endpoints críticos: `POST /api/pagos`, `DELETE /api/cuenta`, `POST /api/perfil/facultad` y `POST /api/axiom/simulador` no tienen límite de peticiones por IP ni usuario. | [`docs/estado-saas-2026-11-04.md:60-61`](docs/estado-saas-2026-11-04.md) y [`src/app/api/pagos/route.ts`](src/app/api/pagos/route.ts) | Sí | Medio | Agente |
| 25 | `src/lib/rate-limit.ts` utiliza un `Map` en la memoria del proceso, el cual no persiste en Vercel Serverless (cada lambda tiene memoria aislada y los cold starts lo resetean). | [`src/lib/rate-limit.ts:15`](src/lib/rate-limit.ts) | Sí | Medio | Agente |
| 26 | Contenido de lecciones y láminas pagadas empaquetado en bundles de JavaScript descargados por el navegador; cualquier usuario técnico puede extraer las lecciones sin suscripción activa. | [`src/lib/acceso-contenido.ts:15-19`](src/lib/acceso-contenido.ts) | Sí | Grande | Agente |
| 27 | Falta prueba de verificación en tablet física tras el cierre del 6-nov: comprobar que un alumno sin sesión vea "Inicia sesión para hacer simulacros" y que con sesión rinda con normalidad. | [`BITACORA.md:1085`](BITACORA.md) | No | Chico | Ronald |
| 28 | Defectos observados en la prueba en tablet física real (JMS-L03 Android 15): carga inicial de `/aprende` superior a 5 segundos, desaparición de la barra de pestañas en horizontal y barra de sistema en violeta oscuro que desentona con el fondo crema. | [`BITACORA.md:1082`](BITACORA.md) | Sí | Medio | Agente / Ronald |
| 29 | Accesibilidad en avatares de usuario: los colores `#f59e0b`, `#06b6d4` y `#10b981` en [`src/app/api/auth/callback/google/route.ts:5`](src/app/api/auth/callback/google/route.ts) con iniciales blancas dan ratios de 2,1:1 a 2,5:1 (falla WCAG AA). | [`BITACORA.md:980`](BITACORA.md) y [`src/app/api/auth/callback/google/route.ts:5`](src/app/api/auth/callback/google/route.ts) | Sí | Chico | Ronald (decisión) / Agente |
| 30 | Código muerto huérfano: [`src/lib/axiom/errores-storage.ts`](src/lib/axiom/errores-storage.ts) no tiene importadores en todo el proyecto. | [`docs/plan-refuerzo-intermitente.md:366`](docs/plan-refuerzo-intermitente.md) | Sí | Chico | Ronald (aprobar borrado) |
| 31 | La ruta obsoleta `/simulador` ([`src/app/simulador/page.tsx`](src/app/simulador/page.tsx)) sigue enlazada desde la landing en [`Header.tsx:42,68`](src/app/components/Header.tsx) y hardcodea la carrera "economicas". | [`docs/plan-refuerzo-intermitente.md:367`](docs/plan-refuerzo-intermitente.md) y [`src/app/components/Header.tsx:42,68`](src/app/components/Header.tsx) | Sí | Chico | Agente |
| 32 | 21 piezas publicitarias regeneradas siguen sin aprobación de `revisor-piezas` por franjas vacías, letra pequeña y afirmaciones sin fuente comprobable ("80 %", "100 preguntas"). | [`docs/estado-trabajo.md:66`](docs/estado-trabajo.md) | Sí | Medio | Ronald / Agente |
| 33 | La aplicación Android TWA (`android/`) no ha sido compilada para producción ni firmada con un Keystore definitivo, y la cuenta de desarrollador en Google Play Console sigue sin crearse. | [`BITACORA.md:243-248`](BITACORA.md) y [`docs/estado-saas-2026-11-04.md:146`](docs/estado-saas-2026-11-04.md) | Sí | Grande | Ronald |
| 34 | Línea de créditos de atribución a MinerU (paso 4.4 del plan de repositorios) pendiente de redacción e inserción en los textos legales. | [`BITACORA.md:986,1005`](BITACORA.md) | Sí | Chico | Ronald |
| 35 | Decisiones abiertas en refuerzo intermitente: grupo de control del 10 % (D7) y almacenamiento del avance de lecciones en base de datos (D8). | [`docs/plan-refuerzo-intermitente.md:386-387`](docs/plan-refuerzo-intermitente.md) | Sí | Chico | Ronald |
| 36 | El endpoint de analítica de retención [`/api/admin/retencion`](src/app/api/admin/retencion/route.ts) devuelve `insuficiente: true` hasta que la plataforma alcance un mínimo de 30 usuarios activos semanales. | [`docs/plan-refuerzo-intermitente.md:344,354`](docs/plan-refuerzo-intermitente.md) y [`src/lib/metricas-retencion.ts`](src/lib/metricas-retencion.ts) | Sí | Chico | Ronald (esperar volumen) |

---

### (a) Las 10 más importantes en una frase cada una

1. **Fallo fatal en Vercel Serverless:** La ruta de administración del banco intenta guardar archivos Markdown en el disco local y colapsará con error de solo lectura (`EROFS`) en producción.
2. **Incertidumbre en el banco de Ingeniería:** 120 de los 139 exámenes de Ingeniería nunca fueron contrastados contra sus exámenes oficiales originales y pueden contener respuestas incorrectas o preguntas desfiguradas.
3. **Exámenes incompletos con figuras faltantes:** Cinco exámenes de Ingeniería tienen preguntas que el alumno no puede resolver porque las figuras nunca se dibujaron o quedaron marcadas con dudas abiertas.
4. **Catálogo de Ciencias Económicas trunco:** Los 10 exámenes de Económicas carecen de facsímil oficial, 9 no tienen preguntas de Historia y el examen de 2024 sigue en borrador simplificado.
5. **Lecciones de Biología con errores graves sin publicar:** Las 7 lecciones de Biología para Ingeniería tienen errores conceptuales severos (bocio como hipertiroidismo, calor específico en sudor, meiosis femenina con 4 gametos) y permanecen bloqueadas sin corregir.
6. **Lecciones pagadas sin auditar:** Más del 80 % de las lecciones del catálogo no han sido leídas por un auditor pedagógico, dejando errores conocidos sin resolver en temas clave de matemáticas y física.
7. **Láminas interactivas sin revisión:** 63 de las 64 láminas de estudio nunca recibieron la aprobación visual de Ronald ni fueron auditadas bajo los estándares de la plataforma.
8. **Animaciones de resolución desconectadas:** Los 21 generadores de resolución animados están confinados a un panel interno de desarrollo y ningún alumno de pago los puede ver en sus exámenes o repasos.
9. **Incumplimiento legal en el ranking:** La plataforma promete en sus Términos y Privacidad que el estudiante puede excluirse del ranking público, pero no existe ninguna opción en la interfaz para hacerlo.
10. **Desfase de zona horaria en límites semanales:** El cálculo de la semana de estudio se realiza con la hora local de la máquina y corta el cupo semanal de los alumnos a las 20:00 de cada domingo en lugar de la medianoche de Bolivia.

---

### (b) Lo que dudé y por qué no entró directamente en la tabla principal

1. **Examen de Medicina 2025 (2do Parcial):**  
   *Por qué dudé:* Se digitalizó y se contrastaron las páginas 96 y 98 el 3-nov, pero quedó sin registrarse en `registro-verificacion.json` porque la auditoría de la clave oficial contra los libros de texto falló dos veces por cuota/timeout y las preguntas P60 y P91 están en `faltantes`. No lo puse como examen roto prioritario en la tabla porque la carrera de Medicina está honestamente anunciada como "Próximamente" en toda la interfaz de usuario, impidiendo que un alumno pague esperando simulacros activos de esa facultad.

2. **Facultad de Derecho sin ningún contenido:**  
   *Por qué dudé:* En el disco no existe ningún examen ni lección para Derecho. Sin embargo, al igual que Medicina, el catálogo la lista automáticamente con "Próximamente" y bloquea la selección de simulacros. No representa un fallo técnico activo mientras no se abra la matrícula para esa carrera.

3. **Opción B de auditoría de facsímil (48 exámenes de Ingeniería con 106 preguntas de riesgo):**  
   *Por qué dudé:* El taller analizó que auditar esas 106 preguntas costaría entre 6,4 y 9,2 millones de tokens de `agy`. Está totalmente planificada en la bitácora pero frenada esperando la aprobación explícita de Ronald para consumir esa cuota. No es un trabajo que haya quedado a medias por un error, sino una decisión financiera pendiente de autorización.

4. **Exposición pública de usuarios en `/api/usuarios`:**  
   *Por qué dudé:* El informe del 4-nov lo marcó como vulnerabilidad, pero Claude comprobó que el endpoint es consumido legítimamente por la pantalla de `/ranking` y no expone correos electrónicos ni hashes de contraseña. Se mantuvo como observación de bajo riesgo y no como brecha crítica.

5. **Fechas y duraciones de exámenes en el frontmatter:**  
   *Por qué dudé:* Varios exámenes de Ingeniería entre 2005 y 2010 no tienen impresa la duración ni la fecha exacta en el papel del PDF original, y el transcriptor asignó 120 o 150 minutos por deducción. Dudé si reportarlo como dato pendiente de comprobación, pero es una decisión editorial inevitable ante la falta de esos datos en los documentos físicos originales de la UMSS.
