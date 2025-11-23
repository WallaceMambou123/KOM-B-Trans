import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type OnboardingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding2'>;
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

// --- Données spécifiques à la SLIDE 2 ---
const slideData = {
  image: require('../../assets/images/perso3.jpg'), // Remplacez par votre image réelle du slide 2
  icon: require('../../assets/images/logo3.png'),
  title: 'Soutenez',
  subtitle: "l'agriculture locale",
  description:
    'Chaque Achat Sur Kom-B Aide À Réduire Les Pertes Après Récolte Et Garantit Une Juste Rémunération Pour Les Producteurs. Ensemble, Luttons Contre Le Gaspillage Alimentaire !',
};
// ----------------------------------------

const Onboarding2Screen = () => {

  const navigation = useNavigation<OnboardingNavigationProp>();
  const rootNavigation = useNavigation<RootNavigationProp>();

  const handleNextPress = () => {
    // Navigue vers la troisième étape
    navigation.navigate('Onboarding3');
  };

  const handlePrevPress = () => {
    // Retourne à la première étape
    navigation.navigate('Onboarding'); 
  };
  
  const handleSkipPress = () => {
    // Passe l'onboarding et va à l'écran final/principal
    rootNavigation.navigate('Onboarding4');
  };
    
  return (
    <View style={styles.container}>
      <ImageBackground
        source={slideData.image}
        style={styles.imageBackground}
      >
        <SafeAreaView style={styles.headerControls}>
          {/* Bouton Précédent */}
          <TouchableOpacity style={styles.prevButton} onPress={handlePrevPress}>
            <Text style={styles.prevButtonText}>← précédent</Text>
          </TouchableOpacity>
          {/* Bouton Passer */}
          <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
            <Text style={styles.skipButtonText}>passer →</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <SafeAreaView style={styles.safeArea}> 
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.mainContent}>
              
              <Image source={slideData.icon} style={styles.icon} />
              
              <View style={styles.titleContainer}>
                <Text style={styles.welcomeText}>{slideData.title}</Text>
                <Text style={styles.komBText}>{slideData.subtitle}</Text>
              </View>
              
              <Text style={styles.descriptionText}>
                {slideData.description}
              </Text>
            </View>
          </ScrollView>

          <View style={styles.bottomContainer}>
            {/* Pagination pour le Slide 2 */}
            <View style={styles.paginationContainer}>
              <View style={styles.paginationDotInactive} />
              <View style={[styles.paginationDotInactive, styles.activeDot]} /> {/* SLIDE 2 ACTIF */}
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

// --- STYLES ---
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
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 20 : 0, 
  },
  prevButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(123, 116, 116, 0.4)',
    borderRadius: 20,
    marginRight: 10,
  },
  prevButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(123, 116, 116, 0.4)',
    borderRadius: 20,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    // Utilizamos 'space-between' si le contenu principal et le bas ne sont pas enveloppés dans un ScrollView
    // Si nous utilisons ScrollView, 'mainContent' et 'bottomContainer' doivent être séparés en dehors de celui-ci.
  },
  scrollContent: {
    // Si le contenu n'est pas très long, vous n'avez pas besoin de ScrollView.
    // Pour l'instant, nous le laissons pour la robustesse.
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20, // Espace pour séparer du bottomContainer
  },
  mainContent: {
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    tintColor: '#F48C06',
  },
  titleContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 36, // Grand pour le titre principal
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
  },
  komBText: {
    fontSize: 36, // Grand pour le sous-titre orange
    fontWeight: 'bold',
    color: '#F48C06',
    marginTop: 6,
    textAlign: 'center',
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginHorizontal: 28,
    lineHeight: 24,
    marginVertical: 20,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
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
  
  // BOUTON NEXT
  nextButton: {
    backgroundColor: '#F48C06',
    paddingVertical: 18,
    width: '90%', 
    alignItems: 'center',
    borderRadius: 50, 
    elevation: 5, 
    shadowColor: '#F48C06',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Onboarding2Screen;