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
}

const UserRolesPieChart: React.FC<UserRolesPieChartProps> = ({ roleCounts }) => {
    // Prepare the data for the pie chart
    const data = {
        labels: ['Admin', 'Teacher', 'Student'],
        datasets: [
            {
                data: [roleCounts.admin, roleCounts.teacher, roleCounts.student],
                backgroundColor: ['#800000', '#004953', '#FFD166'],
                hoverBackgroundColor: ['#800000', '#004953', '#FFD166'],
                width:['20px'],
            },
        ],
    };

    // Explicitly type the options as ChartOptions
    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div style={{ width: '300px', height: '300px' }}>
            <h3 className="text-lg font-bold text-[blue] ml-10">User Roles Distribution</h3>
            <Pie data={data}  />
        </div>
    );
};

export default UserRolesPieChart;
