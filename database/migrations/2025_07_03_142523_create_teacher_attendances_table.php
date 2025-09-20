<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('teacher_attendances', function (Blueprint $table) {
            $table->id();
            $table->string('teacher_NIC');
            $table->date('date');
            $table->enum('status', ['Present', 'Absent']);
            $table->timestamps();

            $table->unique(['teacher_NIC', 'date']);
            $table->foreign('teacher_NIC')
                ->references('teacher_NIC')
                ->on('teacher_work_infos')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teacher_attendances');
    }
};
