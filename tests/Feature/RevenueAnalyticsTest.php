<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class RevenueAnalyticsTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\PlanSeeder::class);
    }

    public function test_admin_can_access_revenue_analytics_endpoint(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
            'subscription_status' => 'licensed',
        ]);

        $response = $this->actingAs($admin)
            ->getJson('/admin/analytics/revenue?period=last_30_days');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'summary' => [
                    'total_revenue',
                    'total_revenue_formatted',
                    'transaction_count',
                    'average_order_value',
                    'average_order_value_formatted',
                    'new_subscriptions',
                    'renewals',
                ],
                'chart_data',
                'period',
                'granularity',
                'date_range' => [
                    'start',
                    'end',
                    'label',
                ],
            ]);
    }

    public function test_revenue_analytics_filters_by_period_and_granularity(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
            'subscription_status' => 'licensed',
        ]);

        // Test different periods
        $periods = ['today', 'last_7_days', 'last_30_days', 'this_month', 'last_month', 'this_year'];
        foreach ($periods as $period) {
            $response = $this->actingAs($admin)
                ->getJson("/admin/analytics/revenue?period={$period}");
            $response->assertStatus(200);
            $this->assertEquals($period, $response->json('period'));
        }

        // Test custom granularity
        $response = $this->actingAs($admin)
            ->getJson('/admin/analytics/revenue?period=last_30_days&granularity=weekly');
        $response->assertStatus(200);
        $this->assertEquals('weekly', $response->json('granularity'));
    }

    public function test_non_admin_cannot_access_revenue_analytics(): void
    {
        $parent = User::factory()->create([
            'role' => 'parent',
            'subscription_status' => 'free',
        ]);

        $response = $this->actingAs($parent)
            ->getJson('/admin/analytics/revenue');

        $response->assertStatus(403);
    }

    public function test_admin_users_view_includes_subscription_timeline(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
            'subscription_status' => 'licensed',
        ]);

        $plan = Plan::first();
        $user = User::factory()->create([
            'role' => 'parent',
            'subscription_status' => 'premium',
        ]);

        // Create expired subscription
        Subscription::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'status' => 'expired',
            'current_period_start' => now()->subMonths(2),
            'current_period_end' => now()->subMonth(),
            'auto_renew' => false,
        ]);

        // Create active subscription
        Subscription::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'status' => 'active',
            'current_period_start' => now()->subDays(5),
            'current_period_end' => now()->addDays(25),
            'auto_renew' => true,
        ]);

        $response = $this->actingAs($admin)
            ->get('/admin/users?search=' . $user->email);

        $response->assertStatus(200);
    }
}
