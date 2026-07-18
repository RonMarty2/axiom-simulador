@echo off
chcp 65001 >nul
cd /d "%~dp0"
title AXIOM - Iniciar proyecto local
color 0A
echo ============================================================
echo    INICIAR AXIOM
echo ============================================================
echo.
echo    Arrancando el servidor y abriendo el navegador solo...
echo    Se va a abrir en:  http://localhost:3001
echo.
echo    Para entrar sin Google: en /login busca el panel
echo    amarillo "Solo desarrollo local" y elegi un rol.
echo.
echo    NO cierres esta ventana mientras trabajas.
echo    Para apagar el servidor: apreta Ctrl + C aca.
echo ============================================================
echo.

REM Abrir el navegador solo, despues de 7 segundos (cuando el server ya arranco).
start "" cmd /c "timeout /t 7 >nul & start http://localhost:3001/login"

REM Arrancar el servidor (esto queda corriendo).
call npm run dev

echo.
echo El servidor se detuvo.
pause
