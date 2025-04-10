import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the prop type for the component
interface UserRolesPieChartProps {
  roleCounts: {
    admin: number;
    teacher: number;
    student: number;
  };
  secondRoleCounts?: {
    teacher: number;
    student: number;
  };
}

const UserRolesPieChart: React.FC<UserRolesPieChartProps> = ({
  roleCounts,
  secondRoleCounts,
}) => {
  // First chart data
  const data = {
    labels: ['Admin', 'Teacher', 'Student'],
    datasets: [
      {
        data: [roleCounts.admin, roleCounts.teacher, roleCounts.student],
        backgroundColor: ['rgb(76, 234, 181)', 'rgb(214, 17, 168)', '#8B5CF6'],
        hoverBackgroundColor: ['#800000', '#004953', '#FFD166'],
      },
    ],
  };

  // Optional second chart data
  const data2 = secondRoleCounts
    ? {
        labels: ['Teacher', 'Student'],
        datasets: [
          {
            data: [secondRoleCounts.teacher, secondRoleCounts.student],
            backgroundColor: ['#4C9F70', '#FFD700'],
            hoverBackgroundColor: ['#4C9F70', '#FFD700'],
          },
        ],
      }
    : null;

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="flex gap-10 px-10 items-start">
      {/* First Pie Chart */}
      <div className="w-[300px] h-[250px]">
        <h3 className="text-[22px] font-bold text-[maroon] ml-3 mb-2">
          User Roles Distribution
        </h3>
        <Pie data={data} options={options} />
      </div>

      {/* Second Pie Chart */}
      {data2 && (
        <div className="w-[300px] h-[230px]">
          <h3 className="text-[22px] font-bold text-green-700 ml-3 mb-2">
            Total Distribution
          </h3>
          <Pie data={data2} options={options} />
        </div>
      )}
    </div>
  );
};

export default UserRolesPieChart;
