<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;

/**
 * @extends Factory<Product>
 */
final class ProductFactory extends Factory
{
    #[\Override]
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'created_by' => User::factory(),
        ];
    }
}
