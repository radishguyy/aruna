<?php

namespace App\Http\Controllers;

use App\Http\Resources\BadgeResource;
use App\Http\Resources\ChildResource;
use App\Http\Resources\ModuleListResource;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\ProgressResource;
use App\Models\Badge;
use App\Models\Child;
use App\Models\Module;
use App\Models\ModuleCategory;
use App\Models\Progress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChildController extends Controller
{
    private function getActiveChild(): ?Child
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
        $child = Child::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();
        session(['active_child_id' => $child->id]);
        return redirect()->route('child.dashboard');
    }

    public function dashboard()
    {
        $child = $this->getActiveChild();
        if (!$child) {
            return redirect()->route('parent.children')
                ->with('error', 'Silakan buat profil anak terlebih dahulu.');
        }

        // Load badges eagerly once so awardBadges() won't trigger a second query.
        $child->load('badges');

        $progress = Progress::where('child_id', $child->id)
            ->get()
            ->keyBy('module_id');

        $categories = ModuleCategory::with(['modules' => function ($q) {
            $q->orderBy('order');
        }])->get()->map(function ($cat) use ($progress) {
            $cat->modules->map(function ($mod) use ($progress) {
                $p                 = $progress->get($mod->id);
                $mod->user_status  = $p ? $p->status : 'locked';
                $mod->user_score   = $p ? $p->score : 0;
                return $mod;
            });
            return $cat;
        });

        // Serialize categories: each category with its ModuleListResource modules.
        $categoriesData = $categories->map(fn($cat) => [
            'id'      => $cat->id,
            'name'    => $cat->name,
            'slug'    => $cat->slug,
            'icon'    => $cat->icon,
            'modules' => ModuleListResource::collection($cat->modules)->resolve(),
        ]);

        return Inertia::render('Child/Dashboard', [
            'child'      => ChildResource::make($child),
            'categories' => $categoriesData,
        ]);
    }

    public function hallOfFame()
    {
        $child = $this->getActiveChild();
        if (!$child) {
            return redirect()->route('parent.children');
        }

        $child->load('badges');

        return Inertia::render('Child/HallOfFame', [
            'child'  => ChildResource::make($child),
            'badges' => BadgeResource::collection(Badge::all()),
        ]);
    }

    public function module(string $id)
    {
        $child = $this->getActiveChild();
        if (!$child) {
            return redirect()->route('parent.children');
        }

        $module   = Module::with('category')->findOrFail($id);
        $progress = Progress::where('child_id', $child->id)
            ->where('module_id', $id)
            ->first();

        return Inertia::render('Child/ModuleDetail', [
            'child'    => ChildResource::make($child),
            // Full resource includes content_data for the play view.
            'module'   => ModuleResource::make($module),
            'progress' => $progress ? ProgressResource::make($progress) : null,
        ]);
    }

    public function updateProgress(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|in:started,completed',
            'score'  => 'required|integer',
        ]);

        $child = $this->getActiveChild();
        if (!$child) {
            return response()->json(['error' => 'No active child profile'], 403);
        }

        $progress = Progress::updateOrCreate(
            ['child_id' => $child->id, 'module_id' => $id],
            [
                'status'       => $request->status,
                'score'        => $request->score,
                'completed_at' => $request->status === 'completed' ? now() : null,
            ]
        );

        // Recalculate child total points.
        $child->total_points = Progress::where('child_id', $child->id)->sum('score');
        $child->save();

        // Eagerly load badges before badge-awarding to prevent N+1 inside awardBadges().
        $child->load('badges');
        $this->awardBadges($child);

        return response()->json([
            'success'      => true,
            'progress'     => ProgressResource::make($progress),
            'total_points' => $child->total_points,
        ]);
    }

    private function awardBadges(Child $child): void
    {
        // badges must already be loaded by the caller.
        $completedCount = Progress::where('child_id', $child->id)
            ->where('status', 'completed')
            ->count();

        $earnedBadgeIds = $child->badges->pluck('id')->toArray();

        foreach (Badge::all() as $badge) {
            if (in_array($badge->id, $earnedBadgeIds)) {
                continue;
            }

            $shouldAward = match ($badge->requirement_type) {
                'module_completion' => $completedCount >= $badge->requirement_value,
                'all_completion'    => $completedCount >= 13,
                default             => false,
            };

            if ($shouldAward) {
                $child->badges()->attach($badge->id, ['earned_at' => now()]);
            }
        }
    }
}
