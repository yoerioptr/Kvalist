<?php

namespace Tests\Feature\Product;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ProductFormTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_product_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/products/new');

        $response->assertOk();
    }

    public function test_product_can_be_created(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/products', [
                'name' => 'New Product Name',
            ]);

        $response->assertRedirect('/products');
        $this->assertDatabaseHas('products', [
            'name' => 'New Product Name',
            'created_by' => $user->id,
        ]);
    }

    public function test_edit_product_page_is_displayed(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get("/products/{$product->id}/edit");

        $response->assertOk();
        $response->assertSee($product->name);
    }

    public function test_product_can_be_updated(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch("/products/{$product->id}", [
                'name' => 'Updated Product Name',
            ]);

        $response->assertRedirect('/products');
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Product Name',
        ]);
    }
}
