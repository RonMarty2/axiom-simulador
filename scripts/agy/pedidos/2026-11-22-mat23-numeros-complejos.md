# Pedido: Lección MAT-23 — Números imaginarios y complejos

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`
- Usa la skill `auditor-pedagogico` (`agentes/auditor-pedagogico.md`) para cuidar que no haya lagunas, saltos ni afirmaciones sin explicar.
- Usa `src/app/aprende/logica-conjuntos/page.tsx` como referencia exacta de estructura, imports, paleta `LIENZO`, tamaños de SVG y estilo.

## Qué archivo crear (SOLO este archivo)
`src/app/aprende/numeros-complejos/page.tsx`

## Temario oficial PSA 2027 (Minedu 4096.pdf pág. 42)
- El conjunto de los números complejos ($\mathbb{C}$).
- Unidad imaginaria ($i = \sqrt{-1}$, $i^2 = -1$) y sus propiedades.
- Potencias de la unidad imaginaria ($i^0, i^1, i^2, i^3$ y ciclo de período 4 usando resto módulo 4).
- Expresión binómica ($z = a + bi$), parte real, parte imaginaria, conjugado ($\bar{z} = a - bi$) y representación gráfica en el plano de Argand (módulo $|z| = \sqrt{a^2 + b^2}$).
- Operaciones en forma binómica: adición, sustracción, multiplicación y división (multiplicando por el conjugado del denominador).
- Operaciones combinadas y resolución de ecuaciones cuadráticas con discriminante negativo ($\Delta < 0$).

## Reglas obligatorias de AXIOM
1. `"use client";` al inicio, export default `Page` usando `LeccionShell` con `unidad="MAT-23"` y `tituloUnidad="Números imaginarios y complejos"`.
2. **6 escenas** completas y didácticas (con puente al inicio, un salto lógico por vez):
   - Escena 1: La unidad imaginaria $i$ y por qué existe ($\sqrt{-1}$, solución de $x^2 + 1 = 0$).
   - Escena 2: Potencias de $i$ (ciclo de 4 y regla del resto al dividir el exponente entre 4).
   - Escena 3: Forma binómica $a + bi$, conjugado y plano complejo (Argand) + módulo.
   - Escena 4: Suma, resta y multiplicación de números complejos.
   - Escena 5: División de complejos (truco del conjugado) y ejemplos resueltos tipo examen (`WorkedExample`).
   - Escena 6: Errores típicos (`Misconception`) y 5 ejercicios `AutoCheck` con respuestas variadas (posiciones distintas: 0, 1, 2, 3, 1 — nunca todas en 0) y explicación paso a paso verificada.
3. **Idioma:** TUTEO estricto para el alumno ("puedes", "observa", "calcula", "tu"). CERO voseo ("podés", "mirá", "calculá"). CERO guion largo `—` en el texto del alumno (usa punto, coma o dos puntos). CERO emojis en código o texto.
4. **Matemática:** toda expresión matemática entre `$...$` (nunca `\sen`, usar `\text{sen}` si apareciera; en JSX usar `{"$...$"}` si hay llaves `{}` para que React no se confunda).
5. **Dibujos SVG (Pizarra):** mínimo 3 pizarras claras con `viewBox="0 0 360 H"` (donde `H <= 360`), `fontSize >= 13` en todos los `<text>`, colores solo de `LIENZO` o variables CSS de dibujo del tema (NUNCA hex sueltos en el SVG). Coordenadas calculadas con precisión (ej. plano de Argand con ejes, vector $z = 3 + 4i$, módulo 5 y conjugado $\bar{z} = 3 - 4i$; ciclo de potencias $1, i, -1, -i$ en círculo).
6. **HTML válido:** nunca meter `<ul>`, `<div>` o `<p>` dentro de `<Parrafo>`.
7. **Verificación matemática:** cada ejemplo y cada `AutoCheck` debe tener aritmética 100 % exacta y verificada paso a paso.
