# opendatalab/MinerU (evaluado 29-oct-2026)

## 1. Qué es de verdad
Herramienta Python que pasa un PDF (digital o escaneado) a markdown: detecta bloques (texto, título, fórmula, tabla, imagen), hace OCR, convierte cada fórmula a LaTeX y cada tabla a HTML, y recorta las imágenes. Desde la versión 4 se usa con `mineru-kit parse <pdf> -o <md> --tier basic|standard`.
NO resuelve: no sabe qué es una pregunta ni una opción (deja `a) b) c)` pegadas en la misma línea), no escribe el formato del banco, no resuelve, no tutea, no dibuja figuras (las entrega como JPEG en base64 dentro del .md).

## 2. Licencia
`LICENSE.md` leído: "MinerU Open Source License" = Apache 2.0 con tres agregados:
1. Uso comercial libre salvo que el grupo supere 100 millones de usuarios activos al mes o USD 20 millones de facturación mensual. Axiom está lejísimos.
2. **Atribución:** "si proveés servicios en línea a terceros basados en MinerU", hay que decirlo en la interfaz o en documentación pública.
3. Si no se cumple 1 o 2, la licencia se cae sola.

Modelos: el nivel `basic` baja `MinerU-4_models_onnx` (792 MB): son modelos de PaddlePaddle convertidos a ONNX (PP-DocLayoutV2, PP-FormulaNet_plus-M, PP-OCR), Apache 2.0 en su origen, pero la ficha del repo en Hugging Face no declara licencia. El nivel `standard` suma `MinerU2.5-Pro-2605-1.2B` (Apache 2.0 según su ficha).
Ver "Para Ronald" por la atribución.

## 3. Salud
82.700 estrellas. Último push y release 4.1.0: hoy, 29-oct-2026. 11 issues abiertos (los cierran rápido). No archivado. Muy activo.

## 4. Peso y dónde corre
Python 3.11 a 3.14. `pip install mineru` (sin extras) dejó un venv chico (ver tabla de tamaños) porque corre con ONNX, sin PyTorch. Modelos: 0,8 GB (`basic`) o 2 GB (`standard`). Corre en CPU en Windows; si encuentra GPU la usa por DirectML (en la prueba usó la RTX 4070 Ti para OCR y fórmulas sin pedirlo; se fuerza CPU con `model: onnx_device: cpu` en `~/.mineru/config.yaml`).
Solo herramienta de desarrollo (scripts/agentes). Nada va a la app.
**Cuidado:** tiene `--remote` que manda el PDF a mineru.net. No usarlo: los facsímiles se procesan en local.

## 5. Mapa contra Axiom
- Fila 8 (banco, transcripción PDF a .md): **mejor** que hoy como primer borrador. Hoy el transcriptor lee la capa de texto con PyMuPDF (que rompe fórmulas: en 2025-1-1op solo reconoce 2 de 10 fragmentos; en 2016 2 de 18) o mira imágenes renderizadas (caro en tokens). MinerU dio 9/10 y 13/18 con LaTeX listo para KaTeX. Afecta a `agentes/transcriptor-examenes.md`, `transcriptor-medicina` y `auditor-facsimil`.
- Fila 6 (figuras): **igual o un poco mejor**: recorta cada figura y la ubica junto a su pregunta, lo que sirve para que `auditor-figuras` sepa dónde mirar. No reemplaza el dibujo con `motor.ts`.
- Fila 5 (química): reacciones salen como `\mathrm{Cu}+\mathrm{HNO}_{3}\to\mathrm{Cu}(\mathrm{NO}_{3})_{2}...`; subíndices sueltos como `SO<sub>2</sub>` (HTML, hay que convertir).
- Fila 12 (agentes): baja el costo del transcriptor, que hoy lee imágenes página por página.

## 6. Prueba chica
Dos PDF reales copiados al scratchpad (`banco/pdfs`): `FCYT/2025-1-1op.pdf` (digital, ecuaciones de Word) y `FCYT/144_1ra-op-2-2016.pdf` (página 1 escaneada con figuras, página 2 Word viejo con ecuaciones incrustadas). Comparé contra `data/examenes/umss/ingenieria/2025-1op-1-2025.md` y `2016-1op-2-2016.md` con un script que busca fragmentos del banco en la salida, normalizando LaTeX (`banco/scripts/comparar.py`).

| | 2025 digital (10 fragmentos) | 2016 escaneo + Word (18) | tiempo 2 páginas |
|---|---|---|---|
| texto plano PyMuPDF (lo de hoy) | 2 | 2 | instantáneo |
| MinerU `basic` | 9 | 13 | 31 s y 38 s |
| MinerU `standard` (con VLM 1,2B) | 9 | 13 | 185 s y 75 s |

`basic` y `standard` salieron casi idénticos (difieren en una fórmula); `basic` alcanza. Tiempos con otras cuatro herramientas corriendo a la vez y con DirectML activo: orientativos.

Aciertos que importan: `\frac{3}{4x^{2}-1}-\frac{1}{2x+1}=\frac{3}{2x-1}`, `\sqrt{2-3x}+\sqrt{11+3x}=5`, `\vec{v}` y `3\sqrt{14}` en la página de Word viejo (donde PyMuPDF da "3 1 4 m"), `\frac{100}{11}`, la tabla de solubilidad entera, `\mathrm{Al}_2(\mathrm{SO}_4)_3`, `Cu(NO_3)_2`. Las fracciones salen en el orden correcto (la lección del 4-oct: PyMuPDF invierte numerador y denominador).

Errores que encontré leyendo la salida:
- **Inventa en el escaneo:** A3 de 2016 `R(x)=80x-0.4x^2` salió `80x - \overline{0. 噱室 ^2}` (caracteres chinos); el inicio de A4 "¿Cuántos" salió `\Delta A_0 \in \mathrm{Clia ntos}`.
- G8 de 2016 (opciones con fracción de senos): las cinco opciones mezcladas, letras separadas de sus fórmulas y `sin(1030)` en vez de `\sin(103°)`.
- Opción d) de A4 2025: `\frac{_{13}^{13}}{_{11}}` (basura).
- OCR del escaneo sin tildes en algunas palabras ("raices", "asintota") y "Al." por "A1.".
- Borra el encabezado (universidad, "EXAMEN-INGRESO 1-2025", fecha): justo lo que el transcriptor usa para identificar el examen.
- `πr<sup>2</sup>h` en HTML, no LaTeX; números con espacios (`1 0 N`, `1 8 m`) donde el PDF los tiene espaciados.

Conclusión de la prueba: sirve como borrador; no se puede publicar sin que un agente lo contraste con el render. Una pregunta con basura salta a la vista; una opción mezclada (G8) no.

## 7. Costo de integrar
Bajo, todo fuera de la app: un script `scripts/pdf-a-borrador.py` (o instrucción en el agente) que corre `mineru-kit parse --tier basic` y deja el .md crudo en una carpeta temporal; el transcriptor parte de ahí y verifica contra el render. Toca 2 o 3 agentes (`transcriptor-examenes`, `transcriptor-medicina`, `auditor-facsimil`). No toca `package.json`, ni tests, ni bundle. Riesgo: que un agente copie el borrador sin contrastarlo (el error G8 pasaría el test de KaTeX).
Instalación: un venv aparte con Python 3.11 (`py -3.11 -m venv` + `pip install mineru`) y 0,8 GB de modelos. Solo en la máquina con los PDF.

## 8. Decisión
**USAR** como herramienta de desarrollo, nivel `basic`, local (nunca `--remote`). Orden: 1) script de borrador, 2) el transcriptor lo usa como punto de partida y sigue resolviendo y leyendo el render para fracciones, opciones y figuras, 3) medir en una tanda real cuántos tokens ahorra.
Agente que mejora: `transcriptor-examenes` arranca de `mineru-kit parse --tier basic` (LaTeX ya escrito) en vez de leer la capa de texto con PyMuPDF o mirar páginas enteras como imagen; solo renderiza lo dudoso.

Confianza: alta en la calidad del borrador (probado con dos PDF reales y comparado con el banco); media en el ahorro de tokens (no medido en una tanda real).

## Para Ronald
- **Atribución:** la cláusula 2 pide decir que se usa MinerU si "proveés servicios en línea basados en MinerU". Axiom usa MinerU en local para preparar contenido; la app no corre MinerU. Mi lectura: no aplica, pero el texto es amplio. Recomendación: una línea en una página de créditos ("Digitalización asistida con MinerU") cuesta nada y cierra la duda.
- Los modelos ONNX no traen licencia declarada en su ficha (el origen PaddlePaddle es Apache 2.0). Para uso interno no veo riesgo.

## Lecciones nuevas
- 2026-10-29 · ACIERTO · Un examen con página escaneada + página de Word viejo (`144_1ra-op-2-2016.pdf`) prueba en un solo archivo los dos casos difíciles. · Usarlo como PDF de prueba para cualquier herramienta de PDF.
- 2026-10-29 · ERROR (evitado) · MinerU en modo `auto` usó la GPU por DirectML sin avisar; los tiempos "en CPU" no lo eran. · Forzar `onnx_device: cpu` para medir lo que tendría una laptop sin GPU.
- 2026-10-29 · SUERTE · El OCR inventó caracteres chinos en una fórmula: se notó porque era basura evidente. Una opción mezclada (G8) no se nota. · El borrador automático nunca se publica sin contraste contra el render.
