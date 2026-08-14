<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('classrooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('users')->cascadeOnDelete();
            $table->string('name'); // e.g., "Class 4B"
            $table->string('class_code')->unique(); // e.g., "MATH-4B-2026"
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('classrooms');
    }
};
