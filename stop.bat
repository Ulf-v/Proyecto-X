@echo off
chcp 65001 >nul
echo ============================================
echo    DETENIENDO SERVICIOS DOCKER
echo ============================================
echo.

docker compose down

echo.
echo [OK] Todos los servicios han sido detenidos.
echo.
echo Para eliminar también los datos (volúmenes):
echo docker compose down -v
echo.
pause
