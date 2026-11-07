# Pedido agy: armar los archivos del lote med-2024-25-p1 (mecánico)

NO ejecutes comandos. Solo crea/edita archivos con tus herramientas de archivos.

1. Crea `scripts/medicina/lotes/med-2024-25-p1.datos.py` con esta cabecera exacta:
```
D = {}
def q(n, tema, v, razones, nota=None): D[n] = (tema, v, razones, nota)
```
   y debajo, copiadas TAL CUAL, todas las líneas `q(...)` del bloque ```python de `C:\Users\lmigu\AppData\Local\axiom-agy\20261107-160047_auditoria\RESPUESTA.md` (las que empiezan con `q(` y también los comentarios `# 3:` y `# 53:`; cámbialos por nada: omítelos). No cambies ni una palabra.
2. Añade al final dos líneas:
```
q(3, "retroalimentacion-negativa", "VF", ["La tensión arterial es la fuerza que ejerce la sangre contra la pared de los vasos sanguíneos, y el enunciado la ubica en la pared del corazón; según la clave oficial es verdadera.", "Según la clave oficial es falsa."], "Revisión pendiente: la afirmación 2 describe bien la retroalimentación negativa; confirmar la clave con el libro.")
```
   (solo esa línea para la 3; para la 53 NO añadas nada).
3. Copia `scripts/medicina/lotes/med-2023-24-p2.py` a `scripts/medicina/lotes/med-2024-25-p1.py` y adapta SOLO: nombres `med-2023-24-p2` -> `med-2024-25-p1`; SALIDA = `data/examenes/umss/medicina/2025-primer-parcial-curso-basico-2024-2025.md`; `AUSENTES = (53,)`; los dos asserts sobre las 98 preguntas deben ser sobre las 99 preguntas (1 a 100 sin la 53) y la clave debe cubrir exactamente esas 99 más la 53; en el bloque que corrige la pregunta 86 pon, en su lugar, esta corrección: la pregunta 2 del borrador trae pegada la 3, y su tercera afirmación empieza con "En relación a los sistemas de retroalimentación negativa: 1. ... 2. ..." -> deja la 2 con sus dos primeras afirmaciones y crea la pregunta 3 con enunciado "En relación a los sistemas de retroalimentación negativa:" y afirmaciones: "La tensión arterial es la fuerza ejercida por la sangre que ejerce presión contra la pared del corazón." y "Revierte un cambio producido en una condición controlada, ejemplo: cuando se pierde una gran cantidad de sangre."; la pregunta 52 trae un "1." sobrante al final de su tercera afirmación: quítalo; y la 53 NO existe en el borrador (se maneja como ausente, léela de la clave pero no se carga). Actualiza `faltantes`, el front matter (`anio: 2025`, `titulo: Primer Parcial · Curso Básico 2024-2025`, sin fecha_examen) y el comentario (páginas 82 a 91, cartilla pág. 91, clave leída a la vista de la imagen; no menciones capa de texto; el área morfofunción es 1-25 y 51-75). `faltantes` de la 53: motivo `pagina-ausente`, detalle: no se pudo recuperar el enunciado del facsímil; la cartilla trae la letra E.
4. Mensaje final: una línea con qué archivos creaste.
