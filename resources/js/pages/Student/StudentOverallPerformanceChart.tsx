import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
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
}

export default function StudentOverallPerformanceChart({
  regNo,
  subjectFilter,
  examFilter,
  startDate,
  endDate
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
      // Accept several possible shapes
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


 if (loading) return <p>Loading...</p>;
if (!marksData || marksData.length === 0) return <p>No data found.</p>;


const scores = marksData.map(item => item.marks_obtained);
const labels = marksData.map(item => item.subject?.subject_name || 'Unknown');

 const data = {
  labels,
  datasets: [
    {
      label: '', // Remove label to avoid legend
      data: scores,
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      pointRadius: 3, // No dots on the line
      fill: true, // No fill under line
      tension: 0.4, // Smooth curve
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Remove legend
    },
    tooltip: {
      enabled: false, // Remove tooltip on hover
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Subjects',
      },
    },
    y: {
      display: true,
      beginAtZero: true,
      max: 100,
      title: {
        display: true,
        text: 'Marks (%)',
      },
    },
    
  },
  
};


return <div style={{ height: '300px' }}><Line data={data} options={options} />




</div>;


}
