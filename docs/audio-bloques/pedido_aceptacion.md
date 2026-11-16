# Pedido a agy (script): `docs/audio-bloques/aceptacion.py`, protocolo único de aceptación de audiolibros

Usa la skill `libro-audio-auditor` (y `libro-audio-tts`). Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; el agente «libro-audio-auditor» (sección «PROTOCOLO ÚNICO DE ACEPTACIÓN», las 12 revisiones): C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\libro-audio-auditor.md; el agente «libro-audio-tts»: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\libro-audio-tts.md.

## Qué construir
Un script Python 3.11 (`C:/Program Files/Python311/python.exe`, sin `-I`), `docs/audio-bloques/aceptacion.py`, que recibe un capítulo (ruta del `.md` de `_TEXTO_LITERAL_VERIFICADO` o de `PSA_2027_FUENTES/audio_eds`, y opcionalmente su audio) y corre:
- **Revisiones 1 a 8 sobre el TEXTO** (literalidad contra `libros_extraidos/*_texto_paginas.txt` por n-gramas; omisiones; relleno leído; notas al pie; «ver figura/tabla»; símbolos, iones, miles; siglas y números de sección; palabras partidas).
- **Revisiones 9 a 12 sobre el AUDIO** (Whisper de la pista entera con `faster_whisper` small contra el texto; cortes; `volumedetect`/`silencedetect`; voz y modelo del manifiesto). Las 9 a 12 solo corren si se pasa el audio; si no, informar «sin revisar».
- Salida: una tabla por capítulo en `docs/audio-bloques/aceptacion/<capitulo>.md` con, por revisión: número de fallas / palabras o partes revisadas, y hasta 10 ejemplos. Veredicto final APRUEBA / FALLA. Lo que no se pudo revisar dice «sin revisar», nunca «bien».
- Modo `--resumen` sobre una carpeta de MP3 publicados: un número por tipo de falla (sin tabla por capítulo).

## Prueba obligatoria (casos reales ya medidos; el script debe detectarlos)
Crea `docs/audio-bloques/probar_aceptacion.py` con estos textos mínimos y comprueba que la revisión indicada FALLA:
1. Bibliografía leída al final (revisión 3).
2. Crédito de figura: «Ilustración de E. Maldonado» (3).
3. Iones mal leídos: «NA más o CA2 más» (6).
4. Leyenda de fórmula leída: «R iguala constante» (6).
5. Número de sección suelto: «2 a 3.1» (7).
6. Un audio entero de «Preguntas de autoevaluación» (3).
7. Un párrafo parafraseado que no está en el PDF (1).
Y que un texto limpio pase.

## Reglas
- Solo detectar y reportar. No reescribir el libro ni regrabar nada.
- Rutas con espacios entre comillas; Windows.
- No inventar umbrales silenciosos: los umbrales van como constantes al principio, con comentario.
- Si algo no se puede verificar, di «no verificado».
