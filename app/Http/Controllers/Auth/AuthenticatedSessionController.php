<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Plan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(Request $request): Response
    {
        $planId = $request->query('plan_id');
        $selectedPlan = null;

        if ($planId) {
            $plan = Plan::find($planId);
            if ($plan) {
                $selectedPlan = [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'price' => (float) $plan->price,
                    'billing_cycle' => $plan->billing_cycle,
                    'features' => $plan->features,
                ];
            }
        }

        $initialTab = $request->query('tab') === 'kids' ? 'kids' : 'parent';

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'selectedPlan' => $selectedPlan,
            'plan_id' => $planId,
            'initialTab' => $initialTab,
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        $request->session()->forget(['is_kids_session', 'student_id', 'student_name', 'student_username', 'active_child_id']);

        if ($request->filled('plan_id') && Plan::where('id', $request->plan_id)->exists()) {
            return redirect()->route('checkout.initiate', ['plan_id' => $request->plan_id]);
        }

        $user = auth()->user();

        if ($user->role === 'admin') {
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        if ($user->role === 'teacher') {
            return redirect()->intended(route('teacher.dashboard', absolute: false));
        }

        if ($user->role === 'parent') {
            return redirect()->intended(route('parent.dashboard', absolute: false));
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
