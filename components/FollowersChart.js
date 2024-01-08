import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const FollowersChart = ({ data }) => {
  const chartData = {
    labels: data.map(user => user.login), // Nombres de usuario como etiquetas
    datasets: [
      {
        data: data.map(user => user.followers) // Cantidad de seguidores
      }
    ]
  };

  return (
    <BarChart
      data={chartData}
      width={Dimensions.get('window').width} // Ancho de la pantalla
      height={220}
      bezier
      yAxisLabel=""
      chartConfig={{
        backgroundColor: '#7f7f7f',
        backgroundGradientFrom: '#808080',
        backgroundGradientTo: '#5d5c5c',
        decimalPlaces: 0, // Cantidad de decimales en los valores del eje Y
        color: (opacity = 1) => `rgba(250, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
          fontSize:1,
          marginTop:80,
          marginBottom:80,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#3d3c3c'
        },
        barPercentage: 0.7,
      }}
      verticalLabelRotation={90}
      xLabelsOffset={-80}
      withVerticalLabels={true}
      showValuesOnTopOfBars={true}
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  );
};

export default FollowersChart;