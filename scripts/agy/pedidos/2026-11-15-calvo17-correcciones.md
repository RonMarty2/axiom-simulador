# Correcciones a la lección bcm-respuesta-inmunitaria (auditoría hecha). Edita SOLO ese page.tsx. Líneas aproximadas: busca la cita.
Fuente que manda: Tema_17_Biologia_Celular_LITERAL_TTS.md (misma carpeta de solo lectura). Tuteo, sin emojis, no tocar nada más.

1. (~607) `Funciones efectoras (CH2–CH3)` -> `Funciones efectoras (región C pesada)`.
2. (~848) `CPA (dendríticas, B, macrófagos)` -> `CPA (dendríticas y linfocitos B)`.
3. (~1931) `cambio isotípico (IgG, IgA o IgE según las citoquinas)` -> `cambio isotípico (producción de un subtipo concreto de Ig según las citoquinas)`.
4. (~1921) ERROR BIOLÓGICO: los ITAM NO fosforilan a Syk; se fosforilan y activan a Syk (libro línea 63). Reescribe: `cuyos motivos ITAM se fosforilan tras el contacto con el Ag y activan la quinasa Syk, que activa NF-κB, NFAT o CREB (...)` conservando el resto de la frase.
5. (~1186, DiagramaEfectores) `CPH I (sin NKG2)` -> `CPH I (sin freno NKG2)`; comprueba que quepa en su caja.
6. (~339-520, DiagramaAnticuerpoY) geometría: la cadena ligera izquierda debe ser simétrica a la derecha (misma pendiente 45° que el brazo pesado), VL sobre la misma recta que CL sin quiebre en V, y el puente disulfuro debe tocar ambas cadenas. Calcula con constantes con nombre; verifica que la figura sea simétrica (izq/der) antes de terminar.
8. (~1411) `activan sobre todo la respuesta humoral` -> `activan solo una respuesta humoral`.
9. Primera aparición de `kDa`: escribe `kilodaltons (kDa)`.
10. Primera aparición de Å: `ángstroms` en palabras; `M`: añade `(molar)` la primera vez. Mantén MathText.
11. Mueve la explicación de `CD` (marcadores de diferenciación, del inglés cluster of differentiation) a la PRIMERA aparición de CD8/CD4.
13. AutoCheck con `10⁻¹¹ M` en Unicode: reemplaza por texto `10 elevado a menos 11 molar` (AutoCheck solo admite string; NO cambies pedagogia.tsx).
14. Acorta rótulos que rozan sus cajas: (~96) `Rápida · sensores PRR no polimórficos` -> `Rápida · PRR no polimórficos`; (~709) `α3 (une CD8) + β2-microglobulina` -> `α3 (CD8) + β2-microglobulina`; (~1190) `Lisis tumoral / vírica` -> `Lisis tumoral o vírica` con fontSize 7.8.
15. (~1459) escribe `VL en la cadena ligera y VH en la pesada` (L = ligera, H = pesada) y ubica la región Fc como la base compartida de la Y.
16. (~1491) tras la constante de disociación, añade: `(cuanto menor es este valor, más fuerte queda unido el anticuerpo al antígeno)`.
17. (~1580) hibridomas: `fusionando linfocitos B (cada uno con una sola especificidad) con una célula de mieloma para obtener hibridomas capaces de crecer in vitro y producir cantidades prácticamente ilimitadas`. NO agregues tabla.
18. (~1654) explica en una frase cada término: alelo = variante; haplotipo = alelos de un cromosoma; singénicos = ratones genéticamente idénticos; alogénicos = cepas con distintos alelos (libro líneas 35-37).
20. (~1941) `activan quinasas como JAK y factores de transcripción como Stat, que entran al núcleo y activan genes diana`; (~1949) `cimógenos (precursores inactivos activados en cascada por proteólisis)` solo si el libro línea 71 lo dice; si no, escribe `cimógenos` como el libro.
21. (~2102) alergia: `tras una primera exposición que genera IgE, una segunda exposición puede causar desde urticaria y broncoconstricción hasta choque anafiláctico (anafilaxia)` SOLO si el libro línea 83 lo respalda; si no, deja el texto actual.
NO hagas: #7 (Pizarra/svg, lo reviso yo), #12, #19, ni recortes de escenas.
Al terminar, lista en ENTREGA_AGY.md qué punto aplicaste, cuál omitiste y por qué.
