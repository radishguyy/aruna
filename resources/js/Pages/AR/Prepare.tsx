import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Smartphone, ScanLine, ExternalLink } from 'lucide-react';

export default function Prepare({ object, qrUrl, auth }: { object: any, qrUrl: string, auth: any }) {
    const [copied, setCopied] = useState(false);
    
    // For local dev, we might want to easily copy the URL
    const copyUrl = () => {
        navigator.clipboard.writeText(qrUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Prepare AR: ${object.title}`} />
            
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <Link href="/child" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center mr-2 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            Kembali ke Dashboard Anak
                        </Link>
                        <span className="text-gray-300 hidden sm:inline">•</span>
                        <Link href="/ar" className="text-sm font-medium text-indigo-600 hover:underline">
                            Lihat Semua Objek AR
                        </Link>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                            
                            {/* Left Side: Info */}
                            <div className="p-8 md:p-12 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm border border-indigo-50">
                                    <Smartphone className="w-8 h-8" />
                                </div>
                                
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">{object.title}</h1>
                                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                    {object.description}
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">1</div>
                                        <p className="ml-4 text-gray-700 font-medium">Open your smartphone camera</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">2</div>
                                        <p className="ml-4 text-gray-700 font-medium">Scan the QR code on the right</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">3</div>
                                        <p className="ml-4 text-gray-700 font-medium">Tap the link to enter AR mode</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Side: QR Code */}
                            <div className="bg-gray-900 p-8 md:p-12 flex flex-col items-center justify-center relative">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-gray-900 to-gray-900"></div>
                                
                                <div className="relative z-10 bg-white p-6 rounded-3xl shadow-2xl border-4 border-indigo-500/20 transform hover:scale-105 transition-transform duration-500">
                                    <div className="absolute -top-4 -right-4 bg-indigo-500 text-white rounded-full p-2 shadow-lg animate-bounce">
                                        <ScanLine className="w-5 h-5" />
                                    </div>
                                    <QRCodeSVG 
                                        value={qrUrl} 
                                        size={220} 
                                        level="H" 
                                        includeMargin={true}
                                        fgColor="#0f172a"
                                    />
                                </div>
                                
                                <p className="mt-8 text-indigo-200 font-medium tracking-wide text-center uppercase text-sm">Scan to launch AR experience</p>
                                
                                {/* Developer helper button to test locally */}
                                <div className="mt-8 pt-6 border-t border-gray-800 w-full flex flex-col items-center z-10">
                                    <button 
                                        onClick={copyUrl}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center text-sm font-medium"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        {copied ? 'Copied URL!' : 'Testing locally? Copy URL'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
