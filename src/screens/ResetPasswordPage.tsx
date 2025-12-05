// src/screens/ResetPasswordPage.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ArrowLeft, Lock } from 'lucide-react-native';
import { useUser } from '../context/UserContext';

type ResetPasswordNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPasswordPage'>;

const ResetPasswordPage = () => {
  const navigation = useNavigation<ResetPasswordNavigationProp>();
  const { isDarkMode } = useUser();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    // TODO: Appeler API
    Alert.alert('Succès', 'Mot de passe réinitialisé !', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#FFFFFF'}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={isDarkMode ? '#E5E7EB' : '#1F2937'} />
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>
          Réinitialiser Mot De Passe
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.iconContainer, isDarkMode && styles.iconContainerDark]}>
          <Lock size={32} color="#F48C06" />
        </View>

        <Text style={[styles.label, isDarkMode && styles.labelDark]}>Mot de passe actuel</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor={isDarkMode ? '#9CA3AF' : '#9CA3AF'}
        />

        <Text style={[styles.label, isDarkMode && styles.labelDark]}>Nouveau mot de passe</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor={isDarkMode ? '#9CA3AF' : '#9CA3AF'}
        />

        <Text style={[styles.label, isDarkMode && styles.labelDark]}>Confirmer</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor={isDarkMode ? '#9CA3AF' : '#9CA3AF'}
        />

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  containerDark: { backgroundColor: '#111827' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backButton: { padding: 5 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  titleDark: { color: '#E5E7EB' },
  content: { padding: 20 },
  iconContainer: { alignSelf: 'center', backgroundColor: '#EEF0FF', padding: 16, borderRadius: 20, marginBottom: 24 },
  iconContainerDark: { backgroundColor: '#374151' },
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 },
  labelDark: { color: '#D1D5DB' },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  inputDark: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    color: '#E5E7EB',
  },
  button: {
    backgroundColor: '#F48C06',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});

export default ResetPasswordPage;