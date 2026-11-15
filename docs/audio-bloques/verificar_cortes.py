"""Comprueba la lista de cortes de agy: cada cita tiene que estar en su línea (o la vecina; el corte puede empezar a mitad).
Uso: python verificar_cortes.py <resp1.md,resp2.md,...> <carpeta _TEXTO_LITERAL_VERIFICADO>"""
import sys, re, pathlib, csv, io
base = pathlib.Path(sys.argv[2])
bl = [b for x in sys.argv[1].split(',') for b in re.findall(r'```csv\s*\n(.*?)```', pathlib.Path(x).read_text(encoding='utf-8'), re.S)]
if not bl: sys.exit('sin bloque csv')
filas = [f for b in bl for f in csv.DictReader(io.StringIO(b), delimiter=';')]
norm = lambda s: re.sub(r'[\W_]+', ' ', s.lower()).split()
vistos, malos, palabras = set(), 0, {}
for f in filas:
    a = f['archivo'].strip().split('/')[-1]; vistos.add(a)
    p = base / a
    if not p.exists(): print('NO EXISTE', a); malos += 1; continue
    L = p.read_text(encoding='utf-8').splitlines()
    i, j = int(f['linea_ini'] or 0), int(f['linea_fin'] or 0)
    if i == 0: print('nada', a); continue
    ok = True
    for n, c in ((i, f['cita_ini']), (j, f['cita_fin'])):
        w = ' '.join(norm(c))
        if not (1 <= n <= len(L)) or w not in ' '.join(norm(' '.join(L[max(0, n-3):n+3]))):
            ok = False; print(f'CITA MAL {a} L{n}: «{c}»')
    if not ok: malos += 1; continue
    pal = sum(len(x.split()) for x in L[i-1:j])
    palabras[f['tipo']] = palabras.get(f['tipo'], 0) + pal
    print(f'ok {a} {i}-{j}/{len(L)} {f["tipo"]} {pal} pal {"(final)" if j >= len(L)-2 else ("(inicio)" if i <= 3 else "(medio)")} {f.get("nota","")[:60]}')
falta = {x.name for x in base.glob('*_LITERAL_TTS.md')} - vistos
print('FALTAN', sorted(falta)); print('filas mal', malos, 'de', len(filas)); print('palabras por tipo', palabras)
