// src/screens/PrivacyPage.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { useUser } from '../context/UserContext';

const PrivacyPage = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useUser();

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={isDarkMode ? '#E5E7EB' : '#1F2937'} />
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>Politique De Confidentialité</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.iconContainer, isDarkMode && styles.iconContainerDark]}>
          <Shield size={32} color="#F48C06" />
        </View>

        <Text style={[styles.section, isDarkMode && styles.sectionDark]}>
          KOM-B s'engage à protéger votre vie privée. Nous collectons uniquement les données nécessaires pour améliorer votre expérience.
        </Text>

        <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>Données collectées :</Text>
        <Text style={[styles.text, isDarkMode && styles.textDark]}>
          • Nom, email, téléphone{'\n'}
          • Historique de commandes{'\n'}
          • Localisation (si autorisée)
        </Text>

        <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>Utilisation :</Text>
        <Text style={[styles.text, isDarkMode && styles.textDark]}>
          • Traitement des commandes{'\n'}
          • Support client{'\n'}
          • Envoi de promotions (optionnel)
        </Text>

        <Text style={[styles.text, isDarkMode && styles.textDark]}>
          Nous ne vendons jamais vos données. Contact : privacy@kom-b.cm
        </Text>
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
  section: { fontSize: 16, color: '#1F2937', marginBottom: 20, lineHeight: 24 },
  sectionDark: { color: '#E5E7EB' },
  subtitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginTop: 16, marginBottom: 8 },
  subtitleDark: { color: '#E5E7EB' },
  text: { fontSize: 14, color: '#6B7280', lineHeight: 22 },
  textDark: { color: '#9CA3AF' },
});

export default PrivacyPage;