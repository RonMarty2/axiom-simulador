# Pedido a agy · Comprensión Lectora PSA 2027 · tanda 2 (preguntas 21 a 40)

Nivel: criterio. Escribes material para alumnos de Medicina UMSS (Cochabamba) que preparan la PSA 2027.

## Lee antes (y síguelos)
- `data/practica/medicina-psa-2027-lectura.md`: la tanda 1 (preguntas 1 a 20). COPIA SU FORMATO EXACTO: encabezado `## Pregunta N`, líneas `area:`, `tema:`, `dificultad:`, título del texto en negrita, el texto COMPLETO repetido en cada pregunta, la pregunta, 4 opciones `- A)` a `- D)`, `**respuesta:**`, `**explicacion:**` con `Paso 1 ·` (cita textual entre « » que respalda la correcta), `Paso 2 ·` a `Paso 4 ·` (por qué falla cada opción incorrecta), y `Respuesta: X.`; separador `---` entre preguntas.
- `.claude/agents/redactor-explicaciones.md` y `.claude/agents/resolutor-exacto.md`: el estilo paso a paso y la regla de no afirmar nada que no se pueda comprobar. Aquí «comprobar» = la cita del Paso 1 tiene que estar LITERAL en el texto.
- `docs/psa-2027/LISTA_CONTENIDOS_PSA2027.txt` líneas 80-87: las 7 habilidades oficiales.

## Qué escribir
Agrega AL FINAL de `data/practica/medicina-psa-2027-lectura.md` las preguntas 21 a 40 (4 textos nuevos × 5 preguntas). Cambia en el encabezado `total_preguntas: 20` por `total_preguntas: 40`. No toques las preguntas 1 a 20.
En `src/lib/preguntas-compartidas.test.ts` cambia la línea `assert.equal(lectura.length, 20);` por `assert.equal(lectura.length, 40);`. Nada más en ese archivo.

### Los 4 textos (originales, 180 a 240 palabras, 2 párrafos, tema de salud, NO repetir los de la tanda 1: higiene de manos, sueño y memoria, resistencia a antibióticos, altura y sangre)
1. **Expositivo:** la vacunación y la inmunidad colectiva (protección de quienes no pueden vacunarse).
2. **Instructivo/expositivo:** las sales de rehidratación oral en la diarrea infantil (por qué funcionan: agua + sales + glucosa; cuándo acudir al centro de salud).
3. **Expositivo:** la enfermedad de Chagas y la vinchuca en viviendas rurales de los valles (transmisión, mejoramiento de vivienda).
4. **Argumentativo:** una postura a favor de limitar la publicidad de bebidas azucaradas dirigida a niños, con tesis, argumentos y una objeción respondida.
Solo datos de conocimiento general y seguros. **Prohibido inventar cifras, porcentajes, años, estudios o instituciones.** Si un dato no es seguro, no lo pongas.

### Habilidades (campo `tema:`), 20 en total
Cada texto lleva SIEMPRE una de `psa-lectura-reconocimiento-textual` (tipo de texto, propósito del autor o estructura) y una de `psa-lectura-jerarquia-ideas` (idea principal frente a ideas secundarias o de apoyo). Las otras 3 de cada texto salen de estas, con este total en las 4 lecturas:
- `psa-lectura-informacion-explicita` ×3 (la opción correcta dice lo del texto CON SINÓNIMOS O PARÁFRASIS, no copiado)
- `psa-lectura-inferencia` ×3
- `psa-lectura-significado-contextual` ×2
- `psa-lectura-idea-central` ×2
- `psa-lectura-funcion-elemento-textual` ×2 (conectores, dos puntos, comillas, paréntesis, ejemplos)
`area:` siempre `comprension_lectora`. `dificultad:` media o alta (al menos 6 altas).

### Reglas de calidad
- Texto que ve el alumno en TUTEO (nunca voseo), español neutro.
- Una sola opción defendible; las otras 3, plausibles y del mismo largo aproximado (que la correcta no sea la más larga siempre).
- Respuestas correctas repartidas: 5 A, 5 B, 5 C, 5 D, sin la misma letra 3 veces seguidas.
- La cita del Paso 1 copiada LITERAL del texto (mismas palabras y signos).
- La pregunta de reconocimiento textual del texto 4 debe poder resolverse por sus rasgos (tesis, argumentos), no por adivinar.
- Sin emojis.

## Qué NO tocar
Nada fuera de esos dos archivos. No toques `docs/audio-bloques`, `_MOTOR_AUDIO` ni `data/preguntas-compartidas.json`.

## Respuesta (RESPUESTA.md)
Tabla de las 20 preguntas: número, texto, tema, dificultad, letra correcta. Y una línea: «cifras inventadas: ninguna» o la lista de datos que dudas.
