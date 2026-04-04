"use client";
import React, { useState } from 'react';
import { User, Mail, Phone, BookOpen, Key, Building } from 'lucide-react';

export default function TeacherProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-6 md:p-6 p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-teal-900 tracking-tight">Profil <span className="text-teal-500">Anda</span></h1>
          <p className="text-gray-500 mt-2 font-medium">Kelola informasi pribadi dan data keamanan akun Anda.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-md ${isEditing ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-600/30'}`}
        >
          {isEditing ? 'Batalkan' : 'Edit Profil'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1 bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm">
          <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-4">
            <User className="w-10 h-10 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Budi Santoso</h2>
          <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Guru Wali Kelas
          </span>
          <p className="text-gray-500 text-sm">Bergabung sejak: 2024</p>
        </div>

        {/* Details Card */}
        <div className="col-span-1 md:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Data Pribadi</h3>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="teacherName">Nama Lengkap</label>
                <input 
                  id="teacherName"
                  name="teacherName"
                  type="text" 
                  autoComplete="off"
                  disabled={!isEditing}
                  defaultValue="Budi Santoso"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all disabled:opacity-70"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="teacherNIP">NIP / ID Pegawai</label>
                <input 
                  id="teacherNIP"
                  name="teacherNIP"
                  type="text" 
                  autoComplete="off"
                  disabled={!isEditing}
                  defaultValue="198001012005011003"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all disabled:opacity-70"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-600 text-sm font-bold mb-2 flex items-center gap-2" htmlFor="teacherEmail">
                  <Mail className="w-4 h-4" /> Alamat Email
                </label>
                <input 
                  id="teacherEmail"
                  name="teacherEmail"
                  type="email" 
                  autoComplete="off"
                  disabled={!isEditing}
                  defaultValue="budi.santoso@sekolah.id"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all disabled:opacity-70"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-600 text-sm font-bold mb-2 flex items-center gap-2" htmlFor="teacherPhone">
                  <Phone className="w-4 h-4" /> Nomor Telepon
                </label>
                <input 
                  id="teacherPhone"
                  name="teacherPhone"
                  type="tel" 
                  autoComplete="off"
                  disabled={!isEditing}
                  defaultValue="+62 812 3456 7890"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all disabled:opacity-70"
                />
              </div>
            </div>

            <div className="pt-2">
                <button className="flex items-center justify-center gap-2 w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all">
                  <Key className="w-5 h-5" /> Ubah Kata Sandi
                </button>
            </div>
            
            {isEditing && (
              <div className="pt-4 flex justify-end">
                 <button className="bg-teal-600 text-white hover:bg-teal-700 font-bold py-3 px-8 rounded-xl shadow-lg shadow-teal-600/20 transition-all">
                    Simpan Perubahan
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
