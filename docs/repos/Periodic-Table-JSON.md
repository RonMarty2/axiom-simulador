# Bowserinator/Periodic-Table-JSON (y, como alternativa, la tabla de PubChem) (evaluado 29-oct-2026, modo solo lectura)

## 1. Qué es de verdad
Un archivo JSON con los 119 elementos: símbolo, nombre en inglés, masa atómica con decimales, configuración electrónica, grupo, período, densidad, puntos de fusión, un resumen de Wikipedia y enlaces a imágenes. Son **datos**, no código. NO trae nombres en español, NO trae números de oxidación, NO trae masas "de colegio" (redondeadas como en el banco UMSS).

Alternativa revisada en la misma tanda: la tabla periódica de **PubChem** (NIH, EE. UU.), `https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON`, 118 elementos, 44 KB, con columna `OxidationStates`.

Leído: README, LICENSE.md, y el JSON entero de los dos (bajado al scratchpad como datos, sin ejecutar nada del repo).

## 2. Licencia
- **Bowserinator:** `LICENSE.md` leído: **Creative Commons BY-SA 3.0** (atribución y compartir igual). El README dice "Feel free to use it", pero la licencia real obliga a que lo que se derive se publique con la misma licencia. Copiar el archivo dentro de un producto de pago es un riesgo. Ojo: GitHub lo muestra como "NOASSERTION", no como licencia conocida.
- **PubChem:** no pude leer sus términos (la página de PubChem pide verificación de navegador). En general los datos generados por NCBI son de dominio público, pero PubChem mezcla fuentes; **no verificado** para esta tabla.
- Matiz: una masa atómica es un dato de la naturaleza (IUPAC); el número en sí no tiene dueño. Lo que tiene licencia es el archivo armado. Escribir a mano `Cl: 35.5` no copia nada.

## 3. Salud
Bowserinator: 728 estrellas, último commit 27-oct-2026 (corrige un espacio en la configuración del lantano), 3 issues. Vivo. PubChem: servicio del gobierno de EE. UU., estable.

## 4. Peso y dónde corre
Bowserinator 340 KB (mayormente textos de Wikipedia y enlaces). PubChem 44 KB. Cualquiera de los dos solo tendría sentido en un script o test de desarrollo; en el cliente sobra (Axiom usa 12 elementos).

## 5. Mapa contra Axiom
**Fila 5 (química).** Comparé los dos JSON contra `MASAS_ATOMICAS` de `generadores-quimica.ts` con un script propio (`scratchpad/scripts/comparar.cjs`, solo lee los dos JSON):

| Elemento | Axiom | Bowserinator | PubChem | redondeo a entero |
|---|---|---|---|---|
| H | 1 | 1.008 | 1.0080 | 1 |
| C | 12 | 12.011 | 12.011 | 12 |
| N | 14 | 14.007 | 14.007 | 14 |
| O | 16 | 15.999 | 15.999 | 16 |
| Na | 23 | 22.98977 | 22.98977 | 23 |
| Mg | 24 | 24.305 | 24.305 | 24 |
| Al | 27 | 26.98154 | 26.98154 | 27 |
| S | 32 | 32.06 | 32.07 | 32 |
| K | 39 | 39.098 | 39.098 | 39 |
| Ca | 40 | 40.078 | 40.08 | 40 |
| Fe | 56 | 55.845 | 55.84 | 56 |
| Zn | 65 | 65.382 | 65.4 | 65 |

Resultado: **las 12 masas de Axiom coinciden** con el redondeo a entero de las dos fuentes. No hay error en la tabla de hoy.

Lo que encontré al probar elementos que Axiom todavía no tiene (y que el generador de óxido-reducción ya nombra en `NOMBRE_ELEMENTO`: Cl, Cu, Cr, Mn, P): el redondeo a entero **falla** justo en los que el colegio no redondea así. Cl da 35 (el colegio usa 35,5) y Cu da 64 (el colegio usa 63,5). Es decir: **importar una tabla y redondear daría cuentas distintas a las del examen**. La tabla "de colegio" tiene que seguir siendo propia.

Números de oxidación de PubChem (`OxidationStates`): son solo los "comunes" y les faltan algunos que el colegio usa: Cl no trae +3, Mn no trae +6. Como fuente para `generadores-redox.ts` sería **peor** que lo de hoy.

Otro hallazgo de paso: `NOMBRE_ELEMENTO` está escrito dos veces (en `generadores-quimica.ts` y en `generadores-redox.ts`), con listas distintas. Va contra la regla de fuente única (D9), aunque no es un error todavía.

## 6. Prueba chica
**Hecha sobre los datos** (lo permitido en este modo): el cruce de arriba. Lo que no se probó es ningún código del repo (no tiene código que importe).

## 7. Costo de integrar
Como test de desarrollo: 1 test nuevo con una tabla de referencia IUPAC de ~20 valores escrita a mano (no hace falta la dependencia) que compruebe `|MASAS_ATOMICAS[e] - IUPAC[e]| <= 0.5` para cada elemento. Riesgo nulo. Unificar `NOMBRE_ELEMENTO` en un `elementos.ts` común: 3 archivos, riesgo bajo (tocar generadores, correr sus tests).

## 8. Decisión
**TOMAR LA IDEA.** No meter el JSON (licencia BY-SA en Bowserinator, licencia sin confirmar en PubChem, y el redondeo directo daría Cl=35 y Cu=64). Sí: un test que compare cada masa "de colegio" contra el valor IUPAC con tolerancia de 0,5, para que cuando alguien agregue Cl o Cu no ponga un número equivocado. Y juntar las dos listas de nombres de elementos en un solo archivo.

**Qué agente mejora:** `resolutor-exacto` / `verificador`: al agregar un elemento a `MASAS_ATOMICAS`, el test lo frena si se aleja más de 0,5 del valor real; ya no depende de que el agente lo revise.

## Para Ronald
Para cloro y cobre, ¿el banco UMSS usa 35,5 y 63,5? Lo supuse por lo habitual en Bolivia; no lo verifiqué en los PDF. Recomiendo confirmarlo en un examen antes de agregar esos elementos.

## Lecciones nuevas
- 2026-10-29 · ACIERTO · Cruzar la tabla propia contra dos fuentes externas confirmó que las 12 masas están bien y mostró que "redondear a entero" no es la regla del colegio (Cl 35,5, Cu 63,5). · Cualquier tabla importada para Axiom se compara contra lo que usa el banco, no contra el valor exacto.
- 2026-10-29 · ERROR (evitado) · El README de Bowserinator dice "úsalo libremente" pero la licencia real es CC BY-SA. · Leer siempre el LICENSE, nunca la frase del README.
