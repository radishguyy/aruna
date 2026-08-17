<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Minimal user payload shared globally via HandleInertiaRequests.
 * Only expose fields every page actually needs; never expose password,
 * remember_token, email_verified_at, or raw foreign keys.
 */
class AuthUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->id,
            'name'                => $this->name,
            'email'               => $this->email,
            'role'                => $this->role,
            'subscription_status' => $this->subscription_status,
            // email_verified_at is needed by UpdateProfileInformationForm to
            // show the "please verify your email" notice — include it here.
            'email_verified_at'   => $this->email_verified_at,
        ];
    }
}
