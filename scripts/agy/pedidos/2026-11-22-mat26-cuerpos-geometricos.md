# Pedido: Lección MAT-26 — Geometría del espacio y cuerpos 3D

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`
- Usa la skill `auditor-pedagogico` (`agentes/auditor-pedagogico.md`) para cuidar que no haya lagunas, saltos ni afirmaciones sin explicar.
- Usa `src/app/aprende/logica-conjuntos/page.tsx` como referencia exacta de estructura, imports, paleta `LIENZO`, tamaños de SVG y estilo.

## Qué archivo crear (SOLO este archivo)
`src/app/aprende/cuerpos-geometricos/page.tsx`

## Temario oficial PSA 2027 (Minedu 4096.pdf pág. 40)
- El espacio tridimensional: punto, recta, segmento y plano; poliedros y cuerpos redondos.
- Prismas (cubo, paralelepípedo/ortoedro, prisma recto): área lateral ($A_L = P_b \cdot h$), área total ($A_T = A_L + 2A_b$), volumen ($V = A_b \cdot h$) y diagonal del cubo ($d = a\sqrt{3}$) y del ortoedro ($d = \sqrt{a^2+b^2+c^2}$).
- Pirámide recta: apotema lateral, área lateral ($A_L = \frac{P_b \cdot a_p}{2}$), área total y volumen ($V = \frac{1}{3} A_b \cdot h$).
- Cuerpos de revolución: cilindro ($A_L = 2\pi r h$, $V = \pi r^2 h$), cono ($g = \sqrt{r^2+h^2}$, $A_L = \pi r g$, $V = \frac{1}{3}\pi r^2 h$) y esfera ($A = 4\pi r^2$, $V = \frac{4}{3}\pi r^3$).
- Relación de semejanza en 3D: si las longitudes se multiplican por $k$, las áreas se multiplican por $k^2$ y los volúmenes por $k^3$.

## Reglas obligatorias de AXIOM
1. `"use client";` al inicio, export default `Page` usando `LeccionShell` con `unidad="MAT-26"` y `tituloUnidad="Geometría del espacio y cuerpos 3D"`.
2. **6 escenas** completas y didácticas (con puente al inicio, un salto lógico por vez):
   - Escena 1: Poliedros y cuerpos redondos (elementos: caras, aristas, vértices, base, altura y generatriz).
   - Escena 2: Prismas y cubo (área lateral, área total, volumen y diagonales).
   - Escena 3: Pirámide recta (diferencia entre altura $h$ y apotema lateral $a_p$, factor $1/3$).
   - Escena 4: Cuerpos redondos: cilindro, cono y esfera (y relación $k, k^2, k^3$).
   - Escena 5: 3 ejemplos resueltos tipo examen (`WorkedExample`: cubo/prisma, cono con Pitágoras para la generatriz, y esfera/cilindro).
   - Escena 6: 3 errores típicos (`Misconception`: confundir altura con generatriz/apotema, olvidar el $1/3$ en cono/pirámide, duplicar el radio y creer que el volumen solo se duplica) y 5 ejercicios `AutoCheck` con respuestas variadas (posiciones: 3, 1, 0, 2, 0) y explicación paso a paso verificada.
3. **Idioma:** TUTEO estricto para el alumno. CERO voseo. CERO guion largo `—`. CERO emojis.
4. **Matemática:** toda expresión matemática entre `$...$` (en JSX usar `{"$...$"}` si hay llaves `{}`).
5. **Dibujos SVG (Pizarra):** mínimo 3 pizarras claras con `viewBox="0 0 360 H"` (`H <= 360`), `fontSize >= 13`, colores solo de `LIENZO` o variables CSS de dibujo del tema (NUNCA hex sueltos). Coordenadas geométricas exactas (prisma/cubo en perspectiva, cono con triángulo rectángulo $r, h, g$, cilindro y esfera con radio $r$).
6. **HTML válido:** nunca meter `<ul>`, `<div>` o `<p>` dentro de `<Parrafo>`.
7. **Verificación matemática:** cada ejemplo y cada `AutoCheck` debe tener aritmética 100 % exacta y verificada.
