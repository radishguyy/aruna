<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Module;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'total_parents' => User::where('role', 'parent')->count(),
                'total_teachers' => User::where('role', 'teacher')->count(),
                'total_modules' => Module::count(),
            ]
        ]);
    }

    public function users(): Response
    {
        $users = User::with(['institution', 'children'])->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'subscription_status' => $user->subscription_status,
                'institution' => $user->institution ? $user->institution->name : null,
                'children_count' => $user->children->count(),
            ];
        });

        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    public function cms(): Response
    {
        return Inertia::render('Admin/Cms', [
            'modules' => Module::all(),
            'articles' => Article::all(),
        ]);
    }

    public function settings(): Response
    {
        return Inertia::render('Admin/Settings');
    }

    public function profile(): Response
    {
        return Inertia::render('Admin/Profile');
    }
}
