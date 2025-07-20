<?php

namespace Database\Factories;

use App\Models\StudentSubject;
use App\Models\StudentAcademic;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentSubjectFactory extends Factory
{
    protected $model = StudentSubject::class;

    public function definition(): array
    {
        return [
            'reg_no' => StudentAcademic::inRandomOrder()->first()?->reg_no ?? $this->faker->unique()->numberBetween(10000, 99999),
            'subject_id' => Subject::inRandomOrder()->first()?->subject_id ?? $this->faker->numberBetween(1, 10),
        ];
    }
}
