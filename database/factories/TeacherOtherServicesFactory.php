<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TeacherOtherServices;
use App\Models\Teacher; // Correct table where teacher_NIC is the primary key

class TeacherOtherServicesFactory extends Factory
{
    protected $model = TeacherOtherServices::class;

    public function definition(): array
    {
        

    
 return [
            'teacher_NIC' => Teacher::all()->random()->teacher_NIC, 
            'other_responsibilities_in_school' => $this->faker->sentence(),
            'EDCS_membership' => $this->faker->boolean() ? 'Yes' : 'No',
            'WSOP_Number' => $this->faker->numerify('#####'),
            'Agrahara_insuarence_membership' => $this->faker->boolean() ? 'Yes' : 'No',
        ];
    }
}
