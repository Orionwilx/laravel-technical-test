<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipment>
 */
class ShipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'truck_plate' => strtoupper(fake()->bothify('???###')),
            'product_name' => fake()->words(3, true),
            'status' => fake()->randomElement(['announced', 'delivered']),
            'notes' => fake()->sentence(),
            'announced_at' => now(),
            'delivered_at' => fake()->optional()->dateTimeBetween('now', '+1 week'),
        ];
    }
}
