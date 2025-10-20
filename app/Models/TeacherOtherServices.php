<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherOtherServices extends Model
{
    use HasFactory;

    protected $table = 'other_services'; 
    public $timestamps = false;

    protected $fillable = [
        'teacher_NIC',
        'other_responsibilities_in_school',
        'EDCS_membership',
        'WSOP_Number',
        'Agrahara_insuarence_membership'
    ];

    
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_NIC', 'teacher_NIC');
    }
}
