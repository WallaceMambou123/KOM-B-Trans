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
  Platform,
} from 'react-native';
// @ts-ignore: allow importing .svg without a declaration during development
import BGPanner from "../../assets/images/Group.svg";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator'; 
import { Camera, ChevronLeft, Eye, EyeClosed, FilePlus2, MapIcon, MapPin } from 'lucide-react-native';

// Importation de la modale de confirmation
import ConfirmationScreen from './ConfirmationScreen'; 
// NOTE: Assurez-vous que ConfirmationScreen.js est dans le même répertoire.

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
  const [isModalVisible, setIsModalVisible] = useState(false); // État de la modale

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    // if (!formData.nom.trim()) { Alert.alert('Erreur', 'Le nom est requis'); return false; }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!formData.email.trim() || !emailRegex.test(formData.email)) {
    //     Alert.alert('Erreur', 'Veuillez entrer un email valide'); return false; 
    // }
    // if (!formData.telephone.trim()) { Alert.alert('Erreur', 'Le numéro de téléphone est requis'); return false; }
    // if (!formData.motDePasse.trim() || formData.motDePasse.length < 6) {
    //     Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères'); return false; 
    // }
    // if (formData.motDePasse !== formData.confirmerMotDePasse) { Alert.alert('Erreur', 'Les mots de passe ne correspondent pas'); return false; }
    // if (!formData.caracteristiquesExploitation.trim()) { Alert.alert('Erreur', 'Les caractéristiques de l\'exploitation sont requises'); return false; }
    // if (!formData.productions.trim()) { Alert.alert('Erreur', 'Les productions sont requises'); return false; }
    // if (!formData.localisation.trim()) { Alert.alert('Erreur', 'La localisation est requise'); return false; }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Données du formulaire:', formData);
      // Afficher la modale après le succès de la validation
      setIsModalVisible(true);
    }
  };

  const navigateToLogin = () => {
    // 1. Fermer la modale
    setIsModalVisible(false);
    // 2. Naviguer vers l'écran de connexion
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
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
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Namikaze"
              value={"Namikaze"}
              onChangeText={(value) => handleInputChange('nom', value)}
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Namikaze@kom-b.com"
              value={"kkmk@flk.com"}
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
              placeholder="+237 xxx xxx xx"
              value={"2929"}
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
                placeholder="••••••••"
                value={"111111"}
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
                placeholder="••••••••"
                value={"111111"}
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
            <Text style={styles.label}>Caractéristiques de l'exploitation</Text>
            <View style={styles.unitInputContainer}>
              <TextInput
                style={styles.unitInput}
                placeholder="100000"
                value={"111111"}
                onChangeText={(value) => handleInputChange('caracteristiquesExploitation', value)}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              <Text style={styles.unitText}>m²</Text>
            </View>
          </View>

          {/* Productions */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Productions</Text>
            <TextInput
              style={styles.input}
              placeholder="Tomates"
              value={"111111"}
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
                placeholder="Centre, Yaounde"
               value={"111111"}
                onChangeText={(value) => handleInputChange('localisation', value)}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.locationButton}>
                <MapPin size={24} color={"#ABABAB"}/>
              </TouchableOpacity>
            </View>
          </View>

          {/* Documents justificatifs */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Documents justificatif</Text>
            <TouchableOpacity style={styles.documentButton}>
              <FilePlus2 size={32} color={"#BDBDBD"}/>
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
          <Text style={styles.separator}>Ou</Text>

          {/* Boutons de connexion sociale */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../../assets/images/iconGoogle.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../../assets/images/iconFacebook.jpg')} style={styles.socialIcon} />
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

      {/* === MODALE DE CONFIRMATION (Connectée ici) === */}
      <ConfirmationScreen 
        isVisible={isModalVisible}
        onContinue={navigateToLogin} // Appelle la fonction qui ferme la modale et navigue
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // === ARRIÈRE-PLAN SVG ===
  backgroundWrapper: {
  ...StyleSheet.absoluteFill,
    opacity: 0.8, 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  // === EN-TÊTE ===
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
  // === FORMULAIRE ===
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
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F7F7F7',
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  // Unité
  unitInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    paddingRight: 16,
  },
  unitInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  unitText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  // Localisation
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    paddingRight: 16,
  },
  locationInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  locationButton: {
    padding: 12,
  },
  // Document
  documentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 20,
    backgroundColor: '#F7F7F7',
  },
  // Bas de page
  legalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  linkText: {
    color: '#ff6b35',
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 8,
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
  // Boutons sociaux
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
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
    color: '#ff6b35',
    fontWeight: '600',
  },
});

export default SignUpScreen;