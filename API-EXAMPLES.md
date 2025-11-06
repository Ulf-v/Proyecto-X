# Ejemplos de Uso de la API

Este archivo contiene ejemplos de cómo usar la API REST del backend.

## 🔍 Health Check

Verifica que el backend esté funcionando:

```bash
curl http://localhost:8081/api/health
```

**Respuesta:**
```json
{
  "status": "ok",
  "service": "backend"
}
```

---

## 👥 Gestión de Usuarios

### 1. Obtener todos los usuarios

```bash
curl http://localhost:8081/api/users
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@example.com"
  },
  {
    "id": 2,
    "name": "María García",
    "email": "maria.garcia@example.com"
  }
]
```

---

### 2. Obtener un usuario por ID

```bash
curl http://localhost:8081/api/users/1
```

**Respuesta:**
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
}
```

---

### 3. Crear un nuevo usuario

```bash
curl -X POST http://localhost:8081/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Ana López\",\"email\":\"ana.lopez@example.com\"}"
```

**Respuesta:**
```json
{
  "id": 4,
  "name": "Ana López",
  "email": "ana.lopez@example.com"
}
```

---

### 4. Actualizar un usuario

```bash
curl -X PUT http://localhost:8081/api/users/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Juan Pérez Actualizado\",\"email\":\"juan.nuevo@example.com\"}"
```

**Respuesta:**
```json
{
  "id": 1,
  "name": "Juan Pérez Actualizado",
  "email": "juan.nuevo@example.com"
}
```

---

### 5. Eliminar un usuario

```bash
curl -X DELETE http://localhost:8081/api/users/1
```

**Respuesta:**
```
204 No Content
```

---

## 🧪 Usando PowerShell (Windows)

### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/health" -Method GET
```

### Obtener todos los usuarios
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/users" -Method GET
```

### Crear un usuario
```powershell
$body = @{
    name = "Pedro Martínez"
    email = "pedro.martinez@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8081/api/users" -Method POST -Body $body -ContentType "application/json"
```

### Actualizar un usuario
```powershell
$body = @{
    name = "Pedro Martínez Actualizado"
    email = "pedro.nuevo@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8081/api/users/2" -Method PUT -Body $body -ContentType "application/json"
```

### Eliminar un usuario
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/users/2" -Method DELETE
```

---

## 🌐 Usando JavaScript (Fetch API)

### Obtener todos los usuarios
```javascript
fetch('http://localhost:8081/api/users')
  .then(response => response.json())
  .then(users => console.log(users))
  .catch(error => console.error('Error:', error));
```

### Crear un usuario
```javascript
fetch('http://localhost:8081/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com'
  })
})
  .then(response => response.json())
  .then(user => console.log('Usuario creado:', user))
  .catch(error => console.error('Error:', error));
```

### Actualizar un usuario
```javascript
fetch('http://localhost:8081/api/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Carlos Rodríguez Actualizado',
    email: 'carlos.nuevo@example.com'
  })
})
  .then(response => response.json())
  .then(user => console.log('Usuario actualizado:', user))
  .catch(error => console.error('Error:', error));
```

### Eliminar un usuario
```javascript
fetch('http://localhost:8081/api/users/1', {
  method: 'DELETE'
})
  .then(() => console.log('Usuario eliminado'))
  .catch(error => console.error('Error:', error));
```

---

## 📝 Notas Importantes

1. **CORS**: El backend tiene CORS habilitado para `*` (todos los orígenes) en desarrollo. En producción, deberías restringirlo.

2. **Validación**: Actualmente no hay validación extensa. Considera agregar validaciones para:
   - Email válido
   - Campos requeridos
   - Longitud máxima/mínima

3. **Errores**: Los códigos de estado HTTP estándar se usan:
   - 200: OK
   - 201: Created
   - 204: No Content
   - 404: Not Found
   - 500: Internal Server Error

4. **Idempotencia**:
   - GET, PUT, DELETE son idempotentes
   - POST no es idempotente (crear múltiples recursos)

---

## 🔧 Pruebas con Postman

Si prefieres una interfaz gráfica, importa esta colección en Postman:

**Base URL**: `http://localhost:8081/api`

**Colección:**
```json
{
  "info": {
    "name": "Proyecto API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/health"
      }
    },
    {
      "name": "Get All Users",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/users"
      }
    },
    {
      "name": "Get User by ID",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/users/1"
      }
    },
    {
      "name": "Create User",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/users",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Nuevo Usuario\",\n  \"email\": \"nuevo@example.com\"\n}"
        }
      }
    },
    {
      "name": "Update User",
      "request": {
        "method": "PUT",
        "url": "{{baseUrl}}/users/1",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Usuario Actualizado\",\n  \"email\": \"actualizado@example.com\"\n}"
        }
      }
    },
    {
      "name": "Delete User",
      "request": {
        "method": "DELETE",
        "url": "{{baseUrl}}/users/1"
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:8081/api"
    }
  ]
}
```

---

## ✅ Testing

Para probar la API completa:

1. Inicia el proyecto: `start.bat`
2. Espera 30-60 segundos
3. Ejecuta los comandos en orden
4. Verifica las respuestas

**Flujo de prueba completo:**

```powershell
# 1. Health check
Invoke-RestMethod -Uri "http://localhost:8081/api/health"

# 2. Ver usuarios iniciales
Invoke-RestMethod -Uri "http://localhost:8081/api/users"

# 3. Crear un nuevo usuario
$newUser = @{ name = "Test User"; email = "test@example.com" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8081/api/users" -Method POST -Body $newUser -ContentType "application/json"

# 4. Actualizar el usuario
$updateUser = @{ name = "Test User Updated"; email = "test.updated@example.com" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8081/api/users/4" -Method PUT -Body $updateUser -ContentType "application/json"

# 5. Ver usuario específico
Invoke-RestMethod -Uri "http://localhost:8081/api/users/4"

# 6. Eliminar usuario
Invoke-RestMethod -Uri "http://localhost:8081/api/users/4" -Method DELETE

# 7. Verificar eliminación
Invoke-RestMethod -Uri "http://localhost:8081/api/users"
```
