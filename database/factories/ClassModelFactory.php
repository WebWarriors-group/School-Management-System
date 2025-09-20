<?php

namespace Database\Factories;

use App\Models\ClassModel;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClassModelFactory extends Factory
{
    protected $model = ClassModel::class;

    protected static $gradeSectionPairs = [];

    public function definition(): array
    {
        if (empty(static::$gradeSectionPairs)) {
            foreach (range(6, 13) as $grade) {
                foreach (['A', 'B'] as $section) {
                    static::$gradeSectionPairs[] = [$grade, $section];
                }
            }
        }

        [$grade, $section] = array_shift(static::$gradeSectionPairs);

        if ($grade >= 6 && $grade <= 9) {
            $className = 'junior';
        } elseif ($grade >= 10 && $grade <= 11) {
            $className = 'O/L';
        } else {
            $className = 'A/L';
        }

        return [
            'class_id' => $this->faker->unique()->numberBetween(1, 100),
            'teacher_NIC' => Teacher::inRandomOrder()->first()->teacher_NIC,
            'class_name' => $className,
            'grade' => $grade,
            'section' => $section,
            'year' => $this->faker->numberBetween(2000, 2029),
            'number_of_students' => $this->faker->numberBetween(10, 50),
        ];
    }
}
