<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Delete;

final class DestroyStoreController extends Controller
{
    #[Delete(uri: '/stores/{store}', name: 'stores.destroy', middleware: 'auth')]
    public function __invoke(Store $store): RedirectResponse
    {
        $store->delete();

        return redirect()->route('stores.index');
    }
}
