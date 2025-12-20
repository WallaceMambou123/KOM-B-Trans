// Mock Data - Livraisons pour l'écosystème KOM-B
// Lie les commandes aux transporteurs

import { Delivery, DeliveryStatus, DeliveryStats, DeliveryCard } from '../types';

export const mockDeliveries: Delivery[] = [
  {
    id: 'DEL-001',
    orderId: 'CMD-CM-20250112-001',
    transporterId: 'transporter-001',
    status: 'in_transit',
    producerInfo: {
      name: 'Mme Alice MBARGA',
      phone: '678123456',
      address: 'Route Nationale 6, sortie Ouest de Ngaoundéré',
    },
    clientInfo: {
      name: 'Monsieur André NGOMÈ',
      phone: '671987654',
      address: 'Rue Nkol-Eton, Porte 34B, Nkol-Eton, Yaoundé',
    },
    distance: '15 km',
    estimatedTime: '25 min',
    amount: 5000,
    content: 'Légumes frais (Tomates, Piment) - Environ 10-12 kg',
    createdAt: '2025-01-12T10:30:00Z',
    acceptedAt: '2025-01-12T11:00:00Z',
    pickedUpAt: '2025-01-12T12:00:00Z',
  },
  {
    id: 'DEL-002',
    orderId: 'CMD-CM-20250113-002',
    status: 'available',
    producerInfo: {
      name: 'M. Paul TCHAMI',
      phone: '690112233',
      address: 'Marché Central, Yaoundé',
    },
    clientInfo: {
      name: 'Mme Brigitte FOTSO',
      phone: '699887766',
      address: 'Rue Bastos, Immeuble 12, Yaoundé',
    },
    distance: '8 km',
    estimatedTime: '15 min',
    amount: 3000,
    content: 'Fruits (Mangues, Ananas) - 5 kg',
    createdAt: '2025-01-13T09:15:00Z',
  },
  {
    id: 'DEL-003',
    orderId: 'CMD-CM-20250114-003',
    status: 'available',
    producerInfo: {
      name: 'Mme Rose NGOH',
      phone: '677554433',
      address: 'Entrée Melen, Yaoundé',
    },
    clientInfo: {
      name: 'M. Jean MBALLA',
      phone: '655443322',
      address: 'Cité Melen, Bloc B, Yaoundé',
    },
    distance: '10 km',
    estimatedTime: '20 min',
    amount: 4500,
    content: 'Tubercules (Igname, Macabo) - 13 kg',
    createdAt: '2025-01-14T08:00:00Z',
  },
  {
    id: 'DEL-004',
    orderId: 'CMD-CM-20250110-004',
    transporterId: 'transporter-001',
    status: 'delivered',
    producerInfo: {
      name: 'M. Paul TCHAMI',
      phone: '690112233',
      address: 'Marché Central, Yaoundé',
    },
    clientInfo: {
      name: 'Monsieur André NGOMÈ',
      phone: '671987654',
      address: 'Rue Nkol-Eton, Porte 34B, Nkol-Eton, Yaoundé',
    },
    distance: '12 km',
    estimatedTime: '22 min',
    amount: 4000,
    content: 'Fruits (Avocats Bio) - 5 pièces',
    createdAt: '2025-01-10T15:00:00Z',
    acceptedAt: '2025-01-10T15:30:00Z',
    pickedUpAt: '2025-01-10T16:00:00Z',
    deliveredAt: '2025-01-11T12:00:00Z',
    deliveryProof: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg',
  },
  {
    id: 'DEL-005',
    orderId: 'CMD-CM-20250115-005',
    status: 'available',
    producerInfo: {
      name: 'Mme Alice MBARGA',
      phone: '678123456',
      address: 'Route Nationale 6, sortie Ouest de Ngaoundéré',
    },
    clientInfo: {
      name: 'M. Pierre ESSOMBA',
      phone: '677112233',
      address: 'Quartier Omnisports, Yaoundé',
    },
    distance: '18 km',
    estimatedTime: '35 min',
    amount: 6000,
    content: 'Légumes variés (Manioc, Tomates, Piment) - 20 kg',
    createdAt: '2025-01-15T07:00:00Z',
  },
];

// ============ HELPERS ============

// Obtenir les livraisons disponibles
export const getAvailableDeliveries = (): Delivery[] => {
  return mockDeliveries.filter(d => d.status === 'available');
};

// Obtenir les livraisons d'un transporteur
export const getDeliveriesByTransporter = (transporterId: string): Delivery[] => {
  return mockDeliveries.filter(d => d.transporterId === transporterId);
};

// Obtenir une livraison par ID
export const getDeliveryById = (deliveryId: string): Delivery | undefined => {
  return mockDeliveries.find(d => d.id === deliveryId);
};

// Obtenir une livraison par ID de commande
export const getDeliveryByOrderId = (orderId: string): Delivery | undefined => {
  return mockDeliveries.find(d => d.orderId === orderId);
};

// Obtenir les livraisons par statut
export const getDeliveriesByStatus = (status: DeliveryStatus): Delivery[] => {
  return mockDeliveries.filter(d => d.status === status);
};

// Générer un nouvel ID de livraison
export const generateDeliveryId = (): string => {
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `DEL-${random}`;
};

// Formater le statut pour l'affichage
export const formatDeliveryStatus = (status: DeliveryStatus): string => {
  const statusLabels: Record<DeliveryStatus, string> = {
    available: 'Disponible',
    accepted: 'Acceptée',
    pickup: 'En récupération',
    in_transit: 'En transit',
    delivered: 'Livrée',
    cancelled: 'Annulée',
  };
  return statusLabels[status];
};

// Couleur du statut
export const getDeliveryStatusColor = (status: DeliveryStatus): string => {
  const colors: Record<DeliveryStatus, string> = {
    available: '#3B82F6',
    accepted: '#8B5CF6',
    pickup: '#F59E0B',
    in_transit: '#FF6B35',
    delivered: '#22C55E',
    cancelled: '#EF4444',
  };
  return colors[status];
};

// Convertir pour l'affichage en carte
export const toDeliveryCard = (delivery: Delivery): DeliveryCard => ({
  id: delivery.id,
  date: new Date(delivery.createdAt).toLocaleDateString('fr-FR'),
  destination: delivery.clientInfo.address.split(',')[0],
  distance: delivery.distance,
  estimatedTime: delivery.estimatedTime,
  amount: delivery.amount.toLocaleString('fr-FR') + ' CFA',
  status: delivery.status,
});

// Statistiques du transporteur
export const getTransporterStats = (transporterId: string): DeliveryStats => {
  const deliveries = getDeliveriesByTransporter(transporterId);
  const completed = deliveries.filter(d => d.status === 'delivered');
  const today = new Date().toDateString();
  const completedToday = completed.filter(d =>
    new Date(d.deliveredAt || '').toDateString() === today
  ).length;

  return {
    totalDeliveries: deliveries.length,
    completedToday,
    totalEarnings: completed.reduce((sum, d) => sum + d.amount, 0),
    averageRating: 4.7, // Mock value
    totalDistance: completed.length * 12, // Mock average
  };
};

// Formater le montant
export const formatAmount = (amount: number): string => {
  return amount.toLocaleString('fr-FR') + ' CFA';
};
