import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email - Aruna" />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-slate-800 mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>Verify Email</h1>
                <p className="text-slate-500 text-sm">
                    Thanks for signing up! Please verify your email address by clicking on the link we just emailed to you.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex items-center justify-between pt-4">
                    <PrimaryButton disabled={processing}>
                        Resend Verification Email
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors ml-4"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
