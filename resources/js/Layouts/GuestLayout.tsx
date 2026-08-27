import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center selection:bg-orange-200">
            <div className="w-full sm:max-w-md mt-6 mb-6">
                <Link href="/" className="flex justify-center mb-8">
                    <ApplicationLogo className="h-20 w-auto fill-current text-orange-500" />
                </Link>

                <div className="bg-white p-8 rounded-[2rem] border-2 border-gray-100 shadow-xl shadow-gray-200/50">
                    {children}
                </div>
            </div>
        </div>
    );
}
