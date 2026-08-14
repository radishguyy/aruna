<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName(),
            'username' => $this->faker->unique()->userName(),
            'avatar' => 'avatar-' . $this->faker->numberBetween(1, 5) . '.png',
            'pin' => '1234', // Default for testing
            'points' => $this->faker->numberBetween(10, 500),
        ];
    }
}
