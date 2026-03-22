<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Models\Basket;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Delete;

final class DestroyBasketController extends Controller
{
    #[Delete(uri: '/baskets/{basket}', name: 'baskets.destroy', middleware: 'auth')]
    public function __invoke(Basket $basket): RedirectResponse
    {
        $basket->delete();

        return redirect()->route('baskets.index');
    }
}
