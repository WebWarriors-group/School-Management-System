<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    protected $fillable = ['category_id', 'title', 'image_path'];

    public function category()
    {
        return $this->belongsTo(GalleryCategory::class);
    }
}
