# bjodah/chempy (evaluado 29-oct-2026)

## 1. Qué es de verdad
Librería Python de química: fórmula a masa y composición, balanceo de reacciones, equilibrios, cinética, electroquímica, termodinámica. NO da pasos para el alumno.

## 2. Licencia
LICENSE leído: BSD (Björn Dahlgren, 2015-2025), con la redacción de las cláusulas de redistribución y de no uso del nombre. Uso comercial permitido.

## 3. Salud
Último commit 2026-10-21 (merge de PR). Activo, pocos mantenedores. Versión 0.10.2 en pip (0.x). No revisé issues.

## 4. Peso y dónde corre
Python, wheel de 232 KB; instala junto a sympy. Solo scripts y agentes.

## 5. Mapa contra Axiom
- Fila 5: Axiom mantiene a mano la tabla de elementos y las reglas de oxidación. Chempy tiene tabla de masas y `balance_stoichiometry`. Sirve de oráculo contra `generadores-quimica.ts` y `generadores-redox.ts` (masas molares, coeficientes).
- Fila 12: `resolutor-exacto` y `verificador` comprueban estequiometría con código fiable.
- No reemplaza los generadores: no explica.

## 6. Prueba chica
`scratchpad\t1.py`: H2SO4 = 98,072; Ca(OH)2 = 74,092; NaCl = 58,440; KMnO4 = 158,032 (no las comparé con la tabla de Axiom, que no abrí). Balanceo: Fe + O2 -> Fe2O3 da 4, 3, 2 OK; C3H8 + O2 -> CO2 + H2O da 1, 5, 3, 4 OK; redox ácido MnO4- + Fe+2 + H+ -> Mn+2 + Fe+3 + H2O da 1, 5, 8, 1, 5, 4 OK (el clásico). Iones: Fe+3 carga 3; SO4-2 masa 96,06.

## 7. Costo de integrar
Bajo como script (`scripts/verificar-quimica.py`), cero en bundle. Un test que cruce las masas de `generadores-quimica.ts` con chempy sería 1 archivo nuevo.

## 8. Decisión
**USAR** como oráculo de desarrollo para masas molares y balanceo. Si se quisiera su tabla en la app, **TOMAR LA IDEA**.
Agente que mejora: `resolutor-exacto` (química) y `verificador`, cruzando masa molar y redox.

Confianza: alta.

## Para Ronald
Mayor valor: un test que compare las masas molares de Axiom con chempy. Ojo: chempy usa masas con muchos decimales y la UMSS probablemente usa redondeadas (Na=23, Cl=35,5); la comparación necesita tolerancia. No lo verifiqué.

## Lecciones nuevas
El balanceo redox en medio ácido sale correcto sin indicar semirreacciones.
