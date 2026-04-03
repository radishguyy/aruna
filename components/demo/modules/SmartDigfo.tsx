import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, ShieldAlert } from 'lucide-react';
import { mockData } from '@/data/mockData';

interface SmartDigfoProps {
  moduleId: string | null;
  onBack: () => void;
}

interface BodyPart {
  id: string;
  label: string;
  isPrivate: boolean;
  tooltip?: string;
}

export default function SmartDigfo({ moduleId, onBack }: SmartDigfoProps) {
  const moduleData = mockData.modules.find(m => m.id === moduleId);
  const [activePart, setActivePart] = useState<BodyPart | null>(null);

  if (!moduleData || moduleData.type !== 'digfo') {
    return <div>Module not found</div>;
  }

  const { bodyParts } = moduleData.content_data as { bodyParts: BodyPart[] };

  const handlePartClick = (partId: string) => {
    const part = bodyParts.find(p => p.id === partId);
    if (part) {
      setActivePart(part);
      const utterance = new SpeechSynthesisUtterance(part.tooltip || `${part.label}. Ini adalah area ${part.isPrivate ? 'pribadi' : 'aman'}.`);
      utterance.lang = 'id-ID';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[80vh] bg-rose-50/50 font-sans rounded-3xl pb-32 relative overflow-hidden">

      <div className="p-4 md:p-6 flex items-center justify-between z-10 sticky top-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-rose-600 hover:text-rose-800 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm font-bold transition-all hover:shadow-md"
        >
          <ChevronLeft className="w-5 h-5 border-2 border-current rounded-full" />
          <span>Kembali</span>
        </button>
        <div className="font-bold text-sm tracking-wide bg-rose-100 text-rose-800 px-4 py-2 rounded-full shadow-inner hidden sm:block">
          Smart Digfo : {moduleData.title}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center relative px-4 w-full max-w-lg mx-auto">
        <div className="text-center mt-2 mb-8 relative z-20">
          <div className="inline-flex bg-rose-100 p-4 rounded-3xl mb-4 shadow-sm border border-rose-200 justify-center">
            <ShieldAlert className="w-10 h-10 text-rose-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-rose-900 font-grandstander drop-shadow-sm">{moduleData.title}</h1>
          <p className="mt-3 text-sm font-bold text-rose-700 bg-rose-100/60 px-6 py-2 rounded-full inline-block backdrop-blur-sm border border-rose-200">
            Sentuh bagian yang berkedip!
          </p>
        </div>

        {/* Visual Map / Graphic Area */}
        <div className="relative w-full max-w-[280px] aspect-[1/1.5] bg-white rounded-[3rem] shadow-2xl border-4 border-rose-100 flex items-center justify-center overflow-visible">
          <svg viewBox="0 0 100 200" className="w-[80%] h-[90%] drop-shadow-xl z-10">
            {/* Character Base - Stylized */}
            <rect x="25" y="45" width="50" height="70" rx="20" fill="#FFE0E0" />
            <circle cx="50" cy="25" r="18" fill="#FFE0E0" />
            <rect x="15" y="50" width="12" height="40" rx="6" fill="#FFE0E0" transform="rotate(15 21 50)" />
            <rect x="73" y="50" width="12" height="40" rx="6" fill="#FFE0E0" transform="rotate(-15 79 50)" />
            <rect x="35" y="110" width="12" height="50" rx="6" fill="#FFE0E0" />
            <rect x="53" y="110" width="12" height="50" rx="6" fill="#FFE0E0" />

            {/* Interactive Overlay Targets matching generic ids */}
            {bodyParts.map((part) => {
              // Dynamic positions based on ID
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
                  animate={{ opacity: isBlinking ? [0.4, 0.8, 0.4] : 1 }}
                  transition={{ duration: 1.5, repeat: isBlinking ? Infinity : 0 }}
                  className={`cursor-pointer transition-all stroke-white stroke-2 ${part.isPrivate ? 'hover:fill-rose-600' : 'hover:fill-amber-500'}`}
                  onClick={() => handlePartClick(part.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              );
            })}
          </svg>

          {/* Decorative backdrop shapes */}
          <div className="absolute -z-10 translate-x-[40%] translate-y-[-20%] w-48 h-48 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute -z-10 translate-x-[-40%] translate-y-[40%] w-48 h-48 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
      </div>

      <AnimatePresence>
        {activePart && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed md:absolute bottom-0 md:bottom-6 left-0 right-0 md:left-auto md:right-8 lg:right-1/4 md:w-[450px] z-50 p-4 w-full"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border-2 border-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-300 via-transparent to-transparent"></div>

              <button onClick={() => setActivePart(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold p-2 z-20 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">✕</button>

              <div className="flex items-start gap-4 relative z-10 w-full">
                <div className={`p-4 rounded-[1.5rem] flex-shrink-0 border bg-gradient-to-br ${activePart.isPrivate ? 'from-rose-100 to-rose-200 border-rose-300 text-rose-600 shadow-rose-200 shadow-inner' : 'from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-600 shadow-emerald-200 shadow-inner'}`}>
                  <Volume2 className="w-8 h-8" />
                </div>
                <div className="pr-6 w-full">
                  <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2 ${activePart.isPrivate ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {activePart.isPrivate ? ' Area Sensitif' : 'Area Umum'}
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-gray-800 font-grandstander leading-none break-words whitespace-normal max-w-[200px]">
                    {activePart.label}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50/80 p-3 rounded-2xl border border-gray-100 break-words whitespace-normal">
                    {activePart.tooltip || (activePart.isPrivate ? "Penting: Sentuhan orang lain tidak boleh dilakukan di sini!" : "Boleh disentuh secara wajar seperti saat bersalaman.")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
