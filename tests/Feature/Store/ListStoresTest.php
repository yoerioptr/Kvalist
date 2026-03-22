<?php

namespace Tests\Feature\Store;

use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

final class ListStoresTest extends TestCase
{
    use RefreshDatabase;

    public function test_stores_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/stores');

        $response->assertOk();
    }

    public function test_stores_are_listed_and_sorted_by_creation_date_descending(): void
    {
        $user = User::factory()->create();

        $oldStore = Store::factory()->create(['created_at' => now()->subDay()]);
        $newStore = Store::factory()->create(['created_at' => now()]);

        $response = $this
            ->actingAs($user)
            ->get('/stores');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Stores/Index')
            ->has('stores', 2)
            ->where('stores.0.id', $newStore->id)
            ->where('stores.1.id', $oldStore->id)
        );
    }

    public function test_stores_page_is_not_accessible_by_guests(): void
    {
        $response = $this->get('/stores');

        $response->assertRedirect('/login');
    }

    public function test_store_can_be_deleted(): void
    {
        $user = User::factory()->create();
        $store = Store::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete("/stores/{$store->id}");

        $response->assertRedirect('/stores');
        $this->assertDatabaseMissing('stores', ['id' => $store->id]);
    }

    public function test_store_deletion_is_not_accessible_by_guests(): void
    {
        $store = Store::factory()->create();

        $response = $this->delete("/stores/{$store->id}");

        $response->assertRedirect('/login');
        $this->assertDatabaseHas('stores', ['id' => $store->id]);
    }
}
