# Corrección (vuelta 6) de scripts/audio/fonetica_es.py

Saladin trae las ligaduras del PDF partidas: «fi gura», «fi guras», «infl amación», «fl ujo», «superfi cie», «defi nir». Corrige, agrega cada caso a probar_fonetica_es.py con su salida exacta y no cambies nada más.

1. **Unir ligaduras partidas** (dentro de `unir_cortes`, ANTES de quitar figuras y ANTES de convertir griegas): `fi` o `fl` seguidos de un espacio y una letra minúscula se unen con lo que sigue, y también con lo que va pegado antes: «fi gura» -> «figura», «superfi cie» -> «superficie», «infl amación» -> «inflamación», «fl ujo» -> «flujo», «defi nir» -> «definir». También «ffi», «ff ». El nombre de la griega φ («fi») lo genera la pieza después, así que no se ve afectado.
2. **Referencia con página:** «(fi gura 5.28, p. 166)», «(véase fi gura 5.32, p. 170)», «(véase la fi gura 1.12, p. 19)», «(figura 3.9, pp. 87-88)» se quitan enteras. También la frase del cuerpo «Véase la figura 3.9, p. 87, para conocer más detalles.» completa.
3. **Nota al pie tras punto** (solo con `notas_al_pie=True`): «glándulas citogénicas.21 Sus productos» -> «glándulas citogénicas. Sus productos» (1 o 2 cifras pegadas a un punto y seguidas de espacio y mayúscula).
4. **Linter:** `revisar` debe reportar «fi gura» y cualquier «fi |fl » seguido de minúscula como «ligadura partida».
