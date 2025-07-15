<?php

namespace Tests\Feature;

use App\Models\Shipment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShipmentExportTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_admin_can_export_shipments_to_csv()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        // Crear algunos envíos de prueba
        Shipment::factory()->count(3)->create();

        $response = $this->actingAs($admin)->get('/shipments/export/excel');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/csv; charset=utf-8');
        $this->assertStringContainsString('attachment; filename="Envios_', $response->headers->get('Content-Disposition'));
    }

    public function test_external_user_cannot_export_shipments()
    {
        $externalUser = User::factory()->create(['role' => 'external']);

        $response = $this->actingAs($externalUser)->get('/shipments/export/excel');

        $response->assertStatus(403);
    }

    public function test_unauthenticated_user_cannot_export_shipments()
    {
        $response = $this->get('/shipments/export/excel');

        $response->assertRedirect('/login');
    }

    public function test_export_includes_correct_data()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create(['name' => 'Juan Perez', 'email' => 'juan@example.com']);

        $shipment = Shipment::factory()->create([
            'user_id' => $user->id,
            'truck_plate' => 'ABC123',
            'product_name' => 'Test Product'
        ]);

        $response = $this->actingAs($admin)->get('/shipments/export/excel');

        $response->assertStatus(200);

        $content = $response->getContent();
        $this->assertStringContainsString('ABC123', $content);
        $this->assertStringContainsString('Test Product', $content);
        $this->assertStringContainsString('Juan Perez', $content);
        $this->assertStringContainsString('juan@example.com', $content);
    }
}
