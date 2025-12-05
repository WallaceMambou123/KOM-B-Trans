// src/screens/LanguagePage.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Globe, Check } from 'lucide-react-native';
import { useUser } from '../context/UserContext';

const LanguagePage = () => {
  const navigation = useNavigation();
  const { language, setLanguage, isDarkMode } = useUser();

  const languages = [
    { code: 'fr', name: 'Français', flag: 'FR' },
    { code: 'en', name: 'English', flag: 'GB' },
  ];

  const handleSelect = (lang: 'fr' | 'en') => {
    if (lang === language) return;

    Alert.alert(
      "Changer la langue",
      `Passer à ${lang === 'fr' ? 'Français' : 'English'} ?`,
      [
        { text: "Annuler", style: "cancel" },
        { text: "OK", onPress: () => {
          setLanguage(lang);
          Alert.alert("Langue modifiée", "L'application va redémarrer dans la nouvelle langue.", [
            { text: "OK" }
          ]);
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={isDarkMode ? '#E5E7EB' : '#1F2937'} />
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>Langues</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={[styles.iconContainer, isDarkMode && styles.iconContainerDark]}>
          <Globe size={32} color="#F48C06" />
        </View>

        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.langRow,
              isDarkMode && styles.langRowDark,
              language === lang.code && styles.langRowSelected
            ]}
            onPress={() => handleSelect(lang.code as 'fr' | 'en')}
          >
            <View style={styles.flag}>
              <Text style={styles.flagText}>{lang.flag}</Text>
            </View>
            <Text style={[
              styles.langName,
              isDarkMode && styles.langNameDark,
              language === lang.code && styles.langNameSelected
            ]}>
              {lang.name}
            </Text>
            {language === lang.code && (
              <Check size={20} color="#F48C06" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  containerDark: { backgroundColor: '#111827' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  titleDark: { color: '#E5E7EB' },
  content: { padding: 20 },
  iconContainer: { alignSelf: 'center', backgroundColor: '#EEF0FF', padding: 16, borderRadius: 20, marginBottom: 30 },
  iconContainerDark: { backgroundColor: '#374151' },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  langRowDark: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
  },
  langRowSelected: {
    borderColor: '#F48C06',
    backgroundColor: '#FFF4E5',
  },
  flag: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  flagText: { fontSize: 16 },
  langName: { flex: 1, fontSize: 16, color: '#1F2937', fontWeight: '500' },
  langNameDark: { color: '#E5E7EB' },
  langNameSelected: { color: '#F48C06', fontWeight: '600' },
});

export default LanguagePage;