import sys,re,collections,difflib,json
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent/'scripts/audio'))
import bloques_afectados as B
M=Path(sys.argv[1]); T=M.parent/'_TEXTO_LITERAL_VERIFICADO'
fon,sig,rep=B.cargar_herramientas_fonetica(M)
def canon(s):
    s=re.sub(r'\s+([,.;:!?)])',r'\1',s); s=re.sub(r'([(¿¡])\s+',r'\1',s)
    s=re.sub(r',{2,}',',',s); s=re.sub(r'\s+',' ',s).strip(); return s
pares=collections.Counter(); ej={}
res=[]; tot=aud=0; shift=[]
for f in sorted(T.glob('*_LITERAL_TTS.md')):
    txt=f.read_text(encoding='utf-8'); bl=B.dividir_capitulo_en_bloques(txt,max_palabras=100)
    n=0; lista=[]
    for i,b in enumerate(bl,1):
        nu=fon.normalizar(b,siglas=sig,reemplazos=rep,notas_al_pie=True)
        if canon(nu)!=canon(b):
            n+=1; lista.append(i)
            a,c=canon(b).split(),canon(nu).split()
            for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,a,c,autojunk=False).get_opcodes():
                if op!='equal':
                    k=(' '.join(a[i1:i2])[:40],' '.join(c[j1:j2])[:40]); pares[k]+=1
    # corrimiento: re-cortar texto nuevo entero
    nb=B.dividir_capitulo_en_bloques(fon.normalizar(txt,siglas=sig,reemplazos=rep,notas_al_pie=True),max_palabras=100)
    tot+=len(bl); aud+=n
    res.append((f.name,len(bl),n,len(nb)))
    json.dump({r[0]:None for r in []},open(S:=Path(__file__).parent/'x.json','w'))
    (Path(__file__).parent/'audibles').mkdir(exist_ok=True)
    (Path(__file__).parent/'audibles'/(f.stem+'.txt')).write_text(' '.join(map(str,lista)))
for r in res: print(f"{r[0][:45]:45} {r[1]:4} {r[2]:4}  recorte_nuevo={r[3]}")
print('TOTAL',tot,aud)
for k,v in pares.most_common(60): print(v,repr(k[0]),'->',repr(k[1]))
