<?php

namespace Database\Factories;

use App\Models\Institution;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Institution>
 */
class InstitutionFactory extends Factory
{
    protected $model = Institution::class;

    public function definition(): array
    {
        $faker = $this->faker ?? \Faker\Factory::create();
        $name = 'PAUD ' . $faker->company();

        return [
            'name' => $name,
            'address' => $faker->address(),
            'license_code' => strtoupper(Str::slug(Str::words($name, 2, ''))) . '-' . $faker->numberBetween(2024, 2026),
            'license_expires_at' => now()->addYear(),
        ];
    }
}
