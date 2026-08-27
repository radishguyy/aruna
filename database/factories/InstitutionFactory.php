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
        $faker = $this->faker ?? (class_exists(\Faker\Factory::class) ? \Faker\Factory::create() : null);
        $name = 'PAUD ' . ($faker?->company() ?? ('Karisma ' . Str::random(4)));

        return [
            'name' => $name,
            'address' => $faker?->address() ?? ('Jl. Pendidikan No. ' . rand(1, 100) . ', Jakarta'),
            'license_code' => 'LIC-' . strtoupper(Str::random(6)) . '-' . rand(2025, 2027),
            'license_expires_at' => now()->addYear(),
        ];
    }
}
