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

    public function test_basket_can_be_created_with_new_store_and_products(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/baskets', [
                'name' => 'Full Basket',
                'store_id' => 'new',
                'new_store_name' => 'Brand New Store',
                'items' => [
                    [
                        'new_product_name' => 'New Apple',
                        'amount' => 5,
                        'unit' => 'pcs',
                        'weight' => 0,
                    ],
                    [
                        'new_product_name' => 'Organic Milk',
                        'amount' => 2,
                        'unit' => 'l',
                        'weight' => 0,
                    ],
                ],
            ]);

        $response->assertRedirect('/baskets');

        $this->assertDatabaseHas('stores', ['name' => 'Brand New Store']);
        $store = \App\Models\Store::where('name', 'Brand New Store')->first();

        $this->assertDatabaseHas('baskets', [
            'name' => 'Full Basket',
            'store_id' => $store->id,
            'created_by' => $user->id,
        ]);
        $basket = \App\Models\Basket::where('name', 'Full Basket')->first();

        $this->assertDatabaseHas('products', ['name' => 'New Apple']);
        $this->assertDatabaseHas('products', ['name' => 'Organic Milk']);

        $apple = \App\Models\Product::where('name', 'New Apple')->first();
        $milk = \App\Models\Product::where('name', 'Organic Milk')->first();

        $this->assertDatabaseHas('basket_items', [
            'basket_id' => $basket->id,
            'product_id' => $apple->id,
            'amount' => 5,
            'unit' => 'pcs',
        ]);

        $this->assertDatabaseHas('basket_items', [
            'basket_id' => $basket->id,
            'product_id' => $milk->id,
            'amount' => 2,
            'unit' => 'l',
        ]);
    }

    public function test_basket_can_be_created_with_explicit_new_product_id(): void
    {
        $user = User::factory()->create();
        $store = Store::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/baskets', [
                'name' => 'Explicit New Product Basket',
                'store_id' => $store->id,
                'items' => [
                    [
                        'product_id' => 'new',
                        'new_product_name' => 'Explicit New Product',
                        'amount' => 1,
                        'unit' => 'pcs',
                        'weight' => 0,
                    ],
                ],
            ]);

        $response->assertRedirect('/baskets');

        $this->assertDatabaseHas('products', ['name' => 'Explicit New Product']);
        $product = \App\Models\Product::where('name', 'Explicit New Product')->first();

        $this->assertDatabaseHas('basket_items', [
            'product_id' => $product->id,
            'amount' => 1,
        ]);
    }

    public function test_basket_can_be_created_with_existing_store_and_products(): void
    {
        $user = User::factory()->create();
        $store = Store::factory()->create();
        $product = \App\Models\Product::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/baskets', [
                'name' => 'Existing Items Basket',
                'store_id' => $store->id,
                'items' => [
                    [
                        'product_id' => $product->id,
                        'amount' => 10,
                        'unit' => 'kg',
                        'weight' => 0,
                    ],
                ],
            ]);

        $response->assertRedirect('/baskets');

        $this->assertDatabaseHas('baskets', [
            'name' => 'Existing Items Basket',
            'store_id' => $store->id,
            'created_by' => $user->id,
        ]);
        $basket = \App\Models\Basket::where('name', 'Existing Items Basket')->first();

        $this->assertDatabaseHas('basket_items', [
            'basket_id' => $basket->id,
            'product_id' => $product->id,
            'amount' => 10,
            'unit' => 'kg',
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

    public function test_basket_can_be_updated_with_new_store_and_products(): void
    {
        $user = User::factory()->create();
        $basket = Basket::factory()->create();
        $product = \App\Models\Product::factory()->create();

        // Create an existing item to check if it gets synced (deleted/recreated)
        \App\Models\BasketItem::create([
            'basket_id' => $basket->id,
            'product_id' => $product->id,
            'amount' => 1,
            'unit' => 'pcs',
            'created_by' => $user->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->patch("/baskets/{$basket->id}", [
                'name' => 'Fully Updated Basket',
                'store_id' => 'new',
                'new_store_name' => 'Updated Brand Store',
                'items' => [
                    [
                        'product_id' => $product->id,
                        'amount' => 10,
                        'unit' => 'kg',
                        'weight' => 0,
                    ],
                    [
                        'new_product_name' => 'Newly Added Product',
                        'amount' => 3,
                        'unit' => 'l',
                        'weight' => 0,
                    ],
                ],
            ]);

        $response->assertRedirect('/baskets');

        $this->assertDatabaseHas('stores', ['name' => 'Updated Brand Store']);
        $store = \App\Models\Store::where('name', 'Updated Brand Store')->first();

        $this->assertDatabaseHas('baskets', [
            'id' => $basket->id,
            'name' => 'Fully Updated Basket',
            'store_id' => $store->id,
        ]);

        $this->assertDatabaseHas('products', ['name' => 'Newly Added Product']);
        $newProduct = \App\Models\Product::where('name', 'Newly Added Product')->first();

        // Check items are synced
        $this->assertDatabaseHas('basket_items', [
            'basket_id' => $basket->id,
            'product_id' => $product->id,
            'amount' => 10,
            'unit' => 'kg',
        ]);

        $this->assertDatabaseHas('basket_items', [
            'basket_id' => $basket->id,
            'product_id' => $newProduct->id,
            'amount' => 3,
            'unit' => 'l',
        ]);

        // Original item should be gone (replaced by the one with 10kg)
        $this->assertDatabaseMissing('basket_items', [
            'basket_id' => $basket->id,
            'product_id' => $product->id,
            'amount' => 1,
            'unit' => 'pcs',
        ]);
    }
    public function test_basket_can_be_created_with_decimal_amount(): void
    {
        $user = User::factory()->create();
        $store = Store::factory()->create();
        $product = \App\Models\Product::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/baskets', [
                'name' => 'Decimal Basket',
                'store_id' => $store->id,
                'items' => [
                    [
                        'product_id' => $product->id,
                        'amount' => 1.55,
                        'unit' => 'kg',
                        'weight' => 0,
                    ],
                ],
            ]);

        $response->assertRedirect('/baskets');

        $this->assertDatabaseHas('basket_items', [
            'product_id' => $product->id,
            'amount' => 1.55,
            'unit' => 'kg',
        ]);
    }

}
