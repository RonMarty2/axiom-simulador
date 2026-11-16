# Pedido a agy (script): `docs/audio-bloques/corregir_textos_v2.py`, corrección determinista de los textos de audio

Usa la skill `libro-audio-tts` (y `libro-audio-auditor`). Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; el agente «libro-audio-tts»: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\libro-audio-tts.md; el agente «libro-audio-auditor»: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\libro-audio-auditor.md. Lee también `docs/audio-bloques/aceptacion.py` (las expresiones regulares de cada revisión te dicen qué detecta el auditor) y 3 informes de ejemplo de `docs/audio-bloques/aceptacion/` (Tema_08_Morfo_Saladin, Tema_01_Biologia_Celular, Tema_04_Biologia_Celular).

## Qué construir
Un script Python 3.11 puro (sin dependencias externas) que reciba una carpeta o archivo `.md` de texto de audio (`examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/*_LITERAL_TTS.md`) y:
1. **Hace antes una copia de respaldo** del archivo en `<carpeta>/bak_correccion_16nov/` (nunca sobrescribe un respaldo existente).
2. Aplica SOLO estas correcciones deterministas, cada una como función aparte, con contador:
   - **R8 ligaduras partidas (Saladin):** unir «fi gura», «superfi cial», «signifi cado», «fl ujo», «ff», «fl», «fi» partidos por un espacio dentro de una palabra española (usa un diccionario mínimo de prefijos/sufijos seguros; no unir palabras legítimas separadas). Palabras cortadas por guion al final de línea («mar- cuatro» es un residuo de «mar- 4»: reportar, no adivinar).
   - **R6 iones:** «Na+», «K+», «Ca2+», «Cl–», «H+», «HCO3–», «Mg2+» etc. a palabras («sodio», «potasio», «calcio», «cloruro», «hidrógeno», «bicarbonato», «magnesio») SOLO si el símbolo aparece como ion con su carga; «NA más»/«CA2 más» ya convertidos mal se reportan.
   - **R6 conversiones rotas:** casos como «19q13.un,» y «12p13» (locus cromosómico): dejarlos como lectura letra por letra («diecinueve q trece punto uno») o reportarlos; no inventar.
   - **R3 créditos:** líneas o frases que empiezan con «Procedente de:», «Ilustración de», «Fuente:», «Modificado de», «Tomado de» hasta el final de la frase: eliminar.
   - **R5 referencias a figuras:** frases cortas del tipo «(véase la figura ocho coma dos)», «como se muestra en la figura …», «véase el cuadro …»: eliminar la referencia sin romper la oración. Los PIES de figura («FIGURA ocho coma dos Título …») NO se tocan en este script (se decide aparte).
   - **R7 siglas:** lista cerrada de siglas frecuentes con su deletreo (AMPc → «A M P c», ECJ, MALT, TMJ…). Solo las de la lista; el resto se reporta.
3. **Reporta** al final un resumen por archivo: cuántos cambios hizo por tipo y una lista de casos que NO pudo resolver (para revisión humana). Modo `--solo-reportar` que no modifica nada.
4. Idempotente: correrlo dos veces da el mismo texto.

## Prueba obligatoria
Crea `docs/audio-bloques/probar_corregir_textos.py` (unittest) con un caso por función: entrada → salida esperada, incluidos casos que NO deben cambiar (palabras legítimas, «fi» dentro de «fisiología», «Na» como parte de otra palabra).

## Reglas
- Literalidad: no parafrasear ni reescribir; solo estas correcciones.
- No tocar nada fuera de la carpeta indicada. Rutas con espacios entre comillas. Windows.
- Si algo no se puede verificar, di «no verificado». Tuteo, español neutro.
