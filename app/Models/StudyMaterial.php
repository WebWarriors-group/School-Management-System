<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyMaterial extends Model
{
    use HasFactory;

    protected $table = 'study_materials';

    protected $fillable = [
        'subject_id', 
        'uploaded_by', 
        'title', 
        'grade', 
        'subject', 
        'year',
        'file_path', 
        'uploaded_at'
    ];

    public function subject()
    {
        return $this->belongsToMany(Subject::class, 'subject_id');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'uploaded_by');
    }
}
