
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Indicator } from '../data/types';
import { ChevronUp, TrendingDown, TrendingUp } from 'lucide-react-native';

interface IndicatorCardProps {
  indicator: Indicator;
  color: string;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicator, color }) => {
  const { value, change, title } = indicator;
  const isPositive = change >= 0;
  const changeText = isPositive ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
  const arrow = isPositive ? <TrendingUp  color={"green"}/> : <TrendingDown color={"red"} />;

  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.arrow}> {arrow}</Text>
      </View>
      <Text style={[styles.change, { color: isPositive ? '#fff' : '#FF4500' }]}>
        {changeText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 13,
    opacity: 0.9,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  value: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  arrow: {
    color: 'white',
    fontSize: 18,
    marginLeft: 6,
  },
  change: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default IndicatorCard;