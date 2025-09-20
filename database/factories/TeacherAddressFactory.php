<?php

namespace Database\Factories;

use App\Models\TeacherAddress;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeacherAddressFactory extends Factory
{
    protected $model = TeacherAddress::class;




    public function definition(): array
    {


        return [
            'teacher_NIC' => Teacher::all()->random()->teacher_NIC,
            'permanent_address' => $this->faker->address,
            'permanent_residential_address' => $this->faker->address,
            'grama_niladari_division' => $this->faker->word,
            'grama_niladari_division_number' => $this->faker->numerify('####'),
            'election_division' => $this->faker->word,
            'election_division_number' => $this->faker->numerify('####'),
        ];
    }
}
