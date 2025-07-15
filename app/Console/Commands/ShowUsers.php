<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ShowUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:show {role?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Show users by role';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $role = $this->argument('role');

        $query = User::query();

        if ($role) {
            $query->where('role', $role);
            $this->info("Usuarios con rol '{$role}':");
        } else {
            $this->info("Todos los usuarios:");
        }

        $users = $query->get(['id', 'name', 'email', 'role']);

        if ($users->count() === 0) {
            $this->warn('No se encontraron usuarios.');
            return 0;
        }

        foreach ($users as $user) {
            $this->line("ID: {$user->id}, Nombre: {$user->name}, Email: {$user->email}, Rol: {$user->role}");
        }

        return 0;
    }
}
