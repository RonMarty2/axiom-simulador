# Stacktern/mathSteps (evaluado 29-oct-2026)

## 1. Qué es de verdad
Ojo con el nombre: NO es el mathsteps de JavaScript (Socratic/Google, paquete npm `mathsteps` 0.2.0, Apache-2.0, sin tocar desde 2022). Este es una librería y CLI de Python, nueva, con pasos de métodos NUMÉRICOS: sistemas lineales (Gauss), determinante, inversa, LU, autovalores, Cramer, raíces (Newton), ODE, interpolación, integración numérica. NO hace álgebra de secundaria: ni fracciones, ni cuadráticas, ni despejar, ni factorizar.

## 2. Licencia
LICENSE leído: MIT ("mathsteps contributors"); `pyproject.toml` también dice MIT. Uso comercial permitido.

## 3. Salud
Muy joven: en mi clon superficial el último commit es 2026-10-07 y el CHANGELOG/README son recientes. No pude ver el historial completo (clon `--depth 1`). Riesgo de abandono alto por ser nuevo. No revisé issues.

## 4. Peso y dónde corre
Python >= 3.10; depende de numpy, scipy y sympy. Solo scripts y agentes. Repo de 1,4 MB.

## 5. Mapa contra Axiom
Casi nada. Matrices, ODE y métodos numéricos no están en lo que Axiom enseña según el inventario (fracciones, cuadrática, molaridad, tiro, mruv, interés). Toque lejano: sistemas 2x2 (fila 2). Sus pasos están en inglés ("Swap row 0 with row 1 (partial pivoting...)") y usan pivoteo parcial con fracciones (R1 - 1/3 R0), distinto de cómo lo haría un alumno a lápiz. Peor que lo de Axiom para enseñar.

## 6. Prueba chica
Instalado con pip en el venv del scratchpad. `determinant([[6,1,1],[4,-2,5],[2,8,7]])` = -306 exacto, correcto. `linear_system([[1,2],[3,4]],[5,11])` = x=[1,2] correcto, con 7 pasos en inglés. Funciona, pero no coincide con el estilo de Axiom.

## 7. Costo de integrar
No aplica.

## 8. Decisión
**DESCARTAR.** No toca ningún dolor del inventario; pasos en inglés y de estilo numérico; proyecto de semanas de vida. Ningún agente mejora.

Confianza: alta (probado).

## Lecciones nuevas
Nombre idéntico engaña: este "mathSteps" no es el de JS. Si alguna vez se evalúa el de JS: abandonado desde 2022.
