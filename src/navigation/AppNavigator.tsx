import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Map, BarChart3, Settings } from 'lucide-react-native';

// Screens - Onboarding
import OnboardingScreen1 from '../screens/Onboarding/OnboardingScreen1';
import OnboardingScreen2 from '../screens/Onboarding/OnboardingScreen2';
import OnboardingScreen3 from '../screens/Onboarding/OnboardingScreen3';
import OnboardingScreen4 from '../screens/Onboarding/OnboardingScreen4';

// Screens - Auth
import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ConfirmationScreen from '../screens/auth/ConfirmationScreen';
import confirmationLogin from '../screens/auth/confirmationLogin';

// Screens - Main
import HomePage from '../screens/HomePage';
import MapPage from '../screens/MapPage';
import StatisticsPage from '../screens/StatisticsPage';
import SettingsPage from '../screens/SettingsPage';

// Screens - Details
import DetailProductScreen from '../screens/DetailProductScreen';
import SearchScreen from '../screens/SearchScreen';
import EditProfilePage from '../screens/EditProfilePage';
import MessagesPage from '../screens/MessagesPage';
import LanguagePage from '../screens/LanguagePage';
import PrivacyPage from '../screens/PrivacyPage';
import ResetPasswordPage from '../screens/ResetPasswordPage';
import AboutPage from '../screens/AboutPage';
import GuidePage from '../screens/GuidePage';
import DetailCommandesProduit from '../screens/DetailCommandesProduit';
import AddProductScreen from '../screens/AddProductScreen';
import DetailProductPublier from '../screens/DetailProductPublier';
import TravelDetailsScreen from '../screens/TravelDetailsScreen';
import TravelMapScreen from '../screens/TravelMapScreen';

// Design System
import { Colors, Spacing, Typography, TouchTarget } from '../shared/constants';
import { DeliveryCard } from '../shared/types';

// Interface pour les paramètres de livraison
export interface DeliveryParams {
  id: string;
  date: string;
  destination: string;
  distance: string;
  estimatedTime: string;
  amount: string;
  content?: string;
  producerName?: string;
  producerPhone?: string;
  producerAddress?: string;
  clientName?: string;
  clientPhone?: string;
  clientAddress?: string;
}

// Interface pour les paramètres du produit (compatibilité)
export interface ProductParams {
  id?: string;
  name: string;
  imageUrl: string;
  price?: string;
  unitPrice?: number;
  oldPrice?: string;
  stock?: number;
  orderCount?: number;
  orders?: number;
  interaction?: number;
  weight?: string;
  quality?: string;
  details?: string[];
  description?: string;
  seller?: {
    name: string;
    producer: string;
    rating: number;
  };
}

// Types pour les routes du Tab Navigator
export type MainTabParamList = {
  Accueil: undefined;
  Carte: undefined;
  Statistiques: undefined;
  Parametres: undefined;
};

// Types pour les routes du Stack Navigator
export type RootStackParamList = {
  // Onboarding
  OnboardingScreen1: undefined;
  OnboardingScreen2: undefined;
  OnboardingScreen3: undefined;
  OnboardingScreen4: undefined;
  // Auth
  SignUpScreen: undefined;
  LoginScreen: undefined;
  ConfirmationScreen: undefined;
  ConfirmationLogin: undefined;
  // Main
  MainTabs: undefined;
  // Delivery Screens
  TravelDetailsScreen: { details: DeliveryParams };
  TravelMapScreen: { details: DeliveryParams };
  // Other Screens
  DetailProduct: { product: ProductParams };
  Search: undefined;
  EditProfilePage: undefined;
  MessagesPage: undefined;
  ResetPasswordPage: undefined;
  LanguagePage: undefined;
  PrivacyPage: undefined;
  AboutPage: undefined;
  GuidePage: undefined;
  DetailCommandesProduit: { product: ProductParams };
  AddProductScreen: undefined;
  DetailProductPublier: { product: ProductParams };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          const strokeWidth = focused ? 2.5 : 1.5;

          switch (route.name) {
            case 'Accueil':
              return <Home size={size} color={color} strokeWidth={strokeWidth} />;
            case 'Carte':
              return <Map size={size} color={color} strokeWidth={strokeWidth} />;
            case 'Statistiques':
              return <BarChart3 size={size} color={color} strokeWidth={strokeWidth} />;
            case 'Parametres':
              return <Settings size={size} color={color} strokeWidth={strokeWidth} />;
            default:
              return null;
          }
        },
        tabBarLabelStyle: {
          ...Typography.labelSmall,
          marginTop: 2,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: 64,
          paddingBottom: Spacing.sm,
          paddingTop: Spacing.xs,
        },
        tabBarItemStyle: {
          minHeight: TouchTarget.minimum,
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomePage} />
      <Tab.Screen name="Carte" component={MapPage} />
      <Tab.Screen name="Statistiques" component={StatisticsPage} />
      <Tab.Screen name="Parametres" component={SettingsPage} />
    </Tab.Navigator>
  );
}

// Stack Navigator
const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
        animationDuration: 250,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      {/* Onboarding */}
      <Stack.Screen
        name="OnboardingScreen1"
        component={OnboardingScreen1}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
      <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} />
      <Stack.Screen name="OnboardingScreen4" component={OnboardingScreen4} />

      {/* Auth */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ animation: 'fade_from_bottom' }}
      />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
      <Stack.Screen
        name="ConfirmationLogin"
        component={confirmationLogin}
        options={{ animation: 'fade' }}
      />

      {/* Main Tabs */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ animation: 'fade' }}
      />

      {/* Delivery Screens */}
      <Stack.Screen name="TravelDetailsScreen" component={TravelDetailsScreen} />
      <Stack.Screen
        name="TravelMapScreen"
        component={TravelMapScreen}
        options={{ animation: 'slide_from_bottom' }}
      />

      {/* Other Screens */}
      <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="DetailCommandesProduit" component={DetailCommandesProduit} />
      <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
      <Stack.Screen name="DetailProductPublier" component={DetailProductPublier} />

      {/* Settings Screens */}
      <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
      <Stack.Screen name="MessagesPage" component={MessagesPage} />
      <Stack.Screen name="ResetPasswordPage" component={ResetPasswordPage} />
      <Stack.Screen name="LanguagePage" component={LanguagePage} />
      <Stack.Screen name="PrivacyPage" component={PrivacyPage} />
      <Stack.Screen name="AboutPage" component={AboutPage} />
      <Stack.Screen name="GuidePage" component={GuidePage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
