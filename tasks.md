# Tareas para la Prueba Técnica Laravel

## Backend

1. **Configuración inicial:**
   - Verificar y configurar el archivo `.env`.
   - Configurar la base de datos SQLite.
   - Ejecutar las migraciones (`php artisan migrate`).

2. **Autenticación:**
   - Implementar autenticación con Laravel Breeze.
   - Configurar rutas de autenticación en `routes/auth.php`.

3. **Modelos y Migraciones:**
   - Crear modelos necesarios según las historias de usuario.
   - Crear migraciones para las tablas requeridas.
   - Implementar relaciones entre modelos.

4. **Controladores:**
   - Crear controladores para manejar la lógica de negocio.
   - Implementar métodos para las acciones descritas en las historias de usuario.

5. **Rutas:**
   - Definir rutas en `routes/web.php`.
   - Asegurarse de que las rutas estén protegidas por middleware cuando sea necesario.

6. **Pruebas:**
   - Escribir pruebas unitarias para los modelos.
   - Escribir pruebas funcionales para las rutas y controladores.

## Frontend

1. **Configuración inicial:**
   - Configurar Vite y asegurarse de que las dependencias estén instaladas (`npm install`).
   - Verificar que los archivos CSS y JS estén correctamente enlazados.

2. **Componentes:**
   - Crear componentes React para las vistas principales.
   - Implementar componentes reutilizables (botones, formularios, etc.).

3. **Páginas:**
   - Crear páginas según las historias de usuario.
   - Configurar navegación entre páginas usando Inertia.js.

4. **Estilos:**
   - Configurar Tailwind CSS.
   - Diseñar las vistas según los requerimientos.

5. **Integración con Backend:**
   - Consumir las rutas del backend usando Inertia.js.
   - Mostrar datos dinámicos en las vistas.

6. **Pruebas:**
   - Probar la funcionalidad de los componentes.
   - Asegurarse de que las páginas se rendericen correctamente.

## General

1. **Documentación:**
   - Documentar el código y las decisiones tomadas.
   - Crear un archivo README con instrucciones para ejecutar el proyecto.

2. **Entrega:**
   - Verificar que todas las historias de usuario estén implementadas.
   - Realizar pruebas finales para garantizar que todo funcione correctamente.
   - Subir el proyecto a un repositorio y compartir el enlace.
