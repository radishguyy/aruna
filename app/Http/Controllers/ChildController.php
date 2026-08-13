<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\Module;
use App\Models\ModuleCategory;
use App\Models\Progress;
use App\Models\Badge;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChildController extends Controller
{
    private function getActiveChild()
    {
        $childId = session('active_child_id');
        if (!$childId) {
            $child = Child::where('user_id', auth()->id())->first();
            if ($child) {
                session(['active_child_id' => $child->id]);
                return $child;
            }
            return null;
        }
        return Child::find($childId);
    }

    public function selectChild(string $id)
    {
        $child = Child::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        session(['active_child_id' => $child->id]);
        return redirect()->route('child.dashboard');
    }

    public function dashboard()
    {
        $child = $this->getActiveChild();
        if (!$child) {
            return redirect()->route('parent.children')->with('error', 'Silakan buat profil anak terlebih dahulu.');
        }

        $progress = Progress::where('child_id', $child->id)->get()->keyBy('module_id');
        
        $categories = ModuleCategory::with(['modules' => function ($q) {
            $q->orderBy('order');
        }])->get()->map(function ($cat) use ($progress) {
            $cat->modules->map(function ($mod) use ($progress) {
                $p = $progress->get($mod->id);
                $mod->user_status = $p ? $p->status : 'locked'; // 'started', 'completed', or default to locked/not-started
                $mod->user_score = $p ? $p->score : 0;
                return $mod;
            });
            return $cat;
        });

        return Inertia::render('Child/Dashboard', [
            'child' => $child->load('badges'),
            'categories' => $categories,
        ]);
    }

    public function hallOfFame()
    {
        $child = $this->getActiveChild();
        if (!$child) {
            return redirect()->route('parent.children');
        }

        return Inertia::render('Child/HallOfFame', [
            'child' => $child->load('badges'),
            'badges' => Badge::all(),
        ]);
    }

    public function module(string $id)
    {
        $child = $this->getActiveChild();
        if (!$child) {
            return redirect()->route('parent.children');
        }

        $module = Module::with('category')->findOrFail($id);
        $progress = Progress::where('child_id', $child->id)->where('module_id', $id)->first();

        return Inertia::render('Child/ModuleDetail', [
            'child' => $child,
            'module' => $module,
            'progress' => $progress,
        ]);
    }

    public function updateProgress(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|in:started,completed',
            'score' => 'required|integer',
        ]);

        $child = $this->getActiveChild();
        if (!$child) {
            return response()->json(['error' => 'No active child profile'], 403);
        }

        $progress = Progress::updateOrCreate(
            ['child_id' => $child->id, 'module_id' => $id],
            [
                'status' => $request->status,
                'score' => $request->score,
                'completed_at' => $request->status === 'completed' ? now() : null,
            ]
        );

        // Recalculate child points
        $child->total_points = Progress::where('child_id', $child->id)->sum('score');
        $child->save();

        // Check and award badges dynamically based on requirements
        $this->awardBadges($child);

        return response()->json([
            'success' => true,
            'progress' => $progress,
            'total_points' => $child->total_points,
        ]);
    }

    private function awardBadges(Child $child)
    {
        $completedModules = Progress::where('child_id', $child->id)
            ->where('status', 'completed')
            ->get();
        
        $completedCount = $completedModules->count();

        // Load all badges
        $badges = Badge::all();
        $earnedBadgeIds = $child->badges->pluck('id')->toArray();

        foreach ($badges as $badge) {
            if (in_array($badge->id, $earnedBadgeIds)) {
                continue;
            }

            $shouldAward = false;

            if ($badge->requirement_type === 'module_completion' && $completedCount >= $badge->requirement_value) {
                $shouldAward = true;
            } elseif ($badge->requirement_type === 'all_completion' && $completedCount >= 13) {
                // All 13 modules completed
                $shouldAward = true;
            }

            if ($shouldAward) {
                $child->badges()->attach($badge->id, ['earned_at' => now()]);
            }
        }
    }
}
