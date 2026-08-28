import React, { useState, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Sparkles, ShieldCheck, User, Users, Gamepad2, ArrowRight, ArrowLeft, Lock, AlertCircle, Loader2, KeyRound } from 'lucide-react';
import axios from 'axios';

interface SelectedPlan {
    id: string;
    name: string;
    price: number;
    billing_cycle: 'monthly' | 'annual';
    features?: string[];
}

interface Student {
    id: string | number;
    name: string;
    username: string;
    avatar: string;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    selectedPlan?: SelectedPlan | null;
    plan_id?: string | null;
    initialTab?: 'parent' | 'kids';
}

export default function Login({
    status,
    canResetPassword,
    selectedPlan,
    plan_id,
    initialTab = 'parent',
}: LoginProps) {
    const [activeTab, setActiveTab] = useState<'parent' | 'kids'>(initialTab);

    // Parent Login Form State
    const { data: parentData, setData: setParentData, post: postParent, processing: parentProcessing, errors: parentErrors, reset: resetParent } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
        plan_id: plan_id || selectedPlan?.id || '',
    });

    const submitParent: FormEventHandler = (e) => {
        e.preventDefault();
        postParent(route('login'), {
            onFinish: () => resetParent('password'),
        });
    };

    // Kids Login State
    const [kidsStep, setKidsStep] = useState<1 | 2 | 3>(1);
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [pin, setPin] = useState('');
    const [lookupError, setLookupError] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const { data: kidsData, setData: setKidsData, post: postKids, processing: kidsProcessing, errors: kidsErrors, clearErrors: clearKidsErrors } = useForm({
        identifier: '',
        pin: '',
    });

    const handleIdentifierSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loginIdentifier.trim()) return;

        setLookupError(null);
        setIsSearching(true);

        try {
            const response = await axios.get('/api/kids/lookup', {
                params: { identifier: loginIdentifier.trim() }
            });

            const result = response.data;

            if (result.type === 'classroom') {
                setStudents(result.students);
                setKidsStep(2);
            } else if (result.type === 'student') {
                setSelectedStudent(result.student);
                setKidsData('identifier', result.student.username);
                setKidsStep(3);
            }
        } catch (err: any) {
            setLookupError(err.response?.data?.message || 'Kode Kelas atau Username tidak ditemukan.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleStudentSelect = (student: Student) => {
        setSelectedStudent(student);
        setKidsData('identifier', student.username);
        clearKidsErrors();
        setKidsStep(3);
    };

    const handlePinEntry = (digit: string) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);
            setKidsData('pin', newPin);
            
            if (newPin.length === 4) {
                // Submit to backend
                postKids('/kids/login', {
                    onError: () => {
                        setPin('');
                    }
                });
            }
        }
    };

    const handleBackspace = () => {
        const newPin = pin.slice(0, -1);
        setPin(newPin);
        setKidsData('pin', newPin);
    };

    return (
        <GuestLayout>
            <Head title={activeTab === 'kids' ? 'Masuk Area Anak' : 'Log in'} />

            {/* Segmented Switch Tab Header */}
            <div className="mb-6 bg-slate-100 p-1.5 rounded-2xl flex items-center justify-between border border-slate-200/80 shadow-inner">
                <button
                    type="button"
                    onClick={() => setActiveTab('parent')}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                        activeTab === 'parent'
                            ? 'bg-white text-slate-800 shadow-md border border-slate-200/50 scale-[1.02]'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <Users size={16} className={activeTab === 'parent' ? 'text-orange-500' : 'text-slate-400'} />
                    <span>Orang Tua & Guru</span>
                </button>
                
                <button
                    type="button"
                    onClick={() => setActiveTab('kids')}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                        activeTab === 'kids'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-[1.02]'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <Gamepad2 size={16} className={activeTab === 'kids' ? 'text-yellow-300' : 'text-slate-400'} />
                    <span>Area Anak</span>
                </button>
            </div>

            {/* TAB 1: PARENT / TEACHER LOGIN */}
            {activeTab === 'parent' && (
                <div>
                    <div className="text-center mb-6">
                        {selectedPlan && (
                            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                                <Sparkles size={13} className="text-orange-500" /> Melanjutkan Pembayaran
                            </div>
                        )}
                        <h1 className="text-3xl font-black text-slate-800 mb-1" style={{ fontFamily: '"Grandstander", cursive' }}>
                            {selectedPlan ? 'Masuk ke Akun Anda' : 'Selamat Datang'}
                        </h1>
                        <p className="text-slate-500 text-sm">
                            {selectedPlan ? 'Masuk untuk melanjutkan proses pembayaran' : 'Silakan masuk ke akun Orang Tua atau Guru'}
                        </p>
                    </div>

                    {/* Selected Package Banner */}
                    {selectedPlan && (
                        <div className="mb-6 p-4 rounded-2xl bg-orange-50/90 border border-orange-200 shadow-sm">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 flex items-center gap-1">
                                    <ShieldCheck size={14} /> Paket Terpilih
                                </span>
                                <Link
                                    href="/pricing"
                                    className="text-[11px] font-bold text-orange-600 hover:text-orange-700 underline"
                                >
                                    Ubah Paket
                                </Link>
                            </div>
                            <div className="flex items-baseline justify-between mb-1">
                                <h2 className="font-bold text-slate-800 text-base" style={{ fontFamily: '"Grandstander", cursive' }}>
                                    {selectedPlan.name}
                                </h2>
                                <span className="font-black text-slate-900 text-sm">
                                    Rp {selectedPlan.price.toLocaleString('id-ID')}
                                    <span className="text-xs font-normal text-slate-500">
                                        /{selectedPlan.billing_cycle === 'monthly' ? 'bln' : 'thn'}
                                    </span>
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                Setelah berhasil masuk, Anda akan langsung diarahkan ke instruksi pembayaran untuk paket ini.
                            </p>
                        </div>
                    )}

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submitParent} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={parentData.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setParentData('email', e.target.value)}
                                required
                            />
                            <InputError message={parentErrors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={parentData.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setParentData('password', e.target.value)}
                                required
                            />
                            <InputError message={parentErrors.password} className="mt-2" />
                        </div>

                        <div className="block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={parentData.remember}
                                    onChange={(e) =>
                                        setParentData(
                                            'remember',
                                            (e.target.checked || false) as false,
                                        )
                                    }
                                />
                                <span className="ms-2 text-sm text-slate-600 font-medium">
                                    Ingat saya
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            {canResetPassword ? (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    Lupa kata sandi?
                                </Link>
                            ) : <div />}

                            <PrimaryButton disabled={parentProcessing}>
                                {selectedPlan ? 'Masuk & Lanjut Bayar' : 'Masuk Akun'}
                            </PrimaryButton>
                        </div>

                        <div className="text-center pt-4 border-t border-gray-100 space-y-4 mt-4">
                            <div>
                                <span className="text-xs text-slate-500">Belum punya akun? </span>
                                <Link
                                    href={route('register', selectedPlan ? { plan_id: selectedPlan.id } : {})}
                                    className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    Daftar Sekarang
                                </Link>
                            </div>
                            
                            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex flex-col items-center gap-2">
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">Untuk Keperluan Demo</span>
                                <a
                                    href={route('demo-login')}
                                    className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm shadow-sm transition-colors"
                                >
                                    Login as Premium Demo User
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* TAB 2: KIDS LOGIN */}
            {activeTab === 'kids' && (
                <div>
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-100 to-purple-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-white shadow-md">
                            <Gamepad2 className="w-8 h-8 text-indigo-500" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
                            Area Bermain Anak
                        </h1>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">Ayo masuk untuk memulai petualanganmu!</p>
                    </div>

                    {/* Step 1: Input Kode Kelas or Username */}
                    {kidsStep === 1 && (
                        <form onSubmit={handleIdentifierSubmit} className="space-y-5">
                            <div>
                                <InputLabel htmlFor="kids_identifier" value="Kode Kelas atau Nama Pengguna" className="text-sm font-bold text-slate-700" />
                                <TextInput
                                    id="kids_identifier"
                                    type="text"
                                    name="identifier"
                                    value={loginIdentifier}
                                    className="mt-2 block w-full text-lg py-3 rounded-xl text-center font-bold tracking-widest uppercase border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    isFocused={true}
                                    onChange={(e) => {
                                        setLoginIdentifier(e.target.value.toUpperCase());
                                        setLookupError(null);
                                    }}
                                    placeholder="Contoh: KIDS-2026 atau USERNAME"
                                    required
                                />
                            </div>

                            {/* Demo Hint Helper */}
                            <div className="p-3 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs text-indigo-700 flex items-center justify-between">
                                <span>Demo Kode Kelas: <strong className="font-mono">KIDS-2026</strong></span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLoginIdentifier('KIDS-2026');
                                        setLookupError(null);
                                    }}
                                    className="text-[11px] font-bold bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Gunakan
                                </button>
                            </div>

                            {lookupError && (
                                <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2.5 text-red-600 text-xs font-medium">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{lookupError}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!loginIdentifier || isSearching}
                                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base rounded-xl shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSearching ? (
                                    <><Loader2 className="animate-spin w-5 h-5" /> Memeriksa Data...</>
                                ) : (
                                    <>Lanjut <ArrowRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Select Student Avatar in Class */}
                    {kidsStep === 2 && (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between mb-2">
                                <button
                                    type="button"
                                    onClick={() => setKidsStep(1)}
                                    className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                <h2 className="text-base font-bold text-slate-800">Pilih Nama / Avatarmu</h2>
                                <div className="w-8"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                                {students.map((student) => (
                                    <button
                                        key={student.id}
                                        type="button"
                                        onClick={() => handleStudentSelect(student)}
                                        className="bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 rounded-2xl p-3 flex flex-col items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-sm"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 text-white rounded-full flex items-center justify-center font-black text-lg shadow-md">
                                            {student.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-slate-700 text-xs sm:text-sm truncate w-full text-center">{student.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Enter 4-digit PIN */}
                    {kidsStep === 3 && (
                        <div className="space-y-5">
                            <div className="flex items-center mb-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setKidsStep(students.length > 0 ? 2 : 1);
                                        setPin('');
                                    }}
                                    className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                <div className="ml-3 flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <Lock className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-slate-800 leading-tight">Masukkan PIN (Default: 1234)</h2>
                                        <p className="text-xs text-slate-500">Halo, {selectedStudent?.name || kidsData.identifier}</p>
                                    </div>
                                </div>
                            </div>

                            {/* PIN Display */}
                            <div className="flex justify-center gap-3">
                                {[0, 1, 2, 3].map((index) => (
                                    <div 
                                        key={index} 
                                        className={`w-12 h-14 rounded-xl flex items-center justify-center text-2xl font-black transition-all ${pin.length > index ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-300'}`}
                                    >
                                        {pin.length > index ? '•' : ''}
                                    </div>
                                ))}
                            </div>
                            
                            <InputError message={kidsErrors.pin} className="text-center" />

                            {/* Numpad */}
                            <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => handlePinEntry(num.toString())}
                                        disabled={kidsProcessing}
                                        className="h-12 bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded-xl text-xl font-bold text-slate-700 hover:text-indigo-600 transition-colors active:scale-95 disabled:opacity-50"
                                    >
                                        {num}
                                    </button>
                                ))}
                                <div></div>
                                <button
                                    type="button"
                                    onClick={() => handlePinEntry('0')}
                                    disabled={kidsProcessing}
                                    className="h-12 bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded-xl text-xl font-bold text-slate-700 hover:text-indigo-600 transition-colors active:scale-95 disabled:opacity-50"
                                >
                                    0
                                </button>
                                <button
                                    type="button"
                                    onClick={handleBackspace}
                                    disabled={kidsProcessing}
                                    className="h-12 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors active:scale-95 disabled:opacity-50"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </GuestLayout>
    );
}
