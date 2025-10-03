# Guía de configuración del entorno de desarrollo

Esta guía está pensada para cualquier persona que se incorpore al proyecto y necesite configurar su entorno de desarrollo desde cero. Aquí encontrarás las herramientas, versiones recomendadas y recursos que estamos utilizando en el grupo para trabajar de forma coherente y sincronizada.

---

## 1. IDE: Visual Studio Code

El editor de código que estamos utilizando en el proyecto es **Visual Studio Code (VS Code)**. Es ligero, multiplataforma y muy compatible con el desarrollo en Python.

### Extensiones recomendadas
Una vez instalado VS Code, se recomienda añadir las siguientes extensiones:

- **Python (oficial de Microsoft)**: facilita la ejecución y depuración de código en Python.
- **Pylance**: para autocompletado inteligente y chequeo de tipos.
- **Copilot**: Integración de Copilot en Visual Studio.

---

## 2. Lenguaje y Framework

### Python

Trabajamos con versiones recientes de Python, por compatibilidad con las últimas versiones de Django y sus dependencias. La version que se están usando actualmente en el equipo es:

- **Python 3.13.7**

### Django

El framework que utilizamos para el desarrollo web del proyecto es **Django**. Se instala fácilmente mediante `pip` una vez que Python esté configurado.

Además, es recomendable crear un **entorno virtual** (`venv`) para cada proyecto, lo que permite aislar las dependencias y mantener limpio el entorno global del sistema.

---

## 3. Instalación rápida de herramientas con Ninite

Para simplificar la instalación de varias herramientas necesarias, utilizamos [Ninite](https://ninite.com), una página que permite seleccionar varios programas y descargar un único instalador para todos ellos.

Las herramientas que recomendamos instalar desde Ninite son:

- **Visual Studio Code**
- **Python 3**
- **Git** (opcional, dependiendo del flujo de trabajo)
- **Discord** (nuestro entorno de comunicación colaborativo)

---

## 4. Herramientas y recursos de soporte

Durante el desarrollo usamos algunas herramientas adicionales que ayudan a mejorar la productividad y la colaboración:

- **GitHub**: repositorio del proyecto, gestión de versiones, issues y revisiones de código.
- **Git**: cliente de control de versiones (si no se trabaja exclusivamente desde GitHub Desktop).
- **GitHub Copilot**: asistente de codificación con IA que se integra en VS Code.
- **ChatGPT**: para consultas, generación de ideas o ayuda puntual en la programación.
- **Discord**: canal de comunicación principal del equipo.

---

## 5. Configuración inicial del proyecto

Una vez que tengas Python y PiP instalados, puedes proceder con la instalación de Django y la creación del entorno virtual del proyecto.

Desde la terminal, puedes ejecutar los siguientes comandos básicos:

```bash
# Crear un entorno virtual (sustituye 'entorno' por el nombre que prefieras)
python -m venv entorno

# Activar el entorno (en Windows)
entorno\Scripts\activate


ProyectoV1/
│
├── config/
│   ├── __pypache__
│   │   ├── __init__.cpython-312.pyc
│   │   ├── settings.cpython-312.pyc
│   │   ├── urls.cpython-312.pyc
│   │   └── wsgi.cpython-312.pyc
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └──wsgi.py
├── Proyecto/
│   ├── bin/
│   │   ├── django-admin
│   │   ├──sqlformat
│   │   ├──activate
│   │   ├──activate.csh
│   │   ├──activate.fish
│   │   ├──Activate.ps1
│   │   ├──pip
│   │   ├──pip3
│   │   ├──pip3.12
│   │   ├──python
│   │   ├──python3
│   │   └──python3.12
│   ├── include/
│   │   └── python3.12
│   ├── lib/
│   │   └── python3.12
│   │       └── site-packages
│   ├── pyvenv.cfg
│   └── lib64
├── web/
│   ├── __pypache__
│   │   ├── __init__.cpython-312.pyc
│   │   ├── admin.cpython-312.pyc
│   │   ├── apps.cpython-312.pyc
│   │   └── models.cpython-312.pyc
│   ├── migrations
│   │   ├── __pypache__
│   │   │   └── __init__.cpython-312.pyc
│   │   └── __init__.py
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── db.sqlite3
└── manage.py


# Activar el entorno (en macOS/Linux)
source entorno/bin/activate

# Instalar Django
pip install django

