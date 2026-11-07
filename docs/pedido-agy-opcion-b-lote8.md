# Pedido agy: opción B, lote 8 (6 exámenes de Ingeniería contra su PDF), solo lectura

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; usa la skill `auditor-facsimil` (agente: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-facsimil.md) y la skill `auditor-figuras` (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-figuras.md) y lee `docs/lecciones-agentes.md` al empezar.

## Tarea
Audita SOLO las preguntas de riesgo de estos 6 exámenes (opción B de `auditor-facsimil`). Las preguntas de riesgo son las que tienen `figura:` o dicen «de la figura/mostrado/gráfica» (lista en `docs/opcion-b-pendientes-2026-11-07.md`). Los PDF están en `examenes pasados/FCYT/` (pasada con `--leer`). Los nombres de abajo son los REALES en disco (la lista vieja tenía nombres corridos).

- `umss-ingenieria-2024-examen-de-ingreso-1-2024-1ra-opcion` (banco: `2024-1op-1-2024.md`): PDF `FCYT/2024-1-1op.pdf`
- `umss-ingenieria-2024-examen-de-ingreso-1-2024-2da-opcion` (`2024-2op-1-2024.md`): PDF `FCYT/2024-1-2op.pdf`
- `umss-ingenieria-2024-examen-de-ingreso-1-2024-3ra-opcion` (`2024-3op-1-2024.md`): PDF `FCYT/2024-1-3op.pdf`
- `umss-ingenieria-2025-examen-de-ingreso-1-2025-1ra-opcion` (`2025-1op-1-2025.md`): PDF `FCYT/2025-1-1op.pdf`
- `umss-ingenieria-2025-examen-de-ingreso-1-2025-2da-opcion` (`2025-1op-2-2025.md`): PDF `FCYT/2025-1-2op.pdf`
- `umss-ingenieria-2025-examen-de-ingreso-1-2025-3ra-opcion` (`2025-3op-1-2025.md`): PDF `FCYT/2025-1-3op.pdf`

Estos PDF pueden tener mas de una pagina o formato distinto al de 2016-2019; confirma con el titulo impreso. Si el banco y el PDF no coinciden en el nombre del .md, usa el .md indicado entre parentesis (ver `ls data/examenes/umss/ingenieria`).

## Qué entregar (no edites archivos; NO ejecutes comandos, no hay terminal)
En `RESPUESTA.md`, por examen: título impreso en la página 1 del PDF (para confirmar que es ese examen), preguntas de riesgo miradas, si enunciado/opciones/figura coinciden con el PDF (cita lo que dice el PDF cuando haya diferencia), y las preguntas con figura en el PDF que el banco tiene solo en texto (pendientes de `auditor-figuras`; no juzgues circuitos). Al final, las entradas JSON para pegar en `data/registro-verificacion.json` (mismo formato que las existentes, `completo:false`, fecha 2026-11-07, clave `ingenieria/<nombre-del-.md>`), en un solo bloque ```json. Si no puedes abrir un PDF, di cuál y no inventes su entrada.
