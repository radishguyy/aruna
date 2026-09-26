import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box, ChevronRight, Sparkles } from 'lucide-react';

interface ARObject {
    id: string;
    title: string;
    description: string;
    format: string;
}

export default function Index({ objects, auth }: { objects: ARObject[], auth: any }) {
    return (
        <AuthenticatedLayout>
            <Head title="Digfo AR Learning" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="px-8 py-12 md:p-16 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between">
                            <div className="relative z-10 md:max-w-xl">
                                <span className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium mb-6 border border-white/30 shadow-sm">
                                    <Sparkles className="w-4 h-4" />
                                    <span>New Learning Experience</span>
                                </span>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                                    Step into <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">Digfo AR</span>
                                </h1>
                                <p className="text-lg text-blue-100 leading-relaxed mb-8 font-medium">
                                    Bring learning to life! Select a 3D object, scan the QR code with your phone, and place it in your real environment to learn interactively.
                                </p>
                            </div>
                            <div className="hidden md:block relative z-10 w-64 h-64">
                                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
                                <Box className="w-full h-full text-white opacity-80" strokeWidth={1} />
                            </div>
                            
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Available Models</h2>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{objects.length} Objects</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {objects.map((obj) => (
                            <Link 
                                href={`/ar/${obj.id}/prepare`} 
                                key={obj.id}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
                            >
                                <div className="aspect-video bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden flex items-center justify-center border-b border-gray-50">
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                                    <Box className="w-16 h-16 text-indigo-300 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 z-10" />
                                    
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="bg-white/80 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full text-indigo-700 uppercase tracking-wide shadow-sm border border-indigo-100/50">
                                            {obj.format}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between relative bg-white">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{obj.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{obj.description}</p>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between text-indigo-600 font-semibold group-hover:text-indigo-700">
                                        <span className="text-sm">Start AR Experience</span>
                                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        
                        {objects.length === 0 && (
                            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                <Box className="w-16 h-16 text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No 3D Objects Found</h3>
                                <p className="text-gray-500 max-w-md mx-auto">We couldn't find any compatible 3D models in the public/3d directory. Add some .usdz, .glb, or .gltf files to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
