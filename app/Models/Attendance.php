<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $table='attendances';

    protected $fillable = ['reg_no', 'date', 'status'];

    public function student()
    {
        return $this->belongsTo(StudentAcademic::class, 'reg_no', 'reg_no');
    }
    
}
