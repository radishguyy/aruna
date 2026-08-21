<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('order_id')->constrained('orders')->cascadeOnDelete();
            $table->string('gateway_name')->default('midtrans');
            $table->string('gateway_transaction_id')->nullable();
            $table->string('payment_type')->nullable(); // e.g. qris, bca_va
            $table->decimal('gross_amount', 10, 2);
            $table->string('transaction_status')->default('pending'); // pending, settlement, expire, cancel, deny
            $table->json('raw_gateway_response')->nullable();
            $table->timestamp('settled_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
