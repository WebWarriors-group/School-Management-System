<?php

namespace Database\Factories;

use App\Models\StudentReport;
use App\Models\StudentAcademic;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StudentReportFactory extends Factory
{
    protected $model = StudentReport::class;

    public function definition(): array
    {
        return [
            'report_id' => Str::uuid(), // Generate a unique ID
            'reg_no' => StudentAcademic::all()->random()->reg_no,
            'term' => $this->faker->randomElement(['Term 1', 'Term 2', 'Term 3']),
            'total_days' => 180,
            'days_attended' => $this->faker->numberBetween(150, 180),
            'days_absent' => function (array $attributes) {
                return $attributes['total_days'] - $attributes['days_attended'];
            },
            'behavior_rating' => $this->faker->randomElement(['Excellent', 'Good', 'Average', 'Needs Improvement']),
            'teacher_comments' => $this->faker->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
