"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockData } from '@/data/mockData';
import { Building2, MapPin, Key, Calendar, Shield, CheckCircle, AlertTriangle, Copy, Check, RefreshCw } from 'lucide-react';

export default function TeacherLicense() {
  const institution = mockData.institutions[0];
  const [copied, setCopied] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [renewRequested, setRenewRequested] = useState(false);

  const expiresAt = new Date(institution.license_expires_at);
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysUntilExpiry <= 90;
  const isExpired = daysUntilExpiry <= 0;

  const copyLicenseCode = () => {
    navigator.clipboard.writeText(institution.license_code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRenewRequest = () => {
    setRenewRequested(true);
    setTimeout(() => {
      setShowRenewModal(false);
      setRenewRequested(false);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-12 space-y-8 font-sans max-w-3xl mx-auto">

      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 relative z-10 tracking-tight">Info Instansi</h1>
        <p className="text-gray-500 font-medium relative z-10">Detail institusi dan status lisensi Aruna.</p>
      </div>

      {/* Institution Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-teal-100/30 rounded-full blur-3xl"></div>

        <div className="flex items-center gap-6 mb-8 relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-teal-500/30">
            <Building2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">{institution.name}</h2>
            <p className="text-gray-500 flex items-center gap-1.5 mt-1 text-sm">
              <MapPin className="w-4 h-4" /> {institution.address}
            </p>
          </div>
        </div>

        <div className="space-y-0 relative z-10">
          {/* License Code */}
          <div className="flex items-center justify-between py-5 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                <Key className="w-5 h-5" />
              </div>
              <span className="text-gray-500 font-bold text-sm">Kode Lisensi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-gray-100 px-4 py-2 rounded-xl font-bold text-sm text-gray-800 tracking-wider">{institution.license_code}</span>
              <button
                onClick={copyLicenseCode}
                className={`p-2 rounded-xl transition-all ${copied ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-gray-100 text-gray-400'}`}
                title="Salin kode"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-5 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-gray-500 font-bold text-sm">Status</span>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${isExpired ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
              {isExpired ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
              {isExpired ? 'Kedaluwarsa' : 'Aktif'}
            </span>
          </div>

          {/* Expiry Date */}
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-gray-500 font-bold text-sm">Berakhir pada</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">
              {expiresAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric'})}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Expiry Warning */}
      {isExpiringSoon && !isExpired && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4"
        >
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-amber-900 mb-1">Lisensi Segera Berakhir</h3>
            <p className="text-[13px] text-amber-700">Lisensi akan berakhir dalam <span className="font-bold">{Math.abs(daysUntilExpiry)} hari</span>. Hubungi administrator untuk perpanjangan agar akses tidak terputus.</p>
          </div>
          <button
            onClick={() => setShowRenewModal(true)}
            className="flex-shrink-0 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Perpanjang
          </button>
        </motion.div>
      )}

      {isExpired && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4"
        >
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-red-900 mb-1">Lisensi Telah Kedaluwarsa</h3>
            <p className="text-[13px] text-red-700">Lisensi institusi telah berakhir. Beberapa fitur mungkin dibatasi. Segera hubungi administrator untuk perpanjangan.</p>
          </div>
          <button
            onClick={() => setShowRenewModal(true)}
            className="flex-shrink-0 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Perpanjang
          </button>
        </motion.div>
      )}

      {/* Renew Modal */}
      {showRenewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowRenewModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
          >
            {!renewRequested ? (
              <>
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-gray-900 text-center mb-2">Perpanjang Lisensi</h3>
                <p className="text-sm text-gray-500 text-center mb-8">Permintaan perpanjangan akan dikirim ke admin Aruna untuk diproses.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRenewModal(false)}
                    className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleRenewRequest}
                    className="flex-1 py-3.5 bg-teal-600 text-white rounded-2xl text-sm font-bold hover:bg-teal-700 transition-colors"
                  >
                    Ajukan Perpanjangan
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Permintaan Terkirim!</h3>
                <p className="text-sm text-gray-500">Admin Aruna akan menghubungi Anda untuk proses perpanjangan.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
