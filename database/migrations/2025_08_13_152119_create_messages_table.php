<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('sender_id');      // teacher_NIC or admin id
            $table->string('sender_type');    // 'teacher' or 'admin'
            $table->string('receiver_id');    // admin id or teacher_NIC
            $table->string('receiver_type');  // 'teacher' or 'admin'
            $table->string('subject')->nullable();
            $table->text('message');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('messages');
    }
};
