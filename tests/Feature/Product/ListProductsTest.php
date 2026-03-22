<?php

namespace Tests\Feature\Product;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

final class ListProductsTest extends TestCase
{
    use RefreshDatabase;

    public function test_products_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/products');

        $response->assertOk();
    }

    public function test_products_are_listed_and_sorted_by_creation_date_descending(): void
    {
        $user = User::factory()->create();

        $oldProduct = Product::factory()->create(['created_at' => now()->subDay()]);
        $newProduct = Product::factory()->create(['created_at' => now()]);

        $response = $this
            ->actingAs($user)
            ->get('/products');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Products/Index')
            ->has('products', 2)
            ->where('products.0.id', $newProduct->id)
            ->where('products.1.id', $oldProduct->id)
        );
    }

    public function test_products_page_is_not_accessible_by_guests(): void
    {
        $response = $this->get('/products');

        $response->assertRedirect('/login');
    }

    public function test_product_can_be_deleted(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete("/products/{$product->id}");

        $response->assertRedirect('/products');
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    public function test_product_deletion_is_not_accessible_by_guests(): void
    {
        $product = Product::factory()->create();

        $response = $this->delete("/products/{$product->id}");

        $response->assertRedirect('/login');
        $this->assertDatabaseHas('products', ['id' => $product->id]);
    }
}
