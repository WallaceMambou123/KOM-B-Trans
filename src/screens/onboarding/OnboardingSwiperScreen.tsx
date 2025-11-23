import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type OnboardingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {

  // Assurez-vous que 'Onboarding2' et 'Onboarding4' sont correctement définis dans RootStackParamList
  const navigation = useNavigation<OnboardingNavigationProp>();
  const rootNavigation = useNavigation<RootNavigationProp>();

  // Fonction pour naviguer vers la page 2 de l'onboarding
  const handleNextPress = () => {
    // Si vous êtes sur la première slide, naviguer vers la suivante
    navigation.navigate('Onboarding2'); 
  };

  // Fonction pour passer l'onboarding et aller à l'écran final ou principal
  const handleSkipPress = () => {
    rootNavigation.navigate('Onboarding4');
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/person1.jpg')}
        style={styles.imageBackground}
      >
        <SafeAreaView style={styles.skipButtonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
            <Text style={styles.skipButtonText}>passer →</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>

      <View style={styles.contentContainer}>
        {/* Le SafeAreaView est placé ici pour protéger le contenu du bas/boutons */}
        <SafeAreaView style={styles.safeArea}> 
          <View style={styles.mainContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.welcomeText}>BIENVENU SUR</Text>
              <View style={styles.logoContainer}>
                <Text style={styles.komBText}>KOM-B!</Text>
                <Image source={require('../../assets/images/logo_sans_fond.png')} style={styles.logo} />
              </View>
            </View>
            
            <Text style={styles.descriptionText}>
              Accédez Directement Aux Récoltes De Nos Producteurs Locaux. Mangez Des Produits Frais, De Saison, Et De Qualité, Livrés Près De Chez Vous.
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            {/* Pagination pour le Slide 1 */}
            <View style={styles.paginationContainer}>
              <View style={[styles.paginationDot, styles.activeDot]} /> {/* Slide 1 actif */}
              <View style={styles.paginationDotInactive} />
              <View style={styles.paginationDotInactive} />
              <View style={styles.paginationDotInactive} />
            </View>

            {/* Bouton Next Large et Arrondi */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    width: width,
    height: height * 0.58,
    resizeMode: 'cover',
  },
  // Nouveau conteneur pour le bouton 'passer' pour respecter la safe area du haut
  skipButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'android' ? 20 : 0, // Ajustement Android
    paddingHorizontal: 16,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(123, 116, 116, 0.4)',
    borderRadius: 20, // Plus arrondi
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
   
    alignItems: 'center',
  },
safeArea: {
  flex: 1,
  width: '100%',
  // Ceci sépare mainContent (flex: 1) et bottomContainer (pas de flex)
  // Il est possible que 'mainContent' prenne tout l'espace et pousse 'bottomContainer' hors de vue.
  justifyContent: 'space-between', 
},
mainContent: {
  flex: 1, // <--- C'EST LE PROBLÈME PROBABLE
  alignItems: 'center',
  justifyContent: 'center',
},
  titleContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#333',
    letterSpacing: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  komBText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F48C06',
  },
  logo: {
    width: 70,
    height: 70,
    marginLeft: 1,
    resizeMode: 'contain',
  },
  descriptionText: {
    textAlign: 'center', // Centré pour l'esthétique du onboarding
    fontSize: 16,
    color: '#555',
    marginHorizontal: 28, // Marge latérale
    lineHeight: 24,
    marginVertical: 20,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 10, // Espace sous le bouton
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10, // Espace entre la pagination et le bouton
  },
  // Style actif (Orange, Large)
  activeDot: {
    backgroundColor: '#F48C06',
    width: 25,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  // Style inactif (Pâle, Petit)
  paginationDotInactive: {
    width: 15,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD9B3', // Couleur pâle
    marginHorizontal: 5,
  },
  // Rendu par défaut du style paginationDot qui n'est plus utilisé
  paginationDot: {
    width: 0, 
    height: 0,
  },
  
  // BOUTON NEXT (Design Large et Arrondi)
  nextButton: {
    backgroundColor: '#F48C06',
    paddingVertical: 18, // Plus de padding vertical
    width: '90%', // Très large
    alignItems: 'center',
    borderRadius: 50, // Très arrondi
    
    // Ombres pour un look 3D léger
    elevation: 5, // Android
    shadowColor: '#F48C06', // iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 22, // Texte plus grand
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;