<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DemoLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_demo_login_creates_user_and_authenticates()
    {
        $this->assertDatabaseMissing('users', [
            'email' => 'premium.demo@aruna.id'
        ]);

        $response = $this->get('/demo-login');

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();

        $this->assertDatabaseHas('users', [
            'email' => 'premium.demo@aruna.id',
            'subscription_status' => 'premium'
        ]);
    }
}
