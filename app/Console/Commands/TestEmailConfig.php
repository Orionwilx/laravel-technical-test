<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmailConfig extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:email-config';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email configuration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔧 Probando configuración de correo...');

        // Mostrar configuración actual
        $this->info('📋 Configuración actual:');
        $this->line('MAIL_MAILER: ' . config('mail.default'));
        $this->line('MAIL_HOST: ' . config('mail.mailers.smtp.host'));
        $this->line('MAIL_PORT: ' . config('mail.mailers.smtp.port'));
        $this->line('MAIL_USERNAME: ' . config('mail.mailers.smtp.username'));
        $this->line('MAIL_FROM_ADDRESS: ' . config('mail.from.address'));
        $this->line('MAIL_FROM_NAME: ' . config('mail.from.name'));

        // Intentar enviar un correo de prueba
        $this->info('');
        $this->info('📧 Enviando correo de prueba...');

        try {
            Mail::raw('Este es un correo de prueba del sistema Puerto Brisa', function ($message) {
                $message->to('wilman3d@hotmail.com')
                    ->subject('Prueba de correo - Puerto Brisa');
            });

            $this->info('✅ Correo enviado exitosamente');
        } catch (\Exception $e) {
            $this->error('❌ Error al enviar correo: ' . $e->getMessage());

            // Sugerencias según el error
            if (str_contains($e->getMessage(), 'Connection refused')) {
                $this->warn('💡 Sugerencia: Verificar configuración del servidor SMTP');
            } elseif (str_contains($e->getMessage(), 'Authentication failed')) {
                $this->warn('💡 Sugerencia: Verificar credenciales de correo');
            } elseif (str_contains($e->getMessage(), 'SSL')) {
                $this->warn('💡 Sugerencia: Verificar configuración SSL/TLS');
            }
        }

        return 0;
    }
}
