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
        Schema::create('teachers_personal_info', function (Blueprint $table) {
            $table->id();
            $table->string('teacher_NIC',20);
            $table->foreign('teacher_NIC')->references('teacher_NIC')->on('teacher_work_infos')->onDelete('cascade');

            $table->string('Full_name', 100);
            $table->string('Full_name_with_initial', 100);
            $table->string('Photo')->nullable();
            $table->enum('Gender', ['Male', 'Female', 'Other']); // Limited gender choices
            $table->string('Region', 50);
            $table->string('Ethnicity', 50); // Fixed typo from "Ethinicity"
            $table->date('Birthdate');
            $table->string('Title', 50);
            $table->enum('Marital_status', ['Single', 'Married', 'Divorced', 'Widowed']); // Common values
            $table->text('Details_about_family_members')->nullable();
            $table->string('Emergency_telephone_number', 20);
            $table->string('Email_address', 100)->unique();
            $table->string('Fixed_telephone_number', 20)->nullable();
            $table->string('Mobile_number', 20)->nullable();
            $table->string('Whatsapp_number', 20)->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers_personal_info');
    }
};
