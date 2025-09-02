<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;

class MessageController extends Controller
{
    // Teacher sends message → admin
    public function sendTeacherMessage(Request $request) {
        $request->validate([
            'subject' => 'nullable|string',
            'message' => 'required|string',
        ]);

        $admin = User::where('role', 'admin')->first();
        if (!$admin) return response()->json(['error' => 'Admin not found'], 404);

        $message = Message::create([
            'sender_id' => auth()->user()->teacher_NIC,
            'sender_type' => 'teacher',
            'receiver_id' => $admin->id,
            'receiver_type' => 'admin',
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        return response()->json(['success' => true, 'message' => $message]);
    }

    // Admin sends message → specific teacher
    public function sendAdminMessage(Request $request) {
        $request->validate([
            'receiver_id' => 'required|string', // teacher_NIC
            'subject' => 'nullable|string',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'sender_type' => 'admin',
            'receiver_id' => $request->receiver_id,
            'receiver_type' => 'teacher',
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        return response()->json(['success' => true, 'message' => $message]);
    }

    // Fetch messages for teacher
    public function fetchTeacherMessages() {
        $teacher_NIC = auth()->user()->teacher_NIC;

        $messages = Message::where('receiver_id', $teacher_NIC)
            ->orWhere('sender_id', $teacher_NIC)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    // Fetch messages for admin
    public function fetchAdminMessages() {
        $admin_id = auth()->id();

        $messages = Message::where('receiver_id', $admin_id)
            ->orWhere('sender_type', 'teacher')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    // Optional: fetch all teachers for admin dropdown
    public function fetchTeachers() {
        $teachers = User::where('role', 'teacher')->get(['name','teacher_NIC']);
        return response()->json($teachers);
    }
}
