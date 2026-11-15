# Corrección (vuelta 5) de scripts/audio/fonetica_es.py

Comparé la versión vieja y la tuya palabra por palabra sobre dos capítulos reales. Corrige estos casos, agrega cada uno a probar_fonetica_es.py con su salida exacta y no cambies nada más.

1. **Enlaces web (RETROCESO, la versión vieja los quitaba):** se eliminan enteros `https?://\S+`, `www\.\S+` y cualquier palabra que termine en `.html`, `.htm`, `.jpg`, `.png`, `.pdf`, `.edu`, `.org`, `.com` u otro dominio (`\S+\.(?:edu|org|com|net|info|uk|es|bo)\b\S*`). «Ver http://synapses.clm.utexas.edu.» -> «Ver.» Lo mismo con «/~emunit/images/caveolae2.jpg».
2. **Cargas de iones:** «Ca2+» -> «Ca dos más», «Na+» -> «Na más», «Cl−» y «Cl-» al final de palabra -> «Cl menos», «Fe3+» -> «Fe tres más», «HCO3−» -> «H C O tres menos». No convertir nombres de elementos (eso va por `reemplazos` de cada libro).
3. **Número con letra de subfigura:** «17.4a» -> «diecisiete punto cuatro a»; «5-12b» tras figura -> «cinco punto doce b»; «(fig. 17.4a)» se quita entero.
4. **Llamadas a nota al pie** (nuevo parámetro `notas_al_pie=False` en `normalizar`; Medicina lo pasará en True): con True se quitan las cifras de 1 o 2 dígitos pegadas al final de una palabra en minúscula de 4 o más letras («infundíbulo5» -> «infundíbulo», «pineal13» -> «pineal», «paraventriculares7» -> «paraventriculares») y las que van pegadas tras una coma antes de espacio («paracrinas,1 que» -> «paracrinas, que»). NO tocar «HSP70», «T3», «SV40», «Sar1», «CD4», «caveolina-1» ni «H2O2» (mayúsculas, palabra corta o guion). Con False, comportamiento actual.
