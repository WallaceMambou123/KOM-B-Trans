// src/screens/GuidePage.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react-native';
import { useUser } from '../context/UserContext';

const GuidePage = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useUser();

  const guides = [
    { title: "Comment commander ?", desc: "Suivez les étapes simples pour passer une commande." },
    { title: "Suivi de commande", desc: "Visualisez l'état de votre livraison en temps réel." },
    { title: "Paiement sécurisé", desc: "Mobile Money, carte ou à la livraison." },
    { title: "Contactez-nous", desc: "Support 24/7 via chat ou appel." },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={isDarkMode ? '#E5E7EB' : '#1F2937'} />
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>Guide Utilisateur</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.iconContainer, isDarkMode && styles.iconContainerDark]}>
          <BookOpen size={32} color="#F48C06" />
        </View>

        {guides.map((item, i) => (
          <TouchableOpacity key={i} style={[styles.card, isDarkMode && styles.cardDark]}>
            <Text style={[styles.cardTitle, isDarkMode && styles.cardTitleDark]}>{item.title}</Text>
            <Text style={[styles.cardDesc, isDarkMode && styles.cardDescDark]}>{item.desc}</Text>
            <ChevronRight size={20} color="#F48C06" style={{ alignSelf: 'flex-end', marginTop: 8 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  containerDark: { backgroundColor: '#111827' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  title: { marginLeft: 16, fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  titleDark: { color: '#E5E7EB' },
  content: { padding: 20 },
  iconContainer: { alignSelf: 'center', backgroundColor: '#EEF0FF', padding: 16, borderRadius: 20, marginBottom: 24 },
  iconContainerDark: { backgroundColor: '#374151' },
  card: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardDark: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  cardTitleDark: { color: '#E5E7EB' },
  cardDesc: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  cardDescDark: { color: '#9CA3AF' },
});

export default GuidePage;