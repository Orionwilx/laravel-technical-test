<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class UpdateAdminEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:update-email {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the admin user email address';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $newEmail = $this->argument('email');

        // Buscar el primer usuario administrador
        $admin = User::where('role', 'admin')->first();

        if (!$admin) {
            $this->error('No se encontró ningún usuario administrador.');
            return 1;
        }

        $oldEmail = $admin->email;

        // Actualizar el email
        $admin->update([
            'email' => $newEmail,
            'email_verified_at' => now(), // Mantener verificado
        ]);

        $this->info("Email del administrador actualizado:");
        $this->info("Anterior: {$oldEmail}");
        $this->info("Nuevo: {$newEmail}");
        $this->info("Usuario: {$admin->name} (ID: {$admin->id})");

        return 0;
    }
}
