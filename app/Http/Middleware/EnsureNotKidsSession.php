<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureNotKidsSession
{
    /**
     * Handle an incoming request.
     * Ensure that kids sessions cannot access adult-only routes.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (session('is_kids_session')) {
            return redirect()->route('child.dashboard')
                ->with('error', 'Akses dibatasi untuk akun anak-anak.');
        }

        return $next($request);
    }
}
