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
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('agency_id');
            $table->foreign('agency_id')->references('id')->on('agencies')->onDelete('cascade');
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->string('location')->nullable();
            $table->string('featured_image')->nullable();
            $table->string('category')->nullable();
            $table->string('rating')->nullable();
            $table->string('price')->nullable();
            $table->string('activities');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destinations');
    }
};
