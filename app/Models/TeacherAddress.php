<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherAddress extends Model
{
    use HasFactory;

    protected $table = 'teachers_address'; // Specify the correct table name
    public $timestamps = false;

    protected $fillable = [
        'teacher_NIC',
        'permanent_address',
        'permanent_residential_address',
        'grama_niladari_division',
        'grama_niladari_division_number',
        'election_division',
        'election_division_number	
',
    ];

    // Define the relationship with the Teacher model
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_NIC', 'teacher_NIC');
    }
}
