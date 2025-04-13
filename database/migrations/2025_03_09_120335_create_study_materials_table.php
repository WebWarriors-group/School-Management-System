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
        Schema::create('study_materials', function (Blueprint $table) {
            $table->id(); // material_id (Primary Key)
            $table->integer('subject_id');
            $table->foreign('subject_id')->references('subject_id')->on('subjects')->onDelete('cascade');
            $table->string('category',25)->nullable();
            $table->string('title',255);
            $table->smallinteger('grade');
            $table->string('subject', 40);
            $table->integer('year');
            $table->string('file_path');
            $table->timestamps();

            // Foreign Key Constraints

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_materials');
    }
};
