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
        $grouped = [];
        $files = File::exists($path) ? File::files($path) : [];

        // 1. Scan physical directory if files exist
        foreach ($files as $file) {
            $extension = strtolower($file->getExtension());
            if (in_array($extension, ['usdz', 'glb', 'gltf', 'obj'])) {
                $filename = $file->getFilename();
                $nameWithoutExt = $file->getFilenameWithoutExtension();
                $slug = Str::slug($nameWithoutExt);

                if (!isset($grouped[$slug])) {
                    $metadata = $this->getMetadataFor($slug);
                    $relativeUrl = '/3d/' . $filename;
                    $fullUrl = asset('3d/' . $filename);

                    $grouped[$slug] = [
                        'id' => $slug,
                        'title' => $metadata['title'] ?? ucwords(str_replace('_', ' ', $nameWithoutExt)),
                        'description' => $metadata['description'] ?? 'Jelajahi objek pembelajaran 3D ini dalam Augmented Reality.',
                        'formats' => [],
                        'file_path' => $relativeUrl,
                        'full_url' => $fullUrl,
                        'glb_path' => null,
                        'glb_full_url' => null,
                        'usdz_path' => null,
                        'usdz_full_url' => null,
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
                    $grouped[$slug]['glb_full_url'] = asset('3d/' . $filename);
                    $grouped[$slug]['file_path'] = '/3d/' . $filename;
                    $grouped[$slug]['full_url'] = asset('3d/' . $filename);
                    $grouped[$slug]['format'] = $extension;
                } elseif ($extension === 'usdz') {
                    $grouped[$slug]['usdz_path'] = '/3d/' . $filename;
                    $grouped[$slug]['usdz_full_url'] = asset('3d/' . $filename);
                    if (empty($grouped[$slug]['glb_path'])) {
                        $grouped[$slug]['file_path'] = '/3d/' . $filename;
                        $grouped[$slug]['full_url'] = asset('3d/' . $filename);
                        $grouped[$slug]['format'] = $extension;
                    }
                }
            }
        }

        // 2. Ensure all items in ar_metadata.json are present even if file scanning failed
        $allMetadata = $this->getAllMetadata();
        $fallbackMap = [
            'dirty-stones-pile' => ['glb' => 'Dirty_stones_pile.glb', 'usdz' => 'Dirty_stones_pile.usdz'],
            'karakter-laki-pose-1' => ['glb' => 'karakter_laki_pose_1.glb'],
            'karakter-laki-pose-2' => ['glb' => 'karakter_laki_pose_2.glb'],
            'karakter-cewe-pose-1' => ['glb' => 'karakter_cewe_pose_1.glb'],
            'karakter-cewe-pose-2' => ['glb' => 'karakter_cewe_pose_2.glb'],
        ];

        foreach ($allMetadata as $slug => $meta) {
            if (!isset($grouped[$slug])) {
                $filesForSlug = $fallbackMap[$slug] ?? ['glb' => str_replace('-', '_', $slug) . '.glb'];
                $glbFile = $filesForSlug['glb'] ?? null;
                $usdzFile = $filesForSlug['usdz'] ?? null;
                $defaultFile = $glbFile ?: $usdzFile;

                $grouped[$slug] = [
                    'id' => $slug,
                    'title' => $meta['title'] ?? ucwords(str_replace('-', ' ', $slug)),
                    'description' => $meta['description'] ?? 'Jelajahi objek pembelajaran 3D ini dalam Augmented Reality.',
                    'formats' => array_keys($filesForSlug),
                    'file_path' => $defaultFile ? '/3d/' . $defaultFile : null,
                    'full_url' => $defaultFile ? asset('3d/' . $defaultFile) : null,
                    'glb_path' => $glbFile ? '/3d/' . $glbFile : null,
                    'glb_full_url' => $glbFile ? asset('3d/' . $glbFile) : null,
                    'usdz_path' => $usdzFile ? '/3d/' . $usdzFile : null,
                    'usdz_full_url' => $usdzFile ? asset('3d/' . $usdzFile) : null,
                    'format' => $glbFile ? 'glb' : ($usdzFile ? 'usdz' : 'glb'),
                    'educational_content' => $meta['educational_content'] ?? [
                        'facts' => [
                            'Putar model untuk melihat dari segala sudut.',
                            'Cubit (pinch) layar untuk memperbesar atau memperkecil.',
                            'Ketuk tombol AR untuk menempatkan objek di ruanganmu.',
                        ],
                        'labels' => []
                    ]
                ];
            }
        }

        return array_values($grouped);
    }

    public function getObjectBySlug($slug)
    {
        $objects = collect($this->getAvailableObjects());
        return $objects->firstWhere('id', $slug);
    }

    private function getAllMetadata(): array
    {
        $metadataPath = resource_path('data/ar_metadata.json');
        if (File::exists($metadataPath)) {
            return json_decode(File::get($metadataPath), true) ?: [];
        }
        return [];
    }

    private function getMetadataFor($slug)
    {
        $allMetadata = $this->getAllMetadata();
        return $allMetadata[$slug] ?? null;
    }
}
