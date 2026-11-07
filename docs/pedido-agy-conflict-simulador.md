# Pedido a agy: comparar un archivo de conflicto de Synology con su página real (solo lectura, no edites nada)

Usa la skill `director-arte-coherencia` como criterio de revisión. Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; el agente «director-arte-coherencia»: 10.TRABAJO_LOCAL|axiom-simulador\.claude\agents\director-arte-coherencia.md.

En la carpeta `src/app/simulador/[simId]/` hay dos archivos: `page.tsx` (el real) y `page_RONMARTY_nov.-07-072817-2026_Conflict.tsx` (copia de conflicto de Synology).

## Qué hacer
Léelos y di si el archivo Conflict tiene algo que `page.tsx` NO tiene (líneas, funciones, textos, estilos propios), o si es solo una versión vieja o igual.

## Formato de la respuesta
Tres líneas: (1) tamaño aproximado de cada archivo en líneas; (2) lista corta (máximo 10) de diferencias reales de contenido, con la línea de cada archivo; (3) veredicto: IGUAL, VIEJA (no aporta nada) o TIENE COSAS NUEVAS (cuáles). Sin opiniones.
