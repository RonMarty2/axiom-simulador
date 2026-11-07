# Pedido agy: opción B, lote 4 (6 exámenes de Ingeniería contra su PDF)

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; usa la skill `auditor-facsimil` (agente: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-facsimil.md) y la skill `auditor-figuras` (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-figuras.md) y lee `docs/lecciones-agentes.md` al empezar.

## Tarea
Audita SOLO las preguntas de riesgo de estos 6 exámenes (modo «opción B» de `auditor-facsimil`: muestra por riesgo). Las rutas de PDF son relativas a la carpeta `examenes pasados/` pasada con `--leer`. La lista completa de preguntas de riesgo por examen está en `docs/opcion-b-pendientes-2026-11-07.md` (viene con `--base`).

- `umss-ingenieria-2010-primer-parcial-primer-curso-pre-facultativo-gestion-2-2010`: 1 pregunta de riesgo; PDF `FCYT/104_PrimerParcialPrimerCursoPre-Facultativo2-2010.pdf`
- `umss-ingenieria-2012-segundo-examen-de-ingreso-1-2012`: 1; PDF `FCYT/120_SegundoExamenIngreso1-2012.pdf`
- `umss-ingenieria-2013-examen-final-curso-pre-facultativo-gestion-2-2013`: 1; PDF `FCYT/126_ExamenFinalCursoPre-Facultativo2-2013.pdf`
- `umss-ingenieria-2013-segundo-parcial-curso-pre-facultativo-gestion-1-2013`: 1; PDF `FCYT/123_SegundoParcialCursoPre-Facultativo1-2013.pdf`
- `umss-ingenieria-2013-segundo-parcial-curso-pre-facultativo-gestion-2-2013`: 2; PDF `FCYT/125_SegundoParcialCursoPre-Facultativo2-2013.pdf`
- `umss-ingenieria-2014-examen-final-curso-pre-facultativo-gestion-2-2014`: 2; PDF `FCYT/136_final2-2014.pdf`

AVISO del lote 3: en la lista, los números de prefijo de varios PDF vinieron corridos (075 era 076, 097 era 090, 107 era 109, 101 era 100). Si un nombre no existe, busca los números vecinos en `examenes pasados/FCYT/` y confirma el título impreso en la página 1 antes de dar el PDF por inexistente.

Por cada examen: contrasta enunciado, opciones y figura de las preguntas de riesgo con el PDF; corrige el .md del banco solo si el PDF lo demuestra; registra el examen en `data/registro-verificacion.json` con `completo:false` y anota qué preguntas se miraron (no pongas `completo:true`: solo se miró lo de riesgo). Si una figura no puedes comprobarla, déjala anotada como pendiente; agy NO juzga figuras de circuitos: ponlas como pendiente de `auditor-figuras`.
No toques otros exámenes, lecciones ni código. Devuelve «Lecciones nuevas» y una tabla: examen | preguntas miradas | cambios | pendientes.

## Reglas de ejecución (el lote 4 anterior salió vacío por no leerlas)
- NO ejecutes tsc, lint ni tests ni ningún comando: la terminal está bloqueada y esos controles los corre el script después. Si escribes «NO SE» en vez de hacer el trabajo, el lote se pierde.
- El trabajo es abrir cada PDF, leer las preguntas de riesgo, editar el .md del banco solo si el PDF lo demuestra, y AGREGAR las 6 entradas a `data/registro-verificacion.json` (formato de las entradas ya existentes de 2008 a 2010, fecha 2026-11-07, `completo:false`). La entrega es ese cambio en el JSON.

## Variante solo lectura (Flash, cuota de Argon agotada)
No edites archivos. En `RESPUESTA.md` entrega, por examen: preguntas miradas, si enunciado/opciones/figura/clave coinciden con el PDF (cita lo que dice el PDF cuando haya diferencia), nombre real del PDF, y la entrada JSON lista para pegar en `data/registro-verificacion.json` (mismo formato que las existentes, `completo:false`, fecha 2026-11-07). Yo (Claude) la pego.
