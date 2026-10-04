# Registro de exámenes del banco

> **Generado** por `node scripts/registro-examenes.mjs` el 2026-10-04. No se edita a mano.
> Lo que sale de los archivos y de git (preguntas, pendientes, fechas de carga) es automático.
> El **nivel de verificación** sale de `data/registro-verificacion.json` (se edita a mano o lo escribe un agente
> al terminar una auditoría). Si un examen no está ahí, figura como **sin registrar**: no se asume que esté verificado.

**Niveles de verificación:**
- `ninguna`: Transcrito, respuestas resueltas por el transcriptor, nada más.
- `resuelto-a-ciegas`: Un segundo agente resolvió todo sin ver la clave y coincidió.
- `contra-facsimil`: Contrastado pregunta por pregunta contra el PDF/foto original.
- `contra-resolucion-externa`: Contrastado además contra una resolución de instituto (no es clave oficial).
- `clave-oficial`: Contrastado contra una clave oficial de la facultad.

**Columnas:** *Decl.* = preguntas que declara el frontmatter, *Reales* = `## Pregunta` encontradas (si no coinciden, hay `faltantes` o un error),
*E* = respuestas "Ninguno", *Fig.* = preguntas con figura, *Pend.* = tiene `faltantes` o `secciones_pendientes`,
*Alta* = fecha del primer commit del archivo, *Últ.* = último cambio.

## economicas (10 exámenes, 181 preguntas)

Sin registro de verificación: **10** de 10. Con conteo que no cuadra: **1**.

| Examen | Fecha | Decl. | Reales | E | Fig. | Pend. | Alta | Últ. | Verificación |
|---|---|--:|--:|--:|--:|:-:|---|---|---|
| Examen de Admisión 1/2011 (1ra Opción) <br><sub>economicas/2011-1op-1-2011</sub> | 2011-02-03 | 14 | 14 | 0 | 0 | sí | 2026-09-14 | 2026-09-18 | sin registrar |
| Examen de Admisión 1/2011 (2da Opción) <br><sub>economicas/2011-2op-1-2011</sub> | 2011-02-19 | 14 | 13 ⚠ | 2 | 0 | sí | 2026-09-14 | 2026-09-18 | sin registrar |
| Examen de Admisión 1/2012 (1ra Opción) <br><sub>economicas/2012-1op-1-2012</sub> | 2012-01-28 | 13 | 13 | 2 | 0 | sí | 2026-09-14 | 2026-09-18 | sin registrar |
| Examen de Admisión 1/2012 (2da Opción) <br><sub>economicas/2012-2op-1-2012</sub> | 2012-02-08 | 14 | 14 | 0 | 0 | sí | 2026-09-14 | 2026-09-18 | sin registrar |
| Examen de Admisión II-2013 (1ra Opción) <br><sub>economicas/2013-1op-2-2013</sub> | 2013-07-20 | 24 | 24 | 2 | 0 | sí | 2026-09-14 | 2026-09-18 | sin registrar |
| Examen de Admisión II-2013 (2da Opción) <br><sub>economicas/2013-2op-2-2013</sub> | 2013-07-27 | 22 | 22 | 1 | 0 | sí | 2026-09-14 | 2026-09-18 | sin registrar |
| Examen de Admisión 1/2014 (1ra Opción) <br><sub>economicas/2014-1op-1-2014</sub> | 2014-02-01 | 24 | 24 | 1 | 0 | sí | 2026-09-14 | 2026-09-30 | sin registrar |
| Examen de Admisión 2/2014 (1ra Opción) <br><sub>economicas/2014-1op-2-2014</sub> | 2014-08-09 | 24 | 24 | 1 | 0 | sí | 2026-09-14 | 2026-09-30 | sin registrar |
| Examen de Admisión 1/2014 (2da Opción) <br><sub>economicas/2014-2op-1-2014</sub> | 2014-02-15 | 23 | 23 | 3 | 0 | sí | 2026-09-14 | 2026-09-30 | sin registrar |
| Examen de Ingreso 1-2023 (2da Opción) <br><sub>economicas/2023-2op-1-2023</sub> | 2023-01-18 | 10 | 10 | 1 | 0 |  | 2026-09-14 | 2026-09-14 | sin registrar |

## ingenieria (139 exámenes, 3569 preguntas)

Sin registro de verificación: **138** de 139. Con conteo que no cuadra: **0**.

| Examen | Fecha | Decl. | Reales | E | Fig. | Pend. | Alta | Últ. | Verificación |
|---|---|--:|--:|--:|--:|:-:|---|---|---|
| Examen de Ingreso 1-2005 (1ra Opción) <br><sub>ingenieria/2005-1op-1-2005</sub> |  | 20 | 20 | 1 | 1 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2005 (1ra Opción) <br><sub>ingenieria/2005-1op-2-2005</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-20 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2005 (2da Opción) <br><sub>ingenieria/2005-2op-1-2005</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2005 (2da Opción) <br><sub>ingenieria/2005-2op-2-2005</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2006 (1ra Opción) <br><sub>ingenieria/2006-1op-1-2006</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-20 | 2026-09-14 | contra-facsimil (2026-10-04) |
| Examen de Ingreso 1-2006 (2da Opción) <br><sub>ingenieria/2006-2op-1-2006</sub> |  | 20 | 20 | 0 | 1 |  | 2026-07-20 | 2026-09-14 | sin registrar |
| Primer Parcial · Curso Propedéutico (Gestión I-2006) <br><sub>ingenieria/2006-parcial1-1-2006</sub> |  | 38 | 38 | 1 | 0 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Primer Parcial · Curso Propedéutico (Gestión 2-2006) <br><sub>ingenieria/2006-parcial1-2-2006</sub> |  | 38 | 38 | 5 | 0 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso Propedéutico (Gestión I-2006) <br><sub>ingenieria/2006-parcial2-1-2006</sub> |  | 38 | 38 | 1 | 0 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso Propedéutico (Gestión 2-2006) <br><sub>ingenieria/2006-parcial2-2-2006</sub> |  | 38 | 38 | 2 | 0 |  | 2026-07-21 | 2026-09-16 | sin registrar |
| Tercer Parcial · Curso Propedéutico (Gestión I-2006) <br><sub>ingenieria/2006-parcial3-1-2006</sub> |  | 38 | 38 | 1 | 0 |  | 2026-07-20 | 2026-09-14 | sin registrar |
| Tercer Parcial · Curso Propedéutico (Gestión 2-2006) <br><sub>ingenieria/2006-parcial3-2-2006</sub> |  | 38 | 38 | 5 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Cuarto Parcial · Curso Propedéutico (Gestión I-2006) <br><sub>ingenieria/2006-parcial4-1-2006</sub> |  | 38 | 38 | 5 | 0 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Cuarto Parcial · Curso Propedéutico (Gestión 2-2006) <br><sub>ingenieria/2006-parcial4-2-2006</sub> |  | 38 | 38 | 0 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Examen de Ingreso 2-2006 (Única Opción) <br><sub>ingenieria/2006-unica-2-2006</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2007 (1ra Opción) <br><sub>ingenieria/2007-1op-1-2007</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2007 (2da Opción) <br><sub>ingenieria/2007-2op-1-2007</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Primer Parcial · Curso Propedéutico (Gestión 1-2007) <br><sub>ingenieria/2007-parcial1-1-2007</sub> |  | 38 | 38 | 0 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Primer Parcial · Curso Propedéutico (Gestión 2-2007) <br><sub>ingenieria/2007-parcial1-2-2007</sub> |  | 42 | 42 | 5 | 0 |  | 2026-07-21 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso Propedéutico (Gestión 1-2007) <br><sub>ingenieria/2007-parcial2-1-2007</sub> |  | 38 | 38 | 6 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Segundo Parcial · Curso Propedéutico (Gestión 2-2007) <br><sub>ingenieria/2007-parcial2-2-2007</sub> |  | 36 | 36 | 0 | 0 |  | 2026-07-21 | 2026-09-16 | sin registrar |
| Tercer Parcial · Curso Propedéutico (Gestión 1-2007) <br><sub>ingenieria/2007-parcial3-1-2007</sub> |  | 38 | 38 | 4 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Tercer Parcial · Curso Propedéutico (Gestión 2-2007) <br><sub>ingenieria/2007-parcial3-2-2007</sub> |  | 36 | 36 | 1 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Examen de Ingreso 2-2007 (Única Opción) <br><sub>ingenieria/2007-unica-2-2007</sub> |  | 20 | 20 | 2 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2008 (1ra Opción) <br><sub>ingenieria/2008-1op-1-2008</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Primer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008) <br><sub>ingenieria/2008-2curso-parcial1-2-2008</sub> |  | 30 | 30 | 0 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008) <br><sub>ingenieria/2008-2curso-parcial2-2-2008</sub> |  | 30 | 30 | 3 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Tercer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008) <br><sub>ingenieria/2008-2curso-parcial3-2-2008</sub> |  | 30 | 30 | 1 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2008 (2da Opción) <br><sub>ingenieria/2008-2op-1-2008</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-21 | 2026-09-14 | sin registrar |
| Primer Parcial · Curso Propedéutico (Gestión 1-2008) <br><sub>ingenieria/2008-parcial1-1-2008</sub> |  | 42 | 42 | 5 | 0 |  | 2026-07-21 | 2026-09-16 | sin registrar |
| Primer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2008) <br><sub>ingenieria/2008-parcial1-2-2008</sub> |  | 42 | 42 | 6 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso Propedéutico (Gestión 1-2008) <br><sub>ingenieria/2008-parcial2-1-2008</sub> |  | 42 | 42 | 3 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Primer Curso Pre-Facultativo (Gestión 2-2008) <br><sub>ingenieria/2008-parcial2-2-2008</sub> |  | 42 | 42 | 4 | 2 |  | 2026-07-26 | 2026-09-17 | sin registrar |
| Tercer Parcial · Curso Propedéutico (Gestión 1-2008) <br><sub>ingenieria/2008-parcial3-1-2008</sub> |  | 42 | 42 | 6 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Tercer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2008) <br><sub>ingenieria/2008-parcial3-2-2008</sub> |  | 30 | 30 | 1 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Examen de Ingreso 2-2008 (Única Opción) <br><sub>ingenieria/2008-unica-2-2008</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2009 (1ra Opción) <br><sub>ingenieria/2009-1op-1-2009</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Primer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2009) <br><sub>ingenieria/2009-2curso-parcial1-2-2009</sub> |  | 30 | 30 | 5 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2009) <br><sub>ingenieria/2009-2curso-parcial2-2-2009</sub> |  | 30 | 30 | 5 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2009 (2da Opción) <br><sub>ingenieria/2009-2op-1-2009</sub> |  | 20 | 20 | 2 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Primer Parcial · Curso Pre-Facultativo (Gestión 1-2009) <br><sub>ingenieria/2009-parcial1-1-2009</sub> |  | 30 | 30 | 2 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Primer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2009) <br><sub>ingenieria/2009-parcial1-2-2009</sub> |  | 30 | 30 | 3 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2009) <br><sub>ingenieria/2009-parcial2-1-2009</sub> |  | 30 | 30 | 6 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Primer Curso Pre-Facultativo (Gestión 2-2009) <br><sub>ingenieria/2009-parcial2-2-2009</sub> |  | 30 | 30 | 7 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Tercer Parcial · Curso Pre-Facultativo (Gestión 1-2009) <br><sub>ingenieria/2009-parcial3-1-2009</sub> |  | 30 | 30 | 3 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Tercer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2009) <br><sub>ingenieria/2009-parcial3-2-2009</sub> |  | 30 | 30 | 5 | 1 |  | 2026-07-26 | 2026-09-17 | sin registrar |
| Examen de Ingreso 2-2009 (Única Opción) <br><sub>ingenieria/2009-unica-2-2009</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2010 (1ra Opción) <br><sub>ingenieria/2010-1op-1-2010</sub> |  | 20 | 20 | 3 | 1 |  | 2026-07-26 | 2026-09-17 | sin registrar |
| Examen Final · Segundo Curso Pre-Facultativo (Gestión 2-2010) <br><sub>ingenieria/2010-2curso-final-2-2010</sub> |  | 34 | 34 | 4 | 1 |  | 2026-07-26 | 2026-09-17 | sin registrar |
| Primer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2010) <br><sub>ingenieria/2010-2curso-parcial1-2-2010</sub> |  | 29 | 29 | 4 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2010) <br><sub>ingenieria/2010-2curso-parcial2-2-2010</sub> |  | 25 | 25 | 3 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2010 (2da Opción) <br><sub>ingenieria/2010-2op-1-2010</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Examen Final · Primer Curso Pre-Facultativo (Gestión 2-2010) <br><sub>ingenieria/2010-final-2-2010</sub> |  | 34 | 34 | 2 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Primer Parcial · Curso Pre-Facultativo (Gestión 1-2010) <br><sub>ingenieria/2010-parcial1-1-2010</sub> |  | 25 | 25 | 3 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Primer Parcial · Primer Curso Pre-Facultativo (Gestión 2-2010) <br><sub>ingenieria/2010-parcial1-2-2010</sub> |  | 25 | 25 | 4 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2010) <br><sub>ingenieria/2010-parcial2-1-2010</sub> |  | 25 | 25 | 3 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Primer Curso Pre-Facultativo (Gestión 2-2010) <br><sub>ingenieria/2010-parcial2-2-2010</sub> |  | 25 | 25 | 4 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Tercer Parcial · Curso Pre-Facultativo (Gestión 1-2010) <br><sub>ingenieria/2010-parcial3-1-2010</sub> |  | 25 | 25 | 2 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Examen de Ingreso 2-2010 (Única Opción) <br><sub>ingenieria/2010-unica-2-2010</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2011 (1ra Opción) <br><sub>ingenieria/2011-1op-1-2011</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2011 (2da Opción) <br><sub>ingenieria/2011-2op-1-2011</sub> |  | 20 | 20 | 2 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| "Examen Final · Curso Pre-Facultativo (Gestión 1-2011)" <br><sub>ingenieria/2011-final-1-2011</sub> |  | 34 | 34 | 5 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Examen Final · Curso Pre-Facultativo (Gestión 2-2011) <br><sub>ingenieria/2011-final-2-2011</sub> |  | 30 | 30 | 4 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Primer Parcial · Curso Pre-Facultativo (Gestión 1-2011) <br><sub>ingenieria/2011-parcial1-1-2011</sub> |  | 34 | 34 | 2 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Primer Parcial · Curso Pre-Facultativo (Gestión 2-2011) <br><sub>ingenieria/2011-parcial1-2-2011</sub> |  | 30 | 30 | 6 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2011) <br><sub>ingenieria/2011-parcial2-1-2011</sub> |  | 30 | 30 | 4 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso Pre-Facultativo (Gestión 2-2011) <br><sub>ingenieria/2011-parcial2-2-2011</sub> |  | 30 | 30 | 9 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| "Examen de Ingreso 2-2011 · Única Opción" <br><sub>ingenieria/2011-unica-2-2011</sub> |  | 20 | 20 | 4 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Primer Examen de Ingreso 1-2012 <br><sub>ingenieria/2012-1op-1-2012</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| "Segundo Examen de Ingreso 1-2012" <br><sub>ingenieria/2012-2op-1-2012</sub> |  | 20 | 20 | 0 | 1 |  | 2026-07-26 | 2026-09-17 | sin registrar |
| Examen Final · Curso Pre-Facultativo (Gestión 2-2013) <br><sub>ingenieria/2013-final-2-2013</sub> |  | 30 | 30 | 0 | 1 |  | 2026-07-26 | 2026-09-17 | sin registrar |
| Primer Parcial · Curso Pre-Facultativo (Gestión 1-2013) <br><sub>ingenieria/2013-parcial1-1-2013</sub> |  | 30 | 30 | 4 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| "Primer Parcial · Curso Pre-Facultativo (Gestión 2-2013)" <br><sub>ingenieria/2013-parcial1-2-2013</sub> |  | 30 | 30 | 4 | 0 |  | 2026-07-26 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2013) <br><sub>ingenieria/2013-parcial2-1-2013</sub> |  | 30 | 30 | 3 | 1 |  | 2026-07-26 | 2026-09-17 | sin registrar |
| Segundo Parcial · Curso Pre-Facultativo (Gestión 2-2013) <br><sub>ingenieria/2013-parcial2-2-2013</sub> |  | 30 | 30 | 2 | 1 |  | 2026-07-26 | 2026-09-17 | sin registrar |
| Examen de Ingreso 2-2013 <br><sub>ingenieria/2013-unica-2-2013</sub> |  | 20 | 20 | 2 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2014 <br><sub>ingenieria/2014-1op-1-2014</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-26 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2014 (Segunda Opción) <br><sub>ingenieria/2014-2op-1-2014</sub> |  | 20 | 20 | 3 | 0 |  | 2026-07-27 | 2026-09-14 | sin registrar |
| "Examen Final · Curso Pre-Facultativo (Gestión 1-2014)" <br><sub>ingenieria/2014-final-1-2014</sub> |  | 30 | 30 | 0 | 0 |  | 2026-07-27 | 2026-09-14 | sin registrar |
| "Examen Final · Curso Pre-Facultativo (Gestión 2-2014)" <br><sub>ingenieria/2014-final-2-2014</sub> |  | 30 | 30 | 4 | 2 |  | 2026-07-27 | 2026-09-17 | sin registrar |
| "Primer Parcial · Curso Pre-Facultativo (Gestión 1-2014)" <br><sub>ingenieria/2014-parcial1-1-2014</sub> |  | 30 | 30 | 3 | 0 |  | 2026-07-27 | 2026-09-16 | sin registrar |
| "Primer Parcial · Curso Pre-Facultativo (Gestión 2-2014)" <br><sub>ingenieria/2014-parcial1-2-2014</sub> |  | 30 | 30 | 3 | 1 |  | 2026-07-27 | 2026-09-17 | sin registrar |
| Segundo Parcial · Curso Pre-Facultativo (Gestión 1-2014) <br><sub>ingenieria/2014-parcial2-1-2014</sub> |  | 30 | 30 | 2 | 0 |  | 2026-07-27 | 2026-09-14 | sin registrar |
| "Segundo Parcial · Curso Pre-Facultativo (Gestión 2-2014)" <br><sub>ingenieria/2014-parcial2-2-2014</sub> |  | 30 | 30 | 3 | 1 |  | 2026-07-27 | 2026-09-17 | sin registrar |
| Examen de Ingreso 2-2014 <br><sub>ingenieria/2014-unica-2-2014</sub> |  | 20 | 20 | 0 | 1 |  | 2026-07-27 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2015 <br><sub>ingenieria/2015-1op-1-2015</sub> |  | 20 | 20 | 1 | 2 |  | 2026-07-27 | 2026-09-18 | sin registrar |
| Examen de Ingreso 2-2015 (1ra Opción) <br><sub>ingenieria/2015-1op-2-2015</sub> |  | 20 | 20 | 2 | 3 |  | 2026-07-27 | 2026-09-18 | sin registrar |
| Examen de Ingreso 1-2015 (Segunda Opción) <br><sub>ingenieria/2015-2op-1-2015</sub> |  | 20 | 20 | 1 | 1 |  | 2026-07-27 | 2026-09-18 | sin registrar |
| Examen de Ingreso 2-2015 (2da Opción) <br><sub>ingenieria/2015-2op-2-2015</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-27 | 2026-09-18 | sin registrar |
| Examen de Ingreso 1-2016 (1ra Opción) <br><sub>ingenieria/2016-1op-1-2016</sub> |  | 20 | 20 | 1 | 4 |  | 2026-07-27 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2016 (1ra Opción) <br><sub>ingenieria/2016-1op-2-2016</sub> |  | 20 | 20 | 0 | 4 |  | 2026-07-27 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2016 (2da Opción) <br><sub>ingenieria/2016-2op-1-2016</sub> |  | 20 | 20 | 1 | 3 |  | 2026-07-27 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2016 (2da Opción) <br><sub>ingenieria/2016-2op-2-2016</sub> |  | 20 | 20 | 2 | 3 |  | 2026-07-27 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2016 (3ra Opción) <br><sub>ingenieria/2016-3op-1-2016</sub> | 2016-03-31 | 20 | 20 | 3 | 3 |  | 2026-07-27 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2017 (1ra Opción) <br><sub>ingenieria/2017-1op-1-2017</sub> |  | 20 | 20 | 1 | 1 |  | 2026-07-27 | 2026-09-17 | sin registrar |
| Examen de Ingreso 2-2017 (1ra Opción) <br><sub>ingenieria/2017-1op-2-2017</sub> |  | 20 | 20 | 2 | 1 |  | 2026-07-28 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2017 (2da Opción) <br><sub>ingenieria/2017-2op-1-2017</sub> |  | 20 | 20 | 2 | 3 |  | 2026-07-27 | 2026-09-17 | sin registrar |
| Examen de Ingreso 2-2017 (2da Opción) <br><sub>ingenieria/2017-2op-2-2017</sub> |  | 20 | 20 | 1 | 1 |  | 2026-07-28 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2017 (3ra Opción) <br><sub>ingenieria/2017-3op-1-2017</sub> |  | 20 | 20 | 2 | 3 |  | 2026-07-27 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2018 (1ra Opción) <br><sub>ingenieria/2018-1op-1-2018</sub> |  | 20 | 20 | 3 | 1 |  | 2026-07-28 | 2026-09-18 | sin registrar |
| Examen de Ingreso 2-2018 (1ra Opción) <br><sub>ingenieria/2018-1op-2-2018</sub> |  | 20 | 20 | 1 | 1 |  | 2026-07-28 | 2026-09-18 | sin registrar |
| Examen de Ingreso 1-2018 (2da Opción) <br><sub>ingenieria/2018-2op-1-2018</sub> |  | 20 | 20 | 0 | 2 |  | 2026-07-28 | 2026-09-17 | sin registrar |
| Examen de Ingreso 2-2018 (2da Opción) <br><sub>ingenieria/2018-2op-2-2018</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-28 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2018 (3ra Opción) <br><sub>ingenieria/2018-3op-1-2018</sub> |  | 20 | 20 | 1 | 1 |  | 2026-07-28 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2019 (1ra Opción) <br><sub>ingenieria/2019-1op-1-2019</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-28 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2019 (1ra Opción) <br><sub>ingenieria/2019-1op-2-2019</sub> |  | 20 | 20 | 0 | 1 |  | 2026-07-28 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2019 (2da Opción) <br><sub>ingenieria/2019-2op-1-2019</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-28 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2019 (2da Opción) <br><sub>ingenieria/2019-2op-2-2019</sub> |  | 20 | 20 | 0 | 1 |  | 2026-07-28 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2019 (3ra Opción) <br><sub>ingenieria/2019-3op-1-2019</sub> |  | 20 | 20 | 0 | 1 |  | 2026-07-28 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2020 (1ra Opción) <br><sub>ingenieria/2020-1op-1-2020</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-28 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2020 (2da Opción) <br><sub>ingenieria/2020-2op-1-2020</sub> |  | 20 | 20 | 0 | 0 |  | 2026-07-28 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2020 (3ra Opción) <br><sub>ingenieria/2020-3op-1-2020</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-28 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2022 (1ra Opción) <br><sub>ingenieria/2022-1op-2-2022</sub> | 2022-05-31 | 20 | 20 | 1 | 6 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2022 (2da Opción) <br><sub>ingenieria/2022-2op-2-2022</sub> | 2022-06-28 | 20 | 20 | 3 | 4 |  | 2026-07-20 | 2026-09-17 | sin registrar |
| Examen de Ingreso 2-2022 (3ra Opción) <br><sub>ingenieria/2022-3op-2-2022</sub> | 2022-08-05 | 20 | 20 | 0 | 2 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2023 (1ra Opción) <br><sub>ingenieria/2023-1op-1-2023</sub> | 2022-12-19 | 20 | 20 | 4 | 6 |  | 2026-07-18 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2023 (1ra Opción) <br><sub>ingenieria/2023-1op-2-2023</sub> | 2023-06-13 | 20 | 20 | 2 | 5 |  | 2026-07-28 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2023 (2da Opción) <br><sub>ingenieria/2023-2op-1-2023</sub> | 2023-01-19 | 20 | 20 | 1 | 5 |  | 2026-07-20 | 2026-09-16 | sin registrar |
| Examen de Ingreso 2-2023 (2da Opción) <br><sub>ingenieria/2023-2op-2-2023</sub> | 2023-07-11 | 20 | 20 | 1 | 4 |  | 2026-07-28 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2023 (3ra Opción) <br><sub>ingenieria/2023-3op-1-2023</sub> | 2023-02-07 | 20 | 20 | 1 | 3 |  | 2026-07-20 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2024 (1ra Opción) <br><sub>ingenieria/2024-1op-1-2024</sub> | 2023-12-19 | 20 | 20 | 1 | 1 |  | 2026-07-28 | 2026-09-14 | sin registrar |
| Examen de Ingreso 1-2024 (2da Opción) <br><sub>ingenieria/2024-2op-1-2024</sub> | 2024-01-12 | 20 | 20 | 0 | 3 |  | 2026-07-28 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2024 (3ra Opción) <br><sub>ingenieria/2024-3op-1-2024</sub> | 2024-01-29 | 20 | 20 | 2 | 1 |  | 2026-07-29 | 2026-09-16 | sin registrar |
| Examen Final · Curso PRE-U (Gestión 1-2024) <br><sub>ingenieria/2024-final-1-2024</sub> |  | 40 | 40 | 1 | 3 |  | 2026-07-29 | 2026-09-17 | sin registrar |
| "Examen Final · Curso PRE-U (Gestión 2-2024)" <br><sub>ingenieria/2024-final-2-2024</sub> |  | 30 | 30 | 0 | 0 |  | 2026-07-30 | 2026-09-18 | sin registrar |
| "Primer Parcial · Curso PRE-U (Gestión 1-2024)" <br><sub>ingenieria/2024-parcial1-1-2024</sub> |  | 40 | 40 | 1 | 3 |  | 2026-07-29 | 2026-09-17 | sin registrar |
| "Primer Parcial · Curso PRE-U (Gestión 2-2024)" <br><sub>ingenieria/2024-parcial1-2-2024</sub> |  | 38 | 38 | 0 | 3 |  | 2026-07-30 | 2026-09-17 | sin registrar |
| "Segundo Parcial · Curso PRE-U (Gestión 1-2024)" <br><sub>ingenieria/2024-parcial2-1-2024</sub> |  | 40 | 40 | 2 | 1 |  | 2026-07-29 | 2026-09-17 | sin registrar |
| "Segundo Parcial · Curso PRE-U (Gestión 2-2024)" <br><sub>ingenieria/2024-parcial2-2-2024</sub> |  | 30 | 30 | 0 | 1 |  | 2026-07-30 | 2026-09-17 | sin registrar |
| Examen de Ingreso 2-2024 <br><sub>ingenieria/2024-Uop-2-2024</sub> | 2024-08-09 | 20 | 20 | 3 | 3 |  | 2026-07-29 | 2026-09-17 | sin registrar |
| Examen de Ingreso 1-2025 (1ra Opción) <br><sub>ingenieria/2025-1op-1-2025</sub> | 2025-01-23 | 20 | 20 | 0 | 2 |  | 2026-07-29 | 2026-09-12 | sin registrar |
| Examen de Ingreso 2-2025 (1ra Opción) <br><sub>ingenieria/2025-1op-2-2025</sub> | 2025-07-21 | 15 | 15 | 2 | 0 |  | 2026-07-18 | 2026-09-16 | sin registrar |
| Examen de Ingreso 1-2025 (2da Opción) <br><sub>ingenieria/2025-2op-1-2025</sub> | 2025-02-05 | 20 | 20 | 0 | 2 |  | 2026-07-29 | 2026-09-12 | sin registrar |
| Examen de Ingreso 2-2025 (2da Opción) <br><sub>ingenieria/2025-2op-2-2025</sub> | 2025-07-30 | 13 | 13 | 0 | 0 |  | 2026-07-18 | 2026-07-18 | sin registrar |
| Examen de Ingreso 2-2025 (2da Opción, Versión B — con Biología) <br><sub>ingenieria/2025-2op-2-2025-version-b</sub> | 2025-07-30 | 4 | 4 | 0 | 0 |  | 2026-07-18 | 2026-07-18 | sin registrar |
| Examen de Ingreso 1-2025 (3ra Opción) <br><sub>ingenieria/2025-3op-1-2025</sub> | 2025-02-20 | 12 | 12 | 0 | 0 |  | 2026-07-18 | 2026-09-14 | sin registrar |
| "Examen Final · Curso PRE-U (Gestión 1-2025)" <br><sub>ingenieria/2025-final-1-2025</sub> |  | 20 | 20 | 1 | 2 |  | 2026-07-30 | 2026-09-18 | sin registrar |
| "Primer Parcial · Curso PRE-U (Gestión 1-2025)" <br><sub>ingenieria/2025-parcial1-1-2025</sub> |  | 20 | 20 | 1 | 0 |  | 2026-07-30 | 2026-09-16 | sin registrar |
| Segundo Parcial · Curso PRE-U (Gestión 1-2025) <br><sub>ingenieria/2025-parcial2-1-2025</sub> |  | 20 | 20 | 1 | 1 |  | 2026-07-30 | 2026-09-17 | sin registrar |

## medicina (1 exámenes, 98 preguntas)

Sin registro de verificación: **1** de 1. Con conteo que no cuadra: **1**.

| Examen | Fecha | Decl. | Reales | E | Fig. | Pend. | Alta | Últ. | Verificación |
|---|---|--:|--:|--:|--:|:-:|---|---|---|
| Segundo Parcial · Curso Básico 2024-2025 <br><sub>medicina/2025-segundo-parcial-curso-basico-2024-2025</sub> | 2025-01-23 | 100 | 98 ⚠ | 8 | 0 | sí | 2026-09-30 | 2026-09-30 | sin registrar |

