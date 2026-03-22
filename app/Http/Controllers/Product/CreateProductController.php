<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\InertiaController;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class CreateProductController extends InertiaController
{
    #[Get(uri: '/products/new', name: 'products.create', middleware: 'auth')]
    public function __invoke(): Response
    {
        return $this->render('Products/Create');
    }
}
