<?php

namespace Database\Factories;

use App\Models\Grade;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

class GradeFactory extends Factory
{
    protected $model = Grade::class;

    public function definition(): array
    {
        // Pick a random subject if available, otherwise generate a fallback ID
        $subject = Subject::inRandomOrder()->first();

        return [
            'grade' => $this->faker->randomElement(['6', '7', '8', '9', '10', '11']),
            'subject_id' => $subject ? $subject->subject_id : $this->faker->unique()->numberBetween(101, 999),
            'subject_type' => $this->faker->randomElement(['Core', 'Optional']),
        ];
    }
}
