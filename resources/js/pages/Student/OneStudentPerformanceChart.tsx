import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

type Props = {
  marksData: { month: number; avg_marks: number }[];
  darkMode?:boolean;
};

export default function StudentPerformanceChart({ marksData , darkMode = false}: Props) {
  const chartData = {
    labels: marksData.map((d) => `Month ${d.month}`),
    datasets: [
      {
        label: 'Average Marks',
        data: marksData.map((d) => d.avg_marks),
        borderColor: darkMode ? 'rgba(251, 191, 36, 1)' : 'rgb(59, 130, 246)',
        backgroundColor: darkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(59, 130, 246, 0.5)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: darkMode ? 'rgba(251, 191, 36, 1)' : 'rgb(59, 130, 246)',
        pointBorderColor: darkMode ? '#1f2937' : '#fff',
        pointHoverBackgroundColor: darkMode ? '#1f2937' : '#fff',
        pointHoverBorderColor: darkMode ? 'rgba(251, 191, 36, 1)' : 'rgb(59, 130, 246)',
      },
    ],
  };
 const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#e5e7eb' : '#374151',
        }
      },
      tooltip: {
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        titleColor: darkMode ? '#f9fafb' : '#111827',
        bodyColor: darkMode ? '#f9fafb' : '#111827',
        borderColor: darkMode ? '#374151' : '#e5e7eb',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color:darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      }
    }
  };

  return (
    <div className={`p-4 shadow-md rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Performance Over Months</h3>
      <div style={{ height: '300px' }}><Line data={chartData} options={options} /></div>
    </div>
  );
}
