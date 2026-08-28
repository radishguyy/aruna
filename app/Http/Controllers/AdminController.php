<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleListResource;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ModuleListResource;
use App\Http\Resources\UserResource;
use App\Models\Article;
use App\Models\Child;
use App\Models\Institution;
use App\Models\Module;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Admin Dashboard Overview
     * Analytics counts are deferred so the shell loads instantly.
     */
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            // Defer all count queries — they run only after the page shell
            // renders, preventing a slow initial load from N independent queries.
            'usersCount' => Inertia::defer(fn() => User::count()),
            'institutionsCount' => Inertia::defer(fn() => Institution::count()),
            'childrenCount' => Inertia::defer(fn() => Child::count()),
            'activeSubscriptionsCount' => Inertia::defer(
                fn() => User::whereIn('subscription_status', ['premium', 'licensed'])->count()
            ),
            'modulesCount' => Inertia::defer(fn() => Module::count()),
            'articlesCount' => Inertia::defer(fn() => Article::count()),
            // Recent users — select only required columns, wrapped in resource.
            'recentUsers' => Inertia::defer(
                fn() => UserResource::collection(
                    User::select(['id', 'name', 'email', 'role', 'subscription_status', 'created_at'])
                        ->latest()
                        ->limit(5)
                        ->get()
                )
            ),
            'arpu' => Inertia::defer(function () {
                $totalRevenue = \App\Models\Order::where('status', 'paid')->sum('total_amount');
                $totalUsers = User::count();
                return $totalUsers > 0 ? $totalRevenue / $totalUsers : 0;
            }),
        ]);
    }

    /**
     * Manage Users
     */
    public function users(Request $request): Response
    {
        $search = $request->query('search');
        $role = $request->query('role');

        $query = User::with('institution')
            ->withCount('children')
            ->select(['id', 'name', 'email', 'role', 'subscription_status', 'institution_id', 'created_at'])
            ->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($role) {
            $query->where('role', $role);
        }

        return Inertia::render('Admin/Users', [
            'users' => UserResource::collection($query->paginate(50)),
            'filters' => [
                'search' => $search ?? '',
                'role' => $role ?? '',
            ],
        ]);
    }

    /**
     * Store New User
     */
    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,parent,teacher',
            'subscription_status' => 'required|in:free,standard,premium,licensed',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'subscription_status' => $request->subscription_status,
        ]);

        return back()->with('status', 'Pengguna berhasil ditambahkan!');
    }

    /**
     * Update User Role or Subscription
     */
    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'role' => 'sometimes|in:admin,parent,teacher',
            'subscription_status' => 'sometimes|in:free,standard,premium,licensed',
        ]);

        if ($request->has('role')) {
            $user->role = $request->role;
        }

        if ($request->has('subscription_status')) {
            $user->subscription_status = $request->subscription_status;
        }

        $user->save();

        return back()->with('status', 'Data pengguna berhasil diperbarui!');
    }

    /**
     * Delete User
     */
    public function deleteUser(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors(['message' => 'Anda tidak dapat menghapus akun Anda sendiri!']);
        }

        $user->delete();

        return back()->with('status', 'Pengguna berhasil dihapus.');
    }

    /**
     * Manage CMS Content (Articles & Modules)
     * Module list excludes content_data to keep the payload small;
     * Article list excludes content body.
     */
    public function cms(): Response
    {
        return Inertia::render('Admin/Cms', [
            'modules' => ModuleListResource::collection(
                Module::select(['id', 'category_id', 'title', 'slug', 'type', 'difficulty_level', 'is_premium', 'order'])
                    ->orderBy('order')
                    ->get()
            ),
            'articles' => ArticleListResource::collection(
                Article::select(['id', 'slug', 'title', 'description', 'category', 'category_color', 'date', 'author', 'image_url'])
                    ->latest()
                    ->get()
            ),
        ]);
    }

    /**
     * Store New Article
     */
    public function storeArticle(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'category_color' => 'nullable|string',
            'author' => 'required|string|max:100',
            'description' => 'required|string',
            'content' => 'required|string',
            'image_url' => 'nullable|string',
        ]);

        $categoryColors = [
            'PANDUAN ORANG TUA' => 'orange',
            'PARENTING' => 'orange',
            'EDUKASI DIGITAL' => 'indigo',
            'TIPS & TRIK' => 'emerald',
            'KESEHATAN ANAK' => 'pink',
            'LITERASI' => 'blue',
        ];

        $categoryColor = $request->input(
            'category_color',
            $categoryColors[strtoupper(trim($request->category))] ?? 'orange'
        );

        Article::create([
            'id' => 'a-' . Str::random(8),
            'slug' => Str::slug($request->title) . '-' . Str::random(4),
            'title' => trim($request->title),
            'category' => trim($request->category),
            'category_color' => $categoryColor,
            'author' => trim($request->author),
            'description' => trim($request->description),
            'content' => trim($request->input('content')),
            'date' => now()->format('j F Y'),
            'image_url' => $request->filled('image_url')
                ? $request->image_url
                : 'https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&q=80',
        ]);

        \Illuminate\Support\Facades\Cache::forget('landing.home_articles');

        return back()->with('status', 'Artikel berhasil diterbitkan!');
    }

    /**
     * Delete Article
     */
    public function deleteArticle($id)
    {
        Article::where('id', $id)->delete();
        \Illuminate\Support\Facades\Cache::forget('landing.home_articles');
        return back()->with('status', 'Artikel berhasil dihapus.');
    }

    /**
     * Store New Module
     */
    public function storeModule(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:digfo,digvi,e-modul',
            'difficulty_level' => 'required|integer|min:1|max:3',
            'is_premium' => 'required|boolean',
            'description' => 'required|string',
        ]);

        Module::create([
            'id' => 'm-' . Str::random(8),
            'category_id' => 1,
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . Str::random(4),
            'type' => $request->type,
            'difficulty_level' => $request->difficulty_level,
            'is_premium' => $request->is_premium,
            'content_data' => [
                'description' => $request->description,
            ],
            'order' => Module::count() + 1,
        ]);

        return back()->with('status', 'Modul berhasil ditambahkan!');
    }

    /**
     * Delete Module
     */
    public function deleteModule($id)
    {
        Module::where('id', $id)->delete();
        return back()->with('status', 'Modul berhasil dihapus.');
    }

    /**
     * Settings Page
     */
    public function settings(): Response
    {
        return Inertia::render('Admin/Settings', [
            'settings' => [
                'app_name' => config('app.name', 'Aruna Ecosystem'),
                'ai_enabled' => true,
                'maintenance_mode' => false,
                'institution_count' => Inertia::defer(fn() => Institution::count()),
            ],
        ]);
    }

    /**
     * Update Settings
     */
    public function updateSettings(Request $request)
    {
        return back()->with('status', 'Konfigurasi platform berhasil diperbarui!');
    }

    /**
     * Admin Profile Page
     */
    public function profile(): Response
    {
        return Inertia::render('Admin/Profile');
    }

    /**
     * Update Admin Profile
     */
    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return back()->with('status', 'Profil berhasil diperbarui!');
    }
}
