# PaddlePaddle/PaddleOCR, tubería PP-StructureV3 (evaluado 29-oct-2026)

## 1. Qué es de verdad
Kit de OCR de Baidu sobre su propio motor (PaddlePaddle). La parte que importa acá es `PP-StructureV3`: diseño de página, OCR multilingüe, fórmulas a LaTeX (`PP-FormulaNet_plus-L`), tablas y recorte de figuras, salida markdown por página. También trae `PaddleOCR-VL` (modelo de visión 0,9B), que no probé.
NO resuelve: estructura de preguntas, figuras como dibujo. Ojo: **MinerU usa estos mismos modelos** (convertidos a ONNX) en su nivel `basic`.

## 2. Licencia
`LICENSE` leído: Apache 2.0, sin cláusulas extra. Modelo de fórmulas `PP-FormulaNet_plus-L`: Apache 2.0 en su ficha de Hugging Face. Es la opción con la licencia más limpia de las que funcionaron (sin cláusula de atribución, a diferencia de MinerU).

## 3. Salud
91.900 estrellas. Último push 16-sep-2026, release 3.7.0 del 11-jun-2026. 162 issues abiertos. Activo, respaldado por Baidu.

## 4. Peso y dónde corre
Python. `pip install paddlepaddle "paddleocr[doc-parser]"`: venv de 1,1 GB + 1,7 GB de modelos. En Windows con CPU **se rompe de entrada**: `NotImplementedError: ConvertPirAttribute2RuntimeAttribute not support` (bug de oneDNN en paddlepaddle 3.3.1). Se esquiva con `enable_mkldnn=False`, pero entonces es lentísimo: unos 23 minutos para 2 páginas (con otras pruebas corriendo a la vez). Solo herramienta de desarrollo; con GPU haría falta el paddlepaddle de CUDA (no probado).

## 5. Mapa contra Axiom
- Fila 8 (banco): **igual** que MinerU en calidad (le saca una al escaneo), **mucho peor** en tiempo y en instalación en Windows.
- Fila 6 (figuras): recorta figuras a `imgs/*.jpg` con su posición, útil para `auditor-figuras`, igual que MinerU.

## 6. Prueba chica
Mismos dos PDF que en `MinerU.md`, mismo comparador (`banco/scripts/comparar.py`):

| | 2025 digital (10) | 2016 escaneo + Word (18) | tiempo 2 páginas, CPU |
|---|---|---|---|
| PP-StructureV3, `lang=es`, sin oneDNN | 9 | 14 | ~23 min y ~28 min |
| MinerU `basic` (referencia) | 9 | 13 | 61 s y 73 s |

Bien: el escaneo con tildes correctas ("raíces", "asíntota"), `\vec{v}=(1\vec{u_x}+2\vec{u_y})`, `3\sqrt{14}`, `\pi r^2 h` en LaTeX (MinerU lo deja en HTML), reacciones con `\mathrm{}`.
Mal, leyendo la salida:
- Inventa: el rótulo "G7." salió como `\frac{\pi}{4}`; "¿Cuál" salió `\mathrm{\textmu}_{i}\mathrm{Cu}...`; "¿Cuántos" salió `A_{4}\downarrow_{\mathrm{Cuantos}}`.
- En el PDF digital, Q15: la opción B) quedó reemplazada por la reacción química entera (`A) 50 CaCO_3+HCl→... C) 150`). Un error silencioso: la pregunta parece completa.
- Opciones de A4 (2016) perdidas ("a) () 1c) 2d) 4"), G8 con la opción B partida, opciones de F9 con letras duplicadas.
- Opciones pegadas sin espacio ("64/89b ) 152c )").

## 7. Costo de integrar
Medio-alto en Windows: venv propio, flag para esquivar el bug y paciencia (o GPU). Mismo costo en agentes que MinerU.

## 8. Decisión
**DESCARTAR como herramienta directa**: da lo mismo que MinerU (que ya empaqueta sus modelos) pero 20 veces más lento en esta máquina y con un bug de instalación. Queda como **plan B** si la cláusula de atribución de MinerU llegara a ser un problema: misma calidad, Apache 2.0 puro.
Agente que mejora: ninguno directo (lo que aporta llega a través de MinerU).

Confianza: alta (probado con los dos PDF y comparado con el banco).

## Para Ronald
Si preferís no tener ninguna cláusula de atribución (ver `MinerU.md`), PaddleOCR es la alternativa. El precio es tiempo: con la versión de CPU, unos 10 minutos por página; con GPU habría que instalar la versión CUDA y medir.

## Lecciones nuevas
- 2026-10-29 · ERROR · Un paso de OCR puede reemplazar una opción entera por otro bloque de la página (Q15 de 2025: la opción B pasó a ser la reacción química) sin dejar rastro. · Al contrastar un borrador automático, contar las cinco opciones de cada pregunta y leerlas, no solo buscar las fórmulas.
- 2026-10-29 · ERROR · Lancé un proceso en segundo plano con `&` dentro de un comando y siguió vivo después: terminaron corriendo dos copias de la misma prueba, pisando el mismo log y duplicando el tiempo. · Procesos largos solo con la opción de segundo plano de la herramienta, nunca con `&` suelto; antes de relanzar, listar procesos.
