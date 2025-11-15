<?php

namespace Database\Factories;

use App\Models\Marks;
use App\Models\StudentAcademic;
use App\Models\Subject;
use App\Models\ClassModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarksFactory extends Factory
{
    protected $model = Marks::class;

    public function definition(): array
    {
        $student = StudentAcademic::inRandomOrder()->first() ?? StudentAcademic::factory()->create();
        $subject = Subject::inRandomOrder()->first() ?? Subject::factory()->create();
        $class = ClassModel::inRandomOrder()->first() ?? ClassModel::factory()->create();
        return [
            'reg_no' => $student->reg_no,
            'class' => $class->class_id,
            'subject_id' => $subject->subject_id,
            'marks_obtained' => $this->faker->numberBetween(0, 100),
            'grade' => $this->faker->randomElement(['A', 'B', 'C', 'S', 'F']),
                  'term' => $this->faker->randomElement(['Term 1', 'Term 2', 'Term 3']),
            'year' => $this->faker->numberBetween(2020, now()->year),

            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
