# 🚀 Puerto Brisa - Sistema de Gestión de Envíos

Sistema web desarrollado con **Laravel 12 + React + TypeScript + Inertia.js** para la gestión de envíos portuarios.

## 📋 Estado del Proyecto

**✅ Sistema Base Funcional**

- Autenticación con roles (admin/external)
- CRUD completo de envíos
- Dashboard con estadísticas
- Validación de placas colombianas
- Interfaz moderna y responsiva
- Sistema de correo electrónico
- Gestión de usuarios completa

## 📚 Documentación Completa

### 📖 Guías Principales

- **[DOCUMENTATION.md](DOCUMENTATION.md)** - 📋 Documentación técnica completa
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - 🔧 Guía de desarrollo

### 🎯 Documentación por Áreas

- **Backend**: Laravel 12, SQLite, Inertia.js, Sistema de correos
- **Frontend**: React 18, TypeScript, Tailwind CSS, Componentes UI
- **Database**: Migraciones, Seeders, Relaciones, Validaciones
- **Testing**: 41 pruebas exitosas, cobertura 85%
- **Deployment**: Configuración producción, CI/CD, Docker

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
- ✅ Gestionar usuarios externos en `/admin/external-users`
- ✅ Gestionar usuarios admin en `/admin/users`
- ✅ Crear/editar/eliminar envíos
- ✅ Exportar datos a CSV
- ✅ Marcar envíos como entregados

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
- ✅ Recibir notificaciones por email
- ❌ No puede ver envíos de otros usuarios
- ❌ No puede acceder a secciones de admin

### **Validaciones a Probar**

#### **Placas Válidas (Formato Colombiano):**

- ✅ `ABC-123` (formato con guión)
- ✅ `DEF-456` (formato estándar)
- ✅ `GHI789` (formato sin guión)
- ✅ `JKL012` (números variados)

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

### **Administrativas**

- `/admin/dashboard` - Dashboard administrativo
- `/admin/external-users` - Gestión usuarios externos
- `/admin/users` - Gestión usuarios admin
- `/admin/shipments/export` - Exportar envíos

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

# Verificar estructura
Schema::getColumnListing('users')
Schema::getColumnListing('shipments')
```

## 🛠️ Tecnologías Utilizadas

### **Stack Principal**

- **Backend:** Laravel 12, SQLite, Inertia.js
- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Componentes:** Shadcn/UI, Lucide React
- **Build:** Vite, NPM
- **Testing:** PHPUnit (41 tests ✅)

### **Funcionalidades Avanzadas**

- **Email System:** Mailtrap SMTP con colas
- **Validaciones:** Placas colombianas, FormRequests
- **Authorización:** Middleware personalizado, Policies
- **Exportación:** CSV con formato correcto
- **UI/UX:** Componentes responsivos y accesibles

## 📱 Características Implementadas

### ✅ **Funcionalidades Completadas**

#### **Core System**

- Sistema de autenticación con roles
- CRUD completo de envíos con autorización
- Dashboard con estadísticas dinámicas
- Validación de placas colombianas
- Interfaz responsive y moderna

#### **Gestión de Usuarios**

- Creación y edición de usuarios externos
- Gestión de usuarios administradores
- Validaciones de formularios
- Estados de usuario (activo/inactivo)

#### **Sistema de Correos**

- Notificaciones automáticas de carga anunciada
- Plantillas HTML profesionales
- Procesamiento en cola para performance
- Configuración SMTP con Mailtrap

#### **Funcionalidades Avanzadas**

- Exportación de envíos a CSV
- Middleware de autorización
- Validaciones FormRequest
- 41 pruebas automatizadas
- Manejo de errores robusto

### 🔄 **Pendientes (Próximos Sprints)**

- Notificaciones push en tiempo real
- API REST con Laravel Passport
- Dashboard con gráficos interactivos
- Sistema de auditoría completo
- Autenticación de dos factores

## 📈 Métricas del Sistema

| Métrica                 | Valor | Estado |
| ----------------------- | ----- | ------ |
| **Archivos PHP**        | 111   | ✅     |
| **Componentes React**   | 136   | ✅     |
| **Archivos TypeScript** | 17    | ✅     |
| **Pruebas Exitosas**    | 41    | ✅     |
| **Cobertura Funcional** | 85%   | ✅     |

## 🚀 Comandos Útiles

```bash
# Desarrollo
php artisan serve                    # Servidor Laravel
npm run dev                          # Servidor Vite
php artisan test                     # Ejecutar pruebas
php artisan test:user-creation       # Probar creación usuarios

# Base de datos
php artisan migrate:fresh --seed     # Refrescar BD
php artisan tinker                   # Consola interactiva
php artisan test:external-users-page # Probar página usuarios

# Producción
npm run build                        # Compilar assets
php artisan optimize                 # Optimizar para producción
php artisan queue:work               # Procesar colas

# Limpieza
php artisan cache:clear              # Limpiar caché
php artisan config:clear             # Limpiar configuración
php artisan route:clear              # Limpiar rutas
```

## 🏗️ Arquitectura del Sistema

```
📁 puerto-brisa-prueba/
├── 📁 app/                          # Lógica de aplicación
│   ├── 📁 Http/Controllers/         # Controladores
│   │   ├── ShipmentController.php   # Gestión envíos
│   │   ├── 📁 Admin/                # Controladores admin
│   │   │   ├── ExternalUserController.php
│   │   │   └── UserController.php
│   │   └── 📁 Auth/                 # Autenticación
│   ├── 📁 Models/                   # Modelos Eloquent
│   │   ├── User.php                 # Usuario con roles
│   │   └── Shipment.php             # Envíos
│   ├── 📁 Mail/                     # Sistema de correos
│   │   └── ShipmentAnnounced.php
│   ├── 📁 Jobs/                     # Trabajos en cola
│   │   └── SendShipmentAnnouncedEmail.php
│   ├── 📁 Requests/                 # Validaciones
│   │   ├── StoreShipmentRequest.php
│   │   └── StoreExternalUserRequest.php
│   └── 📁 Middleware/               # Middleware personalizado
│       └── IsAdminMiddleware.php
├── 📁 resources/js/                 # Frontend React
│   ├── 📁 pages/                    # Páginas principales
│   │   ├── dashboard.tsx            # Dashboard
│   │   ├── 📁 shipments/            # Páginas envíos
│   │   └── 📁 admin/                # Páginas admin
│   ├── 📁 components/               # Componentes React
│   │   ├── 📁 ui/                   # Componentes base
│   │   ├── 📁 dashboard/            # Componentes dashboard
│   │   └── SimpleNavbar.tsx         # Navegación
│   ├── 📁 types/                    # Tipos TypeScript
│   └── 📁 layouts/                  # Layouts
├── 📁 database/                     # Base de datos
│   ├── 📁 migrations/               # Migraciones
│   └── 📁 seeders/                  # Datos iniciales
├── 📁 tests/                        # Pruebas automatizadas
│   ├── 📁 Feature/                  # Pruebas funcionales
│   └── 📁 Unit/                     # Pruebas unitarias
└── 📁 routes/                       # Definición de rutas
    ├── web.php                      # Rutas principales
    └── auth.php                     # Rutas autenticación
```

## 🔍 Debugging y Logs

### **Logs del Sistema**

```bash
# Logs de Laravel
tail -f storage/logs/laravel.log

# Información del sistema
php artisan about

# Verificar configuración
php artisan config:show

# Listar rutas
php artisan route:list

# Verificar usuarios
php artisan tinker --execute="User::all()"

# Verificar envíos
php artisan tinker --execute="Shipment::with('user')->get()"
```

## 📧 Sistema de Correo Electrónico

### **Configuración Mailtrap (Desarrollo)**

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=tu-username
MAIL_PASSWORD=tu-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=admin@puertobrisa.com
MAIL_FROM_NAME="Puerto Brisa"
```

### **Funcionalidades de Correo**

- ✅ Envío automático al anunciar carga
- ✅ Plantillas HTML profesionales
- ✅ Procesamiento en cola
- ✅ Notificación a administradores
- ✅ Información completa del envío
- ✅ Enlaces directos al sistema

## 🎯 Casos de Uso Principales

### **1. Anuncio de Carga (Usuario Externo)**

1. Login → Dashboard → Crear Envío
2. Completar formulario con validación
3. Sistema valida placa colombiana
4. Envío se guarda en BD
5. Email automático a administradores
6. Redirección a lista de envíos

### **2. Gestión de Envíos (Administrador)**

1. Login → Dashboard con estadísticas
2. Ver todos los envíos del sistema
3. Filtrar por estado/usuario
4. Marcar como entregado
5. Exportar datos a CSV
6. Gestionar usuarios externos

### **3. Seguimiento de Envíos (Usuario Externo)**

1. Ver solo envíos propios
2. Editar envíos no entregados
3. Consultar estado actual
4. Recibir notificaciones por email

## 🛡️ Seguridad y Validaciones

### **Validaciones Implementadas**

#### **Placas Colombianas**

- Regex: `/^[A-Z]{3}-\d{3}$|^[A-Z]{3}\d{2}[A-Z]$|^[A-Z]{3}\d{3}$/`
- Formatos: ABC-123, ABC123, ABC12D
- Validación en tiempo real

#### **Autorización**

- Middleware personalizado para admin
- Policies para envíos
- Verificación de propiedad
- Protección CSRF automática

#### **Validación de Datos**

- FormRequests para validación
- Mensajes en español
- Validación client-side
- Sanitización de entrada


## 📞 Soporte

### **Recursos de Ayuda**

1. **Documentación completa:** `DOCUMENTATION.md`
2. **Guía de desarrollo:** `DEVELOPMENT.md`
4. **Guía interactiva:** `http://localhost:8000/test-guide`
5. **Logs del sistema:** `storage/logs/laravel.log`

### **Comandos de Diagnóstico**

```bash
# Verificar estado general
php artisan about

# Probar funcionalidades
php artisan test:user-creation
php artisan test:external-users-page

# Verificar configuración
php artisan config:show
php artisan route:list

# Limpiar sistema
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

---

