import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,

  FontSpec

} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

import { Line } from 'react-chartjs-2';


type MarksItem = {
  marks_obtained: number;
  subject?: {
    subject_name: string;
  };
};

interface StudentOverallPerformanceChartProps {
  regNo: string;
  subjectFilter?: string;
  examFilter?: string;
  startDate?: string;
  endDate?: string;

  darkMode?:boolean;

}

export default function StudentOverallPerformanceChart({
  regNo,
  subjectFilter,
  examFilter,
  startDate,

  endDate,
  darkMode=false

}: StudentOverallPerformanceChartProps) {
const [marksData, setMarksData] = useState<MarksItem[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  if (!regNo) return;


  setLoading(true);
  const controller = new AbortController();

  fetch(`/api/student/${regNo}/marks`, { signal: controller.signal })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text?.slice(0, 200)}`);
      }
      return res.json();
    })
    .then((data) => {
  
      const possible = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.marks)
        ? (data as any).marks
        : Array.isArray((data as any)?.data)
        ? (data as any).data
        : [];
      setMarksData(possible as MarksItem[]);
      setLoading(false);
    })
    .catch((error) => {
      if ((error as any)?.name === 'AbortError') return;
      console.error('StudentOverallPerformanceChart fetch error:', error);
      setMarksData([]);
      setLoading(false);
    });

  return () => controller.abort();

}, [regNo]);


console.log("Current marksData state:", marksData);



 if (loading) return <p className={darkMode ? "text-gray-300" : ""}>Loading...</p>;
if (!marksData || marksData.length === 0) return <p className={darkMode ? "text-gray-300" : ""}>No data found.</p>;



const scores = marksData.map(item => item.marks_obtained);
const labels = marksData.map(item => item.subject?.subject_name || 'Unknown');

 const data = {
  labels,
  datasets: [
    {
      label: '', 
      data: scores,

      borderColor: darkMode ? 'rgba(251, 191, 36, 1)' : 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      pointRadius: 3, 
      pointBackgroundColor: darkMode ? 'rgba(251, 191, 36, 1)' : 'rgba(75, 192, 192, 1)',
        pointBorderColor: darkMode ? '#1f2937' : '#fff',
        pointHoverBackgroundColor: darkMode ? '#1f2937' : '#fff',
        pointHoverBorderColor: darkMode ? 'rgba(251, 191, 36, 1)' : 'rgba(75, 192, 192, 1)',
      fill: true, 
      tension: 0.4, 
      backgroundColor: darkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(75, 192, 192, 0.1)',

    },
  ],
};

const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false, 
    },
    tooltip: {
      enabled: false, 
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Subjects',

        color: darkMode ? '#e5e7eb' : '#374151',
        font: {
            weight: 'bold' as const,
            size:14,
          } as FontSpec
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }

    },
    y: {
      display: true,
      beginAtZero: true,
      max: 100,
      title: {
        display: true,
        text: 'Marks (%)',

        color: darkMode ? '#e5e7eb' : '#374151',
          font: {
            weight: 'bold' as const,
            size:14
          } as FontSpec
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',

      },
    },
    
  },
  
};


return <div style={{ height: '300px' }}><Line data={data} options={options} />




</div>;


}
