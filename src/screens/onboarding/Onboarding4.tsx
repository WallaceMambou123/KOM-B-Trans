import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type OnboardingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding4'>;
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

// --- Données spécifiques à la SLIDE 4 (FINALE) ---
const slideData = {
  image: require('../../assets/images/perso4.png'), // Remplacez par votre image réelle du slide 4
  icon: require('../../assets/images/logo4.png'),
  title: 'Prêt à goûter',
  subtitle: 'la différence ?',
  description: 'Découvrez les trésors de nos régions et commencez votre première commande.',
};
// ----------------------------------------

const Onboarding4Screen = () => {

  const navigation = useNavigation<OnboardingNavigationProp>();
  const rootNavigation = useNavigation<RootNavigationProp>();

  const handleFinishPress = () => {
    // Navigue vers l'écran principal (e.g., MainTabs ou Home)
    // Utilisez 'replace' pour empêcher l'utilisateur de revenir aux écrans d'onboarding
    rootNavigation.replace('MainTabs'); 
  };

  const handlePrevPress = () => {
    // Retourne à la troisième étape
    navigation.navigate('Onboarding3'); 
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
          {/* Le bouton "passer" est retiré sur la dernière slide */}
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
            {/* Pagination pour le Slide 4 */}
            <View style={styles.paginationContainer}>
              <View style={styles.paginationDotInactive} />
              <View style={styles.paginationDotInactive} />
              <View style={styles.paginationDotInactive} />
              <View style={[styles.paginationDotInactive, styles.activeDot]} /> {/* SLIDE 4 ACTIF */}
            </View>

            {/* Bouton FINAL : Commencer l'aventure */}
            <TouchableOpacity style={styles.finishButton} onPress={handleFinishPress}>
              <Text style={styles.finishButtonText}>Commencer l'aventure</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

// --- STYLES (Utilisation de finishButton pour le style final) ---
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
    justifyContent: 'flex-start', // Alignement à gauche (pas de bouton 'passer')
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 20 : 0, 
  },
  prevButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(123, 116, 116, 0.4)',
    borderRadius: 20,
  },
  prevButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
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
    fontSize: 36,
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
  },
  komBText: {
    fontSize: 36,
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
  activeDot: {
    backgroundColor: '#F48C06',
    width: 25,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  paginationDotInactive: {
    width: 15,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD9B3',
    marginHorizontal: 5,
  },
  // --- Bouton Final (Utilise le même style que nextButton mais avec un nom différent) ---
  finishButton: {
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
  finishButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Onboarding4Screen;