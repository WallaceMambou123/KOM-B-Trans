// Design System - Couleurs unifiées pour l'écosystème KOM-B
// Basé sur Material Design 3

export const Colors = {
  // Primary - Orange KOM-B
  primary: '#FF6B35',
  primaryLight: '#FF8C5A',
  primaryDark: '#E55A2B',
  primaryContainer: '#FFF0EB',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#FF6B35',

  // Secondary - Jaune/Or
  secondary: '#FFCB69',
  secondaryLight: '#FFD88A',
  secondaryDark: '#E5B55E',
  secondaryContainer: '#FFF8E7',
  onSecondary: '#1F2937',
  onSecondaryContainer: '#B8860B',

  // Background & Surface
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceVariant: '#F3F4F6',
  surfaceContainer: '#FAFAFA',
  surfaceContainerHigh: '#F5F5F5',
  surfaceContainerLow: '#FFFFFF',

  // Text
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textDisabled: '#D1D5DB',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#1F2937',

  // States
  success: '#22C55E',
  successLight: '#86EFAC',
  successDark: '#16A34A',
  successContainer: '#F0FDF4',

  warning: '#F59E0B',
  warningLight: '#FCD34D',
  warningDark: '#D97706',
  warningContainer: '#FFFBEB',

  error: '#EF4444',
  errorLight: '#FCA5A5',
  errorDark: '#DC2626',
  errorContainer: '#FEF2F2',

  info: '#3B82F6',
  infoLight: '#93C5FD',
  infoDark: '#2563EB',
  infoContainer: '#EFF6FF',

  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',
  divider: '#E5E7EB',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
  scrim: 'rgba(0, 0, 0, 0.32)',

  // Specific UI Elements
  cardBackground: '#FFFFFF',
  inputBackground: '#F3F4F6',
  inputBorder: '#E5E7EB',
  inputBorderFocus: '#FF6B35',
  placeholder: '#9CA3AF',
  icon: '#6B7280',
  iconActive: '#FF6B35',
  iconInactive: '#9CA3AF',

  // Tab Bar
  tabBarBackground: '#FFFFFF',
  tabBarBorder: '#E5E7EB',
  tabBarActive: '#FF6B35',
  tabBarInactive: '#9CA3AF',

  // Badge
  badgeBackground: '#FF6B35',
  badgeText: '#FFFFFF',

  // Stock Status
  inStock: '#22C55E',
  lowStock: '#F59E0B',
  outOfStock: '#EF4444',

  // Ratings
  star: '#FBBF24',
  starEmpty: '#E5E7EB',

  // Transparent
  transparent: 'transparent',
} as const;

// Type pour les couleurs
export type ColorKey = keyof typeof Colors;
export type ColorValue = typeof Colors[ColorKey];
