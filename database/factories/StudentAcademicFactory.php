<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\StudentAcademic;
use App\Models\ClassModel;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentAcademic>
 */
class StudentAcademicFactory extends Factory
{
    protected $model = StudentAcademic::class;
    public function definition(): array
    {
        // Random date between 2001-01-01 and today


        return [
            'reg_no' => $this->faker->unique()->numberBetween(1000, 9999),

            'class_id' => ClassModel::inRandomOrder()->first()->class_id, 
            'distance_to_school' => $this->faker->randomFloat(2, 0, 20),  
            'method_of_coming_to_school' => $this->faker->randomElement(['Walking', 'Bus', 'Bicycle', 'Car']),  
            'grade_6_9_asthectic_subjects' => $this->faker->randomElement(['Art', 'Dance', 'Music', 'Drama & Theatre']),
            'grade_10_11_basket1_subjects' => $this->faker->randomElement(['Commerce', 'Civics', 'Geography', 'Home Science']),
            'grade_10_11_basket2_subjects' => $this->faker->randomElement(['Design & Technology', 'Tamil Literature', 'English Literature', 'Sinhala Literature', 'Art', 'Dance', 'Music', 'Drama & Theatre']),
            'grade_10_11_basket3_subjects' => $this->faker->randomElement(['ICT', 'Health Science', 'Agriculture']),
            'receiving_any_grade_5_scholarship' => $this->faker->boolean(),
            'receiving_any_samurdhi_aswesuma' => $this->faker->boolean(),
            'receiving_any_scholarship' => $this->faker->boolean(),
            'admission_date' => $this->faker->dateTimeBetween('2001-01-01', 'now')->format('Y-m-d'),
            'leaving_date' => $this->faker->boolean(20)
                ? $this->faker->dateTimeBetween('2001-01-01', 'now')->format('Y-m-d') 
                : null,
        ];
    }
}
