import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm, Head } from '@inertiajs/react';

export default function Contact() {
  const { data, setData, post, processing, wasSuccessful, errors } = useForm({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('contact.submit'));
  };

  return (
    <MainLayout>
      <Head title="Hubungi Kami" />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 font-sans">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Hubungi Tim Kami</h1>
          <p className="text-slate-500 max-w-md mx-auto">Kami senang mendengar pertanyaan, ide kolaborasi, maupun kritik dari Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800">Informasi Kontak</h3>
            <p className="text-slate-500">Silakan hubungi kami melalui saluran berikut atau isi formulir pesan.</p>
            
            <div className="flex items-center gap-4 text-slate-600">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500"><Mail /></div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Email</div>
                <div className="font-bold">halo.aruna.edu@gmail.com</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-600">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500"><Phone /></div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">WhatsApp</div>
                <div className="font-bold">0895-0992-2574</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-600">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500"><MapPin /></div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Lokasi</div>
                <div className="font-bold">Semarang, Jawa Tengah (UNNES)</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-[2rem] border-2 border-gray-100 shadow-xl shadow-gray-200/50">
            {wasSuccessful ? (
              <div className="text-center py-10 space-y-4 text-emerald-600">
                <div className="text-5xl">🎉</div>
                <h4 className="text-xl font-bold">Terima Kasih!</h4>
                <p className="text-sm text-slate-500">Pesan Anda berhasil dikirim. Tim kami akan segera membalasnya.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    placeholder="Cth: Fachri"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    placeholder="rara@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Pesan</label>
                  <textarea
                    required
                    rows={4}
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                    placeholder="Ketik pesan Anda..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> {processing ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
