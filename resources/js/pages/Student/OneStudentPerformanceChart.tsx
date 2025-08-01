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
};

export default function StudentPerformanceChart({ marksData }: Props) {
  const chartData = {
    labels: marksData.map((d) => `Month ${d.month}`),
    datasets: [
      {
        label: 'Average Marks',
        data: marksData.map((d) => d.avg_marks),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl">
      <h3 className="text-lg font-semibold mb-4">Performance Over Months</h3>
      <Line data={chartData} />
    </div>
  );
}
