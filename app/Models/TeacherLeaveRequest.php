<?php

// app/Models/TeacherLeaveRequest.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherLeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
    'teacher_NIC', 'leave_type', 'leave_start_date', 'leave_end_date',
    'reason', 'requires_substitute', 'substitute_teacher_name',
    'substitute_teacher_contact', 'comments', 'supporting_document','status',
];


    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
