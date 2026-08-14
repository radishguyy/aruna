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
        $faker = $this->faker ?? \Faker\Factory::create();
        $title = $faker->words(3, true);

        return [
            'id' => 'm-' . Str::random(8),
            'category_id' => $faker->numberBetween(1, 2),
            'title' => ucwords($title),
            'slug' => Str::slug($title) . '-' . Str::random(4),
            'type' => $faker->randomElement(['digfo', 'digvi', 'e-modul']),
            'difficulty_level' => $faker->numberBetween(1, 3),
            'is_premium' => $faker->boolean(40),
            'content_data' => [
                'description' => $faker->sentence(),
            ],
            'order' => $faker->numberBetween(1, 20),
        ];
    }
}
