<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\ReviewController;


Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/agencies', [AgencyController::class, 'index'])->name('agencies.index');
Route::get('/agencies/{agency}', [AgencyController::class, 'show'])->name('agencies.show');
Route::get('/agencies-featured', [AgencyController::class, 'featured'])->name('agencies.featured');

Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations.index');
Route::get('/destinations/{destination}', [DestinationController::class, 'show'])->name('destinations.show');
Route::get('/destinations-popular', [DestinationController::class, 'popular'])->name('destinations.popular');
Route::get('/agencies/{agency}/destinations', [DestinationController::class, 'byAgency'])->name('destinations.by-agency');

// Public review routes
Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
Route::get('/reviews/{review}', [ReviewController::class, 'show'])->name('reviews.show');
Route::get('/agencies/{agency}/reviews', [ReviewController::class, 'getReviewsFor'])->defaults('type', 'agencies')->name('agencies.reviews');
Route::get('/destinations/{destination}/reviews', [ReviewController::class, 'getReviewsFor'])->defaults('type', 'destinations')->name('destinations.reviews');

Route::prefix('api')->group(function () {
    Route::get('/agencies', [AgencyController::class, 'api'])->name('api.agencies');
    Route::get('/destinations', [DestinationController::class, 'api'])->name('api.destinations');
    Route::get('/reviews', [ReviewController::class, 'index'])->name('api.reviews');
    Route::get('/agencies/{id}/reviews', [ReviewController::class, 'getReviewsFor'])->defaults('type', 'agencies')->name('api.agencies.reviews');
    Route::get('/destinations/{id}/reviews', [ReviewController::class, 'getReviewsFor'])->defaults('type', 'destinations')->name('api.destinations.reviews');
});