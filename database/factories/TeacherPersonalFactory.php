<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Teacher;
use App\Models\TeacherPersonal;
use Illuminate\Support\Str;

class TeacherPersonalFactory extends Factory
{

    protected $model = TeacherPersonal::class;
    public function definition()
    {
        return [
            'teacher_NIC' =>Teacher::all()->random()->teacher_NIC,
            'full_name' => $this->faker->name,
            'full_name_with_initial' => $this->faker->name,
            'photo' => $this->faker->imageUrl(),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'region' => $this->faker->city,
            'ethnicity' => $this->faker->word,
            'birthdate' => $this->faker->date,
            'title' => $this->faker->title,
            'marital_status' => $this->faker->randomElement(['Single', 'Married']),
            'details_about_family_members' => $this->faker->sentence,
            // Limit the length to 10 characters
          'Emergency_telephone_number' => $this->faker->numerify('+1-###-###-####'),





            'email_address' => $this->faker->safeEmail,
            'fixed_telephone_number' =>$this->faker->numerify('+1-###-###-####'),
            'mobile_number' =>$this->faker->numerify('+1-###-###-####'),
            'whatsapp_number' => $this->faker->phoneNumber,
        ];
    }
}
