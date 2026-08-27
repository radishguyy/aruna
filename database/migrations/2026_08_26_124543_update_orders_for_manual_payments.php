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
        Schema::table('orders', function (Blueprint $table) {
            $table->integer('unique_code')->default(0)->after('subtotal');
            $table->string('payment_method')->nullable()->after('coupon_code');
            $table->string('payment_proof_path')->nullable()->after('payment_method');
            $table->text('rejection_reason')->nullable()->after('payment_proof_path');
            $table->string('status')->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['unique_code', 'payment_method', 'payment_proof_path', 'rejection_reason']);
        });
    }
};
