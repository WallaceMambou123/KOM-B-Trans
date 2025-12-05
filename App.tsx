import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';
import { ProductsProvider } from './src/context/ProductsContext';
// Splash screen
import SplashScreen from 'react-native-splash-screen';
import { MessagesProvider } from './src/context/MessagesContext';

function App() {
  useEffect(() => {
    // Hide the native splash screen when the JS app is ready
    try {
      SplashScreen.hide();
    } catch (e) {
      // If the native module isn't available (during web or tests), ignore
      // console.warn('SplashScreen.hide() failed', e);
    }
  }, []);

  return (
    <ProductsProvider>
      <MessagesProvider>
        <UserProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </UserProvider>
      </MessagesProvider>
    </ProductsProvider>
  );
}

export default App;
