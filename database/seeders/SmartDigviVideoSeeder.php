<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\ModuleCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SmartDigviVideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $videos = [
            [
                'id' => 1,
                'title' => 'Digvi 1: Mengenal Emosi & Perasaan',
                'creator' => 'Aruna',
                'category' => 'Mengenal Diri & Emosi',
                'category_icon' => 'Sparkles',
                'videoId' => 'iXMjUhGVhgo',
                'url' => 'https://www.youtube.com/watch?v=iXMjUhGVhgo',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/iXMjUhGVhgo',
                'difficulty_level' => 1,
                'is_premium' => false,
            ],
            [
                'id' => 2,
                'title' => 'Digvi 2: Si Hebat & Batasan Diri',
                'creator' => 'Aruna',
                'category' => 'Batasan Diri & Keberanian',
                'category_icon' => 'ShieldCheck',
                'videoId' => 'dEeIw8tyUQE',
                'url' => 'https://www.youtube.com/watch?v=dEeIw8tyUQE',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/dEeIw8tyUQE',
                'difficulty_level' => 1,
                'is_premium' => false,
            ],
            [
                'id' => 3,
                'title' => 'Digvi 3: Aku Berani Bercerita',
                'creator' => 'Aruna',
                'category' => 'Komunikasi & Keterbukaan',
                'category_icon' => 'MessageCircle',
                'videoId' => '4Kg3B390QP8',
                'url' => 'https://www.youtube.com/watch?v=4Kg3B390QP8',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/4Kg3B390QP8',
                'difficulty_level' => 1,
                'is_premium' => false,
            ],
            [
                'id' => 4,
                'title' => 'Digvi 4: Petualangan Kunang-Kunang & Zona Aman',
                'creator' => 'Aruna',
                'category' => 'Keamanan & Batasan Tubuh',
                'category_icon' => 'Heart',
                'videoId' => 'IprFmqgEsKs',
                'url' => 'https://www.youtube.com/watch?v=IprFmqgEsKs',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/IprFmqgEsKs',
                'difficulty_level' => 1,
                'is_premium' => false,
            ],
            [
                'id' => 5,
                'title' => 'Puberty in Girls: Boobs and More',
                'creator' => 'AMAZE Org',
                'category' => 'Puberty & Body Changes',
                'category_icon' => 'Sparkles',
                'videoId' => 'umpBnIxOqy8',
                'url' => 'https://www.youtube.com/watch?v=umpBnIxOqy8',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/umpBnIxOqy8',
                'difficulty_level' => 2,
                'is_premium' => false,
            ],
            [
                'id' => 6,
                'title' => 'Top Signs Boys are in Puberty',
                'creator' => 'AMAZE Org',
                'category' => 'Puberty & Body Changes',
                'category_icon' => 'Sparkles',
                'videoId' => 'onggxBVl4qw',
                'url' => 'https://www.youtube.com/watch?v=onggxBVl4qw',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/onggxBVl4qw',
                'difficulty_level' => 2,
                'is_premium' => false,
            ],
            [
                'id' => 7,
                'title' => 'Body Care Basics: Puberty',
                'creator' => 'AMAZE Org',
                'category' => 'Hygiene & Health',
                'category_icon' => 'Heart',
                'videoId' => 'qifY4mb1FS0',
                'url' => 'https://www.youtube.com/watch?v=qifY4mb1FS0',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/qifY4mb1FS0',
                'difficulty_level' => 1,
                'is_premium' => false,
            ],
            [
                'id' => 8,
                'title' => 'Always Changing and Growing Up - Girls Puberty Education',
                'creator' => 'Pineland Learning Center',
                'category' => 'Puberty & Body Changes',
                'category_icon' => 'Sparkles',
                'videoId' => 'gv21b3ZpSLg',
                'url' => 'https://www.youtube.com/watch?v=gv21b3ZpSLg',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/gv21b3ZpSLg',
                'difficulty_level' => 2,
                'is_premium' => false,
            ],
            [
                'id' => 9,
                'title' => 'Always Changing and Growing Up - Boys Puberty Education',
                'creator' => 'Pineland Learning Center',
                'category' => 'Puberty & Body Changes',
                'category_icon' => 'Sparkles',
                'videoId' => '2XF0awGRTWs',
                'url' => 'https://www.youtube.com/watch?v=2XF0awGRTWs',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/2XF0awGRTWs',
                'difficulty_level' => 2,
                'is_premium' => false,
            ],
            [
                'id' => 10,
                'title' => 'Menstruation: What To Expect',
                'creator' => 'AMAZE Org',
                'category' => 'Menstruation & Reproduction',
                'category_icon' => 'BookOpen',
                'videoId' => 'DBe7-PHRav8',
                'url' => 'https://www.youtube.com/watch?v=DBe7-PHRav8',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/DBe7-PHRav8',
                'difficulty_level' => 2,
                'is_premium' => false,
            ],
            [
                'id' => 11,
                'title' => 'Why Do Girls Get Periods? | Menstruation | The Dr Binocs Show',
                'creator' => 'Peekaboo Kidz',
                'category' => 'Menstruation & Reproduction',
                'category_icon' => 'BookOpen',
                'videoId' => 'PeL_XtBrOxw',
                'url' => 'https://www.youtube.com/watch?v=PeL_XtBrOxw',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/PeL_XtBrOxw',
                'difficulty_level' => 1,
                'is_premium' => false,
            ],
            [
                'id' => 12,
                'title' => 'Pregnancy and Reproduction Explained',
                'creator' => 'AMAZE Org',
                'category' => 'Menstruation & Reproduction',
                'category_icon' => 'BookOpen',
                'videoId' => 'OejdOS4IqeE',
                'url' => 'https://www.youtube.com/watch?v=OejdOS4IqeE',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/OejdOS4IqeE',
                'difficulty_level' => 2,
                'is_premium' => true,
            ],
            [
                'id' => 13,
                'title' => 'Bodies: Different Shapes and Sizes. All Beautiful!',
                'creator' => 'AMAZE Org',
                'category' => 'Body Image & Diversity',
                'category_icon' => 'Users',
                'videoId' => 'Fcy_VQZG5Dg',
                'url' => 'https://www.youtube.com/watch?v=Fcy_VQZG5Dg',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/Fcy_VQZG5Dg',
                'difficulty_level' => 1,
                'is_premium' => false,
            ],
            [
                'id' => 14,
                'title' => 'Puberty: Feeling Depressed, Happy and Other Emotions',
                'creator' => 'AMAZE Org',
                'category' => 'Emotional Health',
                'category_icon' => 'Heart',
                'videoId' => 'mAPLTaRM48Y',
                'url' => 'https://www.youtube.com/watch?v=mAPLTaRM48Y',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/mAPLTaRM48Y',
                'difficulty_level' => 2,
                'is_premium' => false,
            ],
            [
                'id' => 15,
                'title' => 'How do your hormones work?',
                'creator' => 'TED-Ed',
                'category' => 'Biological Science',
                'category_icon' => 'BookOpen',
                'videoId' => '-SPRPkLoKp8',
                'url' => 'https://www.youtube.com/watch?v=-SPRPkLoKp8',
                'embedUrl' => 'https://www.youtube-nocookie.com/embed/-SPRPkLoKp8',
                'difficulty_level' => 3,
                'is_premium' => true,
            ],
        ];

        // Cache category IDs
        $categories = [];

        foreach ($videos as $index => $item) {
            $catName = $item['category'];
            $catSlug = Str::slug($catName);

            if (!isset($categories[$catSlug])) {
                $category = ModuleCategory::firstOrCreate(
                    ['slug' => $catSlug],
                    [
                        'name' => $catName,
                        'description' => "Modul edukasi kategori {$catName}.",
                        'icon' => $item['category_icon'] ?? 'Video',
                    ]
                );
                $categories[$catSlug] = $category->id;
            }

            $categoryId = $categories[$catSlug];
            $moduleId = 'digvi-' . $item['id'];
            $slug = 'digvi-' . Str::slug($item['title']);

            Module::updateOrCreate(
                ['id' => $moduleId],
                [
                    'category_id' => $categoryId,
                    'title' => $item['title'],
                    'slug' => $slug,
                    'type' => 'digvi',
                    'difficulty_level' => $item['difficulty_level'] ?? 1,
                    'is_premium' => $item['is_premium'] ?? false,
                    'content_data' => [
                        'youtube_id' => $item['videoId'],
                        'creator' => $item['creator'],
                        'category' => $item['category'],
                        'url' => $item['url'],
                        'embedUrl' => $item['embedUrl'],
                        'description' => "Video edukasi oleh {$item['creator']}: {$item['title']}",
                        'startTime' => 0,
                    ],
                    'order' => 100 + $item['id'],
                ]
            );
        }

        $this->command?->info('Smart Digvi videos seeded successfully without modifying existing data.');
    }
}
