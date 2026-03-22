<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Post;

final class StoreProductController extends Controller
{
    #[Post(uri: '/products', name: 'products.store', middleware: 'auth')]
    public function __invoke(StoreProductRequest $request): RedirectResponse
    {
        $request->user()->products()->create($request->validated());

        return redirect()->route('products.index');
    }
}
