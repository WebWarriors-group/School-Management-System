<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\StudentPersonal;
use App\Models\ClassModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudentAcademic extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'student_academic_info';
    protected $primaryKey = 'reg_no';
    public $incrementing = false;
    protected $keyType = 'integer';
    protected $casts = ['admission_date' => 'date'];
    protected $fillable = [
        'reg_no',
        'class_id',
        'distance_to_school',
        'method_of_coming_to_school',
        'grade_6_9_asthectic_subjects',
        'grade_10_11_basket1_subjects',
        'grade_10_11_basket2_subjects',
        'grade_10_11_basket3_subjects',
        'receiving_any_grade_5_scholarship',
        'receiving_any_samurdhi_aswesuma',
        'receiving_any_scholarship',
        'admission_date',
    ];
    protected $autoLoadRelations = true;
    public function subjects()
    {

        return $this->belongsToMany(Subject::class, 'student_subjects', 'reg_no', 'subject_id');


    }

    public function personal()
    {
        return $this->hasOne(StudentPersonal::class, 'reg_no', 'reg_no');
    }

    public function family()
    {
        return $this->hasOne(StudentFamilyInfo::class, 'reg_no', 'reg_no');
    }

    public function siblings()
    {
        return $this->hasMany(StudentSibling::class, 'reg_no', 'reg_no');
    }

    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'class_id', 'class_id');
    }

    public function marks()
    {
        return $this->hasMany(Marks::class, 'reg_no', 'reg_no');
    }

    public function studentpersonal()
    {
        return $this->hasOne(StudentPersonal::class, 'reg_no', 'reg_no'); 
    }

    public function subject()
    {
        return $this->hasMany(StudentSubject::class, 'reg_no', 'reg_no');
    }
}
