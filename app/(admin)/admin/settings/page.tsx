"use client";
import React, { useState } from 'react';
import { 
  Settings, 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Key, 
  Save, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockData } from '@/data/mockData';

export default function AdminSettingsPage() {
  const [contactInfo, setContactInfo] = useState(mockData.contact_info);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would update the backend here.
      // For demo, we just update local state and mockData (though it won't persist across reloads).
      Object.assign(mockData.contact_info, contactInfo);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="font-sans text-gray-100 flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative z-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2">Platform Settings</h1>
          <p className="text-gray-400 text-[15px] font-medium tracking-wide">Manage global platform configurations and contact info.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact info form */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A101C]/80 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-black/20"
          >
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg"><Mail className="w-5 h-5 text-red-500" /></div> Contact Details
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Official Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="email" 
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      className="w-full bg-[#070B14] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      className="w-full bg-[#070B14] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Location / Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                    className="w-full bg-[#070B14] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">WhatsApp ID (Intl Format)</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={contactInfo.whatsapp}
                      onChange={(e) => setContactInfo({...contactInfo, whatsapp: e.target.value})}
                      className="w-full bg-[#070B14] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Web3Forms Access Key</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={contactInfo.web3forms_key}
                      onChange={(e) => setContactInfo({...contactInfo, web3forms_key: e.target.value})}
                      className="w-full bg-[#070B14] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <AnimatePresence>
                  {showSuccess && (
                     <motion.div 
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -10 }}
                       className="flex items-center gap-2 text-emerald-400 text-sm font-bold"
                     >
                       <CheckCircle2 className="w-5 h-5" /> All changes saved successfully!
                     </motion.div>
                  )}
                </AnimatePresence>
                <button 
                  disabled={isSaving}
                  className="ml-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                >
                  {isSaving ? <RefreshCw className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                  {isSaving ? 'Processing...' : 'Update Settings'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Info card */}
        <div className="space-y-8">
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-red-600 to-red-800 p-8 rounded-[2rem] text-white shadow-xl shadow-red-600/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
            <Settings className="w-12 h-12 mb-6 opacity-20" />
            <h3 className="text-xl font-bold mb-3">Integrasi Web3Forms</h3>
            <p className="text-sm text-red-100 leading-relaxed mb-6">
              Web3Forms memungkinkan form pengiriman pesan bekerja tanpa backend. Gunakan Access Key anda agar pesan dari pengunjung masuk ke email secara real-time.
            </p>
            <a 
              href="https://web3forms.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold transition-all"
            >
              Get Access Key →
            </a>
          </motion.div>

          <div className="bg-[#0A101C]/80 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] shadow-xl shadow-black/20">
             <h4 className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-6">System Status</h4>
             <div className="gap-4 flex flex-col">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-400">Database Engine</span>
                   <span className="text-emerald-400 font-bold">Operational</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-400">Content API</span>
                   <span className="text-emerald-400 font-bold">Latency 12ms</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-400">AI Assistant</span>
                   <span className="text-emerald-400 font-bold">Online</span>
                </div>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
}
