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
        Schema::create('student_family_info', function (Blueprint $table) {
            $table->id();// Primary Key
            $table->integer('reg_no');
           $table->foreign('reg_no')->references('reg_no')->on('student_academic_info')->onDelete('cascade');
            // Mother's Details
            $table->string('mother_name', 50);
            $table->string('mother_occupation', 100)->nullable();
            $table->decimal('mother_income', 10, 2)->nullable();
            $table->string('mother_working_place', 50)->nullable();
            $table->string('mother_contact', 20)->unique();
            $table->string('mother_email', 50)->nullable()->unique();
            $table->string('mother_whatsapp', 20)->nullable();

            // Father's Details
            $table->string('father_name', 50);
            $table->string('father_occupation', 100)->nullable();
            $table->decimal('father_income', 10, 2)->nullable();
            $table->string('father_working_place', 50)->nullable();
            $table->string('father_contact', 20)->unique();
            $table->string('father_email', 50)->nullable()->unique();
            $table->string('father_whatsapp', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_family_info');
    }
};
