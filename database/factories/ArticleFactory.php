<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Article>
 */
class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        $faker = $this->faker ?? (class_exists(\Faker\Factory::class) ? \Faker\Factory::create() : null);
        $title = $faker?->sentence(6) ?? ('Tips Edukasi Anak ' . Str::random(5));

        $categories = [
            ['name' => 'PANDUAN ORANG TUA', 'color' => 'orange'],
            ['name' => 'EDUTECH', 'color' => 'blue'],
            ['name' => 'PSIKOLOGI ANAK', 'color' => 'teal'],
            ['name' => 'KEAMANAN DIGITAL', 'color' => 'purple'],
        ];

        $category = $faker?->randomElement($categories) ?? $categories[array_rand($categories)];

        return [
            'id' => 'a-' . Str::random(8),
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(4),
            'description' => $faker?->paragraph(2) ?? 'Deskripsi singkat panduan edukasi anak.',
            'content' => $faker?->paragraphs(4, true) ?? 'Konten lengkap panduan edukasi anak dan perlindungan diri.',
            'category' => $category['name'],
            'category_color' => $category['color'],
            'date' => now()->subDays($faker?->numberBetween(1, 60) ?? 5)->format('j F Y'),
            'author' => ($faker?->name() ?? 'Admin') . ' (Tim Aruna)',
            'image_url' => 'https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&q=80',
        ];
    }
}
