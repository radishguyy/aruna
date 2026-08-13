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
        Schema::create('teacher_resources', function (Blueprint $table) {
            $table->string('id')->primary(); // Support mock ID "tr-1"
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category');
            $table->string('type'); // pdf, video, xlsx, etc.
            $table->string('file_size');
            $table->integer('download_count')->default(0);
            $table->string('file_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_resources');
    }
};
