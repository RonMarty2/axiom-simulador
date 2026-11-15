"""Recorta de los textos _LITERAL_TTS.md lo que no va al audio (bibliografía, autoevaluación,
actividad, guía, índice, encabezados), usando la lista de cortes de docs/audio-bloques/cortes/.
Corta por CITA, no por línea entera: «Lecturas recomendadas» a veces empieza a mitad de línea.
Si la revisión (revision-medio-agy.md) dice que el tramo es solo basura, se va la línea entera.
Uso: python recortar.py <carpeta textos> [--aplicar]   (sin --aplicar solo muestra los bordes)"""
import sys, re, pathlib, csv, io, collections
sys.stdout.reconfigure(encoding='utf-8')

AQUI = pathlib.Path(__file__).parent / 'cortes'
base = pathlib.Path(sys.argv[1]); aplicar = '--aplicar' in sys.argv

def bloques(p):
    return [f for b in re.findall(r'```csv\s*\n(.*?)```', p.read_text(encoding='utf-8'), re.S)
            for f in csv.DictReader(io.StringIO(b), delimiter=';')]

filas = [f for n in ('cortes-calvo.md', 'cortes-saladin1.md', 'cortes-saladin2.md') for f in bloques(AQUI / n)]
basura = {(r['archivo'].strip(), r['lineas'].split('/')[0]) for r in bloques(AQUI / 'revision-medio-agy.md')
          if r['solo_basura'].strip() == 'sí'}

def patron(cita):  # tokens de la cita separados por cualquier cosa que no sea letra/número
    t = re.findall(r'\w+', cita.lower())
    return re.compile(r'(?<!\w)' + r'[\W_]+'.join(map(re.escape, t)) + r'(?!\w)', re.I) if t else None

def buscar(texto, offs, n, cita, primero):
    """Busca la cita en una ventana de líneas alrededor de n (puede cruzar saltos de línea)
    y se queda con la aparición más cercana a la línea n. Devuelve (ini, fin) absolutos."""
    p = patron(cita)
    if not p: return None
    lo, hi = offs[max(0, n-4)], offs[min(len(offs)-1, n+3)]
    lin = lambda x: sum(1 for o in offs if o <= x)
    m = [(abs(lin(x.start() if primero else x.end()-1) - n), x) for x in p.finditer(texto, lo, hi)]
    if not m: return None
    x = min(m, key=lambda t: t[0])[1]
    return x.start(), x.end()

por_archivo = collections.defaultdict(list)
for f in filas:
    if int(f['linea_ini'] or 0): por_archivo[f['archivo'].strip().split('/')[-1]].append(f)

total = {'antes': 0, 'despues': 0}; informe = []
for a, fs in sorted(por_archivo.items()):
    p = base / a; texto = p.read_text(encoding='utf-8')
    lineas = texto.splitlines(keepends=True)
    offs = [0]
    for l in lineas: offs.append(offs[-1] + len(l))
    fs.sort(key=lambda f: int(f['linea_ini']))
    tramos = []
    for idx, f in enumerate(fs):
        i, j = int(f['linea_ini']), int(f['linea_fin'])
        entera = (a, f'{i}-{j}') in basura
        s = buscar(texto, offs, i, f['cita_ini'], True)
        e = buscar(texto, offs, j, f['cita_fin'], False)
        nota = ''
        if s is None: s = (offs[i-1], 0); nota += ' INI-NO-HALLADA'
        if e is None:
            sig = fs[idx+1] if idx + 1 < len(fs) else None
            k = int(sig['linea_ini']) if sig else 0
            if sig and k <= j + 2:  # el tramo siguiente empieza enseguida: cortar hasta ahí
                h = buscar(texto, offs, k, sig['cita_ini'], True)
                e = (0, h[0] if h else offs[min(k, len(offs)) - 1])
            elif not sig and j >= len(lineas) - 2: e = (0, len(texto))
            else: e = (0, offs[min(j, len(offs)-1)])  # fin de la línea j
            nota += f' FIN-NO-HALLADA({a}:{j})'
        ini, fin = s[0], e[1]
        while fin < len(texto) and texto[fin] in '.,;:)»”': fin += 1  # puntuación que cierra la cita
        if entera:  # línea(s) completas
            ini = texto.rfind('\n', 0, ini) + 1
            k = texto.find('\n', fin); fin = len(texto) if k < 0 else k
        tramos.append([ini, fin, f['tipo'], nota])
    # unir tramos que se tocan o se pisan (solo espacios entre medio)
    tramos.sort(); unidos = []
    for t in tramos:
        if unidos and (t[0] <= unidos[-1][1] or not texto[unidos[-1][1]:t[0]].strip()):
            unidos[-1][1] = max(unidos[-1][1], t[1]); unidos[-1][2] += '+' + t[2]; unidos[-1][3] += t[3]
        else: unidos.append(t)
    nuevo, pos = [], 0
    for ini, fin, tipo, nota in unidos:
        antes = texto[max(0, ini-70):ini].replace('\n', '⏎'); despues = texto[fin:fin+70].replace('\n', '⏎')
        informe.append(f'{a} [{tipo}]{nota} {len(texto[ini:fin].split())} pal\n   …{antes}[✂]{despues}…')
        nuevo.append(texto[pos:ini]); pos = fin
    nuevo.append(texto[pos:])
    res = ''.join(nuevo)
    res = re.sub(r'[ \t]+\n', '\n', res); res = re.sub(r'\n{3,}', '\n\n', res).lstrip('\n')
    total['antes'] += len(texto.split()); total['despues'] += len(res.split())
    if aplicar: p.write_text(res, encoding='utf-8')
print('\n'.join(informe))
print(f"\narchivos {len(por_archivo)} · palabras {total['antes']} -> {total['despues']} (quitadas {total['antes']-total['despues']})",
      '· APLICADO' if aplicar else '· EN SECO')
