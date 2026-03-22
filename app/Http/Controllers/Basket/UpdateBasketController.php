<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Basket\UpdateBasketRequest;
use App\Models\Basket;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Patch;

final class UpdateBasketController extends Controller
{
    #[Patch(uri: '/baskets/{basket}', name: 'baskets.update', middleware: 'auth')]
    public function __invoke(UpdateBasketRequest $request, Basket $basket): RedirectResponse
    {
        $basket->update($request->validated());

        return redirect()->route('baskets.index');
    }
}
