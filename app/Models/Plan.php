<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $guarded = [];

    protected $casts = [
        'price' => 'decimal:2',
        'features' => 'array',
        'is_active' => 'boolean',
        'max_children' => 'integer',
    ];

    public function getMaxChildrenAttribute($value): int
    {
        if ($value !== null && $value > 0) {
            return (int) $value;
        }
        if (str_contains($this->id, 'institution')) {
            return 50;
        }
        if (str_contains($this->id, 'premium')) {
            return 5;
        }
        return 2;
    }

    public function getModulesIncludedAttribute($value): string
    {
        if (!empty($value)) {
            return $value;
        }
        if (str_contains($this->id, 'institution')) {
            return 'Semua Modul + Materi Institusi';
        }
        if (str_contains($this->id, 'premium')) {
            return 'Semua Modul Edukasi & Interaktif';
        }
        return 'Modul Edukasi Lengkap (13 Modul)';
    }
}