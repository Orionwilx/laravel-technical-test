<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class EmailSetupMailtrap extends Command
{
    protected $signature = 'email:setup-mailtrap {username} {password}';
    protected $description = 'Setup Mailtrap SMTP configuration';

    public function handle()
    {
        $username = $this->argument('username');
        $password = $this->argument('password');

        $this->info('⚙️ Configurando Mailtrap...');

        $envPath = base_path('.env');
        $envContent = file_get_contents($envPath);

        // Actualizar configuración
        $envContent = $this->updateEnvValue($envContent, 'MAIL_MAILER', 'smtp');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_HOST', 'sandbox.smtp.mailtrap.io');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PORT', '2525');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_USERNAME', $username);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PASSWORD', $password);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_ENCRYPTION', 'tls');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_ADDRESS', 'wilman3d@hotmail.com');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_NAME', 'Puerto Brisa');

        file_put_contents($envPath, $envContent);

        $this->info('✅ Mailtrap configurado correctamente');
        $this->info('🔗 Revisa tus correos en: https://mailtrap.io');
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
