<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassModel extends Model
{
    use HasFactory;
use SoftDeletes;
    protected $table = 'classes'; // Explicitly specify the table name

    protected $primaryKey = 'class_id'; // Set primary key
    public $incrementing = false; // Since class_id is a string (not auto-increment)
    protected $keyType = 'string'; // Define primary key type

    protected $fillable = [
        'class_id',
        'teacher_NIC',
        'class_name',
        'grade',
        'section',
        'number_of_students'
    ];
   
    public function teachers()
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
