<?php

// app/Models/Message.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\HasFactory; 

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_NIC',
        'sender_type',
        'receiver_id',
        'receiver_type',
        'subject',
        'message',
    ];

  public function teacher()
{
    return $this->belongsTo(Teacher::class, 'teacher_NIC', 'teacher_NIC');
}
}
