// Mock Data - Commandes pour l'écosystème KOM-B
// Lie les clients, producteurs et produits ensemble

import { Order, OrderStatus, OrderItem, OrderSummary } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'CMD-CM-20250112-001',
    clientId: 'client-001',
    producerId: 'producer-001',
    deliveryId: 'DEL-001',
    items: [
      {
        id: 'item-001',
        productId: 'product-001',
        productName: 'Cageot de Tomates Fraîches',
        quantity: 2,
        unitPrice: 2500,
        totalPrice: 5000,
        imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600',
        unit: '5kg',
      },
      {
        id: 'item-002',
        productId: 'product-003',
        productName: 'Piment Frais du Cameroun',
        quantity: 1,
        unitPrice: 1500,
        totalPrice: 1500,
        imageUrl: 'https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?auto=compress&cs=tinysrgb&w=600',
        unit: '500g',
      },
    ],
    subtotal: 6500,
    deliveryFee: 500,
    total: 7000,
    status: 'shipped',
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    deliveryMode: 'domicile',
    deliveryAddress: {
      id: 'addr-001',
      name: 'André NGOMÈ',
      phone: '671987654',
      location: 'Rue Nkol-Eton, Porte 34B, Nkol-Eton, Yaoundé',
      city: 'Yaoundé',
    },
    createdAt: '2025-01-12T10:30:00Z',
    updatedAt: '2025-01-12T14:00:00Z',
    confirmedAt: '2025-01-12T11:00:00Z',
  },
  {
    id: 'CMD-CM-20250113-002',
    clientId: 'client-002',
    producerId: 'producer-002',
    deliveryId: 'DEL-002',
    items: [
      {
        id: 'item-003',
        productId: 'product-004',
        productName: 'Mangues Locales Bio',
        quantity: 3,
        unitPrice: 2500,
        totalPrice: 7500,
        imageUrl: 'https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=600',
        unit: '1kg',
      },
      {
        id: 'item-004',
        productId: 'product-006',
        productName: 'Ananas Doux du Cameroun',
        quantity: 2,
        unitPrice: 1000,
        totalPrice: 2000,
        imageUrl: 'https://images.pexels.com/photos/1071878/pexels-photo-1071878.jpeg?auto=compress&cs=tinysrgb&w=600',
        unit: 'pièce',
      },
    ],
    subtotal: 9500,
    deliveryFee: 0,
    total: 9500,
    status: 'processing',
    paymentMethod: 'orange',
    paymentStatus: 'paid',
    deliveryMode: 'relais',
    deliveryAddress: {
      id: 'addr-002',
      name: 'Brigitte FOTSO',
      phone: '699887766',
      location: 'Rue Bastos, Immeuble 12, Yaoundé',
      city: 'Yaoundé',
    },
    createdAt: '2025-01-13T09:15:00Z',
    updatedAt: '2025-01-13T10:00:00Z',
    confirmedAt: '2025-01-13T09:45:00Z',
  },
  {
    id: 'CMD-CM-20250114-003',
    clientId: 'client-003',
    producerId: 'producer-003',
    deliveryId: 'DEL-003',
    items: [
      {
        id: 'item-005',
        productId: 'product-007',
        productName: 'Ignames Blanches',
        quantity: 1,
        unitPrice: 4500,
        totalPrice: 4500,
        imageUrl: 'https://images.pexels.com/photos/5529599/pexels-photo-5529599.jpeg?auto=compress&cs=tinysrgb&w=600',
        unit: '8kg',
      },
      {
        id: 'item-006',
        productId: 'product-008',
        productName: 'Macabo Frais',
        quantity: 1,
        unitPrice: 3000,
        totalPrice: 3000,
        imageUrl: 'https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=600',
        unit: '5kg',
      },
    ],
    subtotal: 7500,
    deliveryFee: 500,
    total: 8000,
    status: 'pending',
    paymentMethod: 'momo',
    paymentStatus: 'pending',
    deliveryMode: 'domicile',
    deliveryAddress: {
      id: 'addr-003',
      name: 'Jean MBALLA',
      phone: '655443322',
      location: 'Cité Melen, Bloc B, Yaoundé',
      city: 'Yaoundé',
    },
    createdAt: '2025-01-14T08:00:00Z',
    updatedAt: '2025-01-14T08:00:00Z',
  },
  {
    id: 'CMD-CM-20250110-004',
    clientId: 'client-001',
    producerId: 'producer-002',
    items: [
      {
        id: 'item-007',
        productId: 'product-005',
        productName: 'Avocats Bio Premium',
        quantity: 5,
        unitPrice: 1800,
        totalPrice: 9000,
        imageUrl: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=600',
        unit: 'pièce',
      },
    ],
    subtotal: 9000,
    deliveryFee: 500,
    total: 9500,
    status: 'delivered',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    deliveryMode: 'domicile',
    deliveryAddress: {
      id: 'addr-001',
      name: 'André NGOMÈ',
      phone: '671987654',
      location: 'Rue Nkol-Eton, Porte 34B, Nkol-Eton, Yaoundé',
      city: 'Yaoundé',
    },
    createdAt: '2025-01-10T15:00:00Z',
    updatedAt: '2025-01-11T12:00:00Z',
    confirmedAt: '2025-01-10T15:30:00Z',
    deliveredAt: '2025-01-11T12:00:00Z',
  },
];

// ============ HELPERS ============

// Obtenir les commandes d'un client
export const getOrdersByClient = (clientId: string): Order[] => {
  return mockOrders.filter(o => o.clientId === clientId);
};

// Obtenir les commandes d'un producteur
export const getOrdersByProducer = (producerId: string): Order[] => {
  return mockOrders.filter(o => o.producerId === producerId);
};

// Obtenir une commande par ID
export const getOrderById = (orderId: string): Order | undefined => {
  return mockOrders.find(o => o.id === orderId);
};

// Obtenir les commandes par statut
export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return mockOrders.filter(o => o.status === status);
};

// Générer un nouvel ID de commande
export const generateOrderId = (): string => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `CMD-CM-${dateStr}-${random}`;
};

// Obtenir le résumé d'une commande
export const getOrderSummary = (order: Order): OrderSummary => ({
  orderId: order.id,
  itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
  total: order.total,
  status: order.status,
  createdAt: order.createdAt,
});

// Formater le statut pour l'affichage
export const formatOrderStatus = (status: OrderStatus): string => {
  const statusLabels: Record<OrderStatus, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    processing: 'En préparation',
    ready: 'Prête',
    shipped: 'En livraison',
    delivered: 'Livrée',
    cancelled: 'Annulée',
  };
  return statusLabels[status];
};

// Couleur du statut
export const getStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    pending: '#F59E0B',
    confirmed: '#3B82F6',
    processing: '#8B5CF6',
    ready: '#10B981',
    shipped: '#FF6B35',
    delivered: '#22C55E',
    cancelled: '#EF4444',
  };
  return colors[status];
};
