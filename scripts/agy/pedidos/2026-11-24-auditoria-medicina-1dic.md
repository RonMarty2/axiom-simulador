# Pedido de auditoría integral · Medicina PSA 2027 (meta 1 de diciembre)

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md`; usa la skill `analista-temas` (`agentes/analista-temas.md`) para contrastar cobertura y áreas de Medicina.

## Reglas duras
- MODO SOLO LECTURA (`--solo-texto`). NO edites ni crees archivos.
- Lee EXCLUSIVAMENTE las rutas exactas indicadas abajo. No inventes datos ni supongas; si un dato no está en el archivo, escribe `NO CONSTA`.
- Entrega el informe completo directamente en tu respuesta final, en español, máximo 90 líneas, con las 5 tablas/bloques exactos pedidos abajo.

## Archivos exactos a leer
1. `src/lib/axiom/catalogo-aprende.ts` (sección `BLOQUES_MEDICINA` y bloques que importa)
2. `src/app/laminas/page.tsx` y `src/components/AppHeader.tsx` (para ver qué láminas existen, si filtran por facultad y dónde aparecen en la navegación)
3. `data/formatos-examen.json` (fichas de `medicina`), `data/preguntas-compartidas.json` y `data/facultades.json` (bloque `medicina`)
4. `src/lib/audio-medicina-catalogo.ts`, `docs/audio-bloques/aceptacion/RESUMEN.md` (primeras 40 líneas) y `docs/audio-bloques/vigilante_estado.txt` (últimas 15 líneas)
5. `PUBLICIDAD/config_anuncios.json`

## Formato exacto de la respuesta (5 bloques)

### 1. Áreas y lecciones de Medicina (`BLOQUES_MEDICINA`)
Tabla con: Área | # Unidades | Notas/alertas (ej. si incluye unidades fuera del temario PSA 2027 como `bases-moleculares-vida` o razonamiento verbal de Económicas, o si falta algún tema).

### 2. Láminas y navegación (dónde está cada cosa)
- Cuántas láminas hay en total y de qué materias son.
- ¿Están filtradas por facultad o aparecen igual para Medicina? ¿Hay láminas de Medicina (Morfo, Biología Celular, EdS, Química, Física) o solo Matemática?
- En `AppHeader.tsx`, listar los ítems exactos de navegación que ve un alumno de Medicina (ruta + etiqueta).

### 3. Simulaciones y exámenes de Medicina
- Ficha vigente (`psa-2027`): preguntas, minutos, pesos por área, si marca `estimada`.
- Reglas activas en `data/preguntas-compartidas.json` para `medicina` (origen, áreas, si tiene `temas_permitidos`/`temas_excluidos`, etiqueta al alumno).
- Datos de `medicina` en `data/facultades.json` (fecha_examen, duración, etc.).

### 4. Audiolibros de Medicina
- Unidades y partes conectadas hoy en `src/lib/audio-medicina-catalogo.ts` (desglose por libro/área; confirmar si EdS está conectado o no).
- Estado actual en `docs/audio-bloques/aceptacion/RESUMEN.md` (aprobados de total) y última fecha/estado en `vigilante_estado.txt`.

### 5. Publicidad (`PUBLICIDAD/config_anuncios.json`)
- Qué dicen los textos de Medicina (año, URL/dominio, menciones a «Curso Básico» vs «PSA 2027», cifras concretas como porcentajes o cantidades de exámenes/preguntas que puedan estar desactualizadas o sin fuente).
