<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_reports', function (Blueprint $table) {
           
            

            $table->string('report_id', 50)->primary();

            $table->integer('reg_no'); // Adding size for 'reg_no'
            $table->foreign('reg_no')->references('reg_no')->on('student_academic_info')->onDelete('cascade');
            $table->string('term', 50);
            $table->integer('total_days')->default(180)->unsigned(); // Set size for integer (10)
            $table->integer('days_attended')->default(0)->unsigned(); // Set size for integer (10)
            $table->integer('days_absent')->default(0)->unsigned(); // Set size for integer (10)
            $table->string('behavior_rating', 50)->nullable(); // Size for behavior_rating
            $table->text('teacher_comments')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_reports');
    }
};