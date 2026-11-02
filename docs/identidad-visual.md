# Identidad visual de AXIOM (fuente de verdad corta)

Creado el 1-nov-2026 después de que el diseño del premio del refuerzo intermitente salió con colores de un agente desactualizado y con Ingeniería y Económicas al revés (ver `docs/lecciones-agentes.md`, sección «Diseño y trato con Ronald, 1-nov-2026»).

**Regla de uso:** los valores de abajo son una foto del 1-nov. **Manda siempre el archivo de origen.** Si escribís un agente, una pieza o un componente, leé el archivo; no copies el hex de acá ni de otro agente. Si encontrás una diferencia, corregí este documento.

## 1. Dónde se lee cada cosa

| Qué | Dónde | Nota |
|---|---|---|
| Base de la app (crema, tinta, bordes, error, verde) | `src/app/globals.css`, bloque `:root` (`--bg-base`, `--fg-primary`, `--border`, `--error`, `--green`...) | En el código se usa `var(--...)`, nunca el hex |
| Acento de la app por facultad | `src/app/globals.css`, bloques `[data-facultad="..."]` (`--accent`, `--accent-hover`, `--accent-soft`) | Lo pone `src/app/layout.tsx` y `AppHeader.tsx` en `<html data-facultad>` |
| Color y tono claro de los anuncios por facultad | `PUBLICIDAD/config_anuncios.json` (`accent_color`, `accent_subtle`, `accent_glow`) | Por anuncio; `facultad_id` usa los mismos nombres que `data-facultad` |
| Cómo se arma un anuncio (fondo, titular, tarjeta, botón) | `scripts/generar_anuncios.py` (la plantilla HTML) | |
| Cómo se ve terminado | `PUBLICIDAD/piezas/<facultad>/*.png` | Mirar al menos una pieza con Read antes de diseñar |
| Carruseles e historias de quiz | `scripts/generar_carruseles.py`, `scripts/generar_historias_quiz.py` | Tienen sus tonos claros escritos adentro (ver §2, diferencia) |
| Íconos (sin emojis) y uso de la altura | §5 de este documento | Vale para toda pieza renderizada |

**Las facultades se nombran por su `data-facultad`:** `medicina`, `ingenieria`, `economicas`, `derecho`. En los anuncios, `ingenieria` aparece con la etiqueta «Tecnología»; es la misma facultad.

## 2. Colores por facultad (foto del 1-nov-2026)

| `data-facultad` | Nombre | Acento de la app (`--accent`) | Tono claro de los anuncios (`accent_subtle`) |
|---|---|---|---|
| `medicina` | borgoña | `#881337` | `#fda4af` |
| `ingenieria` | terracota | `#9c3d1c` | `#fdba74` |
| `economicas` | verde | `#047857` | `#a7f3d0` |
| `derecho` | púrpura | `#581c87` | **pendiente de decidir**: no hay anuncios de Derecho |

En los anuncios, el color pleno (`accent_color`) coincide con el acento de la app.

**Decidido (Ronald, 1-nov-2026):** para `economicas` el tono claro es `#a7f3d0` en todo (anuncios, carruseles, historias, motion). Manda `config_anuncios.json`. Las piezas ya generadas con el verde viejo `#6ee7b7` siguen así hasta que se regeneren.

**Trampa conocida:** la base `:root` de la app también es terracota (`#9c3d1c`) cuando no hay facultad elegida. Que algo se vea terracota no prueba que sea de Ingeniería: mirar qué `data-facultad` tiene la página.

## 3. El lenguaje de los anuncios

Se ve en cualquier `PUBLICIDAD/piezas/*/ANUNCIO_FEED_*.png` y sale de `scripts/generar_anuncios.py`:

- **Noche azulada:** fondo casi negro azulado con una foto real arriba que se funde hacia abajo con un degradé al mismo tono.
- **Titular serif grande** (Crimson Pro 800, blanco con sombra) con **una palabra clave en cursiva**, pintada con el tono claro de la facultad y **subrayada** con el color pleno.
- **Tarjeta crema** (el mismo crema de la app) con la pregunta real, sombra profunda, y un sello del color pleno con la respuesta.
- **Botón del color pleno con resplandor** (sombra difusa del mismo color, `accent_glow`).
- Marca «AXIOM» en serif con un punto del color de la facultad que brilla; texto de apoyo en Atkinson Hyperlegible.

## 4. App crema, anuncios oscuros: no se mezclan

- **La app es crema.** Toda pantalla del alumno usa la base de `:root` y el acento de su `data-facultad`. Nada de fondos oscuros de anuncio en la app.
- **Los anuncios son oscuros** (noche azulada) y viven en `PUBLICIDAD/`.
- **Única excepción decidida por Ronald (1-nov-2026):** el **bloque del premio** del refuerzo intermitente usa el lenguaje de los anuncios (color pleno de la facultad, resplandor, cifras en el tono claro, partículas y brillo breves). Solo ese bloque; la pantalla que lo contiene sigue crema. Lo validó viéndolo en la pantalla real de la app a 375 px.
- Dentro de la app, aun en el premio, el color se toma de `var(--accent)` y compañía, no de un hex. Si hace falta el tono claro como variable de la app, se agrega a `[data-facultad]` en `globals.css` (una sola fuente), no se escribe en el componente.
- Cualquier otra mezcla es decisión de Ronald: se le muestra en la pantalla real antes de hacerla.

## 5. Íconos y composición de las piezas (1-nov-2026)

Vale para historias, carruseles, flyers, anuncios y fotogramas de video. Nació de `HISTORIA_SOLUCION_ECONOMICAS.png`: un 📊 delante de «Razón Técnica:» y el contenido en una franja central con fondo liso arriba y abajo.

- **Sin emojis.** Ni en el HTML de los scripts (`scripts/generar_*.py`) ni en los textos de `PUBLICIDAD/config_anuncios.json`. Un emoji lo dibuja el sistema con su propio estilo y colores, y rompe la noche azulada. Si hace falta un ícono, va **dibujado en SVG, de una sola familia** (trazo de línea, mismo grosor, en blanco o en el color de la facultad); si no, nada. Vale para la tilde de la respuesta correcta, la flecha de «desliza», el cronómetro y la cruz del sello.
  Comprobación (imprime archivo y línea de cada emoji; no debe imprimir nada para la pieza que entregás): `python -c "import re,sys;[print(f,i) for f in sys.argv[1:] for i,l in enumerate(open(f,encoding='utf-8'),1) if re.search('[\U0001F300-\U0001FAFF⌀-⏿☀-➿⬀-⯿]',l)]" scripts/generar_*.py PUBLICIDAD/config_anuncios.json`. Las flechas y signos de una fórmula (→, π, ·) son texto y quedan. Al 1-nov todavía marca `generar_historias_quiz.py`, `generar_carruseles.py` y `config_anuncios.json` (⏱️ y ❌): pendientes de limpiar.
- **La altura se usa.** Las zonas seguras (arriba y abajo en 9:16) son para que nada importante quede tapado, no para dejarlas vacías: la foto o el fondo con degradé llegan hasta el borde. Dentro de la zona útil no queda una franja de fondo liso más alta que un cuarto de su alto. Si el contenido no llena, primero se agranda la letra (en 1080 de ancho, texto de apoyo de 30 px o más y titular de 80 px o más) y se agrega una imagen o figura real arriba, como `PUBLICIDAD/piezas/medicina/HISTORIA_STORY_MEDICINA.png` (foto que llena la parte de arriba y se funde, titular sobre ella, tarjeta, botón abajo); no se centra un bloque chico con `justify-content: center` o `space-between`.
- **Se mira antes de darla por buena.** Cada PNG generado se abre con Read, al lado de una pieza terminada de la misma facultad, y se repasa: ¿hay emojis?, ¿hay franjas vacías?, ¿algo cortado o tapado por las zonas seguras?, ¿se lee a 375 px?, ¿alguna cifra clavada a mano o afirmación que el producto no cumple? Que el script diga «OK» no dice nada de cómo se ve.
