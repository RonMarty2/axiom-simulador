import sys,re
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent/'scripts/audio'))
import bloques_afectados as B
M=Path(sys.argv[1]); T=M.parent/'_TEXTO_LITERAL_VERIFICADO'
ok=mal=0; malos=[]
for f in sorted(T.glob('*_LITERAL_TTS.md')):
    s=f.stem; m=re.match(r'Tema_(\d+)_Morfo_Saladin',s)
    c= f'Morfo_Cap_{m[1]}_Saladin_LITERAL_TTS' if m else ('Morfo_Atlas_B_Saladin_LITERAL_TTS' if s.startswith('Atlas_B') else s)
    d=M/'_cache'/c; n=len(list(d.glob('parte_*.wav'))) if d.exists() else -1
    b=len(B.dividir_capitulo_en_bloques(f.read_text(encoding='utf-8'),max_palabras=100))
    if n==b: ok+=1
    else: mal+=1; malos.append(f"{s.replace('_LITERAL_TTS','')}: texto {b} / audio {n}")
print('coinciden',ok,'no coinciden',mal); print('\n'.join(malos))
