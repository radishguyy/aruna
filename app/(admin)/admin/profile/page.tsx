"use client";
import React, { useState } from 'react';
import { User, Shield, Mail, Key } from 'lucide-react';

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-wider">Account<span className="text-red-500">Profile</span></h1>
          <p className="text-gray-400 mt-2 font-bold tracking-wide">MANAGEMENT & SECURITY</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg ${isEditing ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/30'}`}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Info'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1 bg-[#0A101C]/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mb-4 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <User className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Super Admin</h2>
          <div className="flex items-center gap-2 text-red-400 text-sm font-bold bg-white/5 px-3 py-1 rounded-full mb-4">
            <Shield className="w-4 h-4" /> System Administrator
          </div>
          <p className="text-gray-400 text-sm">Last login: Today, 10:45 AM</p>
        </div>

        {/* Details Card */}
        <div className="col-span-1 md:col-span-2 bg-[#0A101C]/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4">Personal Details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="adminFullName">Full Name</label>
                <input 
                  id="adminFullName"
                  name="adminFullName"
                  type="text" 
                  autoComplete="off"
                  disabled={!isEditing}
                  defaultValue="Super Admin"
                  className="w-full bg-[#070B14] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="adminUsername">Username</label>
                <input 
                  id="adminUsername"
                  name="adminUsername"
                  type="text" 
                  autoComplete="off"
                  disabled={!isEditing}
                  defaultValue="admin_aruna"
                  className="w-full bg-[#070B14] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors disabled:opacity-50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-bold mb-2 flex items-center gap-2" htmlFor="adminEmail">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input 
                  id="adminEmail"
                  name="adminEmail"
                  type="email" 
                  autoComplete="off"
                  disabled={!isEditing}
                  defaultValue="admin@aruna.edu"
                  className="w-full bg-[#070B14] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors disabled:opacity-50"
                />
              </div>
              <div className="md:col-span-2 pt-4">
                 <button 
                   onClick={() => alert("Password reset link has been sent to admin@aruna.edu")}
                   className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
                 >
                    <Key className="w-5 h-5" /> Change Password
                 </button>
              </div>
            </div>
            
            {isEditing && (
              <div className="pt-4 flex justify-end">
                 <button 
                   onClick={() => {
                     alert("Profile changes saved successfully! (Demo Simulation)");
                     setIsEditing(false);
                   }}
                   className="bg-red-500 text-white hover:bg-red-600 font-bold py-3 px-8 rounded-xl shadow-lg shadow-red-500/20 transition-all"
                 >
                    Save Changes
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
