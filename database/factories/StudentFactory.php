<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        $faker = $this->faker ?? (class_exists(\Faker\Factory::class) ? \Faker\Factory::create() : null);

        return [
            'name' => $faker?->firstName() ?? ('Student ' . Str::random(4)),
            'username' => $faker?->unique()->userName() ?? ('student_' . Str::random(6)),
            'avatar' => 'avatar-' . ($faker?->numberBetween(1, 5) ?? 1) . '.png',
            'pin' => '1234', // Default for testing
            'points' => $faker?->numberBetween(10, 500) ?? 100,
        ];
    }
}
