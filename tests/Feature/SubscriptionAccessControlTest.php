<?php

namespace Tests\Feature;

use App\Models\Child;
use App\Models\Module;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubscriptionAccessControlTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\PlanSeeder::class);

        // Create sample categories and modules
        \App\Models\ModuleCategory::firstOrCreate(
            ['id' => 1],
            [
                'name' => 'Mengenal Tubuh',
                'description' => 'Belajar tentang anggota tubuh dan fungsinya.',
                'slug' => 'mengenal-tubuh',
                'icon' => 'User',
            ]
        );

        \App\Models\ModuleCategory::firstOrCreate(
            ['id' => 2],
            [
                'name' => 'Batasan Diri',
                'description' => 'Memahami bagian tubuh yang boleh dan tidak boleh disentuh orang lain.',
                'slug' => 'batasan-diri',
                'icon' => 'ShieldX',
            ]
        );

        Module::updateOrCreate(
            ['id' => 'm-1'],
            [
                'category_id' => 1,
                'title' => 'Ini Tubuhku',
                'slug' => 'ini-tubuhku',
                'type' => 'digfo',
                'difficulty_level' => 1,
                'is_premium' => false,
                'content_data' => ['description' => 'Infografis interaktif untuk mengenal anggota tubuh.'],
                'order' => 1,
            ]
        );

        Module::updateOrCreate(
            ['id' => 'm-2'],
            [
                'category_id' => 2,
                'title' => 'Sentuhan Boleh & Tidak Boleh',
                'slug' => 'sentuhan-boleh-tidak-boleh',
                'type' => 'digvi',
                'difficulty_level' => 1,
                'is_premium' => false,
                'content_data' => ['youtube_id' => 'dEeIw8tyUQE'],
                'order' => 2,
            ]
        );
    }

    public function test_non_subscribed_user_can_access_free_module_m1(): void
    {
        $user = User::factory()->create([
            'role' => 'parent',
            'subscription_status' => 'free',
        ]);

        $child = Child::create([
            'user_id' => $user->id,
            'nickname' => 'Adit',
            'gender' => 'male',
            'birth_date' => '2019-01-01',
        ]);

        $response = $this->actingAs($user)
            ->withSession(['active_child_id' => $child->id])
            ->get('/child/module/m-1');

        $response->assertStatus(200);
    }

    public function test_non_subscribed_user_is_blocked_from_locked_module_m2(): void
    {
        $user = User::factory()->create([
            'role' => 'parent',
            'subscription_status' => 'free',
        ]);

        $child = Child::create([
            'user_id' => $user->id,
            'nickname' => 'Adit',
            'gender' => 'male',
            'birth_date' => '2019-01-01',
        ]);

        // Web request redirects back to dashboard with prompt flash session
        $response = $this->actingAs($user)
            ->withSession(['active_child_id' => $child->id])
            ->get('/child/module/m-2');

        $response->assertRedirect(route('child.dashboard'));
        $response->assertSessionHas('locked_module_prompt');

        // JSON / API request returns 403 Forbidden with prompt payload
        $apiResponse = $this->actingAs($user)
            ->withSession(['active_child_id' => $child->id])
            ->getJson('/child/module/m-2');

        $apiResponse->assertStatus(403);
        $apiResponse->assertJson([
            'requires_subscription' => true,
        ]);
    }

    public function test_non_subscribed_user_cannot_save_progress_on_locked_module(): void
    {
        $user = User::factory()->create([
            'role' => 'parent',
            'subscription_status' => 'free',
        ]);

        $child = Child::create([
            'user_id' => $user->id,
            'nickname' => 'Adit',
            'gender' => 'male',
            'birth_date' => '2019-01-01',
        ]);

        $response = $this->actingAs($user)
            ->withSession(['active_child_id' => $child->id])
            ->postJson('/child/module/m-2/progress', [
                'status' => 'completed',
                'score' => 100,
            ]);

        $response->assertStatus(403);
        $response->assertJson([
            'requires_subscription' => true,
        ]);
    }

    public function test_subscribed_user_can_access_all_modules_and_save_progress(): void
    {
        $user = User::factory()->create([
            'role' => 'parent',
            'subscription_status' => 'premium',
        ]);

        // Attach active subscription
        Subscription::create([
            'user_id' => $user->id,
            'plan_id' => 'premium_monthly',
            'status' => 'active',
            'current_period_start' => now(),
            'current_period_end' => now()->addMonth(),
        ]);

        $child = Child::create([
            'user_id' => $user->id,
            'nickname' => 'Adit',
            'gender' => 'male',
            'birth_date' => '2019-01-01',
        ]);

        // Can access m-2 without redirect
        $response = $this->actingAs($user)
            ->withSession(['active_child_id' => $child->id])
            ->get('/child/module/m-2');

        $response->assertStatus(200);

        // Can save progress on m-2
        $progressResponse = $this->actingAs($user)
            ->withSession(['active_child_id' => $child->id])
            ->postJson('/child/module/m-2/progress', [
                'status' => 'completed',
                'score' => 95,
            ]);

        $progressResponse->assertStatus(200);
    }

    public function test_non_subscribed_user_can_add_only_one_child(): void
    {
        $user = User::factory()->create([
            'role' => 'parent',
            'subscription_status' => 'free',
        ]);

        // Add 1st child succeeds
        $res1 = $this->actingAs($user)
            ->post('/parent/children', [
                'nickname' => 'Anak Pertama',
                'gender' => 'male',
                'birth_date' => '2019-02-10',
            ]);

        $res1->assertSessionHasNoErrors();
        $this->assertEquals(1, $user->children()->count());

        // Add 2nd child is blocked via web request
        $res2 = $this->actingAs($user)
            ->post('/parent/children', [
                'nickname' => 'Anak Kedua',
                'gender' => 'female',
                'birth_date' => '2021-06-15',
            ]);

        $res2->assertSessionHasErrors(['subscription_limit']);
        $this->assertEquals(1, $user->children()->count());

        // Add 2nd child is blocked via JSON request with 422
        $res3 = $this->actingAs($user)
            ->postJson('/parent/children', [
                'nickname' => 'Anak Kedua via API',
                'gender' => 'female',
                'birth_date' => '2021-06-15',
            ]);

        $res3->assertStatus(422);
        $res3->assertJson([
            'limit_reached' => true,
        ]);
        $this->assertEquals(1, $user->children()->count());
    }

    public function test_subscribed_user_respects_plan_child_limits(): void
    {
        $user = User::factory()->create([
            'role' => 'parent',
            'subscription_status' => 'standard',
        ]);

        // Standard plan has max_children = 2
        Subscription::create([
            'user_id' => $user->id,
            'plan_id' => 'standard_monthly',
            'status' => 'active',
            'current_period_start' => now(),
            'current_period_end' => now()->addMonth(),
        ]);

        $this->assertEquals(2, $user->maxAllowedChildren());

        // Can add 1st child
        $this->actingAs($user)->post('/parent/children', [
            'nickname' => 'Child 1',
            'gender' => 'male',
            'birth_date' => '2018-01-01',
        ])->assertSessionHasNoErrors();

        // Can add 2nd child
        $this->actingAs($user)->post('/parent/children', [
            'nickname' => 'Child 2',
            'gender' => 'female',
            'birth_date' => '2020-05-12',
        ])->assertSessionHasNoErrors();

        $this->assertEquals(2, $user->children()->count());

        // Blocked at 3rd child
        $res = $this->actingAs($user)->postJson('/parent/children', [
            'nickname' => 'Child 3',
            'gender' => 'male',
            'birth_date' => '2022-03-10',
        ]);

        $res->assertStatus(422);
        $res->assertJson(['limit_reached' => true]);
        $this->assertEquals(2, $user->children()->count());
    }

    public function test_expired_subscription_automatically_applies_non_subscribed_restrictions(): void
    {
        $user = User::factory()->create([
            'role' => 'parent',
            'subscription_status' => 'premium',
        ]);

        // Expired subscription (ended 5 days ago)
        Subscription::create([
            'user_id' => $user->id,
            'plan_id' => 'premium_monthly',
            'status' => 'active',
            'current_period_start' => now()->subMonths(2),
            'current_period_end' => now()->subDays(5),
        ]);

        $this->assertFalse($user->hasActiveSubscription());
        $this->assertEquals('free', $user->effective_subscription_status);
        $this->assertEquals(1, $user->maxAllowedChildren());

        $child = Child::create([
            'user_id' => $user->id,
            'nickname' => 'Adit',
            'gender' => 'male',
            'birth_date' => '2019-01-01',
        ]);

        // Attempting to access m-2 should be blocked
        $response = $this->actingAs($user)
            ->withSession(['active_child_id' => $child->id])
            ->getJson('/child/module/m-2');

        $response->assertStatus(403);
    }

    public function test_pricing_page_displays_plans_dynamically(): void
    {
        $response = $this->get('/pricing');

        $response->assertStatus(200);
        $response->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
            ->component('Landing/Pricing')
            ->has('plans')
            ->where('plans.0.id', 'standard_monthly')
            ->where('plans.0.max_children', 2)
        );
    }
}
