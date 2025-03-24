<?php

namespace Database\Factories;

use App\Models\StudentSibling;
use App\Models\StudentAcademic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentSibling>
 */
class StudentSiblingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = StudentSibling::class;
    
    public function definition(): array
    {
        return [
            'reg_no' => StudentAcademic::all()->random()->reg_no,
            'sibling_name' => $this->faker->name,
            'relationship' => $this->faker->randomElement(['Brother', 'Sister']),
            'age' => $this->faker->numberBetween(5, 30),
            'occupation' => $this->faker->optional()->jobTitle,
            'contact' => $this->faker->optional()->phoneNumber,
        ];
    }
}
