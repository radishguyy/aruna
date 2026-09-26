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
        Schema::table('plans', function (Blueprint $table) {
            $table->string('description')->nullable()->after('name');
            $table->integer('max_children')->default(2)->after('billing_cycle');
            $table->string('modules_included')->default('Modul Edukasi Lengkap (13 Modul)')->after('max_children');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('plans', function (Blueprint $table) {
            $table->dropColumn(['description', 'max_children', 'modules_included']);
        });
    }
};
