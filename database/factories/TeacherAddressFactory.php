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
            'teacher_NIC' => Teacher::all()->random()->teacher_NIC, // Random NIC
            'permanent_address' => $this->faker->address, // Use address for permanent address
            'permanent_residential_address' => $this->faker->address, // Use address for residential address
            'grama_niladari_division' => $this->faker->word, // Random word (You can replace it with a more specific value if needed)
            'grama_niladari_division_number' => $this->faker->numerify('####'), // Random 4-digit number for division number
            'election_division' => $this->faker->word, // Random word (You can replace it with a more specific value if needed)
            'election_division_number' => $this->faker->numerify('####'), // Random 4-digit number for election division number
        ];
    }
}
