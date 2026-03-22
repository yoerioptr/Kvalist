<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\InertiaController;
use App\Models\Product;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class ListProductController extends InertiaController
{
    #[Get(uri: '/products', name: 'products.index', middleware: 'auth')]
    public function __invoke(): Response
    {
        return $this->render('Products/Index', [
            'products' => Product::query()
                ->with('creator')
                ->latest()
                ->get(),
        ]);
    }
}
