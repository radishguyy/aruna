<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'id' => 'standard_monthly',
                'name' => 'Paket Standar',
                'price' => 25000.00,
                'billing_cycle' => 'monthly',
                'features' => [
                    'Modul Edukasi Lengkap',
                    'Beberapa Simulasi AR',
                    'Smart AR Digfo Terbatas',
                ],
                'is_active' => true,
            ],
            [
                'id' => 'premium_monthly',
                'name' => 'Paket Premium (Bulanan)',
                'price' => 50000.00,
                'billing_cycle' => 'monthly',
                'features' => [
                    'Semua Modul Edukasi',
                    'Simulasi AR Immersive',
                    'Smart AR Digfo & Digvi Lengkap',
                    'Parent & Teacher Guide',
                ],
                'is_active' => true,
            ],
            [
                'id' => 'premium_annual',
                'name' => 'Paket Premium (Tahunan)',
                'price' => 480000.00,
                'billing_cycle' => 'annual',
                'features' => [
                    'Semua Modul Edukasi',
                    'Simulasi AR Immersive',
                    'Smart AR Digfo & Digvi Lengkap',
                    'Parent & Teacher Guide',
                    'Hemat 20%',
                ],
                'is_active' => true,
            ],
            [
                'id' => 'institution_monthly',
                'name' => 'Paket Institusi (Bulanan)',
                'price' => 200000.00,
                'billing_cycle' => 'monthly',
                'features' => [
                    'Lisensi Penggunaan PAUD/TK/Sekolah',
                    'Program Edukasi Institusi',
                    'Dashboard Monitoring Guru',
                    'Materi Cetak & Digital',
                ],
                'is_active' => true,
            ],
            [
                'id' => 'institution_annual',
                'name' => 'Paket Institusi (Tahunan)',
                'price' => 1920000.00,
                'billing_cycle' => 'annual',
                'features' => [
                    'Lisensi Penggunaan PAUD/TK/Sekolah',
                    'Program Edukasi Institusi',
                    'Dashboard Monitoring Guru',
                    'Materi Cetak & Digital',
                    'Hemat 20%',
                ],
                'is_active' => true,
            ],
        ];

        foreach ($plans as $planData) {
            Plan::updateOrCreate(
                ['id' => $planData['id']],
                $planData
            );
        }

        $this->command?->info('Plans table seeded successfully.');
    }
}
