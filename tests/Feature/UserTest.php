<?php
use App\Models\User;



test('front page loads successfully1', function () {
    $user = User::factory()->create([
        'role' => 'admin', 
    ]);

    $response = $this->actingAs($user)->get('/mark/MarksPage');

    $response->assertStatus(200);
});

