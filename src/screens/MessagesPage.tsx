// src/screens/MessagesPage.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import TabBar from '../components/TabBar';
import { MessageCircle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react-native';


import { useMessages } from '../context/MessagesContext';

type MessagesPageNavigationProp = StackNavigationProp<RootStackParamList, 'MessagesPage'>;

const MessagesPage = () => {
  const navigation = useNavigation<MessagesPageNavigationProp>();
  const insets = useSafeAreaInsets();
  const { messages, loading, markAsRead, markAllAsRead } = useMessages();
  const [currentRoute, setCurrentRoute] = useState('Messages');

  const unreadCount = messages.filter(m => !m.read).length;

  const handleTabPress = (routeName: string) => {
    switch (routeName) {
      case 'Accueil':
        navigation.navigate('HomePage');
        break;
      case 'Produits':
        navigation.navigate('CommandesPage');
        break;
      case 'Statistiques':
        navigation.navigate('StatisticsPage');
        break;
      case 'Parametres':
        navigation.navigate('SettingsPage');
        break;
      default:
        setCurrentRoute(routeName);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#F48C06" />
          <Text style={styles.loadingText}>Chargement des messages...</Text>
        </View>
        <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {/* En-tête */}
        <View style={styles.header}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
          <Text style={styles.title}>Messages ({unreadCount})</Text>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead} style={styles.markAllBtn}>
              <Text style={styles.markAllText}>Tout marquer comme lu</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Liste des messages */}
        {messages.length === 0 ? (
          <View style={styles.empty}>
            <MessageCircle size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>Aucun message pour le moment</Text>
          </View>
        ) : (
          messages.map((msg) => (
            <TouchableOpacity
              key={msg.id}
              style={[styles.messageCard, !msg.read && styles.unreadCard]}
              onPress={() => markAsRead(msg.id)}
            >
              <View style={styles.messageHeader}>
                <Text style={[styles.messageTitle, !msg.read && styles.unreadTitle]}>
                  {msg.title}
                </Text>
                {!msg.read ? (
                  <XCircle size={20} color="#F48C06" />
                ) : (
                  <CheckCircle size={20} color="#10B981" />
                )}
              </View>
              <Text style={styles.messageBody}>{msg.body}</Text>
              <Text style={styles.messageFooter}>il y a {msg.timeAgo}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#666', fontSize: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButton:{
    padding: 8,
        flexDirection: 'row',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  markAllBtn: { backgroundColor: '#F48C06', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  markAllText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { marginTop: 12, color: '#9CA3AF', fontSize: 16 },
  messageCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F48C06',
    backgroundColor: '#FFFBE6',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  unreadTitle: { fontWeight: '700', color: '#F48C06' },
  messageBody: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  messageFooter: { fontSize: 12, color: '#9CA3AF', marginTop: 8 },
});

export default MessagesPage;