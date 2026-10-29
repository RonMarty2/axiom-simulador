# docling-project/docling (evaluado 29-oct-2026)

## 1. Qué es de verdad
Librería Python de IBM que convierte PDF, Word, imágenes, etc. a un documento estructurado y de ahí a markdown/JSON/HTML. Detecta diseño (modelo `docling-layout-heron`), tablas (muy buenas), OCR (RapidOCR por defecto) y, si se le pide (`--enrich-formula`), pasa las fórmulas que detecta como bloque a LaTeX con `CodeFormulaV2`. Tiene además un modo "VLM" (`--pipeline vlm`, con `granite-docling-258M` u otros) que lee la página entera con un modelo de visión.
NO resuelve: fórmulas en línea dentro del texto ni dentro de opciones (que es donde están casi todas las de un examen UMSS); estructura de preguntas; figuras como dibujo.

## 2. Licencia
`LICENSE` leído: MIT ("Copyright The Docling Contributors"). Modelos: `docling-layout-heron` Apache 2.0, `granite-docling-258M` Apache 2.0, `CodeFormulaV2` CDLA-Permissive-2.0 (permite uso comercial). Todo limpio.

## 3. Salud
69.800 estrellas. Último push hoy (29-oct-2026), release v2.144.0 del 28-oct. 707 issues abiertos (proyecto grande, muchos pedidos). Muy activo, respaldado por IBM / LF AI.

## 4. Peso y dónde corre
Python. Arrastra PyTorch 2.15 (CPU) y transformers. Corre en CPU en Windows. Solo herramienta de desarrollo.

## 5. Mapa contra Axiom
- Fila 8 (banco): **peor** que MinerU para exámenes con matemática; **igual o mejor** en texto puro y tablas (la tabla de solubilidad salió perfecta como tabla markdown; el OCR del escaneo respetó tildes mejor que MinerU: "asíntota", "raíces").
- Fila 6 (figuras): marca `<!-- image -->` donde hay figura; puede exportarlas. Igual que MinerU.

## 6. Prueba chica
Mismos dos PDF que en `MinerU.md` (`FCYT/2025-1-1op.pdf` y `FCYT/144_1ra-op-2-2016.pdf`), comparados con el banco con `banco/scripts/comparar.py`.

| modo | 2025 digital (10) | 2016 escaneo + Word (18) | tiempo |
|---|---|---|---|
| estándar + `--enrich-formula --ocr-lang es` | 1 | 5 | 160 s y 53 s |
| VLM `granite_docling` en CPU | no terminó | no corrido | lo corté a los 32 min sin terminar 2 páginas |

Lo que pasó en el modo estándar: el detector no marcó como "fórmula" las ecuaciones en línea, así que el modelo de LaTeX nunca se usó. Salió texto plano: `𝐸 = 𝑥-1+11 𝑥`, `3 4𝑥 2 -1 - 1 2𝑥 +1 = 3 2𝑥 -1`, `√2-3𝑥 +√11 +3𝑥 = 5`; en la página de Word viejo, `(1 2 ) m /s x y v u u` para el vector y `a)3 14 m` para 3√14. Además mezcló preguntas: la ecuación de A4 apareció al final de G8 y le faltó la opción e). Lo bueno: texto en castellano limpio y la tabla Q14 bien armada.
El modo VLM probablemente ande bien con GPU, pero con el PyTorch de CPU no es usable. No lo probé con GPU (habría que instalar PyTorch con CUDA, unos 2,5 GB).

## 7. Costo de integrar
Bajo en archivos (un script), pero para que sirva habría que usar el modo VLM con GPU o forzar la detección de fórmulas. No lo justifica frente a MinerU.

## 8. Decisión
**DESCARTAR** para pasar exámenes a markdown: en la prueba no sacó ni una fórmula en línea a LaTeX. Licencia ejemplar; si algún día hay que digitalizar material con mucho texto y tablas y poca matemática (Lenguaje, Historia, bancos de práctica de Económicas), vale la pena volver a mirarlo.
Agente que mejora: ninguno hoy.

Confianza: alta para el modo estándar (probado); baja para el modo VLM (no terminó en CPU, no probado con GPU).

## Lecciones nuevas
- 2026-10-29 · ERROR · Activar "enriquecimiento de fórmulas" no garantiza fórmulas: si el detector de diseño no marca la zona como fórmula, el modelo de LaTeX no corre y no avisa. · Al probar una herramienta de PDF, mirar la salida de UNA fórmula en línea antes de medir nada más.
- 2026-10-29 · ERROR · Un modelo de visión "chico" (258M) en CPU no terminó 2 páginas en 32 minutos. · Para herramientas con modo VLM, poner un tope de tiempo a la prueba y anotar "no probado en CPU" en vez de esperar.
