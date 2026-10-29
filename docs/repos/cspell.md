# streetsidesoftware/cspell + `@cspell/dict-es-es` (evaluado 29-oct-2026)

## 1. Qué es de verdad
Corrector de ortografía por diccionario, pensado para código y textos (Node, sin Java). Marca toda palabra que no está en el diccionario. No entiende gramática: no distingue `esta` de `está` ni `porque` de `por que`. Como el diccionario de España no trae formas voseantes, las marca como "palabra desconocida" (efecto secundario, no una regla de voseo).

## 2. Licencia
`cspell/LICENSE` leído: MIT. **El diccionario `@cspell/dict-es-es/LICENSE` es LGPL 3.0** (viene de los diccionarios Hunspell). Como herramienta de desarrollo que no se entrega al alumno, no hay problema práctico.

## 3. Salud
GitHub API: 1,7 mil estrellas, último push 28-oct-2026, no archivado, 137 issues. cspell 10.4.0, dict-es-es 3.0.9.

## 4. Peso y dónde corre
Solo desarrollo/CI, Node puro (sin Java, corre en la máquina de Ronald y en el CI tal cual). cspell y sus librerías ~3 MB; `@cspell` (diccionarios) 7,2 MB. Cero impacto en bundle.

## 5. Mapa contra Axiom
- Voseo (regla 2, `verificador`): cubre verbos que la lista de `contenido-lecciones.test.ts` no tiene, porque cualquier voseante es "desconocida". Pero no ve «Vos» (palabra válida).
- Ortografía: ve tildes perdidas en palabras que sin tilde no existen (`opcion`, `aceleracion`, `tambien`), no las que sí existen (`esta`, `calculo`, `mas`).

## 6. Prueba chica
Archivos en `scratchpad\calidad\texto\`.
- `voseo.txt` (9 voseos): marca 8 (Podés, buscás, Mirá, resolvelo, Tocá, Fijate, sabés, Descontá); se le escapa «Vos». Falso: «molaridad» (no está en el diccionario).
- `tuteo.txt`: 2 falsos: «resuélvelo» (forma con pronombre pegado que el diccionario no trae) y «molaridad».
- `erratas.txt`: 5 correctos (opcion, aceleracion, tambien, Resuelvelo, miralo) y 1 falso (discriminante). No ve esta/está, por que, mas, calculo.
- Examen real (copia de `data/examenes/umss/economicas/2011-1op-1-2011.md`, 3.478 palabras): sin configurar, 78 avisos (casi todos LaTeX: `left`, `qquad`, `infty`). Ignorando `$...$`, comentarios y claves del encabezado: 17 avisos, **ninguno es un error real** (`explicacion` de la clave en negrita, nombres propios René y Emapa, `discriminante`, `distractor`, `macromagnitud`, `descartarlos`).
- Lección real (copia de `LeccionShell.tsx`): 9 avisos, todos nombres de código (`Presence`, `Props`).

## 7. Costo de integrar
Un `cspell.json` con las exclusiones (LaTeX, claves, comentarios) y una lista de palabras aceptadas que va a crecer (términos técnicos de química, física, biología; nombres propios). En archivos `.tsx` mezcla código y texto, mucho ruido. Riesgo: un test con muchos falsos se termina ignorando.

## 8. Decisión
**DESCARTAR para Axiom por ahora.** Aporta poco sobre lo que ya hay: el voseo lo cubren mejor los tests propios (corrí la lógica de `contenido-lecciones.test.ts` sobre la misma muestra: 9 de 9, más el falso ya conocido de «sumándole») y las tildes que importan (esta/está, mas/más) no las ve; LanguageTool las ve. Si Ronald no quiere instalar Java para LanguageTool, cspell es el plan B, solo sobre el banco `.md` y con lista de palabras.
Agente que mejora: ninguno de forma neta.

Confianza: alta (probado con textos de muestra y con un examen real).

## Lecciones nuevas
- 2026-10-29 · ACIERTO · Probar un corrector contra una muestra con voseo, otra con tuteo y otra con erratas mostró en 1 minuto qué ve cada herramienta: diccionario (cspell) contra gramática (LanguageTool). · Armar siempre las tres muestras antes de elegir.
