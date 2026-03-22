<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\InertiaController;
use App\Models\Store;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class CreateBasketController extends InertiaController
{
    #[Get(uri: '/baskets/new', name: 'baskets.create', middleware: 'auth')]
    public function __invoke(): Response
    {
        return $this->render('Baskets/Create', [
            'stores' => Store::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }
}
