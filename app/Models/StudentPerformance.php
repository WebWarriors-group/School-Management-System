<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class StudentPerformance extends Model
{
  use HasFactory;
    protected $fillable = [
  'year', 'ol_passed', 'ol_expected',
  'al_passed', 'al_expected'
];

}
