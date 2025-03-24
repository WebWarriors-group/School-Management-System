<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherOtherService extends Model
{
    use HasFactory;

    protected $table = 'other_services'; // Explicitly defining the table name

    protected $fillable = [
        'teacher_NIC',
        'other_responsibilities_in_school',
        'EDCS_membership',
        'WSOP_Number',
        'Agrahara_insuarence_membership',
    ];

    // Relationship with TeacherWorkInfo
    public function teacher()
    {
        return $this->belongsToMany(Teacher::class, 'teacher_NIC', 'teacher_NIC');
    }
}
