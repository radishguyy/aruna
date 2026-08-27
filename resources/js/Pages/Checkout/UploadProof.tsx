import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router } from '@inertiajs/react';
import { Receipt, UploadCloud, FileImage, AlertCircle } from 'lucide-react';

interface CheckoutProps {
  order: {
    id: string;
    total_amount: string;
    payment_method: string;
    plan: {
      name: string;
    }
  };
  errors: any;
}

export default function UploadProof({ order, errors }: CheckoutProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const formatRupiah = (val: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(val));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }
      setFile(selected);
      const objectUrl = URL.createObjectURL(selected);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    
    router.post(route('checkout.submit-proof', { order: order.id }), {
      payment_proof: file,
      _method: 'post', // Since inertia post handles file uploads automatically
    }, {
      forceFormData: true,
      onFinish: () => setIsUploading(false)
    });
  };

  return (
    <MainLayout>
      <Head title="Upload Bukti Pembayaran - Aruna" />
      <div className="pt-28 pb-20 px-4 max-w-2xl mx-auto font-sans">
        <h1 className="text-3xl font-black text-slate-800 mb-8 tracking-tight text-center" style={{ fontFamily: '"Grandstander", cursive' }}>Konfirmasi Pembayaran</h1>
        
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
          
          {/* Summary Mini */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-sm font-bold text-gray-500 mb-1">Paket</div>
              <div className="font-black text-slate-800">{order.plan.name}</div>
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div>
              <div className="text-sm font-bold text-gray-500 mb-1">Metode Pembayaran</div>
              <div className="font-black text-slate-800 uppercase">{order.payment_method === 'qris' ? 'QRIS' : 'Transfer Bank'}</div>
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-500 mb-1">Total Tagihan</div>
              <div className="font-black text-indigo-600 text-lg">{formatRupiah(order.total_amount)}</div>
            </div>
          </div>

          {/* Upload Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Upload Bukti Transfer / Pembayaran</label>
              
              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  preview ? 'border-indigo-500 bg-indigo-50/30' : 'border-gray-300 hover:border-indigo-400 bg-gray-50'
                }`}
              >
                {!preview ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-indigo-500">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700">Klik atau drag file kesini</p>
                      <p className="text-sm text-gray-500 mt-1">Format: JPG, PNG, max 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      title="Pilih file"
                    />
                  </div>
                ) : (
                  <div className="space-y-4 relative">
                    <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-xl shadow-sm object-contain bg-white" />
                    <button 
                      type="button" 
                      onClick={() => { setFile(null); setPreview(null); }}
                      className="text-sm font-bold text-rose-500 hover:text-rose-600"
                    >
                      Hapus & Ganti File
                    </button>
                  </div>
                )}
              </div>
              {errors?.payment_proof && (
                <p className="text-rose-500 text-sm font-bold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.payment_proof}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!file || isUploading}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
                !file || isUploading 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-600/30'
              }`}
            >
              {isUploading ? 'Mengunggah...' : 'Kirim Bukti Pembayaran'}
            </button>
          </form>

        </div>
      </div>
    </MainLayout>
  );
}
