# -*- coding: utf-8 -*-
"""Trae a main (sin commitear) lo que agy hizo en la copia aislada. Solo despues del visto bueno de Claude.

Uso:  python scripts/agy/aplicar.py <id>          -> ensayo: muestra que aplicaria, no toca nada
      python scripts/agy/aplicar.py <id> --si     -> lo aplica al arbol de trabajo de main (sin commit)
      python scripts/agy/aplicar.py <id> --limpiar -> borra la copia aislada y su rama

Seguridad: se niega si main tiene cambios sin commitear en alguno de los mismos archivos (otra sesion los toco).
El commit lo hace la sesion principal despues del verificador (CLAUDE.md).
"""
import os, sys, subprocess

AQUI = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(AQUI))
TRABAJO = os.environ.get("AXIOM_AGY_TRABAJO") or os.path.join(os.environ.get("LOCALAPPDATA", os.path.expanduser("~")), "axiom-agy")


def git(*args, cwd=REPO, entrada=None):
    return subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, encoding="utf-8", errors="replace", input=entrada)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return
    rid = sys.argv[1]
    copia = os.path.join(TRABAJO, rid, "repo")
    if not os.path.isdir(copia):
        sys.exit(f"No existe la copia: {copia}")
    if "--limpiar" in sys.argv:
        subprocess.run(["cmd", "/c", "rmdir", os.path.join(copia, "node_modules")], capture_output=True)   # solo el enlace
        print(git("worktree", "remove", "--force", copia).stderr or "copia borrada")
        print(git("branch", "-D", f"agy/{rid}").stdout)
        return
    git("add", "-N", ".", cwd=copia)
    EXCL = ["--", ".", ":(exclude)ENTREGA_AGY.md"]
    parche = git("diff", "--binary", "--no-color", *EXCL, cwd=copia).stdout
    archivos = [l for l in git("diff", "--name-only", *EXCL, cwd=copia).stdout.splitlines() if l]
    if not archivos:
        sys.exit("La copia no tiene cambios.")
    sucios = {l[3:].strip().strip('"') for l in git("status", "--porcelain").stdout.splitlines()}
    choque = [f for f in archivos if f in sucios]
    print("Archivos del parche:\n  " + "\n  ".join(archivos))
    if choque:
        sys.exit("ALTO: main tiene cambios sin commitear en estos archivos (otra sesion): " + ", ".join(choque))
    chk = git("apply", "--check", "-", entrada=parche)
    if chk.returncode:
        sys.exit("ALTO: el parche no aplica limpio a main:\n" + chk.stderr)
    if "--si" not in sys.argv:
        print("\nEnsayo OK: el parche aplica limpio. Repite con --si para aplicarlo (sin commit).")
        return
    r = git("apply", "-", entrada=parche)
    print(r.stderr or "Aplicado al arbol de trabajo de main. Falta: verificador, commit y --limpiar.")


if __name__ == "__main__":
    main()
