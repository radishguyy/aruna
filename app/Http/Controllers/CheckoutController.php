<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CheckoutController extends Controller
{
    public function initiate(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        if (!auth()->check()) {
            return redirect()->route('register', ['plan_id' => $request->plan_id]);
        }

        $plan = Plan::findOrFail($request->plan_id);
        $user = auth()->user();

        // Calculate totals
        $subtotal = $plan->price;
        // Mock Tax 11%
        $taxAmount = $subtotal * 0.11;
        
        // Generate unique code (random 3 digits)
        $uniqueCode = rand(100, 999);
        
        $totalAmount = $subtotal + $taxAmount + $uniqueCode;

        $order = Order::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'unique_code' => $uniqueCode,
            'total_amount' => $totalAmount,
            'status' => 'waiting_for_payment'
        ]);

        return redirect()->route('checkout.instructions', ['order' => $order->id]);
    }

    public function instructions(Order $order)
    {
        // Ensure user owns order
        if ($order->user_id !== auth()->id()) abort(403);
        if ($order->status !== 'waiting_for_payment') return redirect()->route('dashboard');

        return Inertia::render('Checkout/Instructions', [
            'order' => $order->load('plan')
        ]);
    }

    public function confirmMethod(Request $request, Order $order)
    {
        if ($order->user_id !== auth()->id()) abort(403);
        if ($order->status !== 'waiting_for_payment') return redirect()->route('dashboard');

        $request->validate([
            'payment_method' => 'required|in:qris,bank_transfer',
        ]);

        $order->update([
            'payment_method' => $request->payment_method
        ]);

        return redirect()->route('checkout.upload-proof', ['order' => $order->id]);
    }

    public function uploadProofForm(Order $order)
    {
        if ($order->user_id !== auth()->id()) abort(403);
        if ($order->status !== 'waiting_for_payment') return redirect()->route('dashboard');
        
        // Ensure they selected a method
        if (!$order->payment_method) {
            return redirect()->route('checkout.instructions', ['order' => $order->id]);
        }

        return Inertia::render('Checkout/UploadProof', [
            'order' => $order->load('plan')
        ]);
    }

    public function submitProof(Request $request, Order $order)
    {
        if ($order->user_id !== auth()->id()) abort(403);
        if ($order->status !== 'waiting_for_payment') return redirect()->route('dashboard');

        $request->validate([
            'payment_proof' => 'required|image|max:5120', // max 5MB
        ]);

        if ($request->hasFile('payment_proof')) {
            $path = $request->file('payment_proof')->store('payment_proofs', 'public');
            
            $order->update([
                'payment_proof_path' => $path,
                'status' => 'pending_approval'
            ]);
        }

        return redirect()->route('checkout.pending', ['order' => $order->id]);
    }

    public function pendingApproval(Order $order)
    {
        if ($order->user_id !== auth()->id()) abort(403);

        return Inertia::render('Checkout/PendingApproval', [
            'order' => $order->load('plan')
        ]);
    }
}
