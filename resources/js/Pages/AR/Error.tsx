import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

export default function Error({ message }: { message: string }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
            <Head title="AR Experience Error" />
            
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-6 border border-gray-100">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h1>
                <p className="text-gray-600 leading-relaxed">{message}</p>
                
                <div className="pt-4">
                    <Link
                        href="/ar"
                        className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
                    >
                        Return to Digfo AR
                    </Link>
                </div>
            </div>
        </div>
    );
}
