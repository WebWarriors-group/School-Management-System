<?php

namespace Database\Factories;

use App\Models\ClassModel;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClassModelFactory extends Factory
{
    protected $model = ClassModel::class;

    public function definition(): array
    {

        
            // Define your predefined teacher NIC values
           
        return [
            'class_id' => $this->faker->unique()->numberBetween(1, 100), // Generates C001, C002, etc.
            'teacher_NIC' =>  Teacher::all()->random()->teacher_NIC,  // Example: 123456789V
            'class_name' => $this->faker->randomElement(['A', 'B']),
            'grade' => $this->faker->numberBetween(6, 13),
            'section' => $this->faker->randomElement([ '6-9', '10-11', '12-13']),
            'number_of_students' => $this->faker->numberBetween(10, 50),
        ];
    }
}

