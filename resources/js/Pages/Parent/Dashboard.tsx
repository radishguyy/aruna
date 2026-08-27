import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, BrainCircuit, LineChart, ChevronRight, CheckCircle2, CircleDashed, BookOpen, Loader2, Sparkles, User as UserIcon } from 'lucide-react';
import { Link, router, Head } from '@inertiajs/react';
import ParentLayout from '@/Layouts/ParentLayout';

interface Child {
  id: string;
  nickname: string;
  total_points: number;
  progress?: {
    module_id: string;
    status: string;
    score: number;
    completed_at?: string;
  }[];
}

interface Conversation {
  id: string;
  prompt: string;
  response: string;
  sentiment_tag?: string;
  created_at: string;
}

interface Props {
  children: Child[];
  conversations: Conversation[];
}

const aiResponses = [
  "Terima kasih telah berbagi cerita. Ini adalah langkah yang baik untuk mulai mengenalkan pendidikan seksual usia dini. Anak-anak perlu tahu bahwa tubuh mereka berharga dan mereka punya hak untuk melindunginya.",
  "Sangat bagus bahwa Bunda memperhatikan ini! Untuk usia anak Anda, Bunda bisa mulai dengan menjelaskan nama-nama anggota tubuh secara benar, tanpa sebutan kiasan. Ini membangun fondasi yang kuat.",
  "Perasaan malu atau tidak nyaman pada anak itu wajar, Bunda. Yang penting adalah kita tidak memaksa, tapi menciptakan ruang aman. Katakan padanya: 'Perasaanmu itu baik, dan Bunda bangga kamu mau cerita.'",
  "Modul 'Batasan Diri' di Aruna sangat cocok untuk situasi ini. Anak Anda bisa belajar tentang sentuhan aman dan tidak aman melalui cerita interaktif yang menyenangkan.",
  "Tips dari kami: gunakan waktu mandi atau berpakaian sebagai momen alami untuk mengajarkan tentang area pribadi. Jangan lupa puji keberanian anak saat ia bertanya atau bercerita!",
  "Bunda bisa coba teknik '3 Lingkaran Kepercayaan': ajak si kecil menggambar 3 lingkaran — siapa yang boleh memeluk, siapa yang boleh menyentuh bahu, dan siapa yang harus jaga jarak.",
];

export default function ParentDashboard({ children = [], conversations: initialConversations = [] }: Props) {
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const safeChildren: Child[] = Array.isArray(children)
    ? children
    : ((children as any)?.data || []);
  const activeChild = safeChildren[selectedChildIndex] || null;
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [responseIndex, setResponseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const [chatInput, setChatInput] = useState('');
  
  // Format initial conversations to chatHistory safely
  const safeConversations: Conversation[] = Array.isArray(initialConversations)
    ? initialConversations
    : ((initialConversations as any)?.data || []);
  const formattedInitialHistory = safeConversations.flatMap(c => [
    { role: 'user', content: c.prompt },
    { role: 'ai', content: c.response }
  ]);

  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: `Halo Ayah & Bunda, saya EduGuide AI. Ada yang ingin didiskusikan tentang perkembangan buah hati Anda hari ini?` },
    ...formattedInitialHistory
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userPrompt = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', content: userPrompt }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aiResponses[responseIndex % aiResponses.length];
      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
      setResponseIndex(prev => prev + 1);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const progressData = activeChild?.progress || [];
  const completedCount = progressData.filter(p => p.status === 'completed').length;
  const totalCount = 13; // Total modules is 13

  return (
    <ParentLayout>
      <Head title="Parent Dashboard" />
      <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full">
        
        {/* Overview Head */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 relative z-10 tracking-tight">Ringkasan Hari Ini</h1>
            <p className="text-gray-500 font-medium relative z-10">
              {activeChild ? (
                <>Berikut merupakan ringkasan aktivitas <span className="font-bold text-indigo-600">{activeChild.nickname}</span> di Aruna.</>
              ) : (
                <>Silakan buat profil anak Anda untuk memantau progres belajarnya.</>
              )}
            </p>
          </div>

          {/* Child Select Tabs */}
          {safeChildren.length > 1 && (
            <div className="flex bg-gray-100 p-1.5 rounded-2xl relative z-10">
              {safeChildren.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedChildIndex(i);
                    setExpandedModule(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedChildIndex === i ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {c.nickname}
                </button>
              ))}
            </div>
          )}
        </div>

        {activeChild ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Progress Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col h-full"
            >
              <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-50">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <LineChart className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-1">Progres Akademik</div>
                  <div className="text-2xl font-black text-gray-900 leading-none">{completedCount} <span className="text-base text-gray-400 font-medium">dari {totalCount} Selesai</span></div>
                </div>
                <Link href={`/parent/select-child/${activeChild.id}`} className="ml-auto bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded-full flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20">
                  Mulai Bermain <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4 flex-1">
                {progressData.length > 0 ? (
                  progressData.slice(0, 4).map((prog, i) => {
                    const isCompleted = prog.status === 'completed';
                    const percentage = isCompleted ? 100 : 30;
                    const isExpanded = expandedModule === prog.module_id;
                    
                    return (
                      <div
                        key={i}
                        onClick={() => setExpandedModule(isExpanded ? null : prog.module_id)}
                        className="group cursor-pointer p-3 -mx-3 rounded-2xl hover:bg-gray-50/80 transition-colors"
                      >
                        <div className="flex justify-between items-center text-sm font-bold mb-2">
                          <span className="text-gray-800 flex items-center gap-2">
                             {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <CircleDashed className="w-4 h-4 text-amber-500 animate-spin-slow" />}
                             Misi ID: {prog.module_id}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-md ${isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {percentage}%
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-gray-100/80 rounded-full overflow-hidden shadow-inner relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`absolute top-0 left-0 h-full rounded-full ${isCompleted ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`}
                          />
                        </div>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                                {isCompleted && (
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    <span>Skor: <span className="font-bold text-emerald-600">{prog.score} Poin</span></span>
                                  </div>
                                )}
                                {prog.completed_at && (
                                  <div className="text-xs text-gray-400">
                                    Diselesaikan: {new Date(prog.completed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 text-gray-400 text-sm">
                    Anak Anda belum memulai misi petualangan.
                  </div>
                )}
              </div>
              
              <Link href="/parent/reports">
                <button className="w-full mt-8 py-4 bg-indigo-50 rounded-[1.2rem] text-sm text-indigo-600 font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors border border-indigo-100/50 cursor-pointer">
                  Lihat Laporan Lengkap <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>

            {/* EduGuide AI Chat */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[550px]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 p-6 text-white flex gap-4 items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20 relative z-10">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="font-extrabold text-lg tracking-wide">EduGuide AI</div>
                  <div className="text-xs text-indigo-100/80 font-medium">Asisten Parenting 24/7</div>
                </div>
              </div>
              
              {/* Chat Flow */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                {chatHistory.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-4 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                      msg.role === 'ai' 
                        ? 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm shadow-sm' 
                        : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-tr-sm shadow-indigo-500/20'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-3xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                      <span className="text-sm text-gray-400 font-medium">EduGuide sedang mengetik...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Tanya soal perkembangan ${activeChild.nickname}...`} 
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-[1.2rem] px-5 py-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-gray-700"
                    disabled={isTyping}
                  />
                  <button 
                    type="submit" 
                    className="bg-indigo-600 text-white px-5 rounded-[1.2rem] hover:bg-indigo-700 hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-50"
                    disabled={!chatInput.trim() || isTyping}
                  >
                    <Send className="w-5 h-5 ml-1" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-gray-200">
            <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada profil anak</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Silakan buat profil anak Anda terlebih dahulu untuk memulai pemantauan akademik dan bermain di area petualangan Aruna.
            </p>
            <Link href="/parent/children" className="inline-block bg-indigo-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
              Tambahkan Anak Baru
            </Link>
          </div>
        )}
      </div>
    </ParentLayout>
  );
}
