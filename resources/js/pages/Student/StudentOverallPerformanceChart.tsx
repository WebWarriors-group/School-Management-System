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

interface StudentPerformanceChartProps {
  regNo: string; // student reg_no passed as prop
}

export default function StudentPerformanceChart({ regNo }: {regNo:string}) {
const [marksData, setMarksData] = useState<MarksItem[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  if (!regNo) return;

  setLoading(true); // fetch தொடங்கும்போது loading true ஆக்கலாம்

  fetch(`/api/student-marks/${regNo}`)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setMarksData(data);
      } else if (Array.isArray(data.data)) {
        setMarksData(data.data);
      } else {
        setMarksData([]);
      }
      setLoading(false); // data வந்து விட்டால் loading false ஆக்கும்
    })
    .catch(error => {
      console.error(error);
      setMarksData([]);
      setLoading(false);
    });
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


return <div style={{ height: '300px' }}><Line data={data} options={options} /></div>;


}
