// types.ts

export interface Indicator {
  title: string;
  value: string;
  change: number;
  unit: string;
}

export interface Wallet {
  title: string;
  value: string;
  currency: string;
}

export interface SalesByMonth {
  month: string;
  sales: number;
}

export interface SalesByProduct {
  product: string;
  percentage: number;
  color: string;
}

export interface DashboardData {
  user: {
    name: string;
    avatarUrl: string;
  };
  indicators: Indicator[];
  wallet: Wallet;
  messagesCount: number;
  salesByMonth: SalesByMonth[];
  salesByProduct: SalesByProduct[];
}