# Plan para cerrar Medicina (PSA 2027) · 13-nov-2026

Pedido de Ronald (13-nov): Medicina es prioridad y es lo más verde. Revisar la convocatoria nueva, ver qué falta, organizar (incluidos los audiolibros) y cerrarla. Solo producto: cobros, QR, factura y publicidad siguen AL FINAL (ver [plan-lanzamiento-cobro.md](./plan-lanzamiento-cobro.md)).

## 1. Lo nuevo de la convocatoria (PDF «Convocatoria-Medicina-PSA-2027», Drive de Osler, 12-nov, leído en el visor; no se descargó)
| Dato | Convocatoria | Lo que tiene la app | Estado |
|---|---|---|---|
| Examen | miércoles 19-ene-2027, 9:00, **120 min**; resultados ese mismo día en la web de la Facultad | `duracion_minutos: 120` | coincide |
| Áreas | 7: Matemáticas, Física, Química, Comprensión Lectora, Biología Celular, Morfofunción, **Educación en Salud e Investigación** | la 7.ª está como «Introducción a la Investigación» (`investigacion`) | **DIFERENTE** |
| Número de preguntas | no lo dice | `preguntas_examen: 100` | **no verificado** |
| Ponderación por área | no la dice | 20/20/15/15/10/10/10 «preliminar» | **inventada por nosotros**, sin respaldo |
| Cupo (250) | no aparece en este PDF | la bitácora del 29-oct lo da por cierto | **no confirmado aquí** |
| Banco oficial de preguntas | no se menciona | la bitácora decía «se publicará a fin de mes» | **no hay evidencia** |
| Fechas | inscripción 19-nov a 13-dic; biometría hasta 18-dic; lista de inscritos 23-dic | no está en la app | 67 días hasta el examen (desde el 13-nov) |
| Matrícula | Bs 1300 nacional | no está | solo dato |
| Material oficial | carpeta de Drive enlazada en el PDF | **pide acceso**: mi sesión no entra | Ronald debe abrirla |

**Hallazgo que cambia trabajo ya hecho:** el 29-oct se congeló «Educación en Salud» (también en los audiolibros) porque se creyó que ya no estaba. La convocatoria la mantiene, junto con Investigación. Hay que descongelarla y unificar el nombre.

## 2. Qué tenemos de Medicina hoy
- **Banco:** 5 exámenes del Curso Básico viejo (2023-24 ×3, 2024-25 ×2); final 2024-25 en curso; 2025-26 por hacer. Son el formato antiguo (Curso Básico), no el de la PSA: se rotulan como práctica del formato anterior hasta que haya un modelo oficial.
- **Lecciones:** 58 unidades en `/aprende` (Morfofunción 12, Biología Celular 5, Investigación/Bioética 3, Química 10, Física 7, Matemática 11, Comprensión 10). Auditadas.
- **Audiolibros:** Calvo (Biología Celular) y Saladin (Morfofunción) terminados: 496 MP3, unas 103 horas, 4,2 GB en `examenes pasados/MEDICINA/LIBROS DE MEDICINA/AUDIOS_MEDICINA_UMSS`. **Ninguno está conectado a la app** (el código de `src` no los referencia). Ese es el desorden: están hechos y los alumnos no pueden escucharlos.
- Libros de colegio (Matemática, Física, Química, Comprensión) en la carpeta de Drive del 9-nov: ya los conocemos, no se revisaron de nuevo.

## 3. Plan por fases (quién lo hace según la complejidad)
**Modelo potente (decide y diseña):** fases A y D (qué pasa con la 7.ª área y dónde entran los audios). **agy Flash (mecánico y lectura):** mapear, comparar temarios, renombrar. **agy Argon (criterio):** código con tests. **Claude:** revisa diffs, comprueba contra el PDF, bitácora.

- **A. Alinear con la convocatoria** (primero, es chico): nombre y descripción de la 7.ª área («Educación en Salud e Investigación»; decidir si es un área o dos), quitar de la ponderación lo no respaldado o rotularlo «estimada», fechas de la PSA en la app, y descongelar Educación en Salud en `docs/` y en el tablero de audio.
- **B. Material oficial vs. nuestras lecciones:** Ronald abre la carpeta oficial enlazada y me pasa el temario; agy (Flash) lo cruza con las 58 unidades y lista huecos. Si no hay acceso, se trabaja con el temario que ya tenemos y se anota.
- **C. Banco de exámenes:** terminar final 2024-25 (clave leída, falta armar archivos y generador) y 2025-26 p1/p2/final; rotularlos «formato Curso Básico». Cuando aparezca un modelo de PSA, se sube como formato nuevo (la plataforma debe adaptarse a cambios de formato).
- **D. Audiolibros dentro de la app:** (1) tabla que une cada audio con su unidad y diseño de la pantalla «Escuchar» dentro de cada lección; (2) dónde se alojan los 4,2 GB (el repo no los lleva; elegir almacenamiento y comprobar su costo); (3) botón de reproducir con velocidad y reanudar; (4) quién puede escuchar: gratis o plan (decisión de producto de Ronald). Primero un solo capítulo de prueba de punta a punta.
- **E. Cierre de Medicina (checklist):** áreas = convocatoria; banco verificado y rotulado; las 7 áreas con lecciones y audio donde exista; un examen completo de prueba en celular (esto va con lo visual, al final); bitácora al día.

## 4. Lo que solo Ronald puede hacer o decidir
1. Abrir con la cuenta correcta la carpeta oficial de material de la convocatoria y pasarme el contenido (o decirme que no hay acceso).
2. ¿Educación en Salud e Investigación es una sola área o dos en el examen? (la convocatoria las junta en un renglón).
3. Dónde alojar los audios y si entran en el plan gratis o de pago.
4. Confirmar de dónde salen el cupo de 250 y las 100 preguntas (no figuran en la convocatoria).

## 5. Estado de agy
Sin cuota (Argon y Flash) hasta ~19:00 del 13-nov. Lo que no depende de agy (fase A) se hace ahora; lo demás se lanza al volver la cuota.
