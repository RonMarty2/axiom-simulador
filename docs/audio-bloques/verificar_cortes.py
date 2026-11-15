"""Comprueba la lista de cortes de agy: cada cita_ini/cita_fin tiene que estar dentro de su línea (el corte puede empezar a mitad).
Uso: python verificar_cortes.py <RESPUESTA.md> <carpeta _TEXTO_LITERAL_VERIFICADO>"""
import sys, re, pathlib, csv, io
resp = ''.join(pathlib.Path(x).read_text(encoding='utf-8') for x in sys.argv[1].split(','))
base = pathlib.Path(sys.argv[2])
m = re.search(r'```csv\s*\n(.*?)```', resp, re.S)
if not m: sys.exit('sin bloque csv')
filas = list(csv.DictReader(io.StringIO(m.group(1)), delimiter=';'))
norm = lambda s: re.sub(r'[\W_]+', ' ', s.lower()).split()
vistos, malos, palabras = set(), 0, {}
for f in filas:
    a = f['archivo'].strip().split('/')[-1]; vistos.add(a)
    p = base / a
    if not p.exists(): print('NO EXISTE', a); malos += 1; continue
    L = p.read_text(encoding='utf-8').splitlines()
    i, j = int(f['linea_ini'] or 0), int(f['linea_fin'] or 0)
    if i == 0: continue
    ok = True
    for n, c in ((i, f['cita_ini']), (j, f['cita_fin'])):
        w = ' '.join(norm(c))
        if not (1 <= n <= len(L)) or w not in ' '.join(norm(L[n-1])):
            ok = False; print(f'CITA MAL {a} L{n}: «{c}» vs «{L[n-1][:60] if 1<=n<=len(L) else "fuera"}»')
    if not ok: malos += 1; continue
    pal = sum(len(x.split()) for x in L[i-1:j])
    palabras[f['tipo']] = palabras.get(f['tipo'], 0) + pal
    print(f'ok {a} {i}-{j}/{len(L)} {f["tipo"]} {pal} pal {"(final)" if j >= len(L)-2 else "(medio)"}')
falta = {x.name for x in base.glob('*_LITERAL_TTS.md')} - vistos
print('FALTAN', sorted(falta)); print('filas mal', malos); print('palabras por tipo', palabras)
