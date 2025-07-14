# 🚀 Puerto Brisa - Sistema de Gestión de Envíos

Sistema web desarrollado con **Laravel 11 + React + TypeScript + Inertia.js** para la gestión de envíos portuarios.

## 📋 Estado del Proyecto

**✅ Sistema Base Funcional (70% completado)**

- Autenticación con roles (admin/external)
- CRUD completo de envíos
- Dashboard con estadísticas
- Validación de placas colombianas
- Interfaz moderna y responsiva

## 🔧 Instalación Rápida

```bash
# Clonar e instalar dependencias
git clone <repo-url>
cd puerto-brisa-prueba
composer install && npm install

# Configurar entorno
cp .env.example .env
php artisan key:generate

# Configurar base de datos y datos de prueba
php artisan migrate:fresh --seed

# Ejecutar servidores
php artisan serve          # Laravel en :8000
npm run dev                # Vite en :5176
```

## 👥 Usuarios de Prueba Precargados

### 🔐 **Credenciales de Acceso**

| Rol          | Email                          | Contraseña    | Descripción             |
| ------------ | ------------------------------ | ------------- | ----------------------- |
| **Admin**    | `admin@puertobrisa.com`        | `password123` | Administrador principal |
| **External** | `juan.perez@ejemplo.com`       | `password123` | Usuario externo 1       |
| **External** | `maria.garcia@ejemplo.com`     | `password123` | Usuario externo 2       |
| **External** | `carlos.rodriguez@ejemplo.com` | `password123` | Usuario externo 3       |

## 🧪 Guía de Pruebas

### **Acceso Directo a la Guía**

Visita: **http://localhost:8000/test-guide** (después de configurar el proyecto)

### **Flujo de Pruebas Recomendado**

#### **1. Como Administrador**

```
📧 Email: admin@puertobrisa.com
🔑 Password: password123
```

**Funcionalidades a probar:**

- ✅ Dashboard con estadísticas globales
- ✅ Ver todos los envíos en `/shipments`
- ✅ Crear nuevos envíos
- ✅ Editar cualquier envío
- ✅ Cambiar estados de envíos

#### **2. Como Usuario Externo**

```
📧 Email: juan.perez@ejemplo.com
🔑 Password: password123
```

**Funcionalidades a probar:**

- ✅ Dashboard con estadísticas personales
- ✅ Ver solo sus propios envíos
- ✅ Crear envíos con validación de placas
- ✅ Editar solo sus envíos
- ❌ No puede ver envíos de otros usuarios

### **Validaciones a Probar**

#### **Placas Válidas (Formato Colombiano):**

- ✅ `ABC-123`
- ✅ `DEF-456`
- ✅ `GHI789`
- ✅ `JKL012`

#### **Placas Inválidas:**

- ❌ `AB-123` (muy corta)
- ❌ `ABCD-123` (muy larga)
- ❌ `ABC-12` (números insuficientes)
- ❌ `123-ABC` (orden incorrecto)

## 🌐 Rutas Disponibles

### **Públicas**

- `/` - Página de bienvenida
- `/login` - Iniciar sesión
- `/register` - Registrarse

### **Autenticadas**

- `/dashboard` - Dashboard principal
- `/shipments` - Lista de envíos
- `/shipments/create` - Crear envío
- `/shipments/{id}` - Ver detalles
- `/shipments/{id}/edit` - Editar envío

### **Desarrollo**

- `/test-guide` - Guía de pruebas interactiva

## 📊 Datos de Prueba Incluidos

El sistema incluye **6 envíos de prueba** distribuidos entre usuarios:

| Usuario          | Envíos   | Estados                  |
| ---------------- | -------- | ------------------------ |
| Juan Pérez       | 2 envíos | 1 anunciado, 1 entregado |
| María García     | 2 envíos | 1 anunciado, 1 entregado |
| Carlos Rodríguez | 2 envíos | 1 anunciado, 1 entregado |

## 🗄️ Consultas de Base de Datos

### **Verificar Datos con Tinker**

```bash
php artisan tinker

# Ver usuarios
User::all()

# Ver envíos con usuarios
Shipment::with('user')->get()

# Contar registros
User::count()        // 4 usuarios
Shipment::count()    // 6 envíos
```

## 🛠️ Tecnologías Utilizadas

- **Backend:** Laravel 11, SQLite, Inertia.js
- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Componentes:** Shadcn/UI, Lucide React
- **Build:** Vite, NPM
- **Testing:** PHPUnit (11 tests ✅)

## 📱 Características Implementadas

### ✅ **Funcionalidades Completadas**

- Sistema de autenticación con roles
- CRUD completo de envíos
- Dashboard con estadísticas dinámicas
- Validación de placas colombianas
- Interfaz responsive y moderna
- Middleware de autorización
- Validaciones FormRequest
- 11 pruebas automatizadas

### ❌ **Pendientes (Próximos Sprints)**

- Gestión de usuarios externos (páginas frontend)
- Sistema de correos y colas
- API REST con Laravel Passport
- Exportación a Excel
- Notificaciones automáticas

## 🚀 Comandos Útiles

```bash
# Desarrollo
php artisan serve
npm run dev

# Producción
npm run build

# Testing
php artisan test

# Base de datos
php artisan migrate:fresh --seed
php artisan tinker

# Limpieza
php artisan cache:clear
php artisan config:clear
```

## 📁 Estructura del Proyecto

```
📁 puerto-brisa-prueba/
├── 📁 app/
│   ├── 📁 Http/Controllers/
│   │   ├── ShipmentController.php
│   │   └── Admin/ExternalUserController.php
│   └── 📁 Models/
│       ├── User.php
│       └── Shipment.php
├── 📁 resources/
│   ├── 📁 js/
│   │   ├── 📁 components/
│   │   │   ├── 📁 dashboard/
│   │   │   └── 📁 shipments/
│   │   ├── 📁 pages/
│   │   │   ├── dashboard.tsx
│   │   │   └── 📁 shipments/
│   │   └── 📁 types/
│   └── 📁 views/
├── 📁 routes/
│   └── web.php
├── 📁 database/
│   ├── 📁 migrations/
│   └── 📁 seeders/
└── 📁 tests/
```

## 🔍 Debugging

### **Logs del Sistema**

```bash
tail -f storage/logs/laravel.log
```

### **Verificar Estado**

```bash
php artisan route:list
php artisan config:show
```

## 📞 Soporte

1. **Documentación completa:** `DEVELOPER_GUIDE.md`
2. **Estado del proyecto:** `tasks.md`
3. **Guía interactiva:** `http://localhost:8000/test-guide`
4. **Logs:** `storage/logs/laravel.log`

---

**🎯 Estado Actual:** Sistema base funcional con datos de prueba  
**📅 Última Actualización:** 14 de Julio, 2025  
**👨‍💻 Desarrollado por:** GitHub Copilot para Puerto Brisa
