import sys,re
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent/'scripts/audio'))
import bloques_afectados as B
M=Path(sys.argv[1]); T=M.parent/'_TEXTO_LITERAL_VERIFICADO'
pats=[('miles',None),('fi gura',r'\bfi gura'),('Na+',r'Na\+'),('μm',r'μm'),('CO2',r'CO2'),('corte',r'\w- \w'),('alfa',r'α'),('flecha',r'→'),('p. ej.',r'p\. ej\.'),('fi bras',r'\bfi bras')]
from faster_whisper import WhisperModel
m=WhisperModel('small',device='cpu',compute_type='int8')
for f in [T/'Tema_04_Biologia_Celular_LITERAL_TTS.md',T/'Tema_05_Morfo_Saladin_LITERAL_TTS.md']:
    bl=B.dividir_capitulo_en_bloques(f.read_text(encoding='utf-8'),max_palabras=100)
    for nom,p in pats:
        for i,b in enumerate(bl,1):
            hit=B.detectar_miles_en_palabras(b) if p is None else re.search(p,b)
            w=M/'_cache'/f.stem/f'parte_{i:03d}.wav'
            if not hit or not w.exists(): continue
            h=hit[0] if p is None else hit
            s=max(0,h.start()-50); frag=b[s:h.end()+50].replace('\n',' ')
            seg,_=m.transcribe(str(w),language='es'); oido=' '.join(x.text for x in seg)
            # ubicar en lo oido la zona aprox
            print(f"== {f.stem[:22]} parte_{i:03d} [{nom}]\nTEXTO: ...{frag}...\nOIDO : {oido[:700]}\n")
            break
