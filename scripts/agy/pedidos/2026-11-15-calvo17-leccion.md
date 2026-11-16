# Pedido: lección nueva de Biología Celular para Medicina PSA-2027 · Calvo cap. 17: Bases celulares de la respuesta inmunitaria

Lee y sigue: `CLAUDE.md` del repo, `agentes/autor-laminas.md` (reglas pedagógicas: puente a algo conocido, un salto por tarjeta, figuras con coordenadas calculadas) y `docs/lecciones-agentes.md` (busca "lección", "aprende", "Medicina").

## Fuente (MANDA el libro)
Texto literal del capítulo: `C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/Tema_17_Biologia_Celular_LITERAL_TTS.md` (carpeta de solo lectura que te paso con --leer). La lección enseña lo que dice ESE capítulo, nada fuera de él (regla de Ronald: para Medicina solo lo de la lista oficial). Cada dato (nombres, cifras, clasificaciones) tiene que estar en el capítulo; si dudas, no lo pongas.

## Qué hacer
Crear UN archivo nuevo: `src/app/aprende/bcm-respuesta-inmunitaria/page.tsx`. NO toques ningún otro archivo (en especial NO `src/lib/axiom/catalogo-aprende.ts`).

Modelo a copiar (estructura, imports, componentes, estilo): `src/app/aprende/bcm-celulas-madre/page.tsx` (Calvo 18, recién revisada). Usa SOLO componentes que ya existen en `src/app/aprende/_components/` y `MathText`. `unidad="BCM-08"`.
Imports por DEFECTO: `import LeccionShell from "../_components/LeccionShell";` y `import MathText from "../../components/MathText";` (con llaves falla tsc).

## Contenido (diseño ya cerrado; verifícalo contra el capítulo)
Ya existe `src/app/aprende/sistema-linfatico-inmune/page.tsx` (introducción general a nivel Saladin): no la repitas; úsala de puente («ya viste que…») y profundiza a nivel celular-molecular. `tituloUnidad="Respuesta inmunitaria"`.
10 escenas:
1. Innata vs adaptativa, memoria y receptores de patrones (PRR: TLR, NLR, RLR, CLR).
2. Anticuerpo: estructura en Y, cadenas pesadas y ligeras (κ y λ), región variable/CDR, región Fc, afinidad.
3. Isotipos (IgM, IgG, IgA, IgE, IgD) y anticuerpos monoclonales (lo que diga el capítulo).
4. CPH/MHC (HLA) clase I y II, receptor de la célula T, correceptores CD4/CD8 y restricción.
5. Procesamiento y presentación: vía clase I (proteasoma, TAP) y vía clase II (endosomas, cadena invariante).
6. Activación del linfocito T: señal 1 y señal 2 (B7-CD28), CTLA4/PD-1, subtipos Th.
7. Activación del linfocito B (CD40-CD40L, cambio de isotipo) y complemento.
8. Efectores celulares: CD8 (perforinas/granzimas), NK, citotoxicidad celular dependiente de anticuerpos (ADCC).
9. Tolerancia central y periférica (anergia) y disfunciones: alergia, autoinmunidad, inmunodeficiencias, trasplante.
10. Repaso y práctica: 6 AutoCheck.
Cada escena: puente → definición → PorQue → ejemplo clínico breve SOLO si el capítulo lo menciona → Cuidado (confusión típica, p. ej. clase I vs clase II, CD4 vs CD8) → AutoCheck. Si algo de la lista NO está en el capítulo, sácalo. Fuera ya decidido: Her2/CD20 como dianas, la cifra de 10^9 anticuerpos, cualquier «truco de memoria» que no esté en el libro.
Modelos de AutoCheck del banco (formato Medicina): `data/examenes/umss/medicina/` 2025-primer-parcial-curso-basico-2024-2025 #30 y #65, 2023-primer-parcial-curso-basico-2023-2024 #91, 2025-examen-final-curso-basico-2025-2026 #15, 2025-primer-parcial-curso-basico-2025-2026 #27. Cita `// basado en: archivo #n`.
El texto del libro está adaptado para voz (números en palabras, «coma» por decimal): vuelve a cifras.

## Reglas duras
- Texto que ve el alumno: TUTEO, nunca voseo. Sin emojis.
- TODA sigla se expande la primera vez que aparece (y en los SVG no uses siglas aún no definidas).
- Nunca `<ul>`, `<div>` ni bloques dentro de `<Parrafo>` (es un `<p>`).
- MathText SIEMPRE `<MathText>{"$...$"}</MathText>`. COMA decimal en todo lo visible.
- Al final, `/* FUENTE: ... */` con, por cada AutoCheck y dato numérico, la frase literal corta del capítulo y su número de línea del .md.
- SVG con coordenadas calculadas (constantes con nombre), que quepan en 360 px (viewBox, width 100%), etiquetas sin pisarse.
- Debe pasar `npx tsc --noEmit` y `npm run lint`.

## Entrega
El archivo, más en RESPUESTA.md: escenas, secciones cubiertas y fuera, preguntas del banco usadas, dudas.

## Datos de un intento previo (verificados leyendo el capítulo)
Líneas del .md por tema: innata/adaptativa y PRR 9, 11, 19; anticuerpo 21-25; monoclonales 27-31; CPH y RCT 37-43; procesamiento 49-51; activación T 45, 57-59; activación B y complemento 63-65, 71; efectores 61, 75-77; tolerancia y disfunciones 79-87.
- El anticuerpo tiene 2 sitios de unión al antígeno (línea 23), NO 3 (el modelo #30 del banco lo dice como afirmación falsa).
- CTLA4 y PD-1: el capítulo no expande la sigla; nómbralas sin inventar la expansión.
- El libro dice «CCDA» (línea 21) y «ADCC» (línea 77): usa ADCC y explica en español.
- Cadenas ligeras: «k» y «l» del libro = κ y λ (60 % y 40 %, línea 25). Clases I/II y dominios α3, β2: texto ambiguo por la conversión a voz; si dudas, no pongas el detalle.
- #65 de 2025-primer-parcial-curso-basico-2024-2025 es de articulaciones y #15 de 2025-examen-final es de fibroblastos: NO sirven de modelo. Sirven #30 (2025-primer-parcial 2024-2025), #91 (2023-primer-parcial) y #27 (2025-primer-parcial 2025-2026).
- Reparte la letra correcta de los AutoCheck (no todas A).
