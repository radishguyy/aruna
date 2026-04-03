"use client";
import React from 'react';
import { mockData } from '@/data/mockData';
import { Building2 } from 'lucide-react';

export default function TeacherLicense() {
  const institution = mockData.institutions[0];

  return (
    <div className="p-6 md:p-10 pb-32">
       <h1 className="text-2xl font-bold mb-6">Informasi Instansi</h1>
       
       <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
             <div className="w-20 h-20 bg-green-50 text-[#006A50] rounded-2xl flex items-center justify-center">
                 <Building2 className="w-10 h-10" />
             </div>
             <div>
                <h2 className="text-2xl font-black">{institution.name}</h2>
                <p className="text-gray-500">{institution.address}</p>
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 font-bold">Kode Lisensi:</span>
                <span className="font-mono bg-gray-100 px-3 py-1 rounded font-bold">{institution.license_code}</span>
             </div>
             <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 font-bold">Status:</span>
                <span className="text-green-600 font-bold uppercase tracking-widest text-xs py-1">Aktif</span>
             </div>
             <div className="flex justify-between py-3">
                <span className="text-gray-500 font-bold">Berakhir pada:</span>
                <span className="font-bold">{new Date(institution.license_expires_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric'})}</span>
             </div>
          </div>
       </div>
    </div>
  );
}
