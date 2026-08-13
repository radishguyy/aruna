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
        Schema::create('modules', function (Blueprint $table) {
            $table->string('id')->primary(); // Using string ID to match mock data ("m-1", "m-2", etc.)
            $table->foreignId('category_id')->constrained('module_categories')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('type', ['digfo', 'digvi', 'e-modul']);
            $table->integer('difficulty_level')->default(1);
            $table->boolean('is_premium')->default(false);
            $table->json('content_data');
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
