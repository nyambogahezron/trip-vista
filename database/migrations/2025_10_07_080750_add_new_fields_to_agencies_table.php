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
        Schema::table('agencies', function (Blueprint $table) {
            $table->year('founded_year')->nullable()->after('location');
            $table->json('specialties')->nullable()->after('founded_year');
            $table->json('locations')->nullable()->after('specialties');
            $table->integer('review_count')->default(0)->after('locations');
            $table->boolean('is_featured')->default(false)->after('review_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('agencies', function (Blueprint $table) {
            $table->dropColumn(['founded_year', 'specialties', 'locations', 'review_count', 'is_featured']);
        });
    }
};
