#!/bin/bash
# Vigilante (regla 16 de libro-audio-tts): prueba la cuota cada 30 min y relanza la grabación --textos
# capítulo por capítulo; si un capítulo vuelve a cortarse por cuota, espera y reintenta. Termina cuando
# todos los capítulos pasan sin error. Estado en docs/audio-bloques/vigilante_estado.txt.
cd "$(dirname "$0")/../.."
M="examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO"; E=docs/audio-bloques/vigilante_estado.txt
export PYTHONIOENCODING=utf-8
while true; do
  if python docs/audio-bloques/probar_cuota_tts.py "$M" > /dev/null 2>&1; then
    echo "$(date +%d-%H:%M) cuota OK, grabando" >> "$E"; corte=0
    for p in docs/audio-bloques/plan/*.json; do
      b=$(basename "$p"); t=docs/audio-bloques/reextraido/$b; [ -f "$t" ] || continue
      out=$(python docs/audio-bloques/sintetizar_desde_plan.py "$M" "$p" --textos "$t" 2>&1 | grep "Resumen\|Error\|ALTO")
      echo "$out" | sed "s/^/$(date +%d-%H:%M) /" >> "$E"
      if echo "$out" | grep -q "Error"; then corte=1; break; fi
    done
    if [ $corte = 0 ]; then echo "$(date +%d-%H:%M) TERMINADO" >> "$E"; echo TERMINADO; exit 0; fi
  else
    echo "$(date +%d-%H:%M) sin cuota, espero 30 min" >> "$E"
  fi
  sleep 1800
done
