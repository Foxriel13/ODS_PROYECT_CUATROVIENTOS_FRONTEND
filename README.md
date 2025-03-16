# Proyecto: Iniciativas Cuatrovientos

Este proyecto es una aplicación web desarrollada en **Angular**, que muestra las iniciativas llevadas a cabo por el Instituto Cuatrovientos en relación con las metas de los Objetivos de Desarrollo Sostenible (ODS). La aplicación se conecta con un backend desarrollado en **Symfony** a través de CORS para gestionar los datos de las iniciativas.

## Tecnologías Utilizadas

- **Frontend**: Angular, TypeScript, SCSS, Bootstrap
- **Backend**: Symfony
- **Comunicación**: CORS para integrar Angular con Symfony

## Estructura del Proyecto

```
app/
├── components/              # Componentes reutilizables
│   ├── actualizar-iniciativa/
│   ├── buscador/
│   ├── crear-iniciativa/
│   ├── eliminar-iniciativa/
│   ├── footer/
│   ├── iniciativas/
│   │   ├── card-iniciativa/
│   │   ├── modal-iniciativa/
│   │   ├── iniciativas.component.html
│   │   ├── iniciativas.component.scss
│   │   ├── iniciativas.component.spec.ts
│   │   ├── iniciativas.component.ts
│   ├── log-in/
│   ├── menu/
│   ├── modificar/
│   ├── navbar/
│   ├── navbar-form-crear/
│
├── models/                  # Modelos de datos
├── services/                # Servicios para consumir la API
│   ├── serviceIniciativasMostrar.ts
│   ├── serviceCursos.ts
│   ├── serviceDimension.ts
│   ├── serviceEntidades.ts
│   ├── serviceMetas.ts
│   ├── serviceModulos.ts
│   ├── serviceOds.ts
│   ├── serviceProfesores.ts
```

## Instalación y Configuración

### 1. Clonar el repositorio
```sh
git clone <URL_DEL_REPO>
cd nombre-del-proyecto
```

### 2. Instalar dependencias
```sh
npm install
```

### 3. Configurar CORS en Symfony
En el backend, asegurarse de permitir el acceso desde el frontend:
```php
// En el archivo config/packages/cors.yaml
nelmio_cors:
    paths:
        '^/api/':
            allow_origin: ['http://localhost:4200']
            allow_methods: ['GET', 'POST', 'PUT', 'DELETE']
            allow_headers: ['Content-Type', 'Authorization']
```

### 4. Ejecutar el proyecto
```sh
ng serve
```
Acceder a: [http://localhost:4200](http://localhost:4200)

## Funcionalidades Principales

- **Búsqueda y filtrado** de iniciativas por curso, ODS y fechas.
- **Gestión de iniciativas** (creación, edición y eliminación).
- **Interfaz responsive** utilizando Bootstrap y SCSS.
- **Integración con API Symfony** para obtener y gestionar datos.



