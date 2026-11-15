"""Por capítulo: bloques de voz antes (respaldo) y después del recorte, y cuántos quedan idénticos
(mismo texto, en cualquier posición). Uso: python cuenta_recorte.py <_MOTOR_AUDIO>"""
import sys, re
from pathlib import Path
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, str(Path(__file__).parent / 'script_agy'))
import bloques_afectados as B
M = Path(sys.argv[1]); T = M.parent / '_TEXTO_LITERAL_VERIFICADO'; R = M.parent / '_RESPALDO_TEXTO_LITERAL_2026-11-15_antes_de_recorte'
div = lambda p: B.dividir_capitulo_en_bloques(p.read_text(encoding='utf-8'), max_palabras=100)
tot = [0, 0, 0]
for f in sorted(T.glob('*_LITERAL_TTS.md')):
    a, d = div(R / f.name), div(f)
    iguales = len(set(d) & set(a)); tot[0] += len(a); tot[1] += len(d); tot[2] += len(d) - iguales
    print(f"{f.stem.replace('_LITERAL_TTS',''):45} antes {len(a):4} después {len(d):4} quitados {len(a)-len(d)+ (len(d)-iguales):4} nuevos {len(d)-iguales:3}")
print(f'TOTAL antes {tot[0]} después {tot[1]} bloques nuevos a sintetizar {tot[2]}')
