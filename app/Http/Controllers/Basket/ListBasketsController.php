<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\InertiaController;
use App\Models\Basket;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class ListBasketsController extends InertiaController
{
    #[Get(uri: '/baskets', name: 'baskets.index', middleware: 'auth')]
    public function __invoke(): Response
    {
        return $this->render('Baskets/Index', [
            'baskets' => Basket::query()
                ->with(['creator', 'store', 'items' => fn($query) => $query->with('product')->orderBy('weight', 'asc')])
                ->latest()
                ->get(),
        ]);
    }
}
