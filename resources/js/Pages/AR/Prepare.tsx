import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ChildLayout from '@/Layouts/ChildLayout';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Smartphone, ScanLine, Box, Sparkles, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Prepare({ object, qrUrl, auth }: { object: any, qrUrl: string, auth: any }) {
    const [copied, setCopied] = useState(false);
    
    // For local dev, we might want to easily copy the URL
    const copyUrl = () => {
        navigator.clipboard.writeText(qrUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ChildLayout>
            <Head title={`Portal AR: ${object.title}`} />
            
            <div className="p-6 md:p-10 pt-12 pb-32 font-sans max-w-[1200px] mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/child" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border-2 border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-colors active:scale-95">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 font-grandstander">Portal Digfo AR</h1>
                        <p className="text-sm font-medium text-slate-500">Persiapan dimensi 3D</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-4 border-purple-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        
                        {/* Left Side: Info */}
                        <div className="p-8 md:p-12 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200/40 rounded-full blur-3xl -ml-10 -mb-10"></div>
                            
                            <div className="relative z-10">
                                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-purple-100 text-purple-600 shadow-sm border-2 border-purple-200 transform -rotate-3">
                                    <Box className="w-10 h-10" />
                                </div>
                                
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-grandstander leading-tight">
                                    {object.title}
                                </h2>
                                <p className="text-slate-600 font-medium leading-relaxed mb-10 text-base md:text-lg max-w-lg">
                                    {object.description || "Siap memanggil objek ini ke duniamu? Ikuti petunjuk di bawah untuk memulai pengalaman ajaib!"}
                                </p>
                                
                                <div className="space-y-5">
                                    <div className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-100 shadow-sm">
                                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white font-black text-lg border-4 border-purple-200 shadow-sm">1</div>
                                        <div className="ml-4">
                                            <h4 className="font-bold text-slate-800">Buka Kamera Smartphone</h4>
                                            <p className="text-xs text-slate-500 font-medium">Pinjam HP ayah/ibu atau gunakan milikmu.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-100 shadow-sm">
                                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white font-black text-lg border-4 border-indigo-200 shadow-sm">2</div>
                                        <div className="ml-4">
                                            <h4 className="font-bold text-slate-800">Scan QR Code</h4>
                                            <p className="text-xs text-slate-500 font-medium">Arahkan kamera ke gambar QR di sebelah.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-100 shadow-sm">
                                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-black text-lg border-4 border-blue-200 shadow-sm">3</div>
                                        <div className="ml-4">
                                            <h4 className="font-bold text-slate-800">Mainkan Dimensi 3D!</h4>
                                            <p className="text-xs text-slate-500 font-medium">Ketuk tautan dan ikuti panduan di layar.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Side: QR Code Area */}
                        <div className="bg-slate-900 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-900 to-slate-950"></div>
                            
                            <div className="relative z-10 w-full flex flex-col items-center">
                                <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 text-purple-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span>Portal Aktif</span>
                                </div>

                                <motion.div 
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border-8 border-purple-500/30 relative"
                                >
                                    <div className="absolute -top-5 -right-5 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full p-3 shadow-lg border-4 border-slate-900">
                                        <ScanLine className="w-6 h-6" />
                                    </div>
                                    <QRCodeSVG 
                                        value={qrUrl} 
                                        size={240} 
                                        level="H" 
                                        includeMargin={true}
                                        fgColor="#0f172a"
                                    />
                                </motion.div>
                                
                                <div className="mt-10 flex items-center gap-3 text-purple-200">
                                    <Smartphone className="w-6 h-6 animate-pulse" />
                                    <p className="font-bold tracking-wide uppercase text-sm">Arahkan Kamera ke Sini</p>
                                </div>
                                
                                {/* Developer helper button to test locally */}
                                <div className="mt-8 pt-6 border-t border-slate-800/60 w-full flex flex-col items-center z-10">
                                    <button 
                                        onClick={copyUrl}
                                        className="text-slate-400 hover:text-white transition-colors flex items-center text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        {copied ? 'Tautan Disalin!' : 'Salin Tautan (Test di HP)'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChildLayout>
    );
}
