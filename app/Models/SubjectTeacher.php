<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectTeacher extends Model
{

    protected $table = 'class_subject_teachers'; // Your pivot table name

    protected $fillable = ['class_id', 'subject_id', 'teacher_NIC'];

    public $timestamps = false; // if your table has no timestamps
}
