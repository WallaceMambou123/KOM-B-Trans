// src/screens/SettingsPage.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
  Platform,
  StatusBar,
  Alert,
  Image
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  Globe, Lock, BookOpen, Shield, Info, Trash2,
  User, ChevronRight, LogOut
} from 'lucide-react-native';

import { useUser } from '../context/UserContext';
import TabBar from '../components/TabBar';

type SettingsPageNavigationProp = StackNavigationProp<RootStackParamList, 'SettingsPage'>;

interface SettingsRowProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  isDarkMode: boolean;
  danger?: boolean;
}

const SettingsRow = ({
  icon,
  label,
  onPress,
  hasSwitch,
  switchValue,
  onSwitchChange,
  isDarkMode,
  danger = false,
}: SettingsRowProps) => {
  const rowStyle = [
    s.row,
    isDarkMode && s.rowDark,
    danger && s.rowDanger,
  ];

  const labelStyle = [
    s.label,
    isDarkMode && s.labelDark,
    danger && s.labelDanger,
  ];

  return (
    <TouchableOpacity
      style={rowStyle}
      onPress={onPress}
      disabled={!onPress && !hasSwitch}
      activeOpacity={0.7}
    >
      <View style={[s.iconContainer, isDarkMode && s.iconContainerDark]}>
        {icon}
      </View>
      <Text style={labelStyle}>{label}</Text>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#767577', true: '#F48C06' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#3E3E3E"
        />
      ) : (
        <ChevronRight size={20} color={danger ? '#EF4444' : (isDarkMode ? '#9CA3AF' : '#6B7280')} />
      )}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  rowDark: {
    borderColor: '#374151',
    backgroundColor: '#1F2937',
  },
  rowDanger: {
    borderBottomColor: '#FECACA',
  },
  iconContainer: {
    backgroundColor: '#EEF0FF',
    padding: 8,
    borderRadius: 12,
    marginRight: 16,
  },
  iconContainerDark: {
    backgroundColor: '#374151',
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  labelDark: {
    color: '#E5E7EB',
  },
  labelDanger: {
    color: '#EF4444',
  },
});

const SettingsPage = () => {
  const [currentRoute, setCurrentRoute] = useState('Parametres');
  const navigation = useNavigation<SettingsPageNavigationProp>();
  const insets = useSafeAreaInsets();
  const { profile, isDarkMode, toggleDarkMode, logout } = useUser();
  const [loading, setLoading] = useState(true);
  const fullName = `${profile.firstName} ${profile.lastName}`;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(isDarkMode ? '#111827' : '#FFFFFF');
    }
  }, [isDarkMode]);

  const handleTabPress = (routeName: string) => {
    switch (routeName) {
      case 'Accueil':
        navigation.navigate('HomePage');
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

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Cette action est irréversible. Votre compte et toutes vos données seront supprimées.",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: () => {
          logout();
          navigation.replace('LoginScreen');
        }}
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Se déconnecter",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Déconnexion", onPress: () => {
          logout();
          navigation.replace('LoginScreen');
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#FFFFFF'}
        translucent={false}
      />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#F48C06" />
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: insets.bottom + 100,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* === Section Principale === */}
             <View style={styles.profileCard}
            
             >
                <TouchableOpacity
                onPress={() => navigation.navigate('EditProfilePage')}>
                        <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
                        <Text style={[styles.name, isDarkMode && { color: '#FFFFFF' }]}>{fullName}</Text>
                        <Text style={styles.email}>{profile.email}</Text>
                    </TouchableOpacity>
                    </View>
            
            <View style={[styles.section, isDarkMode && styles.sectionDark]}>
              <SettingsRow
                icon={<Globe size={22} color="#F48C06" />}
                label="Langues"
                onPress={() => navigation.navigate('LanguagePage')}
                isDarkMode={isDarkMode}
              />
              <SettingsRow
                icon={<Lock size={22} color="#F48C06" />}
                label="Réinitialiser Mot De Passe"
                onPress={() => navigation.navigate('ResetPasswordPage')}
                isDarkMode={isDarkMode}
              />
              <SettingsRow
                icon={<BookOpen size={22} color="#F48C06" />}
                label="Guide Utilisateur"
                onPress={() => navigation.navigate('GuidePage')}
                isDarkMode={isDarkMode}
              />
              <SettingsRow
                icon={<Shield size={22} color="#F48C06" />}
                label="Politique De Confidentialité"
                onPress={() => navigation.navigate('PrivacyPage')}
                isDarkMode={isDarkMode}
              />
              <SettingsRow
                icon={<Info size={22} color="#F48C06" />}
                label="À Propos De KOM-B"
                onPress={() => navigation.navigate('AboutPage')}
                isDarkMode={isDarkMode}
              />
              <SettingsRow
                icon={<LogOut size={22} color="#F48C06" />}
                label="Se déconnecter"
                onPress={handleLogout}
                isDarkMode={isDarkMode}
              />
              <SettingsRow
                icon={<Trash2 size={22} color="#EF4444" />}
                label="Supprimer Mon Compte"
                onPress={handleDeleteAccount}
                isDarkMode={isDarkMode}
                danger={true}
              />
            </View>

            {/* === Bouton Profil en bas === */}
            {/* <View style={styles.bottomButtonContainer}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('EditProfilePage')}
              >
                <User size={20} color="#FFFFFF" />
                <Text style={styles.profileButtonText}>Profile</Text>
              </TouchableOpacity>
            </View> */}
          </ScrollView>

          <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  containerDark: { backgroundColor: '#111827' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  sectionDark: { backgroundColor: '#1F2937', elevation: 0, shadowOpacity: 0 },
  bottomButtonContainer: { paddingHorizontal: 16, marginTop: 30, marginBottom: 20 },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F48C06',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  profileButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
   profileCard: { alignItems: 'center', paddingVertical: 20, marginBottom: 20, flex : 1 },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#F48C06', marginBottom: 10 },
    name: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
    email: { fontSize: 14, color: '#9CA3AF' },
});

export default SettingsPage;