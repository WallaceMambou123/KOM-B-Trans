import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface GainsChartProps {
    data: number[];
    labels: string[];
}

const GainsChart: React.FC<GainsChartProps> = ({ data, labels }) => {
    
    // On utilise les props 'data' et 'labels'
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data, 
                color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`, 
                strokeWidth: 2, 
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: '#ffffff', 
        backgroundGradientTo: '#ffffff',   
        decimalPlaces: 0, 
        color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`, 
        labelColor: (opacity = 1) => `rgba(187, 187, 187, ${opacity})`, 
        propsForDots: { r: "0", strokeWidth: "0" },
        propsForBackgroundLines: { strokeDasharray: '' },
    };

    return (
        <View>
            <LineChart
                data={chartData}
                // Ajustement de la largeur pour le padding de la carte (20px * 2) + padding extérieur (16px * 2) = 72
                // La largeur totale est (screenWidth - 32) (scrollViewContent)
                // Largeur du graphique est (screenWidth - 32 - (20 * 2) ) = screenWidth - 72
                width={screenWidth - 72} 
                height={90} 
                chartConfig={chartConfig}
                bezier 
                withVerticalLines={false} 
                withHorizontalLines={false} 
                withDots={false} 
                style={{
                    marginVertical: 8,
                }}
            />
        </View>
    );
};

export default GainsChart;