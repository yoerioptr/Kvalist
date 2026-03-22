<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\InertiaController;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class CreateStoreController extends InertiaController
{
    #[Get(uri: '/stores/new', name: 'stores.create', middleware: 'auth')]
    public function __invoke(): Response
    {
        return $this->render('Stores/Create');
    }
}
