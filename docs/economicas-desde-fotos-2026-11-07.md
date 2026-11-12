# Económicas desde fotos (7-nov-2026) · estado de esta tanda

Sesión: la que retoma `relevos/punto_economicas_0711.md`. Solo toca `examenes pasados/borradores_economicas/` y este archivo. No toca src/, data/, BITACORA.md ni commitea (hay otras sesiones en el árbol).

Las resoluciones anteriores (`res-*`) se perdieron al alinear con `origin/main`: se rehacen las 9, de a una, 60-75 s entre lanzamientos.

Comando (desde axiom-simulador, pedido = ruta del archivo en `12.NUBES/_AGENTES_CENTRAL/relevos/pedidos_economicas/res-<examen>.md`):
`python scripts/agy/agy_run.py --tipo res-<examen> --nivel lectura --pedido <ruta> --base "examenes pasados/borradores_economicas/<examen>.transcripcion.md" --leer "examenes pasados"`

Resultado de cada uno: `%LOCALAPPDATA%\axiom-agy\<id>\repo\examenes pasados\borradores_economicas\<examen>.banco.md`

| Examen | Estado | id agy |
|---|---|---|
| 2024-II-2op | hecho y copiado (30 preguntas, 10 de matemáticas faltantes: falta la página 1) | 20261107-073821_res-2024-II-2op |
| 2025-I-1op | hecho y copiado (sin revisar) | 20261107-075114_res-2025-I-1op |
| 2025-I-3op | hecho, copiado y revisado por Claude (30 de 30; las 10 de matemáticas comprobadas con sympy, todas bien) | 20261107-210409_res-2025-I-3op |
| 2025-II-1op | hecho, copiado y revisado por Claude (30 de 30; matemáticas comprobadas con sympy, todas bien) | 20261107-211128_res-2025-II-1op |
| 2025-II-2op | hecho (agy terminó el archivo a las 21:25, justo antes del corte de la ventana), copiado y revisado por Claude (30 de 30; matemáticas a mano, bien; la 30 de letras da E por alfabeto de 26 letras: seguridad media) | 20261107-211928_res-2025-II-2op |
| 2026-I-1op | hecho, copiado y revisado por Claude (30 de 30; matemáticas con sympy, bien; la 7 da E porque ninguna opción es la racionalización) | res-2026-I-1op |
| 2026-I-2op | lanzado 21:40 (Flash) | |
| 2026-II-1op | pendiente | |
| 2026-II-2op | pendiente | |

Después: revisar (resolutor-exacto en matemáticas, auditor-facsimil), copiar los .banco.md al repo, `npm test`, mostrar en la tablet (ver `docs/COLA_TABLET.md`) ANTES de subir a main.

## Traspaso a MOTOR (7-nov, ventana ff70b46e cerrada por orden del taller)
- Hechos y copiados en `examenes pasados/borradores_economicas/` (sin revisar, sin commitear): `2024-II-2op.banco.md` (30 preguntas; las 10 de matemáticas faltan porque la página 1 no está en las fotos) y `2025-I-1op.banco.md` (19 de 30 preguntas).
- Faltan por resolver, de a UNO y 60-75 s entre lanzamientos: 2025-I-3op, 2025-II-1op, 2025-II-2op, 2026-I-1op, 2026-I-2op, 2026-II-1op, 2026-II-2op. No hay agy corriendo de esta tanda.
- Revisión pendiente: resolutor-exacto en las matemáticas, auditor-facsimil contra las fotos, verificador, copiar a `data/examenes/umss/economicas/`, `npm test`, mostrar en la tablet antes de subir a main.
- Ojo: el agy de 2025-I-1op dejó solo 19 de 30 preguntas; mirar cuáles quedaron en faltantes antes de darlo por bueno.

## Sesión de la noche (7-nov, 21:00)
- Pedidos nuevos que citan la skill `transcriptor-examenes` + CLAUDE.md (control `pedido_con_reglas`): `docs/pedidos-economicas/res-<examen>.md`, uno por examen. Se lanzan de a uno con el comando de arriba.
- Revisión de Claude de los dos copiados (tabla pregunta/respuesta): 2024-II-2op y 2025-I-1op sin respuestas mal en lo mirado (20, 22 de 2024-II; 23, 24, 29, 30 de 2025-I). Arreglar al copiar: la explicación de la 22 de 2024-II-2op cita «programas de la UMSS» (fuente no comprobable). Áreas: 2024-II-2op usa contabilidad/economia/administracion y 2025-I-1op economicas/verbal/razonamiento; decidir si se unifican.
- 7-nov 21:20 · Ronald eligió A: áreas unificadas a las del banco (matematicas/economicas/verbal/razonamiento). Aplicado a 2024-II-2op (+ explicación 22 reescrita) y a los pedidos.
