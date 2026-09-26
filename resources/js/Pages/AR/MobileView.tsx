import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Info,
    X,
    RefreshCw,
    Box,
    ScanLine,
    ArrowLeft,
    Sparkles,
    Smartphone,
    Camera,
    CameraOff,
    RotateCw,
    Maximize2,
    Minimize2,
    Download,
    AlertCircle,
    CheckCircle2,
    Eye,
    Layers,
    Play,
    Pause,
    HelpCircle,
    Image as ImageIcon,
    UploadCloud
} from 'lucide-react';

interface EducationalContent {
    facts?: string[];
    labels?: { name: string; description: string }[];
}

interface ARObject {
    id: string;
    title: string;
    description: string;
    file_path: string;
    format: string;
    formats?: string[];
    glb_path?: string | null;
    usdz_path?: string | null;
    educational_content?: EducationalContent;
}

export default function MobileView({ object }: { object: ARObject }) {
    // Mode: 'studio' (3D viewer) or 'camera' (camera background overlay)
    const [viewMode, setViewMode] = useState<'studio' | 'camera'>('studio');

    // UI state
    const [showInfo, setShowInfo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isModelViewerLoaded, setIsModelViewerLoaded] = useState(false);
    const [autoRotate, setAutoRotate] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [customBackground, setCustomBackground] = useState<string | null>(null);

    // Capabilities
    const [webxrSupported, setWebxrSupported] = useState<boolean | null>(null);
    const [cameraLoading, setCameraLoading] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [showHttpNoticeModal, setShowHttpNoticeModal] = useState(false);
    const [showArFailedModal, setShowArFailedModal] = useState(false);

    // Refs
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const modelViewerRef = useRef<any>(null);
    const cameraStreamRef = useRef<MediaStream | null>(null);

    // Platform detection
    const isAppleDevice = () => {
        if (typeof window === 'undefined') return false;
        return (
            /iPhone|iPad|iPod|Mac/i.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        );
    };

    const isApple = isAppleDevice();

    // Model paths
    const glbSrc = object?.glb_path || (object?.format === 'glb' || object?.format === 'gltf' ? object?.file_path : null);
    const usdzSrc = object?.usdz_path || (object?.format === 'usdz' ? object?.file_path : null);
    const hasGlb = !!glbSrc;
    const hasUsdz = !!usdzSrc;

    useEffect(() => {
        // Detect WebXR capability
        if (typeof navigator !== 'undefined' && 'xr' in navigator && (navigator as any).xr?.isSessionSupported) {
            (navigator as any).xr
                .isSessionSupported('immersive-ar')
                .then((supported: boolean) => setWebxrSupported(supported))
                .catch(() => setWebxrSupported(false));
        } else {
            setWebxrSupported(false);
        }

        // Dynamically import @google/model-viewer
        import('@google/model-viewer')
            .then(() => {
                setIsModelViewerLoaded(true);
            })
            .catch((err) => {
                console.warn('Failed to load @google/model-viewer:', err);
            })
            .finally(() => {
                setIsLoading(false);
            });

        // Fail-safe timer
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    // Listen to model-viewer AR events (catches ARCore / Scene Viewer launch failure)
    useEffect(() => {
        const viewer = modelViewerRef.current;
        if (!viewer) return;

        const handleArStatus = (event: any) => {
            const status = event.detail?.status;
            if (status === 'failed') {
                console.warn('Native AR failed to activate. Presenting camera fallback.');
                setShowArFailedModal(true);
            }
        };

        viewer.addEventListener('ar-status', handleArStatus);
        return () => {
            viewer.removeEventListener('ar-status', handleArStatus);
        };
    }, [isModelViewerLoaded, viewMode]);

    // Clean up camera stream on unmount
    useEffect(() => {
        return () => {
            stopCameraStream();
        };
    }, []);

    const stopCameraStream = () => {
        if (cameraStreamRef.current) {
            cameraStreamRef.current.getTracks().forEach((track) => track.stop());
            cameraStreamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    // Handle Start Camera Mode
    const handleCameraModeClick = async () => {
        setCameraError(null);

        // Check if browser supports mediaDevices.getUserMedia
        const hasGetUserMedia = typeof navigator !== 'undefined' && typeof navigator.mediaDevices?.getUserMedia === 'function';

        if (!hasGetUserMedia) {
            // Check if blocked by insecure HTTP
            const isInsecureHttp = typeof window !== 'undefined' && window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
            
            if (isInsecureHttp) {
                setShowHttpNoticeModal(true);
                return;
            }

            // Otherwise, prompt file input photo fallback
            triggerPhotoCapture();
            return;
        }

        try {
            setCameraLoading(true);
            setShowArFailedModal(false);

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { ideal: 'environment' },
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            });

            cameraStreamRef.current = stream;
            setViewMode('camera');
            setAutoRotate(false);

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play().catch((e) => console.warn('Video play error:', e));
                }
            }, 100);
        } catch (err: any) {
            console.warn('Live camera access error:', err);
            // If live stream was rejected, offer photo capture fallback
            setCameraError('Akses video langsung tidak diizinkan. Kamu bisa mengambil foto ruangan sebagai latar belakang!');
            setShowHttpNoticeModal(true);
        } finally {
            setCameraLoading(false);
        }
    };

    // Trigger phone native camera photo capture via file input (works on all mobile browsers even over HTTP!)
    const triggerPhotoCapture = () => {
        setShowHttpNoticeModal(false);
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // When user captures a desk/room photo via file input
    const handleFilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCustomBackground(url);
            stopCameraStream();
            setViewMode('camera');
            setAutoRotate(false);
            setCameraError(null);
        }
    };

    const stopCameraMode = () => {
        stopCameraStream();
        setViewMode('studio');
        setAutoRotate(true);
    };

    // Reset 3D Model rotation / viewpoint
    const handleResetView = () => {
        if (modelViewerRef.current) {
            try {
                if (typeof modelViewerRef.current.resetTurntable === 'function') {
                    modelViewerRef.current.resetTurntable();
                }
                modelViewerRef.current.cameraOrbit = '0deg 75deg 105%';
            } catch (e) {
                console.warn('Reset view error:', e);
            }
        }
    };

    // Fullscreen toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(() => {});
            setIsFullscreen(false);
        }
    };

    // Take photo snapshot in camera mode
    const handleTakeSnapshot = async () => {
        if (!modelViewerRef.current) return;

        try {
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // 1. Draw live video or photo background
            if (videoRef.current && videoRef.current.readyState >= 2) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            } else if (customBackground) {
                const bgImg = new Image();
                await new Promise((res) => {
                    bgImg.onload = res;
                    bgImg.src = customBackground;
                });
                ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
            } else {
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // 2. Draw 3D model canvas snapshot
            const modelDataUrl = modelViewerRef.current.toDataURL('image/png');
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const finalPhoto = canvas.toDataURL('image/jpeg', 0.92);
                setCapturedPhoto(finalPhoto);
            };
            img.src = modelDataUrl;
        } catch (e) {
            console.warn('Snapshot capture failed:', e);
        }
    };

    // Trigger Native AR safely
    const handleTriggerNativeAr = () => {
        if (isApple && usdzSrc) {
            const a = document.createElement('a');
            a.href = usdzSrc;
            a.rel = 'ar';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return;
        }

        if (modelViewerRef.current) {
            try {
                modelViewerRef.current.activateAR();
            } catch (e) {
                console.warn('Error activating AR:', e);
                setShowArFailedModal(true);
            }
        }
    };

    // Initial Loading State
    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center text-white p-6 z-50">
                <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h2 className="text-lg font-bold font-sans tracking-wide">Menyiapkan Digfo AR...</h2>
                <p className="text-slate-400 text-sm mt-1 text-center font-sans">
                    Memuat aset dan kapabilitas kamera
                </p>
            </div>
        );
    }

    // Object Not Found State
    if (!object) {
        return (
            <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center font-sans">
                <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-red-400 mb-4">
                    <RefreshCw className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold mb-2">Objek 3D Tidak Ditemukan</h2>
                <p className="text-slate-400 text-sm max-w-xs mb-6">
                    Sesi AR mungkin telah kedaluwarsa atau file model tidak tersedia.
                </p>
                <Link href="/child" className="bg-indigo-600 text-white font-bold text-xs px-6 py-3 rounded-full">
                    Kembali ke Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-slate-950 overflow-hidden text-white font-sans flex flex-col select-none">
            <Head title={`AR: ${object.title} - Digfo`} />

            {/* Hidden Camera Photo Capture File Input (Works on all mobile browsers over HTTP) */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFilePhotoChange}
                className="hidden"
            />

            {/* Background Camera Video Stream or Photo */}
            {viewMode === 'camera' && (
                <>
                    {customBackground ? (
                        <img
                            src={customBackground}
                            alt="Background Kamera"
                            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                        />
                    ) : (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                        />
                    )}
                </>
            )}

            {/* TOP NAVIGATION HEADER & PROMINENT MODE SWITCHER */}
            <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-3.5 bg-gradient-to-b from-black/90 via-black/60 to-transparent gap-2">
                {/* Back button */}
                <Link
                    href="/child"
                    className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-95 transition-all shrink-0"
                    aria-label="Kembali ke Dashboard"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>

                {/* PROMINENT MODE SWITCHER PILL (ALWAYS VISIBLE!) */}
                <div className="flex bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-lg">
                    <button
                        onClick={stopCameraMode}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            viewMode === 'studio'
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <Box className="w-3.5 h-3.5" />
                        <span>Studio 3D</span>
                    </button>

                    <button
                        onClick={handleCameraModeClick}
                        disabled={cameraLoading}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            viewMode === 'camera'
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                                : 'text-purple-300 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Camera className="w-3.5 h-3.5 text-purple-400" />
                        <span>Mode Kamera</span>
                    </button>
                </div>

                {/* Educational Info Drawer Toggle */}
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center text-white border transition-colors cursor-pointer shrink-0 ${
                        showInfo
                            ? 'bg-purple-600 border-purple-400'
                            : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                    aria-label="Informasi Edukasi"
                >
                    {showInfo ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </button>
            </div>

            {/* Error Notification if camera fails */}
            {cameraError && (
                <div className="absolute top-16 left-4 right-4 z-40 bg-amber-950/90 border border-amber-500/60 backdrop-blur-md rounded-2xl p-3 flex items-start justify-between shadow-xl animate-in fade-in">
                    <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-200 leading-relaxed">{cameraError}</p>
                    </div>
                    <button onClick={() => setCameraError(null)} className="text-amber-400 hover:text-white ml-2">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Floating Guidance Banner (Camera Mode) */}
            {viewMode === 'camera' && (
                <div className="absolute top-16 left-4 right-4 z-20 pointer-events-none flex flex-col items-center">
                    <div className="bg-slate-900/85 backdrop-blur-md border border-purple-500/30 px-4 py-2 rounded-2xl text-center shadow-lg max-w-sm">
                        <p className="text-xs text-purple-200 font-medium">
                            Arahkan kamera ke meja atau lantai. Sentuh & geser objek untuk memutar atau memperbesar.
                        </p>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                            *Mode kamera simulasi (tidak memerlukan Google Play Services)
                        </span>
                    </div>
                </div>
            )}

            {/* Non-AR Notice (Studio mode guidance) */}
            {viewMode === 'studio' && (
                <div className="absolute top-16 left-4 right-4 z-20 flex justify-center pointer-events-none">
                    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-md max-w-xs text-center">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <p className="text-[11px] text-slate-300">
                            Sentuh objek untuk memutar 360° atau cubit untuk memperbesar.
                        </p>
                    </div>
                </div>
            )}

            {/* MAIN 3D MODEL VIEWPORT */}
            <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">
                {hasGlb && isModelViewerLoaded ? (
                    <div className="w-full h-full relative">
                        {React.createElement(
                            'model-viewer',
                            {
                                ref: modelViewerRef,
                                src: glbSrc,
                                ...(usdzSrc ? { 'ios-src': usdzSrc } : {}),
                                alt: object.title,
                                ar: viewMode === 'studio',
                                'ar-modes': isApple
                                    ? 'quick-look'
                                    : webxrSupported
                                    ? 'webxr scene-viewer'
                                    : 'scene-viewer',
                                'ar-scale': 'auto',
                                'camera-controls': true,
                                'auto-rotate': viewMode === 'camera' ? false : autoRotate,
                                'auto-rotate-delay': '1000',
                                'shadow-intensity': viewMode === 'camera' ? '0.6' : '1.2',
                                exposure: viewMode === 'camera' ? '1.05' : '1.0',
                                style: {
                                    backgroundColor: viewMode === 'camera' ? 'transparent' : '#020617',
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    zIndex: 10
                                }
                            },
                            // Hide default model-viewer AR button; we use custom UI deck
                            <div slot="ar-button" style={{ display: 'none' }} />
                        )}

                        {/* Interactive Reticle indicator in camera mode */}
                        {viewMode === 'camera' && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 opacity-30">
                                <div className="w-52 h-52 border-2 border-dashed border-purple-400 rounded-full animate-pulse"></div>
                            </div>
                        )}
                    </div>
                ) : isApple && hasUsdz ? (
                    // Native USDZ Direct View for iOS
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative z-10">
                        <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-purple-600/20 via-indigo-600/30 to-blue-500/20 border border-purple-400/30 flex items-center justify-center shadow-2xl mb-6 backdrop-blur-sm">
                            <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-xl animate-pulse"></div>
                            <Box className="w-20 h-20 text-purple-300 transform -rotate-12" strokeWidth={1.5} />
                            <div className="absolute -bottom-2 bg-indigo-600 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-md border border-indigo-400/50">
                                Apple AR
                            </div>
                        </div>

                        <h2 className="text-2xl font-black text-white mb-2">{object.title}</h2>
                        <p className="text-slate-300 text-xs max-w-xs leading-relaxed opacity-90 mb-6">
                            {object.description}
                        </p>

                        <button
                            onClick={handleTriggerNativeAr}
                            className="py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
                        >
                            <ScanLine className="w-5 h-5" />
                            <span>Buka Apple Quick Look (AR)</span>
                        </button>
                    </div>
                ) : (
                    // Pure Educational Fallback Card
                    <div className="p-8 text-center max-w-sm relative z-10">
                        <div className="w-20 h-20 rounded-3xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mx-auto mb-5 text-purple-300">
                            <Box className="w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-white">{object.title}</h2>
                        <p className="text-slate-300 text-xs leading-relaxed mb-6">{object.description}</p>
                        <button
                            onClick={() => setShowInfo(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-3 px-6 rounded-full border border-purple-400/30 transition-colors shadow-lg cursor-pointer"
                        >
                            Pelajari Fakta Materi Edukasi
                        </button>
                    </div>
                )}
            </div>

            {/* BOTTOM CONTROLS DECK */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col items-center gap-3">
                {/* Secondary Quick Action Bar (Studio mode) */}
                {viewMode === 'studio' && hasGlb && (
                    <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 shadow-lg">
                        <button
                            onClick={() => setAutoRotate(!autoRotate)}
                            className={`p-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors ${
                                autoRotate
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:text-white'
                            }`}
                            title={autoRotate ? 'Matikan putar otomatis' : 'Nyalakan putar otomatis'}
                        >
                            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            <span className="text-[10px] hidden sm:inline">Putar</span>
                        </button>

                        <button
                            onClick={handleResetView}
                            className="p-2 rounded-full text-xs bg-slate-800 text-slate-300 hover:text-white transition-colors"
                            title="Reset sudut pandang"
                        >
                            <RotateCw className="w-3.5 h-3.5" />
                        </button>

                        <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-full text-xs bg-slate-800 text-slate-300 hover:text-white transition-colors"
                            title="Layar penuh"
                        >
                            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                        </button>
                    </div>
                )}

                {/* PRIMARY ACTIONS CONTAINER */}
                <div className="w-full max-w-sm flex flex-col gap-2.5 items-center">
                    {viewMode === 'camera' ? (
                        // CAMERA CONTROLS: Snap Photo + Reset + Change Photo + Exit
                        <div className="w-full flex flex-col items-center gap-3">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleResetView}
                                    className="w-12 h-12 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 flex items-center justify-center backdrop-blur-md shadow-md active:scale-95 transition-all cursor-pointer"
                                    title="Reset Posisi Objek"
                                >
                                    <RotateCw className="w-5 h-5" />
                                </button>

                                {/* Shutter Button */}
                                <button
                                    onClick={handleTakeSnapshot}
                                    className="w-16 h-16 rounded-full border-4 border-white bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl active:scale-90 transition-transform cursor-pointer"
                                    title="Ambil Foto Objek"
                                >
                                    <Camera className="w-7 h-7 text-white" />
                                </button>

                                {/* Snap Room Photo button */}
                                <button
                                    onClick={triggerPhotoCapture}
                                    className="w-12 h-12 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 flex items-center justify-center backdrop-blur-md shadow-md active:scale-95 transition-all cursor-pointer"
                                    title="Foto Latar Belakang Baru"
                                >
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <button
                                onClick={stopCameraMode}
                                className="bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-slate-700 transition-colors"
                            >
                                Kembali ke Studio 3D
                            </button>
                        </div>
                    ) : (
                        // STUDIO MODE: ALWAYS SHOW PROMINENT CAMERA BUTTON!
                        <div className="w-full flex flex-col gap-2">
                            {/* 1. BIG PROMINENT CAMERA BUTTON (ALWAYS VISIBLE!) */}
                            <button
                                onClick={handleCameraModeClick}
                                disabled={cameraLoading}
                                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-purple-600/35 active:scale-95 transition-all cursor-pointer border border-white/20"
                            >
                                <Camera className="w-5 h-5 text-purple-200" />
                                <span>Buka Mode Kamera (AR)</span>
                            </button>

                            {/* 2. SECONDARY ROW: Native AR or Quick Look */}
                            <div className="w-full flex gap-2">
                                {isApple ? (
                                    <button
                                        onClick={handleTriggerNativeAr}
                                        className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-purple-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-purple-500/30 transition-colors cursor-pointer"
                                    >
                                        <ScanLine className="w-4 h-4 text-purple-400" />
                                        <span>Apple AR Quick Look</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleTriggerNativeAr}
                                        className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                                        title="Mencoba ARCore Native"
                                    >
                                        <ScanLine className="w-4 h-4 text-slate-400" />
                                        <span>Coba ARCore Native</span>
                                    </button>
                                )}

                                <button
                                    onClick={() => setShowInfo(true)}
                                    className="py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                                >
                                    <Info className="w-4 h-4" />
                                    <span>Materi Edukasi</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* HTTP INSECURE CONTEXT / CAMERA MODAL */}
            {showHttpNoticeModal && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-5">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-7 h-7" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2">Buka Kamera Perangkat</h3>
                        <p className="text-slate-300 text-xs leading-relaxed mb-6">
                            Pilih cara menampilkan objek 3D di ruangan Anda:
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={triggerPhotoCapture}
                                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Camera className="w-4 h-4" />
                                <span>Ambil Foto Meja / Ruangan</span>
                            </button>

                            <button
                                onClick={() => {
                                    setShowHttpNoticeModal(false);
                                    // Set default ambient room table background
                                    setCustomBackground('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80');
                                    setViewMode('camera');
                                    setAutoRotate(false);
                                }}
                                className="w-full py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold text-xs border border-purple-500/30 transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                <ImageIcon className="w-4 h-4" />
                                <span>Gunakan Simulasi Meja Belajar</span>
                            </button>

                            <button
                                onClick={() => setShowHttpNoticeModal(false)}
                                className="w-full py-2.5 px-5 rounded-2xl bg-transparent text-slate-400 hover:text-white font-medium text-xs transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* AR Failed / ARCore Missing Dialog Modal */}
            {showArFailedModal && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-5">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-7 h-7" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2">Gunakan Mode Kamera</h3>
                        <p className="text-slate-300 text-xs leading-relaxed mb-6">
                            Layanan Google Play Services for AR (ARCore) tidak tersedia di perangkat ini. Namun, kamu tetap bisa menikmati pengalaman AR dengan <span className="font-bold text-purple-300">Mode Kamera</span> langsung di browser!
                        </p>

                        <div className="space-y-2.5">
                            <button
                                onClick={handleCameraModeClick}
                                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Camera className="w-4 h-4" />
                                <span>Buka Mode Kamera Sekarang</span>
                            </button>

                            <button
                                onClick={() => setShowArFailedModal(false)}
                                className="w-full py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                            >
                                Tetap di Studio 3D Interaktif
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Captured Photo Snapshot Modal */}
            {capturedPhoto && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-6">
                    <div className="w-full flex justify-between items-center text-white">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span>Hasil Foto Digfo AR</span>
                        </h3>
                        <button
                            onClick={() => setCapturedPhoto(null)}
                            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="my-auto max-w-sm rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl">
                        <img src={capturedPhoto} alt="Snapshot Digfo AR" className="w-full h-auto object-contain" />
                    </div>

                    <div className="w-full max-w-sm flex gap-3">
                        <a
                            href={capturedPhoto}
                            download={`digfo-ar-${object.id}.jpg`}
                            className="flex-1 py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Download className="w-4 h-4" />
                            <span>Simpan Foto</span>
                        </a>

                        <button
                            onClick={() => setCapturedPhoto(null)}
                            className="py-3 px-5 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

            {/* Educational Drawer Overlay */}
            {showInfo && (
                <div className="absolute inset-x-0 bottom-0 top-auto z-40 bg-slate-900/98 backdrop-blur-2xl rounded-t-[2.2rem] border-t border-slate-700/80 shadow-2xl p-6 transition-all max-h-[82vh] overflow-y-auto animate-in slide-in-from-bottom">
                    <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-5"></div>

                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                                Edukasi Digfo AR
                            </span>
                        </div>
                        <button
                            onClick={() => setShowInfo(false)}
                            className="text-slate-400 hover:text-white p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2">{object.title}</h2>
                    <p className="text-slate-300 text-xs leading-relaxed mb-6">{object.description}</p>

                    {/* Educational Facts */}
                    {object.educational_content?.facts && object.educational_content.facts.length > 0 && (
                        <div className="space-y-3 mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5 text-purple-400" />
                                <span>Fakta Menarik & Pembelajaran</span>
                            </h3>
                            <div className="space-y-2.5">
                                {object.educational_content.facts.map((fact: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="flex items-start text-xs bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60 gap-3"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <span className="text-slate-200 leading-relaxed">{fact}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interactive Hotspots / Labels */}
                    {object.educational_content?.labels && object.educational_content.labels.length > 0 && (
                        <div className="space-y-3 mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-purple-400" />
                                <span>Detail Struktur Objek</span>
                            </h3>
                            <div className="grid grid-cols-1 gap-2.5">
                                {object.educational_content.labels.map((lbl, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-slate-800/50 p-3 rounded-2xl border border-purple-500/20 text-xs"
                                    >
                                        <span className="font-bold text-purple-300 block mb-1">{lbl.name}</span>
                                        <span className="text-slate-300 leading-relaxed">{lbl.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Device Capability & Transparency Note */}
                    <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 text-[11px] text-slate-400 space-y-1.5 mb-2">
                        <span className="font-bold text-slate-300 flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                            <span>Informasi Kompatibilitas AR</span>
                        </span>
                        <p className="leading-relaxed">
                            {isApple
                                ? 'Perangkat Apple Anda mendukung AR Quick Look native menggunakan kamera LiDAR / sensor kedalaman iOS.'
                                : webxrSupported
                                ? 'Perangkat Anda mendukung WebXR Immersive AR untuk penempatan objek di dunia nyata.'
                                : 'Perangkat ini menggunakan Mode Kamera simulasi atau Studio 3D interaktif sehingga Anda tetap dapat belajar tanpa bergantung pada Google Play Services for AR.'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
