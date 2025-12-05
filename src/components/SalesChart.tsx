import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SalesByMonth } from '../data/types';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';

interface SalesChartProps {
  salesData: SalesByMonth[];
}

const SalesChart: React.FC<SalesChartProps> = ({ salesData }) => {
  const maxSales = Math.max(...salesData.map(d => d.sales));
  const barWidth = 12;
  const spacing = 20;
  const chartWidth = Dimensions.get('window').width - 64;
  const chartHeight = 160;
  const paddingLeft = 40;
  const paddingBottom = 20;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ventes par mois</Text>
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((val, index) => (
            <SvgText
              key={val}
              x={paddingLeft - 5}
              y={chartHeight - paddingBottom - (val / 100) * (chartHeight - paddingBottom)}
              fontSize="10"
              fill="#aaa"
              textAnchor="end"
              alignmentBaseline="middle"
            >
              {val}
            </SvgText>
          ))}

          {/* Bars */}
          {salesData.map((item, index) => {
            const barHeight = (item.sales / maxSales) * (chartHeight - paddingBottom);
            const x = paddingLeft + (index * (chartWidth - paddingLeft) / salesData.length);
            return (
              <React.Fragment key={index}>
                <Rect
                  x={x + (chartWidth - paddingLeft) / salesData.length / 2 - barWidth / 2}
                  y={chartHeight - barHeight - paddingBottom}
                  width={barWidth}
                  height={barHeight}
                  fill="#FF8C00"
                  rx={6}
                  ry={6}
                />
                <SvgText
                  x={x + (chartWidth - paddingLeft) / salesData.length / 2}
                  y={chartHeight - 5}
                  fontSize="11"
                  fill="#777"
                  textAnchor="middle"
                >
                  {item.month}
                </SvgText>
              </React.Fragment>
            );
          })}

          {/* Base line */}
          <Line
            x1={paddingLeft}
            y1={chartHeight - paddingBottom}
            x2={chartWidth}
            y2={chartHeight - paddingBottom}
            stroke="#FF8C00"
            strokeWidth="2"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  chartContainer: {
    height: 160,
  },
});

export default SalesChart;