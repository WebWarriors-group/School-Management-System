import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface Teacher {
  teacher_NIC: string;
}

interface ClassItem {
  section: string;
  teacher_NIC?: string;
  class_name: string;
}

interface AssignClassTeachersProps {
  classes: {
    [class_name: string]: {
      [grade: number]: ClassItem[];
    };
  };
  teachers: Teacher[];
}

export default function AssignClassTeachers({ classes, teachers }: AssignClassTeachersProps) {
  const [selectedClassName, setSelectedClassName] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<number | ''>('');
  const [sectionAssignments, setSectionAssignments] = useState<Record<string, string>>({});
const [submitted, setSubmitted] = useState(false); // NEW
const [showForm, setShowForm] = useState(true); 


  const handleClassNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const className = e.target.value;
    setSelectedClassName(className);
    setSelectedGrade('');
    setSectionAssignments({});
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const grade = parseInt(e.target.value);
    setSelectedGrade(grade);

    const gradeSections = classes[selectedClassName]?.[grade] || [];
    const initialAssignments: Record<string, string> = {};
    gradeSections.forEach(cls => {
      initialAssignments[cls.section] = cls.teacher_NIC || '';
    });
    setSectionAssignments(initialAssignments);
  };

  const handleTeacherSelect = (section: string, nic: string) => {
    setSectionAssignments(prev => ({
      ...prev,
      [section]: nic,
    }));
  };

  const handleSubmit = () => {
    if (selectedClassName && selectedGrade !== '') {
      router.post('/assign-class-teachers', {
        class_name: selectedClassName,
        grade: selectedGrade,
        sections: sectionAssignments,
      });

      setSubmitted(true);
      setShowForm(false);

  // Optional: hide success message after 3 seconds
  setTimeout(() => {setSubmitted(false);
    setShowForm(true);
  }, 2000);
    }
  };

  return (

    <>
    {submitted && (
  <div className="  mb-1 p-4 bg-green-100 text-green-700 rounded border border-green-400 w-150 text-center ml-50 mt-[60px]">
    ✅ Successfully submitted!
  </div>
)}

{showForm && (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Assign Class Teachers</h1>

      {/* Select Class Name */}
      <div className="mb-4">
        <label className="block mb-5 font-medium">Select Class Name:</label>
        <select
          className="w-full border px-3 py-4 rounded"
          value={selectedClassName}
          onChange={handleClassNameChange}
          
        >
          <option value="" className=" py-4">-- Select Class Name --</option>
          {Object.keys(classes).map(className => (
            <option key={className} value={className} className="py- text-base">
              {className}
            </option>
          ))}
        </select>
      </div>

      

     
      {selectedClassName && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Grade:</label>
          <select
            className="w-full border px-3 py-4 rounded"
            value={selectedGrade}
            onChange={handleGradeChange}
          >
            <option value="">-- Select Grade --</option>
            {Object.keys(classes[selectedClassName] || {}).map(grade => (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Assign Teachers to Sections */}
      {selectedClassName && selectedGrade !== '' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Assign Teachers to Sections</h2>
          {classes[selectedClassName][selectedGrade]?.map(sectionClass => (
            <div key={sectionClass.section} className="flex items-center gap-4">
              <label className="w-24 font-medium">Section {sectionClass.section}:</label>
              <select
                className="flex-1 border px-3 py-3 rounded"
                value={sectionAssignments[sectionClass.section] || ''}
                onChange={e => handleTeacherSelect(sectionClass.section, e.target.value)}
              >
                <option value="">-- Select Teacher --</option>
                {teachers.map(teacher => (
                  <option key={teacher.teacher_NIC} value={teacher.teacher_NIC}>
                    {teacher.teacher_NIC}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      )}
    </div>
)}
    </>
  );
}
