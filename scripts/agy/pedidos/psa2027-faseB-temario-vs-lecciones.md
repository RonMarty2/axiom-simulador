# Pedido a agy · Fase B PSA 2027 · temario oficial contra lecciones de /aprende y láminas

Nivel: lectura. SOLO LEES y entregas un informe en RESPUESTA.md. No edites nada.
Sigue las reglas de `.claude/agents/analista-temas.md` (sobre todo la «Lección 15-11»: el PDF oficial manda; cada afirmación con su evidencia). Tú NO decides prioridades: solo mapeas.

## Fuentes del temario (lo oficial)
- `docs/psa-2027/LISTA_CONTENIDOS_PSA2027.txt`: lista oficial (capítulos de Saladin y Calvo, partes de Educación en Salud e Investigación, páginas de 4096.pdf, 7 habilidades de Comprensión Lectora).
- `docs/psa-2027/4096_p29-45_texto.txt`: el texto de esas páginas de 4096.pdf (temas de Física, Química y Matemáticas). Desglosa cada materia en sus temas, tal como aparecen en el texto.
- `docs/psa-2027/MFQ_INVENTARIO.md`: desglose ya hecho de Física, Química y Matemáticas (úsalo para comprobar el tuyo).
- Para Educación en Salud e Investigación, toma los títulos de sección de `examenes pasados/MEDICINA/PSA_2027_FUENTES/EdS_p32-74_texto_crudo.txt` y `EdS_p84-189_texto_crudo.txt` (solo los títulos; la Parte I, pág. 2-31, puede no estar: dilo si no la encuentras).

## Lo que ya tenemos (lecciones)
- `src/lib/axiom/catalogo-aprende.ts`: catálogo de unidades de /aprende (busca las de Medicina: Morfofunción, Biología Celular, Investigación/Bioética, Química, Física, Matemática, Comprensión).
- `src/app/aprende/` (una carpeta por unidad) y `src/app/laminas/` (láminas por módulo): mira títulos y encabezados para saber qué cubre cada una.

## Qué entregas (RESPUESTA.md)
Una tabla por materia (las 7), una fila por tema del temario oficial:

| Materia | Tema oficial (como lo dice la fuente) | Fuente (archivo + línea o página) | Lección(es) de /aprende que lo cubren (id o ruta) | Lámina(s) | Cobertura: SÍ / A MEDIAS / NO | Evidencia en una línea |

Reglas:
- «SÍ» solo si la lección trata el tema de verdad (título o sección propia), no si lo nombra de paso. Si dudas, «A MEDIAS» y di por qué.
- Al final, una lista aparte: lecciones de /aprende de Medicina que NO corresponden a ningún tema oficial (posible contenido fuera del temario).
- Para Física/Química/Matemáticas, agrega una columna «etiquetas tema probables» con 2-4 palabras clave en kebab que usarías para buscar ese tema en las etiquetas `tema:` del banco (ej.: `ley-de-ohm`, `circuitos`). No cuentes preguntas: eso lo hace Claude.
- No inventes rutas ni ids: copia los que existen. Si no encuentras algo, escribe «NO ENCONTRADO».
