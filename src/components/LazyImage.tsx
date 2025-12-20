/**
 * LazyImage - Composant pour le chargement progressif des images
 * Affiche un placeholder pendant le chargement, puis l'image avec une animation fade-in
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { Colors, BorderRadius } from '../shared/constants';

interface LazyImageProps {
  // Source de l'image (URL ou require)
  source: ImageSourcePropType | { uri: string };
  // Style de l'image
  style?: ImageStyle;
  // Style du conteneur
  containerStyle?: ViewStyle;
  // Mode de redimensionnement
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  // Couleur du placeholder
  placeholderColor?: string;
  // Afficher un placeholder avec shimmer
  showShimmer?: boolean;
  // Durée de l'animation fade-in (ms)
  fadeDuration?: number;
  // Callback quand l'image est chargée
  onLoad?: () => void;
  // Callback en cas d'erreur
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  source,
  style,
  containerStyle,
  resizeMode = 'cover',
  placeholderColor = Colors.border,
  showShimmer = true,
  fadeDuration = 300,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  // Animation shimmer pour le placeholder
  React.useEffect(() => {
    if (showShimmer && isLoading) {
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
    }
  }, [showShimmer, isLoading, shimmerAnim]);

  const handleLoad = () => {
    setIsLoading(false);
    // Animation fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  // Extraction des dimensions du style pour le placeholder
  const flatStyle = StyleSheet.flatten(style) || {};
  const { width, height, borderRadius } = flatStyle;

  return (
    <View style={[styles.container, containerStyle, { width, height }]}>
      {/* Placeholder avec shimmer */}
      {isLoading && (
        <Animated.View
          style={[
            styles.placeholder,
            {
              backgroundColor: placeholderColor,
              borderRadius: borderRadius || 0,
              opacity: showShimmer ? shimmerOpacity : 0.5,
            },
          ]}
        />
      )}

      {/* Image avec erreur */}
      {hasError && (
        <View
          style={[
            styles.errorContainer,
            { borderRadius: borderRadius || 0 },
          ]}
        >
          <View style={styles.errorIcon}>
            <View style={styles.errorLine} />
            <View style={[styles.errorLine, styles.errorLineRotated]} />
          </View>
        </View>
      )}

      {/* Image principale */}
      {!hasError && (
        <Animated.Image
          source={source}
          style={[
            style,
            styles.image,
            { opacity: fadeAnim },
          ]}
          resizeMode={resizeMode}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </View>
  );
};

/**
 * Composant pour une image de produit avec lazy loading
 */
export const LazyProductImage: React.FC<{
  uri: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}> = ({ uri, style, containerStyle }) => {
  return (
    <LazyImage
      source={{ uri }}
      style={[styles.productImage, style]}
      containerStyle={containerStyle}
      resizeMode="cover"
    />
  );
};

/**
 * Composant pour un avatar avec lazy loading
 */
export const LazyAvatar: React.FC<{
  uri: string;
  size?: number;
  style?: ViewStyle;
}> = ({ uri, size = 48, style }) => {
  return (
    <LazyImage
      source={{ uri }}
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
      containerStyle={style}
      resizeMode="cover"
    />
  );
};

/**
 * Composant pour une image de bannière/hero avec lazy loading
 */
export const LazyBannerImage: React.FC<{
  source: ImageSourcePropType | { uri: string };
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}> = ({ source, style, containerStyle }) => {
  return (
    <LazyImage
      source={source}
      style={[styles.bannerImage, style]}
      containerStyle={containerStyle}
      resizeMode="contain"
      fadeDuration={500}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorLine: {
    position: 'absolute',
    width: 30,
    height: 2,
    backgroundColor: Colors.textTertiary,
    transform: [{ rotate: '45deg' }],
  },
  errorLineRotated: {
    transform: [{ rotate: '-45deg' }],
  },
  productImage: {
    width: '100%',
    height: 100,
  },
  avatar: {
    backgroundColor: Colors.border,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});

export default LazyImage;
