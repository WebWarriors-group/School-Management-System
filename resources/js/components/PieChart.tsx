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

    secondRoleCounts?: {  // Optional second chart
       
        teacher: number;
        student: number;
    };
};




const UserRolesPieChart: React.FC<UserRolesPieChartProps> = ({ roleCounts,secondRoleCounts }) => {
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
    const data2 = secondRoleCounts ? {
        labels: ['Teacher', 'Student'],
        datasets: [
            {
                data: [ secondRoleCounts.teacher, secondRoleCounts.student],
                backgroundColor: ['#4C9F70', '#FFD700' ],
                hoverBackgroundColor: ['#4C9F70', '#FFD700'],
            },
        ],
    } : null;


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
        <div className='flex px-10'>
        {/* First Pie Chart */}
        <div style={{ width: '300px', height: '400px' }} className="ml-30">
            <h3 className="text-[22px] font-bold text-[maroon] ">User Roles Distribution</h3>
            <Pie data={data} options={options} />
        </div>

        {/* Second Pie Chart */}
        <div style={{ width: '300px', height: '400px' }} className='ml-[200px]'>
            <h3 className="text-[22px] font-bold text-[green] px-10">Total Distribution </h3>
            <Pie data={data2} options={options} />
        </div>
    </div>
    );
};

export default UserRolesPieChart;
