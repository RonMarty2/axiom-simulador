# breezedeus/Pix2Text (evaluado 29-oct-2026)

## 1. Qué es de verdad
Librería Python que pasa imágenes y PDF a markdown con fórmulas en LaTeX: detecta zonas (YOLO), OCR de texto (CnOCR/RapidOCR, pensado para chino e inglés) y un modelo propio de fórmulas (`pix2text-mfr`). Es la alternativa libre a Mathpix que más se nombra.
NO resuelve: español (el OCR de texto no está entrenado para tildes ni para "ñ"), estructura de preguntas, figuras como dibujo.

## 2. Licencia
`LICENSE` leído: MIT (BreezeDeus, 2022). Modelos de fórmulas `breezedeus/pix2text-mfr` y `pix2text-mfr-1.5`: MIT según su ficha en Hugging Face. Uso comercial permitido. Depende de PyMuPDF (AGPL), sin problema para scripts internos.

## 3. Salud
3.300 estrellas. Último push y release v1.1.7: 23-ago-2026. 41 issues abiertos. Mantenido por una sola persona.

## 4. Peso y dónde corre
Python. Arrastra PyTorch, torchvision, ultralytics, transformers, optimum, onnxruntime. Instalado tal cual **no arranca**: `cnstd` pide `rapidocr>=3.9.1` y pip trajo la 3.10.0, que ya no tiene `resolve_model_key` (ImportError). Se arregla fijando `rapidocr==3.9.2`. Solo herramienta de desarrollo.

## 5. Mapa contra Axiom
- Fila 8 (banco): **peor** que MinerU y que lo de hoy en el texto. Las fórmulas sueltas salen bien; el español sale ilegible.
- Fila 6 (figuras): recorta figuras (`figures/0-21-FIGURE.jpg`), igual que MinerU.

## 6. Prueba chica
`FCYT/2025-1-1op.pdf` (digital), comparado con `2025-1op-1-2025.md` con `banco/scripts/comparar.py`: **5 de 10** fragmentos. Fórmulas como `\sqrt{2-3x}+\sqrt{11+3x}=5` y `x^{2}+y^{2}-10x+9=0` bien; el texto en castellano destrozado: "Aalare valorde ... sabindo que $x$ es ouondolaouacion", "e)Nnguno", y basura con caracteres chinos en Física ("莱生热上海电区..."). En A2 inventó `+\frac{1}{2}` donde el PDF dice `+2`. Tardó 72 s en cargar y **727 s** para 2 páginas en CPU (con otras herramientas corriendo a la vez).
El escaneo de 2016 no lo terminé: lo corté para liberar CPU, la página digital ya alcanzaba para decidir. Queda "no probado" en escaneo.

## 7. Costo de integrar
No vale la pena: hay que reemplazar el OCR de texto por uno latino y aun así queda la invención de fórmulas.

## 8. Decisión
**DESCARTAR.** Licencia limpia, pero el OCR no sirve para español y MinerU hace lo mismo mejor y más rápido.
Agente que mejora: ninguno.

Confianza: alta (probado con un PDF real).

## Lecciones nuevas
- 2026-10-29 · ERROR · Pix2Text recién instalado no arranca por una versión nueva de una dependencia (`rapidocr` 3.10). · En herramientas Python chicas, fijar versiones de dependencias en el script de instalación.
- 2026-10-29 · ACIERTO · Medir contra fragmentos del banco ya verificado (no a ojo) mostró en un minuto que "las fórmulas salen bien" no alcanza: el texto alrededor es lo que se rompe.
