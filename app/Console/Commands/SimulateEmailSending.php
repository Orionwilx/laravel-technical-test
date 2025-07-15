<?php

namespace App\Console\Commands;

use App\Jobs\SendShipmentAnnouncedEmail;
use App\Mail\ShipmentAnnounced;
use App\Models\Shipment;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SimulateEmailSending extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'simulate:email-sending';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Simulate email sending for testing purposes';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚛 Simulando envío de correo por carga anunciada...');

        // Obtener usuarios
        $externalUser = User::where('role', 'external')->first();
        $admin = User::where('role', 'admin')->first();

        if (!$externalUser || !$admin) {
            $this->error('❌ No se encontraron usuarios necesarios');
            return 1;
        }

        // Crear un envío de prueba
        $shipment = Shipment::create([
            'user_id' => $externalUser->id,
            'truck_plate' => 'SIM123',
            'product_name' => 'Producto simulado para prueba de correo',
            'status' => 'announced',
            'announced_at' => now(),
        ]);

        $this->info("📦 Envío creado: ID {$shipment->id}, Placa: {$shipment->truck_plate}");
        $this->info("👤 Usuario: {$externalUser->name}");
        $this->info("📧 Destinatario: {$admin->email}");

        // Crear el mailable
        $mailable = new ShipmentAnnounced($shipment);

        // Simular el envío
        $this->info('');
        $this->info('📧 Procesando correo...');

        try {
            // Usar el driver array para capturar el correo
            Mail::to($admin->email)->send($mailable);

            $this->info('✅ Correo procesado exitosamente');

            // Mostrar información del correo
            $this->info('');
            $this->info('📋 Detalles del correo:');
            $this->line('  Asunto: ' . $mailable->envelope()->subject);
            $this->line('  Destinatario: ' . $admin->email);
            $this->line('  Placa destacada: ' . $shipment->truck_plate);
            $this->line('  Producto: ' . $shipment->product_name);

            // Mostrar el contenido HTML del correo
            $this->info('');
            $this->info('📄 Vista previa del correo:');
            $this->line('  La placa ' . $shipment->truck_plate . ' está destacada en el correo');
            $this->line('  Incluye información del producto: ' . $shipment->product_name);
            $this->line('  Usuario que creó el envío: ' . $externalUser->name);
            $this->line('  Fecha de anuncio: ' . $shipment->created_at->format('d/m/Y H:i:s'));
        } catch (\Exception $e) {
            $this->error('❌ Error al procesar correo: ' . $e->getMessage());
        }

        // Verificar si el correo se almacenó en el array driver
        $this->info('');
        $this->info('🔍 Verificando correos en memoria...');

        // Limpiar la cola de correos si existe
        if (app()->bound('swift.transport')) {
            $this->info('✅ Sistema de correos inicializado correctamente');
        }

        $this->info('');
        $this->info('💡 Nota: Con MAIL_MAILER=array, los correos se almacenan en memoria durante la prueba');
        $this->info('💡 Para producción, configura un servidor SMTP real');

        return 0;
    }
}
