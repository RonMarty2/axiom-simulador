# Auditoría pedagógica · tanda 1 (6-nov-2026)

Hecha por `agy` Flash Medium (solo lectura) y **comprobada a mano contra el código** de cada lección. Las cuentas de las 6 lecciones dieron bien; lo de abajo es lo confirmado. Nada está corregido todavía: las correcciones de contenido las aprueba Ronald.

Lecciones: ecuaciones-segundo-grado, sistemas-lineales, gases-ideales, dinamica-newton, trabajo-energia, estequiometria (esta última, limpia).

## Errores confirmados
- **trabajo-energia L338** · dice `E_mi = E_mf + W_fricción (energía disipada)`, pero la lección enseña que W de la fricción es negativo. Con ese signo la fórmula daría que la fricción suma energía. Arreglo: `E_mi = E_mf + E_disipada`, con `E_disipada = |W_fricción| = f·d`.
- **sistemas-lineales L366-419 y L676-701** · "billetes de 2 Bs y 5 Bs": en Bolivia esos cortes son monedas (el billete más chico es de 10 Bs). Arreglo: "monedas" en el enunciado, el paso a paso y el aria-label. La cuenta (11 y 14, total 92) está bien.
- **ecuaciones-segundo-grado L66** · el discriminante se imprime `Δ = -2² − 4·1·-3 = 16`; sin paréntesis, -2² se lee como -4 y `·-3` confunde. Arreglo: `(b)²` y `({c})` entre paréntesis.
- **dinamica-newton L257** · "el piso te empuja a tú" → "a ti".
- **ecuaciones-segundo-grado L518** · "Memorizala" es voseo → "Memorízala".
- **dinamica-newton L292** · "estes" → "estés".

## Lagunas confirmadas
- **gases-ideales** · "CN" se usa 4 veces y no se define (0 °C, 1 atm, 22.4 L/mol). Agregar la definición.
- **gases-ideales L40** · "el aire pesa menos" → "la presión y la densidad del aire son menores".
- **sistemas-lineales L328** · la tarjeta dice `x = 6`; la solución es el par `(6, 4)`.
- **sistemas-lineales L513** · llama "S-I-R" a los métodos "en orden de preferencia", pero el orden que recomienda es R-S-I.
- **trabajo-energia L402-411** · el ejemplo da 37° y no lo usa; falta decir que la altura no depende del ángulo.
- **dinamica-newton L464-474** · el ejemplo del resorte no explica dónde están A, B y C.
- **ecuaciones-segundo-grado L409** · "(y a lo sumo) como mayor potencia" confuso.

## Forma
- **Práctica con la respuesta siempre en la primera opción** (`c: 0` en las 5): dinamica-newton y trabajo-energia; sistemas-lineales en 4 de 5. Se aprueba sin leer. Hay que repartir las respuestas.
- Fórmulas en HTML plano en vez de `MathText` (gases-ideales entera): estético, no urgente.
- Descartado por mí: nada de lo reportado resultó inventado.
