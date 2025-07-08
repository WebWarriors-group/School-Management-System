// components/PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  values: number[];
  title?: string;
  colors?: string[]; // Optional colors for slices
}

const PieChart: React.FC<PieChartProps> = ({ labels, values, title, colors }) => {
  const defaultColors = [
    '#3b82f6', '#10b981', '#ec4899', '#f59e0b', '#8b5cf6', '#ef4444',
  ];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors || defaultColors,
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 18,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
