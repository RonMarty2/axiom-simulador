# sympy/sympy (evaluado 29-oct-2026)

## 1. Qué es de verdad
Álgebra simbólica en Python puro: racionales exactos, radicales, resolver ecuaciones, factorizar, integrar, LaTeX. Probado: `Rational(1,2)-Rational(3,4)+Rational(5,6)` = 7/12, `solve(x**2-5x+6)` = [2, 3], `sqrt(50)` = 5*sqrt(2), `radsimp(1/(sqrt(3)-1))` = (1+sqrt(3))/2. NO genera pasos para el alumno. Solo `sympy.integrals.manualintegrate.integral_steps` devuelve un árbol de reglas (probado con x*e^x: PartsRule con u, dv, v). Los pasos los sigue escribiendo Axiom.

## 2. Licencia
LICENSE leído: BSD de 3 cláusulas (SymPy Development Team), con cláusulas BSD de Diofant y multipledispatch incluidas. Uso comercial permitido.

## 3. Salud
Último commit 2026-10-29. Muy activo, no archivado. No revisé issues abiertos.

## 4. Peso y dónde corre
Python. Wheel de 6,3 MB. Solo en scripts y agentes, no en la app. El Python 3.11 de Ronald alcanza (instalé 1.14.0 sin problema).

## 5. Mapa contra Axiom
- Fila 3 (exactitud): igual que hoy, pero hoy `resolutor-exacto` lo usa suelto por Bash cada vez. Mejora: un script fijo reutilizable. Afecta `agentes/resolutor-exacto.md` y `verificador`.
- Fila 1 (fórmulas): `latex(Rational(7,12))` da `\frac{7}{12}`; sirve para sacar el TeX de un resultado sin escribirlo a mano, solo en scripts.
- Fila 2 (animaciones): no aporta pasos reutilizables. Sirve de oráculo: un test Python que compare el resultado final de cada generador con sympy.
- Filas 10 y 11 (ejercicios nuevos, expresión del alumno): un backend Python no está en el stack Next; no cabe sin servidor extra.

## 6. Prueba chica
Hecha en un venv del scratchpad (`scratchpad\t1.py`). Todos los casos coinciden con la matemática y con el 7/12 de compute-engine y de `Fraction`. No lo comparé con la salida del generador de fracciones de Axiom (no lo corrí).

## 7. Costo de integrar
Bajo: 1 script `scripts/verificar-cuenta.py` y actualizar 2 agentes. No toca bundle ni tests. Riesgo casi nulo. Un test en CI exigiría instalar sympy allá (no revisé el CI).

## 8. Decisión
**USAR** (solo como herramienta de desarrollo). Razón: ya se usa informalmente; el aporte es formalizarlo.
Agente que mejora: `resolutor-exacto` y `verificador` llaman a un script fijo con sympy en vez de código suelto.

Confianza: alta.

## Lecciones nuevas
`integral_steps` es lo único con "pasos" en sympy; poco útil porque Axiom casi no enseña integrales.
