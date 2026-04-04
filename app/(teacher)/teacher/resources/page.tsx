"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockData } from '@/data/mockData';
import { BookOpen, FileText, Video, FileSpreadsheet, Download, Search, Filter, X, ChevronDown, ArrowDownToLine, Eye } from 'lucide-react';

export default function TeacherResources() {
  const resources = mockData.teacherResources;
  const modules = mockData.modules;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'resources' | 'modules'>('resources');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const categories = useMemo(() => [...new Set(resources.map(r => r.category))], [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = filterCategory === 'all' || r.category === filterCategory;
      return matchSearch && matchCategory;
    });
  }, [resources, searchQuery, filterCategory]);

  const filteredModules = useMemo(() => {
    return modules.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [modules, searchQuery]);

  const handleDownload = (id: string) => {
    setDownloadedIds(prev => [...prev, id]);
    // Simulate download toast
    setTimeout(() => {
      setDownloadedIds(prev => prev.filter(d => d !== id));
    }, 2000);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'xlsx': return <FileSpreadsheet className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-50 text-red-500 border-red-100';
      case 'video': return 'bg-purple-50 text-purple-500 border-purple-100';
      case 'xlsx': return 'bg-emerald-50 text-emerald-500 border-emerald-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const getModuleTypeBadge = (type: string) => {
    switch (type) {
      case 'digfo': return { label: 'Infografis Digital', color: 'bg-blue-50 text-blue-600 border-blue-100' };
      case 'digvi': return { label: 'Video Edukasi', color: 'bg-purple-50 text-purple-600 border-purple-100' };
      case 'e-modul': return { label: 'E-Modul Cerita', color: 'bg-orange-50 text-orange-600 border-orange-100' };
      default: return { label: type, color: 'bg-gray-50 text-gray-600 border-gray-100' };
    }
  };

  return (
    <div className="p-6 md:p-12 space-y-8 font-sans max-w-5xl mx-auto">

      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 relative z-10 tracking-tight">Materi Ajar</h1>
        <p className="text-gray-500 font-medium relative z-10">Unduh panduan guru dan kelola modul edukasi untuk kelas Anda.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'resources' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <span className="flex items-center gap-2"><Download className="w-4 h-4" /> Unduhan ({resources.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'modules' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Modul Siswa ({modules.length})</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="resourceSearch"
            name="resourceSearch"
            autoComplete="off"
            type="text"
            placeholder={activeTab === 'resources' ? 'Cari materi ajar...' : 'Cari modul siswa...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {activeTab === 'resources' && (
          <div className="relative min-w-[160px]">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            >
              <option value="all">Semua Kategori</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Resources Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'resources' ? (
          <motion.div
            key="resources"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredResources.map(resource => (
              <motion.div
                key={resource.id}
                layout
                className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${getFileColor(resource.type)} flex-shrink-0`}>
                    {getFileIcon(resource.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 leading-tight">{resource.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
                      <span className="uppercase font-bold">{resource.type}</span>
                      <span className="text-gray-300">•</span>
                      <span>{resource.fileSize}</span>
                      <span className="text-gray-300">•</span>
                      <span>{resource.downloadCount}x diunduh</span>
                    </div>
                  </div>
                </div>
                <p className="text-[13px] text-gray-500 mb-5 flex-1 leading-relaxed">{resource.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold flex-shrink-0">{resource.category}</span>
                  <div className="flex-1"></div>
                  <button
                    onClick={() => handleDownload(resource.id)}
                    disabled={downloadedIds.includes(resource.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      downloadedIds.includes(resource.id)
                        ? 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                        : 'bg-teal-50 text-teal-600 hover:bg-teal-100 border border-teal-100'
                    }`}
                  >
                    {downloadedIds.includes(resource.id) ? (
                      <><ArrowDownToLine className="w-3.5 h-3.5" /> Terunduh!</>
                    ) : (
                      <><Download className="w-3.5 h-3.5" /> Unduh</>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="modules"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {filteredModules.map((mod, i) => {
              const typeBadge = getModuleTypeBadge(mod.type);
              const isPreview = previewId === mod.id;
              const category = mockData.module_categories.find(c => c.id === mod.category_id);

              return (
                <motion.div
                  key={mod.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white border border-gray-100 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div
                    onClick={() => setPreviewId(isPreview ? null : mod.id)}
                    className="flex items-center gap-4 p-5 cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center font-black text-sm border border-teal-100 flex-shrink-0">
                      {mod.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900 text-sm">{mod.title}</span>
                        {mod.is_premium && <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold border border-amber-100">Premium</span>}
                      </div>
                      <div className="text-[13px] text-gray-500 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${typeBadge.color}`}>{typeBadge.label}</span>
                        {category && <span className="text-gray-400">{category.name}</span>}
                      </div>
                    </div>
                    <Eye className={`w-4 h-4 transition-colors flex-shrink-0 ${isPreview ? 'text-teal-500' : 'text-gray-300 group-hover:text-gray-500'}`} />
                  </div>

                  <AnimatePresence>
                    {isPreview && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-gray-50 pt-4">
                          <p className="text-sm text-gray-600 mb-3">{mod.content_data.description}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span>Kesulitan: Level {mod.difficulty_level}</span>
                            <span className="text-gray-300">•</span>
                            <span>Tipe: {mod.type.toUpperCase()}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
