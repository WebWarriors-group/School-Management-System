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
        static $usedGradeSections = [];

        do {
            $grade = $this->faker->numberBetween(6, 13);
            $section = $this->faker->randomElement(['A', 'B']);
            $key = "$grade-$section";
        } while (in_array($key, $usedGradeSections));

        $usedGradeSections[] = $key;

        // Determine class_name
        if ($grade >= 6 && $grade <= 9) {
            $className = 'junior';
        } elseif ($grade >= 10 && $grade <= 11) {
            $className = 'O/L';
        } else {
            $className = 'A/L';
        }

        return [
            'class_id' => $this->faker->unique()->numberBetween(1, 100), // Generates C001, C002, etc.
            'teacher_NIC' =>  Teacher::all()->random()->teacher_NIC,  // Example: 123456789V
            'class_name' => $this->faker->randomElement(['junior', 'O/L','A/L']),
            'grade' => $this->faker->numberBetween(6, 13),
           'year' => $this->faker->numberBetween(2000, 2025),

            'section' => $this->faker->randomElement([ 'A', 'B'
        ]),
            'number_of_students' => $this->faker->numberBetween(10, 50),
        ];
    }
}
