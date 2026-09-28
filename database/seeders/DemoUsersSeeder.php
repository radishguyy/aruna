<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Child;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DemoUsersSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Identify and delete the previous 700 demo users deterministically
        $demoUsers = User::whereNotIn('email', [
            'rara@example.com',
            'admin@aruna.id',
            'sari@mentari.edu',
            'parent@home.com',
            'teacher@school.com',
            'premium.demo@aruna.id',
        ])->where('role', 'parent')->get();

        $demoUserIds = $demoUsers->pluck('id');

        if ($demoUserIds->isNotEmpty()) {
            Subscription::whereIn('user_id', $demoUserIds)->delete();
            Order::whereIn('user_id', $demoUserIds)->delete();
            Child::whereIn('user_id', $demoUserIds)->delete();
            User::whereIn('id', $demoUserIds)->delete();
        }

        // Clean any past demo orders from premium.demo user to preserve exact target revenue
        $premiumDemo = User::where('email', 'premium.demo@aruna.id')->first();
        if ($premiumDemo) {
            Order::where('user_id', $premiumDemo->id)->delete();
        }

        // 2. Fetch or create standard application plans
        $standardMonthly = Plan::where('id', 'standard_monthly')->first() ?? Plan::firstOrCreate(
            ['id' => 'standard_monthly'],
            [
                'name' => 'Paket Standar',
                'price' => 25000.00,
                'billing_cycle' => 'monthly',
                'max_children' => 2,
                'is_active' => true,
            ]
        );

        $premiumMonthly = Plan::where('id', 'premium_monthly')->first() ?? Plan::firstOrCreate(
            ['id' => 'premium_monthly'],
            [
                'name' => 'Paket Premium (Bulanan)',
                'price' => 50000.00,
                'billing_cycle' => 'monthly',
                'max_children' => 5,
                'is_active' => true,
            ]
        );

        $premiumAnnual = Plan::where('id', 'premium_annual')->first() ?? Plan::firstOrCreate(
            ['id' => 'premium_annual'],
            [
                'name' => 'Paket Premium (Tahunan)',
                'price' => 480000.00,
                'billing_cycle' => 'annual',
                'max_children' => 5,
                'is_active' => true,
            ]
        );

        // 3. Generate exactly 700 new demo users with realistic Indonesian names & unique @gmail.com addresses
        $firstNames = [
            'Ahmad', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fajar', 'Gita', 'Hadi', 'Indah', 'Joko',
            'Kartika', 'Lestari', 'Muhammad', 'Nur', 'Oki', 'Putri', 'Rahmat', 'Siti', 'Tri', 'Utami',
            'Wahyu', 'Yusuf', 'Zulfikar', 'Rian', 'Bayu', 'Dian', 'Fitri', 'Hendra', 'Intan', 'Mega',
            'Nanda', 'Pratama', 'Rini', 'Surya', 'Taufik', 'Vina', 'Wulan', 'Agus', 'Anisa', 'Bambang',
            'Chandra', 'Desi', 'Edi', 'Farah', 'Gilang', 'Hesti', 'Imam', 'Jihan', 'Kurniawan', 'Maya',
            'Rizky', 'Aditya', 'Ayu', 'Bagus', 'Dwi', 'Endah', 'Firman', 'Gunawan', 'Hasan', 'Ilham',
            'Nabila', 'Fauzan', 'Salsabila', 'Alif', 'Dimas', 'Danang', 'Aris', 'Aulia', 'Bella', 'Clarissa',
            'Devi', 'Doni', 'Erwin', 'Febri', 'Ghani', 'Hana', 'Irfan', 'Kharisma', 'Luthfi', 'Maulana',
            'Nadira', 'Pandu', 'Raditya', 'Reza', 'Safira', 'Tari', 'Vicky', 'Yogi', 'Zahra', 'Arif',
            'Bagas', 'Cahya', 'Dina', 'Fikri', 'Haris', 'Latifah', 'Naufal', 'Rasyid', 'Syifa', 'Zaki'
        ];

        $lastNames = [
            'Pratama', 'Saputra', 'Wijaya', 'Kusuma', 'Hidayat', 'Santoso', 'Setiawan', 'Nugroho', 'Lestari', 'Wulandari',
            'Permana', 'Gunawan', 'Siregar', 'Nasution', 'Batubara', 'Pangestu', 'Suharto', 'Yuliana', 'Anggraini', 'Mahendra',
            'Kurniawan', 'Ramadhan', 'Utomo', 'Wicaksono', 'Subagyo', 'Purwanto', 'Susanto', 'Hartono', 'Sari', 'Handayani',
            'Firmansyah', 'Budiman', 'Wibowo', 'Cahyono', 'Irawan', 'Prasetyo', 'Hermawan', 'Mulyadi', 'Simanjuntak', 'Fauzi',
            'Alamsyah', 'Hakim', 'Hambali', 'Iskandar', 'Kadir', 'Lubis', 'Mansur', 'Marzuki', 'Nasir', 'Pasaribu',
            'Raharjo', 'Rasyid', 'Saleh', 'Syahputra', 'Tanjung', 'Yasin', 'Zulkarnain', 'Anwar', 'Basri', 'Darmawan'
        ];

        $totalUsersToGenerate = 700;
        $password = Hash::make('password');
        $usedEmails = [];
        $usersToInsert = [];

        // Reference date for calculations: Sept 25, 2026
        $refDate = Carbon::parse('2026-09-25 12:00:00');

        for ($i = 0; $i < $totalUsersToGenerate; $i++) {
            $first = $firstNames[array_rand($firstNames)];
            $last = $lastNames[array_rand($lastNames)];
            $name = $first . ' ' . $last;

            $slugFirst = strtolower(preg_replace('/[^a-z0-9]/', '', $first));
            $slugLast = strtolower(preg_replace('/[^a-z0-9]/', '', $last));

            $emailCandidates = [
                "{$slugFirst}.{$slugLast}@gmail.com",
                "{$slugFirst}{$slugLast}@gmail.com",
                "{$slugLast}.{$slugFirst}@gmail.com",
                "{$slugFirst}.{$slugLast}" . rand(1, 99) . "@gmail.com",
                "{$slugFirst}{$slugLast}" . rand(10, 99) . "@gmail.com",
                "{$slugFirst}_" . substr($slugLast, 0, 1) . rand(1, 99) . "@gmail.com",
                "{$slugFirst}." . substr($slugLast, 0, 1) . rand(10, 999) . "@gmail.com",
            ];

            $email = null;
            foreach ($emailCandidates as $cand) {
                if (!isset($usedEmails[$cand])) {
                    $email = $cand;
                    $usedEmails[$cand] = true;
                    break;
                }
            }

            while (!$email) {
                $cand = "{$slugFirst}.{$slugLast}" . rand(100, 99999) . "@gmail.com";
                if (!isset($usedEmails[$cand])) {
                    $email = $cand;
                    $usedEmails[$cand] = true;
                    break;
                }
            }

            // User registered between Feb 1, 2026 and Sept 25, 2026 (approx 236 days)
            $regDaysAgo = rand(0, 236);
            $userCreatedAt = $refDate->copy()->subDays($regDaysAgo)->subHours(rand(1, 12));

            $usersToInsert[] = [
                'name' => $name,
                'email' => $email,
                'email_verified_at' => $userCreatedAt,
                'password' => $password,
                'role' => 'parent',
                'subscription_status' => 'free',
                'remember_token' => Str::random(10),
                'created_at' => $userCreatedAt,
                'updated_at' => $userCreatedAt,
            ];
        }

        // Chunk insert 700 users
        foreach (array_chunk($usersToInsert, 100) as $chunk) {
            User::insert($chunk);
        }

        // Fetch inserted replacement users
        $allDemoUsers = User::whereNotIn('email', [
            'rara@example.com',
            'admin@aruna.id',
            'sari@mentari.edu',
            'parent@home.com',
            'teacher@school.com',
            'premium.demo@aruna.id',
        ])->where('role', 'parent')->orderBy('id')->get();

        // 4. Subscriptions & Orders distribution
        // Mathematical distribution for exact target revenue Rp 22,750,000 across 450 users:
        // - 10 Annual (Rp 480,000) = Rp 4,800,000
        // - 278 Premium Monthly (Rp 50,000) = Rp 13,900,000
        // - 162 Standard Monthly (Rp 25,000) = Rp 4,050,000
        // Total Revenue = Rp 22,750,000
        // Total Subscribed Users = 450
        // Active on Sept 25, 2026 = 446 (>= 445 target)
        // Expired on Sept 25, 2026 = 4 (446 + 4 = 450 total)

        $ordersToInsert = [];
        $subscriptionsToInsert = [];

        $specs = [];

        // Group 1: 10 Annual Active Subscriptions (distributed Feb - Aug 2026)
        // Duration: 365 days -> all active as of Sept 25, 2026
        for ($i = 0; $i < 10; $i++) {
            $daysAgo = 230 - ($i * 19); // Spreads evenly from ~Feb 7 to ~Aug 16
            $startDate = $refDate->copy()->subDays($daysAgo)->subHours(rand(1, 10));
            $specs[] = [
                'plan' => $premiumAnnual,
                'is_active' => true,
                'start_date' => $startDate,
                'duration_days' => 365,
            ];
        }

        // Group 2: 4 Expired Monthly Subscriptions (started Feb - Jun 2026, expired after 30 days)
        $expiredSpecs = [
            ['plan' => $standardMonthly, 'days_ago' => 210], // ~Feb 27
            ['plan' => $premiumMonthly,  'days_ago' => 170], // ~April 8
            ['plan' => $standardMonthly, 'days_ago' => 130], // ~May 18
            ['plan' => $premiumMonthly,  'days_ago' => 90],  // ~June 27
        ];
        foreach ($expiredSpecs as $esp) {
            $startDate = $refDate->copy()->subDays($esp['days_ago'])->subHours(rand(1, 10));
            $specs[] = [
                'plan' => $esp['plan'],
                'is_active' => false,
                'start_date' => $startDate,
                'duration_days' => 30,
            ];
        }

        // Group 3: 276 Active Premium Monthly Subscriptions
        // Duration: 30 days. For active as of Sept 25, 2026: start between Aug 27 and Sept 25 (0 to 28 days ago)
        for ($i = 0; $i < 276; $i++) {
            $daysAgo = rand(0, 28);
            $startDate = $refDate->copy()->subDays($daysAgo)->subHours(rand(1, 12))->subMinutes(rand(0, 59));
            $specs[] = [
                'plan' => $premiumMonthly,
                'is_active' => true,
                'start_date' => $startDate,
                'duration_days' => 30,
            ];
        }

        // Group 4: 160 Active Standard Monthly Subscriptions
        for ($i = 0; $i < 160; $i++) {
            $daysAgo = rand(0, 28);
            $startDate = $refDate->copy()->subDays($daysAgo)->subHours(rand(1, 12))->subMinutes(rand(0, 59));
            $specs[] = [
                'plan' => $standardMonthly,
                'is_active' => true,
                'start_date' => $startDate,
                'duration_days' => 30,
            ];
        }

        // Shuffle specs so plans and dates are naturally distributed among users
        shuffle($specs);

        $historyUsers = $allDemoUsers->take(450);
        $userStatusUpdates = [];

        foreach ($historyUsers as $index => $user) {
            $spec = $specs[$index];
            $plan = $spec['plan'];
            $isActive = $spec['is_active'];
            $startDate = $spec['start_date'];
            $endDate = $startDate->copy()->addDays($spec['duration_days']);

            // Payment proof logic:
            // - Subscriptions before August 2026: 'Already paid via WhatsApp'
            // - Subscriptions from August 2026 onward: 'images/payments/demo-proof.jpg'
            $isBeforeAugust = $startDate->lt(Carbon::parse('2026-08-01 00:00:00'));
            $paymentProof = $isBeforeAugust ? 'Already paid via WhatsApp' : 'images/payments/demo-proof.jpg';

            $userStatus = $isActive ? 'premium' : 'free';
            $userStatusUpdates[$user->id] = $userStatus;

            $ordersToInsert[] = [
                'id' => (string) Str::uuid(),
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'subtotal' => $plan->price,
                'unique_code' => 0,
                'discount_amount' => 0,
                'tax_amount' => 0,
                'total_amount' => $plan->price,
                'payment_method' => $isBeforeAugust ? 'whatsapp' : 'bank_transfer',
                'payment_proof_path' => $paymentProof,
                'status' => 'paid',
                'paid_at' => $startDate,
                'created_at' => $startDate,
                'updated_at' => $startDate,
            ];

            $subscriptionsToInsert[] = [
                'id' => (string) Str::uuid(),
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'status' => $isActive ? 'active' : 'expired',
                'current_period_start' => $startDate,
                'current_period_end' => $endDate,
                'auto_renew' => $isActive,
                'created_at' => $startDate,
                'updated_at' => $startDate,
            ];
        }

        // Bulk insert orders and subscriptions
        foreach (array_chunk($ordersToInsert, 100) as $chunk) {
            Order::insert($chunk);
        }
        foreach (array_chunk($subscriptionsToInsert, 100) as $chunk) {
            Subscription::insert($chunk);
        }

        // Update user subscription_status
        foreach ($userStatusUpdates as $userId => $status) {
            User::where('id', $userId)->update(['subscription_status' => $status]);
        }

        // Ensure premium.demo user exists for login tests without extra paid order
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
        Subscription::firstOrCreate(
            ['user_id' => $demoUser->id],
            [
                'id' => (string) Str::uuid(),
                'plan_id' => $premiumMonthly->id,
                'status' => 'active',
                'current_period_start' => $refDate->copy()->subDays(5),
                'current_period_end' => $refDate->copy()->addDays(25),
                'auto_renew' => true,
            ]
        );

        // 5. Generate Child Profiles
        $childrenToInsert = [];
        $childNames = [
            'Raka', 'Siti', 'Agus', 'Ayu', 'Rini', 'Dodi', 'Tari', 'Ari', 'Rika', 'Iwan', 
            'Nina', 'Rudi', 'Lina', 'Doni', 'Susi', 'Farhan', 'Nisa', 'Rizky', 'Putri'
        ];

        // Ensure we hit exactly 705 children across 700 users
        // Give 1 child to everyone, and a 2nd child to the first 5 premium users
        $extraChildrenCount = 5;

        foreach ($allDemoUsers as $user) {
            $numChildren = 1;
            if ($extraChildrenCount > 0 && $user->subscription_status === 'premium') {
                $numChildren = 2;
                $extraChildrenCount--;
            }

            for ($c = 0; $c < $numChildren; $c++) {
                $childrenToInsert[] = [
                    'id' => (string) Str::uuid(),
                    'user_id' => $user->id,
                    'nickname' => $childNames[array_rand($childNames)] . ' ' . rand(1, 99),
                    'gender' => rand(0, 1) ? 'male' : 'female',
                    'birth_date' => Carbon::now()->subYears(rand(3, 6))->subDays(rand(1, 365)),
                    'total_points' => rand(0, 500),
                    'created_at' => $user->created_at,
                    'updated_at' => $user->created_at,
                ];
            }
        }

        foreach (array_chunk($childrenToInsert, 100) as $chunk) {
            Child::insert($chunk);
        }

        $totalChildren = count($childrenToInsert);
        if ($totalChildren < 705) {
            throw new \Exception("Failed to generate at least 705 child profiles. Generated: $totalChildren");
        }

        $this->command?->info("DemoUsersSeeder completed: 700 users created, 450 with subscription history, $totalChildren child profiles. Target revenue Rp 22,750,000.");
    }
}
