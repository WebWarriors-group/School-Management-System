<?php

namespace Database\Factories;


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
            'subject_id' => Subject::factory(), // Generates a subject dynamically
            'title' => $this->faker->sentence,
            'file_path' => $this->faker->filePath(), // Generates a fake file path
        ];
    }
}
