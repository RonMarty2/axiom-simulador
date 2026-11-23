# Pedido: Lección MAT-28 — Introducción al análisis matemático: límites, derivadas e integrales

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`
- Usa la skill `auditor-pedagogico` (`agentes/auditor-pedagogico.md`) para cuidar que no haya lagunas, saltos ni afirmaciones sin explicar.
- Usa `src/app/aprende/logica-conjuntos/page.tsx` como referencia exacta de estructura, imports, paleta `LIENZO`, tamaños de SVG y estilo.

## Qué archivo crear (SOLO este archivo)
`src/app/aprende/analisis-limites-derivadas/page.tsx`

## Temario oficial PSA 2027 (Minedu 4096.pdf pág. 44–45)
- **Límites de funciones reales:** idea intuitiva de acercarse a un punto ($\lim_{x \to a} f(x) = L$), sustitución directa, indeterminación $\frac{0}{0}$ (resuelta por factorización y por racionalización con conjugado) e indeterminación $\frac{\infty}{\infty}$ al infinito (comparación de grados del numerador y denominador).
- **Derivadas:** significado geométrico (pendiente de la recta tangente) y físico (razón de cambio instantánea); definición conceptual $\lim_{h \to 0}\frac{f(x+h)-f(x)}{h}$; reglas básicas de derivación: constante ($c' = 0$), potencia ($(x^n)' = n x^{n-1}$), múltiplo constante y suma/resta, producto ($(uv)' = u'v + uv'$), cociente ($\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$) y regla de la cadena simple ($(u^n)' = n u^{n-1}\cdot u'$); aplicación rápida: recta tangente y puntos críticos (máximos y mínimos con $f'(x) = 0$).
- **Integrales básicas:** antiderivada o integral indefinida ($\int x^n\,dx = \frac{x^{n+1}}{n+1} + C$ para $n \neq -1$, linealidad y por qué siempre lleva $+ C$); integral definida y regla de Barrow ($\int_a^b f(x)\,dx = F(b) - F(a)$) interpretada como área bajo la curva.

## Reglas obligatorias de AXIOM
1. `"use client";` al inicio, export default `Page` usando `LeccionShell` con `unidad="MAT-28"` y `tituloUnidad="Análisis matemático: límites, derivadas e integrales"`.
2. **6 escenas** completas y didácticas (con puente al inicio, un salto lógico por vez):
   - Escena 1: Límites: qué significa acercarse, sustitución directa e indeterminaciones $\frac{0}{0}$ y $\frac{\infty}{\infty}$.
   - Escena 2: La derivada como pendiente tangente y reglas básicas (constante, potencia, suma).
   - Escena 3: Reglas del producto, cociente, cadena simple y puntos críticos (máximos y mínimos).
   - Escena 4: La integral como proceso inverso (antiderivada $+ C$) e integral definida (regla de Barrow y área).
   - Escena 5: 3 ejemplos resueltos tipo examen (`WorkedExample`: un límite $0/0$ factorizando y otro al infinito, una derivada con regla de la cadena o punto crítico, y una integral definida con regla de Barrow).
   - Escena 6: 3 errores típicos (`Misconception`: creer que $0/0$ vale $0$ o $1$; derivar un producto como $u'\cdot v'$ en vez de $u'v + uv'$; olvidar la constante $+ C$ en la integral indefinida o aplicar $\frac{x^{n+1}}{n+1}$ cuando $n = -1$) y 5 ejercicios `AutoCheck` con respuestas variadas (posiciones: 0, 2, 1, 3, 2) y explicación paso a paso verificada.
3. **Idioma:** TUTEO estricto para el alumno. CERO voseo. CERO guion largo `—`. CERO emojis.
4. **Matemática:** toda expresión matemática entre `$...$` (en JSX usar `{"$...$"}` si hay llaves `{}`).
5. **Dibujos SVG (Pizarra):** mínimo 3 pizarras claras con `viewBox="0 0 360 H"` (`H <= 360`), `fontSize >= 13`, colores solo de `LIENZO` o variables CSS de dibujo del tema (NUNCA hex sueltos). Gráficas con coordenadas exactas: límite con hueco removible en un punto; curva con recta secante acercándose a la tangente (pendiente $f'(x_0)$) y máximo con pendiente $0$; área sombreada bajo una curva entre $x = a$ y $x = b$.
6. **HTML válido:** nunca meter `<ul>`, `<div>` o `<p>` dentro de `<Parrafo>`.
7. **Verificación matemática:** cada ejemplo y cada `AutoCheck` debe tener álgebra y aritmética 100 % exactas y verificadas.
