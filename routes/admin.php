<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReviewController;


Route::middleware(['auth', 'verified', 'can:create,App\Models\Agency'])->prefix('admin')->name('admin.')->group(function () {

    Route::resource('agencies', AgencyController::class)->except(['index', 'show']);

    Route::resource('destinations', DestinationController::class)->except(['index', 'show']);

    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
    Route::patch('/bookings/{booking}', [BookingController::class, 'update'])->name('bookings.update');
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy'])->name('bookings.destroy');

    Route::post('/notifications/broadcast', [NotificationController::class, 'broadcast'])->name('notifications.broadcast');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::resource('notifications', NotificationController::class)->except(['index']);

    // Admin review management
    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::get('/reviews/{review}', [ReviewController::class, 'show'])->name('reviews.show');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
    Route::patch('/reviews/{review}/approve', [ReviewController::class, 'toggleApproval'])->name('reviews.toggle-approval');
    Route::patch('/reviews/{review}/verify', [ReviewController::class, 'markVerified'])->name('reviews.mark-verified');
});