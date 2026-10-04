# Lecciones de los agentes (el cuaderno de errores, aciertos y casualidades)

Para qué existe: cada tanda de trabajo tiene que dejar el terreno más fácil para la siguiente. Los agentes la leen **antes de empezar** y devuelven, **al terminar**, una sección "Lecciones nuevas". Quien los llamó (con ayuda del cronista) las agrega acá. Se agrega, no se reescribe: si una lección quedó vieja, se anota una corrección fechada debajo.

Esto **no reemplaza** a `BITACORA.md` §7 (errores históricos del proyecto). Acá van las lecciones de oficio: cómo se digitaliza, cómo se verifica, con qué herramienta se tropieza.

**Cómo se anota una lección** (una línea, con esta forma):
`AAAA-MM-DD · [ERROR|ACIERTO|SUERTE] · qué pasó · qué hacer la próxima vez`

- **ERROR**: algo falló y se arregló. Lo más valioso: la causa, no el síntoma.
- **ACIERTO**: algo funcionó y vale repetirlo a propósito.
- **SUERTE**: salió bien y no se sabe si por mérito o por casualidad. Se anota para **no generalizar**: que un examen cuadre 100 de 100 no prueba que el método sirva para el siguiente.

---

## Extracción de texto desde PDF

- 2026-09-30 · ERROR · El extractor cortó un examen en la pregunta 29 (quedó 29/100) porque buscaba el marcador `PATRON` sin distinguir mayúsculas y lo encontró dentro de "los patrones de plegamiento de las proteínas". · Los marcadores estructurales se buscan en MAYÚSCULAS y con `(?![A-Za-z])` detrás; cualquier palabra del contenido puede coincidir. Si un conteo se corta en seco, sospechar de un corte anticipado antes que de una página faltante.
- 2026-09-30 · ERROR · Exigir la secuencia estricta 1, 2, 3... hizo que una pregunta ausente en el PDF frenara toda la extracción (23 de 100). · Aceptar un salto de hasta 4 y **reportar los números ausentes** como "sin texto en el PDF". Una pregunta ausente es un dato del examen, no un error del script.
- 2026-09-30 · ERROR · "2.- texto" (afirmación 2) y "2. Texto" (pregunta 2) se parecen. Tratar toda línea `N.` como pregunta partió preguntas por la mitad; tratarla como afirmación perdió la pregunta 3. · Con guion (`1.-`, `2-`) es siempre afirmación. Sin guion y ambiguo, mirar la línea siguiente: una pregunta nueva va seguida de su afirmación 1.
- 2026-09-30 · ERROR · El encabezado de la sección II ("II. A continuación, se presentan 50 preguntas...") quedó pegado al final de la última afirmación de la pregunta 50. · Un encabezado de sección cierra la pregunta en curso. Revisar siempre la **última** pregunta de cada bloque: es donde se cuelan los encabezados.
- 2026-09-30 · SUERTE · El segundo parcial 2024-25 cuadró 100 de 100 a la primera porque usa `1.` y `2.` para las afirmaciones. Los de 2025-26 usan `1-` y dejaron unas 60 preguntas con menos de 2 afirmaciones. · No asumir que un extractor que funciona en un examen funciona en el siguiente: correrlo y mirar el reporte antes de empezar a transcribir.
- 2026-09-30 · ACIERTO · El extractor devuelve un **triaje honesto** (cuántas preguntas halló, cuáles faltan, cuáles tienen menos de 2 afirmaciones) en vez de un "OK" general. Con eso se decide dónde mirar la imagen. · Todo extractor nuevo reporta qué NO pudo hacer.

## Claves de respuesta (el patrón oficial)

- 2026-09-30 · ACIERTO · La clave venía como cartilla de círculos rellenados, en imagen. Se leyó bien recortando la página en cuatro columnas a 260 dpi (`pdftoppm -r 260` y recorte con PIL) y mirando cada columna por separado; en la página entera a 100 dpi los círculos se confunden. · Para claves en imagen: alta resolución, columnas, y contar 100 pares.
- 2026-09-30 · ACIERTO · Comprobar que **ninguna letra fuera imposible** para su pregunta (una E en una pregunta de dos afirmaciones es un error de lectura casi seguro) detecta errores de lectura sin ver el libro. · Hacer esa comprobación siempre, antes de auditar el contenido.
- 2026-09-30 · ACIERTO · Decidir verdadero o falso **por afirmación** y derivar la letra por código (`letraDeVeredicto`) en vez de "leer la letra y justificarla". El script se detiene si no coincide con la clave oficial. · Esto convirtió 94 coincidencias en evidencia de que la lectura de la cartilla era buena, y dejó 4 discrepancias visibles en vez de escondidas.
- 2026-09-30 · ACIERTO · Las marcas dobles ("A o C") no eran ruido: en las dos preguntas, las afirmaciones 1 y 3 eran correctas y 2 falsa, combinación sin letra. La facultad aceptó las dos. · Una marca doble en un patrón oficial es una pregunta con dos verdaderas no representables. Va a `faltantes`, nunca se elige una.
- 2026-09-30 · ERROR (evitado) · Las cartillas rellenadas a mano de ALUMNOS no son clave (BITACORA §7, cuatro exámenes). Esta era el patrón firmado por los coordinadores. · Antes de fiarse de una marca a mano, preguntar de quién es: firmada por la facultad o marcada por un alumno. Aun así, contrastarla.

## Verificación y honestidad

- 2026-09-30 · ERROR · El comentario del script de carga decía que las 98 letras "coinciden con lo que dice el libro", pero el veredicto se hizo de memoria, sin el libro a mano. · **No escribir "verificado con el libro" si el libro no estuvo abierto.** Usar tres niveles: confirmado con el libro, de memoria, no verificable. Se corrigió antes de subir.
- 2026-09-30 · ACIERTO · Cuatro claves oficiales parecían contradecir el libro (20, 51, 56, 85). Se transcribieron con la clave oficial y una nota de revisión, sin "corregirlas" en silencio y sin copiarlas como si nada. · Discrepancia con la clave oficial: se transcribe la oficial, se anota la duda, se le pide al humano el capítulo del libro.
- 2026-09-30 · ERROR · Las notas "Revisión pendiente" quedaron dentro de la explicación, que el alumno ve. · Decidir con el humano si una nota de revisión se muestra o si la pregunta se oculta hasta confirmarla. No es una decisión del transcriptor.

## Formato y código del banco

- 2026-09-30 · ERROR · El test "una pregunta repetida no cambia de respuesta" comparaba solo el enunciado. En Medicina dos preguntas comparten enunciado y se distinguen por las afirmaciones (56 y 57). · Un test escrito para un formato puede dar falso positivo en otro. Al sumar un formato, correr los tests y **leer por qué falla uno** antes de tocarlo: acá el test tenía que ampliarse, no relajarse.
- 2026-09-30 · ERROR · `data/materias.json` y `facultades.json` de Medicina describían otra carrera (biología, química, física, verbal), no el Curso Básico. Nadie lo había contrastado con la fuente. · Al entrar una facultad nueva, **contrastar los datos maestros con el documento oficial antes de cargar exámenes**. Un dato de configuración no es verdad porque esté en el repo.
- 2026-09-30 · ERROR · Los tests de Node (`node --test`, con type stripping) necesitan la extensión `.ts` en los imports de valor; `tsc` la acepta porque `allowImportingTsExtensions` está activo. Sin ella, cuatro suites fallaron con `ERR_MODULE_NOT_FOUND`. · En módulos que importan los tests: `import { x } from "./modulo.ts"`.
- 2026-09-30 · SUERTE · Cargar el primer examen de Medicina hizo que la facultad deje de salir "Próximamente" (el API cuenta exámenes). Era el comportamiento pensado, pero el alumno ya puede elegirla con un solo examen y cuatro claves en revisión. · Avisar al humano cuando una carga cambia lo que ve el alumno, aunque sea "correcto".

## Herramientas y entorno (Windows, Git Bash, Claude Code)

- 2026-09-30 · ERROR · Escribir código con regex dentro de un heredoc de Python pasó `\n` y `\s` como escapes de Python: un salto de línea real quedó dentro de un string de JavaScript y el archivo no compilaba. Un heredoc largo con apóstrofes en una sola llamada de Bash falló con "unexpected EOF". · Para archivos con regex o con mucho texto: herramienta **Write** o **Edit**, no heredoc. Si hay que usar Python, cadenas crudas (`r'''...'''`).
- 2026-09-30 · ERROR · Reescribir `materias.json` con `json.dump` reformateó el archivo entero (216 líneas de diff para cambiar una facultad). · Editar el texto de la sección, no reserializar el JSON.
- 2026-09-30 · ERROR · `print` de texto con tildes desde Python en Windows falla con `UnicodeEncodeError` (consola cp1252). · `PYTHONIOENCODING=utf-8`, o escribir a archivo y leerlo con la herramienta Read.
- 2026-09-30 · ACIERTO · Un comando que lista las páginas y su cantidad de caracteres (`pdftotext` por página) distingue en segundos qué páginas tienen capa de texto (miles de caracteres) y cuáles son imagen (65, el puro encabezado). · Empezar por ahí antes de decidir si hace falta la vista.
- 2026-09-30 · ACIERTO · `agentes/` se sincroniza a `.claude/agents/` con `node scripts/sincronizar-agentes.mjs`; los agentes nuevos no quedan disponibles como subagentes hasta que se abre una sesión nueva. · Después de crear o editar un agente: correr la sincronización, y avisar que hace falta sesión nueva para invocarlo.
- 2026-10-04 · ERROR · El servidor de desarrollo (Turbopack) siguió sirviendo el CSS viejo después de agregar un bloque a `globals.css`: PostCSS lo compilaba bien por separado, pero el navegador nunca recibía las reglas y las capturas "no cambiaban". Se perdió un rato pensando que era el CSS. · Si un cambio de estilos no se ve, antes de depurar el código compará el CSS que SIRVE el servidor (`curl` al chunk y `grep` de la clase nueva) con el de PostCSS. Si difieren, matar el proceso y borrar `.next`.
- 2026-10-04 · ERROR · `pkill -f "next dev"` (y `pgrep -f`) dentro de un comando cuya propia línea contiene ese texto mata la shell que lo corre (código 144). · Matar por nombre exacto (`pkill -x next-server`) o por PID, nunca por patrón que aparezca en el propio comando.
- 2026-10-04 · ACIERTO · Antes de rediseñar para tablet se midió con capturas en cinco tamaños (tablet acostada y parada, 768, celular parado y acostado). Salió que casi todo ya se adaptaba y que el problema real eran tres reglas puntuales (forzado de vista de celular en la app instalada, bloqueo de orientación, columna fija de las lecciones). · Medir primero evita rediseñar lo que ya anda; vale para cualquier pedido de "mejorar X".
- 2026-10-04 · ACIERTO · Para ver una pantalla de pago en local sin tocar el código se arma un alumno premium con el propio flujo: el alumno crea el pago por `/api/pagos` y un admin lo aprueba con `PATCH /api/pagos/[id]`, cada uno en su contexto de Playwright. Sirve para láminas y lecciones de Unidad 02 en adelante. · Reutilizar ese guion en vez de saltarse el guard.

## Proceso

- 2026-09-30 · ACIERTO · Antes de digitalizar un solo examen de Medicina se leyó el formato en el PDF y se le preguntó al humano por las dos decisiones de arquitectura (parser nativo y materias reales). Después se probó todo con UN examen completo. · Formato nuevo: decidir la arquitectura, probar con un examen entero, recién entonces escalar.
- 2026-09-30 · ACIERTO · Dejar el script de lote (`scripts/medicina/lotes/`) con los datos y la clave al lado hace el trabajo **regenerable** y sirve de molde para el siguiente examen. · Cada examen nuevo: copiar el lote anterior y cambiar los datos.
