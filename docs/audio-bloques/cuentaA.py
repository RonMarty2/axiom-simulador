import sys,re
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent/'scripts/audio'))
import bloques_afectados as B
M=Path(sys.argv[1]); T=M.parent/'_TEXTO_LITERAL_VERIFICADO'
R=re.compile(r'\b(?:Na|K|Ca|Cl|H|Mg|Fe|Zn|Cu)\d?[+\u2212-](?=\W|$)|[\u00b5\u03bc](?:m|mol|g|l|L)\b')
tot=0
for f in sorted(T.glob('*_LITERAL_TTS.md')):
    s=f.stem; m=re.match(r'Tema_(\d+)_Morfo_Saladin',s)
    c= f'Morfo_Cap_{m[1]}_Saladin_LITERAL_TTS' if m else ('Morfo_Atlas_B_Saladin_LITERAL_TTS' if s.startswith('Atlas_B') else s)
    d=M/'_cache'/c; bl=B.dividir_capitulo_en_bloques(f.read_text(encoding='utf-8'),max_palabras=100)
    if not d.exists() or len(list(d.glob('parte_*.wav')))!=len(bl): continue
    n=[i for i,b in enumerate(bl,1) if R.search(b) or B.detectar_miles_en_palabras(b)]
    tot+=len(n); print(f"{s.replace('_LITERAL_TTS',''):32} {len(n):3}/{len(bl)}")
print('TOTAL A',tot)
