// ProductPieChart.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg'; // Import correct
import { SalesByProduct } from '../data/types';

interface ProductPieChartProps {
  productData: SalesByProduct[];
}

const ProductPieChart: React.FC<ProductPieChartProps> = ({ productData }) => {
  const radius = 50;
  const center = radius;

  let startAngle = 0;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>ventes par produit</Text>
      <View style={styles.content}>
        {/* Pie Chart */}
        <View style={styles.pieContainer}>
          <Svg width={100} height={100} viewBox="0 0 100 100">
            {productData.map((item, index) => {
              const percentage = item.percentage / 100;
              const sliceAngle = percentage * 360;
              const endAngle = startAngle + sliceAngle;
              const largeArc = percentage > 0.5 ? 1 : 0;

              const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
              const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
              const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
              const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);

              const pathData = [
                `M ${center} ${center}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                'Z',
              ].join(' ');

              startAngle = endAngle;

              return <Path key={index} d={pathData} fill={item.color} />;
            })}
          </Svg>
        </View>

        {/* Legende */}
        <View style={styles.legend}>
          {productData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: item.color }]} />
              <Text style={styles.product}>{item.product}</Text>
              <Text style={styles.percent}>{item.percentage.toFixed(1)}%</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pieContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legend: {
    flex: 1,
    marginLeft: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 8,
  },
  product: {
    flex: 1,
    fontSize: 13,
    color: '#555',
  },
  percent: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductPieChart;