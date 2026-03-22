<?php

namespace Tests\Feature\Store;

use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class StoreFormTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_store_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/stores/new');

        $response->assertOk();
    }

    public function test_store_can_be_created(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/stores', [
                'name' => 'Test Store',
            ]);

        $response->assertRedirect('/stores');
        $this->assertDatabaseHas('stores', [
            'name' => 'Test Store',
            'created_by' => $user->id,
        ]);
    }

    public function test_edit_store_page_is_displayed(): void
    {
        $user = User::factory()->create();
        $store = Store::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get("/stores/{$store->id}/edit");

        $response->assertOk();
    }

    public function test_store_can_be_updated(): void
    {
        $user = User::factory()->create();
        $store = Store::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch("/stores/{$store->id}", [
                'name' => 'Updated Store Name',
            ]);

        $response->assertRedirect('/stores');
        $this->assertDatabaseHas('stores', [
            'id' => $store->id,
            'name' => 'Updated Store Name',
        ]);
    }
}
