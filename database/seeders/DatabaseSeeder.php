<?php

namespace Database\Seeders;

use App\Models\StudentPerformance;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\TeacherRequest;
use Faker\Factory as Faker;


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
use App\Models\Grade;
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
     Grade::factory(100)->create();
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
            $studentClass = $student->class_id;
    //         

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



         $faker = Faker::create();

    $formData = [
        'teacher_NIC' => strtoupper($faker->bothify('########???')),
        'appointed_date' => $faker->date(),
        'work_acceptance_date' => $faker->date(),
        'appointment_type' => $faker->randomElement(['Permanent', 'Temporary']),
        'salary_increment_date' => $faker->date(),
        'current_grade_of_teaching_service' => $faker->randomElement(['Grade I','Grade II','Grade III']),
        'work_acceptance_date_school' => $faker->date(),
        'temporary_attachedschool_or_institute_name' => $faker->company(),
        'appointed_subject' => $faker->word(),
        'which_grades_teaching_done' => $faker->randomElement(['6-9','10-12','All']),
        'current_teaching_subject' => $faker->word(),
        'other_subjects_taught' => $faker->words(3,true),
        'assigned_class' => $faker->randomElement(['Class 1','Class 2','Class 3']),
        'other_responsibilities_assigned' => $faker->sentence(),
        'is_150_hrs_tamil_course_completed' => $faker->boolean(),
        'commuting_from_school' => $faker->randomElement(['Home','Boarding','Hostel','Other']),
        'distance_from_school' => $faker->numberBetween(1,50),
        'commuting_method_to_school' => $faker->randomElement(['Bicycle','MotorBike','Car','Bus','Threewheeler','Walk','Other']),
        'number_in_sign_sheet' => $faker->numerify('###'),
        'number_in_salary_sheet' => $faker->numerify('###'),
        'personal' => [
            'Full_name' => $faker->name(),
            'Full_name_with_initial' => $faker->firstName() . ' ' . strtoupper($faker->randomLetter()) . '.',
            'Photo' => null,
            'Gender' => $faker->randomElement(['Male','Female']),
            'Region' => $faker->state(),
            'Ethnicity' => $faker->word(),
            'Birthdate' => $faker->date(),
            'Title' => $faker->title(),
            'Marital_status' => $faker->randomElement(['Single','Married']),
            'Details_about_family_members' => $faker->sentence(),
            'Emergency_telephone_number' => $faker->phoneNumber(),
            'Email_address' => $faker->email(),
            'Fixed_telephone_number' => $faker->phoneNumber(),
            'Mobile_number' => $faker->phoneNumber(),
            'Whatsapp_number' => $faker->phoneNumber(),
        ],
        'teachersaddress' => [
            'permanent_address' => $faker->address(),
            'permanent_residential_address' => $faker->address(),
            'grama_niladari_division' => $faker->word(),
            'grama_niladari_division_number' => $faker->numerify('###'),
            'election_division' => $faker->word(),
            'election_division_number' => $faker->numerify('###'),
        ],
        'qualifications' => [
            'type_of_service_in_school' => $faker->word(),
            'gce_al_subject_stream' => $faker->word(),
            'highest_education_qualification' => $faker->word(),
            'basic_degree_stream' => $faker->word(),
            'highest_professional_qualification' => $faker->word(),
            'present_class' => $faker->randomElement(['Class 1','Class 2']),
            'present_grade' => $faker->randomElement(['Grade I','Grade II','Grade III']),
            'appointment_date_for_current_class' => $faker->date(),
            'appointment_date_for_current_grade' => $faker->date(),
            'current_appointment_service_medium' => $faker->word(),
            'appointed_subject_section' => $faker->word(),
            'subject_appointed' => $faker->word(),
            'currentservice_appointed_date' => $faker->date(),
            'subjects_taught_most_and_second_most' => $faker->words(2,true),
            'position_in_the_school' => $faker->word(),
            'assign_date_for_the_school' => $faker->date(),
        ],
        'teacherotherservice' => [
            'other_responsibilities_in_school' => $faker->sentence(),
            'EDCS_membership' => $faker->word(),
            'WSOP_Number' => $faker->numerify('#####'),
            'Agrahara_insuarence_membership' => $faker->word(),
        ],
    ];

    TeacherRequest::create([
        'teacher_NIC' => $formData['teacher_NIC'],
        'form_data' => $formData,
        'status' => 'pending',
    ]);
    }
}
