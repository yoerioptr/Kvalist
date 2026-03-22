<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\InertiaController;
use App\Models\Store;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class ListStoreController extends InertiaController
{
    #[Get(uri: '/stores', name: 'stores.index', middleware: 'auth')]
    public function __invoke(): Response
    {
        return $this->render('Stores/Index', [
            'stores' => Store::query()
                ->with('creator')
                ->latest()
                ->get(),
        ]);
    }
}
