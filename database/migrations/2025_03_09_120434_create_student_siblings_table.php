<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_siblings', function (Blueprint $table) {
            $table->id();
            $table->integer('reg_no');
            $table->foreign('reg_no')->references('reg_no')->on('student_academic_info')->onDelete('cascade');

            $table->string('sibling_name', 100)->nullable();
            $table->string('relationship', 20)->nullable();
            $table->integer('sibling_age')->nullable();
            $table->string('occupation', 150)->nullable();
            $table->string('contact', 20)->nullable();
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_siblings');
    }
};
