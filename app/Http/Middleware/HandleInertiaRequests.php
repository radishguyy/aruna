<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthUserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                // Use AuthUserResource instead of the raw model to guarantee
                // password, remember_token, institution_id, and timestamps
                // are never leaked into the global page props.
                'user' => $request->user()
                    ? AuthUserResource::make($request->user())
                    : null,
            ],
            // Forward flash messages so all controllers can use
            // back()->with('status', ...) or withErrors(...).
            'flash' => [
                'status' => fn() => $request->session()->get('status'),
            ],
        ];
    }
}
