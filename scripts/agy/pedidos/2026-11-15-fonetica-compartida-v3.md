# Corrección (vuelta 3) de scripts/audio/fonetica_es.py

Un solo fallo en texto real de Calvo: `quitar_referencias_figuras` no quita las referencias con «v.» (abreviatura de véase) ni algunas de número de dos cifras. Deben desaparecer del cuerpo, incluido el paréntesis:
- «al citoplasma (v. fig. 5-3).» -> «al citoplasma.»
- «La dinamina (v. fig. 5-6), una GTPasa» -> «La dinamina, una GTPasa»
- «vesículas internas (fig. 5-9). Algunos» -> «vesículas internas. Algunos»
- «tres rutas (fig. 5-10): 1.» -> «tres rutas: uno.»
- «(v. figs. 5-12 y 5-13)», «(véanse figs. 5-1 a 5-3)», «(cap. 3)» quedan igual de quitadas que «(fig. 5-1)» (salvo «(cap. 3)», que NO se quita).
Acepta guion -, – y — y números de 1 a 3 cifras. Agrega estos casos a probar_fonetica_es.py con su salida exacta. No cambies nada más.
