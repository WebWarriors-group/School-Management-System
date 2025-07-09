<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
{
    Schema::create('student_performances', function (Blueprint $table) { // plural here
        $table->id();
        $table->integer('year');
        $table->integer('ol_passed');
        $table->integer('ol_expected');
        $table->integer('al_passed');
        $table->integer('al_expected');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('student_performances'); // plural here too
}

};
