import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBar from '../components/TabBar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import { ArrowLeft, Star } from 'lucide-react-native'; 
import GainsChart from '../components/GainsChart'; 

// Importation des données JSON
import statisticsData from '../data/statisticsData.json'; // Assurez-vous que le chemin est correct

type StatisticsPageNavigationProp = StackNavigationProp<RootStackParamList, 'StatisticsPage'>;

// Définition du type de données pour la clarté
interface StatsData {
  filterLabel: string;
  totalGains: string;
  deliveries: number;
  kilometers: number;
  averageRating: number;
  chartData: number[];
  chartLabels: string[];
}

// Simule l'affichage des étoiles (inchangé)
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const starArray = [];

  for (let i = 0; i < 5; i++) {
    starArray.push(
      <Star
        key={i}
        size={20}
        color={i < fullStars ? "#FF8C00" : "#CCCCCC"} 
        fill={i < fullStars ? "#FF8C00" : "none"}
        style={{ marginHorizontal: 1 }}
      />
    );
  }
  return <View style={{ flexDirection: 'row', marginTop: 5 }}>{starArray}</View>;
};

// --- Composant principal ---

const StatisticsPage = () => {
  const navigation = useNavigation<StatisticsPageNavigationProp>();
  const [currentRoute, setCurrentRoute] = useState('Statistiques');
  const [timeFilter, setTimeFilter] = useState<'Jour' | 'Mois'>('Mois');
  const insets = useSafeAreaInsets();

  // Données actives selon le filtre
  const activeData: StatsData =
    timeFilter === 'Mois'
      ? (statisticsData.monthly as StatsData)
      : (statisticsData.daily as StatsData);

  // Gestion du bouton retour Android : toujours revenir à HomePage
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomePage' }],
        });
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress as any);

      return () => {
        subscription.remove();
      };
    }, [navigation])
  );

  const handleTabPress = (name: string) => {
    switch (name) {
      case 'Accueil':
        navigation.navigate('HomePage');
        break;
      case 'Statistiques':
        // déjà sur cette page
        break;
      case 'Maps':
      case 'MapPage':
        navigation.navigate('MapPage');
        break;
      case 'Parametres':
        navigation.navigate('SettingsPage');
        break;
      default:
        setCurrentRoute(name);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingBottom: 80 + (insets.bottom || 0) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* CONTENEUR DE FILTRE CENTRÉ */}
        <View style={styles.centeredFilterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, timeFilter === 'Jour' && styles.filterActive]}
            onPress={() => setTimeFilter('Jour')}
          >
            <Text style={[styles.filterText, timeFilter === 'Jour' && styles.filterTextActive]}>Jour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, timeFilter === 'Mois' && styles.filterActive]}
            onPress={() => setTimeFilter('Mois')}
          >
            <Text style={[styles.filterText, timeFilter === 'Mois' && styles.filterTextActive]}>Mois</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Carte Total des Gains */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total des Gains</Text>
          <View>
            <Text style={styles.totalGainsAmount}>{activeData.totalGains}</Text>
            <Text style={styles.totalGainsLabel}>{activeData.filterLabel}</Text>
          </View>

          <GainsChart data={activeData.chartData} labels={activeData.chartLabels} />
        </View>

        {/* 2. Carte Livraisons Effectuées */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Livraisons Effectuées</Text>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryNumber}>{activeData.deliveries}</Text>
            <Text style={styles.deliveryUnit}>Livraisons</Text>

            <View style={styles.separator} />

            <Text style={styles.deliveryNumber}>{activeData.kilometers}</Text>
            <Text style={styles.deliveryUnit}>km</Text>
          </View>
        </View>

        {/* 3. Carte Évaluation Moyenne */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Évaluation Moyenne</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingValue}>{activeData.averageRating}</Text>
            <RatingStars rating={activeData.averageRating} />
          </View>
        </View>
      </ScrollView>

      <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f5f5f5', marginTop : 20 },
  scrollView: { flex: 1 },
  scrollViewContent: { paddingHorizontal: 16, paddingTop: 10 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loading: { fontSize: 16, color: '#666' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white',
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  backButton: { padding: 5 },
  title: { fontSize: 20, fontWeight: '700', color: '#333', flex: 1, textAlign: 'center' },
  
  centeredFilterContainer: {
    flexDirection: 'row', backgroundColor: '#EAEAEA', borderRadius: 8, padding: 2,
    alignSelf: 'center', marginBottom: 20,
  },

  filterButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  filterActive: { backgroundColor: '#FF8C00' },
  filterText: { color: '#666', fontWeight: '600' },
  filterTextActive: { color: 'white' },
  
  card: {
    backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 15,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
  },
  cardTitle: { fontSize: 16, color: '#555', fontWeight: '600', marginBottom: 10 },

    totalGainsAmount: {
        fontSize: 36, fontWeight: '900', color: '#FF8C00', marginBottom: 5,
    },
    totalGainsLabel: {
        fontSize: 14, color: '#999', marginBottom: 10,
    },

  deliveryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 5 },
  deliveryNumber: { fontSize: 32, fontWeight: '900', color: '#333' },
  deliveryUnit: {
    fontSize: 18, color: '#999', fontWeight: '600', marginTop: 10, marginLeft: 5, marginRight: 20,
  },
  separator: { width: 1, height: '80%', backgroundColor: '#EAEAEA', marginHorizontal: 15 },
  
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  ratingValue: { fontSize: 32, fontWeight: '900', color: '#FF8C00', marginRight: 10 },
});

export default StatisticsPage;