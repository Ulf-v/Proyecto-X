# GUÍA DE INICIO RÁPIDO

## 🚀 Pasos para iniciar el proyecto

### 1️⃣ Ejecuta install.bat
```
Doble clic en: install.bat
```
✅ Verifica que Docker esté instalado y funcionando

### 2️⃣ Ejecuta start.bat
```
Doble clic en: start.bat
```
✅ Inicia todos los servicios en Docker

### 3️⃣ Abre tu navegador
```
http://localhost:3000
```

## 📋 URLs Importantes

| Servicio | URL |
|----------|-----|
| 🌐 Frontend | http://localhost:3000 |
| 🔌 Backend API | http://localhost:8081/api |
| 💾 Admin BD (Adminer) | http://localhost:8080 |

## 🔑 Credenciales Base de Datos

- **Usuario**: root
- **Contraseña**: rootpassword
- **Base de Datos**: projectdb

## 🛠️ Scripts Disponibles

- `install.bat` - Verifica dependencias
- `start.bat` - Inicia el proyecto
- `stop.bat` - Detiene el proyecto
- `logs.bat` - Muestra logs en tiempo real

## ❓ Problemas?

1. Asegúrate que Docker Desktop esté ejecutándose
2. Espera 30-60 segundos después de iniciar
3. Revisa los logs: `logs.bat`
4. Lee el README.md completo para más información

## 📁 Estructura

```
Proyecto/
├── frontend/     → Node.js + Tailwind
├── backend/      → Spring Boot (Java)
├── database/     → Scripts SQL
└── *.bat         → Scripts de gestión
```

¡Todo listo! 🎉
