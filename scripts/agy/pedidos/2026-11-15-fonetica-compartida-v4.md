# Corrección (vuelta 4) de scripts/audio/fonetica_es.py

Causa encontrada en texto real: el extractor une cada página del PDF en UNA sola línea. Si la página empieza con «FIGURA 5-8 ...», `quitar_referencias_figuras` toma la línea entera como pie y no quita ninguna referencia de esa página (quedan 11 de 34 en Calvo tema 5).

Arreglo pedido:
- Las referencias entre paréntesis («(fig. 5-9)», «(v. fig. 5-12)», «(figs. 5-22 y 5-23)», «(tabla 2)», «(cuadro 5-1)», «(véase la figura 4.1)») se quitan SIEMPRE, en cualquier posición, aunque la línea empiece con «Figura»/«FIGURA»/«Tabla».
- La protección del pie solo impide tocar la ETIQUETA del pie («FIGURA 5-8», «Figura 3.2.») y su texto; no protege paréntesis de referencia.
- Lo mismo para las frases «, como se ve en la figura 3.2,» y «véase la figura 3.2.».

Caso de prueba obligatorio (agregarlo a probar_fonetica_es.py con la salida exacta, todo en UNA línea):
«FIGURA 5-8 Endosomas tardíos. Texto. Las vesículas internas (fig. 5-9). Algunos receptores siguen tres rutas (fig. 5-10): 1. Vía del reciclaje. Con ésteres de forbol (v. fig. 5-12), que son agentes.»
-> debe conservar «FIGURA cinco punto ocho Endosomas tardíos.» y no debe quedar ningún «fig.». No cambies nada más.
