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
                'description' => 'Akses individu untuk modul belajar dasar lengkap.',
                'price' => 25000.00,
                'billing_cycle' => 'monthly',
                'max_children' => 2,
                'modules_included' => 'Modul Edukasi Lengkap (13 Modul)',
                'features' => [
                    'Maksimal 2 Profil Anak',
                    'Modul Edukasi Lengkap (13 Modul)',
                    'Beberapa Simulasi AR',
                    'Smart AR Digfo Terbatas',
                    'Rapor Aktivitas Anak',
                ],
                'is_active' => true,
            ],
            [
                'id' => 'premium_monthly',
                'name' => 'Paket Premium (Bulanan)',
                'description' => 'Akses penuh tanpa batas untuk seluruh keluarga.',
                'price' => 50000.00,
                'billing_cycle' => 'monthly',
                'max_children' => 5,
                'modules_included' => 'Semua Modul Edukasi & Interaktif',
                'features' => [
                    'Hingga 5 Profil Anak',
                    'Semua Modul Edukasi & Interaktif',
                    'Simulasi AR Immersive Penuh',
                    'Smart AR Digfo & Digvi Lengkap',
                    'Parent & Teacher Guide 24/7',
                ],
                'is_active' => true,
            ],
            [
                'id' => 'premium_annual',
                'name' => 'Paket Premium (Tahunan)',
                'description' => 'Akses penuh setahun hemat 20% untuk seluruh keluarga.',
                'price' => 480000.00,
                'billing_cycle' => 'annual',
                'max_children' => 5,
                'modules_included' => 'Semua Modul Edukasi & Interaktif',
                'features' => [
                    'Hingga 5 Profil Anak',
                    'Semua Modul Edukasi & Interaktif',
                    'Simulasi AR Immersive Penuh',
                    'Smart AR Digfo & Digvi Lengkap',
                    'Parent & Teacher Guide 24/7',
                    'Hemat 20% Biaya Tahunan',
                ],
                'is_active' => true,
            ],
            [
                'id' => 'institution_monthly',
                'name' => 'Paket Institusi (Bulanan)',
                'description' => 'Solusi lengkap untuk PAUD, TK, dan Sekolah.',
                'price' => 200000.00,
                'billing_cycle' => 'monthly',
                'max_children' => 50,
                'modules_included' => 'Semua Modul + Materi Institusi',
                'features' => [
                    'Hingga 50 Profil Siswa',
                    'Lisensi Penggunaan PAUD/TK/Sekolah',
                    'Program Edukasi & Silabus Institusi',
                    'Dashboard Monitoring Guru Terpadu',
                    'Materi Cetak & Digital Eksklusif',
                ],
                'is_active' => true,
            ],
            [
                'id' => 'institution_annual',
                'name' => 'Paket Institusi (Tahunan)',
                'description' => 'Solusi institusi tahunan hemat 20% untuk sekolah.',
                'price' => 1920000.00,
                'billing_cycle' => 'annual',
                'max_children' => 50,
                'modules_included' => 'Semua Modul + Materi Institusi',
                'features' => [
                    'Hingga 50 Profil Siswa',
                    'Lisensi Penggunaan PAUD/TK/Sekolah',
                    'Program Edukasi & Silabus Institusi',
                    'Dashboard Monitoring Guru Terpadu',
                    'Materi Cetak & Digital Eksklusif',
                    'Hemat 20% Biaya Tahunan',
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
