<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\StudentPersonal;
use App\Models\StudentAcademic;

class StudentPersonalFactory extends Factory
{
    protected $model = StudentPersonal::class;

    public function definition(): array
    {
        static $allRegNos = null;

        if ($allRegNos === null) {
            $allRegNos = StudentAcademic::pluck('reg_no')->toArray();
        }

        return [
            'reg_no' => $this->faker->randomElement($allRegNos),
            'full_name' => $this->faker->name,
            'full_name_with_initial' => $this->faker->firstName . ' ' . $this->faker->lastName,
            'photo' => $this->faker->imageUrl(300, 200, 'people', true),
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
            'height' => $this->faker->randomFloat(2, 1.5, 2.0),
            'weight' => $this->faker->randomFloat(2, 40, 100),
        ];
    }
}
