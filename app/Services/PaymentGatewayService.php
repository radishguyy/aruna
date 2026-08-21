<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Str;

class PaymentGatewayService
{
    /**
     * Generate a mock payment URL or Snap token for the given order.
     */
    public function generatePaymentToken(Order $order): array
    {
        // For testing purposes, we return a mock URL.
        // In a real integration, you would call Midtrans Snap API here:
        // $params = [
        //    'transaction_details' => ['order_id' => $order->id, 'gross_amount' => $order->total_amount],
        //    'customer_details' => ['first_name' => $order->user->name, 'email' => $order->user->email]
        // ];
        // return \Midtrans\Snap::createTransaction($params)->redirect_url;
        
        $mockToken = Str::random(32);
        
        return [
            'token' => $mockToken,
            'redirect_url' => route('checkout.mock.payment', ['order_id' => $order->id])
        ];
    }
}
