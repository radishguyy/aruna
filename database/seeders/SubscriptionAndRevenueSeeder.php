<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SubscriptionAndRevenueSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // 1. Ensure Plans
        $plans = Plan::all()->keyBy('id');
        if ($plans->isEmpty()) {
            $this->call(PlanSeeder::class);
            $plans = Plan::all()->keyBy('id');
        }

        $standardMonthly = $plans->get('standard_monthly') ?? Plan::first();
        $premiumMonthly = $plans->get('premium_monthly') ?? $plans->get('premium-monthly') ?? $standardMonthly;
        $premiumAnnual = $plans->get('premium_annual') ?? $premiumMonthly;
        $institutionMonthly = $plans->get('institution_monthly') ?? $premiumMonthly;

        // Clear existing subscriptions to regenerate cleanly
        Subscription::query()->delete();

        // 2. Setup specific demo user
        $demoUser = User::where('email', 'premium.demo@aruna.id')->first();
        if ($demoUser) {
            // First past order (2 months ago)
            $pastDate1 = $now->copy()->subMonths(2);
            $order1 = Order::create([
                'id' => (string) Str::uuid(),
                'user_id' => $demoUser->id,
                'plan_id' => $premiumMonthly->id,
                'subtotal' => $premiumMonthly->price,
                'tax_amount' => 0,
                'total_amount' => $premiumMonthly->price,
                'payment_method' => 'bank_transfer',
                'status' => 'paid',
                'paid_at' => $pastDate1,
                'created_at' => $pastDate1,
                'updated_at' => $pastDate1,
            ]);

            Subscription::create([
                'user_id' => $demoUser->id,
                'plan_id' => $premiumMonthly->id,
                'status' => 'expired',
                'current_period_start' => $pastDate1,
                'current_period_end' => $pastDate1->copy()->addDays(30),
                'auto_renew' => false,
                'created_at' => $pastDate1,
                'updated_at' => $pastDate1,
            ]);

            // Second past order (1 month ago)
            $pastDate2 = $now->copy()->subMonth();
            $order2 = Order::create([
                'id' => (string) Str::uuid(),
                'user_id' => $demoUser->id,
                'plan_id' => $premiumMonthly->id,
                'subtotal' => $premiumMonthly->price,
                'tax_amount' => 0,
                'total_amount' => $premiumMonthly->price,
                'payment_method' => 'qris',
                'status' => 'paid',
                'paid_at' => $pastDate2,
                'created_at' => $pastDate2,
                'updated_at' => $pastDate2,
            ]);

            Subscription::create([
                'user_id' => $demoUser->id,
                'plan_id' => $premiumMonthly->id,
                'status' => 'expired',
                'current_period_start' => $pastDate2,
                'current_period_end' => $pastDate2->copy()->addDays(30),
                'auto_renew' => false,
                'created_at' => $pastDate2,
                'updated_at' => $pastDate2,
            ]);

            // Third order: Current active annual renewal (started 5 days ago, active for 360 more days)
            $activeDate = $now->copy()->subDays(5);
            $order3 = Order::create([
                'id' => (string) Str::uuid(),
                'user_id' => $demoUser->id,
                'plan_id' => $premiumAnnual->id,
                'subtotal' => $premiumAnnual->price,
                'tax_amount' => 0,
                'total_amount' => $premiumAnnual->price,
                'payment_method' => 'bank_transfer',
                'status' => 'paid',
                'paid_at' => $activeDate,
                'created_at' => $activeDate,
                'updated_at' => $activeDate,
            ]);

            Subscription::create([
                'user_id' => $demoUser->id,
                'plan_id' => $premiumAnnual->id,
                'status' => 'active',
                'current_period_start' => $activeDate,
                'current_period_end' => $activeDate->copy()->addDays(365),
                'auto_renew' => true,
                'created_at' => $activeDate,
                'updated_at' => $activeDate,
            ]);

            $demoUser->update(['subscription_status' => 'premium']);
        }

        // 3. Distribute remaining orders across users
        // Get non-admin users
        $users = User::where('email', '!=', 'premium.demo@aruna.id')
            ->where('role', 'parent')
            ->get();

        if ($users->isEmpty()) {
            $this->command?->warn('No users found to seed subscriptions.');
            return;
        }

        // Clear existing orders for clean state, except keep pending_approval ones
        Order::where('user_id', '!=', $demoUser?->id)
            ->where('status', 'paid')
            ->delete();

        // Plan distribution pool
        $planPool = [
            $standardMonthly, $standardMonthly,
            $premiumMonthly, $premiumMonthly, $premiumMonthly,
            $premiumAnnual,
            $institutionMonthly,
        ];

        // Dates distribution setup:
        // A) Today: 8 orders
        // B) Yesterday / Last 7 days: 25 orders
        // C) Rest of This Month: 45 orders
        // D) Last Month: 50 orders
        // E) Two Months Ago: 30 orders

        $distributions = [
            // Today (Sep 22, 2026)
            ['count' => 8, 'start_days_ago' => 0, 'end_days_ago' => 0],
            // Last 7 days (Sep 15 - Sep 21)
            ['count' => 25, 'start_days_ago' => 1, 'end_days_ago' => 6],
            // This month earlier (Sep 1 - Sep 14)
            ['count' => 45, 'start_days_ago' => 7, 'end_days_ago' => 21],
            // Last month (August 2026)
            ['count' => 50, 'start_days_ago' => 22, 'end_days_ago' => 52],
            // Older (July 2026)
            ['count' => 30, 'start_days_ago' => 53, 'end_days_ago' => 85],
        ];

        $userIndex = 0;
        $totalUsers = $users->count();
        $renewalCandidateUsers = [];

        foreach ($distributions as $bucket) {
            for ($i = 0; $i < $bucket['count']; $i++) {
                if ($userIndex >= $totalUsers) {
                    break;
                }

                $user = $users[$userIndex++];
                $chosenPlan = $planPool[array_rand($planPool)];

                $daysAgo = rand($bucket['start_days_ago'], $bucket['end_days_ago']);
                $hoursAgo = rand(1, 23);
                $orderTime = $now->copy()->subDays($daysAgo)->subHours($hoursAgo);

                $durationDays = str_contains($chosenPlan->id, 'annual') ? 365 : 30;
                $periodEnd = $orderTime->copy()->addDays($durationDays);
                $isActive = $periodEnd->isFuture();

                // Order
                Order::create([
                    'id' => (string) Str::uuid(),
                    'user_id' => $user->id,
                    'plan_id' => $chosenPlan->id,
                    'subtotal' => $chosenPlan->price,
                    'tax_amount' => 0,
                    'total_amount' => $chosenPlan->price,
                    'payment_method' => ['bank_transfer', 'qris', 'gopay', 'credit_card'][rand(0, 3)],
                    'payment_proof_path' => 'payment_proofs/demo-proof.jpg',
                    'status' => 'paid',
                    'paid_at' => $orderTime,
                    'created_at' => $orderTime,
                    'updated_at' => $orderTime,
                ]);

                // Subscription
                Subscription::create([
                    'user_id' => $user->id,
                    'plan_id' => $chosenPlan->id,
                    'status' => $isActive ? 'active' : 'expired',
                    'current_period_start' => $orderTime,
                    'current_period_end' => $periodEnd,
                    'auto_renew' => $isActive,
                    'created_at' => $orderTime,
                    'updated_at' => $orderTime,
                ]);

                // Update user subscription_status
                if ($isActive) {
                    $user->update(['subscription_status' => str_contains($chosenPlan->id, 'institution') ? 'licensed' : 'premium']);
                } else {
                    $user->update(['subscription_status' => 'free']);
                    // Keep track of some expired users to give them a renewal order
                    if (count($renewalCandidateUsers) < 15 && $daysAgo > 25) {
                        $renewalCandidateUsers[] = $user;
                    }
                }
            }
        }

        // 4. Create Renewal orders for some of the candidate users in the last 7 days / this month
        foreach ($renewalCandidateUsers as $idx => $renewUser) {
            $renewalPlan = $planPool[array_rand($planPool)];
            $renewalDaysAgo = rand(0, 10); // renewed within last 10 days
            $renewalTime = $now->copy()->subDays($renewalDaysAgo)->subHours(rand(1, 12));
            $renewalDuration = str_contains($renewalPlan->id, 'annual') ? 365 : 30;
            $renewalEnd = $renewalTime->copy()->addDays($renewalDuration);

            Order::create([
                'id' => (string) Str::uuid(),
                'user_id' => $renewUser->id,
                'plan_id' => $renewalPlan->id,
                'subtotal' => $renewalPlan->price,
                'tax_amount' => 0,
                'total_amount' => $renewalPlan->price,
                'payment_method' => 'qris',
                'status' => 'paid',
                'paid_at' => $renewalTime,
                'created_at' => $renewalTime,
                'updated_at' => $renewalTime,
            ]);

            Subscription::create([
                'user_id' => $renewUser->id,
                'plan_id' => $renewalPlan->id,
                'status' => 'active',
                'current_period_start' => $renewalTime,
                'current_period_end' => $renewalEnd,
                'auto_renew' => true,
                'created_at' => $renewalTime,
                'updated_at' => $renewalTime,
            ]);

            $renewUser->update(['subscription_status' => str_contains($renewalPlan->id, 'institution') ? 'licensed' : 'premium']);
        }

        // Remaining users without orders stay 'free' (Never Subscribed)
        User::whereDoesntHave('orders')
            ->where('role', 'parent')
            ->update(['subscription_status' => 'free']);

        $this->command?->info('Subscription and Revenue data successfully seeded!');
    }
}
