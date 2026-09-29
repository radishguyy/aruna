import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, VolumeX, ShieldAlert, Sparkles, RotateCcw } from 'lucide-react';
import { mockData } from '@/data/mockData';

interface SmartDigfoProps {
  moduleId: string | null;
  module?: any;
  onBack: () => void;
  onComplete?: (score: number) => void;
}

interface BodyPart {
  id: string;
  label: string;
  isPrivate: boolean;
  tooltip?: string;
}

export type VoicePersona = 'aruna' | 'hebat' | 'guru';

interface PersonaConfig {
  id: VoicePersona;
  name: string;
  role: string;
  badge: string;
  avatar: string;
  pitch: number;
  rate: number;
  themeColor: string;
  bgGradient: string;
  textColor: string;
  borderClass: string;
}

const PERSONAS: Record<VoicePersona, PersonaConfig> = {
  aruna: {
    id: 'aruna',
    name: 'Aruna',
    role: 'Sahabat Ceria',
    badge: '🌸 Sahabat Ceria',
    avatar: '🌸',
    pitch: 1.25,
    rate: 0.98,
    themeColor: 'rose',
    bgGradient: 'from-pink-500 to-rose-500',
    textColor: 'text-rose-600',
    borderClass: 'border-rose-300',
  },
  hebat: {
    id: 'hebat',
    name: 'Si Hebat',
    role: 'Pahlawan Berani',
    badge: '🦁 Pahlawan Berani',
    avatar: '🦁',
    pitch: 1.05,
    rate: 1.02,
    themeColor: 'amber',
    bgGradient: 'from-amber-500 to-orange-500',
    textColor: 'text-amber-600',
    borderClass: 'border-amber-300',
  },
  guru: {
    id: 'guru',
    name: 'Kakak Guru',
    role: 'Pendidik Lembut',
    badge: '🦉 Pendidik Lembut',
    avatar: '🦉',
    pitch: 1.12,
    rate: 0.92,
    themeColor: 'teal',
    bgGradient: 'from-teal-500 to-emerald-500',
    textColor: 'text-teal-600',
    borderClass: 'border-teal-300',
  },
};

const DEFAULT_BODY_PARTS: BodyPart[] = [
  { id: 'head', label: 'Kepala', isPrivate: false },
  { id: 'chest', label: 'Dada', isPrivate: true, tooltip: 'Area Pribadi: Tidak boleh disentuh kecuali oleh dokter saat ada ibu.' },
  { id: 'hands', label: 'Tangan', isPrivate: false },
  { id: 'legs', label: 'Kaki', isPrivate: false },
];

// Helper to synthesize cheerful sound effects using Web Audio API
const playChimeSound = (isPrivate: boolean) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isPrivate) {
      // Gentle warning 2-tone chime: High-alert but friendly
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      // Cheerful cartoon bubble sparkle sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.1);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (e) {
    // Graceful fallback if audio context is restricted
  }
};

export default function SmartDigfo({ moduleId, module: moduleProp, onBack, onComplete }: SmartDigfoProps) {
  const moduleData = moduleProp || mockData.modules.find(m => m.id === moduleId);
  const [activePart, setActivePart] = useState<BodyPart | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>('aruna');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Pre-load available voices and handle cleanup on unmount
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
      }
    };
    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!moduleData) {
    return <div>Module not found</div>;
  }

  const contentData = moduleData.content_data || {};
  const bodyParts: BodyPart[] = (contentData.bodyParts && contentData.bodyParts.length > 0)
    ? contentData.bodyParts
    : DEFAULT_BODY_PARTS;

  // Generate personality-driven spoken scripts with warmth, character, and safety education
  const getPersonaSpeechText = (persona: VoicePersona, part: BodyPart): string => {
    const isPrivate = part.isPrivate;
    const label = part.label;

    let detail = part.tooltip;
    if (!detail || detail.trim() === '') {
      switch (part.id) {
        case 'head':
          detail = 'Kepala tempat kita berpikir dan tersenyum. Boleh diusap dengan lembut dan penuh kasih sayang oleh orang tua.';
          break;
        case 'hands':
          detail = 'Tangan digunakan untuk bersalaman, menggambar, dan bermain bersama teman-teman.';
          break;
        case 'legs':
          detail = 'Kaki membantumu berdiri gagah, melompat, dan berlari dengan aman.';
          break;
        case 'heart':
          detail = 'Hati memberi sinyal saat kamu merasa bahagia, aman, dan nyaman bersama keluarga.';
          break;
        case 'belly':
          detail = 'Perut bisa terasa berdebar saat kamu bingung atau takut. Dengarkan sinyal tubuhmu dan ceritakan pada orang tua.';
          break;
        case 'chest':
          detail = 'Dada adalah area pribadi. Hanya boleh diperiksa oleh dokter ketika didampingi ayah atau ibu.';
          break;
        case 'inner':
          detail = 'Area yang ditutupi pakaian dalam adalah area privat yang harus selalu kita lindungi.';
          break;
        case 'parent':
          detail = 'Orang tua adalah pahlawan terdekat yang selalu siap mendengar, memeluk, dan melindungimu.';
          break;
        case 'teacher':
          detail = 'Guru di sekolah adalah pelindungmu. Jangan ragu bertanya dan bercerita.';
          break;
        default:
          detail = isPrivate
            ? 'Ini adalah area pribadi khusus dirimu sendiri.'
            : 'Ini adalah area umum yang aman untuk bersalaman dan belajar bersama.';
      }
    }

    // Clean up dry formal prefixes like "Area Pribadi:" for natural audio delivery
    detail = detail.replace(/^(Area Pribadi:\s*|Penting:\s*)/i, '');

    switch (persona) {
      case 'hebat':
        if (isPrivate) {
          return `Pahlawan cilik, waspada! ${label} adalah area pribadi rahasiamu! ${detail}. Ingat jurus Si Hebat: Berani bilang TIDAK, segera lari, dan lapor ke orang tuamu!`;
        } else {
          return `Si Hebat siap beraksi! Ini adalah ${label}. ${detail}. Hebat sekali, kamu semakin tangguh mengenali tubuhmu!`;
        }

      case 'guru':
        if (isPrivate) {
          return `Anak pintar, perhatikan baik-baik ya. Bagian ${label} adalah area yang sangat pribadi dan berharga. ${detail}. Bila ada yang membuatmu tidak nyaman, selalu ceritakan pada guru atau orang tua.`;
        } else {
          return `Mari kita pelajari bersama ya sayang. Ini adalah ${label}. ${detail}. Rawat dan syukuri anugerah tubuh ini dengan baik ya.`;
        }

      case 'aruna':
      default:
        if (isPrivate) {
          return `Halo sahabat kecilku! Bagian ${label} adalah area pribadi yang sangat berharga. ${detail}. Tubuhmu adalah milikmu sendiri, berani bersuara ya!`;
        } else {
          return `Wah, kamu menyentuh ${label}! ${detail}. Asyik sekali belajar mengenal tubuh bersamaku!`;
        }
    }
  };

  const speakText = (text: string, personaKey: VoicePersona) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const persona = PERSONAS[personaKey];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.pitch = persona.pitch;
    utterance.rate = persona.rate;
    utterance.volume = 1.0;

    // Pick best available Indonesian natural voice
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v =>
      (v.lang === 'id-ID' || v.lang === 'id_ID' || v.lang.startsWith('id') || v.lang.startsWith('in')) &&
      !v.name.toLowerCase().includes('english')
    ) || voices.find(v => v.lang.startsWith('id') || v.lang.startsWith('in'));

    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    activeUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePartClick = (partId: string) => {
    const part = bodyParts.find(p => p.id === partId);
    if (part) {
      setActivePart(part);
      if (!isMuted) {
        playChimeSound(part.isPrivate);
      }
      const textToSpeak = getPersonaSpeechText(selectedPersona, part);
      setSpokenText(textToSpeak);
      speakText(textToSpeak, selectedPersona);
    }
  };

  const handlePersonaChange = (newPersona: VoicePersona) => {
    setSelectedPersona(newPersona);
    if (activePart) {
      const textToSpeak = getPersonaSpeechText(newPersona, activePart);
      setSpokenText(textToSpeak);
      speakText(textToSpeak, newPersona);
    }
  };

  const handleReplayVoice = () => {
    if (activePart && spokenText) {
      speakText(spokenText, selectedPersona);
    }
  };

  const toggleMute = () => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  };

  const currentPersona = PERSONAS[selectedPersona];

  return (
    <div className="flex flex-col h-full min-h-[85vh] bg-gradient-to-b from-rose-50/60 via-pink-50/30 to-amber-50/40 font-sans rounded-3xl pb-36 md:pb-12 relative overflow-hidden">

      {/* Top Navigation Bar */}
      <div className="p-4 md:p-6 flex items-center justify-between z-20 sticky top-0 bg-white/40 backdrop-blur-md border-b border-rose-100/60">
        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onBack();
          }}
          className="flex items-center gap-2 text-rose-600 hover:text-rose-800 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm font-bold transition-all hover:shadow-md hover:scale-105 active:scale-95 text-sm"
        >
          <ChevronLeft className="w-5 h-5 border-2 border-current rounded-full" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="font-bold text-xs md:text-sm tracking-wide bg-white/80 text-rose-800 px-4 py-2 rounded-full shadow-sm border border-rose-200 hidden sm:flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Smart Digfo : {moduleData.title}</span>
          </div>

          {/* Sound Mute / Unmute Button */}
          <button
            onClick={toggleMute}
            className={`p-2.5 rounded-full border transition-all ${isMuted ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-200'}`}
            title={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {activePart && (
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                if (onComplete) onComplete(100);
                else onBack();
              }}
              className="flex items-center gap-2 text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 px-5 py-2.5 rounded-full shadow-md shadow-rose-500/20 font-black transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <span>Misi Selesai! 🎉</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 flex flex-col items-center relative px-4 w-full max-w-xl mx-auto pt-2">

        {/* Module Title & Character Voice Companion Switcher */}
        <div className="text-center mb-6 relative z-20 w-full flex flex-col items-center">
          <div className="inline-flex bg-white/90 p-3 rounded-3xl mb-3 shadow-md shadow-rose-200/50 border border-rose-100 items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-rose-500" />
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-rose-950 font-grandstander drop-shadow-sm tracking-tight mb-2">
            {moduleData.title}
          </h1>

          {/* Character Companion Switcher */}
          <div className="bg-white/85 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-rose-200/70 inline-flex items-center gap-1.5 mt-2 max-w-full overflow-x-auto">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider px-2 hidden sm:inline">
              Suara Pendamping:
            </span>
            {(Object.keys(PERSONAS) as VoicePersona[]).map((key) => {
              const p = PERSONAS[key];
              const isSelected = selectedPersona === key;
              return (
                <button
                  key={key}
                  onClick={() => handlePersonaChange(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? `bg-gradient-to-r ${p.bgGradient} text-white shadow-sm scale-105`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                  }`}
                >
                  <span>{p.avatar}</span>
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-xs md:text-sm font-bold text-rose-700 bg-rose-100/70 px-5 py-1.5 rounded-full inline-block backdrop-blur-sm border border-rose-200 shadow-sm animate-pulse">
            👆 Sentuh bagian tubuh yang berkedip untuk mendengar suaraku!
          </p>
        </div>

        {/* Visual Map / Graphic Character Area */}
        <div className="relative w-full max-w-[280px] aspect-[1/1.5] bg-white rounded-[3rem] shadow-2xl border-4 border-rose-100/80 flex items-center justify-center overflow-visible">
          <svg viewBox="0 0 100 200" className="w-[82%] h-[92%] drop-shadow-xl z-10">
            {/* Character Base - Stylized Cute Silhouette */}
            <rect x="25" y="45" width="50" height="70" rx="20" fill="#FFE3E3" />
            <circle cx="50" cy="25" r="18" fill="#FFE3E3" />
            <rect x="15" y="50" width="12" height="40" rx="6" fill="#FFE3E3" transform="rotate(15 21 50)" />
            <rect x="73" y="50" width="12" height="40" rx="6" fill="#FFE3E3" transform="rotate(-15 79 50)" />
            <rect x="35" y="110" width="12" height="50" rx="6" fill="#FFE3E3" />
            <rect x="53" y="110" width="12" height="50" rx="6" fill="#FFE3E3" />

            {/* Cute Face Details */}
            <circle cx="43" cy="23" r="2.5" fill="#5A3E3E" />
            <circle cx="57" cy="23" r="2.5" fill="#5A3E3E" />
            <ellipse cx="50" cy="30" rx="3" ry="2" fill="#E07A7A" />

            {/* Interactive Overlay Targets matching generic ids */}
            {bodyParts.map((part) => {
              let shapeProps = {};
              const isBlinking = !activePart || activePart.id !== part.id;

              switch (part.id) {
                case 'head': shapeProps = { cx: "50", cy: "25", r: "20" }; break;
                case 'chest': shapeProps = { x: "30", y: "50", width: "40", height: "40", rx: "15" }; break;
                case 'hands': shapeProps = { x: "10", y: "65", width: "80", height: "30", rx: "10" }; break;
                case 'legs': shapeProps = { x: "30", y: "120", width: "40", height: "40", rx: "10" }; break;
                case 'heart': shapeProps = { cx: "40", cy: "60", r: "12" }; break;
                case 'belly': shapeProps = { cx: "50", cy: "90", r: "15" }; break;
                case 'inner': shapeProps = { x: "35", y: "110", width: "30", height: "30", rx: "10" }; break;
                case 'parent': shapeProps = { x: "20", y: "40", width: "30", height: "60", rx: "10" }; break;
                case 'teacher': shapeProps = { x: "50", y: "40", width: "30", height: "60", rx: "10" }; break;
                case 'hug': shapeProps = { cx: "50", cy: "65", r: "25" }; break;
                case 'highfive': shapeProps = { x: "10", y: "65", width: "15", height: "15", rx: "7" }; break;
                case 'stranger_hand': shapeProps = { cx: "20", cy: "80", r: "15" }; break;
                case 'secret_mouth': shapeProps = { cx: "50", cy: "35", r: "5" }; break;
                case 'mouth': shapeProps = { cx: "50", cy: "32", r: "4" }; break;
                case 'bottom': shapeProps = { x: "40", y: "115", width: "20", height: "20", rx: "10" }; break;
                case 'say_no': shapeProps = { cx: "65", cy: "25", r: "10" }; break;
                case 'run': shapeProps = { x: "30", y: "140", width: "40", height: "15", rx: "7" }; break;
                case 'tell_adult': shapeProps = { x: "70", y: "40", width: "20", height: "40", rx: "10" }; break;
                default: shapeProps = { cx: "50", cy: "100", r: "10" };
              }

              const isCircle = 'cx' in shapeProps;
              const NodeComponent = isCircle ? motion.circle : motion.rect;

              return (
                <NodeComponent
                  key={part.id}
                  {...(shapeProps as React.ComponentProps<typeof motion.circle> & React.ComponentProps<typeof motion.rect>)}
                  fill={part.isPrivate ? "#f43f5e" : "#fbbf24"}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: isBlinking ? [0.4, 0.85, 0.4] : 1 }}
                  transition={{ duration: 1.4, repeat: isBlinking ? Infinity : 0 }}
                  className={`cursor-pointer transition-all stroke-white stroke-2 ${
                    part.isPrivate ? 'hover:fill-rose-600' : 'hover:fill-amber-500'
                  }`}
                  onClick={() => handlePartClick(part.id)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                />
              );
            })}
          </svg>

          {/* Decorative backdrop shapes */}
          <div className="absolute -z-10 translate-x-[40%] translate-y-[-20%] w-48 h-48 bg-amber-200/80 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute -z-10 translate-x-[-40%] translate-y-[40%] w-48 h-48 bg-rose-300/80 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
      </div>

      {/* Floating Animated Audio Explanation Card */}
      <AnimatePresence>
        {activePart && (
          <motion.div
            initial={{ y: 220, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 220, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed md:absolute bottom-0 md:bottom-6 left-0 right-0 md:left-auto md:right-8 lg:right-1/4 md:w-[460px] z-50 p-4 w-full"
          >
            <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border-2 border-white/80 p-6 relative overflow-hidden ring-4 ring-rose-100/50">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-300 via-pink-100 to-transparent pointer-events-none"></div>

              {/* Close Card Button */}
              <button
                onClick={() => {
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setActivePart(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold p-2 z-20 bg-gray-100/90 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                title="Tutup"
              >
                ✕
              </button>

              <div className="flex items-start gap-4 relative z-10 w-full">
                {/* Speaker Character Avatar with Pulsing Wave Indicator */}
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-lg relative transition-transform ${
                      isSpeaking ? 'scale-105 ring-4 ring-rose-300 ring-offset-2' : ''
                    } bg-gradient-to-br ${currentPersona.bgGradient}`}
                  >
                    <span>{currentPersona.avatar}</span>

                    {/* Animated Sound Wave Rings */}
                    {isSpeaking && (
                      <motion.div
                        className="absolute inset-0 rounded-[1.5rem] border-2 border-rose-400"
                        animate={{ scale: [1, 1.35], opacity: [0.8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      />
                    )}
                  </div>

                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">
                    {currentPersona.name}
                  </span>
                </div>

                {/* Content Information */}
                <div className="pr-6 w-full flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className={`inline-flex px-3 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase ${
                        activePart.isPrivate
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {activePart.isPrivate ? '🛡️ Area Privat / Sensitif' : '✨ Area Umum / Terbuka'}
                    </span>

                    {/* Live Waveform Indicator */}
                    {isSpeaking && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-bold">
                        <span>Sedang Berbicara</span>
                        <div className="flex items-center gap-0.5 h-3 ml-1">
                          {[0, 1, 2, 3].map((i) => (
                            <motion.span
                              key={i}
                              className="w-0.5 bg-rose-500 rounded-full"
                              animate={{ height: [3, 12, 5, 14, 3] }}
                              transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.12 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 font-grandstander leading-none mb-2">
                    {activePart.label}
                  </h3>

                  {/* Character Spoken Script Text */}
                  <div className="bg-gradient-to-r from-gray-50/90 to-rose-50/40 p-3.5 rounded-2xl border border-rose-100/80 text-xs md:text-sm text-gray-700 font-medium leading-relaxed relative shadow-inner">
                    <p className="italic">
                      "{spokenText || activePart.tooltip || `${activePart.label} adalah bagian tubuh yang berharga.`}"
                    </p>
                  </div>

                  {/* Audio Controls (Replay Voice & Companion Toggle) */}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <button
                      onClick={handleReplayVoice}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-100/80 hover:bg-rose-200/90 px-3.5 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Suara</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {(Object.keys(PERSONAS) as VoicePersona[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => handlePersonaChange(key)}
                          className={`w-7 h-7 rounded-full text-xs flex items-center justify-center border transition-all ${
                            selectedPersona === key
                              ? 'border-rose-400 bg-rose-50 scale-110 shadow-sm'
                              : 'border-gray-200 bg-white opacity-60 hover:opacity-100'
                          }`}
                          title={`Ganti suara ke ${PERSONAS[key].name}`}
                        >
                          {PERSONAS[key].avatar}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

