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

  const[isLoading,setIsLoading]=useState(true);
  const[error,setError]=useState<string|null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try{
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://127.0.0.1:8000/api/student/performance');

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP error! status: ${response.status}`, errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Expected JSON, got:', text);
          throw new Error('Invalid content type');
        }

        const data = await response.json();
        console.log('Fetched performance data:', data);

         const groupedData = groupByYear(data);
        setPerformanceData(groupedData);
      }catch(err){ 
        console.error('Failed to fetch performance data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');

      setPerformanceData([
          { year: 2021, ol_passed: 65, ol_expected: 75, al_passed: 60, al_expected: 70 },
          { year: 2022, ol_passed: 70, ol_expected: 80, al_passed: 65, al_expected: 75 },
          { year: 2023, ol_passed: 75, ol_expected: 85, al_passed: 70, al_expected: 80 }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformanceData();
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
        ticks: { stepSize: 30 }
      }
    }
  };
if (isLoading) {
    return (
      <div className="p-9 bg-white rounded shadow-xl w-full max-w-7xl flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
if (error) {
    return (
      <div className="p-9 bg-white rounded shadow-xl w-full max-w-7xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading performance data</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Line data={data} options={options} width={600} />
        </div>
      </div>

      );
  }
    
     
   


  return (
    <div className="p-9 bg-white rounded shadow-xl w-full max-w-7xl">
     <Line data={data} options={options} width={600}  />

    </div>
  );
}
