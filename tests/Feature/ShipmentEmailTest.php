<?php

namespace Tests\Feature;

use App\Jobs\SendShipmentAnnouncedEmail;
use App\Mail\ShipmentAnnounced;
use App\Models\Shipment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class ShipmentEmailTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Configurar el entorno para pruebas
        Mail::fake();
        Queue::fake();
    }

    /** @test */
    public function external_user_creating_shipment_dispatches_email_job()
    {
        // Crear usuarios
        $admin = User::factory()->create(['role' => 'admin']);
        $externalUser = User::factory()->create(['role' => 'external']);

        // Autenticarse como usuario externo
        $this->actingAs($externalUser);

        // Crear un envío
        $shipmentData = [
            'truck_plate' => 'ABC123',
            'product_name' => 'Producto de prueba'
        ];

        $response = $this->post(route('shipments.store'), $shipmentData);

        $response->assertRedirect(route('shipments.index'));
        $response->assertSessionHas('success', 'Envío anunciado exitosamente.');

        // Verificar que el job fue despachado
        Queue::assertPushed(SendShipmentAnnouncedEmail::class);
    }

    /** @test */
    public function shipment_announced_email_job_sends_correct_email()
    {
        // Crear usuarios
        $admin = User::factory()->create(['role' => 'admin']);
        $externalUser = User::factory()->create(['role' => 'external']);

        // Crear un envío
        $shipment = Shipment::factory()->create([
            'user_id' => $externalUser->id,
            'truck_plate' => 'XYZ789',
            'product_name' => 'Producto de prueba'
        ]);

        // Ejecutar el job
        $job = new SendShipmentAnnouncedEmail($shipment, $admin->email);
        $job->handle();

        // Verificar que el correo fue enviado
        Mail::assertSent(ShipmentAnnounced::class, function ($mail) use ($admin, $shipment) {
            return $mail->hasTo($admin->email) && $mail->shipment->id === $shipment->id;
        });
    }

    /** @test */
    public function shipment_announced_email_has_correct_subject()
    {
        // Crear usuarios
        $externalUser = User::factory()->create(['role' => 'external']);

        // Crear un envío
        $shipment = Shipment::factory()->create([
            'user_id' => $externalUser->id,
            'truck_plate' => 'TEST123',
            'product_name' => 'Producto de prueba'
        ]);

        // Crear el mailable
        $mailable = new ShipmentAnnounced($shipment);

        // Verificar el asunto
        $this->assertEquals('Carga anunciada', $mailable->envelope()->subject);
    }

    /** @test */
    public function shipment_announced_email_contains_license_plate()
    {
        // Crear usuarios
        $externalUser = User::factory()->create(['role' => 'external']);

        // Crear un envío
        $shipment = Shipment::factory()->create([
            'user_id' => $externalUser->id,
            'truck_plate' => 'ABC456',
            'product_name' => 'Producto de prueba'
        ]);

        // Crear el mailable
        $mailable = new ShipmentAnnounced($shipment);

        // Renderizar el contenido del correo
        $mailable->assertSeeInHtml('ABC456');
    }

    /** @test */
    public function admin_user_creating_shipment_also_dispatches_email()
    {
        // Crear usuarios
        $admin = User::factory()->create(['role' => 'admin']);

        // Autenticarse como admin
        $this->actingAs($admin);

        // Crear un envío
        $shipmentData = [
            'truck_plate' => 'ABC123',
            'product_name' => 'Producto de admin'
        ];

        $response = $this->post(route('shipments.store'), $shipmentData);

        $response->assertRedirect(route('shipments.index'));

        // Verificar que el job fue despachado incluso para admin
        Queue::assertPushed(SendShipmentAnnouncedEmail::class);
    }
}
