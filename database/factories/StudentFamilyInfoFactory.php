<?php

namespace Database\Factories;

use App\Models\StudentFamilyInfo;
use App\Models\StudentAcademic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentFamilyInfo>
 */
class StudentFamilyInfoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = StudentFamilyInfo::class;

    public function definition(): array
    {
        return [
            'reg_no' => StudentAcademic::all()->random()->reg_no,
            'mother_name' => $this->faker->name('female'),
            'mother_occupation' => $this->faker->jobTitle,
            'mother_income' => $this->faker->randomFloat(2, 20000, 150000),
            'mother_working_place' => $this->faker->company,
            'mother_contact' => $this->faker->unique()->phoneNumber,
            'mother_email' => $this->faker->unique()->safeEmail,
            'mother_whatsapp' => $this->faker->phoneNumber,

            'father_name' => $this->faker->name('male'),
            'father_occupation' => $this->faker->jobTitle,
            'father_income' => $this->faker->randomFloat(2, 20000, 200000),
            'father_working_place' => $this->faker->company,
            'father_contact' => $this->faker->unique()->phoneNumber,
            'father_email' => $this->faker->unique()->safeEmail,
            'father_whatsapp' => $this->faker->phoneNumber,
        ];
    }
}
