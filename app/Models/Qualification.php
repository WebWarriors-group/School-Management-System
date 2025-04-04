<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qualification extends Model
{
    use HasFactory;

    protected $table = 'teacher_qualifications'; // Set the table name

    //protected $primaryKey = 'teacher_NIC'; // Primary key if different from auto-incrementing ID
    public $incrementing = false; // Because teacher_NIC is a string
    public $timestamps = false;
    protected $keyType = 'string'; // Define the key type as string
    protected $fillable = [
        
        'teacher_NIC',
        'type_of_service_in_school',
        'gce_al_subject_stream',
        'highest_education_qualification',
        'basic_degree_stream',
        'highest_professional_qualification',
        'present_class',
        'present_grade',
        'appointment_date_for_current_class',
        'appointment_date_for_current_grade',
        'current_appointment_service_medium',
        'appointed_subject_section',
        'subject_appointed',
        'currentservice_appointed_date',
        'subjects_taught_most_and_second_most',
        'position_in_the_school',
        'assign_date_for_the_school'
    ];
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_NIC', 'teacher_NIC'); // Relationship to Teacher model
    }


}
