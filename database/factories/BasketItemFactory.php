<?php

namespace Database\Factories;

use App\Models\Basket;
use App\Models\BasketItem;
use App\Models\Product;
use App\Models\User;
use App\Utils\Enum\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BasketItem>
 */
final class BasketItemFactory extends Factory
{
    #[\Override]
    public function definition(): array
    {
        return [
            'basket_id' => Basket::factory(),
            'product_id' => Product::factory(),
            'amount' => $this->faker->numberBetween(1, 10),
            'unit' => $this->faker->randomElement(Unit::cases()),
            'created_by' => User::factory(),
        ];
    }
}
