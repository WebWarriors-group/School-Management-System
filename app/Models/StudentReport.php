<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentReport extends Model
{
    use HasFactory;

    protected $table = 'student_reports'; // Table name

    protected $primaryKey = 'report_id'; // Primary Key
    public $incrementing = false; // Since report_id is a string, disable auto-incrementing
    protected $keyType = 'string'; // Define primary key as string

    protected $fillable = [
        'report_id',
        'reg_no',
        'term',
        'total_days',
        'days_attended',
        'days_absent',
        'behavior_rating',
        'teacher_comments'
    ];

    // Relationship with StudentAcademicInfo
    public function student()
    {
        return $this->hasOne(StudentAcademic::class, 'reg_no', 'reg_no');
    }
}
