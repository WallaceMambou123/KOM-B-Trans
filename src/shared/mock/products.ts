// Mock Data - Produits pour l'écosystème KOM-B
// Les producerId référencent les utilisateurs dans users.ts

import { Product, ProductCategory } from '../types';

export const mockProducts: Product[] = [
  // ============ PRODUITS DE ALICE MBARGA (producer-001) ============
  {
    id: 'product-001',
    producerId: 'producer-001',
    name: 'Cageot de Tomates Fraîches',
    description: 'Tomates rouges bien mûres, cultivées sans pesticides. Idéales pour les sauces et salades.',
    price: 2500,
    oldPrice: 3000,
    imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'agricole',
    stock: 230,
    weight: '5kg',
    quality: 'A',
    variety: 'Roma',
    orderCount: 156,
    rating: 4.8,
    badge: 'Promo',
    badgeColor: '#FF6B35',
    details: [
      'Cultivées localement à Ngaoundéré',
      'Sans pesticides ni engrais chimiques',
      'Récoltées à maturité optimale',
      'Conservation 5-7 jours au frais',
    ],
    seller: {
      id: 'producer-001',
      name: 'Mme Alice MBARGA',
      producer: 'Ferme MBARGA',
      rating: 4.9,
      phone: '678123456',
      location: 'Ngaoundéré',
    },
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'product-002',
    producerId: 'producer-001',
    name: 'Sacs de Manioc Frais',
    description: 'Tubercules de manioc de qualité supérieure. Parfaits pour le foufou et le tapioca.',
    price: 3500,
    imageUrl: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'agricole',
    stock: 15,
    weight: '10kg',
    quality: 'A',
    orderCount: 89,
    rating: 4.7,
    badge: 'Stock limité',
    badgeColor: '#F59E0B',
    details: [
      'Manioc doux, facile à préparer',
      'Récolté cette semaine',
      'Idéal pour le foufou traditionnel',
    ],
    seller: {
      id: 'producer-001',
      name: 'Mme Alice MBARGA',
      producer: 'Ferme MBARGA',
      rating: 4.9,
      phone: '678123456',
      location: 'Ngaoundéré',
    },
    createdAt: '2024-01-12T09:30:00Z',
  },
  {
    id: 'product-003',
    producerId: 'producer-001',
    name: 'Piment Frais du Cameroun',
    description: 'Piments rouges et verts, très parfumés. Force moyenne à forte selon variété.',
    price: 1500,
    imageUrl: 'https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'condiment',
    stock: 50,
    weight: '500g',
    quality: 'A',
    orderCount: 234,
    rating: 4.9,
    details: [
      'Mélange de piments rouges et verts',
      'Cultivés naturellement',
      'Parfum intense et authentique',
    ],
    seller: {
      id: 'producer-001',
      name: 'Mme Alice MBARGA',
      producer: 'Ferme MBARGA',
      rating: 4.9,
      phone: '678123456',
      location: 'Ngaoundéré',
    },
    createdAt: '2024-01-15T10:00:00Z',
  },

  // ============ PRODUITS DE PAUL TCHAMI (producer-002) ============
  {
    id: 'product-004',
    producerId: 'producer-002',
    name: 'Mangues Locales Bio',
    description: 'Mangues sucrées et juteuses de variété locale. Récoltées à maturité.',
    price: 2500,
    oldPrice: 3000,
    imageUrl: 'https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'agricole',
    stock: 80,
    weight: '1kg',
    quality: 'A',
    orderCount: 178,
    rating: 4.8,
    badge: 'Bio',
    badgeColor: '#22C55E',
    details: [
      'Variété locale camerounaise',
      'Culture biologique certifiée',
      'Goût sucré et parfumé',
      'Idéales pour jus et desserts',
    ],
    seller: {
      id: 'producer-002',
      name: 'M. Paul TCHAMI',
      producer: 'Exploitation TCHAMI',
      rating: 4.6,
      phone: '690112233',
      location: 'Yaoundé Centre',
    },
    createdAt: '2024-02-01T08:00:00Z',
  },
  {
    id: 'product-005',
    producerId: 'producer-002',
    name: 'Avocats Bio Premium',
    description: 'Avocats crémeux de grande taille. Parfaits pour guacamole et salades.',
    price: 1800,
    oldPrice: 2000,
    imageUrl: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'agricole',
    stock: 45,
    weight: 'pièce',
    quality: 'A',
    orderCount: 95,
    rating: 4.7,
    details: [
      'Avocat Hass premium',
      'Chair crémeuse et goûteuse',
      'Riche en bonnes graisses',
    ],
    seller: {
      id: 'producer-002',
      name: 'M. Paul TCHAMI',
      producer: 'Exploitation TCHAMI',
      rating: 4.6,
      phone: '690112233',
      location: 'Yaoundé Centre',
    },
    createdAt: '2024-02-05T09:00:00Z',
  },
  {
    id: 'product-006',
    producerId: 'producer-002',
    name: 'Ananas Doux du Cameroun',
    description: 'Ananas Victoria très sucrés et parfumés. Le meilleur du Cameroun.',
    price: 1000,
    imageUrl: 'https://images.pexels.com/photos/1071878/pexels-photo-1071878.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'agricole',
    stock: 120,
    weight: 'pièce',
    quality: 'A',
    orderCount: 312,
    rating: 4.9,
    badge: 'Best-seller',
    badgeColor: '#FF6B35',
    details: [
      'Variété Victoria extra-douce',
      'Cultivé au soleil camerounais',
      'Maturité parfaite garantie',
    ],
    seller: {
      id: 'producer-002',
      name: 'M. Paul TCHAMI',
      producer: 'Exploitation TCHAMI',
      rating: 4.6,
      phone: '690112233',
      location: 'Yaoundé Centre',
    },
    createdAt: '2024-02-10T10:30:00Z',
  },

  // ============ PRODUITS DE ROSE NGOH (producer-003) ============
  {
    id: 'product-007',
    producerId: 'producer-003',
    name: 'Ignames Blanches',
    description: 'Ignames de qualité supérieure pour le pilé. Texture parfaite garantie.',
    price: 4500,
    imageUrl: 'https://images.pexels.com/photos/5529599/pexels-photo-5529599.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'agricole',
    stock: 35,
    weight: '8kg',
    quality: 'A',
    orderCount: 67,
    rating: 4.6,
    details: [
      'Ignames blanches traditionnelles',
      'Idéales pour le pilé',
      'Conservation longue durée',
    ],
    seller: {
      id: 'producer-003',
      name: 'Mme Rose NGOH',
      producer: 'Jardins NGOH',
      rating: 4.5,
      phone: '677554433',
      location: 'Melen, Yaoundé',
    },
    createdAt: '2024-02-15T08:00:00Z',
  },
  {
    id: 'product-008',
    producerId: 'producer-003',
    name: 'Macabo Frais',
    description: 'Tubercules de macabo tendres et savoureux. Parfaits pour accompagnements.',
    price: 3000,
    imageUrl: 'https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'agricole',
    stock: 28,
    weight: '5kg',
    quality: 'B',
    orderCount: 45,
    rating: 4.4,
    details: [
      'Macabo blanc de qualité',
      'Récolté à maturité',
      'Goût authentique',
    ],
    seller: {
      id: 'producer-003',
      name: 'Mme Rose NGOH',
      producer: 'Jardins NGOH',
      rating: 4.5,
      phone: '677554433',
      location: 'Melen, Yaoundé',
    },
    createdAt: '2024-02-18T09:00:00Z',
  },
  {
    id: 'product-009',
    producerId: 'producer-003',
    name: 'Patates Douces Orange',
    description: 'Patates douces à chair orange, riches en vitamines. Goût sucré naturel.',
    price: 1200,
    imageUrl: 'https://images.pexels.com/photos/89247/pexels-photo-89247.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'agricole',
    stock: 90,
    weight: '1kg',
    quality: 'A',
    orderCount: 123,
    rating: 4.7,
    details: [
      'Riche en bêta-carotène',
      'Goût naturellement sucré',
      'Polyvalentes en cuisine',
    ],
    seller: {
      id: 'producer-003',
      name: 'Mme Rose NGOH',
      producer: 'Jardins NGOH',
      rating: 4.5,
      phone: '677554433',
      location: 'Melen, Yaoundé',
    },
    createdAt: '2024-02-20T10:00:00Z',
  },
  {
    id: 'product-010',
    producerId: 'producer-003',
    name: 'Carottes Fraîches',
    description: 'Carottes croquantes et sucrées. Idéales crues ou cuisinées.',
    price: 800,
    imageUrl: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'agricole',
    stock: 150,
    weight: '1kg',
    quality: 'A',
    orderCount: 198,
    rating: 4.8,
    details: [
      'Carottes fraîchement récoltées',
      'Goût sucré et croquant',
      'Sans traitement chimique',
    ],
    seller: {
      id: 'producer-003',
      name: 'Mme Rose NGOH',
      producer: 'Jardins NGOH',
      rating: 4.5,
      phone: '677554433',
      location: 'Melen, Yaoundé',
    },
    createdAt: '2024-02-22T11:00:00Z',
  },
];

// ============ HELPERS ============

// Formatter le prix pour l'affichage
export const formatPrice = (price: number): string => {
  return price.toLocaleString('fr-FR') + ' CFA';
};

// Obtenir les produits par catégorie
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return mockProducts.filter(p => p.category === category);
};

// Obtenir les produits d'un producteur
export const getProductsByProducer = (producerId: string): Product[] => {
  return mockProducts.filter(p => p.producerId === producerId);
};

// Obtenir les offres du jour (produits avec oldPrice)
export const getDailyOffers = (): Product[] => {
  return mockProducts.filter(p => p.oldPrice !== undefined);
};

// Obtenir les produits recommandés (best ratings)
export const getRecommendedProducts = (): Product[] => {
  return [...mockProducts]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);
};

// Rechercher des produits
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
};

// Obtenir un produit par ID
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(p => p.id === id);
};

// Categories disponibles
export const productCategories: { id: ProductCategory; name: string; icon: string }[] = [
  { id: 'agricole', name: 'Produits agricoles', icon: 'leaf' },
  { id: 'elevage', name: 'Produits d\'élevage', icon: 'egg' },
  { id: 'halieutique', name: 'Produits halieutiques', icon: 'fish' },
  { id: 'condiment', name: 'Condiments & Épices', icon: 'flame' },
  { id: 'transforme', name: 'Produits transformés', icon: 'package' },
];
