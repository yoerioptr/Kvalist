<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Delete;

final class DestroyProductController extends Controller
{
    #[Delete(uri: '/products/{product}', name: 'products.destroy', middleware: 'auth')]
    public function __invoke(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('products.index');
    }
}
