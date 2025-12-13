<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReviewController;


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('bookings', BookingController::class);
    Route::get('/my-bookings', [BookingController::class, 'index'])->name('my-bookings');
    Route::get('/bookings-upcoming', [BookingController::class, 'upcoming'])->name('bookings.upcoming');
    Route::get('/bookings-history', [BookingController::class, 'history'])->name('bookings.history');
    Route::patch('/bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');
    Route::patch('/bookings/{booking}/confirm', [BookingController::class, 'confirm'])->name('bookings.confirm');
    Route::patch('/bookings/{booking}/mark-paid', [BookingController::class, 'markPaid'])->name('bookings.mark-paid');

    Route::resource('notifications', NotificationController::class);
    Route::patch('/notifications/{notification}/mark-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-read');
    Route::patch('/notifications/{notification}/mark-unread', [NotificationController::class, 'markAsUnread'])->name('notifications.mark-unread');
    Route::patch('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-read');
    Route::delete('/notifications/bulk-delete', [NotificationController::class, 'bulkDelete'])->name('notifications.bulk-delete');
    Route::patch('/notifications/bulk-mark-read', [NotificationController::class, 'bulkMarkAsRead'])->name('notifications.bulk-mark-read');

    // Review routes for authenticated users
    Route::resource('reviews', ReviewController::class)->except(['index', 'show']);
    Route::get('/my-reviews', [ReviewController::class, 'myReviews'])->name('my-reviews');
    Route::patch('/reviews/{review}/approve', [ReviewController::class, 'toggleApproval'])->name('reviews.toggle-approval');
    Route::patch('/reviews/{review}/verify', [ReviewController::class, 'markVerified'])->name('reviews.mark-verified');

    Route::prefix('api')->group(function () {
        Route::get('/bookings', [BookingController::class, 'api'])->name('api.bookings');
        Route::get('/notifications/recent', [NotificationController::class, 'recent'])->name('api.notifications.recent');
        Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount'])->name('api.notifications.unread-count');
    });
});