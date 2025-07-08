import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type PerformanceData = {
  year: number;
  ol_passed: number;
  ol_expected: number;
  al_passed: number;
  al_expected: number;
};
function groupByYear(data: PerformanceData[]) {
  const grouped: Record<number, PerformanceData[]> = {};

  data.forEach(item => {
    if (!grouped[item.year]) grouped[item.year] = [];
    grouped[item.year].push(item);
  });

  return Object.entries(grouped).map(([yearStr, items]) => {
    const year = parseInt(yearStr);
    const avg = (key: keyof PerformanceData) =>
      Math.round(items.reduce((sum, i) => sum + i[key], 0) / items.length);

    return {
      year,
      ol_passed: avg('ol_passed'),
      ol_expected: avg('ol_expected'),
      al_passed: avg('al_passed'),
      al_expected: avg('al_expected')
    };
  });
}


export default function StudentPerformanceLineChart() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
useEffect(() => {
  fetch('http://127.0.0.1:8000/api/student-performance')
    .then(res => res.json())
    .then(data => {
      const groupedData = groupByYear(data);
      setPerformanceData(groupedData);
    })
    .catch(err => {
      console.error('Failed to fetch performance data:', err);
    });
}, []);


  const data = {
    labels: performanceData.map(item => item.year.toString()),
    datasets: [
      {
        label: 'O/L Passed',
        data: performanceData.map(item => item.ol_passed),
        borderColor: '#16a34a',
        backgroundColor: '#16a34a',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'O/L Expected',
        data: performanceData.map(item => item.ol_expected),
        borderColor: '#4ade80',
        backgroundColor: '#4ade80',
        borderDash: [10, 5],
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'A/L Passed',
        data: performanceData.map(item => item.al_passed),
        borderColor: '#1d4ed8',
        backgroundColor: '#1d4ed8',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'A/L Expected',
        data: performanceData.map(item => item.al_expected),
        borderColor: '#60a5fa',
        backgroundColor: '#60a5fa',
        borderDash: [10, 5],
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Student Performance Over the Years' }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10 }
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-xl w-full max-w-5xl">
      <Line data={data} options={options} />
    </div>
  );
}
