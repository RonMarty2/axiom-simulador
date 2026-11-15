import json,re,sys,difflib,random
from pathlib import Path
R=Path(r'C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador')
C=R/'examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO/_cache_v2'
X=R/'docs/audio-bloques/reextraido'
def cache_dir(n):
    m=re.match(r'Tema_(\d+)_Morfo_Saladin_(.*)',n)
    if m: return C/f'Morfo_Cap_{m[1]}_Saladin_{m[2]}'
    m=re.match(r'Atlas_B_Morfo_Saladin_(.*)',n)
    if m: return C/f'Morfo_Atlas_B_Saladin_{m[1]}'
    return C/n
cand=[]
for f in sorted(X.glob('*.json')):
    d=cache_dir(f.stem)
    mf=d/'manifiesto.json'
    if not mf.exists(): continue
    man={str(e['j']):e for e in json.load(open(mf,encoding='utf-8'))}
    for r in json.load(open(f,encoding='utf-8')):
        e=man.get(str(r['j']))
        if r['estado']=='OK' and e and e.get('texto_fuente')=='reextraido' and (d/f"parte_{int(r['j']):03d}.wav").exists():
            cand.append((f.stem,d,r))
print('candidatas',len(cand))
muestra=cand
from faster_whisper import WhisperModel
m=WhisperModel('small',device='cpu',compute_type='int8')
norm=lambda s:re.sub(r'[^\wáéíóúñü ]',' ',s.lower()).split()
for cap,d,r in muestra:
    w=d/f"parte_{int(r['j']):03d}.wav"
    seg,_=m.transcribe(str(w),language='es'); oido=' '.join(x.text for x in seg)
    a,b=norm(r['texto_nuevo']),norm(oido)
    sim=difflib.SequenceMatcher(None,a,b).ratio()
    # palabras del texto que faltan en lo oído (diferencias)
    dif=[(' '.join(a[i1:i2]),' '.join(b[j1:j2])) for t,i1,i2,j1,j2 in difflib.SequenceMatcher(None,a,b).get_opcodes() if t!='equal']
    print(f"== {cap} j={r['j']} sim={sim:.2f} palabras={len(a)}/{len(b)}")
    for x,y in dif[:8]: print(f"   texto «{x}» / oído «{y}»")
    sys.stdout.flush()
