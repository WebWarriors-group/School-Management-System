<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    
    use HasFactory, Notifiable;

   
    protected $fillable = [
        'id',
        'name',
        'email',
        'role',
        'password',
    ];

   
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function sessions()
    {
        return $this->hasMany(ActiveSession::class, 'user_id');
    }

    
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function teacher()
    {
        return $this->hasOne(Teacher::class,'user_id','id');
    }

    public function material()
    {
        return $this->hasMany(StudyMaterial::class);
    }

    public function student()
    {
        return $this->hasOne(StudentAcademic::class,'user_id','id');
    }
}
