import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TravelCard from '../components/TravelCard';
import { Package, CheckCircle, Bell } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BGPanner from '../assets/images/Group.svg';

// Design System
import { Colors, Spacing, BorderRadius, TouchTarget, Typography } from '../shared/constants';
import { RootStackParamList, DeliveryParams } from '../navigation/AppNavigator';

// Lazy Loading Components
import { DeliveryCardSkeleton, StatsSkeleton, Skeleton } from '../components/Skeleton';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

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
    id: 'DEL-001',
    date: '12/01/25',
    destination: 'Nkol-Eton, Yaoundé',
    distance: '15 km',
    estimatedTime: '25 min',
    amount: '5 000 CFA',
    content: 'Légumes frais (Tomates, Piment) - Environ 10-12 kg',
    producerName: 'Mme Alice MBARGA',
    producerPhone: '678 12 34 56',
    producerAddress: 'Route Nationale 6, sortie Ouest de Ngaoundéré',
    clientName: 'Monsieur André NGOMÈ',
    clientPhone: '671 98 76 54',
    clientAddress: 'Rue Nkol-Eton, Porte 34B, Nkol-Eton, Yaoundé',
  },
  {
    id: 'DEL-002',
    date: '13/01/25',
    destination: 'Bastos, Yaoundé',
    distance: '8 km',
    estimatedTime: '15 min',
    amount: '3 000 CFA',
    content: 'Fruits (Mangues, Ananas) - 5 kg',
    producerName: 'M. Paul TCHAMI',
    producerPhone: '690 11 22 33',
    producerAddress: 'Marché Central, Yaoundé',
    clientName: 'Mme Brigitte FOTSO',
    clientPhone: '699 88 77 66',
    clientAddress: 'Rue Bastos, Immeuble 12, Yaoundé',
  },
  {
    id: 'DEL-003',
    date: '14/01/25',
    destination: 'Melen, Yaoundé',
    distance: '10 km',
    estimatedTime: '20 min',
    amount: '4 500 CFA',
    content: 'Tubercules (Igname, Macabo) - 13 kg',
    producerName: 'Mme Rose NGOH',
    producerPhone: '677 55 44 33',
    producerAddress: 'Entrée Melen, Yaoundé',
    clientName: 'M. Jean MBALLA',
    clientPhone: '655 44 33 22',
    clientAddress: 'Cité Melen, Bloc B, Yaoundé',
  },
];

const HomePage = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [availableDeliveries, setAvailableDeliveries] = useState<Delivery[]>([]);
  const [completedToday, setCompletedToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCompletedCount = async () => {
    try {
      const count = await AsyncStorage.getItem('completedDeliveriesCount');
      setCompletedToday(count ? parseInt(count) : 0);
    } catch {
      setCompletedToday(0);
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

  // Chargement initial avec skeleton
  const loadData = async () => {
    setLoading(true);
    // Simuler un délai réseau pour montrer le skeleton
    await new Promise(resolve => setTimeout(resolve, 1200));
    await loadCompletedCount();
    await loadAvailableDeliveries();
    setLoading(false);
  };

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    await loadCompletedCount();
    await loadAvailableDeliveries();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Colors.primary);
    }

    loadData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCompletedCount();
      loadAvailableDeliveries();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDetailsPress = (delivery: Delivery) => {
    const deliveryParams: DeliveryParams = {
      id: delivery.id,
      date: delivery.date,
      destination: delivery.destination,
      distance: delivery.distance,
      estimatedTime: delivery.estimatedTime,
      amount: delivery.amount,
      content: delivery.content,
      producerName: delivery.producerName,
      producerPhone: delivery.producerPhone,
      producerAddress: delivery.producerAddress,
      clientName: delivery.clientName,
      clientPhone: delivery.clientPhone,
      clientAddress: delivery.clientAddress,
    };
    navigation.navigate('TravelDetailsScreen', { details: deliveryParams });
  };

  // Composant Skeleton pour la page de transport
  const TransportHomeSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Skeleton width={150} height={24} style={{ marginBottom: Spacing.xs }} />
            <Skeleton width={200} height={16} />
          </View>
          <Skeleton width={48} height={48} borderRadius={24} />
        </View>
      </View>

      {/* Stats Skeleton */}
      <StatsSkeleton />

      {/* Section Title Skeleton */}
      <View style={{ paddingHorizontal: Spacing.md, marginTop: Spacing.xl, marginBottom: Spacing.md }}>
        <Skeleton width={180} height={20} />
      </View>

      {/* Delivery Cards Skeleton */}
      <View style={styles.deliveriesContainer}>
        <DeliveryCardSkeleton />
        <DeliveryCardSkeleton />
        <DeliveryCardSkeleton />
      </View>
    </View>
  );

  // Afficher le skeleton pendant le chargement initial
  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <View style={styles.backgroundWrapper}>
          <BGPanner
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={StyleSheet.absoluteFill}
          />
        </View>
        <TransportHomeSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Background SVG */}
      <View style={styles.backgroundWrapper}>
        <BGPanner
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={StyleSheet.absoluteFill}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.surface}
            progressBackgroundColor={Colors.textPrimary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Bonjour Jorel</Text>
              <Text style={styles.subtitle}>
                {availableDeliveries.length === 0
                  ? 'Aucune livraison en cours'
                  : `${availableDeliveries.length} livraison${availableDeliveries.length > 1 ? 's' : ''} disponible${availableDeliveries.length > 1 ? 's' : ''}`}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate('MessagesPage')}
              activeOpacity={0.7}
            >
              <Bell size={24} color={Colors.surface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats du jour */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Package size={28} color={Colors.primary} />
            <Text style={styles.statBig}>{availableDeliveries.length + completedToday}</Text>
            <Text style={styles.statLabel}>Aujourd'hui</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <CheckCircle size={28} color={Colors.success} />
            <Text style={styles.statBig}>{completedToday}</Text>
            <Text style={styles.statLabel}>Complétées</Text>
          </View>
        </View>

        {/* Titre section */}
        <Text style={styles.sectionTitle}>Livraisons disponibles</Text>

        {/* Liste des livraisons */}
        <View style={styles.deliveriesContainer}>
          {availableDeliveries.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Package size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyText}>Aucune livraison pour le moment</Text>
              <Text style={styles.emptySubtext}>
                Revenez plus tard pour de nouvelles courses
              </Text>
            </View>
          ) : (
            availableDeliveries.map((delivery) => (
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  contentContainer: {
    paddingBottom: Spacing.lg,
  },
  skeletonContainer: {
    flex: 1,
  },

  // Header
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...Typography.headlineMedium,
    color: Colors.surface,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.surface,
    opacity: 0.9,
    marginTop: Spacing.xs,
  },
  notificationButton: {
    width: TouchTarget.minimum,
    height: TouchTarget.minimum,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  // Stats Card
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.textPrimary,
    marginHorizontal: Spacing.md,
    marginTop: -Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statBig: {
    ...Typography.headlineMedium,
    color: Colors.surface,
    marginTop: Spacing.sm,
  },
  statLabel: {
    ...Typography.bodySmall,
    color: Colors.surface,
    opacity: 0.8,
    marginTop: Spacing.xs,
  },

  // Section
  sectionTitle: {
    ...Typography.titleLarge,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },

  // Deliveries
  deliveriesContainer: {
    paddingHorizontal: Spacing.md,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.md,
  },
  emptyText: {
    ...Typography.titleMedium,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    ...Typography.bodyMedium,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
  },
});

export default HomePage;
