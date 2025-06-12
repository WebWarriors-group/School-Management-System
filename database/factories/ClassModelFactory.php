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
            'class_id' => $this->faker->unique()->numberBetween(1, 100), // INTEGER ONLY, no 'C' prefix
            'teacher_NIC' => Teacher::inRandomOrder()->first()->teacher_NIC,
            'class_name' => $className,
            'grade' => $grade,
            'section' => $section,
            'number_of_students' => $this->faker->numberBetween(10, 50),
        ];
    }
}
