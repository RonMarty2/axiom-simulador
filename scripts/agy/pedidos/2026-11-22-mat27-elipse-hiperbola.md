# Pedido: Lección MAT-27 — Cónicas: elipse e hipérbola

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`
- Usa la skill `auditor-pedagogico` (`agentes/auditor-pedagogico.md`) para cuidar que no haya lagunas, saltos ni afirmaciones sin explicar.
- Usa `src/app/aprende/logica-conjuntos/page.tsx` como referencia exacta de estructura, imports, paleta `LIENZO`, tamaños de SVG y estilo.

## Qué archivo crear (SOLO este archivo)
`src/app/aprende/elipse-hiperbola/page.tsx`

## Temario oficial PSA 2027 (Minedu 4096.pdf pág. 44–45)
- Secciones cónicas (puente breve desde la circunferencia y la parábola ya vistas): qué diferencia a la elipse y a la hipérbola.
- **Elipse:** definición como lugar geométrico ($d(P, F_1) + d(P, F_2) = 2a$); elementos (centro $C(h,k)$, focos $F_1, F_2$, vértices, eje mayor $2a$, eje menor $2b$, distancia focal $2c$, lado recto $LR = \frac{2b^2}{a}$); relación pitagórica $a^2 = b^2 + c^2$ (con $a > b > 0$); excentricidad $e = \frac{c}{a}$ ($0 < e < 1$); ecuación canónica en el origen y ordinaria con centro $(h,k)$ (horizontal y vertical).
- **Hipérbola:** definición como lugar geométrico ($|d(P, F_1) - d(P, F_2)| = 2a$); elementos (centro $C(h,k)$, focos, vértices, eje transverso $2a$, eje conjugado $2b$, distancia focal $2c$, lado recto $LR = \frac{2b^2}{a}$); relación pitagórica $c^2 = a^2 + b^2$ (con $c > a$); excentricidad $e = \frac{c}{a} > 1$; asíntotas ($y - k = \pm\frac{b}{a}(x - h)$ en horizontal y $y - k = \pm\frac{a}{b}(x - h)$ en vertical); ecuación canónica y ordinaria (horizontal y vertical).
- **Cómo reconocer cualquier cónica desde su ecuación general** $Ax^2 + Cy^2 + Dx + Ey + F = 0$ (sin término $xy$): $A = C$ (circunferencia), uno es cero (parábola), $A \neq C$ con igual signo (elipse), $A$ y $C$ con signos opuestos (hipérbola); y paso de general a ordinaria completando cuadrados.

## Reglas obligatorias de AXIOM
1. `"use client";` al inicio, export default `Page` usando `LeccionShell` con `unidad="MAT-27"` y `tituloUnidad="Cónicas: elipse e hipérbola"`.
2. **6 escenas** completas y didácticas (con puente al inicio, un salto lógico por vez):
   - Escena 1: La elipse: definición geométrica, elementos y relación $a^2 = b^2 + c^2$.
   - Escena 2: Ecuaciones de la elipse (horizontal vs vertical, centro en $(0,0)$ y $(h,k)$) y excentricidad.
   - Escena 3: La hipérbola: definición, elementos, relación $c^2 = a^2 + b^2$ y asíntotas.
   - Escena 4: Reconocer cualquier cónica en la ecuación general y completar cuadrados.
   - Escena 5: 3 ejemplos resueltos tipo examen (`WorkedExample`: hallar focos/excentricidad/lado recto de una elipse desde su ecuación, hallar vértices/focos/asíntotas de una hipérbola, y pasar una ecuación general a ordinaria completando cuadrados).
   - Escena 6: 3 errores típicos (`Misconception`: confundir $a^2 = b^2 + c^2$ de la elipse con $c^2 = a^2 + b^2$ de la hipérbola; creer que $a$ siempre va debajo de $x^2$; olvidar el signo en la hipérbola o invertir la pendiente de las asíntotas) y 5 ejercicios `AutoCheck` con respuestas variadas (posiciones: 2, 0, 3, 1, 2) y explicación paso a paso verificada.
3. **Idioma:** TUTEO estricto para el alumno. CERO voseo. CERO guion largo `—`. CERO emojis.
4. **Matemática:** toda expresión matemática entre `$...$` (en JSX usar `{"$...$"}` si hay llaves `{}`).
5. **Dibujos SVG (Pizarra):** mínimo 3 pizarras claras con `viewBox="0 0 360 H"` (`H <= 360`), `fontSize >= 13`, colores solo de `LIENZO` o variables CSS de dibujo del tema (NUNCA hex sueltos). Coordenadas geométricas exactas: elipse con focos, semiejes $a, b, c$ y triángulo rectángulo; hipérbola con ramas, rectángulo auxiliar, asíntotas, vértices y focos; tabla visual comparativa de las 4 cónicas.
6. **HTML válido:** nunca meter `<ul>`, `<div>` o `<p>` dentro de `<Parrafo>`.
7. **Verificación matemática:** cada ejemplo y cada `AutoCheck` debe tener aritmética 100 % exacta y verificada (usa ternas pitagóricas limpias como $3, 4, 5$ o $5, 12, 13$ donde convenga).
