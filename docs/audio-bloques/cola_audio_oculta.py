# -*- coding: utf-8 -*-
"""COLA DE AUDIO OCULTA (19-11-2026, copiloto; Ronald eligio A: «me preocupa que esa ventana este trabajando aparte y nosotros
queramos hacer lo mismo y nos pisemos»). Reemplaza al agy interactivo que grababa audiolibros con run_command (cada orden abria
una consola que parpadeaba). Corre con pythonw: SIN ninguna ventana.
1) Espera a que termine la grabacion en curso (--esperar <pid>), recien ahi cierra los agy indicados (--cerrar <pid,...>).
2) Pone un CANDADO (cola_audio.lock): mientras exista, NADIE mas graba ni acepta audio (ni Claude ni agy); si ya hay candado vivo, sale.
3) Por cada plan\\*.json: sintetizar_desde_plan.py (solo graba bloques nuevos; lo hecho se salta). Luego reaceptar_pendientes.py.
Avance y errores: cola_audio_oculta.log (misma carpeta). Cancelar: borrar cola_audio.lock (para al terminar el tema en curso).
Uso: pythonw cola_audio_oculta.py [--esperar PID] [--cerrar PID,PID]"""
import glob, json, os, subprocess, sys, time

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, "..", ".."))
LOCK = os.path.join(AQUI, "cola_audio.lock")
LOG = os.path.join(AQUI, "cola_audio_oculta.log")
PY = os.path.join(os.path.dirname(sys.executable), "python.exe")
NOWIN = 0x08000000  # CREATE_NO_WINDOW


def log(t):
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(time.strftime("%Y-%m-%d %H:%M:%S") + " · " + t + "\n")


def vivo(pid):
    r = subprocess.run(["tasklist", "/FI", f"PID eq {pid}", "/FO", "CSV", "/NH"], capture_output=True, text=True, creationflags=NOWIN)
    return str(pid) in r.stdout


def opt(k):
    a = sys.argv[1:]
    return a[a.index(k) + 1] if k in a else ""


def main():
    if os.path.exists(LOCK):
        try:
            pid = json.load(open(LOCK, encoding="utf-8")).get("pid")
        except Exception:
            pid = None
        if pid and vivo(pid):
            log(f"ya hay otra cola viva (pid {pid}); salgo sin hacer nada")
            return
    json.dump({"pid": os.getpid(), "desde": time.strftime("%Y-%m-%d %H:%M"), "quien": "cola_audio_oculta.py (copiloto 19-11)"},
              open(LOCK, "w", encoding="utf-8"))
    log("INICIO cola oculta, candado puesto")
    try:
        esp = opt("--esperar")
        if esp:
            log(f"espero a que termine la grabacion en curso (pid {esp})")
            while vivo(esp):
                time.sleep(2)
        for pid in [p for p in opt("--cerrar").split(",") if p.strip()]:
            r = subprocess.run(["taskkill", "/PID", pid.strip(), "/T", "/F"], capture_output=True, text=True, creationflags=NOWIN)
            log(f"cerrado agy {pid}: {(r.stdout or r.stderr).strip()[:150]}")
        planes = sorted(glob.glob(os.path.join(AQUI, "plan", "*.json")))
        motor = os.path.join("examenes pasados", "MEDICINA", "LIBROS DE MEDICINA", "_MOTOR_AUDIO")
        for i, p in enumerate(planes, 1):
            if not os.path.exists(LOCK):
                log("candado borrado: CANCELADO por pedido"); return
            n = os.path.basename(p)
            cmd = [PY, os.path.join("docs", "audio-bloques", "sintetizar_desde_plan.py"), motor, os.path.relpath(p, RAIZ)]
            tx = os.path.join(AQUI, "reextraido", n)
            if os.path.exists(tx):
                cmd += ["--textos", os.path.relpath(tx, RAIZ)]
            log(f"[{i}/{len(planes)}] grabando {n}")
            t0 = time.time()
            r = subprocess.run(cmd, cwd=RAIZ, capture_output=True, text=True, encoding="utf-8", errors="replace", creationflags=NOWIN)
            fin = (r.stdout or "").strip().splitlines()[-1:] or [""]
            log(f"[{i}/{len(planes)}] {n}: {'OK' if r.returncode == 0 else 'ERROR ' + str(r.returncode)} en {int(time.time() - t0)} s · {fin[0][:160]}"
                + ("" if r.returncode == 0 else " · " + (r.stderr or "").strip()[-300:]))
        log("aceptacion de todos los capitulos (reaceptar_pendientes.py)")
        r = subprocess.run([PY, os.path.join(AQUI, "reaceptar_pendientes.py")], cwd=RAIZ, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", creationflags=NOWIN)
        for l in (r.stdout or "").splitlines():
            log("  " + l)
        log("FIN cola oculta")
    except Exception as e:
        log(f"ERROR inesperado: {e!r}")
    finally:
        try:
            os.remove(LOCK)
        except OSError:
            pass


if __name__ == "__main__":
    main()
