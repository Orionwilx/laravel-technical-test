<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestShipmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Envíos para usuario Juan Pérez (ID 2)
        \App\Models\Shipment::create([
            'user_id' => 2,
            'truck_plate' => 'ABC-123',
            'product_name' => 'Cemento Portland',
            'notes' => 'Carga pesada, requiere manejo especial',
            'status' => 'announced',
            'announced_at' => now()->subDays(2),
        ]);

        \App\Models\Shipment::create([
            'user_id' => 2,
            'truck_plate' => 'DEF-456',
            'product_name' => 'Varillas de hierro',
            'notes' => 'Material frágil',
            'status' => 'delivered',
            'announced_at' => now()->subDays(5),
            'delivered_at' => now()->subDays(2),
        ]);

        // Envíos para usuario María García (ID 3)
        \App\Models\Shipment::create([
            'user_id' => 3,
            'truck_plate' => 'GHI-789',
            'product_name' => 'Arena de río',
            'notes' => 'Carga húmeda, proteger de la lluvia',
            'status' => 'announced',
            'announced_at' => now()->subDays(1),
        ]);

        \App\Models\Shipment::create([
            'user_id' => 3,
            'truck_plate' => 'JKL-012',
            'product_name' => 'Bloques de concreto',
            'status' => 'delivered',
            'announced_at' => now()->subDays(7),
            'delivered_at' => now()->subDays(3),
        ]);

        // Envíos para usuario Carlos Rodríguez (ID 4)
        \App\Models\Shipment::create([
            'user_id' => 4,
            'truck_plate' => 'MNO-345',
            'product_name' => 'Grava triturada',
            'notes' => 'Verificar peso máximo del camión',
            'status' => 'announced',
            'announced_at' => now()->subHours(6),
        ]);

        \App\Models\Shipment::create([
            'user_id' => 4,
            'truck_plate' => 'PQR-678',
            'product_name' => 'Cal hidratada',
            'status' => 'delivered',
            'announced_at' => now()->subDays(4),
            'delivered_at' => now()->subDays(1),
        ]);
    }
}
