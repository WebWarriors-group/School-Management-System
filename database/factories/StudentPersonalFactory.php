<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\StudentPersonal;
use App\Models\StudentAcademic;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentPersonal>
 */
class StudentPersonalFactory extends Factory
{
    protected $model = StudentPersonal::class;
    public function definition(): array
    {
        return [
            'reg_no' => StudentAcademic::all()->random()->reg_no, // Sample registration number
            'full_name' => $this->faker->name,
            'full_name_with_initial' => $this->faker->firstName . ' ' . $this->faker->lastName,
            'photo' => $this->faker->imageUrl(300, 200, 'people', true), // A smaller image
            'birthday' => $this->faker->date(),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'ethnicity' => $this->faker->word,
            'religion' => $this->faker->word,
            'birth_certificate_number' => $this->faker->unique()->numerify('BCN#####'),
            'address' => $this->faker->address,
            'nic_number' => $this->faker->unique()->numerify('NIC#####'),
            'postal_ic_number' => $this->faker->unique()->numerify('PIC#####'),
            'age' => $this->faker->numberBetween(18, 60),
            'special_needs' => $this->faker->boolean,
            'height' => $this->faker->randomFloat(2, 1.5, 2.0), // Sample height in meters
            'weight' => $this->faker->randomFloat(2, 40, 100), // Sample weight in kg
        ];

        
    }
}
