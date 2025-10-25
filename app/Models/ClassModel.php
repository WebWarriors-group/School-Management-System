<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use App\Models\StudentAcademics;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassModel extends Model
{
    use HasFactory;
use SoftDeletes;
    protected $table = 'classes'; 

    protected $primaryKey = 'class_id'; 
    public $incrementing = false; 
    protected $keyType = 'string'; 

    protected $fillable = [
        'class_id',
        'teacher_NIC',
        'class_name',
        'grade',
        'year',
        'section',
        'number_of_students'
    ];
   
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_NIC', 'teacher_NIC');
    }
    
    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'class_subjects', 'class_id', 'subject_id');
    }
    
    public function studentacademics()
{
    return $this->hasMany(StudentAcademic::class, 'class_id', 'class_id');
}

}
