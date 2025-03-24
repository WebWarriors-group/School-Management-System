<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherPersonal extends Model
{
    use HasFactory;

    protected $table = 'teachers_personal_info'; // Ensure correct table name

    protected $fillable = [
        'teacher_NIC', // This is a foreign key, not the primary key
        'full_name',
        'full_name_with_initial',
        'photo',
        'gender',
        'region',
        'ethnicity',
        'birthdate',
        'title',
        'marital_status',
        'details_about_family_members',
        'emergency_telephone_number',
        'email_address',
        'fixed_telephone_number',
        'mobile_number',
        'whatsapp_number',
    ];

    // Define the relationship with Teacher (teacher_work_infos table)
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_NIC', 'teacher_NIC');
    }

    
}
