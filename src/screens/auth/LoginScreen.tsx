import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import BGPanner from "../../assets/images/Group.svg"
import { Eye, EyeClosed } from 'lucide-react-native';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  // État pour la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Met à jour les données du formulaire
   * @param field - Le champ à mettre à jour
   * @param value - La nouvelle valeur
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Valide les données du formulaire
   * @returns true si toutes les validations passent
   */
  const validateForm = (): boolean => {
    // Validation de l'email ou téléphone
    // if (!formData.emailOrPhone.trim()) {
    //   Alert.alert('Erreur', 'L\'email ou le numéro de téléphone est requis');
    //   return false;
    // }

    // // Validation du mot de passe
    // if (!formData.password.trim()) {
    //   Alert.alert('Erreur', 'Le mot de passe est requis');
    //   return false;
    // }

    return true;
  };

  /**
   * Gère la connexion
   */
  const handleLogin = () => {
    if (validateForm()) {
      // Simulation d'un appel API de connexion
      console.log('Tentative de connexion avec:', formData);
      
      // Simulation d'une connexion réussie
      Alert.alert(
        'Connexion réussie!',
        'Vous êtes maintenant connecté.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Ici, vous pourriez naviguer vers l'écran principal de l'application
              // navigation.navigate('MainScreen');
              console.log('Utilisateur connecté');
            },
          },
        ]
      );
    }
  };

  /**
   * Navigue vers l'écran d'inscription
   */
  const navigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  const ConfirmationToLogin =()=>{
    navigation.navigate('ConfirmationLogin')
  }

  /**
   * Gère l'oubli de mot de passe
   */
  const handleForgotPassword = () => {
    Alert.alert(
      'Mot de passe oublié',
      'Un email de réinitialisation sera envoyé à votre adresse email.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Envoyer', 
          onPress: () => {
            console.log('Email de réinitialisation envoyé');
          }
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
       <View style={styles.backgroundWrapper}>
        <BGPanner
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={StyleSheet.absoluteFill}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* En-tête avec logo */}
        
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
          {/* Email ou Téléphone */}
           <View style={styles.inputGroup}>
                      <Text style={styles.label}>Email</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Namikaze@kom-b.com"
                        value='OKOK@gmail.com'
                        onChangeText={(value) => handleInputChange('email', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
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
                value='12121212'
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

          {/* Lien mot de passe oublié */}
          <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          {/* Bouton de connexion */}
          <TouchableOpacity style={styles.loginButton} onPress={ConfirmationToLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
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

          {/* Lien vers l'inscription */}
          <View style={styles.signUpLink}>
            <Text style={styles.signUpText}>
              Pas de compte ?{' '}
              <Text style={styles.signUpLinkText} onPress={navigateToSignUp}>
                Crée un compte
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    backgroundWrapper: {
  ...StyleSheet.absoluteFill,
    opacity: 0.8, // Ajuste selon ton design
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
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
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },

  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
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
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
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
  eyeIcon: {
    fontSize: 18,
    color: '#ff6b35',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
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
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  signUpLink: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#666',
  },
  signUpLinkText: {
    color: '#ff6b35',
    fontWeight: '600',
  },
   logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
    socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  }
});

export default LoginScreen;