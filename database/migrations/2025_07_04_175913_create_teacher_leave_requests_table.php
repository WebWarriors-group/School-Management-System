<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teacher_leave_requests', function (Blueprint $table) {
    $table->id();
    $table->string('teacher_NIC');
    $table->string('leave_type');
    $table->date('leave_start_date');
    $table->date('leave_end_date');
    $table->text('reason');
    $table->boolean('requires_substitute')->default(false);
    $table->string('substitute_teacher_name')->nullable();
    $table->string('substitute_teacher_contact')->nullable();
    $table->text('comments')->nullable();
    $table->string('supporting_document')->nullable();

    $table->enum('status', ['Pending', 'Approved', 'Rejected'])->default('Pending');
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_leave_requests');
    }
};
