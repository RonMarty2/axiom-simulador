# Pedido a agy (lectura, --solo-texto): referencias visuales del cuerpo en los textos de audio (revisión 5)

Usa la skill `libro-audio-tts`. Lee primero: `agentes/libro-audio-tts.md` (regla 2, figuras y tablas) y el patrón `_REV5_REF_VISUAL_RE` de `docs/audio-bloques/aceptacion.py` (línea ~214). No ejecutes nada; solo lees y propones.

## Qué leer
Los textos de voz (una línea larga por párrafo) de estos 29 capítulos:
`examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/<nombre>.md` para los `Tema_*` y `Atlas_B_*`, y `examenes pasados/MEDICINA/PSA_2027_FUENTES/audio_eds/<nombre>.md` para los `EdS_*`:

Tema_01_Biologia_Celular, Tema_02_Biologia_Celular, Tema_02_Parte_2_Biologia_Celular, Tema_03_Biologia_Celular, Tema_04_Biologia_Celular, Tema_05_Biologia_Celular, Tema_06_Biologia_Celular, Tema_12_Biologia_Celular, Tema_13_Biologia_Celular, Atlas_B_Morfo_Saladin, Tema_08_Morfo_Saladin, Tema_09_Morfo_Saladin, Tema_15_Morfo_Saladin, Tema_17_Morfo_Saladin, Tema_18_Morfo_Saladin, Tema_19_Morfo_Saladin, Tema_20_Morfo_Saladin, Tema_21_Morfo_Saladin, Tema_22_Morfo_Saladin, Tema_23_Morfo_Saladin, Tema_24_Morfo_Saladin, Tema_25_Morfo_Saladin, Tema_26_Morfo_Saladin, Tema_27_Morfo_Saladin, Tema_28_Morfo_Saladin, Tema_29_Morfo_Saladin, EdS_Parte3_1, EdS_Parte3_2, EdS_Parte3_3
(todos con el sufijo `_LITERAL_TTS.md`).

## Qué buscar
Frases del CUERPO que mandan a mirar una figura, tabla o cuadro: «la figura un a un muestra…», «en la tabla dos coma tres…», «como se observa en la figura…», «(véase la figura…)», «el cuadro dos coma ocho», etc. (los números ya están en palabras; «un a un» es «1-1»). NO tocar los PIES de figura (líneas que empiezan por `FIGURA …`) ni los títulos.

## Qué entregar
Un archivo JSON (lista) en la carpeta de trabajo, `refs_visuales.json`, con un objeto por hallazgo:
`{"capitulo": "...", "buscar": "<fragmento EXACTO y único del texto, 40 a 160 caracteres, que incluye la referencia>", "reemplazar": "<el mismo fragmento SIN la referencia, gramaticalmente correcto>", "accion": "quitar_frase|quitar_parentesis|reescribir_minimo"}`.
Reglas: literalidad (solo quitas palabras de la referencia; no parafraseas ni agregas datos); `buscar` debe aparecer UNA sola vez en ese capítulo (si no, alarga el fragmento); si quitar la referencia deja la oración sin sentido, usa `{"capitulo":..., "buscar":..., "reemplazar": null, "accion": "revisar"}` y explica en una línea. Si no puedes verificar algo, di «no verificado». Tuteo, español neutro. Al final, cuenta aproximada por capítulo.
