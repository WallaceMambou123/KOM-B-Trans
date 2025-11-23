// src/screens/onboarding/OnboardingSwiperScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const slides = [
  {
    key: '1',
    image: require('../../assets/images/person1.jpg'),
    title: ['BIENVENU SUR', 'KOM-B!'],
    logo: require('../../assets/images/logo_sans_fond.png'),
    description:
      'Accédez Directement Aux Récoltes De Nos Producteurs Locaux. Mangez Des Produits Frais, De Saison, Et De Qualité, Livrés Près De Chez Vous.',
  },
  {
    key: '2',
    image: require('../../assets/images/person2.png'),
    icon: require('../../assets/images/logo3.png'),
    title: ['Soutenez', "l'agriculture locale"],
    description:
      'Chaque Achat Sur Kom-B Aide À Réduire Les Pertes Après Récolte Et Garantit Une Juste Rémunération Pour Les Producteurs. Ensemble, Luttons Contre Le Gaspillage Alimentaire !',
  },
  {
    key: '3',
    image: require('../../assets/images/perso3.jpg'),
    icon: require('../../assets/images/logo2.png'),
    title: ['Commandez en toute simplicité'],
    description:
      "Recherchez, réservez ou achetez immédiatement vos produits. Suivez l'avancement de votre commande en temps réel, de la ferme jusqu'à votre porte.",
  },
  {
    key: '4',
    image: require('../../assets/images/perso4.png'),
    icon: require('../../assets/images/logo4.png'),
    title: ['Prêt à goûter la différence ?'],
    description: 'Découvrez les trésors de nos régions et commencez votre première commande.',
    isLast: true,
  },
];

const OnboardingInitialScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleFinish = () => {
    navigation.replace('MainTabs');
  };

  const renderPagination = (index: number, total: number) => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Swiper
      loop={false}
      showsButtons={false}
      dot={<View style={styles.swiperDot} />}
      activeDot={<View style={styles.swiperActiveDot} />}
      paginationStyle={{ bottom: 100 }}
      renderPagination={renderPagination}
    >
      {slides.map((slide, index) => (
        <View key={slide.key} style={styles.slide}>
          <ImageBackground source={slide.image} style={styles.imageBackground}>
            {index !== 0 && (
              <SafeAreaView style={styles.header}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.headerButton}
                >
                  <Text style={styles.headerText}>← précédent</Text>
                </TouchableOpacity>
              </SafeAreaView>
            )}
          </ImageBackground>

          <View style={styles.content}>
            <View style={styles.mainContent}>
              {slide.icon && (
                <Image source={slide.icon} style={styles.icon} resizeMode="contain" />
              )}

              {slide.logo ? (
                <View style={styles.welcomeTitle}>
                  <Text style={styles.welcomeText}>BIENVENU SUR</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.komBText}>KOM-B!</Text>
                    <Image source={slide.logo} style={styles.logoSmall} />
                  </View>
                </View>
              ) : (
                <View>
                  {slide.title.map((line, i) => (
                    <Text key={i} style={styles.title}>
                      {line}
                    </Text>
                  ))}
                </View>
              )}

              <Text style={styles.description}>{slide.description}</Text>
            </View>

            {slide.isLast ? (
              <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                <Text style={styles.finishButtonText}>Commencer l'aventure</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ height: 60 }} />
            )}
          </View>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: { flex: 1, backgroundColor: '#fff' },
  imageBackground: {
    width: '100%',
    height: height * 0.58,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerButton: {
    backgroundColor: 'rgba(60, 57, 57, 0.4)',
    padding: 10,
    borderRadius: 8,
  },
  headerText: { color: '#fff', fontWeight: 'bold' },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -60,
    paddingTop: 40,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeTitle: { alignItems: 'center' },
  welcomeText: { fontSize: 22, fontWeight: '900', color: '#333' },
  komBText: { fontSize: 44, fontWeight: 'bold', color: '#F48C06' },
  logoSmall: { width: 70, height: 70, marginLeft: 8 },
  icon: { width: 60, height: 60, tintColor: '#F48C06', marginBottom: 16 },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 38,
  },
  description: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginHorizontal: 20,
    marginTop: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: { backgroundColor: '#F48C06', width: 28 },
  inactiveDot: { backgroundColor: '#ccc' },
  swiperDot: { backgroundColor: '#ccc', width: 8, height: 8, borderRadius: 4, margin: 6 },
  swiperActiveDot: { backgroundColor: '#F48C06', width: 24, height: 8, borderRadius: 4, margin: 6 },
  finishButton: {
    backgroundColor: '#F48C06',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 30,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingInitialScreen;