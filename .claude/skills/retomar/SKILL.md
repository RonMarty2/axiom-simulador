---
name: retomar
description: Retoma el trabajo de las animaciones de resolucion donde se dejo, sin que Ronald explique nada. Usar al abrir una sesion nueva o cuando Ronald diga "retomemos" o "donde estabamos".
---

# Retomar el proyecto (animaciones de resolucion)

Hace esto, en orden y sin preguntarle nada a Ronald hasta el final:

1. `git fetch origin main` y `git pull` (hay sesiones en paralelo). Si hay cambios sin subir, decirlo.
2. Leer en `BITACORA.md` la seccion **DONDE RETOMAR** mas reciente (la ultima del archivo) y `docs/lecciones-agentes.md` (las entradas del 17-oct).
3. Si `localhost:3001` no responde: `npm run dev` en segundo plano. No matar procesos por puerto (puede ser el servidor de Ronald).
4. Leer `data/observaciones-ronald.json` y buscar `atendida: false`:
   - **nota** → parafrasearla a Ronald en lenguaje simple y esperar su «si» ANTES de tocar nada. Despues: rehacer, `node src/app/prueba-animacion/revisar-pasos.ts agregar ...`, y marcar `atendida: true`.
   - **bien** → solo registrar; no hace falta preguntar.
5. Armar un `Monitor` que vigile ese archivo para enterarse de lo que Ronald pulse (expira a los 30 min; rearmar).
6. Contarle a Ronald, en 5 lineas simples: que esta aprobado, que tiene en su fila, que hay pendiente y las opciones de «siguiente» de la bitacora. Preguntar cual elige.

Reglas fijas de Ronald: hablarle simple y corto; confirmarle como entendi su observacion antes de cambiar; el panel `/prueba-animacion` y `/api/dev` son solo desarrollo (404 en produccion); las revisiones visuales las hago yo con `scripts/capturas.mjs`, a el solo le toca el visto bueno.
