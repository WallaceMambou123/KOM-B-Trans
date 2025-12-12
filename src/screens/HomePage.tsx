import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  Alert
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import TravelCard from '../components/TravelCard';
import TabBar from '../components/TabBar';
import { Package, CheckCircle, MapPin, Navigation, Clock, Zap, PhoneCall, MessageCircle, CircleAlert } from 'lucide-react-native';

const availableDeliveries =
 [
  {
    id: "CMD-CM-20250912-001",
    date: "12/12/25",
    destination: "Nkol-Eton, Yaoundé",
    distance: "15 km",
    estimatedTime: "25 min",
    amount: "5 000 CFA",
    
    content: "Légumes frais (Manioc, Folong, Piment, Fruits de la passion) - Environ 10-12 kg (Poids estimé)",
    producerName: "Mme Alice MBARGA",
    producerPhone: "678 12 34 56",
    producerAddress: "Route Nationale 6, sortie Ouest de Ngaoundéré",
    clientName: "Monsieur André NGOMÈ",
    clientPhone: "671 98 76 54",
    clientAddress: "Rue Nkol-Eton, Porte 34B, Nkol-Eton, Yaoundé",
  },
]

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
     const [currentRoute, setCurrentRoute] = useState('Accueil')
 

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FF8C00');
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  
    const handleTabPress = (routeName: string) => {
        switch(routeName) {
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
    }

    const handleDetailsPress = (deliveryDetails: typeof availableDeliveries[0]) => {
          navigation.navigate('TravelDetailsScreen', { details: deliveryDetails });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
      >
        {/* Header Orange */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour Jorel</Text>
            <Text style={styles.subtitle}>3 livraisons disponibles</Text>
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
            <Text style={styles.statBig}>8</Text>
            <Text style={styles.statLabel}>Complétées</Text>
          </View>
     
        </View>

        {/* Titre section */}
        <Text style={styles.sectionTitle}>Livraisons disponibles</Text>
            {/* Contenu carte */}    
            <View>
              {availableDeliveries.map((delivery, index) => (
                
                <TravelCard
                  id = {delivery.id}
                  date = {delivery.date}
                  destination = {delivery.destination}
                  distance= {delivery.distance}
                  estimatedTime = {delivery.estimatedTime}
                  amount = {delivery.amount}
                  key={index}
                  onDetailsPress={() => handleDetailsPress(delivery)}
                />

              ))}
              
            </View>

        
      </ScrollView>

      <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
     contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 100,
    },

  header: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  emoji: {
    fontSize: 36,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#000000',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statBig: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  urgentBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  urgentText: {
    color: '#FF8C00',
    fontSize: 11,
    fontWeight: '900',
  },
  cardContent: {
    padding: 20,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 3,
    borderColor: '#FF8C00',
   
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FF8C00',
    fontSize: 22,
    fontWeight: '900',
  },
  clientName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
  },
  amount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  smallText: {
    fontSize: 13,
    color: '#666',
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF8F0',
    padding: 14,
    borderRadius: 16,
    gap: 10,
    marginBottom: 16,
  },
  address: {
    fontSize: 15,
    color: '#000000',
    flex: 1,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  distance: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  bonusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  bonusText: {
    color: '#FF8C00',
    fontSize: 13,
    fontWeight: '800',
  },
  acceptButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});

export default HomeScreen;