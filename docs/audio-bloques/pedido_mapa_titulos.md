# Pedido a agy (nivel lectura, solo texto): mapa de títulos de los libros de Medicina

Usa la skill `libro-audio-tts` para este trabajo. Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; el agente «libro-audio-tts»: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\libro-audio-tts.md; el agente «libro-audio-auditor»: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\libro-audio-auditor.md.

Para qué: cortar los audiolibros por subtítulo (ver docs/audio-bloques/PLAN_CORTE_POR_SUBTITULO.md). El texto literal para la voz perdió los títulos (quedaron fundidos en el párrafo), así que hay que sacarlos del libro.

## Qué leer
Carpeta `examenes pasados/MEDICINA/LIBROS DE MEDICINA/libros_extraidos/`:
- `Calvo_texto_paginas.txt` (Calvo, Biología Celular)
- `Saladin_texto_paginas.txt` (Saladin, Morfofunción)
Si el texto no deja ver los niveles de título, el libro original está en la subcarpeta «Libros del curso básico de Medicina UMSS…».

## Qué entregar
Un archivo JSON por libro, con la lista de capítulos y, de cada capítulo, sus títulos EN ORDEN:
```json
{"capitulo": "Tema 1", "titulo_capitulo": "...", "titulos": [
  {"nivel": 1, "numero": "1.1", "titulo": "...", "pagina": 12, "primeras_palabras": "las 8 primeras palabras del texto que sigue"}
]}
```
- `nivel`: 1 = sección principal, 2 = subsección, 3 = sub-subsección (según tamaño o numeración del libro).
- `primeras_palabras`: sirve para ubicar el título dentro del texto de audio.
- Marca `"narrable": false` en secciones de preguntas, glosario, bibliografía, autoevaluación o tablas solo-visuales.

## Reglas
No resumir ni reescribir nada: solo listar títulos tal como aparecen. Si un título es dudoso, ponlo con `"dudoso": true`. Si no puedes verificar algo, di «no verificado». No inventar.
