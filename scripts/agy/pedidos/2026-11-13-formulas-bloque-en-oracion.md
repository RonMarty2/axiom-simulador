# Pedido a agy · fórmulas en bloque metidas dentro de una oración

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto (raíz de la copia) y `agentes/verificador.md`.

## Problema (visto en pantalla)
En `data/examenes/umss/**.md`, algunos enunciados u opciones tienen una fórmula en modo BLOQUE (`$$...$$`) en medio de una oración, por ejemplo: «Un libro de física de $$m = 2\sqrt{2}$$ kg está suspendido…». En la app eso sale en un renglón aparte con una barrita de desplazamiento, cortando la frase (peor en celular de 360 px).

## Tarea
1. Recorre TODOS los `.md` de `data/examenes/`. Busca cada `$$...$$` que tenga texto pegado antes o después en la MISMA línea (es decir, la fórmula no está sola en su línea).
2. En esos casos, cámbialo a fórmula en línea `$...$` (mismo contenido, solo los delimitadores).
3. NO toques un `$$...$$` que está solo en su línea (eso es un bloque a propósito). NO cambies ningún otro texto, respuesta, opción ni clave. NO toques `total_preguntas` ni `faltantes`.
4. Si una fórmula en bloque contiene `\begin{...}`, `\\` o es muy larga (más de ~60 caracteres), NO la cambies: anótala en la respuesta como «para revisar».

## Respuesta
`RESPUESTA.md`: tabla con archivo, id o número de pregunta, texto antes → después (solo el fragmento), y la lista «para revisar». Los controles tsc/lint/test deben pasar.
