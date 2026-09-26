<?php

namespace App\Services;

use App\Models\Order;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\DB;

class RevenueAnalyticsService
{
    /**
     * Resolve date range based on period identifier.
     *
     * @return array{start: Carbon, end: Carbon, period: string, label: string}
     */
    public function resolveDateRange(string $period = 'last_30_days', ?string $customStart = null, ?string $customEnd = null): array
    {
        $now = now();

        switch ($period) {
            case 'today':
                $start = $now->copy()->startOfDay();
                $end = $now->copy()->endOfDay();
                $label = 'Hari Ini (' . $now->translatedFormat('d M Y') . ')';
                break;

            case 'last_7_days':
                $start = $now->copy()->subDays(6)->startOfDay();
                $end = $now->copy()->endOfDay();
                $label = '7 Hari Terakhir (' . $start->translatedFormat('d M') . ' - ' . $end->translatedFormat('d M Y') . ')';
                break;

            case 'this_month':
                $start = $now->copy()->startOfMonth();
                $end = $now->copy()->endOfMonth();
                $label = 'Bulan Ini (' . $now->translatedFormat('F Y') . ')';
                break;

            case 'last_month':
                $start = $now->copy()->subMonth()->startOfMonth();
                $end = $now->copy()->subMonth()->endOfMonth();
                $label = 'Bulan Lalu (' . $start->translatedFormat('F Y') . ')';
                break;

            case 'this_year':
                $start = $now->copy()->startOfYear();
                $end = $now->copy()->endOfYear();
                $label = 'Tahun Ini (' . $now->translatedFormat('Y') . ')';
                break;

            case 'custom':
                if ($customStart && $customEnd) {
                    try {
                        $start = Carbon::parse($customStart)->startOfDay();
                        $end = Carbon::parse($customEnd)->endOfDay();
                        if ($start->gt($end)) {
                            [$start, $end] = [$end, $start];
                        }
                        $label = $start->translatedFormat('d M Y') . ' - ' . $end->translatedFormat('d M Y');
                        break;
                    } catch (\Exception $e) {
                        // fallback to last_30_days
                    }
                }
                // intentional fall-through if custom dates missing or invalid

            case 'last_30_days':
            default:
                $period = 'last_30_days';
                $start = $now->copy()->subDays(29)->startOfDay();
                $end = $now->copy()->endOfDay();
                $label = '30 Hari Terakhir (' . $start->translatedFormat('d M') . ' - ' . $end->translatedFormat('d M Y') . ')';
                break;
        }

        return [
            'start' => $start,
            'end' => $end,
            'period' => $period,
            'label' => $label,
        ];
    }

    /**
     * Pick appropriate default granularity if none provided or invalid.
     */
    public function resolveGranularity(?string $granularity, Carbon $start, Carbon $end, string $period): string
    {
        $valid = ['daily', 'weekly', 'monthly', 'yearly'];
        if ($granularity && in_array(strtolower($granularity), $valid)) {
            return strtolower($granularity);
        }

        if ($period === 'this_year') {
            return 'monthly';
        }

        $days = $start->diffInDays($end);
        if ($days > 365) {
            return 'monthly';
        }
        if ($days > 90) {
            return 'weekly';
        }

        return 'daily';
    }

    /**
     * Get full analytics payload for the given period and granularity.
     */
    public function getAnalytics(string $period = 'last_30_days', ?string $granularity = null, ?string $customStart = null, ?string $customEnd = null): array
    {
        $range = $this->resolveDateRange($period, $customStart, $customEnd);
        $start = $range['start'];
        $end = $range['end'];
        $activePeriod = $range['period'];
        $activeGranularity = $this->resolveGranularity($granularity, $start, $end, $activePeriod);

        // Fetch paid orders within the resolved date range
        $orders = Order::where('status', 'paid')
            ->whereBetween('paid_at', [$start, $end])
            ->select(['id', 'user_id', 'total_amount', 'paid_at', 'plan_id', 'created_at'])
            ->orderBy('paid_at')
            ->get();

        // 1. Calculate Summary Metrics
        $totalRevenue = (float) $orders->sum('total_amount');
        $transactionCount = $orders->count();
        $averageOrderValue = $transactionCount > 0 ? (float) ($totalRevenue / $transactionCount) : 0.0;

        // New Subscriptions vs Renewals
        $userIds = $orders->pluck('user_id')->unique();
        $userFirstOrders = Order::where('status', 'paid')
            ->whereIn('user_id', $userIds)
            ->select('user_id', DB::raw('MIN(paid_at) as first_paid_at'))
            ->groupBy('user_id')
            ->pluck('first_paid_at', 'user_id');

        $newSubscriptions = 0;
        $renewals = 0;

        foreach ($orders as $order) {
            $firstPaidAt = $userFirstOrders[$order->user_id] ?? null;
            if ($firstPaidAt && Carbon::parse($order->paid_at)->equalTo(Carbon::parse($firstPaidAt))) {
                $newSubscriptions++;
            } else {
                $renewals++;
            }
        }

        // 2. Generate Time Series Data with zero-filling
        $chartData = $this->generateTimeSeries($orders, $start, $end, $activeGranularity);

        return [
            'summary' => [
                'total_revenue' => $totalRevenue,
                'total_revenue_formatted' => 'Rp ' . number_format($totalRevenue, 0, ',', '.'),
                'transaction_count' => $transactionCount,
                'average_order_value' => round($averageOrderValue, 2),
                'average_order_value_formatted' => 'Rp ' . number_format($averageOrderValue, 0, ',', '.'),
                'new_subscriptions' => $newSubscriptions,
                'renewals' => $renewals,
            ],
            'chart_data' => $chartData,
            'period' => $activePeriod,
            'granularity' => $activeGranularity,
            'date_range' => [
                'start' => $start->toDateString(),
                'end' => $end->toDateString(),
                'start_formatted' => $start->translatedFormat('d M Y'),
                'end_formatted' => $end->translatedFormat('d M Y'),
                'label' => $range['label'],
            ],
        ];
    }

    /**
     * Build aggregated time-series data for chart.
     */
    protected function generateTimeSeries($orders, Carbon $start, Carbon $end, string $granularity): array
    {
        switch ($granularity) {
            case 'weekly':
                return $this->buildWeeklySeries($orders, $start, $end);
            case 'monthly':
                return $this->buildMonthlySeries($orders, $start, $end);
            case 'yearly':
                return $this->buildYearlySeries($orders, $start, $end);
            case 'daily':
            default:
                return $this->buildDailySeries($orders, $start, $end);
        }
    }

    protected function buildDailySeries($orders, Carbon $start, Carbon $end): array
    {
        // Group orders by Y-m-d
        $grouped = $orders->groupBy(fn($order) => Carbon::parse($order->paid_at)->format('Y-m-d'));

        $series = [];
        $period = CarbonPeriod::create($start->copy()->startOfDay(), '1 day', $end->copy()->startOfDay());

        foreach ($period as $date) {
            $key = $date->format('Y-m-d');
            $dayOrders = $grouped->get($key, collect());
            $rev = (float) $dayOrders->sum('total_amount');
            $cnt = $dayOrders->count();

            $series[] = [
                'key' => $key,
                'date' => $key,
                'label' => $date->translatedFormat('d M'),
                'full_label' => $date->translatedFormat('l, d F Y'),
                'revenue' => $rev,
                'revenue_formatted' => 'Rp ' . number_format($rev, 0, ',', '.'),
                'transactions' => $cnt,
            ];
        }

        return $series;
    }

    protected function buildWeeklySeries($orders, Carbon $start, Carbon $end): array
    {
        // Group orders by week start date (Monday)
        $grouped = $orders->groupBy(fn($order) => Carbon::parse($order->paid_at)->startOfWeek()->format('Y-m-d'));

        $series = [];
        $curr = $start->copy()->startOfWeek();
        $limit = $end->copy()->endOfWeek();

        while ($curr->lte($limit)) {
            $key = $curr->format('Y-m-d');
            $weekEnd = $curr->copy()->endOfWeek();
            $weekOrders = $grouped->get($key, collect());
            $rev = (float) $weekOrders->sum('total_amount');
            $cnt = $weekOrders->count();

            $series[] = [
                'key' => $key,
                'date' => $key,
                'label' => $curr->translatedFormat('d M') . ' - ' . $weekEnd->translatedFormat('d M'),
                'full_label' => 'Pekan ' . $curr->translatedFormat('d M Y') . ' s/d ' . $weekEnd->translatedFormat('d M Y'),
                'revenue' => $rev,
                'revenue_formatted' => 'Rp ' . number_format($rev, 0, ',', '.'),
                'transactions' => $cnt,
            ];

            $curr->addWeek();
        }

        return $series;
    }

    protected function buildMonthlySeries($orders, Carbon $start, Carbon $end): array
    {
        $grouped = $orders->groupBy(fn($order) => Carbon::parse($order->paid_at)->format('Y-m'));

        $series = [];
        $curr = $start->copy()->startOfMonth();
        $limit = $end->copy()->endOfMonth();

        while ($curr->lte($limit)) {
            $key = $curr->format('Y-m');
            $monthOrders = $grouped->get($key, collect());
            $rev = (float) $monthOrders->sum('total_amount');
            $cnt = $monthOrders->count();

            $series[] = [
                'key' => $key,
                'date' => $key,
                'label' => $curr->translatedFormat('M Y'),
                'full_label' => $curr->translatedFormat('F Y'),
                'revenue' => $rev,
                'revenue_formatted' => 'Rp ' . number_format($rev, 0, ',', '.'),
                'transactions' => $cnt,
            ];

            $curr->addMonth();
        }

        return $series;
    }

    protected function buildYearlySeries($orders, Carbon $start, Carbon $end): array
    {
        $grouped = $orders->groupBy(fn($order) => Carbon::parse($order->paid_at)->format('Y'));

        $series = [];
        $startYear = (int) $start->format('Y');
        $endYear = (int) $end->format('Y');

        for ($yr = $startYear; $yr <= $endYear; $yr++) {
            $key = (string) $yr;
            $yrOrders = $grouped->get($key, collect());
            $rev = (float) $yrOrders->sum('total_amount');
            $cnt = $yrOrders->count();

            $series[] = [
                'key' => $key,
                'date' => $key,
                'label' => (string) $yr,
                'full_label' => 'Tahun ' . $yr,
                'revenue' => $rev,
                'revenue_formatted' => 'Rp ' . number_format($rev, 0, ',', '.'),
                'transactions' => $cnt,
            ];
        }

        return $series;
    }
}
