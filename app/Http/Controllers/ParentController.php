<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChildResource;
use App\Models\AiConversation;
use App\Models\Child;
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
        // Only expose id + name — never license_code or license_expires_at.
        $institutions = Institution::select(['id', 'name'])->get();

        return Inertia::render('Auth/Onboarding', [
            'institutions' => $institutions,
        ]);
    }

    public function saveOnboarding(Request $request)
    {
        $request->validate([
            'role'                    => 'required|in:parent,teacher',
            'institution_code'        => 'nullable|string',
            'children'                => 'nullable|array',
            'children.*.nickname'     => 'required|string|max:50',
            'children.*.gender'       => 'required|in:male,female',
            'children.*.birth_date'   => 'required|date',
        ]);

        $user = auth()->user();

        // Update user role
        $user->role = $request->role;

        // If code is provided, verify and link institution
        if ($request->filled('institution_code')) {
            $inst = Institution::where('license_code', $request->institution_code)->first();
            if ($inst) {
                $user->institution_id      = $inst->id;
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
                    'id'           => (string) Str::uuid(),
                    'user_id'      => $user->id,
                    'nickname'     => $cData['nickname'],
                    'gender'       => $cData['gender'],
                    'birth_date'   => $cData['birth_date'],
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
        // Load children eagerly with progress for the primary widget.
        $children = Child::where('user_id', auth()->id())
            ->with('progress')
            ->get();

        return Inertia::render('Parent/Dashboard', [
            'children' => ChildResource::collection($children),
            // Conversations are a secondary widget — defer them so the
            // dashboard shell is not blocked by this query.
            'conversations' => Inertia::defer(
                fn() => AiConversation::where('user_id', auth()->id())
                    ->select(['id', 'child_id', 'prompt', 'response', 'sentiment_tag', 'created_at'])
                    ->latest()
                    ->limit(20)
                    ->get()
            ),
        ]);
    }

    public function children(): Response
    {
        $children = Child::where('user_id', auth()->id())->get();

        return Inertia::render('Parent/Children', [
            'children' => ChildResource::collection($children),
        ]);
    }

    public function storeChild(Request $request)
    {
        $request->validate([
            'nickname'   => 'required|string|max:50',
            'gender'     => 'required|in:male,female',
            'birth_date' => 'required|date',
        ]);

        Child::create([
            'id'           => (string) Str::uuid(),
            'user_id'      => auth()->id(),
            'nickname'     => $request->nickname,
            'gender'       => $request->gender,
            'birth_date'   => $request->birth_date,
            'total_points' => 0,
        ]);

        return back()->with('status', 'Profil anak berhasil ditambahkan!');
    }

    public function reports(): Response
    {
        // Eager-load progress + module in one query; resource strips internal FKs.
        $children = Child::where('user_id', auth()->id())
            ->with(['progress.module'])
            ->get();

        return Inertia::render('Parent/Reports', [
            'children' => ChildResource::collection($children),
        ]);
    }

    public function billing(): Response
    {
        $user = auth()->user();
        $subscription = \App\Models\Subscription::with('plan')
            ->where('user_id', $user->id)
            ->whereIn('status', ['active', 'past_due'])
            ->first();
            
        $orders = \App\Models\Order::with(['plan', 'invoice', 'transaction'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('Parent/Billing', [
            'subscription_status' => $user->subscription_status,
            'subscription' => $subscription,
            'orders' => $orders
        ]);
    }

    public function profile(): Response
    {
        return Inertia::render('Parent/Profile');
    }
}
