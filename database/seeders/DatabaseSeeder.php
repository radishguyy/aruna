<?php

namespace Database\Seeders;

use App\Models\Institution;
use App\Models\User;
use App\Models\Child;
use App\Models\ModuleCategory;
use App\Models\Module;
use App\Models\Progress;
use App\Models\Badge;
use App\Models\Article;
use App\Models\TeacherResource;
use App\Models\AiConversation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Institutions
        Institution::create([
            'id' => 1,
            'name' => 'PAUD Mentari',
            'address' => 'Jl. Pendidikan No. 1, Jakarta',
            'license_code' => 'MENTARI-2024',
            'license_expires_at' => '2025-01-01 00:00:00',
        ]);

        // 2. Seed Users
        // Parent
        $parent = User::create([
            'id' => 1,
            'name' => 'Bunda Rara',
            'email' => 'rara@example.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
            'subscription_status' => 'premium',
            'institution_id' => null,
        ]);

        // Teacher
        User::create([
            'id' => 2,
            'name' => 'Ibu Guru Sari',
            'email' => 'sari@mentari.edu',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'subscription_status' => 'licensed',
            'institution_id' => 1,
        ]);

        // Admin
        User::create([
            'id' => 3,
            'name' => 'Admin Aruna',
            'email' => 'admin@aruna.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'subscription_status' => 'premium',
            'institution_id' => null,
        ]);

        // 3. Seed Children
        $childId = 'c0000000-0000-0000-0000-000000000001';
        $child = Child::create([
            'id' => $childId,
            'user_id' => 1,
            'nickname' => 'Fachri',
            'gender' => 'male',
            'birth_date' => '2018-05-15',
            'avatar_url' => '/api/placeholder/150/150',
            'total_points' => 350,
        ]);

        // 4. Seed Module Categories
        ModuleCategory::create([
            'id' => 1,
            'name' => 'Mengenal Tubuh',
            'description' => 'Belajar tentang anggota tubuh dan fungsinya.',
            'slug' => 'mengenal-tubuh',
            'icon' => 'User',
        ]);

        ModuleCategory::create([
            'id' => 2,
            'name' => 'Batasan Diri',
            'description' => 'Memahami bagian tubuh yang boleh dan tidak boleh disentuh orang lain.',
            'slug' => 'batasan-diri',
            'icon' => 'ShieldX',
        ]);

        // 5. Seed Modules
        $modules = [
            [
                'id' => 'm-1',
                'category_id' => 1,
                'title' => 'Ini Tubuhku',
                'slug' => 'ini-tubuhku',
                'type' => 'digfo',
                'difficulty_level' => 1,
                'is_premium' => false,
                'content_data' => [
                    'description' => 'Infografis interaktif untuk mengenal anggota tubuh.',
                    'bodyParts' => [
                        ['id' => 'head', 'label' => 'Kepala', 'isPrivate' => false],
                        ['id' => 'chest', 'label' => 'Dada', 'isPrivate' => true, 'tooltip' => 'Area Pribadi: Tidak boleh disentuh kecuali oleh dokter saat ada ibu.'],
                        ['id' => 'hands', 'label' => 'Tangan', 'isPrivate' => false],
                        ['id' => 'legs', 'label' => 'Kaki', 'isPrivate' => false],
                    ]
                ],
                'order' => 1,
            ],
            [
                'id' => 'm-2',
                'category_id' => 2,
                'title' => 'Aku Berani Bilang TIDAK',
                'slug' => 'berani-bilang-tidak',
                'type' => 'digvi',
                'difficulty_level' => 1,
                'is_premium' => false,
                'content_data' => [
                    'youtube_id' => '2g811Eo7K8U',
                    'startTime' => 0,
                    'description' => 'Video edukasi tentang keberanian menolak hal yang tidak nyaman.',
                ],
                'order' => 2,
            ],
            [
                'id' => 'm-3',
                'category_id' => 2,
                'title' => 'Cerita Si Hebat',
                'slug' => 'cerita-si-hebat',
                'type' => 'e-modul',
                'difficulty_level' => 2,
                'is_premium' => true,
                'content_data' => [
                    'description' => 'Petualangan interaktif Si Hebat melawan gangguan orang asing.',
                    'pages' => [
                        ['id' => 1, 'text' => 'Suatu hari, ada orang asing yang membujuk Si Hebat.', 'image' => '/api/placeholder/400/300'],
                        ['id' => 2, 'text' => 'Si Hebat ingat pesan Ibu: \'Jangan ikut orang tidak dikenal!\'', 'image' => '/api/placeholder/400/300'],
                        ['id' => 3, 'text' => 'Si Hebat langsung berlari dan berteriak, \'TIDAK MAU!\'', 'image' => '/api/placeholder/400/300'],
                    ]
                ],
                'order' => 3,
            ],
            [
                'id' => 'm-4',
                'category_id' => 1,
                'title' => 'Mengenal Perasaan',
                'slug' => 'mengenal-perasaan',
                'type' => 'digfo',
                'difficulty_level' => 1,
                'is_premium' => false,
                'content_data' => [
                    'description' => 'Belajar mengenali sinyal perasaan nyaman dan tidak nyaman.',
                    'bodyParts' => [
                        ['id' => 'heart', 'label' => 'Hati Senang', 'isPrivate' => false, 'tooltip' => 'Saat kita merasa aman dan bahagia.'],
                        ['id' => 'belly', 'label' => 'Perut Aneh', 'isPrivate' => false, 'tooltip' => 'Sinyal saat kita merasa takut atau tidak nyaman.'],
                    ]
                ],
                'order' => 4,
            ],
            [
                'id' => 'm-5',
                'category_id' => 2,
                'title' => 'Sentuhan Aman & Tidak Aman',
                'slug' => 'sentuhan-aman-tidak-aman',
                'type' => 'digvi',
                'difficulty_level' => 1,
                'is_premium' => false,
                'content_data' => [
                    'youtube_id' => '5v6F_N_f_H4',
                    'startTime' => 0,
                    'description' => 'Penjelasan visual tentang jenis sentuhan yang boleh dan dilarang.',
                ],
                'order' => 5,
            ],
            [
                'id' => 'm-6',
                'category_id' => 2,
                'title' => 'Rahasia Baik & Buruk',
                'slug' => 'rahasia-baik-buruk',
                'type' => 'e-modul',
                'difficulty_level' => 2,
                'is_premium' => false,
                'content_data' => [
                    'description' => 'Belajar membedakan rahasia kejutan dan rahasia yang menyakitkan.',
                    'pages' => [
                        ['id' => 1, 'text' => 'Rahasia kejutan ulang tahun adalah rahasia BAIK.', 'image' => '/api/placeholder/400/300'],
                        ['id' => 2, 'text' => 'Rahasia yang membuatmu sedih atau takut adalah rahasia BURUK.', 'image' => '/api/placeholder/400/300'],
                        ['id' => 3, 'text' => 'Jangan simpan rahasia buruk, ceritakan pada orang tua!', 'image' => '/api/placeholder/400/300'],
                    ]
                ],
                'order' => 6,
            ],
            [
                'id' => 'm-7',
                'category_id' => 1,
                'title' => 'Pahlawan Pakaian Dalam',
                'slug' => 'pahlawan-pakaian-dalam',
                'type' => 'digfo',
                'difficulty_level' => 1,
                'is_premium' => true,
                'content_data' => [
                    'description' => 'Memahami bagian tubuh yang ditutupi pakaian dalam adalah area privat.',
                    'bodyParts' => [
                        ['id' => 'inner', 'label' => 'Area Bikini', 'isPrivate' => true, 'tooltip' => 'Tertutup dan tidak boleh dilihat orang lain.'],
                    ]
                ],
                'order' => 7,
            ],
            [
                'id' => 'm-8',
                'category_id' => 2,
                'title' => 'Lari, Teriak, Cerita!',
                'slug' => 'lari-teriak-cerita',
                'type' => 'digvi',
                'difficulty_level' => 2,
                'is_premium' => false,
                'content_data' => [
                    'youtube_id' => 'H6OdpQ8v2kM',
                    'startTime' => 0,
                    'description' => 'Tiga langkah cerdas saat menghadapi situasi bahaya.',
                ],
                'order' => 8,
            ],
            [
                'id' => 'm-9',
                'category_id' => 2,
                'title' => 'Sahabat Tubuhku',
                'slug' => 'sahabat-tubuhku',
                'type' => 'e-modul',
                'difficulty_level' => 1,
                'is_premium' => false,
                'content_data' => [
                    'description' => 'Cerita tentang betapa berharganya tubuh kita.',
                    'pages' => [
                        ['id' => 1, 'text' => 'Tubuhku adalah milikku sendiri.', 'image' => '/api/placeholder/400/300'],
                        ['id' => 2, 'text' => 'Aku menjaganya seperti harta karun.', 'image' => '/api/placeholder/400/300'],
                        ['id' => 3, 'text' => 'Terima kasih tubuhku sudah menemaniku bermain!', 'image' => '/api/placeholder/400/300'],
                    ]
                ],
                'order' => 9,
            ],
            [
                'id' => 'm-10',
                'category_id' => 2,
                'title' => 'Menolak Hadiah Orang Asing',
                'slug' => 'menolak-hadiah',
                'type' => 'digvi',
                'difficulty_level' => 2,
                'is_premium' => true,
                'content_data' => [
                    'youtube_id' => 'lG2h9N6R8Cg',
                    'startTime' => 0,
                    'description' => 'Mengapa kita tidak boleh menerima permen atau mainan dari orang tak dikenal.',
                ],
                'order' => 10,
            ],
            [
                'id' => 'm-11',
                'category_id' => 1,
                'title' => 'Kenali Orang Terpercaya',
                'slug' => 'kenali-orang-terpercaya',
                'type' => 'digfo',
                'difficulty_level' => 1,
                'is_premium' => false,
                'content_data' => [
                    'description' => 'Daftar pahlawan di sekitarmu: Ayah, Ibu, Guru, Polisi.',
                    'bodyParts' => [
                        ['id' => 'parent', 'label' => 'Orang Tua', 'isPrivate' => false, 'tooltip' => 'Selalu siap mendengarkan ceritamu.'],
                        ['id' => 'teacher', 'label' => 'Guru', 'isPrivate' => false, 'tooltip' => 'Pelindungmu saat di sekolah.'],
                    ]
                ],
                'order' => 11,
            ],
            [
                'id' => 'm-12',
                'category_id' => 2,
                'title' => 'Aku Berani Bercerita',
                'slug' => 'aku-berani-bercerita',
                'type' => 'e-modul',
                'difficulty_level' => 2,
                'is_premium' => false,
                'content_data' => [
                    'description' => 'Pentingnya berbicara jika ada hal yang membuat tidak nyaman.',
                    'pages' => [
                        ['id' => 1, 'text' => 'Malu bercerita itu wajar, tapi ayo beranikan diri.', 'image' => '/api/placeholder/400/300'],
                        ['id' => 2, 'text' => 'Ibu dan Ayah akan bangga jika kamu jujur.', 'image' => '/api/placeholder/400/300'],
                        ['id' => 3, 'text' => 'Bercerita adalah kekuatan pahlawan!', 'image' => '/api/placeholder/400/300'],
                    ]
                ],
                'order' => 12,
            ],
            [
                'id' => 'm-13',
                'category_id' => 2,
                'title' => 'Zona Aman & Bahaya',
                'slug' => 'zona-aman-bahaya',
                'type' => 'digvi',
                'difficulty_level' => 2,
                'is_premium' => true,
                'content_data' => [
                    'youtube_id' => 'v-87cR3R9w8',
                    'startTime' => 0,
                    'description' => 'Mengenal tempat-tempat yang aman untuk bermain.',
                ],
                'order' => 13,
            ],
        ];

        foreach ($modules as $m) {
            Module::create($m);
        }

        // 6. Seed Progress
        Progress::create([
            'child_id' => $childId,
            'module_id' => 'm-1',
            'status' => 'completed',
            'score' => 100,
            'completed_at' => '2024-05-15 10:00:00',
        ]);

        Progress::create([
            'child_id' => $childId,
            'module_id' => 'm-2',
            'status' => 'started',
            'score' => 0,
            'completed_at' => null,
        ]);

        // 7. Seed Badges
        $badges = [
            [
                'id' => 1,
                'name' => 'Pahlawan Pemberani',
                'description' => 'Telah menyelesaikan modul Mengenal Tubuh.',
                'image_url' => 'Award',
                'requirement_type' => 'module_completion',
                'requirement_value' => 1,
            ],
            [
                'id' => 2,
                'name' => 'Bintang Video',
                'description' => 'Menonton 3 Video Edukasi.',
                'image_url' => 'Video',
                'requirement_type' => 'video_watched',
                'requirement_value' => 3,
            ],
            [
                'id' => 3,
                'name' => 'Pembaca Pintar',
                'description' => 'Selesaikan 3 E-Modul Cerita.',
                'image_url' => 'BookOpen',
                'requirement_type' => 'modul_read',
                'requirement_value' => 3,
            ],
            [
                'id' => 4,
                'name' => 'Anak Jujur',
                'description' => 'Selesaikan modul Bercerita.',
                'image_url' => 'MessageCircle',
                'requirement_type' => 'module_completion',
                'requirement_value' => 1,
            ],
            [
                'id' => 5,
                'name' => 'Penjaga Diri',
                'description' => 'Memahami batasan sentuhan aman.',
                'image_url' => 'ShieldCheck',
                'requirement_type' => 'module_completion',
                'requirement_value' => 1,
            ],
            [
                'id' => 6,
                'name' => 'Ahli Perasaan',
                'description' => 'Mengenali sinyal emosi diri.',
                'image_url' => 'Heart',
                'requirement_type' => 'module_completion',
                'requirement_value' => 1,
            ],
            [
                'id' => 7,
                'name' => 'Pahlawan Aruna',
                'description' => 'Selesaikan semua misi pahlawan!',
                'image_url' => 'Trophy',
                'requirement_type' => 'all_completion',
                'requirement_value' => 13,
            ],
        ];

        foreach ($badges as $b) {
            Badge::create($b);
        }

        // 8. Seed Child Badges (Fachri has earned all 7 badges in mock data)
        for ($i = 1; $i <= 7; $i++) {
            $child->badges()->attach($i, [
                'earned_at' => '2024-05-' . (14 + $i) . ' 10:00:00',
            ]);
        }

        // 9. Seed AI Conversations
        AiConversation::create([
            'id' => 'ai-1',
            'user_id' => 1,
            'child_id' => $childId,
            'prompt' => 'Fachri tadi menangis karena tidak mau memakai baju renang di depan teman-temannya.',
            'response' => 'Wajar jika Fachri merasa tidak nyaman, Bunda. Ini adalah waktu yang tepat untuk memuji kesadarannya akan rasa malu dan mulai mengajarkan tentang bagian tubuh pribadi. Katakan kepadanya bahwa perasaannya itu baik, and berikan opsi untuk berganti pakaian di tempat tertutup.',
            'sentiment_tag' => 'worried',
        ]);

        // 10. Seed Articles (Blog)
        $articles = [
            [
                'id' => 'a-1',
                'slug' => 'cara-membahas-batasan-tubuh',
                'title' => 'Cara Membahas Batasan Tubuh Tanpa Canggung',
                'description' => 'Pelajari metode praktis untuk mengajarkan anak tentang sentuhan aman dan tidak aman di rumah secara natural.',
                'content' => "Pendidikan seksual pada anak usia dini masih menjadi isu yang cenderung diabaikan. Sebagian besar orang tua menganggap hal ini tabu.\n\nPadahal, pendidikan seksual yang diberikan secara bertahap sangat penting. Untuk memulainya, ajarkan anak nama-nama anggota tubuh secara benar, bukan dengan sebutan kiasan. Beritahu mereka bagian mana yang boleh disentuh dan oleh siapa (misalnya, hanya orang tua atau dokter saat ada orang tua).\n\nKita juga perlu mengajarkan konsep 'berani bilang tidak' atau lari jika ada yang mencoba menyentuh area pribadi mereka. Edukasi ini bisa disisipkan melalui cerita dongeng atau menggunakan aplikasi interaktif seperti Aruna yang menyajikan konsep-konsep ini dalam bentuk animasi yang mudah dicerna oleh anak-anak.",
                'category' => 'PANDUAN ORANG TUA',
                'category_color' => 'orange',
                'date' => '3 April 2026',
                'author' => 'Tim Psikologi Aruna',
                'image_url' => 'https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&q=80',
            ],
            [
                'id' => 'a-2',
                'slug' => 'meningkatkan-daya-ingat-anak',
                'title' => 'Meningkatkan Daya Ingat Anak Lewat Animasi',
                'description' => 'Evaluasi kami tentang bagaimana penceritaan digital dapat meningkatkan pemahaman aturan keamanan.',
                'content' => "Anak-anak pada era digital cenderung lebih mudah memahami pembelajaran berbasis visual, interaktif, dan pengalaman langsung (experiential learning).\n\nMedia pembelajaran konvensional seringkali kurang menarik bagi anak-anak usia 3-6 tahun. Oleh karena itu, penggunaan teknologi seperti Augmented Reality (AR) dan video animasi sangat efektif. Visual yang bergerak dan cerita yang menarik membantu materi 'menempel' lebih kuat di memori anak.\n\nDalam sebuah uji coba, anak-anak yang belajar melalui simulasi AR menunjukkan retensi informasi 60% lebih baik dibandingkan mereka yang hanya mendengar ceramah. Mereka lebih paham kapan harus melapor ke orang tua ketika menghadapi situasi yang janggal.",
                'category' => 'EDUTECH',
                'category_color' => 'blue',
                'date' => '25 Maret 2026',
                'author' => 'Andi (CTO Aruna)',
                'image_url' => 'https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=80',
            ],
            [
                'id' => 'a-3',
                'slug' => 'mengenali-perubahan-perilaku-anak',
                'title' => 'Mengenali Perubahan Perilaku Anak',
                'description' => 'Tanda-tanda yang harus diperhatikan orang tua, dan bagaimana cara membuka komunikasi yang aman dengan anak.',
                'content' => "Sebagai orang tua, kita harus peka terhadap perubahan drastis pada perilaku anak. Apakah tiba-tiba anak menjadi pendiam, mudah menangis, atau takut pada orang tertentu?\n\nJika menemukan tanda-tanda ini, jangan langsung memaksa anak untuk bercerita. Ciptakan ruang yang aman. Katakan, 'Bunda perhatikan belakangan ini adik agak sedih. Kalau ada yang mengganggu, adik selalu bisa cerita ke Bunda, ya. Bunda tidak akan marah.'\n\nHal paling penting adalah membangun kepercayaan, sehingga anak tahu bahwa lingkungan terdekatnya adalah tempat berlindung yang paling aman.",
                'category' => 'PSIKOLOGI ANAK',
                'category_color' => 'teal',
                'date' => '12 Maret 2026',
                'author' => 'Vina (CMO Aruna)',
                'image_url' => 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80',
            ]
        ];

        foreach ($articles as $art) {
            Article::create($art);
        }

        // 11. Seed Teacher Resources
        $resources = [
            [
                'id' => 'tr-1',
                'title' => 'Panduan Mengenal Tubuh',
                'description' => 'Panduan lengkap untuk guru dalam mengajarkan pengenalan anggota tubuh kepada anak usia 3-6 tahun.',
                'category' => 'Panduan Guru',
                'type' => 'pdf',
                'file_size' => '2.4 MB',
                'download_count' => 156,
            ],
            [
                'id' => 'tr-2',
                'title' => 'Flashcard Batasan Diri',
                'description' => 'Set kartu bergambar untuk aktivitas kelas tentang batasan sentuhan aman dan tidak aman.',
                'category' => 'Aktivitas Kelas',
                'type' => 'pdf',
                'file_size' => '8.1 MB',
                'download_count' => 203,
            ],
            [
                'id' => 'tr-3',
                'title' => 'Video: Teknik Bercerita',
                'description' => 'Tutorial video untuk guru tentang cara menyampaikan materi sensitif melalui storytelling.',
                'category' => 'Video Pelatihan',
                'type' => 'video',
                'file_size' => '124 MB',
                'download_count' => 89,
            ],
            [
                'id' => 'tr-4',
                'title' => 'Worksheet Perasaan',
                'description' => 'Lembar kerja interaktif untuk membantu anak mengenali dan mengekspresikan perasaan mereka.',
                'category' => 'Aktivitas Kelas',
                'type' => 'pdf',
                'file_size' => '1.8 MB',
                'download_count' => 312,
            ],
            [
                'id' => 'tr-5',
                'title' => 'Rubrik Penilaian Modul',
                'description' => 'Template rubrik penilaian untuk mengukur pemahaman anak pada setiap modul edukasi.',
                'category' => 'Panduan Guru',
                'type' => 'xlsx',
                'file_size' => '540 KB',
                'download_count' => 67,
            ],
            [
                'id' => 'tr-6',
                'title' => 'Poster Zona Aman',
                'description' => 'Poster A3 bergambar untuk ditempel di kelas tentang zona aman dan zona bahaya.',
                'category' => 'Materi Cetak',
                'type' => 'pdf',
                'file_size' => '5.2 MB',
                'download_count' => 178,
            ],
        ];

        foreach ($resources as $res) {
            TeacherResource::create($res);
        }
    }
}
