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
        Schema::create('articles', function (Blueprint $table) {
            $table->string('id')->primary(); // Support mock ID "a-1", "a-2"
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description');
            $table->longText('content');
            $table->string('category');
            $table->string('category_color')->default('orange');
            $table->string('date');
            $table->string('author');
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
