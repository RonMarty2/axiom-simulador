# Pedido a agy (lectura): resumen de los informes de aceptación

Usa la skill `libro-audio-auditor`. Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; el agente «libro-audio-auditor» (PROTOCOLO ÚNICO DE ACEPTACIÓN): C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\libro-audio-auditor.md; el agente «libro-audio-tts»: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\libro-audio-tts.md.

## Qué leer
Todos los `docs/audio-bloques/aceptacion/*.md` (un informe por capítulo, generado por `aceptacion.py`) y `RESUMEN.md`.

## Qué entregar (texto, tabla corta, sin reescribir nada)
1. Por cada revisión 1 a 8: los 5 TIPOS de hallazgo más frecuentes en todos los informes, con una cuenta aproximada y un ejemplo textual copiado del informe.
2. De cada tipo, di si parece FALLA REAL (el audio lo leería mal o leería algo que no debe) o FALSO POSITIVO probable (nombre propio, sigla correcta, título legítimo, etc.), con una línea de por qué.
3. Capítulos con MÁS fallas reales (top 10) y los que están casi limpios.

## Reglas
No inventar cifras: si cuentas aproximado, di «aprox.». Si no puedes verificar algo, di «no verificado». Tuteo, español neutro.
