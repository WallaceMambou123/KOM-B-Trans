import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// @ts-ignore: allow importing .svg without a declaration during development
import BGPanner from "../../assets/images/Group.svg";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { ChevronLeft, Eye, EyeClosed, FilePlus2, MapPin } from 'lucide-react-native';

// Importation de la modale de confirmation
import ConfirmationScreen from './ConfirmationScreen';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'> & {
    navigate: (screen: 'LoginScreen' | 'ConfirmationScreen', params?: any) => void;
};

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    caracteristiquesExploitation: '',
    productions: '',
    localisation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nom.trim()) {
      Alert.alert('Erreur', 'Le nom est requis');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return false;
    }
    if (!formData.telephone.trim()) {
      Alert.alert('Erreur', 'Le numéro de téléphone est requis');
      return false;
    }
    if (!formData.motDePasse.trim() || formData.motDePasse.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    if (formData.motDePasse !== formData.confirmerMotDePasse) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Données du formulaire:', formData);
      setIsModalVisible(true);
    }
  };

  const navigateToLogin = () => {
    setIsModalVisible(false);
    navigation.navigate('LoginScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* === ARRIÈRE-PLAN SVG ABSOLU === */}
      <View style={styles.backgroundWrapper}>
        <BGPanner
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* === CONTENU PRINCIPAL (scrollable) === */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* En-tête avec logo centré et flèche de retour */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft color="black" size={24} />
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/componentLogo.png')}
            style={styles.logo}
          />
        </View>

        {/* Formulaire */}
        <View style={styles.formContainer}>

          {/* Nom */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre nom complet"
              value={formData.nom}
              onChangeText={(value) => handleInputChange('nom', value)}
              autoCapitalize="words"
              placeholderTextColor="#999"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="exemple@email.com"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          {/* Téléphone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="+237 6XX XXX XXX"
              value={formData.telephone}
              onChangeText={(value) => handleInputChange('telephone', value)}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>

          {/* Mot de passe */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Minimum 6 caractères"
                value={formData.motDePasse}
                onChangeText={(value) => handleInputChange('motDePasse', value)}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye color="#C2621B" size={24}/> : <EyeClosed size={24} color="#C2621B"/>}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirmer mot de passe */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmerMotDePasse}
                onChangeText={(value) => handleInputChange('confirmerMotDePasse', value)}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword
                  ? <Eye size={24} color="#C2621B" />
                  : <EyeClosed size={24} color="#C2621B" />
                }
              </TouchableOpacity>
            </View>
          </View>

          {/* Caractéristiques de l'exploitation */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Surface de l'exploitation</Text>
            <View style={styles.unitInputContainer}>
              <TextInput
                style={styles.unitInput}
                placeholder="Ex: 5000"
                value={formData.caracteristiquesExploitation}
                onChangeText={(value) => handleInputChange('caracteristiquesExploitation', value)}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              <Text style={styles.unitText}>m²</Text>
            </View>
          </View>

          {/* Productions */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type de productions</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Tomates, Maïs, Manioc..."
              value={formData.productions}
              onChangeText={(value) => handleInputChange('productions', value)}
              placeholderTextColor="#999"
            />
          </View>

          {/* Localisation */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Localisation</Text>
            <View style={styles.locationContainer}>
              <TextInput
                style={styles.locationInput}
                placeholder="Région, Ville"
                value={formData.localisation}
                onChangeText={(value) => handleInputChange('localisation', value)}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.locationButton}>
                <MapPin size={24} color={"#F48C06"}/>
              </TouchableOpacity>
            </View>
          </View>

          {/* Documents justificatifs */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Documents justificatifs (optionnel)</Text>
            <TouchableOpacity style={styles.documentButton}>
              <FilePlus2 size={32} color={"#F48C06"}/>
              <Text style={styles.documentText}>Ajouter un document</Text>
            </TouchableOpacity>
          </View>

          {/* Mentions légales */}
          <Text style={styles.legalText}>
            En continuant, vous acceptez les{' '}
            <Text style={styles.linkText}>Conditions d'utilisation</Text>
            {' '}et la{' '}
            <Text style={styles.linkText}>Politique de confidentialité</Text>
          </Text>

          {/* Bouton d'inscription */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
            <Text style={styles.signUpButtonText}>S'Inscrire</Text>
          </TouchableOpacity>

          {/* Séparateur */}
          <Text style={styles.separator}>Ou continuer avec</Text>

          {/* Boutons de connexion sociale */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/images/iconGoogle.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.facebookIconContainer}>
                <Text style={styles.facebookIconText}>f</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Lien vers la connexion */}
          <View style={styles.loginLink}>
            <Text style={styles.loginText}>
              Déjà un compte ?{' '}
              <Text style={styles.loginLinkText} onPress={() => navigation.navigate('LoginScreen')}>
                Se connecter
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* === MODALE DE CONFIRMATION === */}
      <ConfirmationScreen
        isVisible={isModalVisible}
        onContinue={navigateToLogin}
        onClose={() => setIsModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    position: 'relative',
    height: 100,
    marginTop: 25,
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 0,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#F7F7F7',
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  unitInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    paddingRight: 16,
  },
  unitInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  unitText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
  },
  locationInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  locationButton: {
    padding: 14,
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 20,
    backgroundColor: '#FFF5EE',
    borderWidth: 1,
    borderColor: '#F48C06',
    borderStyle: 'dashed',
    gap: 12,
  },
  documentText: {
    fontSize: 16,
    color: '#F48C06',
    fontWeight: '500',
  },
  legalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  linkText: {
    color: '#F48C06',
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#F48C06',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 24,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  socialIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  facebookIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLinkText: {
    color: '#F48C06',
    fontWeight: '600',
  },
});

export default SignUpScreen;
