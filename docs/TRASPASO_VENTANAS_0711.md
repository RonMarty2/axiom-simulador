# TRASPASO 07-11-2026 (orden de Ronald): quedan DOS ventanas de Axiom — VISUAL (a048d1ce) y MOTOR (96948371)
Las ventanas de lecciones (24048eb7) y Economicas (ff70b46e) entregan aqui y cierran. NO olvidar nada: MOTOR retoma lo de abajo.

## De lecciones (24048eb7) -> MOTOR
- 8 textos nuevos de «lagunas» aplicados por agy en 6 lecciones de `src/app/aprende/`: gases-ideales, trabajo-energia, ecuaciones-segundo-grado, logaritmacion, razones-trigonometricas, electrostatica. Sus cambios estan MEZCLADOS con los de colores (VISUAL) en esos mismos page.tsx.
- Revisado con `auditor-pedagogico` (6 mejoras aplicadas; cuentas OK: 22,4 L y 0,82 m). Controles corridos por la ventana: lint 0 errores/17 avisos, tsc limpio, 614/614 tests.
- Pedidos: `docs/pedido-agy-lagunas-tandas-1-2.md`, `docs/pedido-agy-controles-lagunas.md`. Fila en `docs/COLA_TABLET.md` (pendiente verlos en tablet 800x1340 y 360x740).
- Aprendido con agy: en modo auditoria agy NO puede ejecutar comandos (responde «NO SE»): los controles los corre Claude. El subagente `verificador` no existe en Axiom: cubrirlo con tsc + lint + tests.

## De Economicas (ff70b46e) -> MOTOR
- 9 transcripciones literales en `examenes pasados/borradores_economicas/`. Resueltos a ciegas: 2 de 9 (2025-II-1op y 2025-I-1op, este con 19 de 30 preguntas resueltas y el resto pendiente). Sin revisar ni copiar a `data/`.
- Faltan por lanzar, DE A UNO (60-75 s entre cada uno; nunca varios: el PC se quedo sin memoria): 2025-II-2op, 2026-I-1op, 2026-I-2op, 2026-II-1op, 2026-II-2op, y los buenos 2024-II-2op, 2025-I-3op aun por revisar (ver `relevos\punto_economicas_0711.md` del taller).
- Revisar los `.banco.md` con `resolutor-exacto` y `auditor-facsimil`; copiar con `aplicar.py`; `npm test`. Registro: `docs/economicas-desde-fotos-2026-11-07.md`.

## De Ingenieria (MOTOR, ya suyo)
- Lote 4 de la opcion B terminado, SIN revisar ni aplicar: `%LOCALAPPDATA%\axiom-agy\20261107-075503_auditoria`. Revisarlo contra el pedido del lote 4 con evidencia propia.

## Reglas vigentes
Nada se sube a main sin que Ronald lo vea en la tablet (cola `docs/COLA_TABLET.md`); toda tarea a agy cita su agente y agy solo ejecuta; el taller es el orquestador (`_AGENTES_CENTRAL\ORQUESTA_AXIOM.md`).
