<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Shipment;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear usuario externo de prueba
        $externalUser = User::factory()->create([
            'name' => 'Usuario Externo Test',
            'email' => 'externo@test.com',
            'role' => 'external'
        ]);

        // Crear algunos envíos de prueba
        Shipment::create([
            'user_id' => $externalUser->id,
            'truck_plate' => 'ABC123',
            'product_name' => 'Producto Test 1',
            'status' => 'announced',
            'notes' => 'Envío de prueba 1'
        ]);

        Shipment::create([
            'user_id' => $externalUser->id,
            'truck_plate' => 'DEF456',
            'product_name' => 'Producto Test 2',
            'status' => 'delivered',
            'notes' => 'Envío de prueba 2'
        ]);

        echo "✓ Usuario externo creado: {$externalUser->name} ({$externalUser->email})\n";
        echo "✓ Envíos creados: " . Shipment::count() . "\n";
    }
}
