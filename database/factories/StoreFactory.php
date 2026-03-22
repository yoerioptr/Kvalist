<?php

namespace Database\Factories;

use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;

/**
 * @extends Factory<Store>
 */
final class StoreFactory extends Factory
{
    #[\Override]
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'created_by' => User::factory(),
        ];
    }
}
