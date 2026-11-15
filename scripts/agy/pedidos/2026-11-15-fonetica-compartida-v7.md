# Corrección (vuelta 7) de scripts/audio/fonetica_es.py

En Saladin quedan referencias a páginas del libro impreso que la voz leería mal («p quinientos veintiocho»). Corrige, agrega cada caso a probar_fonetica_es.py con su salida exacta y no cambies nada más.

1. **Referencia de página entre paréntesis** se quita entera, con el espacio de antes: «conocer su anatomía y función (p. 528). Muchas» -> «conocer su anatomía y función. Muchas»; «las proteínas (p. 67) y con su síntesis (p. 122).» -> «las proteínas y con su síntesis.»; «(pp. 87-88)» y «(p. 85 y 86)» igual. Solo cuando el paréntesis contiene ÚNICAMENTE la página (p./pp. + números, guion, «y», coma). Un paréntesis con otro texto («(Tm)», «(véase el cuadro 2.8)») NO se toca.
2. **«p. ej.»** -> «por ejemplo» (también «p.ej.» y «P. ej.» -> «Por ejemplo»).
3. **Linter:** `revisar` reporta «p. » o «pp. » seguido de número como «referencia de página».
4. Las 14 pruebas anteriores siguen en verde.
