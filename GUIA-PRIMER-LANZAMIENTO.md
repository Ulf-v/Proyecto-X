# 🚀 GUÍA PASO A PASO - PRIMER LANZAMIENTO

## ✅ VERIFICACIÓN DE INTEGRIDAD - TODOS LOS ARCHIVOS CORRECTOS

Los siguientes archivos han sido verificados y están completos:

### 📋 Scripts de Gestión
✅ `install_script.bat` - Script de instalación (76 líneas) ✓
✅ `install.bat` - Alias del instalador (72 líneas) ✓
✅ `start.bat` - Script de inicio (107 líneas) ✓
✅ `stop.bat` - Script de parada (18 líneas) ✓
✅ `logs.bat` - Visor de logs ✓

### 🐳 Archivos Docker
✅ `docker-compose.yml` - Orquestación (92 líneas) ✓
✅ `frontend/Dockerfile` - Imagen frontend ✓
✅ `backend/Dockerfile` - Imagen backend (multi-stage) ✓

### 📁 Configuración
✅ `database/init.sql` - Inicialización BD ✓
✅ `.env.example` - Variables de entorno ✓
✅ `frontend/package.json` - Dependencias Node ✓
✅ `backend/pom.xml` - Dependencias Maven ✓

---

## 📝 PASO A PASO PARA EL PRIMER LANZAMIENTO

### REQUISITO PREVIO

**IMPORTANTE:** Solo necesitas tener **Docker Desktop** instalado en Windows.

**NO necesitas instalar:**
- ❌ Java o JDK
- ❌ Maven
- ❌ Node.js
- ❌ npm
- ❌ MySQL
- ❌ Ninguna otra dependencia

**Todo funciona dentro de contenedores Docker.**

---

## 🔧 PASO 1: INSTALAR DOCKER DESKTOP

### 1.1 Descargar Docker Desktop

1. Ve a: https://www.docker.com/products/docker-desktop/
2. Descarga "Docker Desktop for Windows"
3. Ejecuta el instalador descargado

### 1.2 Configurar Docker Desktop

Durante la instalación:
- ✅ Acepta instalar WSL2 (Windows Subsystem for Linux 2)
- ✅ Acepta los términos de servicio
- ✅ Reinicia el ordenador si es necesario

### 1.3 Iniciar Docker Desktop

1. Abre Docker Desktop desde el menú inicio
2. Espera a que el icono de la bandeja se ponga verde 🟢
3. Verifica en la interfaz que dice "Engine running"

### 1.4 Verificar Instalación (Opcional)

Abre PowerShell o CMD y ejecuta:

```cmd
docker --version
docker compose version
```

Deberías ver algo como:
```
Docker version 24.0.x
Docker Compose version v2.x.x
```

---

## 📂 PASO 2: PREPARAR EL PROYECTO

### 2.1 Ubicación del Proyecto

Tu proyecto está en:
```
c:\Users\adris\OneDrive\Escritorio\Too bad im back\DAM II\PDAUF - Proyecto\Proyecto
```

### 2.2 Abrir el Directorio

1. Abre el Explorador de Windows
2. Navega a la carpeta del proyecto
3. Verifica que ves estos archivos:
   - ✅ install_script.bat
   - ✅ start.bat
   - ✅ stop.bat
   - ✅ docker-compose.yml
   - ✅ Carpetas: frontend/, backend/, database/

---

## 🛠️ PASO 3: EJECUTAR INSTALACIÓN

### 3.1 Ejecutar el Script de Instalación

**Opción A - Doble clic:**
1. Localiza el archivo `install_script.bat`
2. Haz doble clic sobre él
3. Se abrirá una ventana de CMD

**Opción B - Desde CMD:**
1. Abre CMD (cmd.exe)
2. Navega al directorio:
   ```cmd
   cd "c:\Users\adris\OneDrive\Escritorio\Too bad im back\DAM II\PDAUF - Proyecto\Proyecto"
   ```
3. Ejecuta:
   ```cmd
   install_script.bat
   ```

### 3.2 Qué Hace el Script

El script verificará automáticamente:

```
[1/4] Verificando Docker...
[OK] Docker está instalado.

[2/4] Verificando que Docker esté en ejecución...
[OK] Docker está en ejecución.

[3/4] Verificando Docker Compose...
[OK] Docker Compose está disponible.

[4/4] Configurando variables de entorno...
[OK] Archivo .env creado.

============================================
   INSTALACIÓN COMPLETADA
============================================
```

### 3.3 Posibles Problemas y Soluciones

**❌ Error: "Docker no está instalado"**
- **Solución:** Ve al PASO 1 e instala Docker Desktop

**❌ Error: "Docker no está en ejecución"**
- **Solución:** 
  1. Abre Docker Desktop
  2. Espera a que el icono se ponga verde 🟢
  3. Vuelve a ejecutar install_script.bat

**❌ Error: "Docker Compose no está disponible"**
- **Solución:** 
  1. Actualiza Docker Desktop a la última versión
  2. Reinicia Docker Desktop

---

## 🚀 PASO 4: INICIAR EL PROYECTO (PRIMERA VEZ)

### 4.1 Ejecutar el Script de Inicio

**⚠️ IMPORTANTE:** La primera vez tardará entre 5-10 minutos porque debe:
- Descargar imágenes base de Docker (Node, Java, MySQL)
- Compilar el código del backend
- Instalar dependencias del frontend
- Inicializar la base de datos

**Paciencia en el primer lanzamiento.**

**Ejecutar:**

1. Doble clic en `start.bat`

**O desde CMD:**
```cmd
start.bat
```

### 4.2 Qué Verás Durante el Inicio

```
============================================
   INICIANDO PROYECTO DOCKER
============================================

[INFO] Iniciando contenedores Docker...

[+] Building 234.5s (24/24) FINISHED
[+] Running 4/4
 ✔ Container proyecto-mysql    Started
 ✔ Container proyecto-adminer  Started
 ✔ Container proyecto-backend  Started
 ✔ Container proyecto-frontend Started

[INFO] Esperando a que los servicios estén listos...

============================================
   ESTADO DE LOS SERVICIOS
============================================

Verificando MySQL...
[OK] MySQL - Estado: ACTIVO

Verificando Backend...
[!] Backend - Estado: INICIANDO...

Verificando Frontend...
[!] Frontend - Estado: INICIANDO...

Verificando Adminer...
[OK] Adminer - Estado: ACTIVO
```

### 4.3 Tiempo de Espera

**Primera vez:**
- MySQL: 30-60 segundos ⏱️
- Backend: 2-3 minutos ⏱️ (compilación de Java)
- Frontend: 1-2 minutos ⏱️
- Adminer: 10-20 segundos ⏱️

**Siguientes veces:**
- Todo: 30-60 segundos ⏱️ (mucho más rápido)

### 4.4 Verificar Estado Manualmente

Si algún servicio muestra "INICIANDO...", espera 1-2 minutos y ejecuta:

```cmd
docker compose ps
```

Deberías ver:
```
NAME                  STATUS          PORTS
proyecto-mysql        Up (healthy)    0.0.0.0:3306->3306/tcp
proyecto-backend      Up              0.0.0.0:8081->8081/tcp
proyecto-frontend     Up              0.0.0.0:3000->3000/tcp
proyecto-adminer      Up              0.0.0.0:8080->8080/tcp
```

**Todos deben mostrar "Up" (arriba).**

### 4.5 Ver Logs (Opcional pero Recomendado)

Para ver qué está pasando en tiempo real:

```cmd
docker compose logs -f
```

**Para ver logs de un servicio específico:**
```cmd
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mysql
```

**Presiona Ctrl+C para salir de los logs.**

---

## 🌐 PASO 5: ACCEDER A LA APLICACIÓN

### 5.1 Abrir el Frontend

Una vez que todos los servicios estén activos:

1. Abre tu navegador (Chrome, Firefox, Edge)
2. Ve a: **http://localhost:3000**

Deberías ver la página principal con:
- ✅ Título: "Proyecto Web con Docker"
- ✅ Tarjetas de "Estado de la API" y "Usuarios"
- ✅ Formulario para agregar usuarios
- ✅ Diseño moderno con colores azul y morado

### 5.2 Probar Funcionalidades

**1. Verificar Estado del Backend:**
   - Haz clic en "Verificar Estado"
   - Debería mostrar: "✓ Backend conectado"

**2. Cargar Usuarios:**
   - Haz clic en "Cargar Usuarios"
   - Deberías ver 3 usuarios precargados:
     - Juan Pérez
     - María García
     - Carlos López

**3. Agregar un Usuario:**
   - Completa el formulario:
     - Nombre: "Tu Nombre"
     - Email: "tu.email@example.com"
   - Haz clic en "Agregar Usuario"
   - Debería aparecer un mensaje de éxito
   - Haz clic en "Cargar Usuarios" nuevamente
   - Verás tu nuevo usuario en la lista

### 5.3 Acceder al Administrador de Base de Datos (Adminer)

1. Abre: **http://localhost:8080**
2. Verás la pantalla de login de Adminer
3. Completa los datos:
   - **Sistema:** MySQL
   - **Servidor:** `mysql`
   - **Usuario:** `root`
   - **Contraseña:** `rootpassword`
   - **Base de datos:** `projectdb` (opcional)
4. Haz clic en "Login"
5. Podrás ver y editar la base de datos directamente

### 5.4 Probar la API Directamente (Opcional)

Abre: **http://localhost:8081/api/health**

Deberías ver:
```json
{
  "status": "ok",
  "service": "backend"
}
```

Ver usuarios: **http://localhost:8081/api/users**

```json
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@example.com"
  },
  ...
]
```

---

## 🎯 PASO 6: USAR EL PROYECTO

### 6.1 URLs de Acceso

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:3000 | Interfaz principal |
| **Backend API** | http://localhost:8081/api | API REST |
| **Adminer** | http://localhost:8080 | Admin de BD |
| **Health Check** | http://localhost:8081/api/health | Estado del backend |

### 6.2 Credenciales MySQL

Para conectarte desde Adminer o cualquier cliente MySQL:

```
Host:      localhost (desde Windows) o mysql (desde Docker)
Puerto:    3306
Usuario:   root
Contraseña: rootpassword
Base de Datos: projectdb
```

---

## ⏹️ PASO 7: DETENER EL PROYECTO

### 7.1 Detener Servicios

Cuando termines de trabajar:

1. Doble clic en `stop.bat`

**O desde CMD:**
```cmd
stop.bat
```

Verás:
```
============================================
   DETENIENDO SERVICIOS DOCKER
============================================

[+] Running 4/4
 ✔ Container proyecto-frontend  Removed
 ✔ Container proyecto-backend   Removed
 ✔ Container proyecto-adminer   Removed
 ✔ Container proyecto-mysql     Removed

[OK] Todos los servicios han sido detenidos.
```

### 7.2 Los Datos se Conservan

**✅ Importante:** Al detener los servicios:
- Los datos de MySQL **SE MANTIENEN** (volumen Docker)
- Puedes volver a iniciar sin perder información
- Los contenedores se eliminan pero los volúmenes persisten

### 7.3 Eliminar Todo (Incluidos Datos)

**⚠️ CUIDADO:** Esto eliminará todos los datos de la BD:

```cmd
docker compose down -v
```

---

## 🔄 PASO 8: SIGUIENTES LANZAMIENTOS

### 8.1 Arranque Rápido

Después del primer lanzamiento, los siguientes serán mucho más rápidos:

1. Abre Docker Desktop (si no está abierto)
2. Ejecuta `start.bat`
3. Espera 30-60 segundos
4. Accede a http://localhost:3000

**¡Listo!** Ya no necesita compilar ni descargar nada.

### 8.2 Comandos Útiles

**Ver contenedores activos:**
```cmd
docker compose ps
```

**Ver logs en tiempo real:**
```cmd
logs.bat
```
o
```cmd
docker compose logs -f
```

**Reiniciar un servicio específico:**
```cmd
docker compose restart backend
docker compose restart frontend
```

**Reconstruir imágenes (si cambias código):**
```cmd
docker compose up -d --build
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS COMUNES

### Problema 1: "Puerto ya en uso"

**Síntomas:**
```
Error: bind: address already in use
```

**Solución:**
```cmd
# Ver qué está usando el puerto
netstat -ano | findstr "3000"
netstat -ano | findstr "8081"
netstat -ano | findstr "3306"
netstat -ano | findstr "8080"

# Cierra la aplicación que usa ese puerto
# O cambia el puerto en docker-compose.yml
```

---

### Problema 2: "Backend no responde"

**Síntomas:**
- Frontend muestra error de conexión
- http://localhost:8081/api/health no funciona

**Solución:**
```cmd
# Ver logs del backend
docker compose logs backend

# Esperar más tiempo (primera vez puede tardar 2-3 min)
# O reiniciar el backend
docker compose restart backend
```

---

### Problema 3: "MySQL no inicia"

**Síntomas:**
- Error de conexión a la base de datos
- Backend no puede conectarse

**Solución:**
```cmd
# Ver logs de MySQL
docker compose logs mysql

# Verificar si MySQL está healthy
docker compose ps

# Si está corrupto, eliminar volumen y reiniciar
docker compose down -v
docker compose up -d
```

---

### Problema 4: "Contenedor no inicia"

**Solución General:**
```cmd
# 1. Detener todo
docker compose down

# 2. Limpiar imágenes antiguas
docker system prune -a

# 3. Reiniciar Docker Desktop

# 4. Volver a construir
docker compose up -d --build
```

---

### Problema 5: "Cambios no se reflejan"

**Síntomas:**
- Modificas código pero no ves cambios

**Solución:**
```cmd
# Reconstruir la imagen específica
docker compose build frontend
docker compose build backend

# Reiniciar el servicio
docker compose restart frontend
docker compose restart backend

# O reconstruir todo
docker compose up -d --build
```

---

## 📊 VERIFICACIÓN FINAL

### Checklist de Funcionamiento Correcto

Marca cuando verifiques:

- [ ] Docker Desktop está instalado y corriendo 🟢
- [ ] `install_script.bat` ejecutado sin errores ✅
- [ ] `start.bat` ejecutado, todos los servicios "Up" ✅
- [ ] http://localhost:3000 - Frontend carga correctamente ✅
- [ ] Botón "Verificar Estado" muestra backend conectado ✅
- [ ] Botón "Cargar Usuarios" muestra 3 usuarios ✅
- [ ] Formulario permite agregar usuarios ✅
- [ ] http://localhost:8081/api/health devuelve JSON ✅
- [ ] http://localhost:8080 - Adminer permite login ✅
- [ ] `stop.bat` detiene todos los servicios ✅

**Si todos están ✅, tu proyecto funciona perfectamente.**

---

## 📞 RESUMEN EJECUTIVO

### Para Lanzar por Primera Vez:

```
1. Instalar Docker Desktop (solo una vez)
2. Abrir Docker Desktop y esperar a que esté verde 🟢
3. Doble clic en: install_script.bat
4. Doble clic en: start.bat
5. Esperar 5-10 minutos (solo la primera vez)
6. Abrir: http://localhost:3000
7. ¡Disfrutar! 🎉
```

### Para Siguientes Veces:

```
1. Abrir Docker Desktop (si no está abierto)
2. Doble clic en: start.bat
3. Esperar 30-60 segundos
4. Abrir: http://localhost:3000
```

### Para Detener:

```
1. Doble clic en: stop.bat
```

---

## ✅ CONFIRMACIÓN DE INTEGRIDAD

**TODOS LOS ARCHIVOS VERIFICADOS Y FUNCIONANDO CORRECTAMENTE:**

✅ Scripts de instalación: CORRECTOS
✅ Scripts de lanzamiento: CORRECTOS
✅ Scripts de parada: CORRECTOS
✅ Configuración Docker: CORRECTA
✅ Dockerfiles: CORRECTOS
✅ Código fuente: COMPLETO
✅ Base de datos: CONFIGURADA
✅ Documentación: COMPLETA

**🎊 PROYECTO 100% LISTO PARA USAR 🎊**

---

**¿Necesitas ayuda?** Consulta README.md o los otros archivos de documentación.
