import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen1 from "../screens/Onboarding/OnboardingScreen1";
import OnboardingScreen2 from "../screens/Onboarding/OnboardingScreen2";
import OnboardingScreen3 from "../screens/Onboarding/OnboardingScreen3";
import OnboardingScreen4 from "../screens/Onboarding/OnboardingScreen4";
import SignUpScreen from "../screens/auth/SignUpScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import ConfirmationScreen from "../screens/auth/ConfirmationScreen";
import confirmationLogin from "../screens/auth/confirmationLogin";
import HomePage from "../screens/HomePage";
import CommandesPage from "../screens/CommandesPage";
import StatisticsPage from "../screens/StatisticsPage";
import SettingsPage from "../screens/SettingsPage";
import DetailProductScreen from "../screens/DetailProductScreen";
import SearchScreen from "../screens/SearchScreen";
import EditProfilePage from "../screens/EditProfilePage"
import MessagesPage from "../screens/MessagesPage";
import LanguagePage from "../screens/LanguagePage";
import PrivacyPage from "../screens/PrivacyPage";
import ResetPasswordPage from "../screens/ResetPasswordPage";
import AboutPage from "../screens/AboutPage";
import GuidePage from "../screens/GuidePage";
import DetailCommandesProduit from "../screens/DetailCommandesProduit";
import AddProductScreen from "../screens/AddProductScreen";
import DetailProductPublier from "../screens/DetailProductPublier";






// Interface pour les paramètres du produit
export interface ProductParams {
  id?: number;
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


// Defini les types pour les routes
export type RootStackParamList = {
  OnboardingScreen1: undefined;
  OnboardingScreen2: undefined;
  OnboardingScreen3: undefined;
  OnboardingScreen4: undefined;
  SignUpScreen: undefined;
  LoginScreen: undefined;
  ConfirmationScreen: undefined;
  ConfirmationLogin: undefined;
  HomePage: undefined;
  CommandesPage: undefined;
  StatisticsPage: undefined;
  SettingsPage: undefined;
  DetailProduct: { product: ProductParams };
  Search: undefined;
 EditProfilePage : undefined;
 MessagesPage : undefined;
 ResetPasswordPage : undefined;
 LanguagePage : undefined;
 PrivacyPage : undefined;
 AboutPage : undefined;
 GuidePage : undefined;
  DetailCommandesProduit: { product: ProductParams };
  AddProductScreen: undefined;
  DetailProductPublier : {product : ProductParams}

};


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown : false}}>


                {/*Declaration des differents ecrans  */}
                <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
                <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
                <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} />
                <Stack.Screen name="OnboardingScreen4" component={OnboardingScreen4} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
                <Stack.Screen name="ConfirmationLogin" component={confirmationLogin} />
                <Stack.Screen name = "HomePage" component={HomePage} />
                <Stack.Screen name="CommandesPage" component={CommandesPage} />
                <Stack.Screen name="StatisticsPage" component={StatisticsPage} />
                <Stack.Screen name="SettingsPage" component={SettingsPage} />
                <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
                <Stack.Screen name="MessagesPage" component={MessagesPage} />
                <Stack.Screen name="ResetPasswordPage" component={ResetPasswordPage} />
                <Stack.Screen name="LanguagePage" component={LanguagePage} />
                <Stack.Screen name="PrivacyPage" component={PrivacyPage} />
                <Stack.Screen name="AboutPage" component={AboutPage} />
                <Stack.Screen name="GuidePage" component={GuidePage} />
                <Stack.Screen name="DetailCommandesProduit" component={DetailCommandesProduit} />
                <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
                <Stack.Screen name="DetailProductPublier" component={DetailProductPublier} />








          </Stack.Navigator>
    )    
}

export default AppNavigator;