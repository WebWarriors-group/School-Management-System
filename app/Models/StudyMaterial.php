<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyMaterial extends Model
{
    use HasFactory;

    protected $table = 'study_materials';

    protected $fillable = [
        'uploaded_by', 
        'category',
        'title', 
        'grade', 
        'subject', 
        'year',
        'file_url', 
    ];

    public function uploaded_by()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
