<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class PaymentController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'plan'])
            ->orderByRaw("FIELD(status, 'pending_approval') DESC")
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Payments/Index', [
            'orders' => $orders
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['user', 'plan']);

        return Inertia::render('Admin/Payments/Show', [
            'order' => $order
        ]);
    }

    public function approve(Request $request, Order $order)
    {
        $request->validate([
            'duration_days' => 'required|integer|min:1'
        ]);

        if ($order->status !== 'pending_approval') {
            return back()->with('error', 'Only pending approval orders can be approved.');
        }

        $order->update([
            'status' => 'paid',
            'paid_at' => now()
        ]);

        // Create subscription
        Subscription::create([
            'user_id' => $order->user_id,
            'plan_id' => $order->plan_id,
            'status' => 'active',
            'current_period_start' => now(),
            'current_period_end' => now()->addDays($request->duration_days),
        ]);

        // Update user status
        $user = $order->user;
        if (str_contains($order->plan_id, 'institution')) {
            $user->subscription_status = 'licensed';
        } else if (str_contains($order->plan_id, 'premium')) {
            $user->subscription_status = 'premium';
        } else {
            $user->subscription_status = 'standard';
        }
        $user->save();

        return redirect()->route('admin.payments.index')->with('success', 'Payment approved and subscription activated.');
    }

    public function reject(Request $request, Order $order)
    {
        $request->validate([
            'rejection_reason' => 'nullable|string'
        ]);

        if ($order->status !== 'pending_approval') {
            return back()->with('error', 'Only pending approval orders can be rejected.');
        }

        $order->update([
            'status' => 'rejected',
            'rejection_reason' => $request->rejection_reason
        ]);

        return redirect()->route('admin.payments.index')->with('success', 'Payment rejected.');
    }
}
