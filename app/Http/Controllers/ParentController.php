<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\AiConversation;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ParentController extends Controller
{
    public function onboarding(): Response
    {
        return Inertia::render('Auth/Onboarding', [
            'institutions' => Institution::all()
        ]);
    }

    public function saveOnboarding(Request $request)
    {
        $request->validate([
            'role' => 'required|in:parent,teacher',
            'institution_code' => 'nullable|string',
            'children' => 'nullable|array',
            'children.*.nickname' => 'required|string|max:50',
            'children.*.gender' => 'required|in:male,female',
            'children.*.birth_date' => 'required|date',
        ]);

        $user = auth()->user();
        
        // Update user role
        $user->role = $request->role;

        // If code is provided, verify and link institution
        if ($request->filled('institution_code')) {
            $inst = Institution::where('license_code', $request->institution_code)->first();
            if ($inst) {
                $user->institution_id = $inst->id;
                $user->subscription_status = 'licensed';
            } else {
                return back()->withErrors(['institution_code' => 'Kode lisensi institusi tidak valid.']);
            }
        }
        
        $user->save();

        // If role is parent, create children profiles
        if ($request->role === 'parent' && $request->has('children')) {
            foreach ($request->children as $cData) {
                Child::create([
                    'id' => (string) Str::uuid(),
                    'user_id' => $user->id,
                    'nickname' => $cData['nickname'],
                    'gender' => $cData['gender'],
                    'birth_date' => $cData['birth_date'],
                    'total_points' => 0,
                ]);
            }
        }

        // Redirect based on role
        if ($user->role === 'teacher') {
            return redirect()->route('teacher.dashboard');
        }

        return redirect()->route('parent.dashboard');
    }

    public function dashboard(): Response
    {
        $children = Child::where('user_id', auth()->id())->with('progress')->get();
        $conversations = AiConversation::where('user_id', auth()->id())->orderBy('created_at', 'desc')->get();

        return Inertia::render('Parent/Dashboard', [
            'children' => $children,
            'conversations' => $conversations,
        ]);
    }

    public function children(): Response
    {
        return Inertia::render('Parent/Children', [
            'children' => Child::where('user_id', auth()->id())->get()
        ]);
    }

    public function storeChild(Request $request)
    {
        $request->validate([
            'nickname' => 'required|string|max:50',
            'gender' => 'required|in:male,female',
            'birth_date' => 'required|date',
        ]);

        Child::create([
            'id' => (string) Str::uuid(),
            'user_id' => auth()->id(),
            'nickname' => $request->nickname,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
            'total_points' => 0,
        ]);

        return back()->with('status', 'Profil anak berhasil ditambahkan!');
    }

    public function reports(): Response
    {
        $children = Child::where('user_id', auth()->id())->with(['progress.module'])->get();

        return Inertia::render('Parent/Reports', [
            'children' => $children
        ]);
    }

    public function billing(): Response
    {
        return Inertia::render('Parent/Billing', [
            'subscription_status' => auth()->user()->subscription_status,
        ]);
    }

    public function profile(): Response
    {
        return Inertia::render('Parent/Profile');
    }
}
