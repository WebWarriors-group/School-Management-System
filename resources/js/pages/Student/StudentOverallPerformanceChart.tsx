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
  subject_id: string;
  subject_name: string;
  marks_obtained: number;
  highest_mark_in_subject: number ;
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
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
  if (!regNo) return;

  setLoading(true); 

  fetch(`http://localhost:8000/api/student/${regNo}/performance`)

    .then(async(res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to fetch data');
      }
      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return res.json();
      } else {
        throw new Error('Invalid response format');
      }

      
    })
    .then(data => {
      console.log("Fetched data:", data);
      if (data && Array.isArray(data.marks)) {
          setMarksData(data.marks);
      }
      else {
        console.warn("Unexpected data format:", data);
        setMarksData([]);
      }
      
    })
    .catch(error => {
      console.error(error);
   
     setMarksData([
          
        ]);
  })
  .finally(() => {setLoading(false );
});
}, [regNo]);


console.log("Current marksData state:", marksData);


 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error}</p>;
if (!marksData || marksData.length === 0) return <p>No data found.</p>;


const scores = marksData.map(item => item.marks_obtained);
const labels = marksData.map(item => item.subject_name || 'Unknown');

 const data = {
  labels,
  datasets: [
    {
      label: 'Marks Obtained',
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
