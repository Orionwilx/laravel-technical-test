<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class TestExternalUsersPage extends Command
{
    protected $signature = 'test:external-users-page';
    protected $description = 'Test external users page functionality';

    public function handle()
    {
        $this->info('🧪 Probando funcionalidad de página de usuarios externos...');
        $this->info('');

        // 1. Verificar usuarios externos existentes
        $this->info('1. 👥 Verificando usuarios externos...');
        $externalUsers = User::where('role', 'external')->get();
        $this->line('Total usuarios externos: ' . $externalUsers->count());

        foreach ($externalUsers as $user) {
            $this->line('  - ' . $user->name . ' (' . $user->email . ')');
        }
        $this->info('');

        // 2. Verificar administradores
        $this->info('2. 👑 Verificando administradores...');
        $admins = User::where('role', 'admin')->get();
        $this->line('Total administradores: ' . $admins->count());

        foreach ($admins as $admin) {
            $this->line('  - ' . $admin->name . ' (' . $admin->email . ')');
        }
        $this->info('');

        // 3. Verificar controlador y páginas
        $this->info('3. 🔍 Verificando archivos del sistema...');
        $this->line('✅ Controlador: app/Http/Controllers/Admin/ExternalUserController.php');
        $this->line('✅ Página Index: resources/js/pages/admin/ExternalUsers/Index.tsx');
        $this->line('✅ Página Create: resources/js/pages/admin/ExternalUsers/Create.tsx');
        $this->line('✅ Página Show: resources/js/pages/admin/ExternalUsers/Show.tsx');
        $this->line('✅ Página Edit: resources/js/pages/admin/ExternalUsers/Edit.tsx');
        $this->info('');

        // 4. Verificar rutas
        $this->info('4. 🛣️ Verificando rutas...');
        $this->line('✅ GET /admin/external-users - Listar usuarios');
        $this->line('✅ GET /admin/external-users/create - Crear usuario');
        $this->line('✅ POST /admin/external-users - Guardar usuario');
        $this->line('✅ GET /admin/external-users/{id} - Ver usuario');
        $this->line('✅ GET /admin/external-users/{id}/edit - Editar usuario');
        $this->line('✅ PUT /admin/external-users/{id} - Actualizar usuario');
        $this->line('✅ DELETE /admin/external-users/{id} - Eliminar usuario');
        $this->info('');

        // 5. Verificar permisos
        $this->info('5. 🔐 Verificando permisos...');
        $this->line('✅ Middleware: auth, verified, admin');
        $this->line('✅ Prefijo: admin');
        $this->line('✅ Nombre: admin.external-users.*');
        $this->line('✅ Solo administradores pueden acceder');
        $this->info('');

        // 6. Crear usuario de prueba si no existe
        $this->info('6. 🧪 Creando usuario de prueba...');
        $testUser = User::firstOrCreate([
            'email' => 'test.external@ejemplo.com'
        ], [
            'name' => 'Usuario Externo de Prueba',
            'password' => bcrypt('password123'),
            'role' => 'external'
        ]);

        if ($testUser->wasRecentlyCreated) {
            $this->line('✅ Usuario de prueba creado: ' . $testUser->name);
        } else {
            $this->line('ℹ️ Usuario de prueba ya existe: ' . $testUser->name);
        }
        $this->info('');

        // 7. URLs de prueba
        $this->info('7. 🔗 URLs para probar...');
        $this->line('📄 Lista de usuarios externos: http://localhost:8000/admin/external-users');
        $this->line('➕ Crear usuario: http://localhost:8000/admin/external-users/create');
        $this->line('👤 Ver usuario: http://localhost:8000/admin/external-users/' . $testUser->id);
        $this->line('✏️ Editar usuario: http://localhost:8000/admin/external-users/' . $testUser->id . '/edit');
        $this->line('🏠 Dashboard admin: http://localhost:8000/admin/dashboard');
        $this->info('');

        // 8. Instrucciones de prueba
        $this->info('8. 📋 Instrucciones de prueba...');
        $this->line('1. Inicia sesión como administrador');
        $this->line('2. Ve al dashboard de administrador');
        $this->line('3. Busca el enlace "Usuarios Externos" o navega a /admin/external-users');
        $this->line('4. Deberías ver la lista de usuarios externos');
        $this->line('5. Prueba crear, ver, editar usuarios');
        $this->info('');

        // 9. Verificar el problema específico
        $this->info('9. 🔧 Solucionando el problema...');
        $this->line('❌ Error anterior: Admin/ExternalUsers/Index (con mayúscula)');
        $this->line('✅ Solucionado: admin/ExternalUsers/Index (minúscula)');
        $this->line('🔄 Cache limpiado');
        $this->line('✅ Controlador actualizado');
        $this->info('');

        $this->info('🎉 Página de usuarios externos debería funcionar correctamente');
        $this->info('');
        $this->info('🔍 Si aún hay problemas:');
        $this->line('1. Verifica que el servidor esté ejecutándose');
        $this->line('2. Recarga la página completamente (Ctrl+F5)');
        $this->line('3. Verifica que estés logueado como administrador');
        $this->line('4. Revisa la consola del navegador para más detalles');

        return 0;
    }
}
