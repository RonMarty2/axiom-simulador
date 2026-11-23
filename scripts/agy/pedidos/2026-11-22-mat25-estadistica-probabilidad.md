# Pedido: Lección MAT-25 — Estadística, medidas de dispersión y probabilidad

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`
- Usa la skill `auditor-pedagogico` (`agentes/auditor-pedagogico.md`) para cuidar que no haya lagunas, saltos ni afirmaciones sin explicar.
- Usa `src/app/aprende/logica-conjuntos/page.tsx` como referencia exacta de estructura, imports, paleta `LIENZO`, tamaños de SVG y estilo.

## Qué archivo crear (SOLO este archivo)
`src/app/aprende/estadistica-probabilidad/page.tsx`

## Temario oficial PSA 2027 (Minedu 4096.pdf pág. 43)
- Medidas de tendencia central: media aritmética ($\bar{x}$), mediana ($Me$) y moda ($Mo$) en datos no agrupados y en tablas simples.
- Medidas de posición: cuartiles ($Q_1, Q_2, Q_3$), deciles y percentiles.
- Medidas de dispersión: rango ($R$), varianza ($\sigma^2$ poblacional y $s^2$ muestral), desviación estándar ($\sigma$ o $s$) y coeficiente de variación ($CV$).
- Probabilidad clásica (regla de Laplace: $P(A) = \frac{\text{casos favorables}}{\text{casos posibles}}$), suceso contrario ($P(A^c) = 1 - P(A)$), unión de sucesos ($P(A \cup B) = P(A) + P(B) - P(A \cap B)$) y sucesos independientes ($P(A \cap B) = P(A) \cdot P(B)$).

## Reglas obligatorias de AXIOM
1. `"use client";` al inicio, export default `Page` usando `LeccionShell` con `unidad="MAT-25"` y `tituloUnidad="Estadística, dispersión y probabilidad"`.
2. **6 escenas** completas y didácticas (con puente al inicio, un salto lógico por vez):
   - Escena 1: Medidas de tendencia central (media, mediana, moda) y cuándo conviene cada una.
   - Escena 2: Medidas de posición (cuartiles $Q_1, Q_2, Q_3$, percentiles y diagrama de caja).
   - Escena 3: Medidas de dispersión (rango, varianza, desviación estándar y coeficiente de variación).
   - Escena 4: Probabilidad clásica (Laplace), complemento, unión e independencia.
   - Escena 5: 3 ejemplos resueltos tipo examen (`WorkedExample`: media/mediana/desviación estándar con datos limpios y enteros, y 2 de probabilidad).
   - Escena 6: 3 errores típicos (`Misconception`) y 5 ejercicios `AutoCheck` con respuestas variadas (posiciones: 1, 3, 0, 2, 1) y explicación paso a paso verificada.
3. **Idioma:** TUTEO estricto para el alumno. CERO voseo. CERO guion largo `—`. CERO emojis.
4. **Matemática:** toda expresión matemática entre `$...$` (en JSX usar `{"$...$"}` si hay llaves `{}`).
5. **Dibujos SVG (Pizarra):** mínimo 3 pizarras claras con `viewBox="0 0 360 H"` (`H <= 360`), `fontSize >= 13`, colores solo de `LIENZO` o variables CSS de dibujo del tema (NUNCA hex sueltos).
6. **HTML válido:** nunca meter `<ul>`, `<div>` o `<p>` dentro de `<Parrafo>`.
7. **Verificación matemática:** cada ejemplo y cada `AutoCheck` debe tener aritmética 100 % exacta y verificada.
