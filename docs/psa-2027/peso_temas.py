import re,glob,collections
G={'M-logica-conjuntos':r'conjunt|logica-prop|proposic|tablas-de-verdad|cuantific','M-complejos':r'complej|imaginar|moivre','M-financiera':r'interes|descuent|capital|financ','M-combinatoria-binomio':r'binomio-newton|combinac|permuta|factorial|combinatori','M-estadistica':r'estadist|mediana|moda|desviac|varianza|media-aritm|promedio','M-cuerpos-3d':r'cilindro-area|volumen-cilindro|cono-|esfera-area|volumen-esfera|volumen-cono|prisma|poliedro|solidos|tronco|area-lateral|volumen-de|cubo-arista|piramide-base|piramide-volumen','M-elipse-hiperbola':r'elipse|hiperbol|conica','M-limites-derivadas':r'limite|derivad|integral','F-mediciones':r'cifras-signif|notacion-cient|conversion-unid|analisis-dimens|errores|medicion','F-ondas-sonido':r'onda|sonido|eco-|efecto-doppler|longitud-onda','F-optica':r'optica|lentes|lente-|espejo|refraccion|reflexion|snell|indice-refraccion','F-calor':r'calor|temperat|dilata|termometr','F-estatica':r'estatic|palanca|torque|momento-de-fuerza|equilibrio-rotac|maquina','F-circular-gravitacion':r'circular|gravit|kepler|satelit|centripet','F-impulso':r'impulso|cantidad-de-mov|colision|choque','F-fluidos':r'hidrost|hidrodin|fluido|arquim|empuje|bernoulli|pascal|presion-hidro|caudal|flotacion|prensa','F-magnetismo':r'magnet|induccion|faraday|lorentz','Q-tabla-periodica':r'periodic|electronegativ|radio-atom|ionizacion','Q-cinetica-equilibrio':r'cinetica|equilibrio-quim|constante-equil|le-chatelier|kc|kp|velocidad-reacc','Q-acido-base':r'acido-base|ph|poh|titulacion|neutraliz|bronsted','Q-organica':r'organic|hidrocarb|alcan|alquen|alquin|alcohol|aldehid|ceton|amina|esteres|benceno|grupo-funcional|isomer'}
c=collections.Counter();n=0
for f in glob.glob('data/examenes/umss/*/*.md'):
  if '/medicina/' in f.replace(chr(92),'/'): continue
  for t in re.findall(r'^tema:\s*(\S+)',open(f,encoding='utf-8').read(),re.M):
    n+=1
    for k,p in G.items():
      if re.search(r'(^|-)('+p+r')',t): c[k]+=1
print('total',n)
for k,v in sorted(c.items(),key=lambda x:-x[1]): print(v,k)
for k in G:
  if k not in c: print(0,k)
import sys
for k in sys.argv[1:]:
  m=collections.Counter()
  for f in glob.glob('data/examenes/umss/*/*.md'):
    if '/medicina/' in f.replace(chr(92),'/'): continue
    for t in re.findall(r'^tema:\s*(\S+)',open(f,encoding='utf-8').read(),re.M):
      if re.search(r'(^|-)('+G[k]+r')',t): m[t]+=1
  print(k, m.most_common(14))
