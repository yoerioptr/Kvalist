<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Patch;

final class UpdateProductController extends Controller
{
    #[Patch(uri: '/products/{product}', name: 'products.update', middleware: 'auth')]
    public function __invoke(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($request->validated());

        return redirect()->route('products.index');
    }
}
