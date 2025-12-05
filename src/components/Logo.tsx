import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogoSvg from '../assets/images/LOGO_KOM-B_HORIZONTALE.svg';

interface LogoProps {
  width?: number | string;
  height?: number | string;
  style?: object;
}

export const Logo: React.FC<LogoProps> = ({ width = 200, height = 60, style }) => {
  return (
    <View style={[styles.container, style]}>
      <LogoSvg width={width} height={height} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Logo;