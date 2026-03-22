<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\UpdateStoreRequest;
use App\Models\Store;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Patch;

final class UpdateStoreController extends Controller
{
    #[Patch(uri: '/stores/{store}', name: 'stores.update', middleware: 'auth')]
    public function __invoke(UpdateStoreRequest $request, Store $store): RedirectResponse
    {
        $store->update($request->validated());

        return redirect()->route('stores.index');
    }
}
