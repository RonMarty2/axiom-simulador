# Pedido (SOLO LECTURA): Mapa de audiolibros de Medicina ↔ unidades de `/aprende` (Fase D)

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`

Este pedido es **SOLO LECTURA** (`--solo-texto`). NO modifiques ni crees ningún archivo en el disco.

## Qué investigar
1. Lista las subcarpetas y capítulos disponibles en `examenes pasados/MEDICINA/LIBROS DE MEDICINA/AUDIOS_MEDICINA_UMSS` (cuántos libros, qué capítulos/temas existen, patrón exacto de nombres de archivo MP3 y cuántos archivos por capítulo, sin listar los 500 nombres uno por uno si siguen patrón — da 2 ejemplos reales por libro + el conteo por capítulo).
2. Lee `src/lib/axiom/catalogo-aprende.ts` (`BLOQUES_MEDICINA`), `src/app/aprende/layout.tsx`, `src/app/aprende/page.tsx` y `src/app/aprende/_components/LeccionShell.tsx`.

## Formato exacto de tu respuesta final
1. **Inventario de carpetas de audio** (tabla: Libro | Carpeta exacta | Cantidad de capítulos | Total MP3 | Patrón de nombres con 2 ejemplos reales).
2. **Mapa propuesto `slug de lección` ↔ `capítulo(s) de audio`** para `morfofuncion`, `biologia-celular` e `investigacion` (indicando si un slug agrupa varios capítulos o si algún capítulo de audio aún no tiene slug).
3. **Qué capítulo conviene usar para el prototipo de 1 capítulo punta a punta** (que sea Unidad 01 gratis para que funcione tanto en plan Gratis como Premium: ej. `morfofuncion-introduccion` o `bcm-membrana-transporte`).
4. **Puntos exactos de integración en el código** (archivo + líneas aproximadas en `LeccionShell.tsx`, `aprende/layout.tsx` y `aprende/page.tsx`) para:
   - incrustar un botón/panel «Escuchar audiolibro» con selector de velocidad (`1x`, `1.25x`, `1.5x`, `1.75x`, `2x`), avance por bloques/partes y guardado de progreso en `localStorage`,
   - controlar acceso Gratis (Unidad 01 de cada bloque / primer capítulo) vs Premium usando las mismas reglas ya existentes en `aprende/layout.tsx` (`SLUGS_GRATIS`),
   - configurar la URL base del almacenamiento externo (ej. variable `NEXT_PUBLIC_AUDIO_BASE_URL` apuntando a Cloudflare R2, con fallback limpio si no está configurada).
