<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSibling extends Model
{
    use HasFactory;

    protected $table = 'student_siblings';

    protected $fillable = [
        'student_id',
        'sibling_name',
        'relationship',
        'age',
        'occupation',
        'contact'
    ];

    public function student()
    {
        return $this->belongsTo(StudentAcademic::class, 'student_id');
    }
}
