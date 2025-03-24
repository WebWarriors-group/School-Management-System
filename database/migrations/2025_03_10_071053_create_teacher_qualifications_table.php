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
        Schema::create('teacher_qualifications', function (Blueprint $table) {
            $table->id();
            $table->string('teacher_NIC', 20);
            $table->foreign('teacher_NIC')->references('teacher_NIC')->on('teacher_work_infos')->onDelete('cascade');

            $table->string('type_of_service_in_school', 20);
            $table->string('gce_al_subject_stream', 10);
            $table->string('highest_education_qualification', 50);
            $table->string('basic_degree_stream', 50);
            $table->string('highest_professional_qualification', 50);
            $table->enum('present_class', ['class I', 'class II']);
            $table->enum('present_grade', ['Grade I', 'Grade II', 'Grade III']);
            $table->date('appointment_date_for_current_class');
            $table->date('appointment_date_for_current_grade');
            $table->enum('current_appointment_service_medium', ['Tamil', 'English', 'Sinhala']);
            $table->string('appointed_subject_section', 20);
            $table->string('subject_appointed', 20);
            $table->date('currentservice_appointed_date');
            $table->string('subjects_taught_most_and_second_most');
            $table->string('position_in_the_school', 20);
            $table->date('assign_date_for_the_school');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_qualifications');
    }
};
