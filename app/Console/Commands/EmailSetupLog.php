<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class EmailSetupLog extends Command
{
    protected $signature = 'email:setup-log';
    protected $description = 'Setup log driver for email (development only)';

    public function handle()
    {
        $this->info('⚙️ Configurando para modo desarrollo (log)...');

        $envPath = base_path('.env');
        $envContent = file_get_contents($envPath);

        // Actualizar configuración
        $envContent = $this->updateEnvValue($envContent, 'MAIL_MAILER', 'log');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_ADDRESS', 'wilman3d@hotmail.com');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_NAME', 'Puerto Brisa');

        file_put_contents($envPath, $envContent);

        $this->info('✅ Configurado para desarrollo (log)');
        $this->info('📄 Los correos se guardarán en: storage/logs/laravel.log');
        $this->info('🔄 Ejecuta: php artisan config:clear');
        $this->info('🧪 Prueba con: php artisan test:email-config');

        return 0;
    }

    private function updateEnvValue($envContent, $key, $value)
    {
        $pattern = "/^{$key}=.*$/m";
        $replacement = "{$key}={$value}";

        if (preg_match($pattern, $envContent)) {
            return preg_replace($pattern, $replacement, $envContent);
        } else {
            return $envContent . "\n{$replacement}";
        }
    }
}
