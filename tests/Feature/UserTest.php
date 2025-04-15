<?php
use App\Models\User;

// test('front page loads successfully', function () {
//     $user = User::factory()->create([
//         'role' => 'admin', // match your middleware check
//     ]);

//     $response = $this->actingAs($user)->get('/admin/teacher');

//     $response->assertStatus(200);
// });


test('front page loads successfully1', function () {
    $user = User::factory()->create([
        'role' => 'admin', // match your middleware check
    ]);

    $response = $this->actingAs($user)->get('/mark/MarksPage');

    $response->assertStatus(200);
});

