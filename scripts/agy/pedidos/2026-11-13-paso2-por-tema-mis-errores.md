# Pedido a agy · paso 2 del plan de estructura por carrera

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto (`CLAUDE.md` en la raíz de la copia) y el agente `agentes/verificador.md` (lista de errores conocidos que el diff no debe repetir).

## Contexto
Repo AXIOM (Next.js + TypeScript). Lee primero:
- `docs/plan-estructura-examen-por-carrera.md` (el "paso 2")
- `docs/mapa-areas-viejas-a-temas.md` (cómo las áreas viejas del banco, campo `area:` de cada pregunta, se corresponden con los temas actuales de cada carrera)
- `data/formatos-examen.json` (fichas; la vigente de cada facultad)
- `src/lib/axiom/areas.ts`

## Tarea
En `/practicar`, los modos **«Por tema»** y **«Mis errores»** tienen que agrupar y filtrar por los TEMAS ACTUALES de la carrera (los de la ficha vigente), usando el mapa de áreas viejas -> temas. Hoy usan las áreas viejas tal cual vienen del banco.

1. Ubica dónde se arma la lista de temas de «Por tema» y la agrupación de «Mis errores» (front y API).
2. Pon el mapa en UN solo lugar de código (o dato en `data/`), leído por ambos modos. Nada de cifras ni nombres clavados en JSX (regla D9 de BITACORA.md).
3. Un área vieja sin correspondencia se muestra con su nombre propio (no se pierde ninguna pregunta).
4. Facultad sin ficha vigente (Económicas): se comporta como hoy.
5. Prueba nueva (vitest) que compruebe: cada `area:` que existe en el banco tiene destino; Medicina agrupa por sus temas; Económicas no cambia.
6. Texto visible para el alumno en TUTEO ("puedes", nunca "podés").

## No tocar
- `total_preguntas` de ningún examen, los `.md` de `data/examenes/`, `data/preguntas-compartidas.json`, la lógica del modo predictivo.

## Respuesta
`RESPUESTA.md` corta: archivos tocados, qué hace cada cambio, qué no pudiste resolver. Los controles tsc/lint/test deben pasar.
