<?php

namespace Database\Factories;

use App\Models\TeacherLeaveRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeacherLeaveRequestFactory extends Factory
{
    protected $model = TeacherLeaveRequest::class;

    public function definition(): array
    {
        return [
            'teacher_NIC' => 'NIC123456', // Use a valid NIC that exists in your teacher_work_infos table
            'leave_type' => $this->faker->randomElement(['Medical', 'Casual', 'Maternity']),
            'leave_start_date' => now()->addDays(1),
            'leave_end_date' => now()->addDays(3),
            'reason' => $this->faker->sentence(),
            'requires_substitute' => $this->faker->boolean(),
            'substitute_teacher_name' => $this->faker->name(),
            'substitute_teacher_contact' => $this->faker->phoneNumber(),
            'comments' => $this->faker->optional()->sentence(),
            'supporting_document' => null, // or a fake file path
            'status' => 'Pending',
        ];
    }
}
