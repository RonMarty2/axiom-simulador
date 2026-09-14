# Inventario de facsímiles

Para qué existe: cuando aparece un PDF nuevo, la pregunta siempre es la misma —
**¿esto ya lo tengo?** y **¿está completo?**. Este archivo la contesta sin tener
que abrir nada. Se actualiza cada vez que entra o sale un PDF.

**Última revisión:** 2026-09-14

---

## Cómo está organizado

```
examenes pasados/
├── FCYT/                     Facultad de Ciencias y Tecnología (lo que llamamos "ingeniería")
│   ├── *.pdf                 exámenes fechados: admisión, parciales, finales
│   └── bancos-de-practica/   material de estudio por materia, NO son exámenes
└── FCE/                      Facultad de Ciencias Económicas
    └── bancos-de-practica/
```

**FCYT vs. "ingeniería".** En el código la carrera se llama `ingenieria`
(`data/examenes/umss/ingenieria/`), pero el nombre real de la facultad es FCYT.
Las carpetas de acá usan el nombre real; el código quedó con el viejo. Si algún
día se renombra, hay que tocar `FacultadId` en `data-store.ts`, la tabla
`facultades` de Supabase y los 139 archivos del banco — no es gratis, y por eso
sigue como está. Anotado para que nadie se confunda.

**Dos tipos de documento, y la diferencia importa:**

| | Exámenes fechados | Bancos de práctica |
|---|---|---|
| Qué son | El examen que rindieron ese día | Material de estudio por materia |
| Tienen | Fecha, opción, ponderación | Solo el tema y la gestión |
| Van al banco | Sí, uno a uno | Solo como preguntas sueltas, si se decide |

---

## FCYT · exámenes fechados

**135 PDFs · 2005-2025 · todos transcriptos** → `data/examenes/umss/ingenieria/`
(139 exámenes; algunos PDFs traen más de uno adentro).

Años cubiertos: 2005 a 2025. **Falta 2021**, que no aparece en ningún PDF.

---

## FCYT · bancos de práctica  ⟶ NUEVOS, sin transcribir

Los cinco entraron el 14-sep-2026. Vienen del mismo compilador
(vonmoscov.blogspot.com / pablomoscoso.es.tl), que juntó material del Curso
Prefacultativo de las gestiones **2011 y 2012**.

**No se pisan con los exámenes fechados.** El banco ya tiene los *parciales y
finales* de 2011-2012; esto son las *prácticas* que se daban para preparar esos
parciales. Mismo período, documento distinto.

| Archivo | Pág. | Qué trae adentro |
|---|---|---|
| `FCYT_Banco_Fisica.pdf` | 145 | Banco de preguntas II/2012, un solo bloque continuo. Las respuestas vienen al pie de cada pregunta. |
| `FCYT_Banco_Biologia.pdf` | 143 | Banco de Biología, 1ra Evaluación Pre-Facultativo II/2012. |
| `FCYT_Banco_Quimica.pdf` | 105 | 8 bloques: bancos y prácticas de 1er y 2do parcial, gestiones 2011-2012. |
| `FCYT_Banco_AritmeticaAlgebra.pdf` | 57 | 5 bloques: prácticas N°1 y de 2do parcial, gestiones I-2011, II-2011, II-2012. |
| `FCYT_Banco_GeometriaTrigonometria.pdf` | 35 | 4 bloques: prácticas de I-2011, II-2011 y II-2012. |

---

## FCE · exámenes fechados

**Ninguno suelto todavía.** Los que hay están adentro de los bancos de práctica
(ver abajo) y hay que extraerlos.

En el banco hay **un solo examen** de Económicas: `2023.md`, contra los 139 de
FCYT. Es el cuello de botella de esa carrera.

---

## FCE · bancos de práctica  ⟶ NUEVOS, sin transcribir

| Archivo | Pág. | Qué trae adentro |
|---|---|---|
| `FCE_Banco_Lenguaje.pdf` | 71 | Banco de Lenguaje. Adentro, en la pág. 4: **Examen de Ingreso 1/2015 (1ra opción)**. |
| `FCE_Guia_HistoriaGeneral.pdf` | 84 | "Guía para el examen de ingreso · FCE", Historia General (págs. 2-26). En la pág. 82: **Examen de Ingreso 2/2014 (2da opción)**. |
| `FCE_Banco_Matematicas.pdf` | 55 | Banco de Matemáticas. Adentro: **Examen de Ingreso 2/2014 (2da opción)** (pág. 5) y **Examen de Admisión 1/2014 (1ra y 2da opción)** (págs. 2 y 7). |

### Exámenes de FCE que hay adentro

**37 exámenes, de 2005 a 2017.** Ninguno está en el banco todavía; el banco
tiene uno solo de Económicas (1-2023). Esto es lo que saca a esa carrera del
cuello de botella.

Salió de pasar los tres PDF **enteros** por OCR. El primer relevamiento decía
"4 exámenes" porque solo miraba la banda superior de cada hoja y se perdía
todo lo que no tuviera encabezado ahí.

Cada fila es **un examen**: la misma gestión y opción, aunque sus materias
estén repartidas entre los tres PDF. `—` es una materia que ese examen tomó y
no aparece en ningún PDF: se declara `secciones_pendientes` (regla 3).

| Gestión | Opción | Matemáticas | Lenguaje | Historia |
|---|---|---|---|---|
| 1/2017 | 1ra | Banco_Matematicas p.18 · 10p | — | — |
| 2/2015 | ? | — | Banco_Lenguaje p.2 · 10p | — |
| 1/2015 | 1ra | — | Banco_Lenguaje p.4 · 10p | — |
| 4/2014 | 2da | — | Banco_Lenguaje p.12 · 10p | — |
| 2/2014 | 1ra | Banco_Matematicas p.4 | Banco_Lenguaje p.6 · 10p | Guia_HistoriaGeneral p.81 |
| 2/2014 | 2da | — | Banco_Lenguaje p.10 · 10p | Guia_HistoriaGeneral p.82 · 10p |
| 1/2014 | 1ra | Banco_Matematicas p.2 | Banco_Lenguaje p.18 | Guia_HistoriaGeneral p.79 · 10p |
| 1/2014 | 2da | Banco_Matematicas p.7 · 10p | Banco_Lenguaje p.8 · 10p | Guia_HistoriaGeneral p.83 |
| 1/2013 | 1ra | Banco_Matematicas p.9 · 10p | Banco_Lenguaje p.30 · 10p | Guia_HistoriaGeneral p.74 · 10p |
| 1/2013 | 2da | Banco_Matematicas p.8 | Banco_Lenguaje p.26 · 10p | Guia_HistoriaGeneral p.73 · 10p |
| 1/2012 | ? | — | Banco_Lenguaje p.36 · 19p | Guia_HistoriaGeneral p.72 |
| 1/2012 | 1ra | Banco_Matematicas p.12 | Banco_Lenguaje p.34 · 10p | Guia_HistoriaGeneral p.69 |
| 1/2012 | 2da | Banco_Matematicas p.15 · 10p | — | — |
| 2/2011 | 1ra | — | — | Guia_HistoriaGeneral p.65 |
| 1/2011 | 1ra | — | Banco_Lenguaje p.46 · 10p | Guia_HistoriaGeneral p.61 · 10p |
| 1/2011 | 2da | Banco_Matematicas p.20 · 10p | Banco_Lenguaje p.44 · 10p | Guia_HistoriaGeneral p.63 · 10p |
| 2/2010 | ? | — | Banco_Lenguaje p.54 · 10p | Guia_HistoriaGeneral p.55 |
| 2/2010 | 2da | Banco_Matematicas p.30 · 10p | Banco_Lenguaje p.57 · 10p | Guia_HistoriaGeneral p.57 · 10p |
| 2/2010 | 3ra | — | Banco_Lenguaje p.50 · 10p | Guia_HistoriaGeneral p.59 · 10p |
| 1/2010 | ? | Banco_Matematicas p.22 · 15p | — | Guia_HistoriaGeneral p.53 · 15p |
| 1/2010 | 2da | Banco_Matematicas p.24 · 15p | Banco_Lenguaje p.52 · 15p | Guia_HistoriaGeneral p.51 · 15p |
| 1/2010 | única | — | Banco_Lenguaje p.58 | — |
| 4/2009 | 1ra | — | Banco_Lenguaje p.64 · 15p | — |
| 2/2009 | única | Banco_Matematicas p.38 | Banco_Lenguaje p.60 · 15p | — |
| 1/2009 | ? | — | — | Guia_HistoriaGeneral p.45 · 15p |
| 1/2009 | 1ra | Banco_Matematicas p.34 · 15p | — | — |
| 1/2009 | 2da | Banco_Matematicas p.36 | — | Guia_HistoriaGeneral p.47 |
| 2/2008 | 1ra | Banco_Matematicas p.44 · 15p | Banco_Lenguaje p.68 · 15p | — |
| 2/2008 | 2da | Banco_Matematicas p.42 · 15p | Banco_Lenguaje p.66 | Guia_HistoriaGeneral p.41 · 15p |
| 1/2008 | 1ra | Banco_Matematicas p.40 · 15p | Banco_Lenguaje p.70 · 15p | Guia_HistoriaGeneral p.39 · 15p |
| 1/2008 | 2da | — | — | Guia_HistoriaGeneral p.37 · 15p |
| 2/2007 | ? | — | — | Guia_HistoriaGeneral p.30 |
| 1/2007 | ? | Banco_Matematicas p.48 · 15p | — | — |
| 1/2007 | 1ra | — | — | Guia_HistoriaGeneral p.29 · 15p |
| 1/2007 | 2da | — | — | Guia_HistoriaGeneral p.27 · 15p |
| 1/2006 | 2da | Banco_Matematicas p.54 | — | — |
| 5/2005 | ? | — | — | Guia_HistoriaGeneral p.2 |

**11 de los 37 tienen las tres materias.** Por ahí conviene empezar.

**Transcriptos hasta ahora: 4 de 37.** Los dos con su Matemáticas completa y
Lenguaje e Historia declaradas pendientes:

| Examen | Archivo |
|---|---|
| Admisión II-2013 (1ra opción) · 20-jul-2013 | `economicas/2013-1op-2-2013.md` |
| Admisión II-2013 (2da opción) · 27-jul-2013 | `economicas/2013-2op-2-2013.md` |
| Admisión 1/2014 (1ra opción) · 1-feb-2014 | `economicas/2014-1op-1-2014.md` |
| Admisión 1/2014 (2da opción) · sin fecha en la hoja | `economicas/2014-2op-1-2014.md` |

### Encabezados REALES del banco de Matemáticas

Leídos a ojo, no por OCR — es la lista con la que hay que trabajar, porque la
tabla de arriba tiene mal la gestión. Nótese que la notación es mixta: 2013 usa
números romanos (`II-2013`) y 2014 usa arábigos (`1/2014`), pero significan lo
mismo.

| Pág. | Examen | Fecha |
|---|---|---|
| 2 | Admisión **1/2014** (primera opción) ✅ transcripto | 1-feb-2014 |
| 4 | Admisión **2/2014** (primera opción) | — |
| 7 | Admisión **1/2014** (segunda opción) ✅ transcripto | sin fecha |
| 8 | Admisión **II-2013** (segunda opción) ✅ transcripto | 27-jul-2013 |
| 9 | Admisión **II-2013** (primera opción) ✅ transcripto | 20-jul-2013 |
| 12 | Admisión **1/2012** (primera opción) | — |
| 15 | Admisión **1/2012** (segunda opción) | — |
| 22 | Admisión **1/2010** (primera opción) | — |

Las páginas 18 y 20 tienen el encabezado más abajo en la hoja y el recorte no
lo agarró: hay que mirarlas enteras.

**Lo que hay que confirmar a mano antes de transcribir:**

- **EL OCR NO LEE NÚMEROS ROMANOS, y la columna Gestión está mal por eso.**
  La UMSS escribe "I-2013" y "II-2013"; el OCR devuelve "1/2013" para las dos.
  Ya pasó: la página 30 del banco de Lenguaje parecía ser la parte de Lenguaje
  del examen II-2013 y resultó ser de I-2013, otro examen, de seis meses antes.
  **Antes de juntar dos secciones hay que abrir las dos páginas y comparar el
  encabezado completo, con fecha.** La gestión de la tabla es una pista, no un
  dato.
- Las opciones marcadas `?` son las que el OCR no pudo leer. Hay que abrir esa
  página y mirarla.
- Las gestiones `4/2014`, `5/2005` y `2/2015` son sospechosas: la UMSS toma
  gestión 1 y 2. O el OCR leyó mal un dígito, o son convocatorias
  extraordinarias. Verificar antes de crear el archivo.
- La cantidad de preguntas cambia según el año: 10 por área en los exámenes
  recientes, 15 en los de 2008-2010. No asumir.
---

## Convención para lo que no se puede leer

Los escaneos vienen torcidos, con sellos encima y páginas veladas. Cuando una
pregunta **no se pueda leer**, no se saltea ni se renumera: se deja el lugar
marcado, con la fuente exacta, para poder completarla el día que aparezca un
escaneo mejor.

En el frontmatter del examen:

```yaml
faltantes:
  - numero: 7
    motivo: ilegible
    fuente: "FCE/bancos-de-practica/FCE_Banco_Matematicas.pdf p.9"
  - numero: 12
    motivo: pagina-ausente
    fuente: "FCE/bancos-de-practica/FCE_Banco_Matematicas.pdf p.11"
```

Reglas:

1. **La numeración no se toca.** Si falta la 7, la siguiente sigue siendo la 8.
   Renumerar hace imposible cruzarlo después con el facsímil.
2. **Siempre archivo y página.** "No se leía" sin la referencia no sirve de nada
   dentro de seis meses.
3. `motivo` dice qué pasó: `ilegible` (está pero no se lee), `pagina-ausente`
   (el PDF no la trae), `sin-opciones` (está el enunciado pero no las
   alternativas), `sin-respuesta` (está todo menos cuál es la correcta).
4. El examen se publica igual con las preguntas que sí se leen. Es mejor un
   examen de 8 preguntas honesto que uno de 10 con dos inventadas.

---

## Antes de agregar un PDF nuevo

1. Fijate en la tabla de arriba si el título interno ya está listado.
2. Si no está: ¿es un **examen fechado** o un **banco de práctica**? Va a la
   carpeta que corresponda.
3. Ponele un nombre que se entienda. Los archivos llegan con nombres tipo
   `cd4a6956ed319701-high.pdf`, que no le dicen nada a nadie.
4. Agregalo acá con sus páginas y lo que trae adentro, aunque todavía no se
   transcriba. El inventario tiene que reflejar lo que hay en disco, no lo que
   ya se procesó.

---

# Plan acordado (14-sep-2026) — PARA RETOMAR

Si estás retomando esto desde cero, leé esta sección entera antes de tocar nada.
Son decisiones tomadas con Ronald, no propuestas.

## Las reglas que se acordaron

**1 · Manda la gestión, no la pregunta.** El alumno busca "Prefacultativo
II-2012" o "Admisión 1/2014", nunca un ejercicio suelto. Los exámenes se
nombran `{año}-{tipo}-{gestión}-{año}.md`, igual que FCYT.

**2 · Un examen es la suma de sus partes.** Los facsímiles vienen partidos por
materia entre varios PDF. Todo lo que lleve la misma etiqueta ("1/2014
admisión") es **el mismo examen**, venga del PDF que venga, y va a un solo
archivo.

**3 · Las secciones que faltan EXISTEN igual, vacías.** Si de una gestión no
aparece Historia, la `ponderacion` la declara igual y el examen anota que está
pendiente. En pantalla el alumno ve las tres materias: dos con preguntas y una
que dice "Próximamente". **Nunca se debe romper la idea de que está viendo el
examen completo de esa gestión.**

```yaml
ponderacion:
  matematicas: 0.34
  lenguaje: 0.33
  historia: 0.33
secciones_pendientes:
  historia: no-esta-en-ningun-pdf
```

**4 · Los ejercicios de práctica NO son exámenes.** Van al banco de preguntas
sueltas (`/admin/banco`), etiquetados por área y **tema**. El simulador ya los
mezcla solo: `construirSimulador` arma un pool con las preguntas de los `.md`
**más** `listarPreguntas()`, y de ahí salen los modos Mixto, Por tema y
Predictivo. Lo que decide si un ejercicio sirve es la etiqueta `tema`, no el
copiado.

**5 · Ninguna respuesta del PDF se copia sin verificar.** Se resuelve de cero.
Donde no coincida con lo impreso, queda la derivación escrita en el archivo.
Ya pasó dos veces (Pregunta 1 del 2023, circuito del 2006 2da opción).

**6 · Si una pregunta no se puede leer, se deja el hueco.** No se saltea ni se
renumera. Ver "Convención para lo que no se puede leer" más arriba.

## Estado de las fases

- [x] **Fase 1 · Fijar el contrato.** `data/facultades.json` corregido: las
      áreas que declaraba no existían en ningún examen. Ver abajo.
- [x] **Fase 2 · Que la pantalla muestre los huecos.** Hecha. `secciones_pendientes`
      es un mapa `{ area: motivo }` en el frontmatter, con la misma forma que
      `ponderacion` — `parseFrontmatter` lee los dos con el mismo código. En
      `/resueltos/[examenId]` la materia pendiente sale como chip con candado
      ("Lenguaje · próximamente"), y en `/examenes/[id]` sale un aviso arriba
      de las preguntas. `listarMetadata` la suma al `areas_resumen` con
      cantidad 0. De paso se unificaron las 5 copias sueltas de ETIQUETAS_AREA,
      que iban a quedarse sin "lenguaje" e "historia" cada una por su lado.
- [x] **Fase 3 · Económicas al molde.** Hecha. `2023.md` pasó a
      `2023-2op-1-2023.md` con `categoria: admision`, `opcion: 2da Opción` y
      `titulo: Examen de Ingreso 1-2023 (2da Opción)`. La convocatoria está
      INFERIDA de la fecha (18-ene-2023) contra el calendario de FCyT de ese
      año, que tomó la 2da opción el 19-ene: la UMSS toma la misma
      convocatoria en días consecutivos entre facultades. Queda anotado en el
      propio archivo por si aparece el facsímil y dice otra cosa. Sus otras
      áreas NO se declararon pendientes: no hay con qué probar cuáles tomó.
- [ ] **Fase 4 · Los 4 exámenes de FCE.** Uno por gestión (ver la tabla de
      arriba). Antes de escribir un solo `.md` hay que releer los tres PDF a
      fondo: el escaneo por OCR encontró los encabezados pero **no es
      exhaustivo**, puede haber secciones que no detectó.
- [ ] **Fase 5 · Los ejercicios de práctica de FCYT.** ~1000 ejercicios en 595
      páginas. Al banco de preguntas sueltas, por tema. Trabajo de varias
      sesiones; va al final a propósito.

## Lo que se corrigió en facultades.json (fase 1)

Las áreas declaradas no las había verificado nadie, y **se le muestran al
alumno** en la landing y en el onboarding.

| | Decía | Dice ahora | Por qué |
|---|---|---|---|
| ingeniería · áreas | matematicas, fisica, quimica, razonamiento | aritmetica_algebra, geometria_trigonometria, fisica, quimica, biologia | Son las que usan sus 139 exámenes. `razonamiento` no aparece en ninguna pregunta |
| ingeniería · preguntas | 100 | 20 | 72 de los 139 exámenes tienen 20 preguntas |
| ingeniería · duración | 180 min | 120 min | 84 de los 139 duran 120 minutos |
| económicas · áreas | matematicas, economicas, verbal, razonamiento | matematicas, lenguaje, historia | Son las que toman los facsímiles reales de la FCE |

**Pendiente de esto:** los pesos de económicas quedaron en tercios provisorios y
`preguntas_examen`/`duracion_minutos` **no se tocaron** porque no hay con qué
probarlos — se fijan en la fase 4, al transcribir los exámenes de 2014 y 2015.

**OJO, esto no alcanza:** en producción las facultades salen de **Supabase**, no
de este JSON (`getFacultades()` lee la tabla `facultades` si hay env vars). El
cambio hay que aplicarlo también desde `/admin/facultades`, o el alumno va a
seguir viendo las áreas viejas.
