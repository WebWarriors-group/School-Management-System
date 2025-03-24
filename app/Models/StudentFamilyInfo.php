<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentFamilyInfo extends Model
{
    use HasFactory;

    protected $table = 'student_family_info';

    protected $fillable = [
        'student_id',
        'mother_name',
        'mother_occupation',
        'mother_income',
        'mother_working_place',
        'mother_contact',
        'mother_email',
        'mother_whatsapp',
        'father_name',
        'father_occupation',
        'father_income',
        'father_working_place',
        'father_contact',
        'father_email',
        'father_whatsapp',
        'siblings'
    ];

    protected $casts = [
        'siblings' => 'array', // JSON to array conversion
    ];

    public function student()
    {
        return $this->belongsTo(StudentAcademic::class, 'student_id');
    }
}
