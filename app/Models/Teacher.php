<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
    use HasFactory;
  use SoftDeletes;
    protected $table = 'teacher_work_infos'; // Specify the correct table name

    protected $primaryKey = 'teacher_NIC'; // Define primary key

    public $incrementing = false; // Important because teacher_NIC is a string

    protected $keyType = 'string'; // Ensures teacher_NIC is treated as a string

    protected $fillable = [
        'teacher_NIC',
        'appointed_date',
        'work_acceptance_date',
        'appointment_type',
        'salary_increment_date',
        'current_grade_of_teaching_service',
        'work_acceptance_date_school',
        'temporary_attachedschool_or_institute_name',
        'appointed_subject',
        'which_grades_teaching_done',
        'current_teaching_subject',
        'other_subjects_taught',
        'assigned_class',
        'other_responsibilities_assigned',
        'is_150_hrs_tamil_course_completed',
        'commuting_from_school',
        'distance_from_school',
        'commuting_method_to_school',
       
        'number_in_sign_sheet',
        'number_in_salary_sheet',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
    
    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'teach_subjects', 'teacher_NIC', 'subject_id');
    }

    public function class()
    {
        return $this->hasOne(ClassModel::class, 'teacher_NIC', 'teacher_NIC');
    }


    public function teachersaddress()
    {
        return $this->hasOne(TeacherAddress::class, 'teacher_NIC', 'teacher_NIC');
    }

    public function personal()
    {
        return $this->hasOne(TeacherPersonal::class, 'teacher_NIC', 'teacher_NIC');
    }
    public function teacherotherservice()
    {
        return $this->hasOne(TeacherOtherServices::class, 'teacher_NIC', 'teacher_NIC');
    }
    public function qualifications()
    {
        return $this->hasOne(Qualification::class,'teacher_NIC','teacher_NIC');

    }
}
