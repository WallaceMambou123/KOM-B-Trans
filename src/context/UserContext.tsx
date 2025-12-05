// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  // Authentication
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// === Valeurs par défaut ===
const initialProfile: UserProfile = {
  firstName: "Jordan",
  lastName: "DuPont",
  email: "jordan@kom-b-pro.com",
  phone: "209302398",
  avatarUrl: "https://preview.redd.it/on-a-scale-from-1-to-10-how-cute-is-kid-goku-v0-jjoxgpfxabqe1.jpg?width=640&crop=smart&auto=webp&s=1f5f6dea7fd3517bb7469cfd28fd27f58f924ac5"
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguageState] = useState<'fr' | 'en'>('fr');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // === Charger les données au démarrage ===
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        const savedDarkMode = await AsyncStorage.getItem('isDarkMode');
        const savedLang = await AsyncStorage.getItem('language');
        const savedToken = await AsyncStorage.getItem('authToken');

        if (savedProfile) setProfile(JSON.parse(savedProfile));
        if (savedDarkMode) setIsDarkMode(savedDarkMode === 'true');
        if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
          setLanguageState(savedLang as 'fr' | 'en');
        }
        if (savedToken) {
          setAuthToken(savedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erreur chargement UserContext:', error);
      }
    };
    loadData();
  }, []);

  // === Sauvegarder à chaque changement ===
  useEffect(() => {
    AsyncStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    AsyncStorage.setItem('isDarkMode', isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    AsyncStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    if (authToken) {
      AsyncStorage.setItem('authToken', authToken);
    } else {
      AsyncStorage.removeItem('authToken');
    }
  }, [authToken]);

  // === Fonctions ===
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setLanguage = (lang: 'fr' | 'en') => {
    setLanguageState(lang);
  };

  // === Auth functions ===
  const login = async (email: string, password: string) => {
    // NOTE: This is a placeholder. Replace with real auth call.
    // For now we accept any non-empty credentials and store a dummy token.
    if (!email || !password) throw new Error('Invalid credentials');
    const token = 'dummy-token-' + Date.now();
    setAuthToken(token);
    setIsAuthenticated(true);
    // Optionally update profile email
    setProfile(prev => ({ ...prev, email }));
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['userProfile', 'isDarkMode', 'language', 'authToken']);
      setProfile(initialProfile);
      setIsDarkMode(false);
      setLanguageState('fr');
      setAuthToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erreur logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{
      profile,
      updateProfile,
      isDarkMode,
      toggleDarkMode,
      language,
      setLanguage,
      logout,
      // auth
      isAuthenticated,
      login,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};