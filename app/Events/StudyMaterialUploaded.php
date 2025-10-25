<?php
namespace App\Events;

use App\Models\StudyMaterial;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class StudyMaterialUploaded implements ShouldBroadcast
{
    use SerializesModels;

    public StudyMaterial $material;

    public function __construct(StudyMaterial $material)
    {
        $this->material = $material;
    }

    public function broadcastOn()
    {
        // Broadcast on private channel for the admin (or intended user)
        return new PrivateChannel('study-materials.' . $this->material->uploaded_by);
    }

    public function broadcastAs()
    {
        return 'StudyMaterialUploaded';
    }
}
