# Hallazgos de la auditoría de pasos (7 y 8-oct-2026)

Dos rondas: (1) auditoría de los 9 generadores de `src/app/prueba-animacion/`, (2) arreglo por 3 agentes, y (3) auditoría **independiente** de lo arreglado. El estado vigente por generador está en `data/registro-auditoria-pasos.json`; aquí queda el detalle de lo encontrado, para no volver a descubrirlo.

## Causas comunes (valen para cualquier materia nueva)
1. **Ficha única con varios números adentro** (la fórmula, la raíz, `x=(5±1)/2`): los valores no pueden viajar, "nacen de la nada" aunque `revisar.ts` pase. Solución: piezas con id en un renglón aparte (`salto`) o fracciones con partes (`fr`, `.n`/`.d`).
2. **Reemplazo de varias letras u operaciones en un solo paso.** Una letra, una operación por paso.
3. **Resultados intermedios que solo viven en el texto** (`3·3`, `4+32`, `(-5)·(-5)`, `1·3 / 2·3`, divisores para hallar el factor común, `5 = 2·2 + 1`). Deben ser estados.
4. **La comprobación final reconstruye datos que ya no están en pantalla** (logaritmos, cuadrática): hay que dejar una **fila de referencia con el enunciado** y que la comprobación nazca de ahí.
5. **Textos que dicen algo que el estado no muestra** ("se escribe Δ" sin Δ; "sale de la raíz" cuando ya estaba afuera; regla invertida `n·n=n²` en un paso que calcula `2·2=4`).
6. **Pasos vacíos disfrazados:** cambia el id pero no lo que se ve.
7. **Falta paso de comprobación** en todos (lineal con x fraccionaria, cuadrados, fracciones).

## Pendiente tras la auditoría independiente (8-oct)
- **lineal:** comprobación con x fraccionaria; con n<0 el texto dice `x=-6/4` pero el estado muestra `-6` arriba hasta T3; las listas de divisores solo están en el texto; en el tachado, el denominador que queda en 1 no se nombra.
- **cuadrados:** `a` y `b` no vuelan desde sus etiquetas (solo cambia el tex de la fórmula); las dos etiquetas aparecen juntas; la expansión `x²+kx-kx-q` está solo en el porqué; falta comprobación; el porqué dice "dos veces" y son tres lugares.
- **fracciones:** con resultado negativo, un paso calcula `4-6=-2` y mueve el signo (dos operaciones); falta comprobación; verificar en pantalla que el numerador de la 2ª fracción viaje a `w2`; divisores solo en el texto.
- **logaritmos y logaritmos-propiedad:** la comprobación reconstruye `log(4·8)`, `6²=36` desde el resultado (usar fila de referencia); `2⁵=32 ✓` sin desarrollar; en (2,2,2) T2 y T6 solo cambian de id (pasos vacíos).
- **cuadratica:** `x=(5±1)/2` y `x₁ ó x₂` salen de un solo tex (usar `fr` + `viajar`, y decir "llamamos x₁ y x₂"); `5+1=6` y `6÷2=3` dentro de una pieza; "se escribe Δ" sin mostrar Δ; regla invertida en el paso `2·2=4`; la ecuación de la comprobación nace desde `r1`; **44 transiciones: se pueden quitar ~7** (`3²=3·3` y `3·3=9` ya enseñados; `√1` trivial; juntar T5+T6).
- **potencia / raiz / raiz-con-resto:** `b^n` (p. ej. `2^7=128`) se calcula de golpe (cadena de productos parciales); el resultado con r>1 deja el radicando sin calcular (`2∛(2²)` en vez de `2∛4`, que es como lo escribe el banco); `∛9 → ∛(3²)` dice "más simple" y es más largo; cociente y resto (`5 = 2·2 + 1`) solo en el porqué; el mcd g solo en el texto; la potencia perfecta (`12 = 4·3`, `54 = 27·2`) se elige sin buscarla; filas con puntos suspensivos no se pueden contar; el índice `ik2` flota sin etiqueta en un estado de raiz-con-resto (ver en pantalla).

## Tests que cerrarían los huecos (propuestos por los auditores; ninguno agregado todavía salvo los de la cuadrática)
1. Paso vacío por tex: la secuencia de tex de `estados[i]` y `estados[i+1]` es idéntica y no hay `resaltar`.
2. Todo `a·b=c` / `x+y=z` escrito en un texto existe como estado en ese paso (ya está solo en la cuadrática: generalizar a `revisar.ts`).
3. Todo número de una comprobación nace por brote desde una pieza visible o ya estaba en el estado anterior.
4. Si el texto nombra un símbolo (Δ, `x₁`) el estado siguiente lo contiene.
5. Una fusión de una sola ficha que solo cambia el tex haciendo una operación (`a+b→c`) se rechaza.
6. Un paso que calcula y mueve un signo a la vez se rechaza.
7. Límite de factores multiplicados por paso (no solo de "números nuevos").
8. El resultado numérico no contiene `base^exp` en el radicando.

## Limitaciones del motor (`Fusion.tsx`, `datos.ts`)
- `Ficha.frac` guarda cada parte como un solo string: una fórmula con fracción no puede tener piezas con id dentro de la raya (la cuadrática la escribe en línea con "entre" mientras hay piezas sueltas).
- Con dos brotes al mismo destino, solo se anima el último.
- Los brotes con origen en una parte de fracción (`f2.d`) se tratan como "viaja" en `Fusion.tsx`: verificar en pantalla.
- Un radical no se puede partir en fichas: se abre en `[índice, base, exponente]` y se vuelve a armar con una fusión.
- No se puede combinar `salto` con un `extra` fijo al final de cada estado.

---

# Ronda 3 (9-oct-2026): auditoría independiente tras la segunda tanda de arreglos

Resultado: los 9 generadores siguen `con-hallazgos`. **Todos los pendientes de la ronda 2 quedaron resueltos**; lo que queda son saltos más finos, casi todos en las **comprobaciones** (el arreglo trae una copia de los defectos que acababa de quitar del cálculo principal). Ninguno es un error de cálculo.

## lineal / cuadrados / fracciones
- **lineal:** la comprobación reconstruye la ecuación desde el `=` (no tiene fila de referencia; cuadrados y fracciones sí); con x negativa no entera el signo entra al numerador dentro del paso "el 4 viaja" (4x+2=-4); en 5x+1=-2 el estado dice `-5·3` y el texto calcula `5·(-3)`; la lista de divisores nace entera y no se muestra el cofactor (`12=3·4`); cuando la división es exacta sobran los 6 pasos de divisores.
- **cuadrados:** cuatro productos (`x·x`, `x·k`, `-k·x`, `-k·k`) nacen en un paso; `3²=9` solo en el texto (la fila `ref` no se resalta); `(-3)²` pasa a `9` sin `(-3)·(-3)`; el paso T20 copia el ejercicio y reemplaza x a la vez.
- **fracciones:** en la comprobación con resultado negativo el signo cambia de forma (`-1/6` → `(-1/6)·6` → `-1·6`) sin paso; 3 productos y 3 divisiones por paso; el factor `·N` nace dentro del tex de `Ka/Kb/Kc`; dice "para que sea múltiplo de N" aunque un denominador ya lo era (7/12-1/4 usa 48 en vez de 12).

## logaritmos / cuadratica
- **cuadratica:** la fila de referencia es idéntica a la ecuación y no tiene rótulo (el alumno ve la misma ecuación dos veces durante 8 pasos): rótulo "enunciado"; los operadores `=` y "entre" del renglón de x₂ y de la comprobación nacen sin brote (`revisar.ts` exime a los operadores); con base negativa en la comprobación `(-1)²=1` va en un paso (mientras `(-5)²` se expande); `4·1` repetido con c=1; reglas que no coinciden con el paso (`2n=n+n` en un paso que multiplica; `x=3` en vez de la general); texto "Multiplicamos cada número por su valor" confuso; rótulo del Δ debe decir `Δ=1`. **Largo real: 27 a 39 pasos** (la nota decía ~35): la comprobación de x₁ y x₂ ocupa 14 de 39; hacerla en paralelo ahorraría ~7.
- **logaritmos:** la comprobación nombra "la propiedad del producto" sin haberla enseñado; al desarrollar `bᵏ` los factores nuevos nacen del exponente `k` y no de la base; la fila de referencia no tiene rótulo; en propiedad el primer factor `f1` viene del 36 y los demás de la base.

## potencia / raiz / raiz-con-resto
- `5·1/1·2`: el 1 de abajo nace de la nada (`5=5/1` solo en el porqué) en todas las ramas; `16=2·2·2·2` y `15625=5·…` salen de golpe (dividir entre el primo paso a paso); **la lista de potencias perfectas muestra "las que caben" y el criterio es "las que dividen"**: en √72 también dividen el 4 y el 9 y se elige el 36 sin decir "la mayor"; en √242 la lista salta de 64 a 121; cociente y resto: `1·2=2` y `3−2=1` solo en el texto; tras `12=4·3` se pierde el signo de raíz y queda un 2 flotando sin etiqueta; el texto dice `√4=2` y en pantalla está `√(2²)`; tachar `2·2/1·2` deja `2/1` y salta a `2`; `∛9` da una vuelta de 11 pasos y termina igual que empezó sin decirlo; el último paso no vuelve al enunciado ni comprueba; potencia 2^24: 22 pasos casi idénticos y una fila de 47 piezas (probar a 375 px).

## Tests nuevos propuestos (se suman a los de arriba)
1. Todo operador de una fila nueva debe tener brote (generalizar; hoy `revisar.ts` exime a los operadores).
2. El texto de un paso no cita una expresión (`√4`, `5·(-3)`) que no exista como pieza, con sus signos, en el estado.
3. Un paso no cambia la forma de un signo (frente ↔ numerador) sin que el texto lo nombre.
4. Toda comprobación nace de una pieza de referencia que existe en el primer estado; la fila de referencia lleva rótulo.
5. Un número nuevo en una fracción (`x·1/1·k`) nace de una pieza o de un estado visible.
6. Cada candidato de una lista de elección tiene su prueba (tachado) antes de elegir.
7. El último estado se vincula al enunciado (el texto final cita la expresión original).
8. Brotes con el mismo `hacia` en una transición (limitación del motor).
9. Si el texto nombra una propiedad, debe estar enseñada antes o ser la `regla` del paso.

## Lección de proceso
Cada ronda de arreglos + auditoría resuelve lo anterior y encuentra hallazgos más finos. **Hay rendimientos decrecientes**: tras la ronda 2 no quedan saltos graves. El validador que falta es la mirada de Ronald en pantalla, que ningún agente tuvo (nadie vio el diseño, el desborde a 375 px ni el largo real).
