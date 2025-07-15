<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class TestUserCreation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:user-creation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prueba la creación de usuarios admin y externos';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Prueba de creación de usuarios ===');

        // Test 1: Crear usuario externo
        $this->info('1. Creando usuario externo...');
        try {
            $externalUser = User::create([
                'name' => 'Test External User',
                'email' => 'external@test.com',
                'password' => Hash::make('password123'),
                'role' => 'external',
                'company_name' => 'Test Company',
                'phone' => '123456789',
                'status' => 'active',
            ]);
            $this->info("✓ Usuario externo creado: {$externalUser->name} (ID: {$externalUser->id})");
        } catch (\Exception $e) {
            $this->error("✗ Error creando usuario externo: {$e->getMessage()}");
        }

        // Test 2: Crear usuario admin
        $this->info('2. Creando usuario admin...');
        try {
            $adminUser = User::create([
                'name' => 'Test Admin User',
                'email' => 'admin@test.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'status' => 'active',
            ]);
            $this->info("✓ Usuario admin creado: {$adminUser->name} (ID: {$adminUser->id})");
        } catch (\Exception $e) {
            $this->error("✗ Error creando usuario admin: {$e->getMessage()}");
        }

        // Test 3: Verificar estructura de la tabla
        $this->info('3. Verificando estructura de la tabla users...');
        $columns = Schema::getColumnListing('users');
        $this->info('Columnas disponibles: ' . implode(', ', $columns));

        // Test 4: Mostrar usuarios existentes
        $this->info('4. Usuarios existentes:');
        $users = User::all();
        foreach ($users as $user) {
            $this->info("- {$user->name} ({$user->email}) - Rol: {$user->role}");
        }

        $this->info('=== Prueba completada ===');
    }
}
