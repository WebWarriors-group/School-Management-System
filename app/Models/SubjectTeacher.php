<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectTeacher extends Model
{

    protected $table = 'class_subject_teachers'; // Your pivot table name

    protected $fillable = ['class_id', 'subject_id', 'teacher_NIC'];

    public $timestamps = false; // if your table has no timestamps

    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'class_id', 'class_id');
    }

    // Relation to Subject model
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }

    // Relation to Teacher model (assuming teacher_NIC is primary key)
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_NIC', 'teacher_NIC');
    }
}
