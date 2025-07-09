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
        Schema::create('classes', function (Blueprint $table) {
            $table->integer('class_id')->primary();
             $table->softDeletes();
            $table->string('teacher_NIC',20)->nullable(); // Define the column first
            $table->foreign('teacher_NIC')
                ->references('teacher_NIC')
                ->on('teacher_work_infos')
                ->onDelete('cascade')->nullable();
            $table->string('class_name', 10)->nullable();
            $table->smallInteger('grade');
             $table->smallInteger('year');
            $table->integer('number_of_students')->nullable();
            $table->char('section');
          
           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
