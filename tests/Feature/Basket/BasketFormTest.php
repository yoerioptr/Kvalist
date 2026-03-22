<?php

namespace Tests\Feature\Basket;

use App\Models\Basket;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class BasketFormTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_basket_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/baskets/new');

        $response->assertOk();
    }

    public function test_basket_can_be_created(): void
    {
        $user = User::factory()->create();
        $store = Store::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/baskets', [
                'name' => 'My New Basket',
                'store_id' => $store->id,
            ]);

        $response->assertRedirect('/baskets');
        $this->assertDatabaseHas('baskets', [
            'name' => 'My New Basket',
            'store_id' => $store->id,
            'created_by' => $user->id,
        ]);
    }

    public function test_edit_basket_page_is_displayed(): void
    {
        $user = User::factory()->create();
        $basket = Basket::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get("/baskets/{$basket->id}/edit");

        $response->assertOk();
    }

    public function test_basket_can_be_updated(): void
    {
        $user = User::factory()->create();
        $basket = Basket::factory()->create();
        $newStore = Store::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch("/baskets/{$basket->id}", [
                'name' => 'Updated Basket Name',
                'store_id' => $newStore->id,
            ]);

        $response->assertRedirect('/baskets');
        $this->assertDatabaseHas('baskets', [
            'id' => $basket->id,
            'name' => 'Updated Basket Name',
            'store_id' => $newStore->id,
        ]);
    }
}
