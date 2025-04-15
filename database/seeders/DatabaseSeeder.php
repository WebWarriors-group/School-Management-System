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
use App\Models\TeacherOtherService;
use App\Models\TeacherOtherServices;
use App\Models\TeacherPersonal;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
         Teacher::factory(10)->create();
         TeacherPersonal::factory(10)->create();

        // ClassModel::factory(10)->create();
        // StudentAcademic::factory(10)->create();

        // Subject::factory(10)->create();
        // Marks::factory(50)->create();
        
        User::factory(10)->create();
        // StudyMaterial::factory(50)->create();
        //StudentFamilyInfo::factory(10)->create();
        //StudentSibling::factory(20)->create();

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
