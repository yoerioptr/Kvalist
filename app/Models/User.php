<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id UUID primary key
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Basket> $baskets
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\BasketItem> $basketItems
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Store> $stores
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductWeight> $productWeights
 */
#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
final class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasUuids;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'created_by');
    }

    public function baskets(): HasMany
    {
        return $this->hasMany(Basket::class, 'created_by');
    }

    public function basketItems(): HasMany
    {
        return $this->hasMany(BasketItem::class, 'created_by');
    }

    public function stores(): HasMany
    {
        return $this->hasMany(Store::class, 'created_by');
    }

    public function productWeights(): HasMany
    {
        return $this->hasMany(ProductWeight::class, 'created_by');
    }

    #[\Override]
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
