// src/context/MessagesContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Message {
  id: string;
  title: string;
  body: string;
  read: boolean;
  timeAgo: string;
}

interface MessagesContextType {
  messages: Message[];
  loading: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Simuler chargement depuis API ou JSON
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        title: 'Validation Produit',
        body: 'Votre produit (cagnot de tomates) a été validé avec succès et est maintenant visible par les acheteurs sur Kom-B! Préparez-vous à recevoir vos premières commandes !',
        read: false,
        timeAgo: '2 min',
      },
      {
        id: '2',
        title: 'Validation Produit',
        body: 'Votre produit (cagnot de tomates) a été validé avec succès et est maintenant visible par les acheteurs sur Kom-B! Préparez-vous à recevoir vos premières commandes !',
        read: true,
        timeAgo: '1h',
      },
    ];

    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 800);
  }, []);

  const markAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const markAllAsRead = () => {
    setMessages(prev => prev.map(msg => ({ ...msg, read: true })));
  };

  return (
    <MessagesContext.Provider value={{ messages, loading, markAsRead, markAllAsRead }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) throw new Error('useMessages must be used within MessagesProvider');
  return context;
};