/**
 * Skeleton Components - Composants de chargement placeholder
 * Utilisés pour afficher un état de chargement visuel avant que les données ne soient disponibles
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '../shared/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * Composant Skeleton de base avec animation shimmer
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = BorderRadius.sm,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

/**
 * Skeleton pour une carte produit
 */
export const ProductCardSkeleton: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View style={[styles.productCard, style]}>
      <Skeleton width="100%" height={100} borderRadius={BorderRadius.lg} />
      <View style={styles.productCardContent}>
        <Skeleton width="80%" height={16} style={styles.marginBottom} />
        <Skeleton width="50%" height={14} style={styles.marginBottom} />
        <Skeleton width="30%" height={12} />
      </View>
    </View>
  );
};

/**
 * Skeleton pour une carte produit recommandé (grille)
 */
export const RecommendedCardSkeleton: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View style={[styles.recommendedCard, style]}>
      <Skeleton width="100%" height={120} borderRadius={0} />
      <View style={styles.recommendedContent}>
        <Skeleton width="90%" height={16} style={styles.marginBottom} />
        <Skeleton width="60%" height={14} style={styles.marginBottom} />
        <Skeleton width="40%" height={12} />
      </View>
    </View>
  );
};

/**
 * Skeleton pour la section Hero
 */
export const HeroSkeleton: React.FC = () => {
  return (
    <View style={styles.heroSection}>
      <View style={styles.heroTextContainer}>
        <Skeleton width="80%" height={24} style={styles.marginBottom} />
        <Skeleton width="70%" height={24} style={styles.marginBottom} />
        <Skeleton width="60%" height={24} style={styles.marginBottom} />
        <Skeleton width="50%" height={16} style={styles.marginTop} />
      </View>
      <Skeleton width={150} height={150} borderRadius={BorderRadius.lg} />
    </View>
  );
};

/**
 * Skeleton pour une liste horizontale de produits
 */
export const HorizontalProductListSkeleton: React.FC<{ count?: number }> = ({
  count = 3
}) => {
  return (
    <View style={styles.horizontalList}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} style={styles.horizontalItem} />
      ))}
    </View>
  );
};

/**
 * Skeleton pour une grille de produits recommandés
 */
export const RecommendedGridSkeleton: React.FC<{ count?: number }> = ({
  count = 4
}) => {
  return (
    <View style={styles.recommendedGrid}>
      {Array.from({ length: count }).map((_, index) => (
        <RecommendedCardSkeleton key={index} />
      ))}
    </View>
  );
};

/**
 * Skeleton complet pour la page d'accueil
 */
export const HomeScreenSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <Skeleton
          width={SCREEN_WIDTH - 80}
          height={48}
          borderRadius={BorderRadius.full}
        />
        <Skeleton width={48} height={48} borderRadius={BorderRadius.full} />
      </View>

      {/* Hero Skeleton */}
      <HeroSkeleton />

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Skeleton width={120} height={20} />
      </View>

      {/* Horizontal Products */}
      <HorizontalProductListSkeleton count={3} />

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Skeleton width={180} height={20} />
      </View>

      {/* Recommended Grid */}
      <RecommendedGridSkeleton count={4} />
    </View>
  );
};

/**
 * Skeleton pour une carte de livraison (KOM-B-Trans)
 */
export const DeliveryCardSkeleton: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View style={[styles.deliveryCard, style]}>
      <View style={styles.deliveryCardHeader}>
        <Skeleton width={80} height={16} />
        <Skeleton width={60} height={14} />
      </View>
      <Skeleton width="100%" height={1} style={styles.divider} />
      <View style={styles.deliveryCardBody}>
        <Skeleton width="70%" height={16} style={styles.marginBottom} />
        <Skeleton width="50%" height={14} style={styles.marginBottom} />
        <Skeleton width="40%" height={14} />
      </View>
      <View style={styles.deliveryCardFooter}>
        <Skeleton width={100} height={24} borderRadius={BorderRadius.md} />
        <Skeleton width={80} height={20} />
      </View>
    </View>
  );
};

/**
 * Skeleton pour les statistiques
 */
export const StatsSkeleton: React.FC = () => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Skeleton width={60} height={32} style={styles.marginBottom} />
        <Skeleton width={80} height={14} />
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Skeleton width={60} height={32} style={styles.marginBottom} />
        <Skeleton width={80} height={14} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.border,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  marginBottom: {
    marginBottom: Spacing.xs,
  },
  marginTop: {
    marginTop: Spacing.sm,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
  },

  // Hero
  heroSection: {
    height: 200,
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: Spacing.md,
  },

  // Section
  sectionHeader: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },

  // Product Card
  productCard: {
    width: 150,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productCardContent: {
    padding: Spacing.sm,
  },

  // Horizontal List
  horizontalList: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  horizontalItem: {
    marginRight: Spacing.sm,
  },

  // Recommended
  recommendedCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendedContent: {
    padding: Spacing.sm,
  },
  recommendedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    justifyContent: 'space-between',
  },

  // Delivery Card
  deliveryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deliveryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  deliveryCardBody: {
    paddingVertical: Spacing.sm,
  },
  deliveryCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  divider: {
    marginVertical: Spacing.xs,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.textPrimary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
});

export default Skeleton;
