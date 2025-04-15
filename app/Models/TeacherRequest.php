<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class TeacherRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_NIC',
        'form_data',
        'status',
    ];

    protected $casts = [
        'form_data' => 'array',

    ];
}
