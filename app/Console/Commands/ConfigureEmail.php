<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ConfigureEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'configure:email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Configure email settings step by step';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔧 Configuración de correo electrónico - Puerto Brisa');
        $this->info('');

        $this->info('📧 Opciones de configuración:');
        $this->line('1. Array (Solo para pruebas - no envía correos reales)');
        $this->line('2. Log (Guarda correos en logs)');
        $this->line('3. SMTP - Gmail');
        $this->line('4. SMTP - Outlook/Hotmail');
        $this->line('5. Mailtrap (Servicio de pruebas)');

        $choice = $this->choice('Selecciona una opción:', [
            '1' => 'Array (pruebas)',
            '2' => 'Log (desarrollo)',
            '3' => 'Gmail SMTP',
            '4' => 'Outlook SMTP',
            '5' => 'Mailtrap'
        ]);

        $envContent = file_get_contents(base_path('.env'));

        switch ($choice) {
            case '1':
                $this->configureArray($envContent);
                break;
            case '2':
                $this->configureLog($envContent);
                break;
            case '3':
                $this->configureGmail($envContent);
                break;
            case '4':
                $this->configureOutlook($envContent);
                break;
            case '5':
                $this->configureMailtrap($envContent);
                break;
        }

        $this->info('');
        $this->info('✅ Configuración completada');
        $this->info('🔄 Ejecuta: php artisan config:clear');
        $this->info('🧪 Prueba con: php artisan test:email-config');

        return 0;
    }

    private function configureArray(&$envContent)
    {
        $this->info('⚙️ Configurando para pruebas (Array)...');

        $envContent = preg_replace('/MAIL_MAILER=.*/', 'MAIL_MAILER=array', $envContent);
        $envContent = preg_replace('/MAIL_HOST=.*/', 'MAIL_HOST=127.0.0.1', $envContent);
        $envContent = preg_replace('/MAIL_PORT=.*/', 'MAIL_PORT=2525', $envContent);
        $envContent = preg_replace('/MAIL_USERNAME=.*/', 'MAIL_USERNAME=null', $envContent);
        $envContent = preg_replace('/MAIL_PASSWORD=.*/', 'MAIL_PASSWORD=null', $envContent);
        $envContent = preg_replace('/MAIL_ENCRYPTION=.*/', 'MAIL_ENCRYPTION=null', $envContent);

        file_put_contents(base_path('.env'), $envContent);

        $this->info('✅ Los correos se almacenarán en memoria para pruebas');
    }

    private function configureLog(&$envContent)
    {
        $this->info('⚙️ Configurando para logs...');

        $envContent = preg_replace('/MAIL_MAILER=.*/', 'MAIL_MAILER=log', $envContent);

        file_put_contents(base_path('.env'), $envContent);

        $this->info('✅ Los correos se guardarán en storage/logs/laravel.log');
    }

    private function configureOutlook(&$envContent)
    {
        $this->info('⚙️ Configurando para Outlook/Hotmail...');

        $email = $this->ask('Email de Outlook/Hotmail:');
        $password = $this->secret('Contraseña de aplicación:');

        $envContent = preg_replace('/MAIL_MAILER=.*/', 'MAIL_MAILER=smtp', $envContent);
        $envContent = preg_replace('/MAIL_HOST=.*/', 'MAIL_HOST=smtp-mail.outlook.com', $envContent);
        $envContent = preg_replace('/MAIL_PORT=.*/', 'MAIL_PORT=587', $envContent);
        $envContent = preg_replace('/MAIL_USERNAME=.*/', 'MAIL_USERNAME=' . $email, $envContent);
        $envContent = preg_replace('/MAIL_PASSWORD=.*/', 'MAIL_PASSWORD=' . $password, $envContent);
        $envContent = preg_replace('/MAIL_ENCRYPTION=.*/', 'MAIL_ENCRYPTION=tls', $envContent);

        file_put_contents(base_path('.env'), $envContent);

        $this->info('✅ Configurado para Outlook SMTP');
        $this->warn('⚠️ Asegúrate de usar una contraseña de aplicación, no tu contraseña normal');
    }

    private function configureGmail(&$envContent)
    {
        $this->info('⚙️ Configurando para Gmail...');

        $email = $this->ask('Email de Gmail:');
        $password = $this->secret('Contraseña de aplicación:');

        $envContent = preg_replace('/MAIL_MAILER=.*/', 'MAIL_MAILER=smtp', $envContent);
        $envContent = preg_replace('/MAIL_HOST=.*/', 'MAIL_HOST=smtp.gmail.com', $envContent);
        $envContent = preg_replace('/MAIL_PORT=.*/', 'MAIL_PORT=587', $envContent);
        $envContent = preg_replace('/MAIL_USERNAME=.*/', 'MAIL_USERNAME=' . $email, $envContent);
        $envContent = preg_replace('/MAIL_PASSWORD=.*/', 'MAIL_PASSWORD=' . $password, $envContent);
        $envContent = preg_replace('/MAIL_ENCRYPTION=.*/', 'MAIL_ENCRYPTION=tls', $envContent);

        file_put_contents(base_path('.env'), $envContent);

        $this->info('✅ Configurado para Gmail SMTP');
        $this->warn('⚠️ Debes activar 2FA y usar una contraseña de aplicación');
    }

    private function configureMailtrap(&$envContent)
    {
        $this->info('⚙️ Configurando para Mailtrap...');

        $username = $this->ask('Usuario de Mailtrap:');
        $password = $this->secret('Contraseña de Mailtrap:');

        $envContent = preg_replace('/MAIL_MAILER=.*/', 'MAIL_MAILER=smtp', $envContent);
        $envContent = preg_replace('/MAIL_HOST=.*/', 'MAIL_HOST=sandbox.smtp.mailtrap.io', $envContent);
        $envContent = preg_replace('/MAIL_PORT=.*/', 'MAIL_PORT=2525', $envContent);
        $envContent = preg_replace('/MAIL_USERNAME=.*/', 'MAIL_USERNAME=' . $username, $envContent);
        $envContent = preg_replace('/MAIL_PASSWORD=.*/', 'MAIL_PASSWORD=' . $password, $envContent);
        $envContent = preg_replace('/MAIL_ENCRYPTION=.*/', 'MAIL_ENCRYPTION=tls', $envContent);

        file_put_contents(base_path('.env'), $envContent);

        $this->info('✅ Configurado para Mailtrap');
        $this->info('🔗 Revisa tus correos en: https://mailtrap.io');
    }
}
