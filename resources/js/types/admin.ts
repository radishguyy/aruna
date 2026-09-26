export interface SubscriptionHistoryItem {
  id: string;
  plan_name: string;
  status: string;
  status_label: string;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string | null;
}

export interface UserSubscriptionInfo {
  status: 'active' | 'expired' | 'never';
  status_label: string;
  plan_name: string | null;
  plan_id: string | null;
  active_from: string | null;
  active_until: string | null;
  remaining_days: number | null;
  remaining_label: string | null;
}

export interface AdminUserItem {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'parent';
  subscription_status: string;
  institution?: string | null;
  children_count?: number;
  created_at?: string;
  subscription?: UserSubscriptionInfo;
  subscription_history?: SubscriptionHistoryItem[];
}

export interface RevenueSummary {
  total_revenue: number;
  total_revenue_formatted: string;
  transaction_count: number;
  average_order_value: number;
  average_order_value_formatted: string;
  new_subscriptions: number;
  renewals: number;
}

export interface RevenueDataPoint {
  key: string;
  date: string;
  label: string;
  full_label: string;
  revenue: number;
  revenue_formatted: string;
  transactions: number;
}

export interface RevenueAnalyticsPayload {
  summary: RevenueSummary;
  chart_data: RevenueDataPoint[];
  period: string;
  granularity: string;
  date_range: {
    start: string;
    end: string;
    start_formatted: string;
    end_formatted: string;
    label: string;
  };
}
