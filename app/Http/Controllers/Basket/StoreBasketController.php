<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Basket\StoreBasketRequest;
use App\Models\Basket;
use App\Models\BasketItem;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Spatie\RouteAttributes\Attributes\Post;

final class StoreBasketController extends Controller
{
    #[Post(uri: '/baskets', name: 'baskets.store', middleware: 'auth')]
    public function __invoke(StoreBasketRequest $request): RedirectResponse
    {
        return DB::transaction(function () use ($request) {
            $storeId = $request->input('store_id');
            if ($storeId === 'new' && $request->filled('new_store_name')) {
                $store = Store::create([
                    'name' => $request->input('new_store_name'),
                    'created_by' => $request->user()->id,
                ]);
                $storeId = $store->id;
            }

            $basket = Basket::create([
                'name' => $request->input('name'),
                'store_id' => $storeId,
                'created_by' => $request->user()->id,
            ]);

            foreach ($request->input('items') as $itemData) {
                $productId = $itemData['product_id'] ?? null;
                if (($productId === 'new' || !$productId) && !empty($itemData['new_product_name'])) {
                    $product = Product::create([
                        'name' => $itemData['new_product_name'],
                        'created_by' => $request->user()->id,
                    ]);
                    $productId = $product->id;
                }

                BasketItem::create([
                    'basket_id' => $basket->id,
                    'product_id' => $productId,
                    'amount' => $itemData['amount'],
                    'unit' => $itemData['unit'],
                    'weight' => $itemData['weight'] ?? 0,
                    'created_by' => $request->user()->id,
                ]);
            }

            return redirect()->route('baskets.index');
        });
    }
}
