# Pedido: Fase D (prototipo punta a punta) — Reproductor de audiolibros de Medicina en `/aprende`

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`
- `docs/lecciones-agentes.md` del proyecto.
- Lee antes `src/app/aprende/_components/LeccionShell.tsx`, `src/app/aprende/_components/lienzo.tsx`, `src/app/aprende/page.tsx` y `src/app/api/auth/dev-login/route.ts` (referencia del candado `ES_DEV` / `NODE_ENV === "production"`).

## Archivos que puedes crear o modificar (SOLO estos 6 archivos)
1. `src/lib/audio-medicina.ts` (CREAR)
2. `src/lib/audio-medicina.test.ts` (CREAR)
3. `src/app/api/dev-audio/[...ruta]/route.ts` (CREAR)
4. `src/app/aprende/_components/ReproductorAudiolibro.tsx` (CREAR)
5. `src/app/aprende/_components/LeccionShell.tsx` (MODIFICAR)
6. `src/app/aprende/page.tsx` (MODIFICAR — solo agregar insignia discreta "Audiolibro" en las lecciones que tengan audio mapeado)

NO toques ningún otro archivo (en especial NO toques `docs/audio-bloques/`, `catalogo-aprende.ts` ni archivos de `examenes pasados/`).

## Especificación exacta

### 1. `src/lib/audio-medicina.ts` (núcleo puro, sin dependencias de React)
Exporta tipos y funciones:
- `VELOCIDADES_AUDIO = [0.75, 1, 1.25, 1.5, 1.75, 2] as const;`
- `type PistaAudio = { id: string; numero: number; titulo: string; rutaRelativa: string; tamanoMb?: number };`
- `type AudiolibroUnidad = { slug: string; libro: string; capitulo: string; gratis: boolean; pistas: PistaAudio[] };`
- `type ProgresoAudio = { pistaIdx: number; tiempo: number; velocidad: number };`
- Mapa inicial `AUDIOLIBROS_MEDICINA: Record<string, AudiolibroUnidad>` con los 2 capítulos de Unidad 01 (GRATIS, prototipo punta a punta) usando las rutas relativas EXACTAS a `AUDIOS_MEDICINA_UMSS`:
  1. `"morfofuncion-introduccion"` (`libro: "Saladin · Anatomía y Fisiología"`, `capitulo: "Capítulo 1 · Temas principales"`, `gratis: true`), 10 pistas:
     - P01: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P01_Introduccion_y_Ambito_de_la_Anatomia_y_Fisiologia.mp3"` — `"Introducción y ámbito de la anatomía y fisiología"` (9.8 MB)
     - P02: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P02_Los_Origenes_de_la_Ciencia_Biomedica_Historia_y_Evolucion.mp3"` — `"Orígenes de la ciencia biomédica"` (19.3 MB)
     - P03: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P03_El_Metodo_Cientifico_Inductivo_Hipotetico_Deductivo_y_Diseno_Experimental.mp3"` — `"El método científico y diseño experimental"` (15.0 MB)
     - P04: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P04_Origenes_y_Adaptaciones_del_Ser_Humano_Evolucion_y_Bipedestacion.mp3"` — `"Orígenes y adaptaciones del ser humano"` (15.3 MB)
     - P05: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P05_Estructura_Humana_Jerarquia_de_Complejidad_y_Variacion_Anatomica.mp3"` — `"Estructura humana y jerarquía de complejidad"` (9.7 MB)
     - P06: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P06_Funcion_Humana_Caracteristicas_de_la_Vida_y_Variacion_Fisiologica.mp3"` — `"Función humana y variación fisiológica"` (5.0 MB)
     - P07: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P07_Homeostasis_y_Sistemas_de_Retroalimentacion_Negativa_y_Positiva.mp3"` — `"Homeostasis y retroalimentación"` (13.6 MB)
     - P08: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P08_El_Lenguaje_de_la_Medicina_Terminologia_Raices_Prefijos_y_Sufijos.mp3"` — `"El lenguaje de la medicina: terminología"` (17.7 MB)
     - P09: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P09_Repaso_de_los_Temas_Principales_e_Imagenes_Medicas.mp3"` — `"Repaso e imágenes médicas"` (11.5 MB)
     - P10: `"2_MORFOFISIOLOGIA/Morfo_Cap_01_P10_Guia_de_Estudio_y_Autoevaluacion_Razonada.mp3"` — `"Guía de estudio y autoevaluación"` (13.0 MB)
  2. `"bcm-membrana-transporte"` (`libro: "Calvo · Biología Celular"`, `capitulo: "Capítulo 3 · Estructura de la membrana plasmática"`, `gratis: true`), 8 pistas:
     - P01: `"1_BIOLOGIA_CELULAR/Tema_03_P01_Modelos_Estructurales_y_Perspectiva_Historica.mp3"` — `"Modelos estructurales y perspectiva histórica"` (12.0 MB)
     - P02: `"1_BIOLOGIA_CELULAR/Tema_03_P02_Lipidos_de_Membrana_Fosfogliceridos_y_Colesterol.mp3"` — `"Lípidos de membrana y colesterol"` (15.6 MB)
     - P03: `"1_BIOLOGIA_CELULAR/Tema_03_P03_Fluidez_de_la_Membrana_y_Factores_Reguladores.mp3"` — `"Fluidez de la membrana y factores reguladores"` (9.8 MB)
     - P04: `"1_BIOLOGIA_CELULAR/Tema_03_P04_Asimetria_de_la_Bicapa_y_Balsas_Lipidicas.mp3"` — `"Asimetría de la bicapa y balsas lipídicas"` (7.9 MB)
     - P05: `"1_BIOLOGIA_CELULAR/Tema_03_P05_Proteinas_de_Membrana_Integrales_Perifericas_y_Ancladas.mp3"` — `"Proteínas de membrana"` (18.3 MB)
     - P06: `"1_BIOLOGIA_CELULAR/Tema_03_P06_Movilidad_Proteica_Cortex_y_Dominios.mp3"` — `"Movilidad proteica, córtex y dominios"` (6.6 MB)
     - P07: `"1_BIOLOGIA_CELULAR/Tema_03_P07_Glucocaliz_Celular_Estructura_y_Funciones.mp3"` — `"Glucocálix celular: estructura y funciones"` (9.9 MB)
     - P08: `"1_BIOLOGIA_CELULAR/Tema_03_P08_Preguntas_de_Autoevaluacion_y_Respuestas_Razonadas.mp3"` — `"Autoevaluación y respuestas razonadas"` (14.6 MB)
- Funciones puras:
  - `obtenerAudiolibro(slug: string): AudiolibroUnidad | null`
  - `tieneAudiolibro(slug?: string): boolean`
  - `extraerSlugAprende(pathname: string | null | undefined): string | null` (ej. `"/aprende/morfofuncion-introduccion"` → `"morfofuncion-introduccion"`, `"/aprende"` → `null`)
  - `construirUrlAudio(rutaRelativa: string, opts?: { baseUrl?: string; esDev?: boolean }): string | null`:
    - Usa `opts?.baseUrl ?? process.env.NEXT_PUBLIC_AUDIO_BASE_URL` (recortando `/` finales). Si existe y no está vacío: devuelve `${base}/${rutaCodificada}` (codificando cada segmento con `encodeURIComponent`).
    - Si no hay `baseUrl` y `(opts?.esDev ?? (process.env.NODE_ENV !== "production"))`: devuelve `/api/dev-audio/${rutaCodificada}` para prueba local con los MP3 reales.
    - En producción sin `NEXT_PUBLIC_AUDIO_BASE_URL`: devuelve `null`.
  - `formatearTiempoAudio(segundos: number): string`: `"00:00"` para 0/NaN/negativos, `"MM:SS"` si `< 3600`, `"H:MM:SS"` si `>= 3600`.
  - `claveProgresoAudio(slug: string): string`: `"axiom_audio_v1_" + slug`.
  - `parsearProgresoAudio(raw: string | null, totalPistas: number): ProgresoAudio | null`: parsea JSON seguro; devuelve `null` si corrupto o `totalPistas <= 0`; acota `pistaIdx` a `[0, totalPistas - 1]`, `tiempo >= 0`, y si `velocidad` no está en `VELOCIDADES_AUDIO` usa `1`.

### 2. `src/lib/audio-medicina.test.ts` (pruebas con `node:test` y `node:assert/strict`)
Cubre:
- `obtenerAudiolibro` y `tieneAudiolibro` (existentes y no existentes, y que todas las rutas relativas empiecen por carpeta + `.mp3` sin `..`).
- `extraerSlugAprende` (ruta válida, barra final, `/aprende`, `/dashboard`, `null`).
- `construirUrlAudio` (con `baseUrl` R2 con y sin `/` final, sin `baseUrl` en dev → `/api/dev-audio/...`, sin `baseUrl` en producción → `null`).
- `formatearTiempoAudio` (0, negativo, NaN, 65s → `"01:05"`, 3665s → `"1:01:05"`).
- `parsearProgresoAudio` (válido, JSON corrupto, `pistaIdx` fuera de rango, velocidad inválida).
- Que ningún título o texto visible al alumno en `audio-medicina.ts` tenga voseo ni guion largo ni emojis.

### 3. `src/app/api/dev-audio/[...ruta]/route.ts` (SOLO desarrollo local, Next.js 16 params async)
- Candado duro: si `process.env.NODE_ENV === "production"`, responde `NextResponse.json({ error: "No disponible" }, { status: 404 })`.
- `params: Promise<{ ruta: string[] }>` (Next.js 15/16 App Router).
- Base fija: `path.join(process.cwd(), "examenes pasados", "MEDICINA", "LIBROS DE MEDICINA", "AUDIOS_MEDICINA_UMSS")`.
- Valida seguridad contra path traversal (`path.resolve` dentro de `baseDir + path.sep`) y que termine en `.mp3`. Si no existe o es inválido, responde `404`.
- Soporta cabecera `Range: bytes=start-end` devolviendo `206 Partial Content` con `Content-Range`, `Accept-Ranges: bytes`, `Content-Length`, `Content-Type: audio/mpeg` (usando `Readable.toWeb(fs.createReadStream(...))`), y `200 OK` cuando no hay `Range`.

### 4. `src/app/aprende/_components/ReproductorAudiolibro.tsx` (`"use client"`)
- Recibe `{ audiolibro: AudiolibroUnidad }`.
- Estética **crema `LIENZO`** (coherente con `LeccionShell`: `LIENZO.bgSoft`, `LIENZO.fg`, `LIENZO.fgDim`, `LIENZO.fgFaint`, `LIENZO.accent`, `LIENZO.ok`). CERO emojis, CERO voseo (tuteo estricto: «Escucha», «Puedes», «Continúa»), CERO guion largo `—`.
- Diseñado para **360 px (celular), 800 px (tablet) y 1280 px (escritorio)**: cero desborde horizontal, botones táctiles con alto mínimo `44px` (`minHeight: 44`).
- **Estado cerrado (por defecto):** tarjeta compacta con icono SVG de auriculares, título del libro y capítulo, conteo de partes (y si hay progreso guardado en `localStorage`, indica «Retomar Parte N · MM:SS»), y botón «Escuchar» / «Continuar».
- **Estado abierto:**
  - Elemento `<audio ref={audioRef} preload="metadata" ... />` controlado por React.
  - Controles: botón principal Reproducir / Pausar (`minHeight: 44`), `-15 s`, `+15 s`, barra deslizable (`<input type="range" aria-label="Posición del audio" />`) con tiempo actual y duración total, y selector de velocidad (`0.75x`, `1x`, `1.25x`, `1.5x`, `1.75x`, `2x`).
  - Lista de partes numeradas (cada botón con `minHeight: 44`, título legible con `whiteSpace: "normal"`, marca clara en la parte activa). Al terminar una parte, pasa automáticamente a la siguiente y reproduce.
  - Persistencia en `localStorage` (`claveProgresoAudio(audiolibro.slug)`): guarda `pistaIdx`, `tiempo` y `velocidad` al pausar, cambiar parte, cambiar velocidad y cada ~3 segundos durante reproducción; al montar restaura la parte, el segundo (`currentTime` en `onLoadedMetadata` una sola vez) y la velocidad (`playbackRate`).
  - Si `construirUrlAudio(...)` devuelve `null` (producción sin R2 configurado todavía), muestra un aviso limpio en tuteo: «El audiolibro estará disponible muy pronto en esta lección.» sin mostrar un `<audio>` roto.
  - Si ocurre `onError` al cargar el audio, muestra un mensaje amigable en tuteo con botón «Reintentar».

### 5. `src/app/aprende/_components/LeccionShell.tsx`
- Importa `usePathname` de `"next/navigation"`, `extraerSlugAprende` y `obtenerAudiolibro` de `@/lib/audio-medicina`, y `ReproductorAudiolibro` de `./ReproductorAudiolibro`.
- Calcula `audiolibro` desde `usePathname()`.
- Si existe `audiolibro`, renderiza `<ReproductorAudiolibro audiolibro={audiolibro} />` arriba de la escena dentro de `<main>` (dentro de un contenedor `width: "100%", maxWidth: 720` con margen inferior limpio, para que el alumno pueda escuchar mientras cambia de escena sin que se corte el audio!). OJO: que `<ReproductorAudiolibro />` esté FUERA de `<AnimatePresence key={i}>` para que al cambiar de escena (`Anterior`/`Siguiente`) el audio **NO se corte ni se reinicie**!

### 6. `src/app/aprende/page.tsx`
- Importa `tieneAudiolibro` de `@/lib/audio-medicina`.
- En cada tarjeta de lección donde `tieneAudiolibro(l.slug)` sea `true`, agrega una etiqueta discreta `Audiolibro` (sin emojis, usando las variables CSS existentes) junto a las etiquetas de la lección (como `"✨ Animada"`).

## Reglas de calidad
- `npx tsc --noEmit` debe terminar en 0.
- `npx eslint` en todos los archivos tocados debe terminar en 0.
- `node --test src/lib/audio-medicina.test.ts src/lib/contenido-lecciones.test.ts` debe pasar al 100 %.
- Sin emojis en el código nuevo, sin voseo en textos al alumno, sin guion largo `—`.
