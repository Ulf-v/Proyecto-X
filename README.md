# Proyecto Web con Docker

Proyecto web completo con arquitectura de microservicios utilizando Docker, que incluye un frontend moderno, backend robusto y base de datos MySQL.

## 🏗️ Arquitectura

- **Frontend**: Node.js + JavaScript + Tailwind CSS (Puerto 3000)
- **Backend**: Spring Boot (Java 17) + REST API (Puerto 8081)
- **Base de Datos**: MySQL 8.0 (Puerto 3306)
- **Administrador BD**: Adminer (Puerto 8080)

## 📋 Requisitos Previos

- **Docker Desktop** instalado y en ejecución
  - Windows: [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - Mínimo 4GB RAM asignados a Docker
  - WSL2 habilitado (en Windows)

## 🚀 Instalación Rápida
hola
### 1. Clonar o descargar el proyecto

```bash
git clone [URL_DEL_REPOSITORIO]
cd Proyecto
```

### 2. Ejecutar el script de instalación

```cmd
install.bat
```

Este script verificará:
- ✅ Instalación de Docker
- ✅ Estado de ejecución de Docker
- ✅ Disponibilidad de Docker Compose
- ✅ Configuración de variables de entorno

### 3. Iniciar el proyecto

```cmd
start.bat
```

Este script:
- Construirá todas las imágenes Docker
- Iniciará todos los contenedores
- Verificará el estado de los servicios
- Mostrará las URLs de acceso

## 🌐 Acceso a los Servicios

Una vez iniciado el proyecto, los servicios estarán disponibles en:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:3000 | Interfaz web principal |
| **Backend API** | http://localhost:8081/api | API REST |
| **Adminer** | http://localhost:8080 | Administrador de base de datos |
| **MySQL** | localhost:3306 | Base de datos (acceso directo) |

### Credenciales de la Base de Datos

Para acceder a Adminer o conectarse directamente a MySQL:

- **Sistema**: MySQL
- **Servidor**: `mysql` (desde Docker) o `localhost` (desde host)
- **Usuario**: `root`
- **Contraseña**: `rootpassword`
- **Base de Datos**: `projectdb`

## 📁 Estructura del Proyecto

```
Proyecto/
├── frontend/              # Aplicación Node.js + Tailwind
│   ├── public/           # Archivos estáticos
│   │   ├── index.html    # Página principal
│   │   ├── js/
│   │   │   └── app.js    # Lógica del frontend
│   │   └── styles/       # Estilos Tailwind
│   ├── server.js         # Servidor Express
│   ├── package.json      # Dependencias Node.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── backend/              # Aplicación Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/com/proyecto/backend/
│   │       │   ├── BackendApplication.java
│   │       │   ├── controller/
│   │       │   │   └── UserController.java
│   │       │   ├── model/
│   │       │   │   └── User.java
│   │       │   ├── repository/
│   │       │   │   └── UserRepository.java
│   │       │   └── service/
│   │       │       └── UserService.java
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml           # Dependencias Maven
│   └── Dockerfile
│
├── database/             # Configuración de BD
│   └── init.sql         # Script de inicialización
│
├── docker-compose.yml   # Orquestación de servicios
├── install.bat          # Script de instalación
├── start.bat           # Script de inicio
└── README.md           # Este archivo
```

## 🔧 Comandos Útiles

### Gestión de Contenedores

```cmd
# Iniciar todos los servicios
docker compose up -d

# Ver logs de todos los servicios
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f backend

# Detener todos los servicios
docker compose down

# Detener y eliminar volúmenes (¡elimina datos de BD!)
docker compose down -v

# Reconstruir imágenes
docker compose build

# Reiniciar un servicio específico
docker compose restart frontend
```

### Estado de los Servicios

```cmd
# Ver contenedores en ejecución
docker compose ps

# Ver uso de recursos
docker stats
```

### Acceso a Contenedores

```cmd
# Acceder al shell del backend
docker exec -it proyecto-backend sh

# Acceder al shell del frontend
docker exec -it proyecto-frontend sh

# Acceder a MySQL
docker exec -it proyecto-mysql mysql -uroot -prootpassword projectdb
```

## 🎯 Funcionalidades Implementadas

### Frontend
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Gestión de usuarios (CRUD)
- ✅ Verificación de estado del backend
- ✅ Comunicación con API REST
- ✅ Diseño responsive

### Backend
- ✅ API REST completa
- ✅ Endpoints de usuarios (CRUD)
- ✅ Health check endpoint
- ✅ Integración con JPA/Hibernate
- ✅ CORS habilitado
- ✅ Validación de datos

### Base de Datos
- ✅ MySQL 8.0
- ✅ Inicialización automática con datos de ejemplo
- ✅ Persistencia de datos con volúmenes
- ✅ Adminer para gestión visual

## 📡 API Endpoints

### Health Check
```
GET /api/health
Response: { "status": "ok", "service": "backend" }
```

### Usuarios

**Obtener todos los usuarios**
```
GET /api/users
Response: [{ "id": 1, "name": "Juan", "email": "juan@example.com" }, ...]
```

**Obtener un usuario**
```
GET /api/users/{id}
Response: { "id": 1, "name": "Juan", "email": "juan@example.com" }
```

**Crear usuario**
```
POST /api/users
Body: { "name": "María", "email": "maria@example.com" }
Response: { "id": 2, "name": "María", "email": "maria@example.com" }
```

**Actualizar usuario**
```
PUT /api/users/{id}
Body: { "name": "María García", "email": "maria.garcia@example.com" }
Response: { "id": 2, "name": "María García", "email": "maria.garcia@example.com" }
```

**Eliminar usuario**
```
DELETE /api/users/{id}
Response: 204 No Content
```

## 🔍 Solución de Problemas

### Docker no inicia
1. Verifica que Docker Desktop esté instalado y actualizado
2. En Windows, asegúrate de tener WSL2 habilitado
3. Reinicia Docker Desktop

### Los servicios no responden
1. Espera 30-60 segundos después de iniciar (primera vez puede tardar más)
2. Verifica logs: `docker compose logs -f`
3. Verifica puertos no estén ocupados: `netstat -ano | findstr "3000 8080 8081 3306"`

### Error de conexión a la base de datos
1. Verifica que MySQL esté running: `docker ps`
2. Espera a que MySQL termine de inicializarse (check logs)
3. Reinicia el backend: `docker compose restart backend`

### Reconstruir todo desde cero
```cmd
docker compose down -v
docker compose up -d --build
```

## 🛠️ Desarrollo

### Modificar el Frontend
1. Edita archivos en `frontend/`
2. Reconstruye: `docker compose build frontend`
3. Reinicia: `docker compose restart frontend`

### Modificar el Backend
1. Edita archivos en `backend/src/`
2. Reconstruye: `docker compose build backend`
3. Reinicia: `docker compose restart backend`

### Modificar la Base de Datos
1. Edita `database/init.sql`
2. Elimina volumen: `docker compose down -v`
3. Reinicia: `docker compose up -d`

## 📝 Notas Adicionales

- Los datos de MySQL se persisten en un volumen Docker
- El backend espera a que MySQL esté listo antes de iniciar (healthcheck)
- El frontend se comunica con el backend a través de la red interna de Docker
- Adminer es extremadamente ligero (<10MB) y fácil de usar

## 🤝 Contribuciones

Para contribuir al proyecto:
1. Crea un fork del repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Envía un pull request

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 👥 Autor

Proyecto creado para demostración de arquitectura de microservicios con Docker.

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o consulta la documentación de Docker.
