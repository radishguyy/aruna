import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, QrCode, UserPlus, Link as LinkIcon, BookOpen, ChevronRight, User as UserIcon } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'teacher' | 'parent' | 'admin';
}

interface Props {
    auth: {
        user: User;
    };
    // These props would normally be passed from the backend controller
    classrooms?: any[]; 
    childrenProfile?: any[]; 
}

export default function AdultDashboard({ auth, classrooms = [], childrenProfile = [] }: Props) {
    const isTeacher = auth.user.role === 'teacher';
    const isParent = auth.user.role === 'parent';

    // Dummy data for visual representation if props are empty
    const dummyClassrooms = classrooms.length > 0 ? classrooms : [
        { id: 1, name: 'Class 4B', class_code: 'MATH-4B-2026', students_count: 24 }
    ];

    const dummyChildren = childrenProfile.length > 0 ? childrenProfile : [
        { id: 1, name: 'Fachri', avatar: 'avatar-1.png', points: 350, linked_class: 'MATH-4B-2026' }
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard {isTeacher ? 'Guru' : 'Orang Tua'}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-3xl dark:bg-gray-800 relative border border-gray-100">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                        <div className="p-8 text-gray-900 dark:text-gray-100 relative z-10">
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Selamat Datang, {auth.user.name}!</h1>
                            <p className="text-gray-500">
                                {isTeacher 
                                    ? "Kelola kelas dan pantau perkembangan siswa Anda dengan mudah." 
                                    : "Pantau perkembangan dan atur profil belajar anak-anak Anda."}
                            </p>
                        </div>
                    </div>

                    {/* Teacher View */}
                    {isTeacher && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        <BookOpen className="w-6 h-6 text-indigo-500" /> Kelas Saya
                                    </h3>
                                    <PrimaryButton className="rounded-xl shadow-md">
                                        + Buat Kelas Baru
                                    </PrimaryButton>
                                </div>
                                
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-800">{dummyClassrooms[0].name}</h4>
                                            <p className="text-sm text-gray-500">Kode Kelas: <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{dummyClassrooms[0].class_code}</span></p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-gray-800">{dummyClassrooms[0].students_count}</span>
                                            <span className="text-sm text-gray-500 ml-1">Siswa</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h5 className="font-bold text-gray-700">Daftar Siswa (Roster)</h5>
                                            <button className="text-sm text-indigo-600 font-bold hover:text-indigo-800 transition-colors">Lihat Semua</button>
                                        </div>
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                                                            S{i}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm text-gray-800">Siswa {i}</div>
                                                            <div className="text-xs text-gray-500">Bermain hari ini</div>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <Users className="w-6 h-6 text-indigo-500" /> Akses Siswa
                                </h3>
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden">
                                    <div className="absolute -bottom-4 -right-4 text-white/10">
                                        <QrCode className="w-32 h-32" />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="font-bold text-xl mb-2">QR Code Kelas</h4>
                                        <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                                            Cetak QR Code ini dan tempel di kelas. Siswa dapat menggunakan tablet untuk memindai dan masuk ke akun mereka dengan mudah.
                                        </p>
                                        <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors shadow-sm">
                                            <QrCode className="w-5 h-5" /> Generate Student QR Codes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Parent View */}
                    {isParent && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        <UserIcon className="w-6 h-6 text-indigo-500" /> Anak Saya
                                    </h3>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {dummyChildren.map((child) => (
                                        <div key={child.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
                                            <div className="w-20 h-20 bg-indigo-50 rounded-full border-4 border-white shadow-sm flex items-center justify-center mb-4">
                                                <span className="text-2xl font-bold text-indigo-400">{child.name.charAt(0)}</span>
                                            </div>
                                            <h4 className="text-xl font-bold text-gray-800 mb-1">{child.name}</h4>
                                            
                                            {child.linked_class ? (
                                                <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-4 flex items-center gap-1 border border-emerald-100">
                                                    <LinkIcon className="w-3 h-3" /> Terhubung: {child.linked_class}
                                                </div>
                                            ) : (
                                                <div className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-amber-100">
                                                    Belum Terhubung Kelas
                                                </div>
                                            )}
                                            
                                            <div className="w-full flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                                                <div className="text-left">
                                                    <div className="text-xs text-gray-400">Total Poin</div>
                                                    <div className="font-black text-indigo-600 text-lg">{child.points}</div>
                                                </div>
                                                <button className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add Child Button */}
                                    <button className="bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:bg-gray-100 hover:border-gray-300 transition-colors min-h-[220px]">
                                        <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 text-indigo-500">
                                            <UserPlus className="w-6 h-6" />
                                        </div>
                                        <span className="font-bold text-gray-700">Add Child Profile</span>
                                        <span className="text-xs text-gray-400 mt-1">Buat profil baru untuk anak Anda</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <LinkIcon className="w-6 h-6 text-indigo-500" /> Integrasi Sekolah
                                </h3>
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-800 mb-2">Hubungkan ke Kelas</h4>
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                        Jika anak Anda menggunakan Aruna di sekolah, hubungkan profil mereka dengan kode kelas dari guru untuk memantau perkembangan belajar.
                                    </p>
                                    <SecondaryButton className="w-full justify-center py-3 rounded-xl border-2">
                                        <LinkIcon className="w-4 h-4 mr-2" /> Link to Teacher's Class Code
                                    </SecondaryButton>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
