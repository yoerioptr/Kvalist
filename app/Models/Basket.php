<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id UUID primary key
 * @property string $name
 * @property string $created_by
 * @property string $store_id
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read \App\Models\User $creator
 * @property-read \App\Models\Store $store
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\BasketItem> $items
 */
#[Fillable(['name', 'created_by', 'store_id'])]
final class Basket extends Model
{
    /** @use HasFactory<\Database\Factories\BasketFactory> */
    use HasFactory, HasUuids;

    #[\Override]
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function items(): HasMany
    {
        return $this->hasMany(BasketItem::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}
