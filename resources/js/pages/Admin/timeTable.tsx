import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { faBullhorn, faFileLines, faUsers ,faCalendar,faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Timetable() {
  const [showTable, setShowTable] = useState(false);

  const handleCreateClick = () => {
    setShowTable(true);
  };

  const timeSlots = [
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="container mx-auto p-6">
      {/* Header Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <Button
          onClick={handleCreateClick}
          className="h-12 px-6 bg-white text-sky-700 text-base font-medium shadow-md"
        >
          Create New Timetable
        </Button>
        <Button className="h-12 px-6 bg-white text-sky-700 text-base font-medium shadow-md">
          Previous Records
        </Button>
      </div>

      {/* Page Title */}
      

      {/* Timetable Table */}
      {showTable ? (
        <>
        
          <div className="overflow-x-auto  border-2 border-grey-100 px-10 py-2 bg-[white]">
          <div className="flex justify-start gap-4 mb-6 bg-sky-700 h-12 py-5 justify-start mt-5 ">
          {/* <Button className="h-12 px-6 bg-white text-[purple] text-base font-medium shadow-md">
          Select Section
        </Button>
        <Button className="h-12 px-6 bg-white text-[purple] text-base font-medium shadow-md ml-5">
          Print
        </Button> */}
        <FontAwesomeIcon icon={faCalendarAlt} className="text-[white] text-3xl ml-10 mt-[-10px]"  />
<p className='mt-[-8px] text-[18px] text-[white]'>Time table</p>
<div className="flex absolute flex-wrap justify-end gap-4 mt-4 border border-sky-700 px-2 py-3 w-[300px] bg-[white]  mt-[-60px]">
 
  
</div>

        </div>
         
            <table className="min-w-full mt-[-10px] table-auto border-collapse border border-gray-300 bg-[white] shadow-md">
            
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 border border-gray-300">Time</th>
                  {days.map((day) => (
                    <th key={day} className="px-4 py-3 border border-gray-300">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, rowIdx) => (
                  <tr key={rowIdx} className="text-center text-[black]">
                    <td className="px-4 py-3 border border-gray-300 font-medium">{slot}</td>
                    {days.map((_, colIdx) => (
                      <td key={colIdx} className="px-4 py-3 border border-gray-300"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-10">
            <Button className="text-3xl bg-sky-700 text-[white] rounded-full w-14 h-14 shadow-lg hover:bg-purple-800">
              +
            </Button>
          </div>

          

          <div className="flex flex-wrap justify-between gap-4 mt-4 border border-sky-700 px-2 py-3 w-[550px] bg-[white] rounded-md mt-[-10px]">
  <Button className="text-sm bg-white text-[purple] shadow-lg">Maths</Button>
  <Button className="text-sm bg-white text-[purple] shadow-lg">Science</Button>
  <Button className="text-sm bg-white text-[purple] shadow-lg">Tamil</Button>
  <Button className="text-sm bg-white text-[purple] shadow-lg">Sinhala</Button>
  <Button className="text-sm bg-white text-[purple] shadow-lg">History</Button>
</div>

          </div>

          {/* Floating Add Button */}
          
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No timetable created yet. Click "Create New Timetable" to get started.
        </p>
      )}
    </div>
  );
}
