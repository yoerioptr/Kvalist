<?php

use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_weights', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(Store::class)->constrained();
            $table->foreignIdFor(Product::class)->constrained();
            $table->integer('weight');
            $table->foreignIdFor(User::class, 'created_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_weights');
    }
};
