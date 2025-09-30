# Proyecto X

Este documento describe la configuración necesaria para montar el entorno de desarrollo del proyecto.  
El objetivo es que cualquier persona que se incorpore al equipo pueda levantar el entorno en su ordenador de forma rápida y consistente.

---

## Requisitos previos

- **Sistema operativo recomendado:** Linux (Ubuntu 22.04 LTS) o Windows 11 con WSL2.
- **Gestor de versiones:** [Git](https://git-scm.com/) v2.40 o superior.
- **Gestor de paquetes:**  
  - Node.js: [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/).  
  - Python: [pip](https://pip.pypa.io/) (si aplica).  

---

## Entorno de desarrollo

- **IDE recomendado:**  
  - [Visual Studio Code](https://code.visualstudio.com/) v1.92.0 o superior.  
    - Extensiones recomendadas:  
      - *ESLint*  
      - *Prettier - Code Formatter*  
      - *REST Client* (para pruebas rápidas de API)  
      - *Docker* (si se usan contenedores)

- **Servidor de aplicaciones:**  
  - [Spring Boot](https://spring.io/projects/spring-boot) v3.2.2  
  - Servidor embebido: Tomcat 10  

- **Lenguaje y frameworks:**  
  - Java 17 (OpenJDK)  
  - Spring Boot 3.2.x  
  - Maven 3.9+ como gestor de dependencias  

- **Frontend (si aplica):**  
  - Node.js v20  
  - Angular CLI 17 o React 18 (ajustar según corresponda)  

---

## Lanzadores de peticiones API

Para probar los endpoints:  
- **Opciones:**  
  - [Postman](https://www.postman.com/downloads/) v11  
  - Extensión *REST Client* en VS Code  
  - `curl` desde línea de comandos  

---

## Herramientas de soporte

- **Control de versiones:** Git + GitHub/GitLab/Bitbucket (según repositorio del grupo).  
- **Contenedores:** [Docker Desktop](https://www.docker.com/) v27 (si el proyecto incluye docker-compose).  
- **Base de datos:**  
  - PostgreSQL 15  
  - pgAdmin 4 para gestión visual (opcional)  

---

## Pasos de instalación

### 1. Clonar el repositorio:
   ```bash
   git clone https://github.com/organizacion/proyecto-x.git
   cd proyecto-x
   
docker-compose up -d

mvn clean install
mvn spring-boot:run

cd frontend
npm install
npm start

http://localhost:8080/api/health


proyecto-x/
├── backend/                  # Código del servidor (API REST)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/...      # Código fuente Java
│   │   │   └── resources/    # Configuración, properties, etc.
│   │   └── test/             # Tests unitarios e integración
│   ├── pom.xml               # Configuración de Maven
│   └── README.md             # Notas específicas del backend
│
├── frontend/                 # Aplicación web (Angular/React/Vue)
│   ├── src/                  # Código fuente del frontend
│   ├── package.json          # Dependencias npm/yarn
│   ├── public/               # Recursos estáticos
│   └── README.md             # Notas específicas del frontend
│
├── docs/                     # Documentación del proyecto
│   └── arquitectura.md
│
├── docker-compose.yml        # Orquestación de servicios (BD, backend, frontend)
├── .env.example              # Variables de entorno de ejemplo
├── .gitignore
└── README.md                 # Guía de instalación y configuración general
