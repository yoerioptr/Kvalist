<?php

use App\Models\Basket;
use App\Models\Product;
use App\Models\User;
use App\Utils\Enum\Unit;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('basket_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(Basket::class)->constrained();
            $table->foreignIdFor(Product::class)->constrained();
            $table->unsignedInteger('amount');
            $table->enum('unit', Unit::cases());
            $table->foreignIdFor(User::class, 'created_by')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('basket_items');
    }
};
