<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\InertiaController;
use App\Models\Store;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class EditStoreController extends InertiaController
{
    #[Get(uri: '/stores/{store}/edit', name: 'stores.edit', middleware: 'auth')]
    public function __invoke(Store $store): Response
    {
        return $this->render('Stores/Edit', [
            'store' => $store,
        ]);
    }
}
