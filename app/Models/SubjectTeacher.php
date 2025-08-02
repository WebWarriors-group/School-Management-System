<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectTeacher extends Model
{

    protected $table = 'class_subject_teachers'; // Your pivot table name

    protected $fillable = ['class_id', 'subject_id', 'teacher_NIC'];

    public $timestamps = false; 


    public function classes()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
