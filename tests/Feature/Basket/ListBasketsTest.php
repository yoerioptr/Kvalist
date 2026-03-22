<?php

namespace Tests\Feature\Basket;

use App\Models\Basket;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

final class ListBasketsTest extends TestCase
{
    use RefreshDatabase;

    public function test_baskets_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/baskets');

        $response->assertOk();
    }

    public function test_baskets_are_listed_and_sorted_by_creation_date_descending(): void
    {
        $user = User::factory()->create();

        $oldBasket = Basket::factory()->create(['created_at' => now()->subDay()]);
        $newBasket = Basket::factory()->create(['created_at' => now()]);

        $response = $this
            ->actingAs($user)
            ->get('/baskets');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Baskets/Index')
            ->has('baskets', 2)
            ->where('baskets.0.id', $newBasket->id)
            ->where('baskets.1.id', $oldBasket->id)
        );
    }

    public function test_baskets_page_is_not_accessible_by_guests(): void
    {
        $response = $this->get('/baskets');

        $response->assertRedirect('/login');
    }

    public function test_basket_can_be_deleted(): void
    {
        $user = User::factory()->create();
        $basket = Basket::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete("/baskets/{$basket->id}");

        $response->assertRedirect('/baskets');
        $this->assertDatabaseMissing('baskets', ['id' => $basket->id]);
    }

    public function test_basket_deletion_is_not_accessible_by_guests(): void
    {
        $basket = Basket::factory()->create();

        $response = $this->delete("/baskets/{$basket->id}");

        $response->assertRedirect('/login');
        $this->assertDatabaseHas('baskets', ['id' => $basket->id]);
    }
}
