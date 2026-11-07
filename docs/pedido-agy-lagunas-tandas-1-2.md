# Pedido a agy: aplicar 8 textos aprobados por Ronald (lagunas de tandas 1 y 2)

Ronald aprobó TODOS el 7-nov-2026. Edita SOLO estos 6 archivos de `src/app/aprende/`:
`gases-ideales`, `trabajo-energia`, `ecuaciones-segundo-grado`, `logaritmacion`, `razones-trigonometricas`, `electrostatica` (cada uno `page.tsx`).
NO toques simulador, dashboard, practicar, ni ningún `page.tsx` fuera de esos seis. Ignora los archivos `*_Conflict.tsx`.

Reglas: texto del alumno en TUTEO (nunca voseo). Sin emojis. Respeta el estilo de cada archivo (componentes `Resumen`, `Parrafo`, `Ejemplo`, `Cuidado`, `MathText`; fórmulas con `MathText` y `$...$`). Cambio mínimo; no reescribas nada más. Si un punto ya está dicho igual en la lección, no lo dupliques: dilo en la respuesta.

1. **gases-ideales**, escena de variables (la que explica P, V, n, T; búscala por sus títulos/`Definicion`): agrega una `Definicion` o `Resumen` con: «Condiciones normales (CN): presión de 1 atm y temperatura de 0 °C (273 K). En CN, 1 mol de cualquier gas ocupa 22.4 L. Sale de PV = nRT: V = (1 × 0.082 × 273) / 1 ≈ 22.4 L.» Si ya existe un texto de CN en otra escena, enlázalo en vez de repetirlo.
2. **gases-ideales** línea ~40 (`Hook`): cambiar «el aire pesa menos que en Santa Cruz» por «la presión y la densidad del aire son menores que en Santa Cruz».
3. **trabajo-energia**, al final del `WorkedExample` «Bloque-resorte · F15 1op-2-2025» (línea ~402-411, resultado 0.494 m): agrega «Fíjate que el ángulo de 37° no se usó: la energía potencial solo depende de la altura vertical h. Si te pidieran la distancia sobre la rampa, ahí sí: d = h / sen 37° ≈ 0.82 m.» (0.494 / 0.6018 = 0.821, comprobado).
4. **ecuaciones-segundo-grado** línea ~409: reemplazar el texto de la `Definicion` por «Una ecuación es de segundo grado si el mayor exponente de la incógnita es 2. Su forma general es ax² + bx + c = 0, con a ≠ 0.» (conserva el término y la estructura).
5. **logaritmacion**, escena de la definición (~líneas 365-388, ya tiene «con a > 0, a ≠ 1 y b > 0»): agrega «La base no puede ser 1 (1 elevado a cualquier número siempre da 1) ni negativa, y el argumento debe ser positivo, porque una potencia de base positiva nunca da 0 ni negativos.» como `Parrafo` o dentro de `Cuidado`.
6. **logaritmacion**, `Esc07_Cambio` (~línea 516-532), después de la fórmula: agrega «Si x = log_a(b), entonces aˣ = b. Aplica log_c a ambos lados: x · log_c(a) = log_c(b), y despejando x sale la fórmula.» con subíndices como en el resto (`log<sub>a</sub>`).
7. **razones-trigonometricas** ~línea 174-184 (`Resumen` de identidades): agrega debajo «Divide sen² + cos² = 1 entre cos² y obtienes 1 + tan² = sec². Si divides entre sen², obtienes 1 + cot² = csc².»
8. **electrostatica** ~línea 287: después de «V = kQ/r (no es vectorial; es escalar)» agrega «Toma el potencial como cero en el infinito.»

Controles: `npx tsc --noEmit` y `npx eslint` sobre los 6 archivos sin errores nuevos. Responde con: lista de los 8 puntos (aplicado / ya estaba / dudas) y el DIFF.
