<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentReport extends Model
{
    use HasFactory;

    protected $table = 'student_reports'; 

    protected $primaryKey = 'report_id'; 
    public $incrementing = false; 
    protected $keyType = 'string'; 

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

    
    public function student()
    {
        return $this->hasOne(StudentAcademic::class, 'reg_no', 'reg_no');
    }
}
