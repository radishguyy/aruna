<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\ChildController;
use App\Http\Controllers\KidsAuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Guest & Landing Pages
Route::get('/', [LandingController::class, 'home'])->name('home');
Route::get('/about', [LandingController::class, 'about'])->name('about');
Route::get('/blog', [LandingController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [LandingController::class, 'blogPost'])->name('blog.post');
Route::get('/pricing', [LandingController::class, 'pricing'])->name('pricing');
Route::get('/contact', [LandingController::class, 'contact'])->name('contact');
Route::post('/contact', [LandingController::class, 'submitContact'])->name('contact.submit');

// Secret Admin Login Portal (Hidden from public navigation)
Route::get('/admin/login', function () {
    return Inertia::render('Admin/Login');
})->middleware('guest')->name('admin.login');

// Kids Portal
Route::get('/kids/login', function () {
    return redirect()->route('login', ['tab' => 'kids']);
})->name('kids.login');
Route::get('/kids', function () {
    return redirect()->route('kids.login');
});
Route::get('/api/kids/lookup', [KidsAuthController::class, 'lookup']);
Route::post('/kids/login', [KidsAuthController::class, 'login']);

// 2. Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        if (session('is_kids_session')) {
            return redirect()->route('child.dashboard');
        }

        $user = auth()->user();

        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        if ($user->role === 'teacher') {
            return redirect()->route('teacher.dashboard');
        }

        return redirect()->route('parent.dashboard');
    })->name('dashboard');

    // Adult-only authenticated routes
    Route::middleware(\App\Http\Middleware\EnsureNotKidsSession::class)->group(function () {
        // Onboarding
        Route::get('/auth/onboarding', [ParentController::class, 'onboarding'])->name('onboarding');
        Route::post('/auth/onboarding', [ParentController::class, 'saveOnboarding'])->name('onboarding.save');

        // Checkout & Payment Funnel
        Route::get('/checkout/initiate', [\App\Http\Controllers\CheckoutController::class, 'initiate'])->name('checkout.initiate');
        Route::get('/checkout/{order}/instructions', [\App\Http\Controllers\CheckoutController::class, 'instructions'])->name('checkout.instructions');
        Route::post('/checkout/{order}/confirm-method', [\App\Http\Controllers\CheckoutController::class, 'confirmMethod'])->name('checkout.confirm-method');
        Route::get('/checkout/{order}/upload-proof', [\App\Http\Controllers\CheckoutController::class, 'uploadProofForm'])->name('checkout.upload-proof');
        Route::post('/checkout/{order}/upload-proof', [\App\Http\Controllers\CheckoutController::class, 'submitProof'])->name('checkout.submit-proof');
        Route::get('/checkout/{order}/pending', [\App\Http\Controllers\CheckoutController::class, 'pendingApproval'])->name('checkout.pending');

        // Standard profile routes
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // 3. Admin Area (role: admin)
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

        // Admin Payments
        Route::get('/payments', [\App\Http\Controllers\Admin\PaymentController::class, 'index'])->name('payments.index');
        Route::get('/payments/{order}', [\App\Http\Controllers\Admin\PaymentController::class, 'show'])->name('payments.show');
        Route::post('/payments/{order}/approve', [\App\Http\Controllers\Admin\PaymentController::class, 'approve'])->name('payments.approve');
        Route::post('/payments/{order}/reject', [\App\Http\Controllers\Admin\PaymentController::class, 'reject'])->name('payments.reject');

        Route::get('/users', [AdminController::class, 'users'])->name('users');
        Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
        Route::patch('/users/{user}', [AdminController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/{user}', [AdminController::class, 'deleteUser'])->name('users.delete');

        Route::get('/cms', [AdminController::class, 'cms'])->name('cms');
        Route::post('/cms/articles', [AdminController::class, 'storeArticle'])->name('articles.store');
        Route::delete('/cms/articles/{id}', [AdminController::class, 'deleteArticle'])->name('articles.delete');
        Route::post('/cms/modules', [AdminController::class, 'storeModule'])->name('modules.store');
        Route::delete('/cms/modules/{id}', [AdminController::class, 'deleteModule'])->name('modules.delete');

        Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
        Route::post('/settings', [AdminController::class, 'updateSettings'])->name('settings.update');

        Route::get('/profile', [AdminController::class, 'profile'])->name('profile');
        Route::patch('/profile', [AdminController::class, 'updateProfile'])->name('profile.update');
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

require __DIR__ . '/auth.php';
