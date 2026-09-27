<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Subscription;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DemoUsersSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Delete existing demo users to reset
        User::whereNotIn('email', [
            'rara@example.com',
            'admin@aruna.id',
            'sari@mentari.edu',
            'parent@home.com',
            'teacher@school.com'
        ])->where('role', 'parent')->delete();

        Order::query()->delete();
        Subscription::query()->delete();

        $faker = null;
        if (class_exists(\Faker\Factory::class)) {
            $faker = \Faker\Factory::create('id_ID');
        }

        $indonesianFirstNames = [
            'Ahmad', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fajar', 'Gita', 'Hadi', 'Indah', 'Joko',
            'Kartika', 'Lestari', 'Muhammad', 'Nur', 'Oki', 'Putri', 'Rahmat', 'Siti', 'Tri', 'Utami',
            'Wahyu', 'Yusuf', 'Zul', 'Rian', 'Bayu', 'Dian', 'Fitri', 'Hendra', 'Intan', 'Mega',
            'Nanda', 'Pratama', 'Rini', 'Surya', 'Taufik', 'Vina', 'Wulan', 'Agus', 'Anisa', 'Bambang',
            'Chandra', 'Desi', 'Edi', 'Farah', 'Gilang', 'Hesti', 'Imam', 'Jihan', 'Kurniawan', 'Maya',
            'Rizky', 'Aditya', 'Ayu', 'Bagus', 'Dwi', 'Endah', 'Firman', 'Gunawan', 'Hasan', 'Ilham'
        ];

        $indonesianLastNames = [
            'Pratama', 'Saputra', 'Wijaya', 'Kusuma', 'Hidayat', 'Santoso', 'Setiawan', 'Nugroho', 'Lestari', 'Wulandari',
            'Permana', 'Gunawan', 'Siregar', 'Nasution', 'Batubara', 'Pangestu', 'Suharto', 'Yuliana', 'Anggraini', 'Mahendra',
            'Kurniawan', 'Ramadhan', 'Utomo', 'Wicaksono', 'Subagyo', 'Purwanto', 'Susanto', 'Hartono', 'Sari', 'Handayani',
            'Firmansyah', 'Budiman', 'Wibowo', 'Cahyono', 'Irawan', 'Prasetyo', 'Hermawan', 'Mulyadi', 'Simanjuntak', 'Siregar'
        ];

        $domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.com', 'aruna.id'];

        $monthlyPlan = Plan::firstOrCreate(
            ['id' => 'premium_monthly'],
            [
                'name' => 'Paket Premium (Bulanan)',
                'price' => 50000.00,
                'billing_cycle' => 'monthly',
                'features' => ['Semua Modul Edukasi', 'Simulasi AR Immersive'],
                'is_active' => true,
            ]
        );
        $annualPlan = Plan::firstOrCreate(
            ['id' => 'premium_annual'],
            [
                'name' => 'Paket Premium (Tahunan)',
                'price' => 450000.00,
                'billing_cycle' => 'yearly',
                'features' => ['Semua Modul Edukasi', 'Simulasi AR Immersive', 'Bonus PDF'],
                'is_active' => true,
            ]
        );

        $password = Hash::make('password');

        $totalUsersToGenerate = 700;
        $usersWithHistory = 450;
        $activeSubscribersTarget = 445;

        // Base date for "as of Sept 25, 2026" logic
        $referenceDate = Carbon::parse('2026-09-25 12:00:00');
        
        $usersToInsert = [];
        for ($i = 0; $i < $totalUsersToGenerate; $i++) {
            if ($faker) {
                $name = $faker->name();
                $email = $faker->unique()->safeEmail();
            } else {
                $first = $indonesianFirstNames[array_rand($indonesianFirstNames)];
                $last = $indonesianLastNames[array_rand($indonesianLastNames)];
                $name = $first . ' ' . $last;
                $email = Str::slug($first) . '.' . Str::slug($last) . '.' . Str::random(5) . '@' . $domains[array_rand($domains)];
            }

            $usersToInsert[] = [
                'name' => $name,
                'email' => $email,
                'email_verified_at' => now(),
                'password' => $password,
                'role' => 'parent',
                'subscription_status' => 'free',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Chunk insert users
        foreach (array_chunk($usersToInsert, 100) as $chunk) {
            User::insert($chunk);
        }

        // Fetch inserted users to attach orders
        $allDemoUsers = User::whereNotIn('email', [
            'rara@example.com',
            'admin@aruna.id',
            'sari@mentari.edu',
            'parent@home.com',
            'teacher@school.com'
        ])->where('role', 'parent')->get();

        $historyUsers = $allDemoUsers->take($usersWithHistory);
        
        $ordersToInsert = [];
        $subscriptionsToInsert = [];

        $activeCount = 0;
        
        foreach ($historyUsers as $idx => $user) {
            // Distribute paid_at dates from Feb 1, 2026 to Sept 25, 2026
            // Days between Feb 1 and Sept 25 = ~236 days
            $daysAgo = rand(0, 236);
            $orderTime = Carbon::parse('2026-09-25 12:00:00')->subDays($daysAgo);
            
            $isBeforeAugust = $orderTime->lt(Carbon::parse('2026-08-01'));
            $paymentProof = $isBeforeAugust ? 'Already paid via WhatsApp' : '/images/payments/demo-proof.jpg';

            // Determine if they should be active
            $shouldBeActive = $activeCount < $activeSubscribersTarget;
            
            if ($shouldBeActive) {
                // If they ordered a long time ago, give them an annual plan so they are still active,
                // or assume they just renewed (make the period_end in the future).
                $plan = $annualPlan;
                $periodEnd = $orderTime->copy()->addDays(365);
                // Ensure it's active based on reference date
                if ($periodEnd->lt($referenceDate)) {
                    // force renewal logic by making it 1-month active from near Sept 25
                    $orderTime = $referenceDate->copy()->subDays(rand(1, 20));
                    $periodEnd = $orderTime->copy()->addDays(30);
                    $plan = $monthlyPlan;
                    $isBeforeAugust = $orderTime->lt(Carbon::parse('2026-08-01'));
                    $paymentProof = $isBeforeAugust ? 'Already paid via WhatsApp' : '/images/payments/demo-proof.jpg';
                }
                $activeCount++;
                $user->subscription_status = 'premium';
            } else {
                // Expired
                $plan = $monthlyPlan;
                $periodEnd = $orderTime->copy()->addDays(30);
                if ($periodEnd->gt($referenceDate)) {
                    // force expired by pulling date back
                    $orderTime = $referenceDate->copy()->subDays(rand(35, 100));
                    $periodEnd = $orderTime->copy()->addDays(30);
                    $isBeforeAugust = $orderTime->lt(Carbon::parse('2026-08-01'));
                    $paymentProof = $isBeforeAugust ? 'Already paid via WhatsApp' : '/images/payments/demo-proof.jpg';
                }
                $user->subscription_status = 'free';
            }
            $user->save();

            $ordersToInsert[] = [
                'id' => (string) Str::uuid(),
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'subtotal' => $plan->price,
                'tax_amount' => 0,
                'total_amount' => $plan->price,
                'payment_method' => 'bank_transfer',
                'payment_proof_path' => $paymentProof,
                'status' => 'paid',
                'paid_at' => $orderTime,
                'created_at' => $orderTime,
                'updated_at' => $orderTime,
            ];

            $subscriptionsToInsert[] = [
                'id' => (string) Str::uuid(),
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'status' => $shouldBeActive ? 'active' : 'expired',
                'current_period_start' => $orderTime,
                'current_period_end' => $periodEnd,
                'auto_renew' => $shouldBeActive,
                'created_at' => $orderTime,
                'updated_at' => $orderTime,
            ];
        }

        foreach (array_chunk($ordersToInsert, 100) as $chunk) {
            Order::insert($chunk);
        }
        foreach (array_chunk($subscriptionsToInsert, 100) as $chunk) {
            Subscription::insert($chunk);
        }

        // Explicitly create premium.demo@aruna.id user to keep test cases working
        $demoUser = User::firstOrCreate(
            ['email' => 'premium.demo@aruna.id'],
            [
                'name' => 'Premium Demo Parent',
                'password' => $password,
                'role' => 'parent',
                'subscription_status' => 'premium',
                'email_verified_at' => now(),
            ]
        );
        if (!Order::where('user_id', $demoUser->id)->exists()) {
            Order::create([
                'id' => (string) Str::uuid(),
                'user_id' => $demoUser->id,
                'plan_id' => $monthlyPlan->id,
                'subtotal' => $monthlyPlan->price,
                'tax_amount' => 0,
                'total_amount' => $monthlyPlan->price,
                'payment_method' => 'bank_transfer',
                'payment_proof_path' => '/images/payments/demo-proof.jpg',
                'status' => 'paid',
                'paid_at' => now(),
            ]);
            Subscription::create([
                'user_id' => $demoUser->id,
                'plan_id' => $monthlyPlan->id,
                'status' => 'active',
                'current_period_start' => now()->subDays(5),
                'current_period_end' => now()->addDays(25),
                'auto_renew' => true,
            ]);
        }

        $this->command?->info("DemoUsersSeeder completed: 700 users created, 450 with history, 445 active as of Sept 25, 2026.");
    }
}
