# hgrecco/pint (evaluado 29-oct-2026)

## 1. Qué es de verdad
Librería Python de unidades físicas: cantidades con unidad, conversiones, análisis dimensional, error al sumar magnitudes incompatibles. NO da pasos ni tacha unidades en pantalla.

## 2. Licencia
LICENSE leído: BSD (Hernan E. Grecco y colaboradores, "Some rights reserved", con cláusula también sobre la documentación). Uso comercial permitido.

## 3. Salud
Último commit 2026-10-28. Activo. El repo actual pide Python >= 3.12; pip instaló pint 0.25.3 en el Python 3.11 de Ronald (versión previa compatible). No revisé issues.

## 4. Peso y dónde corre
Python, wheel de 307 KB. Solo scripts y agentes, no en la app. (Para JS existe `js-quantities`, no evaluado.)

## 5. Mapa contra Axiom
- Fila 4 (unidades): hoy `pegarUnidades` y texto a mano. Pint sirve de oráculo para auditar el resultado y la unidad de cada generador (m/s, km/h, mol/L). Mejora a `resolutor-exacto` ("un tercio de errores de física son de unidades") y `verificador`.
- Fila 5: molaridad, mol/L por L da mol.
- No cambia la UI.

## 6. Prueba chica
`scratchpad\t1.py`: 72 km/h a m/s = 20,0 m/s OK; (2 mol/L)(0,5 L) = 1,0 mol OK; 1,5 mol/L a mmol/mL = 1,5; 5 m + 3 s lanza DimensionalityError (justo el error de unidades que se busca atrapar); 10 m/s por 3 s = 30 m; (10 m/s)/(2 s) = m/s^2. El formato `~P` se rompió en la consola de Windows (superíndice ilegible); `~L` da LaTeX correcto. No lo comparé con un generador de Axiom concreto.

## 7. Costo de integrar
Bajo si es script de desarrollo: 1 script `scripts/verificar-unidades.py` y 2 agentes. Cero impacto en bundle.

## 8. Decisión
**USAR** como herramienta de desarrollo (verificador de unidades). Para la app: **TOMAR LA IDEA** de una tabla de conversión única si Ronald quiere unificar la fila 4.
Agente que mejora: `resolutor-exacto` usa pint para chequear las unidades de cada paso en vez de revisión visual.

Confianza: alta para desarrollo; media para la idea de la app (no leí `datos.ts`).

## Lecciones nuevas
La consola de Windows rompe `~P` de pint; usar `~L` o `~`.
