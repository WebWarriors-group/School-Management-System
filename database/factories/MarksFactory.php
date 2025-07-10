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
        
       

        return [
            'reg_no' => $student->reg_no,
            'subject_id' => $subject->subject_id,
            'marks_obtained' => $this->faker->numberBetween(0, 100),
            'grade' => $this->faker->randomElement(['A', 'B', 'C', 'S', 'F']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
