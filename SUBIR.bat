@echo off
chcp 65001 >nul
cd /d "%~dp0"
title AXIOM - Subir contenido a GitHub
color 0A
echo ============================================================
echo    SUBIR AXIOM
echo    Manda a GitHub el contenido que agregaste en local
echo    (examenes nuevos del banco, etc).
echo ============================================================
echo.

echo [1/4] Trayendo lo ultimo de GitHub primero (para no pisar nada)...
git pull --rebase origin main
if errorlevel 1 goto error

echo [2/4] Juntando tus cambios de contenido...
git add data/examenes data/figuras-overrides.json
git diff --cached --quiet
if not errorlevel 1 (
  echo.
  echo No hay contenido nuevo para subir. Todo ya esta en GitHub.
  echo.
  pause
  exit /b 0
)

echo [3/4] Creando el commit...
git commit -m "contenido: examen agregado desde el admin local"
if errorlevel 1 goto error

echo [4/4] Subiendo a GitHub (rama main)...
git push origin main
if errorlevel 1 goto error

echo.
echo ============================================================
echo    LISTO! El contenido ya esta en GitHub.
echo    Ahora avisale a Claude que lo revise, dibuje las
echo    figuras y lo integre.
echo ============================================================
echo.
pause
exit /b 0

:error
echo.
echo ============================================================
echo    HUBO UN PROBLEMA. Sacale una foto a esta ventana
echo    y mandasela a Claude. Revisa que tengas internet.
echo ============================================================
echo.
pause
exit /b 1
