<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class EmailSetupOutlook extends Command
{
    protected $signature = 'email:setup-outlook {email} {password}';
    protected $description = 'Setup Outlook SMTP configuration for real email delivery';

    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->argument('password');

        $this->info('⚙️ Configurando Outlook para envío real: ' . $email);

        $envPath = base_path('.env');
        $envContent = file_get_contents($envPath);

        // Actualizar configuración
        $envContent = $this->updateEnvValue($envContent, 'MAIL_MAILER', 'smtp');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_HOST', 'smtp-mail.outlook.com');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PORT', '587');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_USERNAME', $email);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PASSWORD', $password);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_ENCRYPTION', 'tls');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_ADDRESS', $email);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_NAME', '"Puerto Brisa"');

        file_put_contents($envPath, $envContent);

        $this->info('✅ Outlook configurado para envío real');
        $this->warn('⚠️ Recuerda usar una contraseña de aplicación, no tu contraseña normal');
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
