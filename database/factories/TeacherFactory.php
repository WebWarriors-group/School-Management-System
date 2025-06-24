<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Teacher;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{

    public function definition(): array
    {
        return [
            'teacher_NIC' => $this->faker->unique()->numerify('###########'), // Generating fake NIC
            'appointed_date' => $this->faker->date(),
            'work_acceptance_date' => $this->faker->date(),
            'appointment_type' => $this->faker->word,
            'salary_increment_date' => $this->faker->date(),
            'current_grade_of_teaching_service' => $this->faker->randomElement(['Grade I', 'Grade II', 'Grade III']),
            'work_acceptance_date_school' => $this->faker->date(),
            'temporary_attachedschool_or_institute_name' => $this->faker->company(),
            'appointed_subject' => $this->faker->randomElement(['Mathematics', 'Science', 'English', 'History']),
            'which_grades_teaching_done' => $this->faker->randomElement(['Grade 6-8', 'Grade 9-11', 'A/L']),
            'current_teaching_subject' => $this->faker->randomElement(['Mathematics', 'Science']),
            'other_subjects_taught' => $this->faker->randomElement(['ICT', 'Physics', 'None']),
            'assigned_class' => $this->faker->randomElement(['6A', '8B', '10C', 'None']),
            'other_responsibilities_assigned' => $this->faker->randomElement(['Class Teacher', 'Discipline Head', 'None']),
            'is_150_hrs_tamil_course_completed' => $this->faker->boolean(),

            'commuting_from_school' => $this->faker->randomElement(['Home','Boarding','Hostel','Other']),
            'distance_from_school' => $this->faker->randomFloat(1, 0.5, 50), // Distance in km
            'commuting_method_to_school' => $this->faker->randomElement(['Bicycle','MotorBike','Car','Bus','Threewheeler','Walk','Other']),
            'number_in_sign_sheet' => $this->faker->randomNumber(3),
            'number_in_salary_sheet' => $this->faker->randomNumber(3),




        ];
    }
}
