<?php

namespace App\Http\Controllers;

use App\Http\Resources\InstitutionResource;
use App\Http\Resources\TeacherResourceResource;
use App\Models\Child;
use App\Models\Institution;
use App\Models\Progress;
use App\Models\TeacherResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    /**
     * Scope children to the teacher's institution, or fallback to all.
     */
    private function getStudentsQuery()
    {
        $user = auth()->user();
        if ($user->institution_id) {
            return Child::whereHas('parent', function ($q) use ($user) {
                $q->where('institution_id', $user->institution_id);
            });
        }
        return Child::query();
    }

    public function dashboard(): Response
    {
        $user        = auth()->user();
        $institution = $user->institution_id
            ? Institution::select(['id', 'name'])->find($user->institution_id)
            : null;

        // Load students with progress in a single query; count in PHP.
        $students = $this->getStudentsQuery()->with('progress')->get();

        return Inertia::render('Teacher/Dashboard', [
            'institution'    => $institution
                ? InstitutionResource::make($institution)
                : null,
            'studentsCount'  => $students->count(),
            // Defer recent activity — secondary dashboard widget.
            'recentActivities' => Inertia::defer(function () use ($students) {
                return Progress::with(['child:id,nickname', 'module:id,title'])
                    ->whereIn('child_id', $students->pluck('id'))
                    ->latest('updated_at')
                    ->limit(8)
                    ->get()
                    ->map(fn($p) => [
                        'id'          => $p->id,
                        'studentName' => $p->child->nickname,
                        'avatar'      => strtoupper(substr($p->child->nickname, 0, 2)),
                        'moduleName'  => $p->module->title,
                        'status'      => $p->status,
                        'timestamp'   => $p->updated_at->toIso8601String(),
                        'score'       => $p->score,
                    ]);
            }),
            // Static mock notifications — no DB hit required.
            'notifications' => [
                [
                    'id'        => 'tn-1',
                    'title'     => 'Evaluasi Bulanan',
                    'message'   => 'Segera jadwalkan sesi evaluasi bulanan dengan orang tua siswa.',
                    'type'      => 'warning',
                    'read'      => false,
                    'timestamp' => now()->subHours(2)->toIso8601String(),
                ],
                [
                    'id'        => 'tn-2',
                    'title'     => 'Materi Baru Tersedia',
                    'message'   => 'Modul tambahan "Kewaspadaan Digital" kini dapat diakses di menu Materi Ajar.',
                    'type'      => 'info',
                    'read'      => false,
                    'timestamp' => now()->subDay()->toIso8601String(),
                ],
            ],
        ]);
    }

    public function students(): Response
    {
        $students = $this->getStudentsQuery()
            ->with('progress')
            ->paginate(50);
            
        $students->getCollection()->transform(function ($student) {
                $completed = $student->progress->where('status', 'completed')->count();
                return [
                    'id'               => $student->id,
                    'name'             => $student->nickname,
                    'age'              => $student->birth_date ? $student->birth_date->age : 5,
                    'gender'           => $student->gender,
                    'class'            => 'Kelas A',
                    'modulesCompleted' => $completed,
                    'totalModules'     => 13,
                    'lastActive'       => $student->updated_at->toIso8601String(),
                    'status'           => $completed >= 13 ? 'completed' : 'active',
                    'avatar'           => strtoupper(substr($student->nickname, 0, 2)),
                ];
            });

        return Inertia::render('Teacher/Students', [
            'students' => $students,
        ]);
    }

    public function resources(): Response
    {
        return Inertia::render('Teacher/Resources', [
            // Wrap in resource to strip internal file_path.
            'resources' => TeacherResourceResource::collection(TeacherResource::select('id', 'title', 'type', 'url')->paginate(20)),
        ]);
    }

    public function license(): Response
    {
        $user        = auth()->user();
        $institution = $user->institution_id
            ? Institution::select(['id', 'name', 'license_code', 'license_expires_at'])
                ->find($user->institution_id)
            : null;

        return Inertia::render('Teacher/License', [
            // Teachers on the License page legitimately need license_code.
            'institution' => $institution
                ? new InstitutionResource($institution, withLicense: true)
                : null,
        ]);
    }

    public function profile(): Response
    {
        return Inertia::render('Teacher/Profile');
    }
}
