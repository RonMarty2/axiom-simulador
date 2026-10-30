# Mejoras opcionales de animaciones (lectura independiente de agy, 30-oct-2026)

**Esto no bloquea el cierre (criterio de abajo, confirmado por Ronald).** Una segunda lectura con otro modelo (Claude Sonnet 5.5 vía `agy`, con el criterio de `docs/estado-trabajo.md`) encontró estas cosas en animaciones que la lectura anterior daba por buenas. Cada lector nuevo va a encontrar algo: por eso se decidió cerrar con un criterio fijo.

## Criterio de cierre (confirmado por Ronald el 30-oct-2026)

- **Se arregla ya:** un error de matemática en lo que se ve (por ejemplo, paréntesis que faltan y cambian el valor) y toda regla que el código pueda medir.
- **Se anota acá y se mira cuando Ronald lo pida:** lo que depende de gusto o de cuánto detalle quiere el alumno (cuál de dos números iguales se toca, una división sin proceso, una definición que llega un paso tarde).
- Si una de estas se repite en 2 o más tipos y el código puede medirla, pasa a `hallazgosPasos` (`estilo.ts`) y se arregla en todos a la vez.
- Pendiente de leer (agy se quedó sin cuota, se renueva unas 4 h 30 min después del 30-oct): fracciones, interes, molaridad.

Criterios: 1 = comprobación que no detectaría un error; 2 = cambio de base sin avisar; 3 = algo se usa antes de definirse; 4 = no dice cuál de dos números iguales se toca; 5 = cuenta de un golpe sin proceso.

## charles

- [3] T1 (1 casos): V_2 aparece en T1 y en la pantalla, pero el 1 y el 2 (principio y final) se explican recién en T5, y "ley de Charles" se nombra sin decir qué dice hasta T8.
- [5] T17 (3 casos): 300/240=1,25 aparece sin proceso. A lápiz es una división con decimales que el alumno no sabe hacer solo.
- [3] T1 (5 casos): V_2 se usa en T1 antes de explicar que el 2 es el estado final (recién en T5), y "ley de Charles" se nombra antes de mostrar la fórmula (T8).
- [5] T17 (1 casos): 150/300=0,5 aparece sin proceso. Un alumno no ve cómo una división de un número chico entre uno grande da 0,5.
- [5] T25 (1 casos): 7,5·300=2250 sale de golpe, con un decimal. En el otro lado sí se desglosó la cuenta (T21-T24), pero acá no.
- [5] T17 (1 casos): 500/400=1,25 aparece sin proceso. Es una división con decimales que no se puede seguir a lápiz.
- [5] T21 (1 casos): Hay dos multiplicaciones en un solo paso y 2,5·400=1000 sale sin proceso, con decimal.
- [4] T4 (1 casos): "El número sube" no dice cuál de los dos 760 se toca: el del dato o el de abajo del factor. En T4 hay dos 760 iguales.

## cuadrados

- [3] T10 (5 casos): La regla usa las letras c y d, que nunca se definieron. Además a y b ya valen x y 3 en pantalla, y aquí significan otra cosa.
- [3] T17 (5 casos): La regla a·b=0 reutiliza a y b, que siguen en pantalla como a=x y b=3, sin avisar que ahora son factores cualesquiera.
- [5] T2 (1 casos): El 15 aparece como la raíz de 225 sin ningún proceso. Un alumno no puede encontrarlo a lápiz (falta probar o descomponer 225).
- [5] T25 (1 casos): $15^2=225$ y $(-15)^2=225$ aparecen sin mostrar la multiplicación 15·15.

## cuadratica

- [4] T5 (2 casos): "Se suman sus números: -2-3=-5" no dice que son los números que acompañan a la x. En pantalla hay otros números (+4 y +2), así que no se sabe cuáles se suman.
- [5] T18 (1 casos): En pantalla queda "144-10·9+2·9" sin paréntesis. Hecho a lápiz da 144-90+18=72, pero el paso siguiente da 144-108=36. Falta mostrar que 10·9+2·9 va entre paréntesis, porque lo resta el signo menos de adelante.
- [5] T14 (1 casos): En pantalla queda "4--8·12" sin paréntesis. No se aclara cuál menos es la resta y cuál es el signo del producto, y el alumno no puede seguir cómo se pasa de "4-8·(-12)" a eso.

## estequiometria

- [3] T1 (1 casos): Dice "pasa por los moles" y "mol A → mol B" sin haber explicado qué es un mol, y nunca lo define en ningún paso.
- [1] T31 (1 casos): La comprobación "72·4=288" solo deshace la división que se acaba de hacer, así que no detectaría un error en la cuenta de fondo (288 viene de 16·18).
- [1] T33 (1 casos): La comprobación final solo revisa que sobreviva la unidad g de agua, no el valor 72, así que un número mal calculado pasaría igual.
- [5] T4 (1 casos): En un solo paso se hacen tres productos y una suma ($5\cdot2$, $3\cdot2$, $4\cdot1$, y luego $6+4$) sin mostrar cada operación.
- [5] T35 (1 casos): El resultado 5,6 aparece sin proceso (no se muestra cómo dividir 560 entre 100 con coma decimal) y la comprobación "5,6·100=560" solo deshace esa división.

## logaritmos

- [3] T11 (1 casos): Usa "los exponentes se suman" al multiplicar potencias sin mostrar esa regla, y $2^x+y$ se lee como 2^x más y, no como 2^(x+y).
- [4] T2 (1 casos): "Ese 10 es justo 10" no distingue cuál 10 es la base y cuál el número de adentro.
- [4] T3 (1 casos): "10=10^1" no dice a cuál de los dos 10 se le pone el exponente 1 (el de adentro, no la base).
- [3] T10 (3 casos): Usa la suma de exponentes al multiplicar potencias sin mostrar la regla, y $10^x+y$ se lee como 10^x más y.
- [4] T2 (1 casos): "Ese 2 es justo 2" no aclara cuál 2 es la base y cuál el número de adentro.
- [4] T3 (2 casos): "2=2^1" no dice cuál de los 2 recibe el exponente.
- [4] T5 (2 casos): Hay dos $\log_2(2)$ idénticos y no dice que ahora se resuelve el segundo (el primero ya vale 1).
- [4] T6 (1 casos): Otra vez "2=2^1" sin decir que es el 2 de adentro del segundo logaritmo, no la base ni el otro 2.
- [3] T9 (4 casos): Usa la suma de exponentes sin mostrar la regla, y $2^x+y$ se lee como 2^x más y.
- [5] T12 (1 casos): $9\cdot 27=243$ aparece sin proceso: no muestra cómo se multiplica a lápiz.
- [4] T2 (1 casos): "Ese 5 es justo 5" no distingue la base del número de adentro.
- [4] T3 (1 casos): "5=5^1" no dice cuál de los dos 5 recibe el exponente.
- [4] T4 (1 casos): "10 es justo 10: hay un solo 10" no dice cuál 10 es la base y cuál el resultado de $2\cdot 5$.
- [4] T5 (1 casos): "10=10^1" no dice a cuál 10 se le pone el exponente.
- [4] T2 (1 casos): "Ese 2 es justo 2" no aclara cuál es la base y cuál el número de adentro.
- [4] T6 (1 casos): "2=2^1" otra vez sin decir que es el 2 de adentro del segundo logaritmo.

## mruv

- [5] T25 (1 casos): Aparece 300/12=25 sin ningún proceso de división, a diferencia de 125·125, que sí se abre paso a paso.
- [5] T25 (1 casos): Aparece 6/4=1,5 sin mostrar cómo se divide cuando el resultado es decimal.
- [5] T37 (1 casos): Dos multiplicaciones de decimales a la vez (4,5·4,5=20,25 y 1,5·1,5=2,25) salen sin proceso, y un alumno no las puede seguir a lápiz.

## pitagoras

- [1] T18 (4 casos): La comprobación solo eleva 5 al cuadrado (deshace la raíz) y repite 3²+4²=25 igual que en T8-T12, así que no detectaría un error de esas cuentas.
- [4] T9 (5 casos): En 33·33 dice "partimos 33 en 30+3 y multiplicamos cada parte por 33", pero no dice cuál de los dos 33 se parte.
- [5] T21 (1 casos): "Solo estas terminan en 5" aparece sin mostrar los cuadrados de las cifras 0 a 9. En el mismo paso también elige 65 sin mostrar cómo.
- [5] T22 (1 casos): 65·65=60·65+5·65=3900+325=4225 junta dos productos y una suma en un paso, y 3900 y 325 aparecen sin proceso.
- [1] T25 (1 casos): La comprobación repite 33², 56² y la suma de T9-T18 y eleva 65 al cuadrado (deshace la raíz), así que no detectaría un error de esas cuentas.
- [5] T20 (3 casos): "Solo estas terminan en 4: 2·2 y 8·8" aparece sin mostrar los cuadrados de las cifras 0 a 9, y de ahí salta a los candidatos 12 y 18.
- [1] T24 (3 casos): Comprobar 5²+12²=13² deshace la resta 169-25=144 (restar y volver a sumar) y repite 12² y 13² ya calculados, así que no detectaría un error.
- [5] T21 (2 casos): 94·94=90·94+4·94=8460+376=8836 junta varias operaciones en un paso, y 8460 y 376 aparecen sin proceso.
- [1] T25 (1 casos): La comprobación deshace la resta 10000-784=9216 (restar y volver a sumar) y repite 28², 96² y 100² ya calculados, así que no detectaría un error.

## progresion

- [1] T25 (1 casos): La comprobación es una identidad: $a_{10}-d$ siempre da $a_1+8d$ con los mismos $a_1$ y $d$. Por eso no notaría un $d$ o un $a_1$ mal calculado. Falta contrastar con un término ya dado en la lista, por ejemplo $a_3=11$ con la fórmula. Pasa igual en los demás casos (T29 y T26 según el caso).
- [3] T1 (1 casos): La regla muestra $a_k+1=a_k+d$ con $d$ y $a_k$ antes de decir qué son. $d$ recién se nombra en T5 y los nombres $a_1$, $a_2$… en T6.
- [4] T11 (1 casos): Dice "el $a_1$ aparece una sola vez", pero en pantalla $a_1$ está también en las líneas de $a_2$, $a_3$ y $a_4$. No aclara que se reemplaza solo el de la línea de $a_n$. Lo mismo vale para $d$ en T12.

## raiz

- [4] T13 (2 casos): No dice cuál de los dos 2 de `4=2·2` es el divisor común que "baja" y cuál es el cofactor.
- [4] T14 (2 casos): "El 2 de arriba" es ambiguo: arriba hay `2·2` y además está la base 2, y no se dice cuál 2 se tacha.
- [4] T11 (1 casos): Hay tres 2 (base, divisor y cociente) y solo se etiqueta el cociente. No se dice que "el 2 en el 5" es el denominador del exponente.
- [4] T12 (1 casos): "Queda sobre el 2" no aclara cuál 2 es: el divisor, el cociente o la base.
- [4] T13 (1 casos): "La copia viaja desde la 2" no distingue la base 2 del 2 del exponente, que también está en pantalla.
- [5] T15 (1 casos): Se afirma que "esta raíz no se puede resolver exacta" sin mostrar por qué. El alumno no puede comprobarlo a lápiz.
- [5] T1 (1 casos): Se muestran solo 2 divisiones y la última (`⋯`). El alumno no puede seguir a lápiz los pasos 27, 9 y 3 que faltan para llegar a "6 divisiones".

## raizResto

- [3] T3 (4 casos): La regla `n=q·p+r` aparece sin decir qué es cada letra (aquí n=12, q=1, p=9, r=3), y el alumno no sabe que "sobra 3" es la r.
- [4] T16 (2 casos): Dice "escribimos también el 2 como fracción", pero hay varios 2 (la base, el exponente y el 2 del denominador de 1/2), y no aclara que es el exponente 2.
- [3] T7 (1 casos): Habla de "la base del ejercicio" sin haberla definido ni explicar por qué es el 2 y no el 4 de la lista.

Total: 61 hallazgos distintos.
