# -*- coding: utf-8 -*-
"""Ejecutor de agy (Gemini) para Axiom. Adaptado de ejecutor-agy de UNIFRANZ (1-nov-2026).

Claude NO hace el trabajo mecanico: lo encarga, revisa barato (DIFF + CONTROLES) y decide.
El trabajo se hace en una copia aislada del repo (git worktree) y agy no puede escribir fuera de ella (candado).

Uso (desde la raiz del repo, correrlo en segundo plano):
  python scripts/agy/agy_run.py --tipo <tipo> --nivel mecanico|lectura|criterio|criterio-alto --pedido <archivo.md>
         [--leer <carpeta>]... [--despues "<comando>"]... [--solo-texto] [--timeout 900] [--seguir <id> --pedido <correccion.md>]

Si no pasas --despues, corre los controles de siempre dentro de la copia: tsc, lint y tests.
Deja en <trabajo>/<id>/: ENTREGA.json, DIFF.txt (lineas enteras), CONTROLES.txt, RESPUESTA.md.
Revisar SOLO eso. Para traer el resultado a main: python scripts/agy/aplicar.py <id> [--si]
"""
import argparse, os, sys, json, time, subprocess, datetime

AQUI = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(AQUI))
ARRANQUE = os.path.join(AQUI, "arranque")      # agy arranca aca: ahi descubre el candado (_agents/hooks.json)
TRABAJO = os.environ.get("AXIOM_AGY_TRABAJO") or os.path.join(os.environ.get("LOCALAPPDATA", os.path.expanduser("~")), "axiom-agy")
AGY = os.path.join(os.path.expanduser("~"), "AppData", "Local", "agy", "bin", "agy.exe")
NODE_MODULES = os.path.join(REPO, "node_modules")

MODELOS = {"mecanico": "Gemini 3.8 Flash (Low)",
           "lectura": "Gemini 3.8 Flash (Medium)",
           "criterio": "Gemini 4 Argon (Medium)",
           "criterio-alto": "Gemini 4 Argon (High)"}
CONTROLES_DEFAULT = ["npx tsc --noEmit", "npm run lint", "npm test"]

REGLAS_AGY = """
REGLAS FIJAS (no negociables):
1. Solo puedes crear o editar archivos dentro de: {repo}
   Es una copia aislada del repo de Axiom. El resto del disco se puede LEER, nunca modificar.
   LA TERMINAL ESTA BLOQUEADA: no uses run_command. Usa SOLO herramientas de archivos:
   list_dir, find_by_name, grep_search, view_file, write_to_file, replace_file_content.
   Si una accion es denegada, NO te detengas: sigue con las herramientas de archivos hasta terminar.
   Los controles (tsc, lint, tests) los corre el ejecutor despues; escribe el codigo para que pasen.
2. Lee CLAUDE.md y docs/lecciones-agentes.md del repo antes de empezar.
3. Texto al alumno en tuteo (nunca voseo). Sin emojis en codigo. Cero cifras de catalogo escritas a mano.
4. No inventes datos. Si no sabes algo, escribe "NO SE".
5. Haz SOLO lo que pide la tarea. No reformatees ni "mejores" lo que no se pidio. No hagas commit.
6. Al terminar, escribe ENTREGA_AGY.md en la raiz de la copia con: (a) que hiciste, (b) archivos que cambiaste,
   (c) que comprobaste, (d) dudas o lo que no pudiste hacer. Breve.
"""


def git(*args, cwd=REPO):
    return subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, encoding="utf-8", errors="replace")


def snapshot_base(rid, rutas):
    """Commit suelto (sin mover tu rama ni tu indice): HEAD + esos archivos tal como estan hoy en el arbol de trabajo.
    Sirve cuando el trabajo nuevo depende de cambios que todavia no estan commiteados."""
    idx = os.path.join(TRABAJO, f"_idx_{rid}")
    env = dict(os.environ, GIT_INDEX_FILE=idx)
    def g(*args):
        r = subprocess.run(["git", *args], cwd=REPO, capture_output=True, text=True, encoding="utf-8", errors="replace", env=env)
        if r.returncode:
            sys.exit("ALTO: fallo la base (" + " ".join(args[:2]) + "):" + chr(10) + r.stderr)
        return r.stdout.strip()
    g("read-tree", "HEAD")
    g("add", "--", *[":(literal)" + p for p in rutas])
    tree = g("write-tree")
    sha = g("commit-tree", tree, "-p", "HEAD", "-m", "base agy (HEAD + archivos sin commitear)")
    try:
        os.remove(idx)
    except OSError:
        pass
    return sha


def crear_copia(rid, base=None):
    destino = os.path.join(TRABAJO, rid, "repo")
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    r = git("worktree", "add", "-b", f"agy/{rid}", destino, snapshot_base(rid, base) if base else "HEAD")
    if r.returncode:
        sys.exit("ALTO: no se pudo crear la copia aislada:\n" + r.stderr)
    # node_modules por enlace (fuera de Synology) para poder correr tsc/lint/tests dentro de la copia
    if os.path.isdir(NODE_MODULES):
        subprocess.run(["cmd", "/c", "mklink", "/J", os.path.join(destino, "node_modules"), NODE_MODULES], capture_output=True)
    return destino


def diff_de(repo):
    git("add", "-N", ".", cwd=repo)                     # que los archivos nuevos aparezcan en el diff
    estado = [l[3:] for l in git("status", "--porcelain", cwd=repo).stdout.splitlines()
              if l[3:] and not l[3:].startswith("node_modules") and l[3:] != "ENTREGA_AGY.md"]
    return estado, git("diff", "--no-color", "--", ".", ":(exclude)ENTREGA_AGY.md", cwd=repo).stdout


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tipo", default="")
    ap.add_argument("--nivel", default="", choices=[""] + list(MODELOS))
    ap.add_argument("--pedido", required=True)
    ap.add_argument("--leer", action="append", default=[], help="carpeta de SOLO LECTURA fuera de la copia (repetible); sin esto agy no puede leer lo que este fuera")
    ap.add_argument("--base", action="append", default=[], help="archivo del arbol de trabajo (sin commitear) que la copia debe traer ya puesto (repetible)")
    ap.add_argument("--despues", action="append", default=[])
    ap.add_argument("--solo-texto", action="store_true")
    ap.add_argument("--timeout", type=int, default=900)
    ap.add_argument("--seguir", default="", help="id de una entrega: corrige en LA MISMA conversacion de agy")
    ap.add_argument("--con-binarios", action="store_true", help="no convertir PDF/Word (solo si agy no necesita leerlos)")
    a = ap.parse_args()

    # 02-11-2026: agy SOLO lee texto (con PDF/Word se rindio y gasto 45k tokens en UNIFRANZ). Si el pedido o --leer nombran
    # PDF/Word/PPT/Excel con ruta absoluta, se convierten solos a Markdown con el conversor central (pymupdf4llm/markitdown),
    # el MISMO que usa el motor de UNIFRANZ: SynologyDrive\12.NUBES\_AGENTES_CENTRAL\herramientas\a_texto.py.
    nota_texto, dirs_texto = "", []
    if not a.seguir and not a.con_binarios:
        central = os.path.expanduser(r"~\SynologyDrive\12.NUBES\_AGENTES_CENTRAL\herramientas")
        if os.path.exists(os.path.join(central, "a_texto.py")):
            sys.path.insert(0, central)
            from a_texto import preparar_para_agy
            nota_texto, dirs_texto = preparar_para_agy([open(a.pedido, encoding="utf-8").read()], a.leer,
                                                       os.path.join(TRABAJO, "_TEXTO"))

    if not os.path.exists(os.path.join(ARRANQUE, "_agents", "hooks.json")):
        sys.exit("ALTO: falta el candado (scripts/agy/arranque/_agents/hooks.json). No se corre agy sin candado.")

    previo, vuelta = None, 1
    if a.seguir:
        carpeta = os.path.join(TRABAJO, a.seguir)
        previo = json.load(open(os.path.join(carpeta, "ENTREGA.json"), encoding="utf-8"))
        if not previo.get("conversation_id"):
            sys.exit("ALTO: esa entrega no guardo conversation_id. Haz un pedido nuevo.")
        vuelta = len(previo.get("vueltas") or []) + 2
        rid = f"{a.seguir}_v{vuelta}"
        repo = os.path.join(carpeta, "repo")
        a.despues = a.despues or previo.get("despues") or []
        a.solo_texto = a.solo_texto or previo.get("solo_texto", False)
        a.tipo = a.tipo or previo.get("tipo", "")
    else:
        if not a.tipo or not a.nivel:
            sys.exit("Falta --tipo y --nivel (solo se pueden omitir con --seguir).")
        rid = datetime.datetime.now().strftime("%Y%m%d-%H%M%S") + "_" + a.tipo
        carpeta = os.path.join(TRABAJO, rid)
        os.makedirs(carpeta, exist_ok=True)
        repo = crear_copia(rid, a.base)
    suf = f"_v{vuelta}" if vuelta > 1 else ""
    controles_a_correr = a.despues or ([] if a.solo_texto else CONTROLES_DEFAULT)

    pedido = open(a.pedido, encoding="utf-8").read()
    if previo:
        texto = (f"CORRECCION de Claude sobre tu entrega anterior (misma tarea, mismas reglas, misma copia {repo}). "
                 f"Corrige SOLO esto:\n\n{pedido}\n\nAl terminar, agrega una seccion 'Vuelta {vuelta}' a ENTREGA_AGY.md.")
    else:
        texto = pedido + "\n" + nota_texto + REGLAS_AGY.format(repo=repo)
    with open(os.path.join(carpeta, f"PEDIDO{suf}.md"), "w", encoding="utf-8") as f:
        f.write(texto)

    modelo = previo["modelo"] if previo and not a.nivel else MODELOS[a.nivel]
    cmd = [AGY, "--sandbox", "--model", modelo, "--mode", "plan" if a.solo_texto else "accept-edits",
           "--output-format", "stream-json", "--print-timeout", f"{a.timeout}s", "-p", texto]
    if previo:
        cmd[1:1] = ["--conversation", previo["conversation_id"]]
    for p_ in a.leer + dirs_texto + [repo]:
        cmd[1:1] = ["--add-dir", p_]
    env = dict(os.environ, AXIOM_AGY_TRABAJO=TRABAJO)

    def correr(cmd_, archivo):
        with open(archivo, "w", encoding="utf-8") as out:
            p = subprocess.run(cmd_, cwd=ARRANQUE, stdout=out, stderr=subprocess.STDOUT, env=env)
        r_, errs = {}, []
        for linea in open(archivo, encoding="utf-8", errors="replace"):
            try:
                e = json.loads(linea)
            except Exception:
                continue
            if e.get("event") == "result":
                r_ = e.get("result", {})
            su = e.get("step_update") or {}
            for err in (su.get("error"), (su.get("tool_info") or {}).get("error")):
                if isinstance(err, dict):
                    errs.append(err.get("message", "")[:200])
        return p, r_, errs

    t0 = time.time()
    proc, res, errores = correr(cmd, os.path.join(carpeta, f"run{suf}.jsonl"))
    tokens_total = (res.get("usage") or {}).get("total_tokens") or 0
    cambiados, _ = diff_de(repo)
    reintento = False
    if not previo and not a.solo_texto and not cambiados and errores:
        reintento = True      # una sola vez; gasta cuota de Gemini, no de Claude
        aviso = ("\n\nATENCION: en tu intento anterior usaste la terminal, fue BLOQUEADA y te detuviste sin hacer la tarea. "
                 "Errores: " + " | ".join(errores[:2]) + "\nHazla ahora usando SOLO herramientas de archivos.")
        proc, res, errores2 = correr(cmd[:-1] + [cmd[-1] + aviso], os.path.join(carpeta, "run2.jsonl"))
        errores += ["[reintento] " + x for x in errores2]
        tokens_total += (res.get("usage") or {}).get("total_tokens") or 0
    minutos = round((time.time() - t0) / 60, 1)
    with open(os.path.join(carpeta, f"RESPUESTA{suf}.md"), "w", encoding="utf-8") as f:
        f.write(res.get("response", "(sin respuesta: ver run.jsonl)"))

    # --- controles mecanicos, por script (cero modelo)
    salidas = []
    for c in controles_a_correr:
        r = subprocess.run(c, cwd=repo, shell=True, capture_output=True, text=True, encoding="utf-8", errors="replace")
        salidas.append(f"$ {c}\n[codigo {r.returncode}]\n{(r.stdout + r.stderr)[-4000:]}")
    if salidas:
        with open(os.path.join(carpeta, "CONTROLES.txt"), "w", encoding="utf-8") as f:
            f.write("\n\n".join(salidas))
    cambiados, diff = diff_de(repo)
    with open(os.path.join(carpeta, "DIFF.txt"), "w", encoding="utf-8") as f:
        f.write(diff or "(sin cambios)")

    estado = res.get("status", f"SIN RESULTADO (codigo {proc.returncode})")
    if res.get("finished_reason"):
        estado += " CORTADA: " + str(res["finished_reason"])
    if res.get("denied_actions"):
        estado += " CON ACCIONES NEGADAS: " + ", ".join(str(x.get("action")) for x in res["denied_actions"])
    if not (res.get("response") or "").strip():
        estado += " RESPUESTA VACIA"
    if not a.solo_texto and not cambiados:
        estado += " PERO NO CREO NI CAMBIO NADA"
    if any("quota" in (e or "").lower() or "429" in (e or "") for e in errores) or "quota" in (res.get("response") or "").lower():
        estado += " SIN CUOTA EN ESTE MODELO: probar otro (agy models)"
    vueltas = list((previo or {}).get("vueltas") or [])
    if previo:
        vueltas.append({"id": rid, "estado_agy": estado, "minutos": minutos, "errores_agy": errores})
    entrega = {"id": a.seguir or rid, "estado_agy": estado, "reintento": reintento, "errores_agy": errores, "modelo": modelo,
               "minutos": minutos, "tokens_agy": tokens_total, "archivos_cambiados": cambiados,
               "controles": [s.splitlines()[0] + " " + s.splitlines()[1] for s in salidas],
               "revisar": ["DIFF.txt", "CONTROLES.txt", "ENTREGA_AGY.md (en repo/)"],
               "veredicto": "NO VERIFICADO (falta revision de Claude)",
               "conversation_id": res.get("conversation_id") or (previo or {}).get("conversation_id"),
               "tipo": a.tipo, "despues": a.despues, "solo_texto": a.solo_texto, "vuelta": vuelta, "vueltas": vueltas}
    tmp = os.path.join(carpeta, "ENTREGA.json.tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(entrega, f, ensure_ascii=False, indent=2)
    os.replace(tmp, os.path.join(carpeta, "ENTREGA.json"))
    print(json.dumps(entrega, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
