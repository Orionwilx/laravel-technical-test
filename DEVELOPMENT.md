# 🔧 Puerto Brisa - Guía de Desarrollo

## 🚀 Configuración del Entorno de Desarrollo

### Requisitos del Sistema

#### Software Requerido

- **PHP**: 8.2 o superior
- **Composer**: 2.0 o superior
- **Node.js**: 18 o superior
- **NPM**: 8 o superior
- **Git**: Para control de versiones

#### Extensiones PHP Requeridas

```bash
# Verificar extensiones instaladas
php -m | grep -E "(openssl|pdo|mbstring|tokenizer|xml|ctype|json|bcmath|fileinfo)"
```

### Instalación Paso a Paso

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/Orionwilx/puerto-brisa-prueba.git
cd puerto-brisa-prueba
```

#### 2. Instalar Dependencias PHP

```bash
composer install
```

#### 3. Instalar Dependencias Node.js

```bash
npm install
```

#### 4. Configurar Variables de Entorno

```bash
# Copiar archivo de configuración
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate
```

#### 5. Configurar Base de Datos

```bash
# Crear base de datos SQLite
touch database/database.sqlite

# Ejecutar migraciones
php artisan migrate

# Poblar con datos de prueba
php artisan db:seed
```

#### 6. Configurar Correo (Opcional)

```env
# Para desarrollo con Mailtrap
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=tu-username
MAIL_PASSWORD=tu-password
MAIL_ENCRYPTION=tls
```

#### 7. Iniciar Servidores de Desarrollo

```bash
# Terminal 1: Servidor Laravel
php artisan serve

# Terminal 2: Servidor Vite
npm run dev
```

---

## 📁 Estructura del Proyecto

### Directorios Principales

```
puerto-brisa-prueba/
├── app/                     # Lógica de aplicación
│   ├── Console/            # Comandos Artisan
│   ├── Exports/            # Exportaciones
│   ├── Http/               # Controladores y middleware
│   ├── Jobs/               # Trabajos en cola
│   ├── Mail/               # Clases de correo
│   ├── Models/             # Modelos Eloquent
│   └── Providers/          # Proveedores de servicios
├── config/                 # Configuración
├── database/               # Base de datos
│   ├── factories/          # Factories
│   ├── migrations/         # Migraciones
│   └── seeders/            # Seeders
├── public/                 # Archivos públicos
├── resources/              # Recursos frontend
│   ├── css/                # Estilos
│   ├── js/                 # JavaScript/TypeScript
│   └── views/              # Plantillas Blade
├── routes/                 # Definición de rutas
├── storage/                # Almacenamiento
├── tests/                  # Pruebas
└── vendor/                 # Dependencias PHP
```

### Archivos de Configuración

```
├── .env                    # Variables de entorno
├── .env.example           # Plantilla de configuración
├── composer.json          # Dependencias PHP
├── package.json           # Dependencias Node.js
├── tailwind.config.js     # Configuración Tailwind
├── tsconfig.json          # Configuración TypeScript
├── vite.config.ts         # Configuración Vite
└── phpunit.xml            # Configuración PHPUnit
```

---

## 🎨 Desarrollo Frontend

### Estructura de Componentes React

```
resources/js/
├── app.tsx                 # Punto de entrada
├── layouts/                # Layouts
│   └── SimpleLayout.tsx
├── pages/                  # Páginas
│   ├── dashboard.tsx
│   ├── shipments/
│   │   ├── Index.tsx
│   │   ├── Create.tsx
│   │   ├── Show.tsx
│   │   └── Edit.tsx
│   └── admin/
│       ├── Users/
│       └── ExternalUsers/
├── components/             # Componentes
│   ├── ui/                # Componentes base
│   ├── dashboard/         # Componentes específicos
│   ├── shipments/
│   └── SimpleNavbar.tsx
├── hooks/                  # Custom hooks
├── types/                  # Tipos TypeScript
│   └── index.ts
└── lib/                    # Utilidades
```

### Convenciones de Nomenclatura

#### Archivos y Carpetas

```
✅ PascalCase para componentes: UserProfile.tsx
✅ camelCase para hooks: useShipments.ts
✅ kebab-case para páginas: user-profile.tsx
✅ lowercase para carpetas: components/
```

#### Componentes React

```typescript
// Definición de tipos
interface UserProfileProps {
    user: User;
    onUpdate: (user: User) => void;
}

// Componente funcional
const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
    // Hooks al inicio
    const [editing, setEditing] = useState(false);

    // Handlers
    const handleEdit = () => setEditing(true);
    const handleSave = () => {
        onUpdate(user);
        setEditing(false);
    };

    // Render
    return (
        <div className="user-profile">
            {/* JSX */}
        </div>
    );
};

export default UserProfile;
```

### Manejo de Estado

#### Con Inertia.js

```typescript
import { useForm } from '@inertiajs/react';

const CreateShipment: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        truck_plate: '',
        product_name: '',
        notes: ''
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/shipments');
    };

    return (
        <form onSubmit={submit}>
            <input
                value={data.truck_plate}
                onChange={e => setData('truck_plate', e.target.value)}
            />
            {errors.truck_plate && <span>{errors.truck_plate}</span>}

            <button type="submit" disabled={processing}>
                {processing ? 'Creando...' : 'Crear'}
            </button>
        </form>
    );
};
```

#### Custom Hooks

```typescript
// hooks/useShipments.ts
export const useShipments = () => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchShipments = useCallback(async () => {
        setLoading(true);
        try {
            const response = await router.get('/shipments');
            setShipments(response.data);
        } catch (error) {
            console.error('Error fetching shipments:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchShipments();
    }, [fetchShipments]);

    return { shipments, loading, fetchShipments };
};
```

### Estilos con Tailwind CSS

#### Clases Utilitarias

```typescript
// Componente con Tailwind
const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        danger: 'bg-red-600 text-white hover:bg-red-700'
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]}`}
            {...props}
        >
            {children}
        </button>
    );
};
```

#### Configuración Tailwind

```javascript
// tailwind.config.js
module.exports = {
    content: ['./resources/**/*.blade.php', './resources/**/*.js', './resources/**/*.jsx', './resources/**/*.ts', './resources/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
```

---

## 🏗️ Desarrollo Backend

### Estructura de Controladores

#### Controlador Base

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BaseController extends Controller
{
    protected function getCurrentUser()
    {
        return Auth::user();
    }

    protected function authorizeAdmin()
    {
        if (!$this->getCurrentUser()->isAdmin()) {
            abort(403, 'Acceso denegado');
        }
    }

    protected function renderWithProps(string $component, array $props = [])
    {
        return Inertia::render($component, array_merge([
            'auth' => [
                'user' => $this->getCurrentUser()
            ]
        ], $props));
    }
}
```

#### Controlador CRUD

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShipmentRequest;
use App\Http\Requests\UpdateShipmentRequest;
use App\Models\Shipment;
use App\Models\User;

class ShipmentController extends BaseController
{
    public function index()
    {
        $user = $this->getCurrentUser();

        $shipments = Shipment::with('user')
            ->when(!$user->isAdmin(), function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->latest()
            ->paginate(10);

        return $this->renderWithProps('shipments/Index', [
            'shipments' => $shipments,
            'canCreate' => $user->can('create', Shipment::class)
        ]);
    }

    public function store(StoreShipmentRequest $request)
    {
        $shipment = Shipment::create(array_merge(
            $request->validated(),
            ['user_id' => $this->getCurrentUser()->id]
        ));

        // Dispatch job for email notification
        dispatch(new SendShipmentAnnouncedEmail($shipment));

        return redirect()->route('shipments.index')
            ->with('success', 'Envío creado exitosamente');
    }

    public function show(Shipment $shipment)
    {
        $this->authorize('view', $shipment);

        return $this->renderWithProps('shipments/Show', [
            'shipment' => $shipment->load('user')
        ]);
    }

    public function update(UpdateShipmentRequest $request, Shipment $shipment)
    {
        $this->authorize('update', $shipment);

        $shipment->update($request->validated());

        return redirect()->route('shipments.show', $shipment)
            ->with('success', 'Envío actualizado exitosamente');
    }

    public function destroy(Shipment $shipment)
    {
        $this->authorize('delete', $shipment);

        $shipment->delete();

        return redirect()->route('shipments.index')
            ->with('success', 'Envío eliminado exitosamente');
    }
}
```

### Validaciones con Form Requests

#### Request de Validación

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreShipmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'truck_plate' => [
                'required',
                'string',
                'max:10',
                'regex:/^[A-Z]{3}-\d{3}$|^[A-Z]{3}\d{2}[A-Z]$|^[A-Z]{3}\d{3}$/',
                'unique:shipments,truck_plate'
            ],
            'product_name' => [
                'required',
                'string',
                'max:255'
            ],
            'notes' => [
                'nullable',
                'string',
                'max:1000'
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'truck_plate.required' => 'La placa del camión es obligatoria',
            'truck_plate.regex' => 'La placa debe tener formato colombiano válido (ABC-123 o ABC123)',
            'truck_plate.unique' => 'Ya existe un envío con esta placa',
            'product_name.required' => 'El nombre del producto es obligatorio',
            'product_name.max' => 'El nombre del producto no puede exceder 255 caracteres',
            'notes.max' => 'Las notas no pueden exceder 1000 caracteres'
        ];
    }

    public function attributes(): array
    {
        return [
            'truck_plate' => 'placa del camión',
            'product_name' => 'nombre del producto',
            'notes' => 'notas'
        ];
    }
}
```

#### Validación Personalizada

```php
<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ColombianPlateRule implements Rule
{
    private string $message = 'La placa debe tener formato colombiano válido';

    public function passes($attribute, $value): bool
    {
        // Formato con guión: ABC-123
        $withDash = preg_match('/^[A-Z]{3}-\d{3}$/', $value);

        // Formato sin guión: ABC123
        $withoutDash = preg_match('/^[A-Z]{3}\d{3}$/', $value);

        // Formato mixto: ABC12D
        $mixed = preg_match('/^[A-Z]{3}\d{2}[A-Z]$/', $value);

        return $withDash || $withoutDash || $mixed;
    }

    public function message(): string
    {
        return $this->message;
    }
}
```

### Modelos Eloquent

#### Modelo Base

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class BaseModel extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $dates = ['deleted_at'];

    public function scopeActive($query)
    {
        return $query->whereNull('deleted_at');
    }

    public function scopeRecent($query, int $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }
}
```

#### Modelo con Relaciones

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shipment extends BaseModel
{
    protected $fillable = [
        'user_id',
        'truck_plate',
        'product_name',
        'status',
        'announced_at',
        'delivered_at',
        'notes'
    ];

    protected $casts = [
        'announced_at' => 'datetime',
        'delivered_at' => 'datetime'
    ];

    // Relaciones
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeAnnounced($query)
    {
        return $query->where('status', 'announced');
    }

    public function scopeDelivered($query)
    {
        return $query->where('status', 'delivered');
    }

    public function scopeByUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    // Accessors
    public function getFormattedAnnouncedAtAttribute(): string
    {
        return $this->announced_at->format('d/m/Y H:i');
    }

    public function getIsDeliveredAttribute(): bool
    {
        return $this->status === 'delivered';
    }

    // Mutators
    public function setTruckPlateAttribute(string $value): void
    {
        $this->attributes['truck_plate'] = strtoupper($value);
    }

    // Métodos de utilidad
    public function markAsDelivered(): void
    {
        $this->update([
            'status' => 'delivered',
            'delivered_at' => now()
        ]);
    }
}
```

### Middleware Personalizado

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        $user = Auth::user();

        if (!$user->isAdmin()) {
            abort(403, 'Acceso denegado. Solo administradores pueden acceder a esta sección.');
        }

        return $next($request);
    }
}
```

### Policies de Autorización

```php
<?php

namespace App\Policies;

use App\Models\Shipment;
use App\Models\User;

class ShipmentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isExternal();
    }

    public function view(User $user, Shipment $shipment): bool
    {
        return $user->isAdmin() || $user->id === $shipment->user_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isExternal();
    }

    public function update(User $user, Shipment $shipment): bool
    {
        return $user->isAdmin() || $user->id === $shipment->user_id;
    }

    public function delete(User $user, Shipment $shipment): bool
    {
        return $user->isAdmin() || $user->id === $shipment->user_id;
    }
}
```

---

## 📧 Sistema de Correos

### Mailable Classes

```php
<?php

namespace App\Mail;

use App\Models\Shipment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ShipmentAnnounced extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Shipment $shipment
    ) {}

    public function build()
    {
        return $this->subject('Nueva Carga Anunciada - Puerto Brisa')
                   ->view('emails.shipment-announced')
                   ->with([
                       'shipment' => $this->shipment,
                       'user' => $this->shipment->user
                   ]);
    }
}
```

### Jobs para Colas

```php
<?php

namespace App\Jobs;

use App\Mail\ShipmentAnnounced;
use App\Models\Shipment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendShipmentAnnouncedEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $timeout = 60;

    public function __construct(
        public Shipment $shipment
    ) {}

    public function handle(): void
    {
        $adminUsers = User::where('role', 'admin')->get();

        foreach ($adminUsers as $admin) {
            Mail::to($admin->email)
                ->send(new ShipmentAnnounced($this->shipment));
        }
    }

    public function failed(\Throwable $exception): void
    {
        // Log del error
        \Log::error('Failed to send shipment announced email', [
            'shipment_id' => $this->shipment->id,
            'error' => $exception->getMessage()
        ]);
    }
}
```

### Plantillas de Email

```html
<!-- resources/views/emails/shipment-announced.blade.php -->
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nueva Carga Anunciada</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background: #2563eb;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .content {
                background: #f8f9fa;
                padding: 20px;
            }
            .footer {
                background: #6b7280;
                color: white;
                padding: 10px;
                text-align: center;
            }
            .button {
                background: #2563eb;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚢 Puerto Brisa</h1>
                <h2>Nueva Carga Anunciada</h2>
            </div>

            <div class="content">
                <p>Estimado/a administrador/a,</p>

                <p>Se ha anunciado una nueva carga en el sistema:</p>

                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Usuario:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{{ $user->name }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Placa:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{{ $shipment->truck_plate }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Producto:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{{ $shipment->product_name }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Fecha:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{{ $shipment->announced_at->format('d/m/Y H:i') }}</td>
                    </tr>
                </table>

                @if($shipment->notes)
                <p><strong>Notas:</strong></p>
                <p style="background: white; padding: 10px; border-left: 4px solid #2563eb;">{{ $shipment->notes }}</p>
                @endif

                <p style="text-align: center; margin-top: 30px;">
                    <a href="{{ route('shipments.show', $shipment) }}" class="button"> Ver Detalles del Envío </a>
                </p>
            </div>

            <div class="footer">
                <p>&copy; {{ date('Y') }} Puerto Brisa. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
</html>
```

---

## 🧪 Pruebas Automatizadas

### Pruebas de Funcionalidad

```php
<?php

namespace Tests\Feature;

use App\Models\Shipment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShipmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_all_shipments(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->external()->create();

        $shipment = Shipment::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($admin)
            ->get('/shipments');

        $response->assertStatus(200)
                ->assertSee($shipment->product_name);
    }

    public function test_external_user_can_only_view_own_shipments(): void
    {
        $user1 = User::factory()->external()->create();
        $user2 = User::factory()->external()->create();

        $shipment1 = Shipment::factory()->create(['user_id' => $user1->id]);
        $shipment2 = Shipment::factory()->create(['user_id' => $user2->id]);

        $response = $this->actingAs($user1)
            ->get('/shipments');

        $response->assertStatus(200)
                ->assertSee($shipment1->product_name)
                ->assertDontSee($shipment2->product_name);
    }

    public function test_can_create_shipment_with_valid_data(): void
    {
        $user = User::factory()->external()->create();

        $shipmentData = [
            'truck_plate' => 'ABC-123',
            'product_name' => 'Producto de prueba',
            'notes' => 'Notas de prueba'
        ];

        $response = $this->actingAs($user)
            ->post('/shipments', $shipmentData);

        $response->assertRedirect('/shipments');

        $this->assertDatabaseHas('shipments', [
            'truck_plate' => 'ABC-123',
            'product_name' => 'Producto de prueba',
            'user_id' => $user->id
        ]);
    }

    public function test_validates_colombian_plate_format(): void
    {
        $user = User::factory()->external()->create();

        $invalidPlates = [
            'AB-123',      // Muy corta
            'ABCD-123',    // Muy larga
            'ABC-12',      // Números insuficientes
            '123-ABC',     // Orden incorrecto
            'abc-123',     // Minúsculas
        ];

        foreach ($invalidPlates as $plate) {
            $response = $this->actingAs($user)
                ->post('/shipments', [
                    'truck_plate' => $plate,
                    'product_name' => 'Producto'
                ]);

            $response->assertSessionHasErrors('truck_plate');
        }
    }

    public function test_can_update_shipment_status(): void
    {
        $user = User::factory()->external()->create();
        $shipment = Shipment::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)
            ->patch("/shipments/{$shipment->id}", [
                'status' => 'delivered'
            ]);

        $response->assertRedirect("/shipments/{$shipment->id}");

        $this->assertEquals('delivered', $shipment->fresh()->status);
        $this->assertNotNull($shipment->fresh()->delivered_at);
    }
}
```

### Pruebas Unitarias

```php
<?php

namespace Tests\Unit;

use App\Models\Shipment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShipmentModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_shipment_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $shipment = Shipment::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $shipment->user);
        $this->assertEquals($user->id, $shipment->user->id);
    }

    public function test_user_has_many_shipments(): void
    {
        $user = User::factory()->create();
        $shipments = Shipment::factory()->count(3)->create(['user_id' => $user->id]);

        $this->assertCount(3, $user->shipments);
        $this->assertInstanceOf(Shipment::class, $user->shipments->first());
    }

    public function test_shipment_scopes(): void
    {
        $user = User::factory()->create();

        $announced = Shipment::factory()->create([
            'user_id' => $user->id,
            'status' => 'announced'
        ]);

        $delivered = Shipment::factory()->create([
            'user_id' => $user->id,
            'status' => 'delivered'
        ]);

        $this->assertCount(1, Shipment::announced()->get());
        $this->assertCount(1, Shipment::delivered()->get());
        $this->assertCount(2, Shipment::byUser($user->id)->get());
    }

    public function test_mark_as_delivered(): void
    {
        $shipment = Shipment::factory()->create(['status' => 'announced']);

        $this->assertEquals('announced', $shipment->status);
        $this->assertNull($shipment->delivered_at);

        $shipment->markAsDelivered();

        $this->assertEquals('delivered', $shipment->status);
        $this->assertNotNull($shipment->delivered_at);
    }
}
```

### Factory Classes

```php
<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShipmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'truck_plate' => $this->faker->regexify('[A-Z]{3}-[0-9]{3}'),
            'product_name' => $this->faker->words(3, true),
            'status' => $this->faker->randomElement(['announced', 'delivered']),
            'announced_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'delivered_at' => $this->faker->optional()->dateTimeBetween('-1 week', 'now'),
            'notes' => $this->faker->optional()->paragraph()
        ];
    }

    public function announced(): static
    {
        return $this->state(fn () => [
            'status' => 'announced',
            'delivered_at' => null
        ]);
    }

    public function delivered(): static
    {
        return $this->state(fn () => [
            'status' => 'delivered',
            'delivered_at' => $this->faker->dateTimeBetween('-1 week', 'now')
        ]);
    }
}
```

---

## 🚀 Comandos de Desarrollo

### Comandos Artisan Personalizados

```php
<?php

namespace App\Console\Commands;

use App\Models\Shipment;
use App\Models\User;
use Illuminate\Console\Command;

class GenerateReports extends Command
{
    protected $signature = 'reports:generate {--type=daily}';
    protected $description = 'Generate system reports';

    public function handle(): void
    {
        $type = $this->option('type');

        $this->info("Generando reporte {$type}...");

        switch ($type) {
            case 'daily':
                $this->generateDailyReport();
                break;
            case 'weekly':
                $this->generateWeeklyReport();
                break;
            default:
                $this->error('Tipo de reporte no válido');
                return;
        }

        $this->info('Reporte generado exitosamente');
    }

    private function generateDailyReport(): void
    {
        $shipments = Shipment::whereDate('created_at', today())->count();
        $users = User::whereDate('created_at', today())->count();

        $this->table(
            ['Métrica', 'Valor'],
            [
                ['Envíos creados hoy', $shipments],
                ['Usuarios registrados hoy', $users]
            ]
        );
    }

    private function generateWeeklyReport(): void
    {
        $shipments = Shipment::whereBetween('created_at', [
            now()->startOfWeek(),
            now()->endOfWeek()
        ])->count();

        $this->info("Envíos esta semana: {$shipments}");
    }
}
```

### Scripts de Utilidad

```bash
#!/bin/bash
# scripts/deploy.sh

echo "🚀 Iniciando deployment..."

# Actualizar código
git pull origin main

# Instalar dependencias
composer install --no-dev --optimize-autoloader

# Ejecutar migraciones
php artisan migrate --force

# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Compilar assets
npm run build

# Optimizar para producción
php artisan optimize

echo "✅ Deployment completado"
```

---

## 📊 Herramientas de Desarrollo

### Debugging

```php
// Usar dump() para debug
dump($variable);

// Usar dd() para debug y detener ejecución
dd($variable);

// Usar Log facade
\Log::info('Debug message', ['data' => $variable]);

// Usar Ray (si está instalado)
ray($variable);
```

### Profiling

```php
// Medir tiempo de ejecución
$start = microtime(true);
// ... código a medir ...
$end = microtime(true);
$time = $end - $start;

// Usar Clockwork
clock($variable);

// Usar Telescope
\Telescope::recordDump($variable);
```

### Database Seeding

```php
<?php

namespace Database\Seeders;

use App\Models\Shipment;
use App\Models\User;
use Illuminate\Database\Seeder;

class DevelopmentSeeder extends Seeder
{
    public function run(): void
    {
        // Crear admin
        $admin = User::factory()->admin()->create([
            'name' => 'Admin Usuario',
            'email' => 'admin@puertobrisa.com'
        ]);

        // Crear usuarios externos
        $externalUsers = User::factory()->external()->count(5)->create();

        // Crear envíos para cada usuario
        $externalUsers->each(function ($user) {
            Shipment::factory()->count(rand(1, 3))->create([
                'user_id' => $user->id
            ]);
        });
    }
}
```

---

## 🎯 Best Practices

### Código PHP

1. **Usar Type Hints**

```php
public function createShipment(array $data): Shipment
{
    return Shipment::create($data);
}
```

2. **Validar Entrada**

```php
public function store(StoreShipmentRequest $request)
{
    $validated = $request->validated();
    // Procesar datos validados
}
```

3. **Usar Políticas de Autorización**

```php
public function update(Shipment $shipment)
{
    $this->authorize('update', $shipment);
    // Lógica de actualización
}
```

4. **Manejo de Errores**

```php
try {
    $shipment = Shipment::create($data);
} catch (\Exception $e) {
    \Log::error('Error creating shipment', ['error' => $e->getMessage()]);
    return redirect()->back()->with('error', 'Error al crear envío');
}
```

### Código TypeScript/React

1. **Usar Interfaces**

```typescript
interface ShipmentProps {
    shipment: Shipment;
    onUpdate: (shipment: Shipment) => void;
}
```

2. **Componentes Funcionales**

```typescript
const ShipmentCard: React.FC<ShipmentProps> = ({ shipment, onUpdate }) => {
    return <div>{/* JSX */}</div>;
};
```

3. **Hooks Personalizados**

```typescript
const useShipment = (id: number) => {
    const [shipment, setShipment] = useState<Shipment | null>(null);
    // Lógica del hook
    return { shipment, setShipment };
};
```

4. **Manejo de Estados**

```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

---

## 🔧 Troubleshooting

### Problemas Comunes

#### Error de Compilación TypeScript

```bash
# Verificar configuración
npx tsc --noEmit

# Limpiar caché
rm -rf node_modules/.cache
npm run build
```

#### Error de Migraciones

```bash
# Rollback y re-ejecutar
php artisan migrate:rollback
php artisan migrate

# Refrescar completamente
php artisan migrate:fresh --seed
```

#### Error de Permisos

```bash
# Linux/Mac
sudo chown -R $USER:$USER storage bootstrap/cache
chmod -R 755 storage bootstrap/cache

# Windows
icacls storage /grant Users:F /T
icacls bootstrap/cache /grant Users:F /T
```

#### Error de Colas

```bash
# Reiniciar workers
php artisan queue:restart

# Verificar trabajos fallidos
php artisan queue:failed

# Reintentar trabajos fallidos
php artisan queue:retry all
```

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Herramientas Recomendadas

- **IDE**: VS Code con extensiones PHP y TypeScript
- **Database**: TablePlus, phpMyAdmin
- **API Testing**: Postman, Insomnia
- **Debugging**: Xdebug, Ray
- **Profiling**: Clockwork, Telescope

### Comunidad

- [Laravel Community](https://laravel.com/community)
- [React Community](https://react.dev/community)
- [Stack Overflow](https://stackoverflow.com)

---

_Esta guía se actualiza continuamente con las mejores prácticas y nuevas funcionalidades del proyecto._
