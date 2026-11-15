# PROTOCOLO · Dejar AXIOM listo para un examen de ingreso (molde) — 1er caso: PSA-2027 Medicina UMSS
> Ronald, 15-11: «¿no deberíamos armar un protocolo de creación/acción para tener axiom listo para que practiquen referente a este examen?».
> Sirve para CUALQUIER examen (otra facultad, otra universidad): se cambia la lista oficial y se repiten los pasos. El SaaS queda modular: un examen = una configuración, no código nuevo.

## Paso 1 · Lista oficial → temas (fuente única)
- Entrada: la lista de contenidos oficial (aquí `LISTA_CONTENIDOS_PSA2027.pdf`) y lo que enlaza (aquí `4096.pdf` del Minedu, págs. indicadas).
- OJO: `4096.pdf` es el **programa de Secundaria** (lista de temas de 3° a 6°), NO un libro con teoría. Las páginas dicen QUÉ temas entran; la teoría y las preguntas las hacemos nosotros.
- Salida: `temas_<examen>.json` (materia → tema → subtemas, con la página de origen). Hecho como borrador en `MFQ_INVENTARIO.md` (agy, falta revisar).

## Paso 2 · Cruce: qué tenemos y qué falta, por tema
Para cada tema, 5 casillas: lección · preguntas tipo examen · resolución paso a paso · audio (solo libros de Medicina) · está dentro del «examen» en la app.
Salida: `CHECKLIST_PSA2027.md` (hecho para Morfo/Bio/EdS; MFQ en borrador).
Hallazgo MFQ (borrador agy, por confirmar):
- Ya hay lección (falta conectarla a Medicina y hacerle preguntas): ~14 temas de Mat/Fís/Quím.
- **No hay lección**: Mat → lógica y conjuntos, complejos, mat. financiera, combinatoria y binomio, estadística, cuerpos 3D, elipse/hipérbola, límites-derivadas-integrales. Fís → mediciones y errores, ondas y sonido, óptica, calor, estática y máquinas simples, circular y gravitación, impulso y choques, fluidos, magnetismo. Quím → tabla periódica, cinética y equilibrio, ácido-base/pH, orgánica.
- **Preguntas para Medicina en Mat/Fís/Quím: 0** (sí hay de Ingeniería/Económicas, reutilizables).

## Paso 3 · Crear lo que falta (por tema, en tandas chicas; cada pieza con su ayudante)
| Qué | Ayudante (axiom `.claude\agents\`) | Control |
|---|---|---|
| Medir qué temas pesan más en exámenes pasados (orden de trabajo) | `analista-temas` | — |
| Lección del tema | `redactor-explicaciones` + `autor-laminas` / `animador-conceptos` | `auditor-pedagogico` |
| Preguntas tipo examen (≥ 10 por tema, nivel PSA) — reusar primero las de Ingeniería/Económicas | agy redacta en borrador | `resolutor-exacto` resuelve y comprueba la clave; `auditor-clave-oficial` |
| Resolución paso a paso | `resolutor-exacto` | `auditor-de-pasos` |
| Texto y audio de libros (Morfo, Bio, EdS) | `libro-audio-tts` | `libro-audio-auditor` (Whisper) |
Lo largo y mecánico va a agy (skill `ejecutor-agy`); Claude decide y revisa con evidencia.

## Paso 4 · Armarlo en la app como «Examen PSA-2027»
- Una configuración `examenes/psa-2027` con: materias, temas (del Paso 1), peso de cada materia en el examen y tiempo.
- Ruta de estudio (lección → práctica → repaso), simulacro con el mismo formato y proporciones, y avance del estudiante por tema.
- Audios conectados a las lecciones (hoy `src/` no los usa).

## Paso 5 · Probar antes de abrir
`probador-app` + `auditor-pantallas-movil`; prueba en tablet por la cola (`docs/COLA_TABLET.md`). Ronald da el OK final antes de publicar.

## Orden propuesto (PSA-2027)
1. Confirmar Paso 1-2 de Mat/Fís/Quím (revisar el borrador de agy).  2. Preguntas para Medicina en los ~14 temas que YA tienen lección (rápido y da práctica ya).
3. Simulacro PSA-2027 en la app con lo que haya (Paso 4) para que se practique desde el inicio.  4. Lecciones nuevas de los temas faltantes, por peso (analista-temas).
5. En paralelo: EdS (texto→lecciones) y audios (ventana de audio, cuando vuelva la cuota de voz).
