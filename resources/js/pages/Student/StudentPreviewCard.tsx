import React from "react";

interface BaseStudent {
  reg_no: number;
  class_id: number;
  student_id_no?: string;
}

interface StudentPreviewCardProps {
  student: BaseStudent;
  position: { x: number; y: number };
}

const StudentPreviewCard: React.FC<StudentPreviewCardProps> = ({ student, position }) => {
  if (!student || !position) return null;

  // Fallback path based on reg_no
  const profilePhotoUrl = `/images/students/${student.reg_no}.jpg`;

  return (
    <div
      className="absolute z-50 w-64 rounded-xl shadow-xl border border-gray-200 text-center animate-fadeIn bg-white"
      style={{
        top: position.y + 12,
        left: position.x + 12,
      }}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <div className="relative">
          <img
            src={profilePhotoUrl}
            alt="Student"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/boy.jpg";
            }}
          />
          <span className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {student.class_id}
          </span>
        </div>
        <div className="mt-2 w-full">
          <p className="text-lg font-bold text-gray-800 mb-1 truncate">
            Reg No: {student.reg_no}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
            <span className="bg-blue-100 px-2 py-1 rounded">
              Reg: {student.reg_no}
            </span>
            <span className="bg-green-100 px-2 py-1 rounded">
              Class: {student.class_id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPreviewCard;