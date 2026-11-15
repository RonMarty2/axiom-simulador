# Pedido agy · revisar el recorte EN SECO de los textos de audio de Medicina (15-nov-2026)

Reglas: lee `CLAUDE.md` del repo y la skill `libro-audio-auditor` (agentes/libro-audio-auditor.md). Solo lectura; no edites nada.

## Contexto
Ronald decidió quitar del audio: bibliografía / lecturas recomendadas, autoevaluación, actividades prácticas, guía de estudio, glosario, índices / esquemas del capítulo, créditos y encabezados repetidos. SE QUEDAN: objetivos, recuadros clínicos, cuadros, pies de figura y TODO el cuerpo del capítulo.

`recorte-seco.txt` (en la carpeta que lees) es la salida del script `docs/audio-bloques/recortar.py` sin aplicar. Cada corte ocupa 2 líneas:
`<archivo> [<tipos>] <palabras> pal` y debajo `…<70 caracteres antes>[✂]<70 caracteres después>…` (⏎ = salto de línea).
La lista de cortes de origen está en `cortes-calvo.md`, `cortes-saladin1.md`, `cortes-saladin2.md` y la revisión anterior en `revision-medio-agy.md` (misma carpeta).

## Qué hacer
Para CADA corte de `recorte-seco.txt`, juzga con el texto de antes y de después:
1. ¿Lo de ANTES del ✂ es cuerpo/recuadro que debe quedar, y termina en frase completa? 
2. ¿Lo de DESPUÉS del ✂ es cuerpo/encabezado legítimo (o fin de archivo), sin restos de bibliografía, autoevaluación, guía o esquema?
3. Mira especialmente: Tema_10_Morfo_Saladin (corte entre «Nervio plantar lateral» y «CUADRO diez coma un seis … continuación»: ¿qué tipo era y está bien?), los marcados `FIN-NO-HALLADA`, y cualquier corte de más de 2.500 palabras.

## Formato de la respuesta
Primero una línea: `TOTAL cortes revisados: N · bien: X · dudosos: Y`.
Después SOLO los dudosos, en un bloque csv:
```csv
archivo;tipos;problema;que_hacer
```
Si no hay dudosos, escribe `SIN DUDOSOS`. No resumas los que están bien.
