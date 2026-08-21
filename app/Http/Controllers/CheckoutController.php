<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Plan;
use App\Models\Transaction;
use App\Models\Subscription;
use App\Services\PaymentGatewayService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function initiate(Request $request, PaymentGatewayService $paymentService)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            // coupon support to be added later
        ]);

        $plan = Plan::findOrFail($request->plan_id);
        $user = auth()->user();

        // Calculate totals
        $subtotal = $plan->price;
        // Mock Tax 11%
        $taxAmount = $subtotal * 0.11;
        $totalAmount = $subtotal + $taxAmount;

        $order = Order::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'status' => 'pending'
        ]);

        // Generate payment link (Mocked)
        $paymentData = $paymentService->generatePaymentToken($order);

        return Inertia::render('Checkout/Summary', [
            'order' => $order->load('plan'),
            'paymentData' => $paymentData
        ]);
    }

    public function mockPayment(Request $request, $order_id)
    {
        $order = Order::findOrFail($order_id);
        
        // This simulates the user paying and the Webhook being received.
        // In production, this logic belongs in WebhookController.
        
        $order->update(['status' => 'paid', 'paid_at' => now()]);

        Transaction::create([
            'order_id' => $order->id,
            'gateway_name' => 'mock_gateway',
            'gross_amount' => $order->total_amount,
            'transaction_status' => 'settlement',
            'settled_at' => now()
        ]);

        Subscription::create([
            'user_id' => $order->user_id,
            'plan_id' => $order->plan_id,
            'status' => 'active',
            'current_period_start' => now(),
            'current_period_end' => $order->plan->billing_cycle === 'annual' ? now()->addYear() : now()->addMonth(),
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

        return redirect()->route('checkout.success', ['order_id' => $order->id]);
    }

    public function success($order_id)
    {
        $order = Order::with('plan')->findOrFail($order_id);
        
        return Inertia::render('Checkout/Success', [
            'order' => $order
        ]);
    }
}
