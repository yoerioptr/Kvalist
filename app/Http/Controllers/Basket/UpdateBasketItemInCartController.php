<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Models\BasketItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Spatie\RouteAttributes\Attributes\Patch;

final class UpdateBasketItemInCartController extends Controller
{
    #[Patch('/basket-items/{basketItem}/in-cart', name: 'basket-items.in-cart.update', middleware: 'auth')]
    public function __invoke(Request $request, BasketItem $basketItem): RedirectResponse
    {
        $request->validate([
            'is_in_cart' => ['required', 'boolean'],
        ]);

        $basketItem->update([
            'is_in_cart' => $request->boolean('is_in_cart'),
        ]);

        return back();
    }
}
