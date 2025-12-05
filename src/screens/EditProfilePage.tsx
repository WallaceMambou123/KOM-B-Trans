// src/screens/EditProfilePage.tsx
import React, { useState } from 'react';
import {
  StyleSheet, View, TextInput, Text, TouchableOpacity,
  ScrollView, Alert, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ArrowLeft } from 'lucide-react-native';
import { useUser } from '../context/UserContext';
import ProfileImage from '../components/ProfileImage';

type EditProfilePageNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfilePage'>;

const EditProfilePage = () => {
  const navigation = useNavigation<EditProfilePageNavigationProp>();
  const { profile, updateProfile } = useUser();

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [avatarUri, setAvatarUri] = useState(profile.avatarUrl);

  const handleUpdateProfile = () => {
    updateProfile({
      firstName,
      lastName,
      email,
      phone,
      avatarUrl: avatarUri
    });

    Alert.alert("Succès", "Profil mis à jour !", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  const handleImageChange = (uri: string) => {
    setAvatarUri(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modifier le Profil</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Avatar avec ProfileImage */}
        <ProfileImage
          initialImage={avatarUri}
          onImageChange={handleImageChange}
        />
        

        {/* Champs */}
        <Text style={styles.inputLabel}>Nom</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

        <Text style={styles.inputLabel}>Prénom</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.inputLabel}>Téléphone</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        {/* Bouton */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderColor: '#f0f0f0' 
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  scrollContent: { padding: 20 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#374151', marginTop: 12, marginBottom: 6 },
  input: { 
    backgroundColor: '#f3f4f6', 
    padding: 14, 
    borderRadius: 12, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#e5e7eb' 
  },
  updateButton: { 
    backgroundColor: '#F48C06', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 30 
  },
  updateButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 }
});

export default EditProfilePage;