@echo off
chcp 65001 >nul
echo ============================================
echo    LOGS DE LOS SERVICIOS
echo ============================================
echo.
echo Mostrando logs en tiempo real...
echo Presiona Ctrl+C para salir
echo.

docker compose logs -f
