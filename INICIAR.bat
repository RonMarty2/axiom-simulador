@echo off
chcp 65001 >nul
cd /d "%~dp0"
title AXIOM - Iniciar proyecto local
color 0A
echo ============================================================
echo    INICIAR AXIOM
echo ============================================================
echo.
echo    Esperando a que arranque el servidor...
echo    Cuando veas la palabra "Ready", abri el navegador en:
echo.
echo        http://localhost:3001
echo.
echo    Para entrar sin Google: en /login busca el panel
echo    amarillo "Solo desarrollo local" y elegi un rol.
echo.
echo    NO cierres esta ventana mientras trabajas.
echo    Para apagar el servidor: apreta Ctrl + C aca.
echo ============================================================
echo.

call npm run dev

echo.
echo El servidor se detuvo.
pause
