<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    public function definition(): array
    {
        static $counter = 101;

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



        return [
            'subject_id' => $counter++,
            'subject_name' => $this->faker->randomElement($subjectNames),

        ];
    }
}
