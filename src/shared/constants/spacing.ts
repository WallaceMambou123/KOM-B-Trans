// Design System - Espacement unifié pour l'écosystème KOM-B
// Basé sur Material Design 3 (multiples de 4dp)

// Spacing - Marges et Paddings
export const Spacing = {
  none: 0,
  xs: 4,    // Extra small
  sm: 8,    // Small
  md: 16,   // Medium (default)
  lg: 24,   // Large
  xl: 32,   // Extra large
  xxl: 48,  // Extra extra large
  xxxl: 64, // Maximum
} as const;

// Border Radius
export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999, // Pour les cercles
} as const;

// Touch Targets - Material Design minimum 48dp
export const TouchTarget = {
  minimum: 48,      // Minimum recommandé par Material Design
  comfortable: 56,  // Plus confortable pour les doigts
  large: 64,        // Pour les actions principales
} as const;

// Icon Sizes
export const IconSize = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

// Container Sizes
export const Container = {
  maxWidth: 428, // iPhone 14 Pro Max width
  padding: Spacing.md,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.md,
} as const;

// Card Styles
export const Card = {
  padding: Spacing.md,
  borderRadius: BorderRadius.lg,
  elevation: 2,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
} as const;

// Input Fields
export const Input = {
  height: 48,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.sm,
  borderRadius: BorderRadius.md,
  borderWidth: 1,
} as const;

// Buttons
export const Button = {
  height: 48,
  paddingHorizontal: Spacing.lg,
  paddingVertical: Spacing.sm,
  borderRadius: BorderRadius.md,
  minWidth: 88, // Material Design minimum
} as const;

// Tab Bar
export const TabBar = {
  height: 64,
  paddingBottom: Spacing.sm,
  paddingTop: Spacing.xs,
  iconSize: IconSize.md,
  labelMarginTop: Spacing.xs,
} as const;

// Header
export const Header = {
  height: 56,
  paddingHorizontal: Spacing.md,
} as const;

// Bottom Sheet
export const BottomSheet = {
  handleWidth: 40,
  handleHeight: 4,
  handleBorderRadius: BorderRadius.full,
  borderRadius: BorderRadius.xxl,
  paddingTop: Spacing.sm,
  paddingHorizontal: Spacing.lg,
  paddingBottom: Spacing.xl,
} as const;

// Gap/Spacing between items
export const Gap = {
  xs: Spacing.xs,
  sm: Spacing.sm,
  md: Spacing.md,
  lg: Spacing.lg,
} as const;

// Type exports
export type SpacingKey = keyof typeof Spacing;
export type BorderRadiusKey = keyof typeof BorderRadius;
