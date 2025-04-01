<?php

namespace Database\Factories;

use App\Models\Marks;
use App\Models\StudentAcademic;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarksFactory extends Factory
{
    protected $model = Marks::class;

    public function definition(): array
    {
        return [
            'reg_no' => StudentAcademic::all()->random()->reg_no,
            'subject_id' => Subject::all()->random()->subject_id,
            'marks_obtained' => $this->faker->numberBetween(0, 100),
            'grade' => $this->faker->randomElement(['A', 'B', 'C', 'S', 'F']),
           
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
