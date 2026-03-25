<?php

namespace Tests\Feature\Basket;

use App\Models\BasketItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class UpdateBasketItemInCartTest extends TestCase
{
    use RefreshDatabase;

    public function test_basket_item_in_cart_status_can_be_updated(): void
    {
        $user = User::factory()->create();
        $basketItem = BasketItem::factory()->create(['is_in_cart' => false]);

        $response = $this
            ->actingAs($user)
            ->patch("/basket-items/{$basketItem->id}/in-cart", [
                'is_in_cart' => true,
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('basket_items', [
            'id' => $basketItem->id,
            'is_in_cart' => true,
        ]);
    }

    public function test_basket_item_in_cart_status_can_be_set_to_false(): void
    {
        $user = User::factory()->create();
        $basketItem = BasketItem::factory()->create(['is_in_cart' => true]);

        $response = $this
            ->actingAs($user)
            ->patch("/basket-items/{$basketItem->id}/in-cart", [
                'is_in_cart' => false,
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('basket_items', [
            'id' => $basketItem->id,
            'is_in_cart' => false,
        ]);
    }

    public function test_basket_item_in_cart_update_requires_authentication(): void
    {
        $basketItem = BasketItem::factory()->create(['is_in_cart' => false]);

        $response = $this->patch("/basket-items/{$basketItem->id}/in-cart", [
            'is_in_cart' => true,
        ]);

        $response->assertRedirect('/login');
        $this->assertDatabaseHas('basket_items', [
            'id' => $basketItem->id,
            'is_in_cart' => false,
        ]);
    }

    public function test_basket_item_in_cart_update_requires_boolean(): void
    {
        $user = User::factory()->create();
        $basketItem = BasketItem::factory()->create(['is_in_cart' => false]);

        $response = $this
            ->actingAs($user)
            ->patch("/basket-items/{$basketItem->id}/in-cart", [
                'is_in_cart' => 'not-a-boolean',
            ]);

        $response->assertSessionHasErrors('is_in_cart');
    }
}
