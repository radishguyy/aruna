"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockData } from '@/data/mockData';
import { Send, BrainCircuit, LineChart, ChevronRight, CheckCircle2, CircleDashed } from 'lucide-react';

export default function ParentOverviewPage() {
  const child = mockData.children[0];
  const progressData = mockData.progress;
  const modules = mockData.modules;
  
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: `Halo Bunda Rara, saya EduGuide AI. Ada yang ingin didiskusikan tentang perkembangan ${child.nickname} hari ini?` }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatHistory([...chatHistory, { role: 'user', content: chatInput }]);
    setChatInput('');

    // Mock AI response
    setTimeout(() => {
      const mockResponse = mockData.ai_conversations[0]?.response || "Terima kasih telah berbagi cerita. Ini adalah langkah yang baik untuk mulai mengenalkan pendidikan seksual usia dini.";
      setChatHistory(prev => [...prev, { role: 'ai', content: mockResponse }]);
    }, 1000);
  };

  const completedCount = progressData.filter(p => p.status === 'completed').length;
  const totalCount = modules.length;

  return (
    <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full">
      
      {/* Overview Head */}
      <div className="relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-32 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 relative z-10 tracking-tight">Ringkasan Hari Ini</h1>
        <p className="text-gray-500 font-medium relative z-10">Berikut merupakan ringkasan aktivitas <span className="font-bold text-indigo-600">{child.nickname}</span> di Aruna.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Progress Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full"
        >
          <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-50">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <LineChart className="w-7 h-7" />
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-1">Progres Akademik</div>
              <div className="text-2xl font-black text-gray-900 leading-none">{completedCount} <span className="text-base text-gray-400 font-medium">dari {totalCount} Selesai</span></div>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            {progressData.map((prog, i) => {
              const mod = modules.find(m => m.id === prog.module_id);
              if (!mod) return null;
              
              const isCompleted = prog.status === 'completed';
              const percentage = isCompleted ? 100 : 30; // mock 30% for started
              
              return (
                <div key={i} className="group cursor-pointer">
                  <div className="flex justify-between items-center text-sm font-bold mb-2">
                    <span className="text-gray-800 flex items-center gap-2">
                       {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <CircleDashed className="w-4 h-4 text-amber-500" />}
                       {mod.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-md ${isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100/80 rounded-full overflow-hidden shadow-inner relative">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="w-full mt-8 py-4 bg-indigo-50 rounded-[1.2rem] text-sm text-indigo-600 font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors border border-indigo-100/50">
            Lihat Laporan Lengkap <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* EduGuide AI Chat */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col h-[550px]"
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
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 custom-scrollbar">
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
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tanya soal tips parenting..." 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-[1.2rem] px-5 py-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-gray-700"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 text-white px-5 rounded-[1.2rem] hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:shadow-none"
                disabled={!chatInput.trim()}
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
