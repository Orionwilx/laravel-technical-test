<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Usuario externo 1
        \App\Models\User::create([
            'name' => 'Juan Pérez',
            'email' => 'juan.perez@ejemplo.com',
            'password' => bcrypt('password123'),
            'role' => 'external',
            'email_verified_at' => now(),
        ]);

        // Usuario externo 2
        \App\Models\User::create([
            'name' => 'María García',
            'email' => 'maria.garcia@ejemplo.com',
            'password' => bcrypt('password123'),
            'role' => 'external',
            'email_verified_at' => now(),
        ]);

        // Usuario externo 3
        \App\Models\User::create([
            'name' => 'Carlos Rodríguez',
            'email' => 'carlos.rodriguez@ejemplo.com',
            'password' => bcrypt('password123'),
            'role' => 'external',
            'email_verified_at' => now(),
        ]);
    }
}
