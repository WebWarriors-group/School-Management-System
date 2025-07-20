<?php

namespace Database\Factories;

use App\Models\TeachSubject;
use App\Models\Teacher;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeachSubjectFactory extends Factory
{
    protected $model = TeachSubject::class;

    public function definition(): array
    {
        return [
            'teacher_NIC' => Teacher::inRandomOrder()->first()?->teacher_NIC ?? 'NIC-' . $this->faker->unique()->numberBetween(1000, 9999),
            'subject_id' => Subject::inRandomOrder()->first()?->subject_id ?? $this->faker->numberBetween(1, 10),
        ];
    }
}
