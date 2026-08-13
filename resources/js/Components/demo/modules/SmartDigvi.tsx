import React from 'react';
import { ChevronLeft, CheckCircle, Video } from 'lucide-react';
import { mockData } from '@/data/mockData';

interface SmartDigviProps {
  moduleId: string | null;
  onBack: () => void;
  onComplete?: (score: number) => void;
}

export default function SmartDigvi({ moduleId, onBack, onComplete }: SmartDigviProps) {
  const moduleData = mockData.modules.find(m => m.id === moduleId);
  
  if (!moduleData || moduleData.type !== 'digvi') {
    return <div>Module not found</div>;
  }

  const { youtube_id, description } = moduleData.content_data as { youtube_id: string, description?: string };
  const youtubeUrl = `https://www.youtube.com/embed/${youtube_id}?autoplay=0&rel=0&showinfo=0`;

  return (
    <div className="flex flex-col h-full min-h-[80vh] font-sans bg-blue-50/30 rounded-3xl pb-24 md:pb-0">
      <div className="p-4 md:p-6 flex items-center justify-between z-10 sticky top-0">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm font-bold transition-all hover:shadow-md"
        >
          <ChevronLeft className="w-5 h-5 border-2 border-current rounded-full" />
          <span>Kembali</span>
        </button>
        <div className="font-bold text-sm tracking-wide bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-inner hidden sm:block">
          Smart Digvi : {moduleData.title}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center pt-2 md:pt-4 px-4 w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-8 text-center text-blue-900">
           <div className="bg-blue-100 p-4 rounded-3xl mb-4 shadow-sm border border-blue-200">
             <Video className="w-10 h-10 text-blue-500" />
           </div>
           <h1 className="text-2xl md:text-4xl font-black font-grandstander drop-shadow-sm">{moduleData.title}</h1>
           {description && <p className="mt-3 text-sm md:text-base font-medium opacity-80 max-w-md">{description}</p>}
        </div>

        <div className="w-full aspect-video bg-black rounded-[2rem] shadow-2xl relative overflow-hidden ring-8 ring-white/50">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src={youtubeUrl} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen 
          />
        </div>

        <div className="mt-12 mb-8 text-center w-full max-w-md">
          <button 
            onClick={() => {
              if (onComplete) {
                onComplete(100);
              } else {
                onBack();
              }
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-black py-4 md:py-5 px-6 rounded-[2rem] flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/30 text-lg"
          >
            <CheckCircle className="w-7 h-7" /> Misi Selesai!
          </button>
        </div>
      </div>
    </div>
  );
}
