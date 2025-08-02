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
        Schema::create('marks', function (Blueprint $table) {
            $table->id();
             $table->integer('class');
              $table->integer('year');
               $table->integer('term');
            $table->integer('reg_no');
            $table->integer('subject_id');
            $table->foreign('reg_no')->references('reg_no')->on('student_academic_info')->onDelete('cascade');
            $table->foreign('subject_id')->references('subject_id')->on('subjects')->onDelete('cascade');

            $table->integer('marks_obtained');
            $table->enum('grade', ['A', 'B', 'C', 'S', 'F']);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marks');
    }
};
