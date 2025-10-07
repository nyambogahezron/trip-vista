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
        Schema::table('destinations', function (Blueprint $table) {
            $table->string('country')->nullable()->after('location');
            $table->text('long_description')->nullable()->after('description');
            $table->json('weather_info')->nullable()->after('activities');
            $table->json('best_time_to_visit')->nullable()->after('weather_info');
            $table->json('temperature_ranges')->nullable()->after('best_time_to_visit');
            $table->integer('duration_days')->default(5)->after('temperature_ranges');
            $table->integer('max_group_size')->default(12)->after('duration_days');
            $table->json('included_services')->nullable()->after('max_group_size');
            $table->json('photo_gallery')->nullable()->after('included_services');
            $table->boolean('is_featured')->default(false)->after('photo_gallery');
            $table->string('difficulty_level')->nullable()->after('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn([
                'country',
                'long_description',
                'weather_info',
                'best_time_to_visit',
                'temperature_ranges',
                'duration_days',
                'max_group_size',
                'included_services',
                'photo_gallery',
                'is_featured',
                'difficulty_level'
            ]);
        });
    }
};
