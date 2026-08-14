import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { QrCode, ArrowRight, ArrowLeft, KeyRound, User, Lock, AlertCircle, Loader2 } from 'lucide-react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import axios from 'axios';

interface Student {
    id: number;
    name: string;
    username: string;
    avatar: string;
}

export default function KidsLogin() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [loginIdentifier, setLoginIdentifier] = useState(''); // Class code or username
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [pin, setPin] = useState('');
    const [lookupError, setLookupError] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        identifier: '', // username
        pin: '',
    });

    const handleIdentifierSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loginIdentifier.trim()) return;

        setLookupError(null);
        setIsSearching(true);

        try {
            const response = await axios.get('/api/kids/lookup', {
                params: { identifier: loginIdentifier }
            });

            const result = response.data;

            if (result.type === 'classroom') {
                setStudents(result.students);
                setStep(2);
            } else if (result.type === 'student') {
                setSelectedStudent(result.student);
                setData('identifier', result.student.username);
                setStep(3);
            }
        } catch (err: any) {
            setLookupError(err.response?.data?.message || 'Kode Kelas atau Username tidak ditemukan.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleStudentSelect = (student: Student) => {
        setSelectedStudent(student);
        setData('identifier', student.username);
        clearErrors();
        setStep(3);
    };

    const handlePinEntry = (digit: string) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);
            setData('pin', newPin);
            
            if (newPin.length === 4) {
                // Auto submit to real Laravel backend when 4 digits entered
                post('/kids/login', {
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
        setData('pin', newPin);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex flex-col items-center justify-center p-6 font-sans">
            <Head title="Masuk Area Anak" />

            <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative">
                
                {/* Decorative header blob */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur-2xl rounded-full -translate-y-1/2"></div>

                <div className="p-10 relative z-10">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md">
                            <User className="w-10 h-10 text-indigo-500" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Area Bermain</h1>
                        <p className="text-gray-500 mt-2 font-medium">Ayo mulai petualangan belajarmu!</p>
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleIdentifierSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="identifier" value="Kode Kelas atau Nama Pengguna" className="text-lg font-bold text-gray-700" />
                                <TextInput
                                    id="identifier"
                                    type="text"
                                    name="identifier"
                                    value={loginIdentifier}
                                    className="mt-2 block w-full text-xl py-4 rounded-2xl text-center font-bold tracking-widest uppercase border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    isFocused={true}
                                    onChange={(e) => {
                                        setLoginIdentifier(e.target.value.toUpperCase());
                                        setLookupError(null);
                                    }}
                                    placeholder="Contoh: KIDS-2026 atau USERNAME"
                                    required
                                />
                            </div>

                            {lookupError && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>{lookupError}</span>
                                </div>
                            )}

                            <PrimaryButton className="w-full py-4 text-lg justify-center rounded-2xl shadow-lg shadow-indigo-500/30" disabled={!loginIdentifier || isSearching}>
                                {isSearching ? (
                                    <><Loader2 className="animate-spin mr-2 w-5 h-5" /> Memeriksa Data...</>
                                ) : (
                                    <>Lanjut <ArrowRight className="ml-2 w-5 h-5" /></>
                                )}
                            </PrimaryButton>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 font-medium">ATAU</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>

                            <SecondaryButton className="w-full py-4 text-lg justify-center rounded-2xl bg-white border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50">
                                <QrCode className="mr-2 w-5 h-5" /> Scan QR Code
                            </SecondaryButton>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="flex items-center mb-6">
                                <button onClick={() => setStep(1)} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-xl font-bold text-gray-800 ml-4">Siapa Kamu?</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-1">
                                {students.map((student) => (
                                    <button
                                        key={student.id}
                                        onClick={() => handleStudentSelect(student)}
                                        className="bg-gray-50 hover:bg-indigo-50 border-2 border-transparent hover:border-indigo-200 rounded-3xl p-4 flex flex-col items-center gap-3 transition-all transform hover:scale-105 active:scale-95"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 text-white rounded-full overflow-hidden border-4 border-white shadow-sm flex items-center justify-center font-black text-xl">
                                            {student.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-gray-700 text-base leading-tight truncate w-full text-center">{student.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8">
                            <div className="flex items-center mb-2">
                                <button onClick={() => {
                                    setStep(students.length > 0 ? 2 : 1);
                                    setPin('');
                                }} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="ml-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 leading-tight">Masukkan PIN</h2>
                                        <p className="text-sm text-gray-500">Halo, {selectedStudent?.name || data.identifier}</p>
                                    </div>
                                </div>
                            </div>

                            {/* PIN Display */}
                            <div className="flex justify-center gap-4">
                                {[0, 1, 2, 3].map((index) => (
                                    <div 
                                        key={index} 
                                        className={`w-14 h-16 rounded-2xl flex items-center justify-center text-3xl font-black transition-all ${pin.length > index ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-300'}`}
                                    >
                                        {pin.length > index ? '•' : ''}
                                    </div>
                                ))}
                            </div>
                            
                            <InputError message={errors.pin} className="text-center" />

                            {/* Numpad */}
                            <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => handlePinEntry(num.toString())}
                                        disabled={processing}
                                        className="h-16 bg-gray-50 hover:bg-indigo-50 border border-gray-100 rounded-2xl text-2xl font-bold text-gray-700 hover:text-indigo-600 transition-colors active:scale-95 disabled:opacity-50"
                                    >
                                        {num}
                                    </button>
                                ))}
                                <div></div>
                                <button
                                    onClick={() => handlePinEntry('0')}
                                    disabled={processing}
                                    className="h-16 bg-gray-50 hover:bg-indigo-50 border border-gray-100 rounded-2xl text-2xl font-bold text-gray-700 hover:text-indigo-600 transition-colors active:scale-95 disabled:opacity-50"
                                >
                                    0
                                </button>
                                <button
                                    onClick={handleBackspace}
                                    disabled={processing}
                                    className="h-16 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-2xl flex items-center justify-center transition-colors active:scale-95 disabled:opacity-50"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                </div>
                
                {/* Footer link back to adult login */}
                <div className="bg-gray-50 p-6 text-center border-t border-gray-100 relative z-10">
                    <Link href="/login" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center justify-center gap-2">
                        <KeyRound className="w-4 h-4" /> Area Orang Tua & Guru
                    </Link>
                </div>
            </div>
        </div>
    );
}
