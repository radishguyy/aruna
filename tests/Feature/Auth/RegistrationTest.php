<?php

namespace Tests\Feature\Auth;

use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_registration_screen_can_be_rendered_with_plan(): void
    {
        Plan::create([
            'id' => 'premium_monthly',
            'name' => 'Paket Premium (Bulan)',
            'price' => 50000.00,
            'billing_cycle' => 'monthly',
            'is_active' => true,
        ]);

        $response = $this->get('/register?plan_id=premium_monthly');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_new_users_registering_with_plan_are_redirected_to_checkout(): void
    {
        Plan::create([
            'id' => 'premium_monthly',
            'name' => 'Paket Premium (Bulan)',
            'price' => 50000.00,
            'billing_cycle' => 'monthly',
            'is_active' => true,
        ]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'plan_id' => 'premium_monthly',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('checkout.initiate', ['plan_id' => 'premium_monthly']));
    }
}
