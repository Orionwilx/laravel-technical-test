<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CheckEmailRecipient extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:email-recipient';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check who will receive the shipment announcement emails';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔍 Verificando destinatario de correos de envío...');

        // Simular la lógica del controlador
        $adminEmail = User::where('role', 'admin')->first()?->email ?? config('mail.from.address');

        $admin = User::where('role', 'admin')->first();

        if ($admin) {
            $this->info("✅ Usuario administrador encontrado:");
            $this->info("   Nombre: {$admin->name}");
            $this->info("   Email: {$admin->email}");
            $this->info("   Rol: {$admin->role}");
        } else {
            $this->warn("⚠️ No se encontró usuario administrador");
            $this->info("   Usando email por defecto: " . config('mail.from.address'));
        }

        $this->info("");
        $this->info("📧 Los correos de 'Carga anunciada' se enviarán a: {$adminEmail}");

        return 0;
    }
}
