#!/bin/bash
# Vigilante (regla 16 de libro-audio-tts): prueba la cuota cada 30 min y relanza la grabación --textos
# capítulo por capítulo; si un capítulo vuelve a cortarse por cuota, espera y reintenta. Termina cuando
# todos los capítulos pasan sin error. Estado en docs/audio-bloques/vigilante_estado.txt.
cd "$(dirname "$0")/../.."
M="examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO"; E=docs/audio-bloques/vigilante_estado.txt
export PYTHONIOENCODING=utf-8
# 19-nov: tarea programada de Windows lo relanza cada 30 min; si ya terminó hoy, no hace nada
tail -1 "$E" 2>/dev/null | grep -q "^$(date +%d)-.*TERMINADO" && exit 0
# 19-11 (copiloto): UN solo vigilante a la vez (la tarea de cada 30 min abria otro bucle y quedaban 3 grabando juntos)
L=docs/audio-bloques/vigilante.lock
W=$(cat /proc/$$/winpid)
# 20-11 (copiloto, Ronald: «aqui en esta portatil empieza»): el candado lleva PC y pid; si es de OTRA PC y su
# estado se escribio hace < 45 min, esa PC esta grabando -> esta no arranca (Synology comparte la carpeta)
H="$(hostname)-$(python -c "import winreg,hashlib;k=winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE,r'SOFTWARE\Microsoft\Cryptography',0,winreg.KEY_READ|winreg.KEY_WOW64_64KEY);print(hashlib.md5(winreg.QueryValueEx(k,'MachineGuid')[0].encode()).hexdigest()[:4])")"
if [ -f "$L" ]; then read LH LP < "$L"; [ -z "$LP" ] && { LP=$LH; LH=$H; }
  if [ "$LH" != "$H" ]; then [ -n "$(find "$E" -mmin -45 2>/dev/null)" ] && exit 0
  elif tasklist //FI "PID eq $LP" //NH 2>/dev/null | grep -q bash; then exit 0; fi
fi
echo "$H $W" > "$L"; trap '[ "$(cat "$L" 2>/dev/null)" = "$H $W" ] && rm -f "$L"' EXIT
echo "$(date +%d-%H:%M) vigilante arranca en $H" >> "$E"

# 20-11 (copiloto, Ronald: «¿no se chocó con la portátil?»): si OTRA PC tomó el candado mientras este bucle dormía, este sale
sigo_dueno() { [ "$(cat "$L" 2>/dev/null)" = "$H $W" ] || { echo "$(date +%d-%H:%M) $H deja de grabar: el candado ahora es de $(cat "$L" 2>/dev/null)" >> "$E"; exit 0; }; }
while true; do
  sigo_dueno
  if python docs/audio-bloques/probar_cuota_tts.py "$M" > /dev/null 2>&1; then
    if [ -f docs/audio-bloques/cola_audio.lock ]; then echo "$(date +%d-%H:%M) graba la cola oculta (candado); espero" >> "$E"; sleep 1800; continue; fi
    echo "$(date +%d-%H:%M) cuota OK, grabando" >> "$E"; corte=0; saltados=0
    for p in docs/audio-bloques/plan/*.json; do
      sigo_dueno
      b=$(basename "$p"); t=docs/audio-bloques/reextraido/$b; [ -f "$t" ] || continue
      # Filtro 16-nov: solo se graba lo que pasó las revisiones de texto 1 a 8 (informe en aceptacion/)
      python docs/audio-bloques/capitulo_aceptado.py "${b%.json}" || { saltados=$((saltados+1)); continue; }
      out=$(python docs/audio-bloques/sintetizar_desde_plan.py "$M" "$p" --textos "$t" 2>&1 | grep "Resumen\|Error\|ALTO")
      echo "$out" | sed "s/^/$(date +%d-%H:%M) /" >> "$E"
      # 20-11 (copiloto): plan viejo (el texto cambio despues del plan) -> se salta y se anota; no frena a los demas
      if echo "$out" | grep -q "no coincide"; then echo "$(date +%d-%H:%M) PLAN VIEJO ${b%.json}: regenerar con plan_sintesis.py o plan_todo_nuevo.py --forzar" >> "$E"; continue; fi
      if echo "$out" | grep -q "Error"; then corte=1; break; fi
    done
    # Fase 2: Libro 3 (EdS), un capitulo por archivo; salta los que ya tienen .wav en _AUDIO_V2
    if [ $corte = 0 ]; then
      for md in "examenes pasados/MEDICINA/PSA_2027_FUENTES/audio_eds"/EdS_*_LITERAL_TTS.md; do
        n=$(basename "$md" .md); w="$M/_AUDIO_V2/$n.wav"; [ -f "$w" ] && continue
        python docs/audio-bloques/capitulo_aceptado.py "$n" || { saltados=$((saltados+1)); continue; }
        out=$(python "$M/sintetizar_libro.py" --md "$md" --salida "$w" 2>&1 | tail -3)
        echo "$out" | sed "s/^/$(date +%d-%H:%M) EdS $n: /" >> "$E"
        if [ ! -f "$w" ]; then corte=1; break; fi
      done
    fi
    # 16-nov: los capítulos sin aceptación no cuentan como hechos; se vuelve a mirar en 30 min (entran en cadena)
    if [ $corte = 0 ] && [ $saltados = 0 ]; then echo "$(date +%d-%H:%M) TERMINADO" >> "$E"; echo TERMINADO; exit 0; fi
    [ $saltados -gt 0 ] && echo "$(date +%d-%H:%M) $saltados capitulos esperan aceptacion de texto; reviso en 30 min" >> "$E"
  else
    echo "$(date +%d-%H:%M) sin cuota, espero 30 min" >> "$E"
  fi
  # 16-nov (copiloto): despertar antes si aparece un informe de aceptación nuevo (capítulo recién aprobado)
  t0=$(date +%s)
  while [ $(( $(date +%s) - t0 )) -lt 1800 ]; do
    sleep 60
    [ -n "$(find docs/audio-bloques/aceptacion -name '*.md' -newer "$E" 2>/dev/null | head -1)" ] && break
  done
done
