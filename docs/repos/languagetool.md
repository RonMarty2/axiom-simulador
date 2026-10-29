# languagetool-org/languagetool (evaluado 29-oct-2026)

## 1. Qué es de verdad
Corrector de ortografía, gramática y estilo con reglas por idioma (servidor Java con API HTTP). En español tiene una regla `VOSEO` ("Evitar formas de voseo", `grammar.xml` línea 34410 del repo) que se apoya en el diccionario morfológico: reconoce CUALQUIER verbo en forma voseante, no una lista de verbos. Además ve tildes (`esta`/`está`, `calculo`/`cálculo`), `por que`/`porque`, `mas`/`más`. NO sabe qué es texto del alumno y qué es código: hay que pasarle solo el texto.

## 2. Licencia
`COPYING.txt` del repo leído: LGPL 2.1. Uso comercial permitido usándolo como herramienta externa (servidor aparte, sin modificar). No se distribuye con la app. La **API pública** de languagetool.org tiene otras condiciones (abajo).

## 3. Salud
GitHub API: 15,2 mil estrellas, último push 29-oct-2026, no archivado, 2.156 issues abiertos (proyecto enorme, normal). El zip estable pesa 252 MB (`LanguageTool-stable.zip`, cabecera `last-modified` 27-mar-2025).

## 4. Peso y dónde corre
Solo desarrollo/CI. Java **17** obligatorio (`pom.xml`: `maven.compiler.source 17`). **La máquina de Ronald tiene Java 1.8**: no corre local sin instalar otro Java. En CI (Ubuntu) se puede con `actions/setup-java` + el zip (252 MB por corrida, cacheable) o una imagen Docker (no probada). La API pública: 20 pedidos/min, 20 KB por pedido, y **prohíbe pedidos automatizados** (o sea, no sirve para CI ni para barrer el banco con un script).

## 5. Mapa contra Axiom
- Regla 2 de CLAUDE.md (tuteo) y `verificador` ("Texto del alumno"): hoy lo cubren tres tests propios por lista (`contenido-lecciones.test.ts` genera las formas desde ~120 infinitivos; `banco.test.ts`; `legal.test.ts`). LanguageTool cubre verbos que nadie listó (la lección del 16-sep: "un trinquete solo cubre lo que alguien listó").
- Ortografía y tildes del texto del alumno: hoy **nadie** las revisa automáticamente. Es lo que más aporta.
- Fila 8 (banco): explicaciones y enunciados transcritos por agentes; un corrector atraparía tildes perdidas sin leer cada examen.

## 6. Prueba chica
Por la API pública, con textos escritos por mí (no mandé contenido del proyecto). Archivos en `scratchpad\calidad\texto\`.
- `voseo.txt` (9 voseos): con `language=es` marca 6: Podés, buscás, Mirá, resolvelo, Tocá, Descontá (con sugerencia: Puedes, buscas, Mira, resuélvelo, Toca, Descuenta). **Se le escapan 3**: «Fijate», «sabés» y «Vos». Leyendo la regla: tiene una excepción a propósito que no marca nada si la oración contiene la palabra «vos» (para no molestar a argentinos). O sea, la oración más claramente voseante es la que no ve.
- `tuteo.txt`: 0 avisos. No confunde «Aprobarás» ni «sumándole» (este último sí lo confunde el test propio, lección 23-oct).
- Con `language=es-AR` desactiva la regla: 0 avisos en las dos. Hay que pedir `es`.
- `erratas.txt`: 9 avisos, todos correctos: esta→está, opcion, por que→porque, aceleracion, tambien, mas→más, el calculo→cálculo, Resuelvelo→Resuélvelo, miralo→míralo. No vio «a ver/haber», «aprobaran» ni «presientes» (palabras que existen; la lección de «presientes» sigue valiendo).
- **No probado local** (Java 8). No lo corrí sobre el banco real porque la API pública no admite uso automatizado.

## 7. Costo de integrar
- Un script de desarrollo `scripts/ortografia.mjs` que extraiga el texto del alumno (el banco ya tiene parser; las lecciones ya se recorren en `contenido-lecciones.test.ts`) y lo mande a un LanguageTool local. 1 a 2 archivos nuevos, nada del producto.
- Requisito: Java 17 en la máquina de Ronald (o en CI) y 252 MB. Primer pasaje sobre 139+ exámenes va a dar muchos avisos de nombres propios y términos técnicos; hace falta una lista de palabras aceptadas.
- No reemplaza los tests de voseo: los complementa.

## 8. Decisión
**USAR como herramienta de desarrollo, no en CI todavía.** Primero un pasaje único local sobre el banco y las lecciones para ver cuántas tildes reales hay; si aparecen muchas, recién ahí ponerlo en CI.
Agente que mejora: `verificador` (sección "Texto del alumno") corre `scripts/ortografia.mjs` sobre los archivos del diff en vez de leer a ojo buscando voseo y tildes; `transcriptor-examenes` lo corre al terminar cada `.md`.

Confianza: media (probado por la API pública con textos chicos; no corrido local ni sobre el banco).

## Para Ronald
Instalar Java 17 (u otra versión 17+) en tu PC es el único costo. Sin eso no se puede correr local. Te recomiendo probarlo una vez sobre el banco antes de decidir.

## Lecciones nuevas
- 2026-10-29 · SUERTE · La regla de voseo de LanguageTool NO marca nada en una oración que contiene «vos» (la exime a propósito). · No confiar en ella sola; los tests propios por lista siguen haciendo falta.
- 2026-10-29 · ACIERTO · Con `language=es-AR` la regla de voseo se apaga. · Pedir siempre `es`.
