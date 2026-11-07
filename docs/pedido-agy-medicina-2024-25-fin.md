# Pedido agy: Medicina, examen final 2024-25 (`med-2024-25-fin`), solo lectura

Lee el CLAUDE.md del proyecto y `agentes/transcriptor-medicina.md` (solo sus reglas de cómo se escribe una pregunta y su explicación). NO ejecutes comandos, no hay terminal; no edites archivos.

## Qué hay
- Borrador del extractor (preguntas, afirmaciones y clave oficial de texto): `C:\Users\lmigu\AppData\Local\Temp\axiom-medicina\med-2024-25-fin.json` (la clave NO está ahí). Clave oficial completa, número -> letra: `scripts/medicina/lotes/med-2024-25-fin.clave.json`.
- Ejemplo del formato que debes producir: `scripts/medicina/lotes/med-2024-25-p2.datos.py` (cada línea `q(n, "tema", "VF", ["razón afirmación 1","razón afirmación 2"])`).
- Bibliografía de la gestión 2024-25 (Tortora, Alberts): `data/research/medicina/bibliografia-por-gestion.json`.

## Reglas de la clave de letras
Con 2 afirmaciones: A = (V,F), B = (F,V), C = (V,V), D = (F,F). Con 3 afirmaciones: A = VFF, B = FVF, C = FFV, D = VVV, E = FFF. (Confirma esto con `agentes/transcriptor-medicina.md` y el script `med-2024-25-p2.py`, tabla ESQUEMA; si difiere, manda esa.)

## Tarea
Para cada pregunta del borrador (1 a 100), escribe la línea `q(...)`:
1. Primero decide TÚ si cada afirmación es verdadera o falsa según el libro de la gestión (conocimiento de Tortora/Alberts), SIN mirar la clave.
2. Compara con la letra oficial. Si coinciden, pon el veredicto. Si no coinciden, pon el veredicto que da la CLAVE OFICIAL y agrega una cuarta posición (nota) que empiece con «Revisión pendiente:» explicando tu discrepancia en una línea. No cambies la clave a tu gusto.
3. Si la pregunta no tiene clave oficial en el borrador, pon tu veredicto y nota «Sin clave oficial en el borrador; veredicto propio, revisar contra la cartilla.»
4. La razón de cada afirmación: una frase corta, en tuteo («no», «es»; sin voseo), que explique por qué es V o F.
5. Tema en kebab-case, corto.

## Entrega
En tu MENSAJE FINAL (no escribas archivos; su contenido tiene que ser la respuesta): al principio una lista de las preguntas con discrepancia o sin clave (número y motivo en 5 palabras). Después UN solo bloque ```python con todas las líneas `q(...)` (sin la cabecera `D = {}` ni `def q`; solo las líneas). No acortes ni resumas: todas completas.
