// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
// Écrans initiaux/choix (Gardé)
import OnboardingInitialScreen from '../screens/onboarding/OnboardingInitialScreen';
// Le Swiper est maintenant remplacé par 4 écrans distincts
// import OnboardingSwiperScreen from '../screens/onboarding/OnboardingSwiperScreen'; 

// NOUVEAUX Écrans d'Onboarding basés sur votre travail précédent
import OnboardingScreen from '../screens/onboarding/OnboardingSwiperScreen'; // Le premier slide
import Onboarding2Screen from '../screens/onboarding/Onboarding2';
import Onboarding3Screen from '../screens/onboarding/Onboarding3';
import Onboarding4Screen from '../screens/onboarding/Onboarding4'; // L'écran final

// Vous pouvez décommenter ces imports lorsque les composants existent
// import SignUpScreen from '../screens/auth/SignUpScreen';
// import LoginScreen from '../screens/auth/LoginScreen';
// import MainTabs from '../screens/MainTabs'; // Ton écran principal après onboarding


// MISE À JOUR : Définition des types pour tous les écrans
export type RootStackParamList = {
  OnboardingInitial: undefined;
  // Les 4 étapes de l'onboarding pour le profil choisi
  Onboarding: undefined; 
  Onboarding2: undefined;
  Onboarding3: undefined;
  Onboarding4: undefined; // Étape finale qui navigue vers MainTabs
  
  // Les routes commentées
  SignUp: undefined;
  Login: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      // Vous pouvez choisir l'écran de début selon votre logique d'application
      initialRouteName="OnboardingInitial" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OnboardingInitial" component={OnboardingInitialScreen} />
      {/* L'ancien Swiper est remplacé par les étapes numérotées */}
      {/* <Stack.Screen name="OnboardingSwiper" component={OnboardingSwiperScreen} /> */}
      
      {/* NOUVELLES ROUTES D'ONBOARDING */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
      <Stack.Screen name="Onboarding3" component={Onboarding3Screen} />
      <Stack.Screen name="Onboarding4" component={Onboarding4Screen} />
      
      {/* Routes commentées (Gardées pour référence) */}
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;