# Pedido: pieza única de fonética en español para audiolibros (TTS)

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto (`CLAUDE.md` en la raíz de la copia) y el agente `agentes/libro-audio-tts.md` (reglas 3 a 6: números, símbolos, siglas, cortes) y `agentes/libro-audio-auditor.md` (qué revisa el linter).

## Qué
Escribir UN módulo Python sin dependencias externas (solo `re`, `sys`, `unicodedata`), `scripts/audio/fonetica_es.py`, y su prueba `scripts/audio/probar_fonetica_es.py`. Va a pasar texto escrito a texto que una voz TTS (Gemini, voz Puck) lee bien. Lo van a usar DOS proyectos distintos: audiolibros de Medicina y un audiolibro de estadística (jamovi). Por eso el módulo NO lleva siglas, términos ni rutas de ningún libro. Lo propio de cada libro entra por parámetros.

Base de partida, solo para leer (no editar): `_MOTOR_AUDIO/extraer_literal_pdf.py` (funciones `numero_a_palabras`, `adaptar_fonetica_literal`) y `_MOTOR_AUDIO/linter_texto.py`. Las fallas que hay que corregir están en `docs/auditoria-flujo-audio-medicina.md`.

## API obligatoria (nombres exactos)
```python
def numero_a_palabras(n: int, forma: str = "uno") -> str
    # 0..999_999_999_999. forma: "uno" (número solo), "un" (ante masculino), "una" (ante femenino).
    # Afecta al final: 1, 21 (veintiuno/veintiún/veintiuna), 31 (treinta y uno/un/una), 101, 1.001, etc.
    # «un millón», «dos millones», «mil», «cien», «ciento uno», «veintiún mil» (21000 -> «veintiún mil»).
def unir_cortes(texto: str) -> str
    # «coa- gulaba» y «coa-\ngulaba» -> «coagulaba». NO une cuando la palabra siguiente es y/o/u/e/ni
    # («pre- y posnatal» queda igual) ni cuando la segunda parte empieza en mayúscula («anti- Hitler»).
def quitar_referencias_figuras(texto: str) -> str
    # Quita del cuerpo: «(fig. 3.2)», «(figura 3-2)», «(figs. 3.1 y 3.2)», «(véase la figura 4.1)», «(ver tabla 2)»,
    # «(cuadro 5-1)», «(tabla 2.3)». También la frase «, como se ve en la figura 3.2,» y «véase la figura 3.2.» completas.
    # NO toca una línea que EMPIEZA con «Figura 3.2.» o «Tabla 2.» (es el pie, se lee).
def normalizar(texto: str, *, siglas=(), reemplazos=(), decimal=",",
               quitar_figuras=True, conservar_etiquetas=True) -> str
    # siglas: iterable de siglas a deletrear con espacios (ADN -> «A D N»). Solo palabra completa.
    # reemplazos: iterable de (patron_regex, texto) que se aplican ANTES de todo lo demás (términos del libro).
    # decimal: "," (español: 1.500 es miles, 3,5 es decimal) o "." (inglés: 1,500 miles, 3.5 decimal).
    # conservar_etiquetas: las etiquetas de voz de Gemini <short pause>, <long pause>, <breath>, <sigh>,
    #   <chuckle>, <laugh>, <laughter>, <gasp>, <whispering> (y cualquier <palabras en minúscula>) quedan intactas.
def revisar(texto: str, *, siglas=()) -> list[str]
    # Linter: devuelve la lista de problemas (vacía = aprobado). Recibe TEXTO, nunca una ruta.
```
CLI: `python fonetica_es.py normalizar ENTRADA [SALIDA]` y `python fonetica_es.py revisar ARCHIVO` (imprime problemas y sale con código 1 si hay alguno, 0 si no).

## Reglas de `normalizar` (en este orden)
1. Reemplazos del libro. 2. `unir_cortes`. 3. `quitar_referencias_figuras` si corresponde.
4. Números con `decimal=","`:
   - `\d{1,3}(\.\d{3})+` sin coma después = ENTERO con separador de miles: «1.500» -> «mil quinientos», «3.000 millones» -> «tres mil millones». También miles con espacio fino o normal entre grupos de 3 («3 000 000») -> entero.
   - Excepción: si empieza por «0.» es decimal.
   - `\d+,\d+` = decimal: entero + «coma» + cifras de una en una con forma «uno»: «2,1» -> «dos coma uno», «0,05» -> «cero coma cero cinco». Miles y decimal juntos: «2.345,67» -> «dos mil trescientos cuarenta y cinco coma seis siete».
   - Con `decimal="."` se invierten los papeles de punto y coma.
   - Rangos «1837-1839» -> «mil ochocientos treinta y siete a mil ochocientos treinta y nueve».
   - Forma de «uno»: si el número va seguido de una palabra, usar «una» cuando esa palabra está en una lista corta de femeninos frecuentes o termina en -a, -ión, -dad, -tad, -tud, -sis, -triz; si no, «un». Excepción: después de capítulo, tema, figura, tabla, cuadro, página, paso, parte, número, tipo, grupo, fase, nivel, sección, ejercicio o pregunta se lee «uno» («capítulo 1» -> «capítulo uno»). Al final de la frase o ante un signo, «uno».
   - Grados: «37 °C» -> «treinta y siete grados Celsius», «45°» -> «cuarenta y cinco grados».
5. Símbolos: `%` -> «por ciento», `‰` -> «por mil», `±` «más o menos», `×` «por» (y «10^6»/«10⁶» -> «diez a la seis»), `≈` «aproximadamente», `≠` «distinto de», `≤` «menor o igual que», `≥` «mayor o igual que», `<` «menor que» y `>` «mayor que» (solo fuera de etiquetas de voz), `=` «igual a», `√` «raíz cuadrada de», `→` «da», `²` «al cuadrado», `³` «al cubo», otros superíndices «a la N», `/` entre palabras -> « o », «y/o» -> «y o», `μ`/`µ` como prefijo de unidad: «μm» «micrómetros», «μg» «microgramos», «μL» «microlitros», `nm` «nanómetros», `Å` «ángstroms». Letras griegas sueltas por su nombre (α alfa, β beta, γ gamma, δ delta, ε épsilon, θ theta, λ lambda, μ mu, π pi, ρ ro, σ sigma, τ tau, φ fi, χ ji, ω omega y mayúsculas Σ Δ Ω). `x̄` -> «equis barra». `+` entre números «más». Polaridad «(+)» «positivo», «(−)» «negativo».
6. Comillas y asteriscos fuera; paréntesis y corchetes a comas (anidados hasta 3 niveles); dobles comas y espacios repetidos colapsados.

## Reglas de `revisar`
Reporta: dígitos que queden; símbolos `< > ≤ ≥ = ± % / \ * # _ { } × ≈ √ ‰ °` fuera de etiquetas de voz; letras griegas; superíndices; paréntesis/corchetes; siglas dadas sin deletrear; firma del error de miles («coma cero cero cero»); «un coma»; palabras cortadas («\w+- \w»); referencias «figura|fig|tabla|cuadro» seguidas de número (en dígitos o en palabras) que NO están al inicio de una línea. Cada problema con hasta 5 ejemplos.

## Prueba (`probar_fonetica_es.py`, con `assert` y un resumen «N/N»)
Debe cubrir como mínimo, con la salida exacta esperada:
- «1.500» -> «mil quinientos»; «más de 3.000 millones de nucleótidos» -> «más de tres mil millones de nucleótidos»; «2.345,67»; «2,1» -> «dos coma uno»; «0,05»; «0.5» con decimal=","; «1,500» y «3.5» con decimal=".".
- «capítulo 1» -> «capítulo uno»; «1 célula» -> «una célula»; «1 núcleo» -> «un núcleo»; «21 cromosomas» -> «veintiún cromosomas»; «21 células» -> «veintiuna células»; «hay 1.» -> «hay uno.».
- «coa- gulaba» -> «coagulaba»; «pre- y posnatal» intacto.
- «la mitosis (fig. 3.2) divide» -> «la mitosis divide»; una línea «Figura 3.2. Mitosis en...» intacta.
- «σ = 2» -> «sigma igual a dos»; «x̄» ; «R²» -> «R al cuadrado»; «10 μm»; «37 °C»; «p < 0,05» -> «p menor que cero coma cero cinco».
- «<short pause> el valor p <chuckle>» conserva las etiquetas tal cual.
- siglas=("ADN",) -> «A D N»; reemplazos=[(r"\bARNm\b","A R N mensajero")].
- `revisar` aprueba un texto limpio y reprueba: «tres coma cero cero cero millones», «σ», «R²», «coa- gulaba», «como en la figura 3.2», «ADN» con siglas=("ADN",). `revisar` NO reprueba «<short pause>».

## No hacer
- No editar nada de `_MOTOR_AUDIO` ni de ningún otro proyecto. No tocar `src/`, `data/` ni otros archivos del repo.
- No meter siglas ni términos de Medicina ni de estadística dentro del módulo.

## Entrega
Los dos archivos en `scripts/audio/`. CONTROLES: `python scripts/audio/probar_fonetica_es.py` con todas las pruebas en verde. En RESPUESTA.md: el resumen N/N y cualquier caso que no se pudo resolver, dicho con claridad.
