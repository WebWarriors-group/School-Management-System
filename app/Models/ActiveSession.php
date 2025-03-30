<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ActiveSession extends Model
{
    protected $table = 'sessions'; // Use the default 'sessions' table
    protected $primaryKey = 'id';
    public $incrementing = false; // Because 'id' is a VARCHAR, not an INT
    public $timestamps = false; // The 'sessions' table doesn't have created_at or updated_at columns

    protected $fillable = [
        'id', 'user_id', 'ip_address', 'user_agent', 'payload', 'last_activity'
    ];

    // Define the relationship to the User model
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
