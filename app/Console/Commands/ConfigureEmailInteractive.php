<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ConfigureEmailInteractive extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:configure-interactive';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Configure email settings interactively with proper credentials';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔧 Configuración Interactiva de Correo - Puerto Brisa');
        $this->info('');

        $this->info('📧 Para que funcione el correo, necesitas:');
        $this->line('1. Una cuenta de email real (Gmail, Outlook, etc.)');
        $this->line('2. Contraseña de aplicación (no la contraseña normal)');
        $this->line('3. Activar autenticación de dos factores');
        $this->info('');

        $service = $this->choice('¿Qué servicio de email quieres usar?', [
            'gmail' => 'Gmail',
            'outlook' => 'Outlook/Hotmail',
            'mailtrap' => 'Mailtrap (solo pruebas)',
            'log' => 'Log (desarrollo)'
        ]);

        $envPath = base_path('.env');
        $envContent = file_get_contents($envPath);

        switch ($service) {
            case 'gmail':
                $this->configureGmailInteractive($envContent);
                break;
            case 'outlook':
                $this->configureOutlookInteractive($envContent);
                break;
            case 'mailtrap':
                $this->configureMailtrapInteractive($envContent);
                break;
            case 'log':
                $this->configureLogInteractive($envContent);
                break;
        }

        file_put_contents($envPath, $envContent);

        $this->info('');
        $this->info('✅ Configuración guardada en .env');
        $this->info('🔄 Ejecuta: php artisan config:clear');
        $this->info('🧪 Prueba con: php artisan test:email-config');

        return 0;
    }

    private function configureGmailInteractive(&$envContent)
    {
        $this->info('⚙️ Configurando Gmail...');
        $this->info('');
        $this->warn('⚠️ IMPORTANTE: Debes usar una contraseña de aplicación, no tu contraseña normal');
        $this->info('📖 Cómo obtener contraseña de aplicación:');
        $this->line('1. Ve a https://myaccount.google.com/security');
        $this->line('2. Activa la verificación en 2 pasos');
        $this->line('3. Genera una contraseña de aplicación');
        $this->info('');

        $fromEmail = $this->ask('Tu email de Gmail:', 'wilman3d@gmail.com');
        $username = $this->ask('Usuario SMTP (normalmente el mismo email):', $fromEmail);
        $password = $this->secret('Contraseña de aplicación (16 caracteres):');

        $envContent = $this->updateEnvValue($envContent, 'MAIL_MAILER', 'smtp');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_HOST', 'smtp.gmail.com');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PORT', '587');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_USERNAME', $username);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PASSWORD', $password);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_ENCRYPTION', 'tls');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_ADDRESS', $fromEmail);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_NAME', 'Puerto Brisa');

        $this->info('✅ Gmail configurado');
    }

    private function configureOutlookInteractive(&$envContent)
    {
        $this->info('⚙️ Configurando Outlook/Hotmail...');
        $this->info('');
        $this->warn('⚠️ IMPORTANTE: Debes usar una contraseña de aplicación');
        $this->info('📖 Cómo obtener contraseña de aplicación:');
        $this->line('1. Ve a https://account.microsoft.com/security');
        $this->line('2. Activa la verificación en 2 pasos');
        $this->line('3. Genera una contraseña de aplicación');
        $this->info('');

        $fromEmail = $this->ask('Tu email de Outlook/Hotmail:', 'wilman3d@hotmail.com');
        $username = $this->ask('Usuario SMTP (normalmente el mismo email):', $fromEmail);
        $password = $this->secret('Contraseña de aplicación:');

        $envContent = $this->updateEnvValue($envContent, 'MAIL_MAILER', 'smtp');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_HOST', 'smtp-mail.outlook.com');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PORT', '587');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_USERNAME', $username);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PASSWORD', $password);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_ENCRYPTION', 'tls');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_ADDRESS', $fromEmail);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_NAME', 'Puerto Brisa');

        $this->info('✅ Outlook configurado');
    }

    private function configureMailtrapInteractive(&$envContent)
    {
        $this->info('⚙️ Configurando Mailtrap...');
        $this->info('');
        $this->info('📖 Cómo obtener credenciales de Mailtrap:');
        $this->line('1. Ve a https://mailtrap.io');
        $this->line('2. Crea una cuenta gratuita');
        $this->line('3. Crea un inbox');
        $this->line('4. Copia las credenciales SMTP');
        $this->info('');

        $username = $this->ask('Usuario de Mailtrap:');
        $password = $this->secret('Contraseña de Mailtrap:');

        $envContent = $this->updateEnvValue($envContent, 'MAIL_MAILER', 'smtp');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_HOST', 'sandbox.smtp.mailtrap.io');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PORT', '2525');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_USERNAME', $username);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_PASSWORD', $password);
        $envContent = $this->updateEnvValue($envContent, 'MAIL_ENCRYPTION', 'tls');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_ADDRESS', 'wilman3d@hotmail.com');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_NAME', 'Puerto Brisa');

        $this->info('✅ Mailtrap configurado');
        $this->info('🔗 Revisa tus correos en: https://mailtrap.io');
    }

    private function configureLogInteractive(&$envContent)
    {
        $this->info('⚙️ Configurando para desarrollo (Log)...');

        $envContent = $this->updateEnvValue($envContent, 'MAIL_MAILER', 'log');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_ADDRESS', 'wilman3d@hotmail.com');
        $envContent = $this->updateEnvValue($envContent, 'MAIL_FROM_NAME', 'Puerto Brisa');

        $this->info('✅ Configurado para logs');
        $this->info('📄 Los correos se guardarán en: storage/logs/laravel.log');
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
