<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\StudyMaterial;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudyMaterial>
 */
class StudyMaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = StudyMaterial::class;

    public function definition(): array
    {
        return [
            'uploaded_by' =>  User::all()->random()->id,
            'category' => $this->faker->randomElement(['pastPapers', 'teachersHandbooks', 'notes']),
            'title' => $this->faker->sentence,
            'grade' => $this->faker->randomElement(['6', '7', '8', '9', '10']),
            'subject' => $this->faker->randomElement(['English', 'Science', 'Mathematics', 'Biology', 'Physics']),
            'year' => $this->faker->year,
            'file_url' => $this->faker->filePath(),
        ];
    }
}
