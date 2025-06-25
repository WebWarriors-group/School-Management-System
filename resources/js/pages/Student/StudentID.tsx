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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] h-[300px] rounded-lg shadow-lg flex flex-col relative font-sans text-[14px]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-red-500"
                >
                    &times;
                </button>
                    < div ref={printRef}>

                <div className="flex h-full">
                   <div className="w-[30%] bg-blue-900 text-white flex flex-col items-center justify-center p-4">

                       
                        <div className="flex justify-end mb-2">
    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-700 flex items-center justify-center">
      <img
        src="/images/School.jpg"
        alt="School Logo"
        className="object-cover w-full h-full"
      />
    </div>
  </div>
            
                                           <h2 className="text-lg font-bold">T / Tn/ Mahadivulwewa Maha Vidyalaya(National School)</h2>
  </div>


                        <div className="w-[45%] p-4 text-black">
            <div className="bg-red-600 text-white px-3 py-1 text-sm font-bold mb-2 inline-block">
              STUDENT ID CARD
            </div>
<div className="space-y-1">
 
                        <p><span className="label">Name:</span> {student.personal.full_name}</p>
                        <p><span className="label">Reg. No:</span> {student.reg_no}</p>
                        <p><span className="label">Grade:</span> {student.class.grade}</p>
                        <p><span className="label">Section:</span> {student.class.section}</p>
                        <p><span className="label">Class:</span> {student.class.class_name}</p>
                        <p><span className="label">Address</span> {student.personal.address}</p>
                    </div>
</div>
<div className="w-[25%] flex flex-col justify-between items-center py-4 pr-4">
            <div className="w-24 h-28 border-2 border-gray-400 overflow-hidden">
 <img
                        src={student.personal.photo || '/images/default-avatar.png'} // fallback photo
                        alt="Student"
                        className="w-full h-full object-cover"
    />
  </div>

               
                    <div className="text-center text-xs mt-2">
                        <div className="text-left text-sm text-gray-600">
                            <div className="sign-line mb-1"></div>
                            <p className="text-xs">Principal Signature</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                            <div className="sign-line mb-1"></div>
                            <p className="text-xs">Student Signature</p>
                        </div>
                    </div>
 </div>
        </div>
        </div>
                    <div className="footer mt-4">
                        <p>Valid for Academic Year 2024 - 2025</p>
                    </div>



                    <button
                        onClick={handlePrint}
                        className="mt-4 bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded-md shadow-md"
                    >
                        Print ID
                    </button>

                
            

     
     
  
<div className="absolute bottom-0 left-0 w-full h-8 bg-red-700 rounded-b-lg flex items-center justify-center text-white text-xs">
  Powered by T/Tn/Maha Vidyalaya • Academic Year 2024-2025
</div>
</div>
                </div>
      
    );

}
