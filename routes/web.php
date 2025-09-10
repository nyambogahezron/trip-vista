<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DashboardController;


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



Route::prefix('api')->group(function () {
    Route::get('/agencies', [AgencyController::class, 'api'])->name('api.agencies');
    Route::get('/destinations', [DestinationController::class, 'api'])->name('api.destinations');

    Route::middleware('auth')->group(function () {
        Route::get('/bookings', [BookingController::class, 'api'])->name('api.bookings');
        Route::get('/notifications/recent', [NotificationController::class, 'recent'])->name('api.notifications.recent');
        Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount'])->name('api.notifications.unread-count');
    });
});


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

    Route::middleware(['can:create,App\Models\Agency'])->group(function () {

        Route::resource('admin/agencies', AgencyController::class, [
            'as' => 'admin'
        ])->except(['index', 'show']);

        Route::resource('admin/destinations', DestinationController::class, [
            'as' => 'admin'
        ])->except(['index', 'show']);

        Route::get('/admin/bookings', [BookingController::class, 'index'])->name('admin.bookings.index');
        Route::get('/admin/bookings/{booking}', [BookingController::class, 'show'])->name('admin.bookings.show');
        Route::patch('/admin/bookings/{booking}', [BookingController::class, 'update'])->name('admin.bookings.update');
        Route::delete('/admin/bookings/{booking}', [BookingController::class, 'destroy'])->name('admin.bookings.destroy');

        Route::post('/admin/notifications/broadcast', [NotificationController::class, 'broadcast'])->name('admin.notifications.broadcast');
        Route::get('/admin/notifications', [NotificationController::class, 'index'])->name('admin.notifications.index');
        Route::resource('admin/notifications', NotificationController::class, [
            'as' => 'admin'
        ])->except(['index']);
    });
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
