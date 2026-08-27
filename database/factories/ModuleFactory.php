<?php

namespace Database\Factories;

use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Module>
 */
class ModuleFactory extends Factory
{
    protected $model = Module::class;

    public function definition(): array
    {
        $faker = $this->faker ?? (class_exists(\Faker\Factory::class) ? \Faker\Factory::create() : null);
        $title = $faker?->words(3, true) ?? ('Modul ' . Str::random(4));

        return [
            'id' => 'm-' . Str::random(8),
            'category_id' => $faker?->numberBetween(1, 2) ?? 1,
            'title' => ucwords($title),
            'slug' => Str::slug($title) . '-' . Str::random(4),
            'type' => $faker?->randomElement(['digfo', 'digvi', 'e-modul']) ?? 'digfo',
            'difficulty_level' => $faker?->numberBetween(1, 3) ?? 1,
            'is_premium' => $faker?->boolean(40) ?? false,
            'content_data' => [
                'description' => $faker?->sentence() ?? 'Deskripsi modul pembelajaran.',
            ],
            'order' => $faker?->numberBetween(1, 20) ?? 1,
        ];
    }
}
