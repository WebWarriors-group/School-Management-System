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
              
            },
        },
    };

    return (
      
        <div className='flex px-10'>
        {/* First Pie Chart */}
        <div style={{ width: '300px', height: '250px' }} className='' >
            <h3 className="text-[22px] font-bold text-[maroon] text-muted-foreground text-sm ml-[13px]">User Roles Distribution</h3>
            <Pie data={data}  />
        </div>

       
         <div style={{ width: '255px', height: '225px' }} className='ml-30 mt-6'>
            <h3 className="text-[22px] font-bold text-[green] mt-[-10px] ">Total Distribution </h3>
            <Pie data={data2} />
        </div>
    </div>
    
    );
};

export default UserRolesPieChart;
