// Types pour les livraisons - Partagé entre toutes les apps KOM-B

export type DeliveryStatus =
  | 'available'     // Disponible pour un transporteur
  | 'accepted'      // Acceptée par un transporteur
  | 'pickup'        // En cours de récupération chez le producteur
  | 'in_transit'    // En transit vers le client
  | 'delivered'     // Livrée au client
  | 'cancelled';    // Annulée

export interface ContactInfo {
  name: string;
  phone: string;
  address: string;
}

export interface Delivery {
  id: string;
  orderId: string;
  transporterId?: string;
  status: DeliveryStatus;

  // Informations de contact
  producerInfo: ContactInfo;
  clientInfo: ContactInfo;

  // Détails de la livraison
  distance: string;
  estimatedTime: string;
  amount: number;
  content: string;

  // Timestamps
  createdAt: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;

  // Notes et commentaires
  notes?: string;
  deliveryProof?: string; // URL de la photo de livraison
}

export interface DeliveryStats {
  totalDeliveries: number;
  completedToday: number;
  totalEarnings: number;
  averageRating: number;
  totalDistance: number;
}

// Pour l'affichage dans la liste
export interface DeliveryCard {
  id: string;
  date: string;
  destination: string;
  distance: string;
  estimatedTime: string;
  amount: string;
  status: DeliveryStatus;
}

// Workflow de livraison (3 étapes)
export type DeliveryStep = 'recuperer' | 'livrer' | 'confirmer';

export interface DeliveryWorkflow {
  currentStep: DeliveryStep;
  steps: {
    recuperer: boolean;
    livrer: boolean;
    confirmer: boolean;
  };
}
