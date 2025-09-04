<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class Marks extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'marks_obtained' => $this->marks_obtained,
        'subject' => [
            'subject_name' => $this->subject->subject_name,
        ],
        ];
    }
}
