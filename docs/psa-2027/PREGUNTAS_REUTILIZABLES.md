# Preguntas reutilizables para PSA-2027 Medicina (Matemáticas, Física, Química)

Qué sale de contar: preguntas de `data/examenes/umss/ingenieria/` y `data/examenes/umss/economicas/` (3.749 preguntas con `tema:`). Medicina se excluye: no tiene Matemáticas, Física ni Química. El conteo reutiliza el diccionario de temas `G` de `docs/psa-2027/peso_temas.py` (misma taxonomía que `ORDEN_LECCIONES_NUEVAS.md`). Cada pregunta cuenta una vez por tema que le corresponde.

Nota sobre "tema oficial": `LISTA_CONTENIDOS_PSA2027.txt` da para Matemáticas, Física y Química solo páginas del PDF (38-45, 29-34, 34-38), sin lista de temas. Los temas de la tabla son la taxonomía de `peso_temas.py`, la misma que usa el orden de lecciones.

Nota sobre falsos positivos: el regex de `peso_temas.py` atrapa temas de otras materias (por ejemplo "interacciones-interespecificas" como interés financiero, "tiro-parabolico-alcance" como orgánica, "energia-cinetica" como cinética química). Se excluyen con una lista explícita por tema (abajo). Sin exclusiones el conteo sería el crudo del listado de RAW.

## Tabla

| Materia | Tema oficial (taxonomía de peso_temas.py) | Nº preguntas reutilizables | De qué facultades | Hueco (0 o <5) |
|---|---|---:|---|---|
| Matemáticas | logica conjuntos (`M-logica-conjuntos`) | 0 | ninguna | **0 (hueco)** |
| Matemáticas | complejos (`M-complejos`) | 3 | ingenieria 3 | **<5 (hueco parcial)** |
| Matemáticas | financiera (`M-financiera`) | 7 | ingenieria 6, economicas 1 | no |
| Matemáticas | combinatoria binomio (`M-combinatoria-binomio`) | 25 | ingenieria 25 | no |
| Matemáticas | estadistica (`M-estadistica`) | 2 | ingenieria 2 | **<5 (hueco parcial)** |
| Matemáticas | cuerpos 3d (`M-cuerpos-3d`) | 0 | ninguna | **0 (hueco)** |
| Matemáticas | elipse hiperbola (`M-elipse-hiperbola`) | 0 | ninguna | **0 (hueco)** |
| Matemáticas | limites derivadas (`M-limites-derivadas`) | 3 | ingenieria 3 | **<5 (hueco parcial)** |
| Física | mediciones (`F-mediciones`) | 7 | ingenieria 7 | no |
| Física | ondas sonido (`F-ondas-sonido`) | 12 | ingenieria 12 | no |
| Física | optica (`F-optica`) | 0 | ninguna | **0 (hueco)** |
| Física | calor (`F-calor`) | 43 | ingenieria 43 | no |
| Física | estatica (`F-estatica`) | 3 | ingenieria 3 | **<5 (hueco parcial)** |
| Física | circular gravitacion (`F-circular-gravitacion`) | 49 | ingenieria 49 | no |
| Física | impulso (`F-impulso`) | 23 | ingenieria 23 | no |
| Física | fluidos (`F-fluidos`) | 2 | ingenieria 2 | **<5 (hueco parcial)** |
| Física | magnetismo (`F-magnetismo`) | 0 | ninguna | **0 (hueco)** |
| Química | tabla periodica (`Q-tabla-periodica`) | 1 | ingenieria 1 | **<5 (hueco parcial)** |
| Química | cinetica equilibrio (`Q-cinetica-equilibrio`) | 0 | ninguna | **0 (hueco)** |
| Química | acido base (`Q-acido-base`) | 13 | ingenieria 13 | no |
| Química | organica (`Q-organica`) | 5 | ingenieria 5 | no |


Leyenda: "Hueco" marca temas con 0 preguntas (**0 (hueco)**) o con menos de 5 (**<5 (hueco parcial)**). La columna "Nº" ya descuenta las exclusiones.

## Total por materia

TOTAL: Matemáticas 40 · Física 139 · Química 19 · Total 198

## Huecos principales

- Sin ninguna pregunta (0): M logica-conjuntos, M cuerpos 3d, M elipse-hiperbola, F optica, F magnetismo, Q cinetica-equilibrio.
- Con menos de 5: Q tabla periodica (1), F fluidos (2), M estadistica (2), M complejos (3), F estatica (3), M limites derivadas (3).

## Exclusiones aplicadas (auditables)

```
F-estatica :: dinamica-circular-friccion-estatica-plataforma : 1
  F-estatica :: dinamica-maquina-atwood : 1
  F-estatica :: dinamica-plataforma-friccion-estatica : 1
  F-estatica :: estatica-friccion-bloque-pared : 1
  F-estatica :: estatica-friccion-plano-inclinado : 1
  F-estatica :: friccion-estatica : 1
  F-estatica :: friccion-estatica-desaceleracion : 1
  F-estatica :: friccion-estatica-equilibrio : 1
  F-estatica :: friccion-estatica-fuerza-normal : 1
  F-estatica :: friccion-estatica-maxima-deceleracion : 1
  F-estatica :: friccion-estatica-movimiento-circular : 1
  F-estatica :: friccion-estatica-normal : 1
  F-estatica :: friccion-estatica-pared : 1
  F-estatica :: friccion-estatica-sistema-polea : 1
  F-estatica :: friccion-estatica-sistemas-acoplados : 1
  F-estatica :: maquina-atwood : 1
  F-estatica :: maquina-atwood-aceleracion : 1
  F-estatica :: maquina-atwood-velocidad : 1
  F-estatica :: maquina-de-atwood : 2
  F-estatica :: movimiento-circular-friccion-estatica : 1
  F-mediciones :: densidad-volumen-cilindro-conversion-unidades : 1
  F-optica :: area-sombreada-lente-circular : 1
  M-combinatoria-binomio :: reactivo-limitante-en-combinacion : 1
  M-cuerpos-3d :: densidad-volumen-cilindro : 1
  M-cuerpos-3d :: densidad-volumen-cilindro-conversion-unidades : 1
  M-cuerpos-3d :: densidad-volumen-esfera : 1
  M-cuerpos-3d :: molaridad-volumen-de-solucion : 1
  M-estadistica :: densidad-mezclas-densidad-promedio : 1
  M-estadistica :: masa-atomica-promedio : 1
  M-estadistica :: mediana-altura-angulo-recto-producto-angulos : 1
  M-estadistica :: mediana-trapecio-relacion-areas : 1
  M-estadistica :: mediana-y-altura-en-triangulo-rectangulo : 1
  M-estadistica :: trapecio-mediana-segmento-diagonales : 1
  M-estadistica :: trapecios-medianas : 1
  M-estadistica :: triangulo-rectangulo-mediana : 1
  M-estadistica :: triangulo-rectangulo-mediana-inradio : 1
  M-estadistica :: velocidad-promedio-tramos : 1
  M-financiera :: competencia-interespecifica : 1
  M-financiera :: ecologia-competencia-interespecifica : 1
  M-financiera :: interacciones-interespecificas : 4
  M-financiera :: interacciones-interespecificas-ecologia : 2
  M-financiera :: interacciones-interespecificas-vs-factores-abioticos : 1
  M-financiera :: origenes-del-capitalismo : 1
  M-financiera :: relaciones-interespecificas : 2
  M-financiera :: relaciones-interespecificas-competencia : 2
  M-financiera :: relaciones-interespecificas-intraespecificas : 1
  M-financiera :: relaciones-interespecificas-parasitismo : 1
  M-limites-derivadas :: contaminacion-acustica-limite-oms : 1
  M-logica-conjuntos :: desigualdad-racional-conjunto-solucion : 1
  M-logica-conjuntos :: porcentajes-conjunto : 1
  M-logica-conjuntos :: trabajo-conjunto-tasas-ecuacion-cuadratica : 1
  M-logica-conjuntos :: trabajo-conjunto-tuberias-desague : 1
  Q-cinetica-equilibrio :: dinamica-friccion-cinetica-distancia-frenado : 1
  Q-cinetica-equilibrio :: energia-cinetica-comparacion-masas : 1
  Q-cinetica-equilibrio :: energia-cinetica-en-caida-libre-parcial : 1
  Q-cinetica-equilibrio :: energia-cinetica-friccion-piso : 1
  Q-cinetica-equilibrio :: energia-cinetica-momento-lineal : 1
  Q-cinetica-equilibrio :: energia-cinetica-potencial-tiro-vertical : 1
  Q-cinetica-equilibrio :: energia-cinetica-relacion-masas : 1
  Q-cinetica-equilibrio :: energia-cinetica-relativa-dos-autos : 1
  Q-cinetica-equilibrio :: energia-cinetica-tiro-vertical : 1
  Q-cinetica-equilibrio :: energia-cinetica-vectorial : 1
  Q-cinetica-equilibrio :: energia-cinetica-velocidad : 1
  Q-cinetica-equilibrio :: friccion-cinetica-contacto-cajas : 1
  Q-cinetica-equilibrio :: friccion-cinetica-velocidad-constante : 1
  Q-cinetica-equilibrio :: trabajo-energia-cinetica : 4
  Q-organica :: alcance-horizontal-tiro-parabolico : 1
  Q-organica :: bioelementos-biomoleculas-organicas : 1
  Q-organica :: biomoleculas-organicas-composicion : 1
  Q-organica :: cinematica-alcance-aceleracion : 1
  Q-organica :: cinematica-alcance-encuentro : 1
  Q-organica :: cinematica-alcance-pista-circular : 1
  Q-organica :: cinematica-encuentro-alcance : 1
  Q-organica :: cinematica-relativa-alcance-rebase : 1
  Q-organica :: cinematica-tiro-parabolico-alcance-horizontal : 1
  Q-organica :: descomponedores-materia-organica : 1
  Q-organica :: mru-alcance-persecucion : 1
  Q-organica :: mru-mruv-alcance-ciclista : 1
  Q-organica :: mruv-alcance-entre-moviles : 1
  Q-organica :: mruv-encuentro-alcance : 1
  Q-organica :: proyectil-horizontal-alcance-altura : 1
  Q-organica :: tiro-horizontal-alcance : 1
  Q-organica :: tiro-horizontal-alcance-minimo-obstaculo : 1
  Q-organica :: tiro-parabolico-alcance : 1
  Q-organica :: tiro-parabolico-alcance-altura : 1
  Q-organica :: tiro-parabolico-alcance-horizontal : 3
  Q-organica :: tiro-parabolico-altura-alcance : 1
  Q-organica :: tiro-parabolico-altura-alcance-maximo : 1
  Q-tabla-periodica :: mcm-encuentro-periodico : 2
  Q-tabla-periodica :: mcm-encuentros-periodicos : 1
  Q-tabla-periodica :: modelo-trigonometrico-periodico : 1
```

```
RAW (sin exclusiones):
  M-logica-conjuntos: raw 4 -> 0
  M-complejos: raw 3 -> 3
  M-financiera: raw 23 -> 7
  M-combinatoria-binomio: raw 26 -> 25
  M-estadistica: raw 12 -> 2
  M-cuerpos-3d: raw 4 -> 0
  M-elipse-hiperbola: raw 0 -> 0
  M-limites-derivadas: raw 4 -> 3
  F-mediciones: raw 8 -> 7
  F-ondas-sonido: raw 12 -> 12
  F-optica: raw 1 -> 0
  F-calor: raw 43 -> 43
  F-estatica: raw 24 -> 3
  F-circular-gravitacion: raw 49 -> 49
  F-impulso: raw 23 -> 23
  F-fluidos: raw 2 -> 2
  F-magnetismo: raw 0 -> 0
  Q-tabla-periodica: raw 5 -> 1
  Q-cinetica-equilibrio: raw 17 -> 0
  Q-acido-base: raw 13 -> 13
  Q-organica: raw 29 -> 5
```

Generado por conteo de archivos con código (scratchpad/final.py), 15-nov-2026. Solo lectura del banco; este archivo es lo único escrito.
