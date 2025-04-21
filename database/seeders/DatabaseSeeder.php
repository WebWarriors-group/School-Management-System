<?php

namespace Database\Seeders;

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
        User::factory(80)->create();
        Teacher::factory(30)->create();
        TeacherPersonal::factory(30)->create();
        // TeacherOtherServices::factory(20)->create();
        // Qualification::factory(50)->create();
        // StudyMaterial::factory(50)->create();
        ClassModel::factory(10)->create();
        StudentAcademic::factory(40)->create();
        //  StudentPersonal::factory(40)->create();
        // StudentFamilyInfo::factory(40)->create();
        // StudentSibling::factory(30)->create();
        Subject::factory(20)->create();
        Marks::factory(50)->create();

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
