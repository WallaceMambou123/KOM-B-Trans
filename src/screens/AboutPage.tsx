// src/screens/AboutPage.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Info, Mail, Phone, MapPin } from 'lucide-react-native';
import { useUser } from '../context/UserContext';

const AboutPage = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useUser();

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={isDarkMode ? '#E5E7EB' : '#1F2937'} />
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>À Propos De Kom-B Trans</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.iconContainer, isDarkMode && styles.iconContainerDark]}>
          <Info size={32} color="#F48C06" />
        </View>

        <Text style={[styles.desc, isDarkMode && styles.descDark]}>
          Kom-B Trans est la première plateforme de livraison de produits frais du Cameroun. Nous connectons les agriculteurs locaux directement aux consommateurs.
        </Text>

        <Text style={[styles.version, isDarkMode && styles.versionDark]}>Version 1.0.0</Text>

        <View style={styles.contact}>
          <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('mailto:support@kom-b.cm')}>
            <Mail size={20} color="#F48C06" />
            <Text style={[styles.contactText, isDarkMode && styles.contactTextDark]}>support@kom-b.cm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('tel:+237690000000')}>
            <Phone size={20} color="#F48C06" />
            <Text style={[styles.contactText, isDarkMode && styles.contactTextDark]}>+237 690 00 00 00</Text>
          </TouchableOpacity>

          <View style={styles.contactRow}>
            <MapPin size={20} color="#F48C06" />
            <Text style={[styles.contactText, isDarkMode && styles.contactTextDark]}>Yaoundé, Cameroun</Text>
          </View>
        </View>
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
  content: { padding: 20, alignItems: 'center' },
  iconContainer: { backgroundColor: '#EEF0FF', padding: 16, borderRadius: 20, marginBottom: 24 },
  iconContainerDark: { backgroundColor: '#374151' },
  desc: { fontSize: 16, color: '#1F2937', textAlign: 'center', lineHeight: 24, marginBottom: 16 },
  descDark: { color: '#E5E7EB' },
  version: { fontSize: 14, color: '#9CA3AF', marginBottom: 30 },
  versionDark: { color: '#9CA3AF' },
  contact: { width: '100%' },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  contactText: { fontSize: 15, color: '#1F2937' },
  contactTextDark: { color: '#E5E7EB' },
});

export default AboutPage;