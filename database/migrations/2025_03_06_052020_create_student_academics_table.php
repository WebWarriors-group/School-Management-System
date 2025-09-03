<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('student_academic_info', function (Blueprint $table) {
            $table->integer('reg_no')->primary();
            $table->string('student_id_no')->default(0);
            $table->softDeletes();
            // Use the same data type as in 'classes' table
            $table->integer('class_id');
            $table->foreign('class_id')->references('class_id')->on('classes')->onDelete('cascade');

            $table->float('distance_to_school')->nullable();
            $table->string('method_of_coming_to_school', 50)->nullable();
            $table->enum('grade_6_9_asthectic_subjects', ['Art', 'Dance', 'Music', 'Drama & Theatre'])->nullable();
            $table->enum('grade_10_11_basket1_subjects', ['Commerce', 'Civics', 'Geography', 'Home Science'])->nullable();
            $table->enum('grade_10_11_basket2_subjects', ['Design & Technology', 'Tamil Literature', 'English Literature', 'Sinhala Literature', 'Art', 'Dance', 'Music', 'Drama & Theatre'])->nullable();
            $table->enum('grade_10_11_basket3_subjects', ['ICT', 'Health Science', 'Agriculture'])->nullable();
            $table->boolean('receiving_any_grade_5_scholarship')->default(false);
            $table->boolean('receiving_any_samurdhi_aswesuma')->default(false);
            $table->boolean('receiving_any_scholarship')->default(false);
            $table->date('admission_date');

            $table->unsignedBigInteger('user_id')->nullable()->unique();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('student_academic_info');
    }
};
