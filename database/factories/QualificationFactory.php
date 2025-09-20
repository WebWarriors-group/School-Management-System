<?php

namespace Database\Factories;

use App\Models\Qualification;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Qualification>
 */
class QualificationFactory extends Factory
{
    protected $model = Qualification::class;





    public function definition(): array
    {




        $subjectNames = [
            'Science',
            'Maths',
            'Tamil',
            'English',
            'Geography',
            'Civics',
            'Islam',
            'Hinduism',
            'Buddhism',
            'History',
            'Physics',
            'Chemistry',
            'Combined Maths',
            'Art',
            'Sinhala',
            'Tamil Literature',
            'Agriculture',
            'Biology'
        ];


        $appointed = $this->faker->randomElement($subjectNames);
        $others = collect($subjectNames)
            ->reject(fn($s) => $s === $appointed)
            ->shuffle()
            ->take(2)
            ->all();
        return [
            'teacher_NIC' => Teacher::all()->random()->teacher_NIC,
            'type_of_service_in_school' => $this->faker->randomElement(['Full-time', 'Part-time', 'Contract']),
            'gce_al_subject_stream' => $this->faker->randomElement(['Science', 'Commerce', 'Arts']),
            'highest_education_qualification' => $this->faker->randomElement(['Bachelor\'s', 'Master\'s', 'PhD']),
            'basic_degree_stream' => $this->faker->randomElement(['Science', 'Engineering', 'Literature', 'Business']),
            'highest_professional_qualification' => $this->faker->randomElement(['Postgraduate Diploma', 'Certificate', 'Master\'s Degree']),
            'present_class' => $this->faker->randomElement(['class I', 'class II']),
            'present_grade' => $this->faker->randomElement(['Grade 1', 'Grade 2', 'Grade 3']),
            'appointment_date_for_current_class' => $this->faker->date(),
            'appointment_date_for_current_grade' => $this->faker->date(),
            'current_appointment_service_medium' => $this->faker->randomElement(['English', 'Tamil', 'Sinhala']),
            'appointed_subject_section' => $this->faker->randomElement(['Mathematics', 'Science', 'English']),
            'subject_appointed' => $appointed,
            'currentservice_appointed_date' => $this->faker->date(),
            'subjects_taught_most_and_second_most' => $others[0] . ' and ' . $others[1],
            'position_in_the_school' => $this->faker->randomElement(['Teacher', 'Head of Department', 'Principal']),
            'assign_date_for_the_school' => $this->faker->date(),
        ];
    }
}
