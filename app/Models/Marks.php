<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marks extends Model
{
    use HasFactory;

    protected $table = 'marks'; // Table name

    protected $fillable = [
        'reg_no',
        'subject_id',
        'marks_obtained',
        'grade',
        'term',
        'year',           // Include if you store it directly, otherwise access via studentAcademic
    ];

    // Relationship with StudentAcademicInfo (assuming 'reg_no' is the primary key in student_academic_info)
    public function student()
    {
        return $this->belongsTo(StudentAcademic::class, 'reg_no', 'reg_no');
    }

    // Relationship with Subject
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }

    public function studentAcademic()
{
    return $this->belongsTo(StudentAcademic::class, 'reg_no', 'reg_no');
}

public function getClassYearAttribute()
    {
        return $this->studentAcademic?->class?->year;
    }

    public function getClassGradeAttribute()
    {
        return $this->studentAcademic?->class?->grade;
    }
}


