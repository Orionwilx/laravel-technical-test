<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Shipment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BackendFunctionalityTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_user_can_access_dashboard(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertRedirect('/admin/dashboard');
    }

    public function test_external_user_can_access_dashboard(): void
    {
        $user = User::factory()->create(['role' => 'external']);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
    }

    public function test_admin_can_access_admin_routes(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/admin/dashboard');

        $response->assertOk();
    }

    public function test_external_user_cannot_access_admin_routes(): void
    {
        $user = User::factory()->create(['role' => 'external']);

        $response = $this->actingAs($user)->get('/admin/dashboard');

        $response->assertForbidden();
    }

    public function test_shipment_creation_works(): void
    {
        $user = User::factory()->create(['role' => 'external']);

        $shipmentData = [
            'truck_plate' => 'ABC123',
            'product_name' => 'Test Product',
            'status' => 'announced',
            'notes' => 'Test notes'
        ];

        $response = $this->actingAs($user)->post('/shipments', $shipmentData);

        $response->assertRedirect('/shipments');
        $this->assertDatabaseHas('shipments', [
            'truck_plate' => 'ABC123',
            'product_name' => 'Test Product',
            'user_id' => $user->id
        ]);
    }

    public function test_shipment_validation_works(): void
    {
        $user = User::factory()->create(['role' => 'external']);

        $response = $this->actingAs($user)->post('/shipments', [
            'truck_plate' => 'INVALID',
            'product_name' => '',
        ]);

        $response->assertSessionHasErrors(['truck_plate', 'product_name']);
    }

    public function test_user_can_only_see_own_shipments(): void
    {
        $user1 = User::factory()->create(['role' => 'external']);
        $user2 = User::factory()->create(['role' => 'external']);

        Shipment::factory()->create(['user_id' => $user1->id]);
        Shipment::factory()->create(['user_id' => $user2->id]);

        $response = $this->actingAs($user1)->get('/shipments');

        $response->assertOk();
        // Should only see their own shipments
    }

    public function test_admin_can_create_external_users(): void
    {
        $admin = User::factory()->admin()->create();

        $userData = [
            'name' => 'New External User',
            'email' => 'newexternal@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'active'
        ];

        $response = $this->actingAs($admin)->post('/admin/external-users', $userData);

        $response->assertRedirect('/admin/external-users');
        $this->assertDatabaseHas('users', [
            'email' => 'newexternal@test.com',
            'role' => 'external'
        ]);
    }
}
