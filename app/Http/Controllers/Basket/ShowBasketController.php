<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\InertiaController;
use App\Models\Basket;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class ShowBasketController extends InertiaController
{
    #[Get(uri: '/baskets/{basket}', name: 'baskets.show', middleware: 'auth')]
    public function __invoke(Basket $basket): Response
    {
        $basket->load([
            'store',
            'items' => fn($query) => $query->with('product')->orderBy('weight', 'asc'),
        ]);

        return $this->render('Baskets/Show', [
            'basket' => $basket,
        ]);
    }
}
