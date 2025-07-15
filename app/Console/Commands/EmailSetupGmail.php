<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class EmailSetupGmail extends Command
{
    protected $signature = 'email:setup-gmail {email} {password}';
    protected $description = 'Setup Gmail SMTP configuration';

    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->argument('password');

        $this->info('⚙️ Configurando Gmail para: ' . $email);

        $envPath = base_path('.env');
        $envContent = file_get_contents($envPath);

        // Actualizar configuración
        $envContent = $this->updateEnvValue($envContent, 'MAIL_MAILER', 'smtp');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_HOST', 'smtp.gmail.com');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PORT', '587');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_USERNAME', $email);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PASSWORD', $password);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_ENCRYPTION', 'tls');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_ADDRESS', 'wilman3d@hotmail.com');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_NAME', 'Puerto Brisa');

        file_put_contents($envPath, $envContent);

        $this->info('✅ Gmail configurado correctamente');
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
