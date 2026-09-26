import React, { useState, useEffect } from 'react';
import { RevenueAnalyticsPayload } from '@/types/admin';
import RevenueChart from './RevenueChart';
import {
  TrendingUp,
  Receipt,
  CreditCard,
  UserCheck,
  RefreshCw,
  Calendar,
  Layers,
  ChevronDown,
  Loader2,
  SlidersHorizontal,
  ArrowUpRight,
} from 'lucide-react';

interface RevenueAnalyticsProps {
  initialData?: RevenueAnalyticsPayload;
}

export default function RevenueAnalytics({ initialData }: RevenueAnalyticsProps) {
  const [data, setData] = useState<RevenueAnalyticsPayload | null>(initialData || null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(initialData?.period || 'last_30_days');
  const [selectedGranularity, setSelectedGranularity] = useState<string>(
    initialData?.granularity || 'daily'
  );
  const [loading, setLoading] = useState(false);

  // Custom date modal/panel state
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');

  const periods = [
    { key: 'today', label: 'Hari Ini' },
    { key: 'last_7_days', label: '7 Hari Terakhir' },
    { key: 'last_30_days', label: '30 Hari Terakhir' },
    { key: 'this_month', label: 'Bulan Ini' },
    { key: 'last_month', label: 'Bulan Lalu' },
    { key: 'this_year', label: 'Tahun Ini' },
    { key: 'custom', label: 'Kustom' },
  ];

  const granularities = [
    { key: 'daily', label: 'Harian' },
    { key: 'weekly', label: 'Mingguan' },
    { key: 'monthly', label: 'Bulanan' },
    { key: 'yearly', label: 'Tahunan' },
  ];

  // Fetch analytics data asynchronously from backend API
  const fetchAnalytics = async (period: string, granularity?: string, start?: string, end?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('period', period);
      if (granularity) params.append('granularity', granularity);
      if (period === 'custom') {
        if (start) params.append('start_date', start);
        if (end) params.append('end_date', end);
      }

      const res = await fetch(`/admin/analytics/revenue?${params.toString()}`, {
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (res.ok) {
        const payload: RevenueAnalyticsPayload = await res.json();
        setData(payload);
        setSelectedPeriod(payload.period);
        setSelectedGranularity(payload.granularity);
      }
    } catch (err) {
      console.error('Failed to load revenue analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  // If initialData wasn't available at mount (e.g. deferred), fetch it
  useEffect(() => {
    if (!initialData && !data) {
      fetchAnalytics(selectedPeriod, selectedGranularity);
    }
  }, [initialData]);

  const handlePeriodChange = (pKey: string) => {
    if (pKey === 'custom') {
      setIsCustomOpen(true);
      return;
    }
    setSelectedPeriod(pKey);
    setIsCustomOpen(false);
    fetchAnalytics(pKey, selectedGranularity);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStart || !customEnd) return;
    setSelectedPeriod('custom');
    setIsCustomOpen(false);
    fetchAnalytics('custom', selectedGranularity, customStart, customEnd);
  };

  const handleGranularityChange = (gKey: string) => {
    setSelectedGranularity(gKey);
    fetchAnalytics(selectedPeriod, gKey, customStart, customEnd);
  };

  const summary = data?.summary;
  const chartData = data?.chart_data || [];
  const dateRangeLabel = data?.date_range?.label || 'Memuat periode...';

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-8 relative overflow-hidden transition-all">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Row: Title, Date Label, Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-orange-100 text-orange-700 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Live Analytics
            </span>
            <span className="text-xs text-slate-400 font-medium">Real-time Order Data</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Analitik Pendapatan & Penjualan
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-orange-500" />
            <span>Periode: <strong className="text-slate-700">{dateRangeLabel}</strong></span>
          </p>
        </div>

        {/* Action Controls: Granularity & Period Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Granularity Toggle */}
          <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 shadow-inner">
            {granularities.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => handleGranularityChange(g.key)}
                disabled={loading}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGranularity === g.key
                    ? 'bg-white text-orange-600 shadow-sm shadow-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Period Selector Dropdown / Pills */}
          <div className="relative">
            <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 shadow-inner overflow-x-auto max-w-full">
              {periods.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => handlePeriodChange(p.key)}
                  disabled={loading}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedPeriod === p.key
                      ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom Date Range Popover */}
            {isCustomOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pilih Rentang Tanggal
                  </h4>
                  <button
                    onClick={() => setIsCustomOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    Tutup
                  </button>
                </div>
                <form onSubmit={handleApplyCustom} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Mulai
                    </label>
                    <input
                      type="date"
                      required
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Sampai
                    </label>
                    <input
                      type="date"
                      required
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-2 rounded-xl shadow-md transition-all"
                  >
                    Terapkan Rentang
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
        {/* Total Revenue Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-5 shadow-sm shadow-emerald-500/20 hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100">
              Total Pendapatan
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl md:text-2xl font-black tracking-tight">
              {summary ? summary.total_revenue_formatted : 'Rp 0'}
            </div>
            <div className="text-[11px] text-emerald-100 font-medium mt-0.5">
              Dari order terkonfirmasi (paid)
            </div>
          </div>
        </div>

        {/* Total Transactions Card */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Jumlah Transaksi
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              {summary ? summary.transaction_count : 0}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Order berhasil diselesaikan
            </div>
          </div>
        </div>

        {/* Average Transaction Value (ATV / AOV) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Rata-rata Order (ATV)
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              {summary ? summary.average_order_value_formatted : 'Rp 0'}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Nilai rerata per transaksi
            </div>
          </div>
        </div>

        {/* New Subscriptions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Langganan Baru
            </span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              {summary ? summary.new_subscriptions : 0}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Pembelian perdana pengguna
            </div>
          </div>
        </div>

        {/* Renewals */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Perpanjangan
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              {summary ? summary.renewals : 0}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Langganan diulang (renewal)
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="relative z-10 border border-slate-100 rounded-2xl bg-slate-50/40 p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              Tren Penjualan ({granularities.find((g) => g.key === selectedGranularity)?.label})
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Arahkan kursor ke grafik untuk melihat detail nominal dan transaksi.
            </p>
          </div>
          {loading && (
            <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Memperbarui data...</span>
            </div>
          )}
        </div>

        {/* Interactive SVG Chart */}
        <div className="w-full">
          {chartData.length > 0 ? (
            <RevenueChart data={chartData} height={320} />
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 space-y-2">
              <Receipt className="w-8 h-8 text-slate-300" />
              <p className="text-sm font-medium">Tidak ada transaksi pada rentang periode ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
