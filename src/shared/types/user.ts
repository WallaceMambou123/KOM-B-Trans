// Types pour les utilisateurs - Partagé entre toutes les apps KOM-B

export type UserRole = 'client' | 'producer' | 'transporter';

export interface User {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface UserProfile extends Omit<User, 'role' | 'createdAt'> {
  // Profile simplifié pour l'affichage
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

export interface ProducerProfile extends User {
  role: 'producer';
  farmName?: string;
  farmSize?: number; // en m²
  farmLocation?: string;
  productions?: string[];
  documents?: string[];
}

export interface TransporterProfile extends User {
  role: 'transporter';
  vehicleType?: string;
  licensePlate?: string;
  isAvailable: boolean;
}
