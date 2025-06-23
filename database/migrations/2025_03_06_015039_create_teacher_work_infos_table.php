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
        Schema::create('teacher_work_infos', function (Blueprint $table) {
            $table->string('teacher_NIC', 20)->primary(); // Primary key
            $table->date('appointed_date');
            $table->softDeletes();
            $table->date('work_acceptance_date');
            $table->string('appointment_type');
            $table->date('salary_increment_date');
            $table->enum('current_grade_of_teaching_service', ['Grade I', 'Grade II', 'Grade III']);
            $table->date('work_acceptance_date_school');
            $table->string('temporary_attachedschool_or_institute_name', 100);
            $table->string('appointed_subject', 20);
            $table->string('which_grades_teaching_done');
            $table->string('current_teaching_subject', 20);
            $table->string('other_subjects_taught');
            $table->string('assigned_class');
            $table->string('other_responsibilities_assigned');
            $table->boolean('is_150_hrs_tamil_course_completed')->default(false);
            $table->enum('commuting_from_school', ['Home', 'Boarding', 'Hostel', 'Other']);
            $table->float('distance_from_school');
            $table->enum('commuting_method_to_school', ['Bicycle', 'MotorBike', 'Car', 'Bus', 'Threewheeler', 'Walk', 'Other']);
            $table->string('number_in_sign_sheet', 20);
            $table->string('number_in_salary_sheet', 20);
            $table->integer('count')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_work_infos');
    }
};
