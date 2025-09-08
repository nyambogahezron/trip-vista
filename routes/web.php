<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/destinations', function () {
    return Inertia::render('destinations');
})->name('destinations');

Route::get('/destinations/{id}', function ($id) {
    return Inertia::render('destination-details', ['id' => $id]);
})->name('destinations.show');

Route::get('/agencies', function () {
    return Inertia::render('agencies');
})->name('agencies');

Route::get('/agencies/{id}', function ($id) {
    return Inertia::render('agency-details', ['id' => $id]);
})->name('agencies.show');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
