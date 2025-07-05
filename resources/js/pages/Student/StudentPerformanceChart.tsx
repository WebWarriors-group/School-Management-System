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
  al_passed: number;
};

export default function StudentPerformanceLineChart() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/student-performance')
      .then(res => res.json())
      .then(data => {
        setPerformanceData(data);
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
        fill: false,
        borderColor: '#22c55e', // green
        backgroundColor: '#22c55e',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'A/L Passed',
        data: performanceData.map(item => item.al_passed),
        fill: false,
        borderColor: '#3b82f6', // blue
        backgroundColor: '#3b82f6',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Student Performance Over the Years'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-xl w-full max-w-5xl">
      <Line data={data} options={options} />
    </div>
  );
}
