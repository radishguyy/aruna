<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            // A student can belong to a parent (Home) AND/OR a classroom (School)
            $table->foreignId('parent_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('classroom_id')->nullable()->constrained('classrooms')->nullOnDelete();
            
            $table->string('name');
            $table->string('username')->unique(); // e.g., "budi_hero77"
            $table->string('avatar')->default('default-avatar.png');
            $table->string('pin'); // Can store 4 digits or comma-separated visual IDs like "cat,dog,apple"
            
            $table->integer('points')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('students');
    }
};
