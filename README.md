# Puerto Brisa - Prueba Técnica Laravel

## Descripción

Este proyecto es una aplicación fullstack desarrollada con Laravel y React. El objetivo es permitir a un usuario administrador iniciar sesión en el sistema y gestionar usuarios externos (crear, modificar y eliminar).

## Tecnologías Utilizadas

- **Backend:** Laravel
- **Frontend:** React con Inertia.js
- **Estilos:** Tailwind CSS
- **Base de Datos:** SQLite
- **Herramientas de Construcción:** Vite

## Funcionalidades

1. **Autenticación:**
    - Inicio de sesión para usuarios administradores.
2. **Gestión de Usuarios Externos:**
    - Crear, modificar y eliminar usuarios externos.

## Instalación

1. Clonar el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2. Instalar dependencias de PHP:
    ```bash
    composer install
    ```
3. Instalar dependencias de Node.js:
    ```bash
    npm install
    ```
4. Configurar el archivo `.env`.
5. Ejecutar las migraciones:
    ```bash
    php artisan migrate
    ```
6. Iniciar el servidor de desarrollo:
    ```bash
    php artisan serve
    npm run dev
    ```

## Estructura del Proyecto

- **Backend:**
    - `app/Http/Controllers`: Controladores para manejar la lógica de negocio.
    - `app/Models`: Modelos de la base de datos.
    - `routes/web.php`: Rutas principales del sistema.
- **Frontend:**
    - `resources/js`: Código fuente de React.
    - `resources/css`: Estilos con Tailwind CSS.

## Pruebas

- Ejecutar pruebas:
    ```bash
    php artisan test
    ```

## Documentación

- Archivo `tasks.md` con las tareas realizadas y pendientes.

## Notas

- Este proyecto utiliza Laravel Breeze para la autenticación.
- Asegúrate de configurar correctamente el archivo `.env` antes de ejecutar el proyecto.

## Licencia

Este proyecto es parte de una prueba técnica y no tiene licencia comercial.
