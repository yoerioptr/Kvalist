<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Basket\UpdateBasketRequest;
use App\Models\Basket;
use App\Models\BasketItem;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Spatie\RouteAttributes\Attributes\Patch;

final class UpdateBasketController extends Controller
{
    #[Patch(uri: '/baskets/{basket}', name: 'baskets.update', middleware: 'auth')]
    public function __invoke(UpdateBasketRequest $request, Basket $basket): RedirectResponse
    {
        return DB::transaction(function () use ($request, $basket) {
            $storeId = $request->input('store_id');
            if ($storeId === 'new' && $request->filled('new_store_name')) {
                $store = Store::create([
                    'name' => $request->input('new_store_name'),
                    'created_by' => $request->user()->id,
                ]);
                $storeId = $store->id;
            }

            $basket->update([
                'name' => $request->input('name'),
                'store_id' => $storeId,
            ]);

            // Sync items: simplest is to delete and recreate, or update existing and create new
            $basket->items()->delete();

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
