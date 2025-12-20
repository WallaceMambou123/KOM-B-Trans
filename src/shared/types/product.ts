// Types pour les produits - Partagé entre toutes les apps KOM-B

export interface Product {
  id: string;
  producerId: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  category: ProductCategory;
  stock: number;
  weight?: string;
  quality?: ProductQuality;
  variety?: string;
  orderCount: number;
  rating?: number;
  badge?: string;
  badgeColor?: string;
  details?: string[];
  seller?: SellerInfo;
  createdAt: string;
  updatedAt?: string;
}

export type ProductCategory =
  | 'agricole'      // Produits agricoles (légumes, fruits)
  | 'elevage'       // Produits d'élevage
  | 'halieutique'   // Produits de la pêche
  | 'condiment'     // Condiments et épices
  | 'transforme';   // Produits transformés

export type ProductQuality = 'A' | 'B' | 'C';

export interface SellerInfo {
  id: string;
  name: string;
  producer: string;
  rating: number;
  phone?: string;
  location?: string;
}

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  quality?: ProductQuality;
  searchQuery?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

// Pour la compatibilité avec l'affichage
export interface ProductDisplay {
  id: string;
  name: string;
  price: string; // Formaté pour l'affichage (ex: "2 500 CFA")
  priceNumeric: number;
  oldPrice?: string;
  imageUrl: string;
  description: string;
  orderCount: number;
  category: string;
  stock: number;
}
