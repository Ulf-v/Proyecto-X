@echo off
chcp 65001 >nul
echo ============================================
echo    INICIANDO PROYECTO DOCKER
echo ============================================
echo.

:: Verificar que Docker está en ejecución
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker no está en ejecución.
    echo Por favor, inicia Docker Desktop y vuelve a ejecutar este script.
    pause
    exit /b 1
)

echo [INFO] Iniciando contenedores Docker...
echo.
docker compose up -d --build

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Error al iniciar los contenedores.
    pause
    exit /b 1
)

echo.
echo [INFO] Esperando a que los servicios estén listos...
timeout /t 10 /nobreak >nul

:: Verificar estado de los servicios
echo.
echo ============================================
echo    ESTADO DE LOS SERVICIOS
echo ============================================
echo.

:: Verificar MySQL
echo Verificando MySQL...
docker exec proyecto-mysql mysqladmin ping -h localhost -uroot -prootpassword >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MySQL - Estado: ACTIVO
) else (
    echo [!] MySQL - Estado: INICIANDO...
)

:: Verificar Backend
echo Verificando Backend...
curl -s http://localhost:8081/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend - Estado: ACTIVO
) else (
    echo [!] Backend - Estado: INICIANDO...
)

:: Verificar Frontend
echo Verificando Frontend...
curl -s http://localhost:3000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend - Estado: ACTIVO
) else (
    echo [!] Frontend - Estado: INICIANDO...
)

:: Verificar Adminer
echo Verificando Adminer...
curl -s http://localhost:8080 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Adminer - Estado: ACTIVO
) else (
    echo [!] Adminer - Estado: INICIANDO...
)

echo.
echo ============================================
echo    INFORMACIÓN DE ACCESO
echo ============================================
echo.
echo Frontend:         http://localhost:3000
echo Backend API:      http://localhost:8081/api
echo Adminer (DB):     http://localhost:8080
echo.
echo Credenciales de la Base de Datos:
echo   Sistema:      MySQL
echo   Servidor:     mysql
echo   Usuario:      root
echo   Contraseña:   rootpassword
echo   Base de Datos: projectdb
echo.
echo ============================================
echo.
echo [INFO] Si algún servicio muestra "INICIANDO...",
echo        espera unos segundos y verifica manualmente.
echo.
echo Para detener los servicios: docker compose down
echo Para ver logs: docker compose logs -f [servicio]
echo.

:: Preguntar si abrir el navegador
set /p OPEN_BROWSER="¿Deseas abrir el frontend en el navegador? (S/N): "
if /i "%OPEN_BROWSER%"=="S" (
    start http://localhost:3000
)

pause
