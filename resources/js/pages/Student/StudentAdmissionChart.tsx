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

type AdmissionData = {
  year: string | number;
  total: number;
};

export default function StudentAdmissionLineChart() {
  const [admissionData, setAdmissionData] = useState<AdmissionData[]>([]);

  useEffect(() => {
    // Fetch admission data from backend API
    fetch('/api/admissions-per-year')
      .then(res => res.json())
      .then(data => {
        setAdmissionData(data);
      })
      .catch(err => {
        console.error('Failed to fetch admission data:', err);
      });
  }, []);

  const data = {
    labels: admissionData.map(item => item.year.toString()),
    datasets: [
      {
        label: 'Student Admissions',
        data: admissionData.map(item => item.total),
        fill: false,
        borderColor: '#0ea5e9',
        backgroundColor: '#0ea5e9',
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
        text: 'Student Admissions Over the Years'
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
    <div className="p-4 bg-white rounded shadow">
      <Line data={data} options={options} />
    </div>
  );
}
