// Design System - Typographie unifiée pour l'écosystème KOM-B
// Basé sur Material Design 3 Type Scale

import { TextStyle, Platform } from 'react-native';

// Font Family - Utilise les polices système
const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

// Font Weights
export const FontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extrabold: '800' as TextStyle['fontWeight'],
} as const;

// Typography Scale - Material Design 3
export const Typography = {
  // Display - Pour les grands titres hero
  displayLarge: {
    fontFamily,
    fontSize: 57,
    fontWeight: FontWeight.regular,
    lineHeight: 64,
    letterSpacing: -0.25,
  } as TextStyle,

  displayMedium: {
    fontFamily,
    fontSize: 45,
    fontWeight: FontWeight.regular,
    lineHeight: 52,
    letterSpacing: 0,
  } as TextStyle,

  displaySmall: {
    fontFamily,
    fontSize: 36,
    fontWeight: FontWeight.regular,
    lineHeight: 44,
    letterSpacing: 0,
  } as TextStyle,

  // Headline - Pour les titres de section
  headlineLarge: {
    fontFamily,
    fontSize: 32,
    fontWeight: FontWeight.bold,
    lineHeight: 40,
    letterSpacing: 0,
  } as TextStyle,

  headlineMedium: {
    fontFamily,
    fontSize: 28,
    fontWeight: FontWeight.bold,
    lineHeight: 36,
    letterSpacing: 0,
  } as TextStyle,

  headlineSmall: {
    fontFamily,
    fontSize: 24,
    fontWeight: FontWeight.bold,
    lineHeight: 32,
    letterSpacing: 0,
  } as TextStyle,

  // Title - Pour les titres de cartes/items
  titleLarge: {
    fontFamily,
    fontSize: 22,
    fontWeight: FontWeight.semibold,
    lineHeight: 28,
    letterSpacing: 0,
  } as TextStyle,

  titleMedium: {
    fontFamily,
    fontSize: 18,
    fontWeight: FontWeight.semibold,
    lineHeight: 24,
    letterSpacing: 0.15,
  } as TextStyle,

  titleSmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.semibold,
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,

  // Body - Pour le contenu principal
  bodyLarge: {
    fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.regular,
    lineHeight: 24,
    letterSpacing: 0.5,
  } as TextStyle,

  bodyMedium: {
    fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.regular,
    lineHeight: 20,
    letterSpacing: 0.25,
  } as TextStyle,

  bodySmall: {
    fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.regular,
    lineHeight: 16,
    letterSpacing: 0.4,
  } as TextStyle,

  // Label - Pour les boutons et labels
  labelLarge: {
    fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.semibold,
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,

  labelMedium: {
    fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.semibold,
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,

  labelSmall: {
    fontFamily,
    fontSize: 11,
    fontWeight: FontWeight.semibold,
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,

  // Custom - Styles spécifiques KOM-B
  price: {
    fontFamily,
    fontSize: 18,
    fontWeight: FontWeight.bold,
    lineHeight: 24,
    letterSpacing: 0,
  } as TextStyle,

  priceSmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.bold,
    lineHeight: 20,
    letterSpacing: 0,
  } as TextStyle,

  oldPrice: {
    fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.regular,
    lineHeight: 16,
    letterSpacing: 0,
    textDecorationLine: 'line-through',
  } as TextStyle,

  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.semibold,
    lineHeight: 24,
    letterSpacing: 0.1,
  } as TextStyle,

  buttonSmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.semibold,
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,

  tabLabel: {
    fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.semibold,
    lineHeight: 16,
    letterSpacing: 0.4,
  } as TextStyle,

  badge: {
    fontFamily,
    fontSize: 10,
    fontWeight: FontWeight.bold,
    lineHeight: 14,
    letterSpacing: 0,
  } as TextStyle,

  input: {
    fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.regular,
    lineHeight: 24,
    letterSpacing: 0,
  } as TextStyle,

  placeholder: {
    fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.regular,
    lineHeight: 20,
    letterSpacing: 0,
  } as TextStyle,
} as const;

// Type export
export type TypographyKey = keyof typeof Typography;
