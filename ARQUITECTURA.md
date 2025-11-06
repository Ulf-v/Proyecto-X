# Arquitectura del Proyecto

## 📊 Diagrama de Servicios

```
┌─────────────────────────────────────────────────────────────┐
│                         USUARIO                              │
│                      (Navegador Web)                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP (Puerto 3000)
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                      FRONTEND                                │
│                 Node.js + Express                            │
│              JavaScript + Tailwind CSS                       │
│                    Puerto: 3000                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP API (Puerto 8081)
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                      BACKEND                                 │
│                    Spring Boot                               │
│                  REST API + JPA                              │
│                    Puerto: 8081                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ JDBC (Puerto 3306)
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  BASE DE DATOS                               │
│                     MySQL 8.0                                │
│                    Puerto: 3306                              │
│              Volumen: mysql_data                             │
└──────────────────────────────────────────────────────────────┘
                      ▲
                      │
                      │ HTTP (Puerto 8080)
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                     ADMINER                                  │
│              Administrador Web de BD                         │
│                    Puerto: 8080                              │
└──────────────────────────────────────────────────────────────┘
```

## 🔧 Tecnologías por Capa

### Frontend
- **Runtime**: Node.js 18 Alpine
- **Framework Web**: Express.js
- **UI**: Vanilla JavaScript + HTML5
- **Estilos**: Tailwind CSS (vía CDN)
- **Puerto**: 3000

### Backend
- **Lenguaje**: Java 17
- **Framework**: Spring Boot 3.2
- **ORM**: Spring Data JPA + Hibernate
- **Gestión Dependencias**: Maven
- **Puerto**: 8081

### Base de Datos
- **Motor**: MySQL 8.0
- **Admin**: Adminer (ligero, < 500KB)
- **Persistencia**: Volumen Docker
- **Puerto**: 3306 (MySQL), 8080 (Adminer)

## 🌐 Red Docker

Todos los servicios están conectados a la red: `proyecto-network`

**Comunicación interna:**
- Frontend → Backend: `http://backend:8081`
- Backend → MySQL: `jdbc:mysql://mysql:3306/projectdb`
- Adminer → MySQL: `mysql:3306`

**Comunicación externa (desde host):**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8081`
- Adminer: `http://localhost:8080`
- MySQL: `localhost:3306`

## 📦 Volúmenes

- `mysql_data`: Persistencia de datos de MySQL
  - Se mantiene entre reinicios de contenedores
  - Solo se elimina con `docker compose down -v`

## 🔄 Flujo de Datos (Ejemplo: Crear Usuario)

1. **Usuario** → Completa formulario en Frontend (http://localhost:3000)
2. **Frontend** → Envía POST a `http://localhost:8081/api/users`
3. **Backend** → Recibe petición en `UserController`
4. **Backend** → `UserService` procesa la lógica
5. **Backend** → `UserRepository` (JPA) guarda en BD
6. **MySQL** → Almacena el registro
7. **Backend** → Devuelve respuesta JSON al Frontend
8. **Frontend** → Muestra confirmación al usuario

## 🛡️ Health Checks

Cada servicio implementa health checks para monitoreo:

```yaml
MySQL:
  test: mysqladmin ping
  interval: 10s
  timeout: 5s
  retries: 5

Backend:
  test: curl http://localhost:8081/api/health
  interval: 30s
  timeout: 10s
  retries: 5

Frontend:
  test: curl http://localhost:3000/health
  interval: 30s
  timeout: 10s
  retries: 5
```

## 🚀 Orden de Inicialización

1. **MySQL** inicia primero
2. **Adminer** espera a MySQL
3. **Backend** espera a que MySQL esté saludable (health check)
4. **Frontend** espera a que Backend esté disponible

## 📊 Endpoints de la API

### Health Check
- `GET /api/health` → Estado del servicio

### Usuarios (CRUD)
- `GET /api/users` → Listar todos
- `GET /api/users/{id}` → Obtener uno
- `POST /api/users` → Crear nuevo
- `PUT /api/users/{id}` → Actualizar
- `DELETE /api/users/{id}` → Eliminar

## 🔐 Configuración de Seguridad

**Producción Recomendada:**
- Cambiar contraseñas de MySQL
- Implementar autenticación JWT
- Configurar HTTPS/SSL
- Agregar rate limiting
- Validar inputs del usuario
- Configurar CORS apropiadamente

## 📈 Escalabilidad Futura

Para escalar el proyecto:

1. **Horizontal**: Múltiples instancias con load balancer
2. **Vertical**: Aumentar recursos en docker-compose.yml
3. **Cache**: Agregar Redis para sesiones
4. **CDN**: Para assets estáticos del frontend
5. **Microservicios**: Separar backend en servicios especializados
