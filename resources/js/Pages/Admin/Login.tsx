import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function AdminLogin({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
            <Head title="Admin Secret Gate" />

            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
                        <ShieldCheck className="w-9 h-9 text-white" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight">Portal Administrator</h1>
                    <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Akses Terbatas & Rahasia</p>
                </div>

                {status && (
                    <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <InputLabel htmlFor="email" value="Email Administrator" className="text-slate-300 font-bold text-sm" />
                        <div className="relative mt-1.5">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Mail className="w-5 h-5" />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="pl-11 block w-full bg-slate-950/80 border-slate-800 text-white rounded-xl focus:border-orange-500 focus:ring-orange-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="admin@aruna.id"
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1.5" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Kata Sandi Rahasia" className="text-slate-300 font-bold text-sm" />
                        <div className="relative mt-1.5">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Lock className="w-5 h-5" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="pl-11 block w-full bg-slate-950/80 border-slate-800 text-white rounded-xl focus:border-orange-500 focus:ring-orange-500"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <InputError message={errors.password} className="mt-1.5" />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        Masuk Sistem Admin <ArrowRight className="w-5 h-5 ml-1" />
                    </button>
                </form>
            </div>

            <div className="mt-8 text-center text-xs text-slate-600 font-mono">
                ARUNA CORE SECURITY SYSTEM &copy; {new Date().getFullYear()}
            </div>
        </div>
    );
}
