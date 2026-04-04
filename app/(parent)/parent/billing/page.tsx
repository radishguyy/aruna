"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Zap, CheckCircle2, X, Check, AlertTriangle } from 'lucide-react';
import { mockData } from '@/data/mockData';

export default function BillingPage() {
  const user = mockData.users[0];
  const plans = mockData.pricing;
  const [currentPlan, setCurrentPlan] = useState(user.subscription_status);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const handleUpgrade = () => {
    if (!selectedPlan) return;
    setUpgradeSuccess(true);
    setCurrentPlan(selectedPlan);
    setTimeout(() => {
      setShowUpgradeModal(false);
      setUpgradeSuccess(false);
      setSelectedPlan(null);
    }, 2000);
  };

  const handleCancel = () => {
    setCancelSuccess(true);
    setTimeout(() => {
      setCurrentPlan('free');
      setShowCancelModal(false);
      setCancelSuccess(false);
    }, 2000);
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'free': return 'border-gray-200 hover:border-gray-300';
      case 'premium': return 'border-indigo-200 hover:border-indigo-400 ring-indigo-500/20';
      case 'institution': return 'border-purple-200 hover:border-purple-400 ring-purple-500/20';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full">
      <div className="relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight relative z-10">Langganan</h1>
        <p className="text-gray-500 font-medium relative z-10">Kelola paket layanan dan tagihan Aruna Anda.</p>
      </div>

      {/* Current Plan Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-900 via-[#312e81] to-purple-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/30 border border-indigo-800"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
        
        <Crown className="absolute -top-16 -right-16 w-80 h-80 opacity-[0.05] -rotate-12" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[11px] font-bold uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3 text-amber-300" />
              Paket Aktif
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3 capitalize text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">Aruna {currentPlan}</h2>
            <p className="text-indigo-200 text-sm md:text-base font-medium flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4 text-emerald-400" />
               Valid dan aktif hingga <span className="font-bold text-white">31 Desember 2026</span>
            </p>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full bg-white text-indigo-900 font-black px-8 py-4 rounded-[1.2rem] hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 border border-white cursor-pointer"
            >
              Perbarui Paket
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              className="w-full text-indigo-200/80 hover:text-white px-8 py-3 text-[13px] font-bold transition-colors hover:bg-white/5 rounded-xl cursor-pointer"
            >
              Batalkan Langganan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Plan Features Quick View */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
        <h2 className="text-lg font-black text-gray-900 mb-6">Fitur Paket Anda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(() => {
            const plan = plans.find(p => p.id === currentPlan) || plans[0];
            return plan.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ));
          })()}
        </div>
      </motion.div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => { if (!upgradeSuccess) { setShowUpgradeModal(false); setSelectedPlan(null); } }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {!upgradeSuccess ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-gray-900">Pilih Paket</h3>
                    <button onClick={() => { setShowUpgradeModal(false); setSelectedPlan(null); }} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="space-y-3">
                    {plans.map(plan => (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${getPlanColor(plan.id)} ${
                          selectedPlan === plan.id ? 'ring-2 border-indigo-400 bg-indigo-50/30' : 'bg-white'
                        } ${plan.id === currentPlan ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-gray-900">{plan.name}</span>
                            {plan.id === currentPlan && <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-bold">Saat Ini</span>}
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlan === plan.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                            {selectedPlan === plan.id && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <div className="text-lg font-black text-indigo-600 mb-1">{plan.price}{plan.period ? `/${plan.period}` : ''}</div>
                        <p className="text-xs text-gray-500 mb-3">{plan.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {plan.features.map((f, i) => (
                            <span key={i} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{f}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => { setShowUpgradeModal(false); setSelectedPlan(null); }} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer">Batal</button>
                    <button
                      onClick={handleUpgrade}
                      disabled={!selectedPlan}
                      className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      Konfirmasi Paket
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Paket Berhasil Diubah!</h3>
                  <p className="text-sm text-gray-500">Paket Anda telah diperbarui. Nikmati fitur barunya!</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => { if (!cancelSuccess) setShowCancelModal(false); }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
            >
              {!cancelSuccess ? (
                <>
                  <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 text-center mb-2">Batalkan Langganan?</h3>
                  <p className="text-sm text-gray-500 text-center mb-8">Anda akan kehilangan akses ke fitur premium. Paket akan kembali ke Free di akhir periode billing.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setShowCancelModal(false)} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer">Tetap Berlangganan</button>
                    <button onClick={handleCancel} className="flex-1 py-3.5 bg-red-600 text-white rounded-2xl text-sm font-bold hover:bg-red-700 transition-colors cursor-pointer">Ya, Batalkan</button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Langganan Dibatalkan</h3>
                  <p className="text-sm text-gray-500">Paket Anda akan kembali ke Free di akhir periode.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
