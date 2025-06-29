import React, { useState, useRef } from 'react';

type Student = {
    reg_no: string;
    personal: {
        full_name: string;
        address?: string;
        photo?: string; // Make sure this is populated from DB
    };
    class: {
        class_name: string;
        grade: string;
        section: string;
    };
};

interface StudentIDProps {
    student: Student;
    onClose: () => void;
}

export default function StudentID({ student, onClose }: StudentIDProps) {
    const printRef = useRef<HTMLDivElement>(null);
    const [showBack, setShowBack] = useState(false);
    const handlePrint = () => {
        const content = printRef.current?.innerHTML;
        if (content) {
            const win = window.open('', '', 'width=400,height=600');
            if (win) {
                win.document.write(`
          <html>
          <head>
            <title>Student ID</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              .id-card { width: 350px; height: 500px; border: 2px solid #0c4a6e; border-radius: 10px; padding: 20px; box-sizing: border-box; }
              .header { text-align: center; color: #0c4a6e; }
              .photo, .logo { object-fit: cover; }
              .photo { width: 100px; height: 100px; border-radius: 9999px; margin: 10px auto; border: 2px solid #0c4a6e; }
              .logo { width: 60px; height: 60px; margin: 0 auto 10px; }
              .info { font-size: 14px; line-height: 1.6; padding: 10px; }
              .label { font-weight: bold; color: #0c4a6e; }
              .signature { margin-top: 30px; display: flex; justify-content: space-between; align-items: center; }
              .sign-line { width: 120px; border-bottom: 1px solid #555; }
              .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; }
            </style>
          </head>
          <body>${content}</body>
          </html>
        `);
                win.document.close();
                win.document.close();
      win.focus();
      win.onload = () => win.print();
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-200  flex items-center justify-center z-50 ">
          
          
      <div
  ref={printRef}
  className="relative bg-white w-[700px] h-[360px] rounded-lg shadow-lg font-sans text-[15px] overflow-hidden print:shadow-none print:rounded-none print:w-full print:h-auto"
>
  {/* Close Button */}
  <button
    onClick={onClose}
    className="absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-red-500 print:hidden z-20"
  >
    &times;
  </button>

  {/* Watermark Logo */}
  <div className="absolute inset-0 opacity-12 z-0 flex items-center justify-center">
    <img
      src="/images/School.jpg"
      alt="Watermark Logo"
      className="w-[400px] h-[400px] object-contain"
    />
  </div>

  {/* Header */}

  <div className="relative z-10 bg-sky-900 text-white px-6 py-2 flex justify-between items-center rounded-t-lg">
    {/* Logo + School Name */}
    <div className="flex items-center space-x-3">
      <img
        src="/images/School.jpg"
        alt="School Logo"
        className="w-12 h-12 object-cover rounded-full border-2 border-white"
      />
      <div className="leading-4">
        <p className="text-md font-semibold uppercase">Mahadivulwewa</p>
        <p className="text-xs font-light">(National School)</p>
      </div>
    </div>
    {/* Card Title */}
    <h1 className="text-xl font-extrabold tracking-wider uppercase">Student Card</h1>
  </div>

  {/* Body */}
  <div className="relative z-10 flex px-6 py-4 justify-between">
    {/* Student Photo */}
    <div className="flex-none w-[170px] h-[170px] mt-5 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
      <img
        src="/images/school1.jpg"
        alt="Student"
        className="w-full h-full object-cover"
      />
    </div>

    
   <div className="ml-14 mt-3 flex flex-col justify-center space-y-3 text-[16px] flex-1">
  <p className="flex gap-x-4">
    <span className="font-semibold text-gray-700">NAME:</span>
    <span className="text-blue-900 font-semibold">{student.personal.full_name}</span>
  </p>
  <p className="flex gap-x-4">
    <span className="font-semibold text-gray-700">ID:</span>
    <span className="text-blue-800">{student.reg_no}</span>
  </p>
  <p className="flex gap-x-4">
    <span className="font-semibold text-gray-700">ADDRESS:</span>
    <span className="text-blue-800">Mahadivulwewa, Sri Lanka</span>
  </p>
  <p className="flex gap-x-4 text-blue-800">
    <span className="font-semibold text-gray-700">GRADE:</span>
    {student.class.grade}
  </p>
  <p className="flex gap-x-4 text-blue-800">
    <span className="font-semibold text-gray-700">SECTION:</span>
    {student.class.section}
  </p>
  <p className="flex gap-x-4 text-blue-800">
    <span className="font-semibold text-gray-700">CLASS:</span>
    {student.class.class_name}
  </p>
</div>

  </div>

  {/* Expiry Date */}
  <div className="relative z-10 flex justify-end px-6 pb-2 mt-[-10px]">
    <div className="text-right text-sm  mt-[-30px]">
      <p className="text-gray-700 font-medium">EXPIRE DATE</p>
      <p className="text-blue-800 font-bold">25 June, 2027</p>
    </div>
  </div>

  {/* Footer */}
  <div className="relative z-10 bg-sky-900 text-white text-center py-2 text-sm rounded-b-lg print:hidden ">
    Valid for Academic Year 2024–2025 • Mahadivulwewa National School
  </div>

  {/* Print Button */}
  <div className="relative z-10 text-center mt-3 print:hidden">
    <button
      onClick={handlePrint}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-md shadow-md"
    >
      Print ID
    </button>
  </div>

</div>



                </div>
      
    );

}
