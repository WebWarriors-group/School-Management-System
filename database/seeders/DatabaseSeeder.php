<?php

namespace Database\Seeders;

use App\Models\StudentPerformance;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\ClassModel;
use App\Models\Marks;
use App\Models\Qualification;
use App\Models\StudentAcademic;
use App\Models\StudentFamilyInfo;
use App\Models\StudentPersonal;
use App\Models\StudentReport;
use App\Models\StudentSibling;
use App\Models\StudyMaterial;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\TeacherAddress;
use App\Models\TeacherOtherServices;
use App\Models\TeacherPersonal;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory(10)->create();
        Teacher::factory(10)->create();
         TeacherPersonal::factory(10)->create();
        TeacherOtherServices::factory(10)->create();
        Qualification::factory(10)->create();
        StudyMaterial::factory(10)->create();
        ClassModel::factory(16)->create();
        Subject::factory(10)->create();
$students = StudentAcademic::factory(200)->create();

        // Marks::factory(10)->create();
        StudentPerformance::factory(10)->create();
   


        // Create related info for each student
        foreach ($students as $student) {
            StudentPersonal::factory()->create([
                'reg_no' => $student->reg_no,
            ]);
             StudentFamilyInfo::factory()->create([
                'reg_no' => $student->reg_no,
            ]);
            StudentSibling::factory(rand(1, 3))->create([
                'reg_no' => $student->reg_no,
            ]);
            Marks::factory(rand(3, 6))->create([
        'reg_no' => $student->reg_no,
        // optionally assign random subject_id if not defaulted in factory
    ]);

    // Create related reports for the student
    StudentReport::factory(rand(1, 3))->create([
        'reg_no' => $student->reg_no,
    ]);
        }
        User::updateOrCreate(
            ['email' => 'admin@sms.lk'], // Unique constraint
            [
                'name' => 'Admin User',
                'email' => 'admin@sms.lk',
                'role' => 'admin',
                'password' => Hash::make('Admin@sms'),
            ]
        );
        User::updateOrCreate(
            ['email' => 'teacher@sms.lk'], // Unique constraint
            [
                'name' => 'Teacher User',
                'email' => 'teacher@sms.lk',
                'role' => 'teacher',
                'password' => Hash::make('Teacher@sms'),
            ]
        );
        User::updateOrCreate(
            ['email' => 'student@sms.lk'], // Unique constraint
            [
                'name' => 'Student User',
                'email' => 'student@sms.lk',
                'role' => 'student',
                'password' => Hash::make('Student@sms'),
            ]
        );


        User::updateOrCreate(
            ['email' => 'student@sms1.lk'], // Unique constraint
            [
                'name' => 'Student User',
                'email' => 'student@sms1.lk',
                'role' => 'student',
                'password' => Hash::make('Student@sms1'),
            ]
        );
    }
}
