<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherPersonal extends Model
{
    use HasFactory;

    protected $table = 'teachers_personal_info'; 
    public $timestamps = false;
    protected $fillable = [
        'teacher_NIC', 
        'Full_name',
        'Full_name_with_initial',
        'Photo',
        'Gender',
        'Region',
        'Ethnicity',
        'Birthdate',
        'Title',
        'Marital_status',
        'Details_about_family_members',
        'Emergency_telephone_number',
        'Email_address',
        'Fixed_telephone_number',
        'Mobile_number',
        'Whatsapp_number',
        'verification_code',
        'is_verified',
    ];

    
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_NIC', 'teacher_NIC');
    }

    
}
