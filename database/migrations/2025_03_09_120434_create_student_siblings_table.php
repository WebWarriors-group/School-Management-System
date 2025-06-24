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
            $table->integer('reg_no'); // Foreign key to students table
            $table->foreign('reg_no')->references('reg_no')->on('student_academic_info')->onDelete('cascade');

            $table->string('sibling_name', 100)->nullable();
            $table->string('relationship', 20)->nullable(); // Brother, Sister, etc.
            $table->integer('sibling_age')->nullable(); // Optional
            $table->string('occupation', 150)->nullable(); // Optional
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
