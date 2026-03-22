<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\InertiaController;
use App\Models\Product;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class EditProductController extends InertiaController
{
    #[Get(uri: '/products/{product}/edit', name: 'products.edit', middleware: 'auth')]
    public function __invoke(Product $product): Response
    {
        return $this->render('Products/Edit', [
            'product' => $product,
        ]);
    }
}
