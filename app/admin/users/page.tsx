"use client";
import React from 'react';
import { Search, Filter, Shield, User, MoreVertical, Building, Eye, Plus } from 'lucide-react';
import { mockData } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function AdminUsersPage() {
  const users = mockData.users;

  return (
    <div className="font-sans text-gray-100 flex flex-col gap-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0A101C]/80 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-xl shadow-black/20 gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20"><Shield className="w-6 h-6 text-red-500" /></div> User Management
          </h1>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-2">Audit permissions and account status</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 bg-[#0A101C]/80 backdrop-blur-md border border-white/5 rounded-[1.2rem] px-5 py-4 flex items-center gap-3 shadow-inner group focus-within:border-white/20 transition-all">
          <Search className="w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
          <input type="text" placeholder="Search by name, email or institution..." className="bg-transparent border-none text-white text-[15px] focus:outline-none w-full placeholder:text-gray-600 font-medium" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none justify-center bg-[#0A101C] border border-white/5 px-5 py-4 rounded-[1.2rem] text-gray-400 hover:text-white hover:bg-white/5 transition flex items-center gap-2 text-[12px] font-bold uppercase">
              <Filter className="w-4 h-4" /> Filter
           </button>
           <button className="flex-1 sm:flex-none justify-center bg-red-600 px-6 py-4 rounded-[1.2rem] text-white hover:bg-red-500 hover:-translate-y-0.5 transition-all text-[12px] font-bold uppercase shadow-[0_0_20px_rgba(220,38,38,0.3)] flex items-center gap-2">
              <Plus className="w-4 h-4" /> New User
           </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0A101C]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 bg-white/5">
                <th className="px-8 py-6 rounded-tl-[2rem]">User</th>
                <th className="px-8 py-6">Role</th>
                <th className="px-8 py-6">Institution</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right rounded-tr-[2rem]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/5 group transition duration-300"
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black/30 border border-white/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:border-red-500/30 group-hover:text-white group-hover:bg-red-500/10 transition-all shadow-inner">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-white group-hover:text-red-400 transition">{user.name}</div>
                        <div className="text-[12px] text-gray-400 font-medium tracking-tight mt-0.5">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] border shadow-inner ${
                      user.role === 'admin' ? 'bg-red-400/10 text-red-500 border-red-500/20' : 
                      user.role === 'teacher' ? 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20' : 
                      'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    {user.institution_id ? (
                      <div className="flex items-center gap-2 text-[12px] font-bold text-gray-300">
                        <div className="p-1.5 bg-white/5 rounded-md border border-white/5">
                          <Building className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        {mockData.institutions.find(inst => inst.id === user.institution_id)?.name}
                      </div>
                    ) : (
                      <span className="text-[12px] font-bold text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Active</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition mr-2">
                       <button className="p-2.5 text-gray-400 hover:text-white transition hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl"><Eye className="w-4 h-4" /></button>
                       <button className="p-2.5 text-gray-400 hover:text-red-400 transition hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
