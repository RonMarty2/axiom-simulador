# Pedido a agy (lectura, --solo-texto): fallas de texto que impiden grabar (revisiones 3, 4, 6, 7 y 8)

Usa las skills `libro-audio-tts` y `libro-audio-auditor`. Lee primero `agentes/libro-audio-tts.md` (reglas de texto literal, iones, miles, símbolos, notas al pie) y `agentes/libro-audio-auditor.md`. No ejecutes nada; solo lees y propones.

## Qué leer
Los informes `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\aceptacion\<capitulo>_LITERAL_TTS.md` (OJO: el nombre lleva el sufijo `_LITERAL_TTS`; esa carpeta no está en tu copia, la lees por la ruta absoluta; regenerados hoy 19-nov) de estos capítulos, y el texto de cada uno. Para cada hallazgo puedes ver su contexto ya extraído en `...\docs\audio-bloques\contextos\<capitulo>_LITERAL_TTS.md` si existe:
Tema_01_Biologia_Celular, Tema_02_Biologia_Celular, Tema_03_Biologia_Celular, Tema_02_Parte_2_Biologia_Celular, Tema_05_Biologia_Celular, Tema_06_Biologia_Celular, Atlas_B_Morfo_Saladin, Tema_04_Biologia_Celular.
Texto: `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/<capitulo>_LITERAL_TTS.md`. PDF crudo de referencia (solo cuando necesites ver el original): `examenes pasados/MEDICINA/LIBROS DE MEDICINA/libros_extraidos/Calvo_texto_paginas.txt` (o `Saladin_texto_paginas.txt` para Atlas_B).
Ignora las revisiones 1, 2 y 5 (las trata otro pedido) y 9 a 12 (audio).

## Qué entregar
`fallas_texto.json` en la carpeta de trabajo: lista con un objeto por hallazgo del informe:
`{"capitulo":"...","revision":3|4|6|7|8,"hallazgo":"<línea del informe>","veredicto":"real|falso_positivo","buscar":"<fragmento EXACTO y único del .md, 30 a 160 caracteres>","reemplazar":"<mismo fragmento corregido>","motivo":"<una línea>"}`.
- `real`: el audio lo leería mal (llamada de nota al pie pegada a la palabra, «Alfonso Calvo» de portada, ion sin convertir, miles como decimal, palabra partida). Da `buscar`/`reemplazar` con la edición MÍNIMA. Miles y símbolos: confirma en el PDF crudo antes de decidir cómo se lee (p. ej. «10.000» no es «diez coma cero cero cero»).
- `falso_positivo`: lo que el detector marca pero se lee bien (nombre propio, sigla correcta, código como p53 o H5N1 que ya está bien deletreado, etc.). Pon `buscar`/`reemplazar` en null y di por qué; si es una familia repetida, di qué regla del detector habría que ajustar.
- Literalidad: no parafrasees ni agregues datos; solo corriges lo marcado. `buscar` debe aparecer UNA vez en ese capítulo (alárgalo si no).
Al final: cuenta por capítulo (reales / falsos positivos / no verificado) y una lista de las reglas del detector (`aceptacion.py`) que producen falsos positivos repetidos. Si no puedes verificar algo, di «no verificado». Tuteo, español neutro.
