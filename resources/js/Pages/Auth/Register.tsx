import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface SelectedPlan {
    id: string;
    name: string;
    price: number;
    billing_cycle: 'monthly' | 'annual';
    features?: string[];
}

interface RegisterProps {
    selectedPlan?: SelectedPlan | null;
    plan_id?: string | null;
}

export default function Register({ selectedPlan, plan_id }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        plan_id: plan_id || selectedPlan?.id || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun - Aruna" />

            <div className="text-center mb-6">
                {selectedPlan && (
                    <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                        <Sparkles size={13} className="text-orange-500" /> Langkah 1 dari 2: Buat Akun
                    </div>
                )}
                <h1 className="text-3xl font-black text-slate-800 mb-1" style={{ fontFamily: '"Grandstander", cursive' }}>
                    {selectedPlan ? 'Daftar Akun Aruna' : 'Create Account'}
                </h1>
                <p className="text-slate-500 text-sm">
                    {selectedPlan ? 'Buat akun untuk melanjutkan pembayaran paket pilihan Anda' : 'Join us today'}
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
                        Setelah akun berhasil dibuat, Anda akan langsung diarahkan ke halaman instruksi pembayaran.
                    </p>
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-between pt-4">
                    <Link
                        href={route('login', selectedPlan ? { plan_id: selectedPlan.id } : {})}
                        className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton disabled={processing}>
                        {selectedPlan ? 'Daftar & Lanjut Bayar' : 'Register'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
