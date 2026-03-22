<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\StoreStoreRequest;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Post;

final class StoreStoreController extends Controller
{
    #[Post(uri: '/stores', name: 'stores.store', middleware: 'auth')]
    public function __invoke(StoreStoreRequest $request): RedirectResponse
    {
        $request->user()->stores()->create($request->validated());

        return redirect()->route('stores.index');
    }
}
