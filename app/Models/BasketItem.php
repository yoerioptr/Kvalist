<?php

namespace App\Models;

use App\Utils\Enum\Unit;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id UUID primary key
 * @property string $basket_id
 * @property string $product_id
 * @property int $amount
 * @property Unit $unit
 * @property bool $is_in_cart
 * @property int $weight
 * @property string $created_by
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read \App\Models\Basket $basket
 * @property-read \App\Models\Product $product
 * @property-read \App\Models\User $creator
 */
#[Fillable(['basket_id', 'product_id', 'amount', 'unit', 'is_in_cart', 'weight', 'created_by'])]
final class BasketItem extends Model
{
    /** @use HasFactory<\Database\Factories\BasketItemFactory> */
    use HasFactory, HasUuids;

    public function basket(): BelongsTo
    {
        return $this->belongsTo(Basket::class);
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
            'amount' => 'integer',
            'unit' => Unit::class,
            'is_in_cart' => 'boolean',
            'weight' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    protected $appends = ['unit_label'];

    public function getUnitLabelAttribute(): string
    {
        return $this->unit->label();
    }
}
