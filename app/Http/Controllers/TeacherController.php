<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\Progress;
use App\Models\TeacherResource;
use App\Models\Institution;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    private function getStudentsQuery()
    {
        $user = auth()->user();
        if ($user->institution_id) {
            return Child::whereHas('parent', function ($q) use ($user) {
                $q->where('institution_id', $user->institution_id);
            });
        }
        // Fallback to all children if the teacher is not assigned to an institution yet
        return Child::query();
    }

    public function dashboard(): Response
    {
        $user = auth()->user();
        $institution = $user->institution_id ? Institution::find($user->institution_id) : null;
        
        $students = $this->getStudentsQuery()->with('progress')->get();

        // Map recent activities from database progress
        $activities = Progress::with(['child', 'module'])
            ->whereIn('child_id', $students->pluck('id'))
            ->orderBy('updated_at', 'desc')
            ->limit(8)
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'studentName' => $p->child->nickname,
                    'avatar' => strtoupper(substr($p->child->nickname, 0, 2)),
                    'moduleName' => $p->module->title,
                    'status' => $p->status,
                    'timestamp' => $p->updated_at->toIso8601String(),
                    'score' => $p->score,
                ];
            });

        // Mock notifications if database notifications table isn't created
        $notifications = [
            [
                'id' => 'tn-1',
                'title' => 'Evaluasi Bulanan',
                'message' => 'Segera jadwalkan sesi evaluasi bulanan dengan orang tua siswa.',
                'type' => 'warning',
                'read' => false,
                'timestamp' => now()->subHours(2)->toIso8601String(),
            ],
            [
                'id' => 'tn-2',
                'title' => 'Materi Baru Tersedia',
                'message' => 'Modul tambahan "Kewaspadaan Digital" kini dapat diakses di menu Materi Ajar.',
                'type' => 'info',
                'read' => false,
                'timestamp' => now()->subDay()->toIso8601String(),
            ]
        ];

        return Inertia::render('Teacher/Dashboard', [
            'institution' => $institution,
            'studentsCount' => $students->count(),
            'recentActivities' => $activities,
            'notifications' => $notifications,
        ]);
    }

    public function students(): Response
    {
        $students = $this->getStudentsQuery()->with('progress')->get()->map(function ($student) {
            $completed = $student->progress->where('status', 'completed')->count();
            return [
                'id' => $student->id,
                'name' => $student->nickname,
                'age' => $student->birth_date ? $student->birth_date->age : 5,
                'gender' => $student->gender,
                'class' => 'Kelas A',
                'modulesCompleted' => $completed,
                'totalModules' => 13,
                'lastActive' => $student->updated_at->toIso8601String(),
                'status' => $completed >= 13 ? 'completed' : 'active',
                'avatar' => strtoupper(substr($student->nickname, 0, 2)),
            ];
        });

        return Inertia::render('Teacher/Students', [
            'students' => $students
        ]);
    }

    public function resources(): Response
    {
        return Inertia::render('Teacher/Resources', [
            'resources' => TeacherResource::all()
        ]);
    }

    public function license(): Response
    {
        $user = auth()->user();
        $institution = $user->institution_id ? Institution::find($user->institution_id) : null;

        return Inertia::render('Teacher/License', [
            'institution' => $institution
        ]);
    }

    public function profile(): Response
    {
        return Inertia::render('Teacher/Profile');
    }
}
