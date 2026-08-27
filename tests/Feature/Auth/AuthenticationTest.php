<?php

namespace Tests\Feature\Auth;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_login_screen_can_be_rendered_with_plan(): void
    {
        Plan::create([
            'id' => 'premium_monthly',
            'name' => 'Paket Premium (Bulan)',
            'price' => 50000.00,
            'billing_cycle' => 'monthly',
            'is_active' => true,
        ]);

        $response = $this->get('/login?plan_id=premium_monthly');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('parent.dashboard', absolute: false));
    }

    public function test_users_logging_in_with_plan_are_redirected_to_checkout(): void
    {
        Plan::create([
            'id' => 'premium_monthly',
            'name' => 'Paket Premium (Bulan)',
            'price' => 50000.00,
            'billing_cycle' => 'monthly',
            'is_active' => true,
        ]);

        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
            'plan_id' => 'premium_monthly',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('checkout.initiate', ['plan_id' => 'premium_monthly']));
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
