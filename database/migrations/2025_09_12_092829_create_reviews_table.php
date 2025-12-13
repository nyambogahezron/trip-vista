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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->morphs('reviewable'); // Creates reviewable_id and reviewable_type
            $table->integer('rating')->unsigned(); // 1-5 star rating
            $table->text('comment')->nullable();
            $table->json('images')->nullable(); // Optional review images
            $table->boolean('verified_purchase')->default(false);
            $table->boolean('is_approved')->default(true);
            $table->timestamps();

            // Add indexes for better performance
            $table->index(['reviewable_id', 'reviewable_type']);
            $table->index(['user_id', 'reviewable_id', 'reviewable_type']);
            $table->index('rating');

            // Ensure unique review per user per reviewable
            $table->unique(['user_id', 'reviewable_id', 'reviewable_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
