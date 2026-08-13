<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherResource extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'title',
        'description',
        'category',
        'type',
        'file_size',
        'download_count',
        'file_path',
    ];

    protected $casts = [
        'download_count' => 'integer',
    ];
}
