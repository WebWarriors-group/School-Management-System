import React from 'react';

import { User, BookOpen, GraduationCap, MapPin, School, Ruler, Scale, HeartHandshake, Award, Building, Info, CircleAlert, Hash, PersonStanding, Cake, IdCard, Home, LocateFixed } from 'lucide-react';

// Define the Mark interface
interface Subject {
  subject_id: number;
  subject_name: string;
}

interface Mark {
  id: number;
  subject_id: number;
  marks_obtained: number;
  grade: string;
  subject: Subject;
}

interface StudentPersonal {
  reg_no: string;
  full_name: string;
  full_name_with_initial: string;
  photo?: string;
  birthday: string;
  gender: string;
  ethnicity: string;
  religion: string;
  birth_certificate_number: string;
  address: string;
  nic_number: string;
  postal_ic_number: string;
  age: number;
  special_needs?: string;
  height?: number;
  weight?: number;
}

interface StudentAcademic {
  reg_no: string;
  class_id: number;
  distance_to_school: number;
  method_of_coming_to_school: string;
  grade_6_9_asthectic_subjects: string;
  grade_10_11_basket1_subjects: string;
  grade_10_11_basket2_subjects: string;
  grade_10_11_basket3_subjects: string;
  receiving_any_grade_5_scholarship: boolean;
  receiving_any_samurdhi_aswesuma: boolean;
  receiving_any_scholarship: boolean;
  marks: Mark[];
  student_personal?: StudentPersonal;
  name?: string;
  email?: string;
}

// ReportPage component receives 'student' data as a prop directly from Laravel.
export default function ReportPage({ student }: { student: StudentAcademic | null }) {

  // Helper to format date if needed
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString; // Fallback to raw string if date parsing fails
    }
  };

  // Helper to render boolean status with badges
  const renderBooleanStatus = (value: boolean | undefined) => {
    if (typeof value === 'undefined' || value === null) return 'N/A';
    return value ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Yes
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        No
      </span>
    );
  };

  // Display a simple "No Student Data Found" message if student is null
  if (!student) {
    return (
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 font-inter">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center border-l-4 border-yellow-500 animate-fade-in-up transition-all duration-300 transform hover:scale-105">
          <CircleAlert className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Student Data Found</h2>
          <p className="text-gray-600 text-lg">The student report could not be loaded or the student was not found.</p>
          <p className="text-gray-500 text-sm mt-2">Please ensure a valid registration number was provided and the student exists in the system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-200">
        {/* Report Card Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-8 sm:p-10 text-center rounded-t-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight">Student Academic Report</h1>
          <p className="text-xl sm:text-2xl font-light opacity-90">Detailed performance overview for <span className="font-semibold">{student.reg_no}</span></p>
        </div>

        {/* Student Photo Section (NEW - Moved to top) */}
        {student.student_personal?.photo && (
            <div className="py-6 sm:py-8 text-center bg-gray-50 border-b border-gray-200">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-xl border-4 border-blue-400 transform transition-transform duration-300 hover:scale-105">
                <img
                  src={student.student_personal.photo}
                  alt={`${student.student_personal.full_name}'s photo`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x200/E0E0E0/808080?text=No+Photo'; }}
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-blue-500 ring-opacity-50 pointer-events-none"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center">
                <User className="mr-2 text-blue-600" size={24} /> {student.student_personal.full_name || 'Student'}
              </h3>
              <p className="text-gray-600 text-sm">{student.student_personal.full_name_with_initial || ''}</p>
            </div>
          )}


        {/* Student Personal Information Section (Refined) */}
        {student.student_personal ? (
          <div className="p-6 sm:p-8 border-b border-gray-200 bg-blue-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <User className="mr-3 text-blue-600" size={28} /> Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-gray-700">
              {/* Basic Demographics */}
              <div className="col-span-full pb-2 mb-2 border-b border-blue-200 flex items-center">
                <Info className="mr-2 text-blue-500" size={20} /> <span className="font-bold text-blue-700">Basic Information</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><Cake size={18} className="mr-2 text-gray-500"/> Birthday:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium">{formatDate(student.student_personal.birthday)}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><Info size={18} className="mr-2 text-gray-500"/> Age:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium">{student.student_personal.age || 'N/A'}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><PersonStanding size={18} className="mr-2 text-gray-500"/> Gender:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium">{student.student_personal.gender || 'N/A'}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><Info size={18} className="mr-2 text-gray-500"/> Ethnicity:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium">{student.student_personal.ethnicity || 'N/A'}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><HeartHandshake size={18} className="mr-2 text-gray-500"/> Religion:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium">{student.student_personal.religion || 'N/A'}</span>
              </div>

              {/* Identification Details */}
              <div className="col-span-full pb-2 mb-2 border-b border-blue-200 flex items-center mt-4">
                <IdCard className="mr-2 text-blue-500" size={20} /> <span className="font-bold text-blue-700">Identification</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><BookOpen size={18} className="mr-2 text-gray-500"/> Birth Cert No:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium">{student.student_personal.birth_certificate_number || 'N/A'}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><Hash size={18} className="mr-2 text-gray-500"/> NIC Number:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium">{student.student_personal.nic_number || 'N/A'}</span>
              </div>
              
              {/* Contact & Physical */}
              <div className="col-span-full pb-2 mb-2 border-b border-blue-200 flex items-center mt-4">
                <Home className="mr-2 text-blue-500" size={20} /> <span className="font-bold text-blue-700">Contact & Physical</span>
              </div>
              <div className="col-span-full sm:col-span-2 md:col-span-3 flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><MapPin size={18} className="mr-2 text-gray-500"/> Address:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium break-words">{student.student_personal.address || 'N/A'}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><Ruler size={18} className="mr-2 text-gray-500"/> Height:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium">{student.student_personal.height ? `${student.student_personal.height} cm` : 'N/A'}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><Scale size={18} className="mr-2 text-gray-500"/> Weight:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium">{student.student_personal.weight ? `${student.student_personal.weight} kg` : 'N/A'}</span>
              </div>
              <div className="col-span-full flex items-start">
                <span className="font-semibold min-w-[120px] flex items-center text-gray-600"><Info size={18} className="mr-2 text-gray-500"/> Special Needs:</span>
                <span className="flex-1 ml-2 text-gray-900 font-medium break-words">{student.student_personal.special_needs || 'None'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 border-b border-gray-200 bg-blue-50 text-center text-gray-500 text-lg">
            <Info className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p>No personal information available for this student.</p>
          </div>
        )}


        {/* Student Academic Information Section */}
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <GraduationCap className="mr-3 text-blue-600" size={28} /> Academic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-gray-700">
            <div className="flex items-center">
              <span className="font-semibold w-44 min-w-[120px] flex items-center"><Hash size={18} className="mr-2 text-gray-500"/> Registration No:</span>
              <span className="flex-1 ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{student.reg_no}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-44 min-w-[120px] flex items-center"><Building size={18} className="mr-2 text-gray-500"/> Class ID:</span>
              <span className="flex-1 ml-2 text-gray-900 font-medium">{student.class_id}</span>
            </div>
            
            
           
           
            <div className="flex items-center col-span-full sm:col-span-1 lg:col-span-1">
              <span className="font-semibold w-44 min-w-[120px] flex items-center"><Award size={18} className="mr-2 text-gray-500"/> Other Scholarship:</span>
              {renderBooleanStatus(student.receiving_any_scholarship)}
            </div>
          </div>
        </div>

        {/* Marks Section */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="mr-3 text-blue-600" size={28} /> Academic Marks
          </h2>
          {student.marks && Array.isArray(student.marks) && student.marks.length > 0 ? (
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subject ID
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Marks Obtained
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {student.marks.map((mark, index) => (
                    <tr key={mark.id || index} className="hover:bg-blue-50 transition-colors duration-150 ease-in-out">
                     
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mark.subject.subject_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mark.marks_obtained}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mark.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-gray-200 text-lg">
              <Info className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-lg mb-2">No marks available for this student yet.</p>
              <p className="text-sm">Marks will appear here once added.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-6 sm:p-8 text-center text-gray-600 text-sm rounded-b-3xl border-t border-blue-200">
          <p>&copy; {new Date().getFullYear()} Student Report System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
