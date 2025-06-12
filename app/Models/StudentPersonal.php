<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentPersonal extends Model
{
    use HasFactory;

    protected $table = 'students_personal_info'; // Specify the correct table name

    //protected $primaryKey = 'reg_no'; // Define primary key

    public $incrementing = false; 

    protected $keyType = 'string';
    
    protected $fillable = [
        'reg_no',
        'full_name',
        'full_name_with_initial',
        'photo',
        'birthday',
        'gender',
        'ethnicity',
        'religion',
        'birth_certificate_number',
        'address',
        'nic_number',
        'postal_ic_number',
        'age',
        'special_needs',
        'height',
        'weight'


    ];
    public function studentacademic()
    {
        return $this->belongsTo(StudentAcademic::class, 'reg_no', 'reg_no'); 
    }

}
