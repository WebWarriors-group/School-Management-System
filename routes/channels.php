<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('study-materials.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});

