# Pedido agy: opción B, lote 9 (6 exámenes de Ingeniería contra su PDF), solo lectura

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; usa la skill `auditor-facsimil` (agente: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-facsimil.md) y la skill `auditor-figuras` (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-figuras.md) y lee `docs/lecciones-agentes.md` al empezar.

## Tarea
Audita SOLO las preguntas de riesgo de estos exámenes (opción B de `auditor-facsimil`). Las preguntas de riesgo son las que tienen `figura:` o dicen «de la figura/mostrado/gráfica» (lista en `docs/opcion-b-pendientes-2026-11-07.md`). Los PDF están en `examenes pasados/FCYT/` (pasada con `--leer`). Los nombres de abajo son los REALES en disco (la lista vieja tenía nombres corridos).

Estos examenes NO tienen PDF individual: estan dentro de compilados (varios examenes por PDF). Busca el examen correcto por su titulo impreso (la pagina donde empieza) y anota las paginas exactas en `fuente.paginas`.

- banco `2024-parcial1-1-2024.md` (riesgo P6, P8, P9) y `2024-parcial2-1-2024.md` (P20): compilado `FCYT/2024-1-preu.pdf`
- banco `2024-parcial1-2-2024.md` (P6, P8, P9), `2024-parcial2-2-2024.md` (P16) y `2024-final-2-2024.md` (P18): compilado `FCYT/2024-2-preu.pdf`
- banco `2025-parcial2-1-2025.md` (P18) y `2025-final-1-2025.md` (P18, P20): compilado `FCYT/2025-1-preu.pdf`
- banco `2013-parcial1-1-2013.md` (P16, P19): sin PDF conocido. Mira `FCYT/121_PrimerParcialCursoPre-Facultativo2-2013.pdf` y `FCYT/122_SegundoParcialCursoPre-Facultativo1-2013.pdf` por si alguno es en realidad el primer parcial 1-2013 (o el segundo, que tambien esta en el banco como `2013-parcial2-1-2013.md`); si ninguno coincide con el titulo, di que no hay PDF y no inventes entrada.

Antes de las entradas, abre el `.md` del banco (en `data/examenes/umss/ingenieria/`) y mira que la pregunta de riesgo pedida existe con ese numero.

## Qué entregar (no edites archivos; NO ejecutes comandos, no hay terminal)
En `RESPUESTA.md`, por examen: título impreso en la página 1 del PDF (para confirmar que es ese examen), preguntas de riesgo miradas, si enunciado/opciones/figura coinciden con el PDF (cita lo que dice el PDF cuando haya diferencia), y las preguntas con figura en el PDF que el banco tiene solo en texto (pendientes de `auditor-figuras`; no juzgues circuitos). Al final, las entradas JSON para pegar en `data/registro-verificacion.json` (mismo formato que las existentes, `completo:false`, fecha 2026-11-07, clave `ingenieria/<nombre-del-.md>`), en un solo bloque ```json. Si no puedes abrir un PDF, di cuál y no inventes su entrada.
