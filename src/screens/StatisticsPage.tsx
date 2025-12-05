import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform
} from 'react-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBar from '../components/TabBar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import { DashboardData } from '../data/types';
import dashboardData from '../data/dashboardData.json';
import IndicatorCard from '../components/IndicatorCard';
import SalesChart from '../components/SalesChart';
import ProductPieChart from '../components/ProductPieChart';
import { useMessages } from '../context/MessagesContext';

type StatisticsPageNavigationProp = StackNavigationProp<RootStackParamList, 'StatisticsPage'>;

const StatisticsPage = () => {
  const navigation = useNavigation<StatisticsPageNavigationProp>();
  const [currentRoute, setCurrentRoute] = React.useState('Statistiques');
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { messages } = useMessages();


  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dashboardData as DashboardData);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleTabPress = (routeName: string) => {
    switch(routeName) {
      case 'Accueil':
        navigation.navigate('HomePage');
        break;
      case 'Produits':
        navigation.navigate('CommandesPage');
        break;
      case 'Parametres':
        navigation.navigate('SettingsPage');
        break;
      default:
        setCurrentRoute(routeName);
    }
  };

  if (!data) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F48C06" />
          <Text style={styles.loading}>Chargement...</Text>
        </View>
        <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
      </SafeAreaView>
    );
  }

  const { user, indicators, wallet, salesByMonth, salesByProduct } = data;
const messagesCount = messages.filter(m => !m.read).length;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingBottom: 80 + (insets.bottom || 0) }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}></Text>
        </View>

        {/* Indicators */}
        <View style={styles.indicatorsRow}>
          {indicators.map((ind, i) => (
            <IndicatorCard
              key={ind.title}
              indicator={ind}
              color={i === 0 ? '#4CAF50' : '#00ACC1'}
            />
          ))}
        </View>

        {/* Messages */}
        <View style={styles.messagesRow}>
          <Text style={styles.messagesText}>Messages ({messagesCount})</Text>
          <TouchableOpacity 
          style={styles.verifyBtn}
          onPress={() => navigation.navigate('MessagesPage')}
          >
            <Text style={styles.verifyText}>Vérifier</Text>
          </TouchableOpacity>
        </View>

        {/* Wallet */}
        <View style={styles.walletCard}>
          <Text style={styles.walletTitle}>{wallet.title}</Text>
          <View style={styles.walletValue}>
            <Text style={styles.walletAmount}>
              {wallet.value} {wallet.currency.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Charts */}
        <SalesChart salesData={salesByMonth} />
        <ProductPieChart productData={salesByProduct} />
      </ScrollView>

      <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  indicatorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  messagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  messagesText: {
    fontSize: 15,
    color: '#444',
    fontWeight: '600',
  },
  verifyBtn: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  verifyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  walletCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  walletTitle: {
    fontSize: 15,
    color: '#555',
  },
  walletValue: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  walletAmount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default StatisticsPage;
