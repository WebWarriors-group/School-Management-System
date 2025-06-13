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
    // 1. Convert existing timestamp values to Unix integer values
    DB::table('sessions')->update([
        'last_activity' => DB::raw('UNIX_TIMESTAMP(last_activity)')
    ]);

    // 2. Change column type to unsignedBigInteger
    Schema::table('sessions', function (Blueprint $table) {
        $table->unsignedBigInteger('last_activity')->change();
    });
}

};
