# Pedido: Lección MAT-24 — Análisis combinatorio y Binomio de Newton

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`
- Usa la skill `auditor-pedagogico` (`agentes/auditor-pedagogico.md`) para cuidar que no haya lagunas, saltos ni afirmaciones sin explicar.
- Usa `src/app/aprende/logica-conjuntos/page.tsx` como referencia exacta de estructura, imports, paleta `LIENZO`, tamaños de SVG y estilo.

## Qué archivo crear (SOLO este archivo)
`src/app/aprende/combinatoria-binomio/page.tsx`

## Temario oficial PSA 2027 (Minedu 4096.pdf pág. 43 y 44)
- Principios básicos de conteo: principio aditivo ("o", excluyentes) y principio multiplicativo ("y", etapas sucesivas).
- Factorial de un número natural ($n!$, $0! = 1$) y simplificación de cocientes de factoriales.
- Permutaciones simples ($P_n = n!$) y permutaciones con repetición ($P_n^{a,b,\dots} = \frac{n!}{a!\,b!\cdots}$).
- Variaciones simples ($V_n^k = \frac{n!}{(n-k)!}$, sí importa el orden) y con repetición ($VR_n^k = n^k$).
- Combinaciones simples ($C_n^k = \binom{n}{k} = \frac{n!}{k!(n-k)!}$, no importa el orden) y números combinatorios.
- Binomio de Newton $(a+b)^n$, Triángulo de Pascal y cálculo del término $k$-ésimo ($T_{k+1} = \binom{n}{k} a^{n-k} b^k$).

## Reglas obligatorias de AXIOM
1. `"use client";` al inicio, export default `Page` usando `LeccionShell` con `unidad="MAT-24"` y `tituloUnidad="Análisis combinatorio y Binomio de Newton"`.
2. **6 escenas** completas y didácticas (con puente al inicio, un salto lógico por vez):
   - Escena 1: Principios de conteo (aditivo y multiplicativo) y factorial ($n!$, por qué $0!=1$).
   - Escena 2: Permutaciones (importa el orden y entran todos: simples y con repetición).
   - Escena 3: Variaciones vs. Combinaciones (árbol de decisión visual: ¿importa el orden? ¿entran todos? ¿se repiten?).
   - Escena 4: Triángulo de Pascal y Binomio de Newton (término general $T_{k+1}$).
   - Escena 5: Ejemplos resueltos tipo examen (`WorkedExample`, incluyendo 1 de conteo/combinaciones y 1 de término n-ésimo del Binomio de Newton).
   - Escena 6: Errores típicos (`Misconception`: confundir variación con combinación, olvidar que $T_k$ usa $k-1$) y 5 ejercicios `AutoCheck` con respuestas variadas (posiciones distintas: 2, 0, 3, 1, 2 — nunca todas en 0) y explicación paso a paso verificada.
3. **Idioma:** TUTEO estricto para el alumno ("puedes", "observa", "calcula", "tu"). CERO voseo ("podés", "mirá", "calculá"). CERO guion largo `—` en el texto del alumno. CERO emojis en código o texto.
4. **Matemática:** toda expresión matemática entre `$...$` (en JSX usar `{"$...$"}` si hay llaves `{}` para que React no se confunda).
5. **Dibujos SVG (Pizarra):** mínimo 3 pizarras claras con `viewBox="0 0 360 H"` (`H <= 360`), `fontSize >= 13` en todos los `<text>`, colores solo de `LIENZO` o variables CSS de dibujo del tema (NUNCA hex sueltos en el SVG). Ejemplos: árbol de decisión Permutación / Variación / Combinación; diagrama de conteo por casillas; Triángulo de Pascal hasta fila 4 con sumas claras.
6. **HTML válido:** nunca meter `<ul>`, `<div>` o `<p>` dentro de `<Parrafo>`.
7. **Verificación matemática:** cada ejemplo y cada `AutoCheck` debe tener aritmética 100 % exacta y verificada paso a paso.
