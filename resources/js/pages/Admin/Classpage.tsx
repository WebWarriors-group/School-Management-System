import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
 

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '📊 Dashboard Overview',
    href: '/',
  },
];


interface qualification {
  current_appointment_service_medium: string;
  appointed_subject_section: string;
  subject_appointed: string;
  subjects_taught_most_and_second_most: string;
  highest_education_qualification: string;
  basic_degree_stream: string;
  highest_professional_qualification: string;
}

interface personal {
  Full_name_with_initial: string;
  Gender: string;
  Photo?: string | null;
}

interface Teacher {
  teacher_NIC: string;
  qualifications?: qualification;
  personal?: personal;
}

interface ClassItem {
  section: string;
  teacher_NIC?: string;
  class_name: string;
}

interface Props {
  classes: {
    [class_name: string]: {
      [grade: number]: ClassItem[];
    };
  };
  teachers: Teacher[];
}

export default function AssignClassTeachers({ classes, teachers }: Props) {
  
  const [selectedClassName, setSelectedClassName] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>(''); // keep as string for <select>

  // Convert selectedGrade to number safely
  const gradeNum = selectedGrade === '' ? null : parseInt(selectedGrade);

  const [sectionAssignments, setSectionAssignments] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const [selectedTeacherNIC, setSelectedTeacherNIC] = useState<string>('');
  const assignedTeacherNICs = new Set<string>();

  // Collect all assigned teachers NICs
  Object.values(classes).forEach(classGroup => {
    Object.values(classGroup).forEach(sections => {
      sections.forEach(section => {
        if (section.teacher_NIC) {
          assignedTeacherNICs.add(section.teacher_NIC);
        }
      });
    });
  });

  const handleClassNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const className = e.target.value;
    setSelectedClassName(className);
    setSelectedGrade('');
    setSectionAssignments({});
    setSelectedTeacherNIC('');
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gradeStr = e.target.value;
    setSelectedGrade(gradeStr);

    const gradeNumLocal = gradeStr === '' ? null : parseInt(gradeStr);
    const gradeSections = gradeNumLocal !== null ? classes[selectedClassName]?.[gradeNumLocal] || [] : [];
    const initialAssignments: Record<string, string> = {};
    gradeSections.forEach(cls => {
      initialAssignments[cls.section] = cls.teacher_NIC || '';
    });
    setSectionAssignments(initialAssignments);
    setSelectedTeacherNIC('');
  };

  const handleTeacherSelect = (section: string, nic: string) => {
    setSectionAssignments(prev => ({
      ...prev,
      [section]: nic,
    }));
    setSelectedTeacherNIC(nic);
  };

  const handleSubmit = () => {
    if (selectedClassName && selectedGrade !== '') {
      router.post('/assign-class-teachers', {
        class_name: selectedClassName,
        grade: parseInt(selectedGrade), 
        sections: sectionAssignments,
      });

      
    }
  };

  const getGradeProgressSummary = (): Record<string, number> => {
    const progress: Record<string, { assigned: number; total: number }> = {};

    Object.values(classes).forEach(classGroup => {
      Object.entries(classGroup).forEach(([gradeStr, sections]) => {
        const grade = `Grade ${gradeStr}`;
        if (!progress[grade]) progress[grade] = { assigned: 0, total: 0 };

        sections.forEach(cls => {
          progress[grade].total += 1;
          if (cls.teacher_NIC) progress[grade].assigned += 1;
        });
      });
    });

    const progressPercent: Record<string, number> = {};
    Object.entries(progress).forEach(([grade, data]) => {
      progressPercent[grade] = Math.round((data.assigned / data.total) * 100);
    });

    return progressPercent;
  };

  const gradeProgress = getGradeProgressSummary();

  const selectedTeacher = teachers.find(t => t.teacher_NIC === selectedTeacherNIC);

  const handleReset = () => {
    if (!selectedClassName || selectedGrade === '') {
      alert('Please select a class and grade first');
      return;
    }

    if (!window.confirm('Are you sure you want to reset all teacher assignments for this class and grade?')) {
      return;
    }

    router.post(
      '/reset-class-teachers',
      {
        class_name: selectedClassName,
        grade: parseInt(selectedGrade),
      },
      {
        onSuccess: () => {
          // Clear the local state assignments for the current class and grade
          const updatedAssignments: Record<string, string> = {};
          const gradeNumLocal = parseInt(selectedGrade);
          (classes[selectedClassName][gradeNumLocal] || []).forEach(sectionClass => {
            updatedAssignments[sectionClass.section] = '';
          });
          setSectionAssignments(updatedAssignments);
        },
        onError: () => {
          alert('Failed to reset assignments. Please try again.');
        },
      }
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <header className="sticky top-1 flex w-full items-center border-b bg-white p-4 shadow-sm">
        <p>1</p>
      </header>
    <>
     <main className="flex h-full flex-2 flex-col gap-6 p-5 mt-[-20px] bg-gray-200">

      <div className="flex justify-between items-center mt-20">
  <Button
    className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-pointer transform scale-90 transition-transform duration-300 hover:scale-100 z-40"
    onClick={() => router.visit('/admin/dashboardoverview')}
  >
    Back
  </Button>

  <button
    onClick={handleReset}
    type="button"
    className="bg-red-700 text-white px-4 py-2 hover:bg-red-700 transition-colors duration-200 "
    disabled={!selectedClassName || selectedGrade === ''}
  >
    Reset Assignments
  </button>
</div>

      
      {/* Grade Progress Cards */}
      <div className="  mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(gradeProgress).map(([grade, percent]) => (
            <div
              key={grade}
              className="border border-gray-200 shadow-xl p-8 bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{grade}</h3>
                <span className="text-sm text-gray-500">{percent}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: percent === 100 ? '#22c55e' : percent === 0 ? '#e5e7eb' : '#facc15',
                  }}
                ></div>
              </div>
              <p
                className={`mt-2 text-sm ${
                  percent === 100 ? 'text-green-600' : percent === 0 ? 'text-gray-400' : 'text-yellow-600'
                }`}
              >
                {percent === 100
                  ? '✅ All sections assigned'
                  : percent === 0
                  ? '❌ No assignments yet'
                  : '⚠️ Partially assigned'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mb-1 p-4 bg-green-100 text-green-700 rounded border border-green-400 w-150 text-center ml-50 mt-[60px]">
          ✅ Successfully submitted!
        </div>
      )}

      {/* Main form + teacher profile container */}
      <div className=" mt-4 p-6 bg-white  shadow-2xl flex gap-8">
        {/* Assignment Form (left side) */}
        <div className="flex-1">
          <h1 className="text-xl font-bold mb-4">ASSIGN CLASS TEACHER</h1>

          {/* Select Class Name */}
          <div className="mb-4">
            <label className="block mb-5 font-medium">Select Class Name:</label>
            <select
              className="w-full border px-3 py-4 rounded"
              value={selectedClassName}
              onChange={handleClassNameChange}
            >
              <option value="">-- Select Class Name --</option>
              {Object.keys(classes).map(className => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Select Grade */}
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
          {selectedClassName && selectedGrade !== '' && gradeNum !== null && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Assign Teachers to Sections</h2>

              {(classes[selectedClassName][gradeNum] || []).map(sectionClass => (
                <div key={sectionClass.section} className="flex items-center gap-4">
                  <label className="w-24 font-medium">Section {sectionClass.section}:</label>
                  <select
                    className="flex-1 border px-3 py-3 rounded"
                    value={sectionAssignments[sectionClass.section] || ''}
                    onChange={e => handleTeacherSelect(sectionClass.section, e.target.value)}
                  >
                    <option value="" className="hover:cursor-pointer">
                      -- Select Teacher --
                    </option>
                    {teachers.map(teacher => {
                      const isAlreadyAssigned = assignedTeacherNICs.has(teacher.teacher_NIC);
                      return (
                        <option
                          key={teacher.teacher_NIC}
                          value={teacher.teacher_NIC}
                          style={{
                            color: isAlreadyAssigned ? 'red' : 'inherit',
                            fontWeight: isAlreadyAssigned ? 'bold' : 'normal',
                          }}
                        >
                          {teacher.teacher_NIC}
                          {isAlreadyAssigned ? ' (Already Assigned)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
              >
                Submit
              </button>

              
            </div>
          )}
        </div>

        {/* Teacher Profile Card (right side) */}
        <div className="w-100 max-w-md mx-auto sticky top-24 self-start">
          {selectedTeacher ? (
            <div className="relative bg-white shadow-xl overflow-hidden border border-gray-200">
              {/* Header section */}
              <div className="relative h-32 bg-gradient-to-r from-pink-800 to-purple-900">
                <div className="absolute inset-0 backdrop-blur-md"></div>
              </div>

              {/* Profile Image */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                <img
                  src="/images/tag4"
                  alt="Teacher"
                  className="w-34 h-34 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>

              {/* Content */}
              <div className="pt-20 pb-6 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedTeacher.personal?.Full_name_with_initial ?? 'No Name'}
                </h2>
                <p className="text-sm text-gray-500 mb-4">NIC: {selectedTeacher.teacher_NIC}</p>

                <div className="text-left mt-4 space-y-3 text-[18px] text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-800 font-medium w-40">Gender:</span>
                    <span>{selectedTeacher.personal?.Gender ?? 'N/A'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-800 font-medium w-40">Degree Stream:</span>
                    <span>{selectedTeacher.qualifications?.subject_appointed ?? 'N/A'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-800 font-medium w-40">Medium:</span>
                    <span>{selectedTeacher.qualifications?.current_appointment_service_medium ?? 'N/A'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-800 font-medium w-40">Subjects:</span>
                    <span>{selectedTeacher.qualifications?.subjects_taught_most_and_second_most ?? 'N/A'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-800 font-medium w-40">Section:</span>
                    <span>{selectedTeacher.qualifications?.appointed_subject_section ?? 'N/A'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-800 font-medium w-40">Basic Stream:</span>
                    <span>{selectedTeacher.qualifications?.basic_degree_stream ?? 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 italic text-center">Select a teacher to see profile</p>
          )}
        </div>
      </div>
      </main>
    </>
    </AppLayout>
  );
}
