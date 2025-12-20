// Types pour les commandes - Partagé entre toutes les apps KOM-B

export type OrderStatus =
  | 'pending'       // En attente de confirmation
  | 'confirmed'     // Confirmée par le vendeur
  | 'processing'    // En préparation
  | 'ready'         // Prête pour livraison
  | 'shipped'       // En cours de livraison
  | 'delivered'     // Livrée
  | 'cancelled';    // Annulée

export type PaymentMethod = 'orange' | 'momo' | 'card';

export type DeliveryMode = 'domicile' | 'relais';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl: string;
  unit?: string;
}

export interface DeliveryAddress {
  id?: string;
  name: string;
  phone: string;
  location: string;
  city?: string;
  additionalInfo?: string;
}

export interface Order {
  id: string;
  clientId: string;
  producerId: string;
  deliveryId?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  deliveryMode: DeliveryMode;
  deliveryAddress: DeliveryAddress;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  deliveredAt?: string;
}

export interface OrderSummary {
  orderId: string;
  itemCount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

// Pour les statistiques
export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}
