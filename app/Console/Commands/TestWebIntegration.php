<?php

namespace App\Console\Commands;

use App\Models\Shipment;
use App\Models\User;
use App\Jobs\SendShipmentAnnouncedEmail;
use App\Mail\ShipmentAnnounced;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;

class TestWebIntegration extends Command
{
    protected $signature = 'test:web-integration';
    protected $description = 'Test the complete web integration for email sending';

    public function handle()
    {
        $this->info('🧪 Probando integración completa del sistema de correo...');
        $this->info('');

        // 1. Verificar configuración de email
        $this->info('1. 📧 Verificando configuración de email...');
        $this->line('MAIL_MAILER: ' . config('mail.default'));
        $this->line('MAIL_HOST: ' . config('mail.mailers.smtp.host'));
        $this->line('MAIL_FROM_ADDRESS: ' . config('mail.from.address'));
        $this->info('');

        // 2. Verificar usuario admin
        $this->info('2. 👤 Verificando usuario administrador...');
        $admin = User::where('role', 'admin')->first();
        if ($admin) {
            $this->line('✅ Admin encontrado: ' . $admin->name . ' (' . $admin->email . ')');
        } else {
            $this->warn('⚠️ No se encontró usuario admin');
        }
        $this->info('');

        // 3. Simular creación de envío
        $this->info('3. 📦 Simulando creación de envío...');
        $shipment = new Shipment([
            'truck_plate' => 'TEST123',
            'product_name' => 'Producto de prueba web',
            'user_id' => $admin ? $admin->id : 1
        ]);
        $shipment->save();
        $this->line('✅ Envío creado: ID ' . $shipment->id . ', Placa: ' . $shipment->truck_plate);
        $this->info('');

        // 4. Probar envío directo (sin cola)
        $this->info('4. 📧 Probando envío directo (sin cola)...');
        try {
            $adminEmail = $admin ? $admin->email : config('mail.from.address');
            Mail::to($adminEmail)->send(new ShipmentAnnounced($shipment));
            $this->line('✅ Correo enviado directamente a: ' . $adminEmail);
        } catch (\Exception $e) {
            $this->error('❌ Error en envío directo: ' . $e->getMessage());
        }
        $this->info('');

        // 5. Probar con cola
        $this->info('5. 🔄 Probando envío con cola...');
        try {
            $adminEmail = $admin ? $admin->email : config('mail.from.address');
            SendShipmentAnnouncedEmail::dispatch($shipment, $adminEmail);
            $this->line('✅ Job enviado a la cola');

            // Procesar el job inmediatamente
            $this->info('6. ⚡ Procesando job de cola...');
            $this->call('queue:work', ['--once' => true]);
            $this->line('✅ Job procesado');
        } catch (\Exception $e) {
            $this->error('❌ Error en cola: ' . $e->getMessage());
        }
        $this->info('');

        // 7. Verificar en Mailtrap
        $this->info('7. 🔍 Verificación final:');
        $this->line('📧 Revisa tu cuenta de Mailtrap en: https://mailtrap.io');
        $this->line('📋 Deberías ver un correo con:');
        $this->line('   - Asunto: "Carga anunciada"');
        $this->line('   - Placa: TEST123');
        $this->line('   - Producto: Producto de prueba web');
        $this->line('   - Destinatario: ' . ($admin ? $admin->email : 'Admin no encontrado'));
        $this->info('');

        $this->info('✅ Prueba completada');
        return 0;
    }
}
