# Pedido a agy (v2, conciso — IR DIRECTO A IMPLEMENTAR): limpiador Saladin (PSA 2027) + refuerzo aceptacion.py

**INSTRUCCIÓN DE VELOCIDAD:** NO leas archivos de `_TEXTO_LITERAL_VERIFICADO` ni `libros_extraidos` (todas las muestras reales ya están pegadas abajo). Lee SOLO las líneas necesarias de `docs/audio-bloques/aceptacion.py` y `docs/audio-bloques/probar_aceptacion.py` y pasa directo a escribir los 4 archivos pedidos.

Sigue las reglas de `CLAUDE.md`, `agentes/libro-audio-tts.md` (reglas 10, 18 y prioridad PSA 2027) y `agentes/libro-audio-auditor.md`.

## Muestras reales extraídas de los 20 capítulos PSA 2027 de Saladin
Totales medidos en los 20 caps PSA 2027: ~268 `PARTE`, ~265 `CAPÍTULO` repetidos, ~115 `●`, ~372 glosas al pie.

### 1. Encabezados de página incrustados (`PARTE` y `CAPÍTULO` repetidos en medio del texto)
- `HISTOLOGÍA  PARTE UNO Organización corporal C on sus cincuenta mil millones...`
- `recubre al útero.  PARTE UNO Organización corporal Después de la fijación...`
- `en las glánduPARTE CINCO Reproducción y desarrollo las mamarias` (parte una palabra en dos → debe quedar `en las glándulas mamarias`)
- `...PARTE DOS Soporte y movimiento...`, `...PARTE TRES Integración y control interno...`, `...PARTE CUATRO Regulación y mantenimiento...`, `...PARTE CINCO Reproducción y desarrollo...`
- `esta ilustración?  CAPÍTULO uno Temas principales de anatomía y fisiología cadáveres, sobre todo...`
- `pedis igual a pie.  CAPÍTULO uno Temas principales de anatomía y fisiología ideas con una cantidad...`
- OJO: NO tocar el título inicial del capítulo (al principio del archivo, primeros ~200 caracteres). En cada capítulo Saladin el encabezado repetido es `CAPÍTULO <número en palabras> <título exacto del capítulo>` (lista fija de los 29 títulos o regex con el título tomado del inicio del archivo / lista de títulos de Saladin).

### 2. Preguntas de autoevaluación con viñeta `●`
- `con tres cadáveres. ● ¿Por qué los estudiantes de medicina deben estudiar más de un cadáver?  Por supuesto,`
- `equilibrio termostático. ● ¿Qué componente del sistema de calefacción actúa como el sensor? ¿Y cuál lo hace como el efector? FIGURA uno coma...`
- `los vasos sanguíneos. ●¿Los cortes del huevo de la figura anterior se clasificarían como longitudinales, transversales u oblicuos? ¿Cuál sería el aspecto del huevo si fuera cortado en los otros dos planos?  b Elaborar...`
- `la mucosa vaginal. ●Aparte de las encías y la vagina, mencione otro epitelio en el cuerpo que tendría este aspecto al microscopio electrónico de barrido.  PARTE UNO Org...`
- `en el molar. ●De todos los componentes mostrados aquí, ¿cuál o cuáles no corresponden a tejidos vivos? Nombres de los dientes...` (quitar SOLO la pregunta/imperativo hasta `?` o punto final de las preguntas seguidas tras `●`; conservar lo que venga después).
- `...veintitrés pares. ●Aunque se pasen a los descendientes los mismos gametos que se heredan de los padres, no se pueden pasar los mismos cromosomas. ¿Qué proceso de esta figura es responsable de este último hecho?`

### 3. Glosas etimológicas y notas biográficas al pie (siempre precedidas por número de nota en palabras `uno..cincuenta`)
- `doce bi igual a dos; pedis igual a pie.`
- `dieciocho homeo igual a igual; stasis igual a permanecer.`
- `diecinueve epo igual a a partir de, relacionado con; onomos igual a nombre.`
- `veintiuno osteo igual a hueso; cito igual a célula.`
- `veinticuatro esfint igual a aplastar, unir de manera apretada. veinticinco mio igual a músculo; cito igual a célula. veintiséis inter igual a entre; calado igual a insertado.`
- `treinta y un ácino igual a baya. treinta y dos alveolo igual a recipiente, cavidad. treinta y tres cito igual a célula;`
- `catorce Caspar Bartholin, mil seiscientos cincuenta y cinco a mil setecientos treinta y ocho, anatomista danés. quince Alexander J. C. Skene, mil ochocientos treinta y ocho a mil novecientos, ginecólogo estadounidense.`
- **NO TOCAR (casos negativos críticos):**
  - Texto explicativo del cuerpo en Cap. 1 sin número de nota: `gastro igual a una forma combinada que significa estómago. entero igual a una forma combinada que significa intestino delgado.`
  - Expresiones científicas/matemáticas: `pH igual a siete coma cuatro`, `R igual a región`, `presión igual a fuerza entre área`, `es igual a`.

## Qué construir (SOLO estos 4 archivos + `ENTREGA_AGY.md`)
1. **`docs/audio-bloques/limpiar_saladin_ruido.py`**:
   - CLI: `python docs/audio-bloques/limpiar_saladin_ruido.py [--seco] [--solo Tema_XX_Morfo_Saladin] [--todos] [--dir <carpeta>]`
   - Por defecto procesa SOLO los **20 capítulos PSA 2027 de Saladin**: `01, 05, 06, 08, 09, 10, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 27, 28`. Con `--todos` procesa los 31 `*Saladin*_LITERAL_TTS.md`.
   - Limpia de forma 100 % determinista e idempotente los 3 patrones anteriores (encabezados `PARTE`/`CAPÍTULO` incrustados con unión de palabras partidas cuando a izquierda hay prefijo en minúscula sin espacio + a derecha fragmento minúscula; preguntas con `●`; glosas etimológicas/biográficas numeradas `uno..cincuenta`).
   - Preserva saltos de párrafo, no crea dobles espacios, hace respaldo único en `bak_limpieza_saladin_21nov/` (si no es `--seco`), e imprime resumen por capítulo y totales.
2. **Actualizar `docs/audio-bloques/aceptacion.py`** (cambios mínimos, manteniendo intacto todo lo que ya pasa):
   - **Rev. 3:** detectar `PARTE (UNO|DOS|TRES|CUATRO|CINCO) (?:Organizaci[oó]n\s+(?:corporal|del\s+cuerpo)|Soporte\s+y\s+movimiento|Integraci[oó]n\s+y\s+control\s+interno|Regulaci[oó]n\s+y\s+mantenimiento|Reproducci[oó]n\s+y\s+desarrollo)` en cualquier posición de la línea (no solo `^`), `CAP[ÍI]TULO <num_en_palabras> ...` repetido fuera de los primeros 200 caracteres, y preguntas con viñeta `●`.
   - **Rev. 4:** ampliar `_REV4_GLOSA_PIE_RE` para cubrir números de nota en palabras hasta `cincuenta` (incl. compuestos `veintiuno..veintinueve`, `treinta y un[o]?..cincuenta`), glosas encadenadas con `;`, y notas biográficas al pie (`<num_nota> <Nombre Apellido>, mil ...`), SIN falsos positivos en `gastro igual a una forma combinada`, `pH igual a`, `R igual a región`, `es igual a`.
   - **Rev. 2 (`_limpiar_paginas_pdf_crudo` y `_PDF_FIN_NARRABLE_RE`):**
     - En `_limpiar_paginas_pdf_crudo(texto_pdf)`: unir palabras partidas por guion al final de línea ANTES de separar párrafos, incluso cuando el PDF extraído tiene líneas en blanco entre cada renglón (`re.sub(r"([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,})-\s*\n+(?:\s*\n+)*\s*([a-záéíóúüñ]{2,})", r"\1\2", texto_pdf)` — evita falsas omisiones en `EdS_texto_paginas.txt` como `Ber-\n\nnoulli`).
     - En `_PDF_FIN_NARRABLE_RE`: agregar `10\.3\s+Ejercicios\s+de\s+aplicaci[oó]n|^\s*11\s+ESTAD[ÍI]STICA\s+DESCRIPTIVA\s+MEDIANTE\s+MICROSOFT\s+EXCEL` para que `EdS_Parte3_3` (que termina en pág. 189) no arrastre como omisión el capítulo de Excel (pág. 191+, fuera del PSA 2027).
3. **`docs/audio-bloques/probar_limpiar_saladin.py`**: pruebas unitarias completas (positivos reales de arriba, palabra partida `glánduPARTE CINCO...las`, negativos `gastro igual a`, `pH igual a`, `R igual a región`, título inicial, texto tras `●`, idempotencia, y verificación de los 20 capítulos PSA 2027 por defecto).
4. **Ampliar `docs/audio-bloques/probar_aceptacion.py`**: casos positivos y negativos para los 3 detectores nuevos de Saladin + el guion con doble salto en `_limpiar_paginas_pdf_crudo` + corte de Excel en `_PDF_FIN_NARRABLE_RE`.

## Controles obligatorios
- `python docs/audio-bloques/probar_limpiar_saladin.py` -> 100 % OK
- `python docs/audio-bloques/probar_aceptacion.py` -> 100 % OK
- Escribir `ENTREGA_AGY.md` breve al final.
