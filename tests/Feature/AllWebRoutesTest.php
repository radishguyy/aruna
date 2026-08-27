<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Child;
use App\Models\Classroom;
use App\Models\Institution;
use App\Models\Module;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Student;
use App\Models\TeacherResource;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AllWebRoutesTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\DatabaseSeeder::class);
    }
    public function test_guest_landing_routes(): void
    {
        $this->get('/')->assertStatus(200);
        $this->get('/about')->assertStatus(200);
        $this->get('/blog')->assertStatus(200);

        $article = Article::first();
        if ($article) {
            $this->get("/blog/{$article->slug}")->assertStatus(200);
        }

        $this->get('/pricing')->assertStatus(200);
        $this->get('/contact')->assertStatus(200);
        $this->get('/admin/login')->assertStatus(200);
        $this->get('/kids/login')->assertRedirect(route('login', ['tab' => 'kids']));
        $this->get('/kids')->assertStatus(302)->assertRedirect('/kids/login');
    }

    public function test_kids_lookup_and_login(): void
    {
        $classroom = Classroom::first();
        if ($classroom) {
            $response = $this->getJson("/api/kids/lookup?classroom_code={$classroom->class_code}");
            $response->assertStatus(200);
        }

        $student = Student::first();
        if ($student) {
            $response = $this->post('/kids/login', [
                'identifier' => $student->username,
                'pin' => $student->pin,
            ]);
            $response->assertRedirect('/child');
        }
    }

    public function test_admin_routes(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)->get('/admin')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/payments')->assertStatus(200);

        $order = Order::first();
        if ($order) {
            $this->actingAs($admin)->get("/admin/payments/{$order->id}")->assertStatus(200);
        }

        $this->actingAs($admin)->get('/admin/users')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/cms')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/settings')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/profile')->assertStatus(200);
    }

    public function test_teacher_routes(): void
    {
        $teacher = User::where('role', 'teacher')->first() ?? User::factory()->create(['role' => 'teacher']);

        $this->actingAs($teacher)->get('/teacher')->assertStatus(200);
        $this->actingAs($teacher)->get('/teacher/students')->assertStatus(200);
        $this->actingAs($teacher)->get('/teacher/resources')->assertStatus(200);
        $this->actingAs($teacher)->get('/teacher/license')->assertStatus(200);
        $this->actingAs($teacher)->get('/teacher/profile')->assertStatus(200);
    }

    public function test_parent_routes(): void
    {
        $parent = User::where('role', 'parent')->first() ?? User::factory()->create(['role' => 'parent']);

        $this->actingAs($parent)->get('/parent')->assertStatus(200);
        $this->actingAs($parent)->get('/parent/children')->assertStatus(200);
        $this->actingAs($parent)->get('/parent/reports')->assertStatus(200);
        $this->actingAs($parent)->get('/parent/billing')->assertStatus(200);
        $this->actingAs($parent)->get('/parent/profile')->assertStatus(200);
    }

    public function test_child_routes(): void
    {
        $child = Child::first();
        $parent = $child ? $child->user : (User::where('role', 'parent')->first() ?? User::factory()->create(['role' => 'parent']));

        $this->actingAs($parent)->get('/child')->assertStatus(200);
        $this->actingAs($parent)->get('/child/hall-of-fame')->assertStatus(200);

        $module = Module::first();
        if ($module) {
            $this->actingAs($parent)->get("/child/module/{$module->id}")->assertStatus(200);

            $this->actingAs($parent)->post("/child/module/{$module->id}/progress", [
                'status' => 'completed',
                'score' => 100,
            ])->assertStatus(200);
        }
    }

    public function test_contact_form(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'message' => 'Halo, saya ingin bertanya tentang fitur modul.',
        ]);
        $response->assertSessionHasNoErrors();
    }

    public function test_onboarding_and_profile_routes(): void
    {
        $user = User::factory()->create(['role' => 'parent']);

        $this->actingAs($user)->get('/auth/onboarding')->assertStatus(200);
        $this->actingAs($user)->post('/auth/onboarding', [
            'role' => 'parent',
            'children' => [
                [
                    'nickname' => 'Dina',
                    'gender' => 'female',
                    'birth_date' => '2020-05-10',
                ],
            ],
        ])->assertRedirect(route('parent.dashboard'));

        $this->actingAs($user)->get('/profile')->assertStatus(200);
        $this->actingAs($user)->patch('/profile', [
            'name' => 'Budi Updated',
            'email' => $user->email,
        ])->assertSessionHasNoErrors();
    }

    public function test_admin_mutations(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);

        // Settings update
        $this->actingAs($admin)->post('/admin/settings', [
            'site_name' => 'Aruna Edu',
            'support_email' => 'support@aruna.id',
            'app_version' => '1.0.0',
        ])->assertSessionHasNoErrors();

        // Profile update
        $this->actingAs($admin)->patch('/admin/profile', [
            'name' => 'Admin Updated',
            'email' => $admin->email,
        ])->assertSessionHasNoErrors();

        // CMS article creation & deletion
        $this->actingAs($admin)->post('/admin/cms/articles', [
            'title' => 'Tips Belajar Anak',
            'category' => 'PARENTING',
            'author' => 'Tim Aruna',
            'description' => 'Panduan belajar yang menyenangkan.',
            'content' => 'Konten lengkap artikel belajar anak.',
        ])->assertSessionHasNoErrors();

        $article = Article::where('title', 'Tips Belajar Anak')->first();
        if ($article) {
            $this->actingAs($admin)->delete("/admin/cms/articles/{$article->id}")->assertSessionHasNoErrors();
        }

        // CMS module creation & deletion
        $category = \App\Models\ModuleCategory::first();
        if ($category) {
            $this->actingAs($admin)->post('/admin/cms/modules', [
                'category_id' => $category->id,
                'title' => 'Modul Baru',
                'description' => 'Deskripsi modul baru',
                'type' => 'digvi',
                'difficulty_level' => 1,
                'is_premium' => false,
                'order' => 99,
            ])->assertSessionHasNoErrors();

            $mod = Module::where('title', 'Modul Baru')->first();
            if ($mod) {
                $this->actingAs($admin)->delete("/admin/cms/modules/{$mod->id}")->assertSessionHasNoErrors();
            }
        }
    }

    public function test_parent_mutations(): void
    {
        $parent = User::where('role', 'parent')->first() ?? User::factory()->create(['role' => 'parent']);

        $this->actingAs($parent)->post('/parent/children', [
            'nickname' => 'Ahmad',
            'gender' => 'male',
            'birth_date' => '2019-08-12',
        ])->assertSessionHasNoErrors();

        $child = Child::where('nickname', 'Ahmad')->first();
        if ($child) {
            $this->actingAs($parent)->get("/parent/select-child/{$child->id}")->assertRedirect('/child');
        }
    }

    public function test_kids_session_cannot_access_adult_routes(): void
    {
        $parent = User::factory()->create(['role' => 'parent']);
        $student = Student::first();

        // Simulate kids login session
        $this->actingAs($parent)
            ->withSession([
                'is_kids_session' => true,
                'student_id' => $student?->id,
            ]);

        $this->get('/profile')->assertRedirect('/child');
        $this->get('/parent')->assertRedirect('/child');
        $this->get('/admin')->assertRedirect('/child');
        $this->get('/teacher')->assertRedirect('/child');
    }
}
