<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ColombianPlateValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_valid_colombian_plates_are_accepted(): void
    {
        $user = User::factory()->create(['role' => 'external']);

        $validPlates = [
            'ABC-123', // Formato antiguo
            'ABC12D',  // Formato nuevo
            'ABC123',  // Formato básico
            'XYZ-456',
            'DEF99Z',
            'GHI789'
        ];

        foreach ($validPlates as $plate) {
            $response = $this->actingAs($user)->post('/shipments', [
                'truck_plate' => $plate,
                'product_name' => 'Test Product',
                'notes' => 'Test notes'
            ]);

            $response->assertRedirect('/shipments');
            $this->assertDatabaseHas('shipments', [
                'truck_plate' => $plate,
                'user_id' => $user->id
            ]);
        }
    }

    public function test_invalid_colombian_plates_are_rejected(): void
    {
        $user = User::factory()->create(['role' => 'external']);

        $invalidPlates = [
            'ABCD-123',  // Muy largo
            'AB-123',    // Muy corto
            'ABC-12',    // Números insuficientes
            'ABC-1234',  // Números excesivos
            'abc-123',   // Minúsculas
            '123-ABC',   // Formato incorrecto
            'ABC12',     // Formato incompleto
            'ABC123D',   // Formato incorrecto
            '',          // Vacío
            'A1B-123',   // Letras y números mezclados incorrectamente
        ];

        foreach ($invalidPlates as $plate) {
            $response = $this->actingAs($user)->post('/shipments', [
                'truck_plate' => $plate,
                'product_name' => 'Test Product',
                'notes' => 'Test notes'
            ]);

            $response->assertSessionHasErrors(['truck_plate']);
        }
    }

    public function test_plate_validation_error_message_is_in_spanish(): void
    {
        $user = User::factory()->create(['role' => 'external']);

        $response = $this->actingAs($user)->post('/shipments', [
            'truck_plate' => 'INVALID',
            'product_name' => 'Test Product',
        ]);

        $response->assertSessionHasErrors(['truck_plate']);

        $errors = session('errors')->get('truck_plate');
        $this->assertStringContainsString('formato válido colombiano', $errors[0]);
    }
}
