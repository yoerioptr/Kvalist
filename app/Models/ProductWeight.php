<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id UUID primary key
 * @property string $store_id
 * @property string $product_id
 * @property int $weight
 * @property string $created_by
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read \App\Models\Store $store
 * @property-read \App\Models\Product $product
 * @property-read \App\Models\User $creator
 */
#[Fillable(['store_id', 'product_id', 'weight', 'created_by'])]
final class ProductWeight extends Model
{
    /** @use HasFactory<\Database\Factories\ProductWeightFactory> */
    use HasFactory, HasUuids;

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    #[\Override]
    protected function casts(): array
    {
        return [
            'weight' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
