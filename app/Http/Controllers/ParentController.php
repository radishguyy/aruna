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
            'children.*.nickname'     => 'required_if:role,parent|string|max:50',
            'children.*.gender'       => 'required_if:role,parent|in:male,female',
            'children.*.birth_date'   => 'required_if:role,parent|date',
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

        // If role is parent, create children profiles (enforcing maxAllowedChildren limit)
        if ($request->role === 'parent' && $request->has('children')) {
            $allowedCount = $user->maxAllowedChildren();
            $childrenToAdd = array_slice($request->children, 0, $allowedCount);
            foreach ($childrenToAdd as $cData) {
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
        $user = auth()->user();

        // Load children eagerly with progress for the primary widget.
        $children = Child::where('user_id', $user->id)
            ->with('progress')
            ->get();

        $subscription = \App\Models\Subscription::with('plan')
            ->where('user_id', $user->id)
            ->where(function ($query) {
                $query->where('status', 'active')
                    ->where(function ($q) {
                        $q->whereNull('current_period_end')
                            ->orWhere('current_period_end', '>=', now());
                    });
            })
            ->latest('current_period_end')
            ->first();

        // Fallback to latest subscription if none active
        if (!$subscription) {
            $subscription = \App\Models\Subscription::with('plan')
                ->where('user_id', $user->id)
                ->latest('created_at')
                ->first();
        }
            
        $orders = \App\Models\Order::with(['plan', 'invoice', 'transaction'])
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Parent/Dashboard', [
            'children' => ChildResource::collection($children),
            'subscription' => $subscription,
            'subscription_status' => $user->effective_subscription_status,
            'has_active_subscription' => $user->hasActiveSubscription(),
            'max_allowed_children' => $user->maxAllowedChildren(),
            'children_count' => $children->count(),
            'recent_orders' => $orders,
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
        $user = auth()->user();
        $children = Child::where('user_id', $user->id)->get();

        return Inertia::render('Parent/Children', [
            'children' => ChildResource::collection($children),
            'has_active_subscription' => $user->hasActiveSubscription(),
            'max_allowed_children' => $user->maxAllowedChildren(),
            'children_count' => $children->count(),
        ]);
    }

    public function storeChild(Request $request)
    {
        $user = auth()->user();
        $currentChildrenCount = Child::where('user_id', $user->id)->count();
        $maxAllowed = $user->maxAllowedChildren();

        // Enforce backend child profile limit
        if ($currentChildrenCount >= $maxAllowed) {
            $errorMessage = $user->hasActiveSubscription()
                ? "Paket Anda saat ini mengizinkan maksimal {$maxAllowed} anak. Upgrade paket untuk menambah profil anak."
                : "Paket gratis Anda saat ini mengizinkan 1 anak. Berlangganan untuk membuka penambahan profil anak.";

            if ($request->wantsJson()) {
                return response()->json([
                    'error' => $errorMessage,
                    'limit_reached' => true,
                    'max_allowed' => $maxAllowed,
                    'current_count' => $currentChildrenCount,
                ], 422);
            }

            return back()->withErrors([
                'subscription_limit' => $errorMessage,
            ])->with('limit_reached', true);
        }

        $request->validate([
            'nickname'   => 'required|string|max:50',
            'gender'     => 'required|in:male,female',
            'birth_date' => 'required|date',
        ]);

        Child::create([
            'id'           => (string) Str::uuid(),
            'user_id'      => $user->id,
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
            ->where(function ($query) {
                $query->where('status', 'active')
                    ->where(function ($q) {
                        $q->whereNull('current_period_end')
                            ->orWhere('current_period_end', '>=', now());
                    });
            })
            ->latest('current_period_end')
            ->first();

        if (!$subscription) {
            $subscription = \App\Models\Subscription::with('plan')
                ->where('user_id', $user->id)
                ->latest('created_at')
                ->first();
        }
            
        $orders = \App\Models\Order::with(['plan', 'invoice', 'transaction'])
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(20);

        return Inertia::render('Parent/Billing', [
            'subscription_status'     => $user->effective_subscription_status,
            'has_active_subscription' => $user->hasActiveSubscription(),
            'max_allowed_children'    => $user->maxAllowedChildren(),
            'children_count'          => Child::where('user_id', $user->id)->count(),
            'subscription'            => $subscription,
            'orders'                  => $orders,
        ]);
    }

    public function profile(): Response
    {
        return Inertia::render('Parent/Profile');
    }
}
