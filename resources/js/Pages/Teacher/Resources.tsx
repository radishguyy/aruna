import React from 'react';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { Head } from '@inertiajs/react';
import { Download, FileText, Video, Layout } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  file_size: string;
  download_count: number;
}

interface Props {
  resources: Resource[] | { data: Resource[] };
}

export default function TeacherResources({ resources }: Props) {
  const resourceList: Resource[] = Array.isArray(resources)
    ? resources
    : ((resources as any)?.data || []);

  const getIcon = (type: string) => {
    if (type === 'pdf') return <FileText className="text-rose-500 w-6 h-6" />;
    if (type === 'video') return <Video className="text-blue-500 w-6 h-6" />;
    return <Layout className="text-teal-500 w-6 h-6" />;
  };

  return (
    <TeacherLayout>
      <Head title="Materi Ajar" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-5xl mx-auto h-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Materi Ajar & Panduan</h1>
          <p className="text-gray-500 font-medium">Download materi panduan dan poster pendukung untuk pengajaran di kelas.</p>
        </div>

        {resourceList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceList.map(res => (
              <div key={res.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4 hover:-translate-y-1 transition-all">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 shrink-0">
                  {getIcon(res.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">{res.category}</span>
                  <h3 className="font-bold text-gray-900 text-lg leading-snug">{res.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{res.description}</p>
                  <div className="pt-2 flex items-center justify-between text-xs text-gray-400 font-medium">
                    <span>Ukuran: {res.file_size}</span>
                    <span>Diunduh: {res.download_count}x</span>
                  </div>
                </div>
                <button className="bg-teal-50 text-teal-600 hover:bg-teal-100 p-3 rounded-full transition-colors self-center cursor-pointer">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-400 font-medium border border-gray-100">
            Belum ada materi ajar yang tersedia saat ini.
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
