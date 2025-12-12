import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import TravelCard from '../components/TravelCard';
import TabBar from '../components/TabBar';
import { Package, CheckCircle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BGPanner from "../assets/images/Group.svg";


type Delivery = {
  id: string;
  date: string;
  destination: string;
  distance: string;
  estimatedTime: string;
  amount: string;
  content: string;
  producerName: string;
  producerPhone: string;
  producerAddress: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
};

const initialDeliveries: Delivery[] = [
  {
    id: "CMD-CM-20250912-001",
    date: "12/12/25",
    destination: "Nkol-Eton, Yaoundé",
    distance: "15 km",
    estimatedTime: "25 min",
    amount: "5 000 CFA",
    content: "Légumes frais (Manioc, Folong, Piment, Fruits de la passion) - Environ 10-12 kg",
    producerName: "Mme Alice MBARGA",
    producerPhone: "678 12 34 56",
    producerAddress: "Route Nationale 6, sortie Ouest de Ngaoundéré",
    clientName: "Monsieur André NGOMÈ",
    clientPhone: "671 98 76 54",
    clientAddress: "Rue Nkol-Eton, Porte 34B, Nkol-Eton, Yaoundé",
  },
  // Ajoute d'autres livraisons ici pour tester
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [currentRoute, setCurrentRoute] = useState('Accueil');
  const [availableDeliveries, setAvailableDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [completedToday, setCompletedToday] = useState(0);

  const loadCompletedCount = async () => {
    try {
      const count = await AsyncStorage.getItem('completedDeliveriesCount');
      setCompletedToday(count ? parseInt(count) : 8);
    } catch {
      setCompletedToday(8);
    }
  };

  const loadAvailableDeliveries = async () => {
    try {
      const completedJson = await AsyncStorage.getItem('completedDeliveries');
      const completedIds = completedJson ? JSON.parse(completedJson) : [];

      const filtered = initialDeliveries.filter(
        (delivery) => !completedIds.includes(delivery.id)
      );

      setAvailableDeliveries(filtered);
    } catch (error) {
      setAvailableDeliveries(initialDeliveries);
    }
  };

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FF8C00');
    }

    loadCompletedCount();
    loadAvailableDeliveries();
  }, []);

  // Rafraîchir à chaque fois qu’on revient sur l’écran
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCompletedCount();
      loadAvailableDeliveries();
    });
    return unsubscribe;
  }, [navigation]);

  const handleTabPress = (routeName: string) => {
    switch (routeName) {
      case 'Accueil':
        navigation.navigate('HomePage');
        break;
      case 'Statistiques':
        navigation.navigate('StatisticsPage');
        break;
      case 'Parametres':
        navigation.navigate('SettingsPage');
        break;
      default:
        setCurrentRoute(routeName);
    }
  };

  const handleDetailsPress = (delivery: Delivery) => {
    navigation.navigate('TravelDetailsScreen', { details: delivery });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.backgroundWrapper}>
      <BGPanner width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={StyleSheet.absoluteFill} />
    </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Orange */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour Jorel</Text>
            <Text style={styles.subtitle}>
              {availableDeliveries.length === 0
                ? 'Aucune livraison en cours'
                : `${availableDeliveries.length} livraison${availableDeliveries.length > 1 ? 's' : ''} disponible${availableDeliveries.length > 1 ? 's' : ''}`}
            </Text>
          </View>
        </View>

        {/* Stats du jour */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Package size={28} color="#FF8C00" />
            <Text style={styles.statBig}>12</Text>
            <Text style={styles.statLabel}>Aujourd'hui</Text>
          </View>
          <View style={styles.statBox}>
            <CheckCircle size={28} color="green" />
            <Text style={styles.statBig}>{completedToday}</Text>
            <Text style={styles.statLabel}>Complétées</Text>
          </View>
        </View>

        {/* Titre section */}
        <Text style={styles.sectionTitle}>Livraisons disponibles</Text>

        {/* Liste des livraisons */}
        <View>
          {availableDeliveries.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aucune livraison pour le moment !</Text>
              <Text style={styles.emptySubtext}>Revenez plus tard pour de nouvelles courses</Text>
            </View>
          ) : (
            availableDeliveries.map((delivery, index) => (
              <TravelCard
                key={delivery.id}
                id={delivery.id}
                date={delivery.date}
                destination={delivery.destination}
                distance={delivery.distance}
                estimatedTime={delivery.estimatedTime}
                amount={delivery.amount}
                onDetailsPress={() => handleDetailsPress(delivery)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  contentContainer: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 },
  header: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
  subtitle: { fontSize: 15, color: '#FFFFFF', opacity: 0.9, marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#000000',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
  },
  statBox: { alignItems: 'center' },
  statBig: { fontSize: 28, fontWeight: '900', color: '#FFFFFF', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#FFFFFF', opacity: 0.8, marginTop: 4 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#999',
  },
   backgroundWrapper: { ...StyleSheet.absoluteFillObject, opacity: 0.85 }
});

export default HomeScreen;