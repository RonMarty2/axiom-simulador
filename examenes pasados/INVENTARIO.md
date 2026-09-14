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

### Exámenes de FCE que se pueden extraer de ahí

Ninguno está en el banco todavía. Ordenados por lo que conviene hacer primero:

| Examen | Dónde está | ¿En el banco? |
|---|---|---|
| Admisión 1/2014 · 1ra opción | `FCE_Banco_Matematicas.pdf` p.2 | No |
| Admisión 1/2014 · 2da opción | `FCE_Banco_Matematicas.pdf` p.7 | No |
| Ingreso 2/2014 · 2da opción | `FCE_Banco_Matematicas.pdf` p.5 · también en `FCE_Guia_HistoriaGeneral.pdf` p.82 | No |
| Ingreso 1/2015 · 1ra opción | `FCE_Banco_Lenguaje.pdf` p.4 | No |

**Ojo:** cada uno de esos exámenes aparece **partido por materia**. El de
Matemáticas trae solo el área de matemáticas de ese examen (10 preguntas, 60
minutos); las otras áreas del mismo examen estarán en los bancos de Lenguaje y
de Historia. Para armar un examen completo hay que juntar los pedazos de los
tres PDFs — y puede que falte alguna área.

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
