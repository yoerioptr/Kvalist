<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Basket\StoreBasketRequest;
use App\Models\Basket;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Post;

final class StoreBasketController extends Controller
{
    #[Post(uri: '/baskets', name: 'baskets.store', middleware: 'auth')]
    public function __invoke(StoreBasketRequest $request): RedirectResponse
    {
        $basket = Basket::create([
            ...$request->validated(),
            'created_by' => $request->user()->id,
        ]);

        return redirect()->route('baskets.index');
    }
}
