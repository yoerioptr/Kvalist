<?php

namespace Database\Factories;

use App\Models\ProductWeight;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Product;
use App\Models\Store;
use App\Models\User;

/**
 * @extends Factory<ProductWeight>
 */
final class ProductWeightFactory extends Factory
{
    #[\Override]
    public function definition(): array
    {
        return [
            'store_id' => Store::factory(),
            'product_id' => Product::factory(),
            'weight' => $this->faker->numberBetween(100, 5000),
            'created_by' => User::factory(),
        ];
    }
}
