<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSibling extends Model
{
    use HasFactory;

    protected $table = 'student_siblings';

    protected $fillable = [
        'reg_no',
        'sibling_name',
        'relationship',
        'sibling_age',
        'occupation',
        'contact'
    ];

    public function studentacademic()
    {
        return $this->belongsTo(StudentAcademic::class, 'reg_no','reg_no');
    }
}
