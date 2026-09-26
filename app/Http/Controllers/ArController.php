<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ArController extends Controller
{
    public function index()
    {
        $objects = $this->getAvailableObjects();
        return Inertia::render('AR/Index', [
            'objects' => $objects
        ]);
    }

    public function prepare($slug)
    {
        $object = $this->getObjectBySlug($slug);
        
        if (!$object) {
            abort(404, 'AR Object not found');
        }

        // Generate a signed URL that expires in 24 hours
        $qrUrl = URL::signedRoute('ar.show', ['slug' => $slug], now()->addHours(24));

        return Inertia::render('AR/Prepare', [
            'object' => $object,
            'qrUrl' => $qrUrl
        ]);
    }

    public function show(Request $request, $slug)
    {
        $object = $this->getObjectBySlug($slug);
        
        if (!$object) {
            return Inertia::render('AR/Error', [
                'message' => 'Objek pembelajaran 3D tidak ditemukan atau belum tersedia.'
            ]);
        }

        return Inertia::render('AR/MobileView', [
            'object' => $object
        ]);
    }

    public function getAvailableObjects()
    {
        $path = public_path('3d');
        if (!File::exists($path)) {
            return [];
        }

        $files = File::files($path);
        $grouped = [];

        foreach ($files as $file) {
            $extension = strtolower($file->getExtension());
            if (in_array($extension, ['usdz', 'glb', 'gltf', 'obj'])) {
                $filename = $file->getFilename();
                $nameWithoutExt = $file->getFilenameWithoutExtension();
                $slug = Str::slug($nameWithoutExt);

                if (!isset($grouped[$slug])) {
                    $metadata = $this->getMetadataFor($slug);
                    $grouped[$slug] = [
                        'id' => $slug,
                        'title' => $metadata['title'] ?? ucwords(str_replace('_', ' ', $nameWithoutExt)),
                        'description' => $metadata['description'] ?? 'Jelajahi objek pembelajaran 3D ini dalam Augmented Reality.',
                        'formats' => [],
                        'file_path' => '/3d/' . $filename,
                        'glb_path' => null,
                        'usdz_path' => null,
                        'format' => $extension,
                        'educational_content' => $metadata['educational_content'] ?? [
                            'facts' => [
                                'Putar model untuk melihat dari segala sudut.',
                                'Cubit (pinch) layar untuk memperbesar atau memperkecil.',
                                'Ketuk tombol AR untuk menempatkan objek di ruanganmu.',
                            ],
                            'labels' => []
                        ]
                    ];
                }

                $grouped[$slug]['formats'][] = $extension;

                if ($extension === 'glb' || $extension === 'gltf') {
                    $grouped[$slug]['glb_path'] = '/3d/' . $filename;
                    $grouped[$slug]['file_path'] = '/3d/' . $filename;
                    $grouped[$slug]['format'] = $extension;
                } elseif ($extension === 'usdz') {
                    $grouped[$slug]['usdz_path'] = '/3d/' . $filename;
                    if (empty($grouped[$slug]['glb_path'])) {
                        $grouped[$slug]['file_path'] = '/3d/' . $filename;
                        $grouped[$slug]['format'] = $extension;
                    }
                }
            }
        }

        return array_values($grouped);
    }

    public function getObjectBySlug($slug)
    {
        $objects = collect($this->getAvailableObjects());
        return $objects->firstWhere('id', $slug);
    }

    private function getMetadataFor($slug)
    {
        $metadataPath = resource_path('data/ar_metadata.json');
        if (File::exists($metadataPath)) {
            $allMetadata = json_decode(File::get($metadataPath), true);
            return $allMetadata[$slug] ?? null;
        }
        return null;
    }
}
