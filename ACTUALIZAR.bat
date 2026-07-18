@echo off
chcp 65001 >nul
cd /d "%~dp0"
title AXIOM - Actualizar desde GitHub
color 0B
echo ============================================================
echo    ACTUALIZAR AXIOM
echo    Trae lo ultimo que subimos a GitHub.
echo ============================================================
echo.

echo [1/4] Cancelando cualquier operacion a medias...
git merge --abort >nul 2>&1
git rebase --abort >nul 2>&1

echo [2/4] Descargando la ultima version de GitHub (rama main)...
git fetch origin main
if errorlevel 1 goto error

echo [3/4] Aplicando los cambios...
git checkout main >nul 2>&1
git reset --hard origin/main
if errorlevel 1 goto error

echo [4/4] Instalando dependencias nuevas (si hay)...
call npm install

echo.
echo ============================================================
echo    LISTO! Ya tenes la ultima version.
echo    Ahora hace doble clic en INICIAR para verla.
echo ============================================================
echo.
pause
exit /b 0

:error
echo.
echo ============================================================
echo    HUBO UN PROBLEMA. Sacale una foto a esta ventana
echo    y mandamela. Revisa que tengas internet.
echo ============================================================
echo.
pause
exit /b 1
