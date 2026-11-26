# Pedido: Neutralizar menciones visibles a FCyT / Ingeniería / PREU en lecciones compartidas con Medicina

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md`; usa la skill `verificador` (`agentes/verificador.md`) para no romper KaTeX, SVG ni tests.

## Contexto y decisión de Ronald (24-nov-2026)
Las lecciones de Física, Química, Geometría, Trigonometría, Biología y Morfofunción se muestran también a postulantes de **Medicina (PSA 2027)** siguiendo el temario del Ministerio de Educación. **No debe quedar ningún texto visible al alumno que diga «examen FCyT», «UMSS FCyT», «programa oficial UMSS FCyT», «PREU» o «Física/Química para Ingeniería»**.
- Reemplaza esas menciones por redacción neutral válida tanto para Medicina como para Ingeniería: ej. **«examen de admisión UMSS»**, **«examen de ingreso UMSS»**, **«Problemas tipo examen UMSS»**, **«temario oficial UMSS»**.
- **NO** toques: fórmulas matemáticas/KaTeX, SVG, coordenadas, `AutoCheck` (ni respuestas ni opciones), comentarios JSX `{/* basado en: ... */}`, ni usos legítimos de la palabra *ingeniería* dentro de contexto biomédico o físico real (ej. *bioingeniería*, *antenas parabólicas en ingeniería*).
- Todo texto editado debe quedar en **tuteo** (nunca voseo).

## Archivos permitidos (SOLO estos 22 archivos)
1. `src/app/aprende/bases-moleculares-vida/page.tsx`
2. `src/app/aprende/cinematica-1d/page.tsx`
3. `src/app/aprende/cinematica-2d/page.tsx`
4. `src/app/aprende/circuitos-dc/page.tsx`
5. `src/app/aprende/circunferencia/page.tsx`
6. `src/app/aprende/circunferencia-parabola-analitica/page.tsx`
7. `src/app/aprende/dinamica-newton/page.tsx`
8. `src/app/aprende/ecuacion-recta/page.tsx`
9. `src/app/aprende/electrostatica/page.tsx`
10. `src/app/aprende/enlace-quimico/page.tsx`
11. `src/app/aprende/estequiometria/page.tsx`
12. `src/app/aprende/gases-ideales/page.tsx`
13. `src/app/aprende/identidades-trigonometricas/page.tsx`
14. `src/app/aprende/morfofuncion-introduccion/page.tsx`
15. `src/app/aprende/nociones-quimica/page.tsx`
16. `src/app/aprende/poligonos-cuadrilateros/page.tsx`
17. `src/app/aprende/propiedades-coligativas/page.tsx`
18. `src/app/aprende/reacciones-balanceo/page.tsx`
19. `src/app/aprende/segmentos-angulos/page.tsx`
20. `src/app/aprende/soluciones/page.tsx`
21. `src/app/aprende/triangulos/page.tsx`
22. `src/app/aprende/vectores-fisica/page.tsx`

## Regla de edición por archivo
En cada archivo de la lista:
- Busca todas las apariciones visibles en texto JSX de `FCyT`, `PREU`, `Ingeniería` (cuando se refiera a la facultad, no a ejemplos técnicos como antenas o bioingeniería) y `Física para Ingeniería` / `Química para Ingeniería`.
- Reescribe solo esa frase para que sea neutral y natural para cualquier postulante UMSS (ej.:
  - `En el examen FCyT` → `En el examen de admisión UMSS`
  - `Problemas tipo examen FCyT UMSS` → `Problemas tipo examen UMSS`
  - `Caso de examen FCyT 2025 · ...` → `Caso de examen UMSS 2025 · ...`
  - `Para FCyT/medicina UMSS, se cuenta como 11.` → `Para el examen de admisión UMSS, se cuenta como 11.`
  - `en el programa oficial UMSS FCyT` → `en el temario de admisión UMSS`
  - `del PREU` / `F2 del PREU 2025` / `Q4 PREU 2025` → `del examen de admisión` / `un examen de admisión 2025`
  - `Cada examen FCyT trae 1–2` → `El examen de admisión suele incluir 1–2`
- Si además ves algún título/etiqueta `Física para Ingeniería` o `Química para Ingeniería`, cámbialo a `Física` o `Química`.

## Criterios de cierre
- Ediciones quirúrgicas de solo esas líneas; sin reformatear el resto del archivo.
- Entrega en tu respuesta una lista breve archivo por archivo con los reemplazos realizados (máx. 40 líneas).
