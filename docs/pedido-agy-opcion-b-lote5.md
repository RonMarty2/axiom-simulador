# Pedido agy: opción B, lote 5 (6 exámenes de Ingeniería contra su PDF), solo lectura

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; usa la skill `auditor-facsimil` (agente: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-facsimil.md) y la skill `auditor-figuras` (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-figuras.md) y lee `docs/lecciones-agentes.md` al empezar.

## Tarea
Audita SOLO las preguntas de riesgo de estos 6 exámenes (opción B de `auditor-facsimil`). Las preguntas de riesgo son las que tienen `figura:` o dicen «de la figura/mostrado/gráfica» (lista en `docs/opcion-b-pendientes-2026-11-07.md`). Los PDF están en `examenes pasados/FCYT/` (pasada con `--leer`). Los nombres de abajo son los REALES en disco (la lista vieja tenía nombres corridos).

- `umss-ingenieria-2014-primer-parcial-curso-pre-facultativo-gestion-2-2014`: PDF `FCYT/134_1erparcial2-2014.pdf`
- `umss-ingenieria-2014-segundo-parcial-curso-pre-facultativo-gestion-2-2014`: PDF `FCYT/135_2doparcial2-2014.pdf`
- `umss-ingenieria-2014-examen-de-ingreso-2-2014`: PDF `FCYT/133_unica2-2014.pdf` (comprueba el título impreso: la lista vieja decía 130_..., que es otro examen)
- `umss-ingenieria-2015-examen-de-ingreso-1-2015`: PDF `FCYT/137_1ra-op-1-2015.pdf`
- `umss-ingenieria-2015-examen-de-ingreso-2-2015-1ra-opcion`: PDF `FCYT/139_1ra-op-2-2015.pdf`
- `umss-ingenieria-2015-examen-de-ingreso-1-2015-segunda-opcion`: PDF `FCYT/138_2da-op-1-2015.pdf`

## Qué entregar (no edites archivos; NO ejecutes comandos, no hay terminal)
En `RESPUESTA.md`, por examen: título impreso en la página 1 del PDF (para confirmar que es ese examen), preguntas de riesgo miradas, si enunciado/opciones/figura coinciden con el PDF (cita lo que dice el PDF cuando haya diferencia), y las preguntas con figura en el PDF que el banco tiene solo en texto (pendientes de `auditor-figuras`; no juzgues circuitos). Al final, las entradas JSON para pegar en `data/registro-verificacion.json` (mismo formato que las existentes, `completo:false`, fecha 2026-11-07, clave `ingenieria/<nombre-del-.md>`), en un solo bloque ```json. Si no puedes abrir un PDF, di cuál y no inventes su entrada.
