# datalab-to/marker (evaluado 29-oct-2026)

## 1. Qué es de verdad
Conversor PDF a markdown/JSON/HTML de Datalab. Usa sus propios modelos (`surya`: diseño, OCR, fórmulas) y, opcional, un LLM externo (`--use_llm`, Gemini/Claude/OpenAI) para pulir. Desde la versión 2.0 (jul-2026) los modelos corren como servidor aparte: vLLM en Docker si hay GPU NVIDIA, o el binario `llama-server` de llama.cpp en CPU.
NO resuelve: estructura de preguntas, figuras como dibujo.

## 2. Licencia
`LICENSE` leído: Apache 2.0 (el código; antes de la 2.0 era GPL-3, la 1.10.2 de PyPI todavía dice GPL-3.0-or-later). **Los pesos de los modelos son otra licencia**: el README dice "modified AI Pubs Open Rail-M, gratis para investigación, uso personal y startups con menos de USD 5 millones de financiación/facturación"; `surya_layout` en Hugging Face figura CC-BY-NC-SA 4.0 (no comercial). Para Axiom hoy entra en el umbral, pero es una licencia con condiciones que cambian si crece.

## 3. Salud
40.700 estrellas. Último push 22-oct-2026, release v2.0.0 del 20-jul-2026. 385 issues abiertos. Activo.

## 4. Peso y dónde corre
Python + PyTorch. La 2.0 **no corre sola en Windows**: con la GPU de Ronald intenta lanzar vLLM por Docker (`SpawnError: docker binary not found`); sin GPU exige el binario `llama-server` (llama.cpp). Bajar ese binario desde GitHub me lo bloqueó el control de permisos, así que la 2.0 queda **no probada**. Probé la 1.10.2 (última con motor PyTorch puro, GPL-3).

## 5. Mapa contra Axiom
- Fila 8 (banco): **peor** que MinerU en lo probado. Las ecuaciones en bloque salen bien en LaTeX, pero las letras en cursiva matemática del texto (fuente Cambria Math) desaparecen.
- Fila 6 (figuras): recorta imágenes, como los demás.

## 6. Prueba chica
marker 1.10.2 en CPU, con `FCYT/2025-1-1op.pdf` contra `2025-1op-1-2025.md` (`banco/scripts/comparar.py`): **5 de 10**, 425 s para 2 páginas (con otras herramientas corriendo).
- Bien: `\frac{3}{4x^2-1}-\frac{1}{2x+1}=\frac{3}{2x-1}`, `\sqrt{2-3x}+\sqrt{11+3x}=5`, `\frac{e^y-1}{2-3e^y}=\frac{2}{7}`, y es el único que conservó el encabezado con la fecha ("Jueves, 23 de enero del 2025").
- Mal: "Hallar el valor de = −1+11 , sabiendo que es solución" (se comió `E`, `x^{-1}` y `x`); `log<sup>2</sup> ( + 1)` por `\log_2(x+1)`; opciones de A4, G5 y G7 destrozadas (`) <sup>2</sup> + <sup>2</sup> + 9 − 10 = 0`).
- Escaneo de 2016: lo corté. El OCR iba a 65-180 segundos por renglón, 126 renglones: horas en CPU. **No probado.**

## 7. Costo de integrar
Alto para lo que da: hay que montar Docker + vLLM con GPU o llama.cpp, y vigilar la licencia de pesos.

## 8. Decisión
**DESCARTAR.** En la versión que pude correr pierde las letras de las fórmulas en línea; la versión nueva exige infraestructura extra; los pesos tienen licencia con tope de facturación. MinerU hace lo mismo mejor, en local y con licencia más simple.
Agente que mejora: ninguno.

Confianza: media. Alta para la 1.10.2 en PDF digital (probado); baja para la 2.0 (no probada, puede ser mucho mejor) y para escaneos.

## Para Ronald
Si algún día se quiere probar la 2.0, hace falta autorizar la descarga de `llama-server` (llama.cpp, binario oficial de GitHub, 24 MB) o instalar Docker Desktop. No lo recomiendo mientras MinerU alcance.

## Lecciones nuevas
- 2026-10-29 · ERROR · El badge de licencia de marker dice Apache 2.0, pero eso es solo el código: los pesos de los modelos tienen otra licencia con tope de facturación, y uno de ellos figura como no comercial. · En herramientas con modelos, leer la licencia de los PESOS aparte de la del código.
- 2026-10-29 · ERROR · Una herramienta Python puede no correr "con pip install": marker 2.0 lanza Docker o un binario externo en tiempo de ejecución. · Leer el traceback antes de suponer que falta una dependencia de Python.
