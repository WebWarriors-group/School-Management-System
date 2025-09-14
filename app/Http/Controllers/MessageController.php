<?php

// app/Http/Controllers/MessageController.php
namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    


    public function indexForAdmin()
    {
       $messages = Message::latest()->limit(10)->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'teacher_NIC' => 'required|string',
            'sender_type' => 'required|string',
            'message' => 'required|string',
            'subject' => 'nullable|string',
        ]);

        $message = Message::create($request->all());

        return response()->json($message, 201);
    }

     // GET /api/teacher/messages
public function teacherMessages()
{
    
    $teacherNIC = auth()->user()->teacher->teacher_NIC ?? null;

    if (!$teacherNIC) {
        return response()->json([]);
    }

    // Fetch messages where teacher is either sender or receiver
    $messages = Message::where(function($q) use ($teacherNIC) {
        $q->where('teacher_NIC', $teacherNIC)
          ->orWhere('receiver_id', $teacherNIC); // if receiver_id is used
    })
    ->orderBy('created_at', 'desc')
    ->get();

    return response()->json($messages);
}

// POST /api/teacher/messages/send
public function send(Request $request)
{
    $request->validate([
        'subject' => 'nullable|string|max:255',
        'message' => 'required|string',
    ]);

    $user = auth()->user();

    if (!$user || !$user->teacher) {
        return response()->json(['error' => 'Teacher record not found'], 400);
    }

    $teacherNIC = $user->teacher->teacher_NIC;

    $msg = Message::create([
        'teacher_NIC' => $teacherNIC,
        'sender_type' => 'teacher',
        'receiver_id' => 'admin',
        'receiver_type' => 'admin',
        'subject' => $request->subject,
        'message' => $request->message,
    ]);

    return response()->json($msg, 201);
}

 public function index()
    {
        return response()->json(
            Message::with('replies')->latest()->get()
        );
    }

    // Reply to a message
    public function reply(Request $request)
{
    $request->validate([
        'receiver_id' => 'required|string', // teacher_NIC
        'message' => 'required|string',
        'subject' => 'nullable|string'
    ]);

    $msg = Message::create([
        'teacher_NIC' => null,       // admin sender
        'sender_type' => 'admin',
        'receiver_id' => $request->receiver_id,
        'receiver_type' => 'teacher',
        'subject' => $request->subject,
        'message' => $request->message
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Reply sent successfully',
        'data' => $msg
    ], 201);
}


}

