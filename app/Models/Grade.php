<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $table = 'grades'; // Table name

    protected $fillable = [
        
        
        'grade',
        'subject_id',
        'subject_type'
    ];

    public function subjects ()
{
    return $this->hasMany(Subject::class, 'class_id', 'class_id');
}

}
