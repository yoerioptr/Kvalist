<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\InertiaController;
use App\Models\Basket;
use App\Models\Product;
use App\Models\Store;
use App\Utils\Enum\Unit;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class EditBasketController extends InertiaController
{
    #[Get(uri: '/baskets/{basket}/edit', name: 'baskets.edit', middleware: 'auth')]
    public function __invoke(Basket $basket): Response
    {
        $basket->load('items.product');

        return $this->render('Baskets/Edit', [
            'basket' => $basket,
            'stores' => Store::query()->orderBy('name')->get(['id', 'name']),
            'products' => Product::query()->orderBy('name')->get(['id', 'name']),
            'units' => array_map(fn (Unit $unit) => [
                'value' => $unit->value,
                'label' => $unit->label(),
            ], Unit::cases()),
        ]);
    }
}
