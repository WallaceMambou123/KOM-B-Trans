// Mock Data - Utilisateurs pour l'écosystème KOM-B
// Ces IDs sont cohérents entre toutes les apps

import { User, ProducerProfile, TransporterProfile } from '../types';

// ============ CLIENTS (KOM-B App) ============
export const mockClients: User[] = [
  {
    id: 'client-001',
    role: 'client',
    firstName: 'André',
    lastName: 'NGOMÈ',
    email: 'andre.ngome@email.cm',
    phone: '671987654',
    avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'client-002',
    role: 'client',
    firstName: 'Brigitte',
    lastName: 'FOTSO',
    email: 'brigitte.fotso@email.cm',
    phone: '699887766',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-02-20T14:15:00Z',
  },
  {
    id: 'client-003',
    role: 'client',
    firstName: 'Jean',
    lastName: 'MBALLA',
    email: 'jean.mballa@email.cm',
    phone: '655443322',
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-03-10T09:00:00Z',
  },
];

// ============ PRODUCTEURS (KOM-B-Pro App) ============
export const mockProducers: ProducerProfile[] = [
  {
    id: 'producer-001',
    role: 'producer',
    firstName: 'Alice',
    lastName: 'MBARGA',
    email: 'alice.mbarga@kom-b.cm',
    phone: '678123456',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2023-06-01T08:00:00Z',
    farmName: 'Ferme MBARGA',
    farmSize: 50000, // 5 hectares
    farmLocation: 'Route Nationale 6, sortie Ouest de Ngaoundéré',
    productions: ['Tomates', 'Manioc', 'Piment', 'Folong'],
  },
  {
    id: 'producer-002',
    role: 'producer',
    firstName: 'Paul',
    lastName: 'TCHAMI',
    email: 'paul.tchami@kom-b.cm',
    phone: '690112233',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2023-08-15T10:30:00Z',
    farmName: 'Exploitation TCHAMI',
    farmSize: 30000,
    farmLocation: 'Marché Central, Yaoundé',
    productions: ['Papaye', 'Mangue', 'Ananas', 'Avocat'],
  },
  {
    id: 'producer-003',
    role: 'producer',
    firstName: 'Rose',
    lastName: 'NGOH',
    email: 'rose.ngoh@kom-b.cm',
    phone: '677554433',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2023-09-20T12:00:00Z',
    farmName: 'Jardins NGOH',
    farmSize: 20000,
    farmLocation: 'Entrée Melen, Yaoundé',
    productions: ['Igname', 'Macabo', 'Patate douce', 'Carottes'],
  },
];

// ============ TRANSPORTEURS (KOM-B-Trans App) ============
export const mockTransporters: TransporterProfile[] = [
  {
    id: 'transporter-001',
    role: 'transporter',
    firstName: 'Jorel',
    lastName: 'KAMGA',
    email: 'jorel.kamga@kom-b.cm',
    phone: '691234567',
    avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2023-07-10T09:00:00Z',
    vehicleType: 'Moto',
    licensePlate: 'CE 234 CM',
    isAvailable: true,
  },
  {
    id: 'transporter-002',
    role: 'transporter',
    firstName: 'Samuel',
    lastName: 'NKENG',
    email: 'samuel.nkeng@kom-b.cm',
    phone: '675432198',
    avatarUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2023-10-05T11:30:00Z',
    vehicleType: 'Tricycle',
    licensePlate: 'LT 567 CE',
    isAvailable: true,
  },
];

// ============ UTILISATEUR ACTUEL (pour chaque app) ============
// KOM-B (Client)
export const currentClient = mockClients[0];

// KOM-B-Pro (Producteur)
export const currentProducer = mockProducers[0];

// KOM-B-Trans (Transporteur)
export const currentTransporter = mockTransporters[0];

// ============ HELPERS ============
export const getUserById = (id: string): User | undefined => {
  return [...mockClients, ...mockProducers, ...mockTransporters].find(u => u.id === id);
};

export const getProducerById = (id: string): ProducerProfile | undefined => {
  return mockProducers.find(p => p.id === id);
};

export const getTransporterById = (id: string): TransporterProfile | undefined => {
  return mockTransporters.find(t => t.id === id);
};
