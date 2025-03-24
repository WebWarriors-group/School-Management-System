<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $primaryKey = 'subject_id'; // Use subject_id as the primary key
    public $incrementing = false; // Since subject_id is a string
    protected $keyType = 'string'; // Make sure the primary key is treated as a string

    protected $fillable = [
        'subject_id',
        'subject_name',
    ];

    public function classes()
    {
        return $this->belongsToMany(ClassModel::class, 'class_subjects', 'subject_id', 'class_id');
    }
    

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'teach_subjects', 'subject_id', 'teacher_NIC');
    }
    public function students()
    {
        return $this->belongsToMany(StudentAcademic::class, 'student_subjects', 'subject_id', 'reg_no');
    }
    public function Marks()
    {
        return $this->hasMany(Marks::class, 'subject_id', 'subject_id');
    }
    public function study_material()
    {
        return $this->hasMany(StudyMaterial::class, 'subject_id', 'subject_id');
    }

}
