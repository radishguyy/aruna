<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Institution resource.
 * By default only exposes id and name (safe for onboarding, teacher dashboard).
 * Pass withLicense: true when used in a licence-management context.
 */
class InstitutionResource extends JsonResource
{
    protected bool $withLicense;

    public function __construct($resource, bool $withLicense = false)
    {
        parent::__construct($resource);
        $this->withLicense = $withLicense;
    }

    public function toArray(Request $request): array
    {
        $data = [
            'id'   => $this->id,
            'name' => $this->name,
        ];

        if ($this->withLicense) {
            $data['license_code']       = $this->license_code;
            $data['license_expires_at'] = $this->license_expires_at?->toDateString();
        }

        return $data;
    }
}
