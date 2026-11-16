# Pedido agy · criterio · Arreglar la lección «Citoesqueleto» según su auditoría

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md), el agente «autor-laminas» (.claude\agents\autor-laminas.md) y el agente «auditor-pantallas-movil» (.claude\agents\auditor-pantallas-movil.md, regla 6). Usa las skills `autor-laminas` y `auditor-pantallas-movil`.

## Punto de partida
La lección todavía NO está en tu copia. Cópiala de `C:\Users\lmigu\AppData\Local\axiom-agy\20261116-095013_leccion\repo\src\app\aprende\bio-citoesqueleto\page.tsx` a `src/app/aprende/bio-citoesqueleto/page.tsx` de tu copia y trabaja sobre ella. No toques ningún otro archivo (el catálogo lo agrega Claude).

La auditoría completa está en `C:\Users\lmigu\AppData\Local\axiom-agy\20261116-101342_auditoria\RESPUESTA.md`. Claude ya decidió: se aplican TODAS sus propuestas, así:

## 1. Dibujos (regla 6, obligatorio)
Los 6 `<svg>` (líneas ~70, 268, 397, 535, 774, 889; viewBox de 360 de ancho) tienen letra de 8-9. Ninguna letra dentro de un dibujo puede quedar por debajo de **13** en el viewBox (13 × 312/360 = 11,3 px en celular). Aplica la salida de la tabla (B) de la auditoría para cada uno: las frases y notas que salen del dibujo pasan a la tarjeta como texto (en un `<Parrafo>` o en la `<Definicion>` vecina, sin perder información). Si al subir la letra un texto no entra, se abrevia o se agranda el alto del viewBox (y el `alto` de la `<Pizarra>` en la misma proporción); nada pisado ni cortado. El dibujo 889 se parte en 2 filas de 2 pasos.

## 2. Pantallas cargadas (gravedad alta)
- l. 238-263: partir la `<Definicion>` en dos: (1) polaridad e hidrólisis de GTP; (2) inestabilidad dinámica y *treadmilling*.
- l. 699-747: agrupar las proteínas de unión a actina en 2 bloques: primero las que más se preguntan (filamina, gelsolina, profilina/timosina, Arp2/3, faloidina, citocalasina D) y después un bloque «Para profundizar» con el resto. No borres ninguna.
- l. 826-839: partir la contracción en dos listas cortas paso a paso (estriado y liso): señal → Ca²⁺ → proteína reguladora → miosina.

## 3. Gravedad media
- Términos sin puente: en la tabla inicial (l. 162, 190) usa descripciones funcionales («división del citoplasma», «motores de transporte») y deja el término técnico para su escena; define en una línea «concentración crítica» (l. 240), «cinetocoro» y «córtex» (l. 334-346) donde aparecen por primera vez.
- Citoqueratinas (l. 942-978): en el texto principal deja las 6 clases y los ejemplos clave (CK5/14, CK9, CK7/CK20); el listado largo de subtipos va a un bloque breve «Para profundizar».

## Reglas
Todo el contenido sigue saliendo de Calvo, cap. 12 (no agregues datos nuevos). Tuteo, sin emojis. No cambies las AutoCheck ni sus `correctaIdx` (ya están verificadas). Corre tsc, lint y npm test al final.

## Formato de la RESPUESTA
Por cada dibujo: letra mínima antes → después y qué texto salió a la tarjeta. Por cada pantalla partida: cómo quedó (títulos de los bloques). Confirma que no cambiaste las AutoCheck.
