<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_messages_table.php
public function up()
{
    Schema::create('messages', function (Blueprint $table) {
        $table->id();
        $table->string('teacher_NIC')->nullable();     // who sends
        $table->string('sender_type');                // "teacher" or "admin"
       $table->string('receiver_id')->nullable();
        $table->string('receiver_type')->default('admin'); // usually "admin"
        $table->string('subject')->nullable();
        $table->text('message');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
