<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Http\Request;

class KidsAuthController extends Controller
{
    /**
     * Lookup class code or student username from the database
     */
    public function lookup(Request $request)
    {
        $identifier = trim($request->query('identifier', ''));

        if (empty($identifier)) {
            return response()->json(['type' => 'none', 'data' => null]);
        }

        // 1. Check if identifier is a classroom code
        $classroom = Classroom::where('class_code', $identifier)->with('students')->first();

        if ($classroom) {
            return response()->json([
                'type' => 'classroom',
                'classroom' => [
                    'id' => $classroom->id,
                    'name' => $classroom->name,
                    'class_code' => $classroom->class_code,
                ],
                'students' => $classroom->students->map(function ($student) {
                    return [
                        'id' => $student->id,
                        'name' => $student->name,
                        'username' => $student->username,
                        'avatar' => $student->avatar,
                    ];
                }),
            ]);
        }

        // 2. Check if identifier is a direct student username
        $student = Student::where('username', $identifier)->first();

        if ($student) {
            return response()->json([
                'type' => 'student',
                'student' => [
                    'id' => $student->id,
                    'name' => $student->name,
                    'username' => $student->username,
                    'avatar' => $student->avatar,
                ],
            ]);
        }

        return response()->json([
            'type' => 'not_found',
            'message' => 'Kode Kelas atau Username tidak ditemukan.',
        ], 404);
    }

    /**
     * Authenticate student with PIN
     */
    public function login(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string',
            'pin' => 'required|string',
        ]);

        $student = Student::where('username', $request->identifier)
            ->where('pin', $request->pin)
            ->first();

        if (!$student) {
            return back()->withErrors([
                'pin' => 'PIN atau Username salah! Periksa kembali.',
            ]);
        }

        // Determine owner user for student session
        $ownerId = $student->parent_id
            ?? ($student->classroom ? $student->classroom->teacher_id : null)
            ?? \App\Models\User::whereIn('role', ['parent', 'teacher'])->value('id');

        $child = \App\Models\Child::firstOrCreate(
            ['nickname' => $student->name, 'user_id' => $ownerId],
            [
                'id' => (string) \Illuminate\Support\Str::uuid(),
                'gender' => 'male',
                'birth_date' => '2019-01-01',
                'total_points' => $student->points ?? 0,
            ]
        );

        if ($ownerId) {
            \Illuminate\Support\Facades\Auth::loginUsingId($ownerId);
        }

        // Log the student into session
        session([
            'student_id' => $student->id,
            'student_name' => $student->name,
            'student_username' => $student->username,
            'active_child_id' => $child->id,
        ]);

        return redirect()->route('child.dashboard');
    }
}
