#!/bin/bash
# Vigilante (regla 16 de libro-audio-tts): prueba la cuota cada 30 min y relanza la grabación --textos
# capítulo por capítulo; si un capítulo vuelve a cortarse por cuota, espera y reintenta. Termina cuando
# todos los capítulos pasan sin error. Estado en docs/audio-bloques/vigilante_estado.txt.
cd "$(dirname "$0")/../.."
M="examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO"; E=docs/audio-bloques/vigilante_estado.txt
export PYTHONIOENCODING=utf-8
while true; do
  if python docs/audio-bloques/probar_cuota_tts.py "$M" > /dev/null 2>&1; then
    echo "$(date +%d-%H:%M) cuota OK, grabando" >> "$E"; corte=0; saltados=0
    for p in docs/audio-bloques/plan/*.json; do
      b=$(basename "$p"); t=docs/audio-bloques/reextraido/$b; [ -f "$t" ] || continue
      # Filtro 16-nov: solo se graba lo que pasó las revisiones de texto 1 a 8 (informe en aceptacion/)
      python docs/audio-bloques/capitulo_aceptado.py "${b%.json}" || { saltados=$((saltados+1)); continue; }
      out=$(python docs/audio-bloques/sintetizar_desde_plan.py "$M" "$p" --textos "$t" 2>&1 | grep "Resumen\|Error\|ALTO")
      echo "$out" | sed "s/^/$(date +%d-%H:%M) /" >> "$E"
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
