<?php

namespace Database\Factories;

use App\Models\Basket;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Store;
use App\Models\User;

/**
 * @extends Factory<Basket>
 */
final class BasketFactory extends Factory
{
    #[\Override]
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'created_by' => User::factory(),
            'store_id' => Store::factory(),
        ];
    }
}
