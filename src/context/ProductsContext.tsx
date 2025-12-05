// src/context/ProductsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductParams } from '../navigation/AppNavigator';

interface ProductsContextType {
  products: ProductParams[];
  addProduct: (product: ProductParams) => Promise<void>;
  removeProduct: (productName: string) => Promise<void>;
  getProducts: () => ProductParams[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// === Valeurs par défaut (produits initiaux) ===
const initialProducts: ProductParams[] = [
  {
    name: "Cageot de tomates",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfkG7Xfcf5pB_u2FZwF-POEL5hdk28U0ZJ1A&s",
    stock: 230,
    unitPrice: 20,
    price: "20",
    orders: 2,
    interaction: 8,
    description: "Cageot de tomates fraiches",
    weight: "Ouest",
    quality: "Légumes",
  },
  {
    name: "Sacs de manioc",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS30G9Eilj31VNejB3zQ5uZIcig4w1EO66Aew&s",
    stock: 15,
    unitPrice: 20,
    price: "20",
    orders: 5,
    interaction: 12,
    description: "Sacs de manioc de qualité",
    weight: "Ouest",
    quality: "Racines",
  },
  {
    name: "Paniers d'oignons",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbCD_XHeF4boos-3GHTCKMaVepKddoqYbJQg&s",
    stock: 8,
    unitPrice: 20,
    price: "20",
    orders: 1,
    interaction: 3,
    description: "Paniers d'oignons frais",
    weight: "Ouest",
    quality: "Légumes",
  },
  {
    name: "Pois de Bambara",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpjpR0vf4o7V1xhBilG_Z97U5Gz2-T8eYcLg&s",
    stock: 99,
    unitPrice: 20,
    price: "20",
    orders: 0,
    interaction: 25,
    description: "Pois de Bambara de haute qualité",
    weight: "Ouest",
    quality: "Légumineuses",
  },
  {
    name: "Cageot de carottes",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3V5i-CGgnkTwkkbWiHMRJh5EEUNvUgxiew&s",
    stock: 42,
    unitPrice: 20,
    price: "20",
    orders: 3,
    interaction: 10,
    description: "Cageot de carottes fraiches",
    weight: "Ouest",
    quality: "Légumes",
  },
];

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductParams[]>(initialProducts);
  const [isLoaded, setIsLoaded] = useState(false);

  // === Charger les données au démarrage ===
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem('products');
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          setProducts(parsedProducts);
        } else {
          // Sauvegarder les produits initiaux
          await AsyncStorage.setItem('products', JSON.stringify(initialProducts));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        setProducts(initialProducts);
      } finally {
        setIsLoaded(true);
      }
    };

    loadProducts();
  }, []);

  // === Ajouter un produit ===
  const addProduct = async (product: ProductParams) => {
    try {
      const updatedProducts = [...products, product];
      setProducts(updatedProducts);
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      throw error;
    }
  };

  // === Supprimer un produit ===
  const removeProduct = async (productName: string) => {
    try {
      const updatedProducts = products.filter(p => p.name !== productName);
      setProducts(updatedProducts);
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      throw error;
    }
  };

  // === Récupérer les produits ===
  const getProducts = () => products;

  const value: ProductsContextType = {
    products,
    addProduct,
    removeProduct,
    getProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

// === Hook personnalisé ===
export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts doit être utilisé dans ProductsProvider');
  }
  return context;
};
