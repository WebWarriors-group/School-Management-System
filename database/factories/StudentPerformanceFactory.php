<?php

namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\StudentPerformance;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentPerformance>
 */
class StudentPerformanceFactory extends Factory
{
     use HasFactory;
         protected $model = StudentPerformance::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ol_passed = $this->faker->numberBetween(60, 100);
        $al_passed = $this->faker->numberBetween(30, 80);
        return [
            'year' => $this->faker->numberBetween(2015, 2025),
            'ol_passed' => $ol_passed,
            'ol_expected' => $ol_passed + $this->faker->numberBetween(0, 10),
            'al_passed' => $al_passed,
            'al_expected' => $al_passed + $this->faker->numberBetween(0, 10),
        ];
    }
}
