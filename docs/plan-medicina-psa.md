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
- **D. Audiolibros dentro de la app:** **CONECTADO EN CÓDIGO (22-11, sin subir MP3 a R2 todavía por pedido de Ronald):** reproductor en `LeccionShell` + `ReproductorAudiolibro.tsx` (velocidad `0.75x`–`2x`, `-15 s`/`+15 s`, lista de partes, reanudar en `localStorage`, insignia `Audiolibro` en `/aprende`) conectado a las **22 unidades** de Morfofunción (Saladin, 20 caps, 195 partes) y Biología Celular (Calvo, 14 caps, 123 partes) = **318 partes** (`src/lib/audio-medicina-catalogo.ts`, generado con `scripts/generar-catalogo-audio.py`), listo para Cloudflare R2 (`NEXT_PUBLIC_AUDIO_BASE_URL`) con streaming local dev-only (`/api/dev-audio`). Pendiente: sumar Educación en Salud cuando termine de grabarse y subir los MP3 a R2 cuando Ronald dé luz verde.
- **E. Cierre de Medicina (checklist):** áreas = convocatoria; banco verificado y rotulado; las 7 áreas con lecciones y audio donde exista; un examen completo de prueba en celular (esto va con lo visual, al final); bitácora al día.

## 4. Lo que solo Ronald puede hacer o decidir
1. Abrir con la cuenta correcta la carpeta oficial de material de la convocatoria y pasarme el contenido (o decirme que no hay acceso).
2. ¿Educación en Salud e Investigación es una sola área o dos en el examen? (la convocatoria las junta en un renglón).
3. Dónde alojar los audios y si entran en el plan gratis o de pago.
4. Confirmar de dónde salen el cupo de 250 y las 100 preguntas (no figuran en la convocatoria).

## 5. Estado de agy
Sin cuota (Argon y Flash) hasta ~19:00 del 13-nov. Lo que no depende de agy (fase A) se hace ahora; lo demás se lanza al volver la cuota.

## 6. Fase B hecha (16-nov-2026): huecos ordenados por peso en el examen
Cruce del temario oficial (LISTA_CONTENIDOS_PSA2027 + 4096.pdf + títulos de EdS) contra `/aprende` y láminas: agy (lectura, entrega `20261116-092251_cruce-temario`, revisado por Claude con grep). Conteo de preguntas del pool «Por tema» por script (3433). Peso = peso estimado del área (data/formatos-examen.json, psa-2027) × parte del temario del área. Los conteos de preguntas por tema son por palabra clave en la etiqueta `tema` (aproximados).

| # | Hueco | Área (peso) | Lección | Preguntas | Peso aprox. en el examen |
|---|---|---|---|---|---|
| 1 | Estadística descriptiva (EdS Parte III, pág. 84-189: más de la mitad del compendio) | EdS (15 %) | NINGUNA | ~20 de 56 (gráficos, Sturges, intervalos, escalas, muestreo) | ~8 % |
| 2 | Educación en Salud (EdS Parte I, pág. 2-31) | EdS (15 %) | `eds-determinantes-salud` (03) + `eds-promocion-sistema-salud` (05, 17-11) | pocas (prevención, niveles de atención, ODS) | ~2-3 %; **HECHO (17-11)** desde `EDUCACION EN SALUD E INVESTIGACION.pdf` p. 2-31 y P41-P50 del 1er parcial 2025-26 |
| 3 | Biología Celular: citoesqueleto (cap. 12) sin lección; núcleo/cromatina (7), endomembranas (10), ciclo celular (14), apoptosis (15) solo a medias | BC (20 %) | 1 NO + 4 a medias | 383 en total | ~1,4 % cada capítulo |
| 4 | Química: orgánica, tabla periódica, cinética y equilibrio | Quím (15 %) | NINGUNA | orgánica ~9, periódica ~6 | ~1,2 % cada uno |
| 5 | Morfofunción: articulaciones, médula/encéfalo/autónomo, sangre, reproductor: dentro de unidades más grandes (a medias) | Morfo (20 %) | a medias | 443 en total | bajo: ya hay unidad |
| 6 | Física: mediciones, estática, hidrostática, óptica, magnetismo | Fís (10 %) | **HECHO (17-11):** `mediciones-fisica` (FIS-12), `estatica-fisica` (FIS-13), `hidrostatica-fluidos` (FIS-14), `optica-geometrica` (FIS-15), `magnetismo-electromagnetismo` (FIS-16) | 4-9 cada uno | ~0,7 % cada uno |
| 7 | Matemáticas: geometría plana, trigonometría y analítica TIENEN lección en /aprende pero no están enlazadas a Medicina (arreglo barato); sin lección: lógica/conjuntos, complejos, combinatoria, estadística, cuerpos 3D, cónicas, análisis | Mat (10 %) | **HECHO (22-11):** geometría/trig/analítica enlazadas (12–21) + `logica-conjuntos` (MAT-22) + `numeros-complejos` (MAT-23), `combinatoria-binomio` (MAT-24), `estadistica-probabilidad` (MAT-25), `cuerpos-geometricos` (MAT-26), `elipse-hiperbola` (MAT-27) y `analisis-limites-derivadas` (MAT-28) | 2-9 cada uno | ~0,6 % cada uno |
| 8 | Comprensión Lectora: la lección `lectura-comprension` usa textos de Economía; 6 de 7 habilidades a medias. Las 40 preguntas de práctica ya cubren las 7 | CL (10 %) | a medias | 40 | — |

Fuera del temario (posible limpieza, decisión de Ronald): `bases-moleculares-vida` en BC y 5 unidades de razonamiento verbal en Comprensión (`expresion-oracion`, `analogias-verbales`, `aseveraciones-cuantificadores`, `silogismos`, `secuencias-logicas`).
Pendiente opcional: clasificar cada etiqueta `tema` en su capítulo oficial (2.º pedido a agy) para conteos exactos; no cambia el orden de arriba.
**Siguiente:** hueco 1, lección de Estadística descriptiva desde EdS Parte III (`examenes pasados/MEDICINA/PSA_2027_FUENTES/EdS_p84-*_limpio.txt`).
