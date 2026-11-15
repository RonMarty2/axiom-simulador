import sys,re,collections,difflib
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent/'scripts/audio'))
import bloques_afectados as B
M=Path(sys.argv[1]); T=M.parent/'_TEXTO_LITERAL_VERIFICADO'
fon,sig,rep=B.cargar_herramientas_fonetica(M)
def canon(s):
    s=re.sub(r'[,.;:!?()¿¡"«»]',' ',s); return re.sub(r'\s+',' ',s).strip().lower()
def clase(a,c):
    if B.detectar_miles_en_palabras(a): return '1 miles'
    if re.search(r'\w- \w',a) and not re.search(r'\w- \w',c): return '3 corte'
    if re.search(r'[+\u2192\u00d7\u03b1-\u03c9\u00b5\u03bc]|[A-Z][a-z]?\d|\d[A-Z]',a): return '2 simbolo'
    return '4 ligadura/otro'
orden=['1 miles','2 simbolo','3 corte','4 ligadura/otro']
C=collections.Counter(); porlibro=collections.defaultdict(collections.Counter); tot=collections.Counter()
lig=collections.Counter()
for f in sorted(T.glob('*_LITERAL_TTS.md')):
    lib='Saladin' if 'Saladin' in f.name else 'Calvo'
    bl=B.dividir_capitulo_en_bloques(f.read_text(encoding='utf-8'),max_palabras=100); tot[lib]+=len(bl)
    out=[]
    for i,b in enumerate(bl,1):
        nu=fon.normalizar(b,siglas=sig,reemplazos=rep,notas_al_pie=True)
        if canon(nu)==canon(b): continue
        # clase segun los tramos cambiados
        a,c=canon(b).split(),canon(nu).split(); ks=set()
        for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,a,c,autojunk=False).get_opcodes():
            if op=='equal':continue
            x=' '.join(a[max(0,i1-1):i2+1]); y=' '.join(c[j1:j2])
            if re.search(r'(^| )(fi|fl|ff) |(fi|fl)$',' '.join(a[i1:i2])): ks.add('4 ligadura/otro')
            elif re.search(r'[+\u2192\u00d7\u03b1-\u03c9\u00b5\u03bc]|[a-z]\d|\d[a-z]',' '.join(a[i1:i2])): ks.add('2 simbolo')
            elif ' '.join(a[i1:i2]).endswith('-'): ks.add('3 corte')
            else: ks.add('5 otro')
        if B.detectar_miles_en_palabras(b): ks.add('1 miles')
        k=min(ks) if ks else '5 otro'; C[k]+=1; porlibro[lib][k]+=1; out.append(f"{i}:{k[0]}")
    (Path(__file__).parent/'audibles'/(f.stem+'.txt')).write_text(' '.join(out))
print('por clase (bloque contado en su peor clase):',dict(sorted(C.items())))
for l in porlibro: print(l,tot[l],dict(sorted(porlibro[l].items())))
