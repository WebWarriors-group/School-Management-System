<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSubject extends Model
{
    use HasFactory;

    protected $table = 'student_subjects';
 protected $keyType='string';
 public $incrementing = true;
    protected $fillable = [
        'reg_no',
        'subject_id',
    ];

   
    public function studentacademic()
    {
        return $this->belongsTo(StudentAcademic::class, 'reg_no', 'reg_no');
    }

    public function subjects()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
}
