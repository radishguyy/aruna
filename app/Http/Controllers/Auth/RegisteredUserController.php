<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
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

        return Inertia::render('Auth/Register', [
            'selectedPlan' => $selectedPlan,
            'plan_id' => $planId,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'plan_id' => 'nullable|string|exists:plans,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'parent',
            'subscription_status' => 'free',
        ]);

        event(new Registered($user));

        Auth::login($user);

        if ($request->filled('plan_id')) {
            return redirect()->route('checkout.initiate', ['plan_id' => $request->plan_id]);
        }

        return redirect(route('dashboard', absolute: false));
    }
}
