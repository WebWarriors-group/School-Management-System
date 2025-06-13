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
        Schema::create('students_personal_info', function (Blueprint $table) {
            $table->id();


            $table->integer('reg_no');

            $table->foreign('reg_no')->references('reg_no')->on('student_academic_info')->onDelete('cascade');
            $table->string('full_name', 50);
            $table->string('full_name_with_initial', 50);
            $table->string('photo', 255)->nullable();
            $table->date('birthday');
            $table->enum('gender', ['Male', 'Female']);
            $table->string('ethnicity', 50);
            $table->string('religion', 50);
            $table->string('birth_certificate_number', 50);
            $table->string('address', 255);
            $table->string('nic_number', 50);
            $table->string('postal_ic_number', 50);
            $table->integer('age')->nullable();
            $table->boolean('special_needs')->default(false);
            $table->float('height')->nullable();
            $table->float('weight')->nullable();
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('students_personal_info');
    }
};
