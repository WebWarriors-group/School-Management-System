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
        Schema::create('student_siblings', function (Blueprint $table) {
            $table->id();
            $table->string('reg_no',50); // Foreign key to students table
            $table->foreign('reg_no')->references('reg_no')->on('student_academic_info')->onDelete('cascade');

            $table->string('sibling_name', 100);
            $table->string('relationship', 20); // Brother, Sister, etc.
            $table->integer('age')->nullable(); // Optional
            $table->string('occupation', 50)->nullable(); // Optional
            $table->string('contact', 20)->nullable(); // Optional, sibling's contact
            $table->timestamps();

            // Foreign key constraint
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_siblings');
    }
};
