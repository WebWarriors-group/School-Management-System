<?php

namespace Database\Factories;

use App\Models\TeacherOtherService;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeacherOtherServiceFactory extends Factory
{
    protected $model = TeacherOtherService::class;

    public function definition(): array
    {
        return [
            'teacher_NIC' => Teacher::all()->random()->teacher_NIC,
            'other_responsibilities_in_school' => $this->faker->randomElement([
                'Sports Coach',
                'Library In-Charge',
                'Discipline Committee',
                'Exam Coordinator',
                null
            ]),
            'EDCS_membership' => $this->faker->boolean(),
            'WSOP_Number' => $this->faker->optional()->numerify('##########'), // Generates a 10-digit number or null
            'Agrahara_insuarence_membership' => $this->faker->boolean(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
