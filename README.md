<a id="readme-top"></a>

<!-- Variables definidas al final de la página -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- Logo del proyecto -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://www.cuatrovientos.org/wp-content/uploads/2019/07/logo-cuatrovientos-2.png" alt="Logo" width="300" height="80">
  </a>
  <h3 align="center">ODS_PROYECT_CUATROVIENTOS_FRONTEND</h3>
  <p align="center"> 
    ODS_PROYECT_CUATROVIENTOS_FRONTEND es una aplicación desarrollada para gestionar iniciativas vinculadas a los Objetivos de Desarrollo Sostenible (ODS), permitiendo su creación, consulta, actualización y eliminación lógica. También ofrece gestión de dimensiones, metas, profesores, entidades externas, módulos, cursos, y más.
    <br />
    <a href="https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND"><strong>Explorar la documentación»</strong></a>
    <br />
    <br />
    <a href="https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND/issues/new?labels=bug&template=bug-report---.md">Reportar Bug</a>
    &middot;
    <a href="https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND/issues/new?labels=enhancement&template=feature-request---.md">Solicitar Funcionalidad</a>
  </p>
</div>

<!-- Explicación del Proyecto -->
# 🌍 Sobre el Proyecto
**ODS_PROYECT_CUATROVIENTOS** es una aplicación desarrollada para gestionar **iniciativas** vinculadas a los Objetivos de Desarrollo Sostenible (ODS), permitiendo su creación, consulta, actualización y eliminación lógica. También ofrece gestión de dimensiones, metas, profesores, entidades externas, módulos, cursos, y más.

<p align="right">(<a href="#readme-top">vuelta arriba</a>)</p>

<!-- Requisitos Previos -->
## 🧰 Requisitos Previos
Asegúrate de tener instaladas las siguientes herramientas en tu entorno local para poder desarrollar y ejecutar el proyecto frontend:

- **Node.js**: Versión 16.x o superior  
  Puedes comprobarlo con:  
  ```bash
  node -v
  ```

- **npm** (vinculado a Node.js): Versión 8.x o superior  
  Comprobar con:  
  ```bash
  npm -v
  ```

- **Angular CLI**: Interfaz de línea de comandos para Angular  
  Instalación global (si no lo tienes):  
  ```bash
  npm install -g @angular/cli
  ```

- ✅ **Backend Symfony operativo**  
  El frontend necesita que el backend esté corriendo en local (por ejemplo en `http://localhost:8000`) o desplegado en un servidor accesible.  
  Asegúrate de haber seguido correctamente los pasos de instalación del backend en el respositorio correspondiente https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_BACKEND (`composer install`, `symfony server:start`, etc.).

<!-- Pasos para instalar -->
## 🚀 Instalación
Sigue los pasos a continuación para levantar el proyecto en tu entorno local:

### 1. Clonar el repositorio
Puedes trabajar sobre la rama que necesites:
```bash
# Clonar desde Entrega 1
git clone --branch Entrega1 --single-branch https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND.git
cd ODS_PROYECT_CUATROVIENTOS_FRONTEND

# O desde Entrega 2
git clone --branch Entrega2 --single-branch https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND.git
cd ODS_PROYECT_CUATROVIENTOS_FRONTEND
```
### 2. Instalar dependencias

```bash
npm install
```

<!-- Funcionalidades Principales -->
## Funcionalidades Principales
- **Búsqueda y filtrado** de iniciativas por curso, ODS y fechas.
- **Gestión de iniciativas** (creación, edición y eliminación).
- **Interfaz responsive** utilizando Bootstrap y SCSS.
- **Integración con API Symfony** para obtener y gestionar datos.

<!-- Oja de ruta -->
## 🗺️ Oja de Ruta
- [x] Visualizar Iniciativas
- [ ] Crear/Actualizar/Borrar Iniciativas
- [ ] Visualizar Indicadores
- [ ] Crear/Actualizar Entidades Auxiliares
- [ ] Identificación usuario
- [ ] Crear/Actualizar Entidades Auxiliares


<!-- Estado del proyecto-->
## 📅 Estado del Proyecto
🚧 **En desarrollo activo**  
Actualmente el proyecto se encuentra en constante evolución. Se están implementando nuevas funcionalidades, corrigiendo errores y optimizando el rendimiento para su uso en producción.
> Si encuentras un bug o tienes sugerencias, ¡no dudes en abrir un issue o una pull request!

<p align="right">(<a href="#readme-top">vuelta arriba</a>)</p>

<!-- Autores -->
## 👥 Autores
Proyecto desarrollado por:
- [@Karla](https://www.github.com/karlalasluisa)  
- [@Luismi](https://www.github.com/Foxriel13)
- [@Xabi](https://www.github.com/XabierAPC)
- [@Aitor](https://www.github.com/AitorLopez057)

<!-- Markdown Links -->
[contributors-shield]: https://img.shields.io/github/contributors/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND.svg?style=for-the-badge
[contributors-url]: https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND.svg?style=for-the-badge
[forks-url]: https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND/network/members

[stars-shield]: https://img.shields.io/github/stars/Foxriel13/ODS_PROYECT_CUATROVIENTOS_BACKEND.svg?style=for-the-badge
[stars-url]: https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_BACKEND/stargazers

[issues-shield]: https://img.shields.io/github/issues/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND.svg?style=for-the-badge
[issues-url]: https://github.com/Foxriel13/ODS_PROYECT_CUATROVIENTOS_FRONTEND/issues
