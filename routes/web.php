<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\ChildController;
use Illuminate\Support\Facades\Route;

// 1. Guest & Landing Pages
Route::get('/', [LandingController::class, 'home'])->name('home');
Route::get('/about', [LandingController::class, 'about'])->name('about');
Route::get('/blog', [LandingController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [LandingController::class, 'blogPost'])->name('blog.post');
Route::get('/pricing', [LandingController::class, 'pricing'])->name('pricing');
Route::get('/contact', [LandingController::class, 'contact'])->name('contact');
Route::post('/contact', [LandingController::class, 'submitContact'])->name('contact.submit');

// 2. Authenticated Routes
Route::middleware('auth')->group(function () {
    // Onboarding
    Route::get('/auth/onboarding', [ParentController::class, 'onboarding'])->name('onboarding');
    Route::post('/auth/onboarding', [ParentController::class, 'saveOnboarding'])->name('onboarding.save');

    // Standard profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // 3. Admin Area (role: admin)
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/users', [AdminController::class, 'users'])->name('users');
        Route::get('/cms', [AdminController::class, 'cms'])->name('cms');
        Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
        Route::get('/profile', [AdminController::class, 'profile'])->name('profile');
    });

    // 4. Teacher Area (role: teacher)
    Route::middleware('role:teacher')->prefix('teacher')->name('teacher.')->group(function () {
        Route::get('/', [TeacherController::class, 'dashboard'])->name('dashboard');
        Route::get('/students', [TeacherController::class, 'students'])->name('students');
        Route::get('/resources', [TeacherController::class, 'resources'])->name('resources');
        Route::get('/license', [TeacherController::class, 'license'])->name('license');
        Route::get('/profile', [TeacherController::class, 'profile'])->name('profile');
    });

    // 5. Parent Area (role: parent)
    Route::middleware('role:parent')->prefix('parent')->name('parent.')->group(function () {
        Route::get('/', [ParentController::class, 'dashboard'])->name('dashboard');
        Route::get('/children', [ParentController::class, 'children'])->name('children');
        Route::post('/children', [ParentController::class, 'storeChild'])->name('children.store');
        Route::get('/reports', [ParentController::class, 'reports'])->name('reports');
        Route::get('/billing', [ParentController::class, 'billing'])->name('billing');
        Route::get('/profile', [ParentController::class, 'profile'])->name('profile');
        
        // Select child profile to play
        Route::get('/select-child/{id}', [ChildController::class, 'selectChild'])->name('select-child');
    });

    // 6. Child Area (accessible to authenticated users with selected child)
    Route::prefix('child')->name('child.')->group(function () {
        Route::get('/', [ChildController::class, 'dashboard'])->name('dashboard');
        Route::get('/hall-of-fame', [ChildController::class, 'hallOfFame'])->name('hall-of-fame');
        Route::get('/module/{id}', [ChildController::class, 'module'])->name('module');
        Route::post('/module/{id}/progress', [ChildController::class, 'updateProgress'])->name('progress.update');
    });
});

require __DIR__.'/auth.php';
