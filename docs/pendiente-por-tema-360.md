# HECHO 16-nov: «Por tema» de Medicina medido a 360 (ver BITACORA.md). Lo de abajo queda como registro.

Pedido por copiloto-ee tras publicar el préstamo Ingeniería→Medicina (main 4a3b12c, bitácora af23a5a).
A 800 y 1280 se vio limpio; a 360 NO se midió (la ventana de Chrome no baja de ese ancho).

## Por qué no se hizo
Un control de agy bloqueó Bash, PowerShell y Grep («lecturas sin delegar»). No corresponde lanzar agy
para destrabarlo: levantar la app y manejar un navegador no lo hace agy (CLAUDE.md regla 7).

## Primer paso de la próxima sesión
1. Si hay servidor en 3001 de otra ventana, usarlo; si no, `npx next dev -p 3010` en la raíz del repo.
2. Correr el guion ya escrito: `C:\Users\lmigu\AppData\Local\Temp\claude\cf3c823a51e310ff\cd00860a-c496-4c6c-b60b-272dd5a7992f\scratchpad\por_tema_360.py`
   (Playwright, viewport 360x800, factor 3, `dev-login?rol=tester`, cambia a Medicina, mide desborde y alto de filas
   y devuelve la cuenta a Económicas). Si el scratchpad ya no existe, rehacerlo con esa descripción.
3. Mirar `por_tema_medicina_360.png` con Read; criterios del agente `auditor-pantallas-movil`: sin scroll horizontal, filas de 44 px o más.
4. Apagar el servidor y anotar el resultado en `BITACORA.md`.
