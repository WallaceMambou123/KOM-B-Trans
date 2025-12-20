// Types pour les paiements - Partagé entre toutes les apps KOM-B

export type PaymentMethod = 'orange' | 'momo' | 'card';

export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';

export interface PaymentOption {
  id: PaymentMethod;
  name: string;
  icon: string; // URL de l'icône
  description?: string;
  isAvailable: boolean;
}

export interface PaymentState {
  selectedMethod: PaymentMethod | null;
  isProcessing: boolean;
  error: string | null;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  phoneNumber?: string;
  transactionRef?: string;
  createdAt: string;
  completedAt?: string;
  errorMessage?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  phoneNumber?: string;
  timestamp: string;
  errorMessage?: string;
}

// Pour le wallet du vendeur/transporteur
export interface Wallet {
  balance: number;
  currency: string;
  pendingAmount: number;
  lastUpdated: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'withdrawal';
  amount: number;
  description: string;
  orderId?: string;
  createdAt: string;
}
