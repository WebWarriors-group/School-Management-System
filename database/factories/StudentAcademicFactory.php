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
        return [
            'reg_no' => $this->faker->unique()->numerify('REG-#####'),
            'class_id' => ClassModel::inRandomOrder()->first()->class_id,   // Replace with your actual class IDs
            'distance_to_school' => $this->faker->randomFloat(2, 0, 20),  // Random float between 0 and 20
            'method_of_coming_to_school' => $this->faker->randomElement(['Walking', 'Bus', 'Bicycle', 'Car']),  // Example modes of transport
            'grade_6_9_asthectic_subjects' => $this->faker->randomElement(['Art', 'Dance', 'Music', 'Drama & Theatre']),
            'grade_10_11_basket1_subjects' => $this->faker->randomElement(['Commerce', 'Civics', 'Geography', 'Home Science']),
            'grade_10_11_basket2_subjects' => $this->faker->randomElement(['Design & Technology', 'Tamil Literature', 'English Literature', 'Sinhala Literature', 'Art', 'Dance', 'Music', 'Drama & Theatre']),
            'grade_10_11_basket3_subjects' => $this->faker->randomElement(['ICT', 'Health Science', 'Agriculture']),
            'receiving_any_grade_5_scholarship' => $this->faker->boolean(),
            'receiving_any_samurdhi_aswesuma' => $this->faker->boolean(),
            'receiving_any_scholarship' => $this->faker->boolean()

        ];
    }
}
