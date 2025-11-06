@echo off
chcp 65001 > nul
echo ============================================
echo    SCRIPT DE INSTALACION DEL PROYECTO
echo ============================================
echo.

rem Verificar si Docker esta instalado
echo [1/4] Verificando Docker...
docker --version >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Docker no esta instalado.
    echo.
    echo Por favor, instala Docker Desktop desde:
    echo https://www.docker.com/products/docker-desktop/
    echo.
    pause
    exit /b 1
)
echo [OK] Docker esta instalado.
echo.

rem Verificar si Docker esta en ejecucion
echo [2/4] Verificando que Docker este en ejecucion...
docker ps >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Docker no esta en ejecucion.
    echo.
    echo Por favor, inicia Docker Desktop y vuelve a ejecutar este script.
    pause
    exit /b 1
)
echo [OK] Docker esta en ejecucion.
echo.

rem Verificar Docker Compose
echo [3/4] Verificando Docker Compose...
docker compose version >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Docker Compose no esta disponible.
    echo Por favor, actualiza Docker Desktop a la ultima version.
    pause
    exit /b 1
)
echo [OK] Docker Compose esta disponible.
echo.

rem Crear archivo .env si no existe
echo [4/4] Configurando variables de entorno...
if not exist .env (
    echo # Configuracion del proyecto > .env
    echo MYSQL_ROOT_PASSWORD=rootpassword >> .env
    echo MYSQL_DATABASE=projectdb >> .env
    echo BACKEND_PORT=8081 >> .env
    echo FRONTEND_PORT=3000 >> .env
    echo ADMINER_PORT=8080 >> .env
    echo [OK] Archivo .env creado.
) else (
    echo [OK] Archivo .env ya existe.
)
echo.

echo ============================================
echo    INSTALACION COMPLETADA
echo ============================================
echo.
echo Todas las dependencias estan instaladas.
echo.
echo Para iniciar el proyecto, ejecuta: start.bat
echo.
pause