<?php

namespace App\Console\Commands;

use App\Models\Shipment;
use App\Models\User;
use App\Jobs\SendShipmentAnnouncedEmail;
use Illuminate\Console\Command;

class TestEmailSystem extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:email-system';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the email system by creating a shipment and sending notification';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚛 Probando el sistema de envío de correos...');

        // Obtener un usuario externo
        $externalUser = User::where('role', 'external')->first();

        if (!$externalUser) {
            $this->error('No se encontró ningún usuario externo.');
            return 1;
        }

        // Obtener el administrador
        $admin = User::where('role', 'admin')->first();

        if (!$admin) {
            $this->error('No se encontró ningún usuario administrador.');
            return 1;
        }

        $this->info("👤 Usuario externo: {$externalUser->name} ({$externalUser->email})");
        $this->info("👨‍💼 Administrador: {$admin->name} ({$admin->email})");

        // Crear un envío de prueba
        $shipment = Shipment::create([
            'user_id' => $externalUser->id,
            'truck_plate' => 'TEST123',
            'product_name' => 'Producto de prueba para correo',
            'status' => 'announced',
            'announced_at' => now(),
        ]);

        $this->info("📦 Envío creado: ID {$shipment->id}, Placa: {$shipment->truck_plate}");

        // Despachar el job de correo
        SendShipmentAnnouncedEmail::dispatch($shipment, $admin->email);

        $this->info("📧 Job de correo despachado a la cola");

        // Procesar la cola
        $this->info("⚙️ Procesando cola...");
        $this->call('queue:work', ['--once' => true, '--verbose' => true]);

        $this->info("✅ Proceso completado!");
        $this->info("📧 El correo debería haberse enviado a: {$admin->email}");
        $this->info("🔍 Revisa los logs en storage/logs/laravel.log");

        return 0;
    }
}
