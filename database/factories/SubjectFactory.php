<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Subject;  // Make sure this is the correct model
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
   
    protected $model = Subject::class;

    public function definition(): array
    {
        return [
            'subject_id' => $this->faker->unique()->numberBetween(1, 1000),// If using UUID as primary key
            'subject_name' => $this->faker->name,
                
        
        ];
    }
}



