import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Inertia } from '@inertiajs/inertia';
import { Button } from '@headlessui/react';
 import { router } from '@inertiajs/react';

interface ClassModel {
  class_id: number;
  class_name: string;
  grade: number;
  section: string;
}

interface Subject {
  subject_id: number;
  subject_name: string;
}

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
  name: string;
  qualifications?: qualification;
  personal?: personal;
}

interface Assignment {
  class_id: number;
  subject_id: number;
  teacher_NIC: string;
}

interface GradeSubject {
  grade: number;
  subject_id: number;
}

interface Props {
  grades: number[];
  classes: ClassModel[];
  subjects: Subject[];
  teachers: Teacher[];
  assignments: Assignment[];
  gradeSubjects: GradeSubject[];
  errors?: Record<string, string[]>;
  flash?: { success?: string };
  [key: string]: any;
}

export default function AssignTeachersPage() {
  const { props } = usePage<Props>();
  const { gradeSubjects, grades, classes, subjects, teachers, assignments, errors, flash } = props;

  const mediumCounts = teachers.reduce(
  (acc, teacher) => {
    const medium = teacher.qualifications?.current_appointment_service_medium?.toLowerCase();
    if (medium?.includes('tamil')) acc.tamil += 1;
    else if (medium?.includes('english')) acc.english += 1;
    else if (medium?.includes('sinhala')) acc.sinhala += 1;
    return acc;
  },
  { tamil: 0, english: 0, sinhala: 0 }
);

  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [localAssignments, setLocalAssignments] = useState<Record<number, string>>({}); // subject_id => teacher_NIC

  const filteredClasses = selectedGrade ? classes.filter((cls) => cls.grade === selectedGrade) : [];

  const subjectIdsForGrade = selectedGrade
    ? gradeSubjects.filter((gs) => gs.grade === selectedGrade).map((gs) => gs.subject_id)
    : [];

  const filteredSubjects = subjects.filter((subj) => subjectIdsForGrade.includes(subj.subject_id));

  const classAssignments = selectedClassId
    ? assignments.filter((a) => a.class_id === selectedClassId)
    : [];

  useEffect(() => {
    if (selectedClassId) {
      const map: Record<number, string> = {};
      classAssignments.forEach((a) => {
        map[a.subject_id] = a.teacher_NIC;
      });
      setLocalAssignments(map);
    } else {
      setLocalAssignments({});
    }
  }, [selectedClassId, assignments]);

  const handleTeacherChange = (subjectId: number, teacherNIC: string) => {
    setLocalAssignments((prev) => ({
      ...prev,
      [subjectId]: teacherNIC,
    }));
  };

  
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!selectedClassId) {
    alert('Please select a class');
    return;
  }

  const payload = Object.entries(localAssignments).map(([subjectId, teacherNIC]) => ({
    subject_id: Number(subjectId),
    teacher_NIC: teacherNIC,
    class_id: selectedClassId,
  }));

  if (payload.length === 0) {
    alert('Please assign at least one teacher');
    return;
  }

  // Send nested data directly — Laravel will parse it as an array properly
  Inertia.post('/assignments', { assignments: payload } as any, {
  preserveScroll: true,
  onSuccess: () => {
    console.log('Assignments saved!');
  },
  onError: (errors) => {
    console.error('Failed to submit:', errors);
  },
});

};


  return (
    <AppLayout >
      <header className="sticky top-1 flex w-full items-center border-b bg-white p-4 shadow-sm">
        <p>1</p>
      </header>

     <main className="flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200">
       <div className="flex justify-between items-center mt-20">
         <Button
           className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-pointer transform scale-90 transition-transform duration-300 hover:scale-100 z-40"
           onClick={() => router.visit('/admin/dashboardoverview')}
         >
           Back
         </Button>
       
         
       </div>


       
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-lg w-230">
    <div className="bg-white p-4 rounded shadow-lg">
      <p className="font-semibold text-gray-700">Tamil Medium</p>
      <p className="text-indigo-700 text-2xl font-bold">{mediumCounts.tamil}</p>
    </div>
    <div className="bg-white p-4 rounded shadow-lg">
      <p className="font-semibold text-gray-700">English Medium</p>
      <p className="text-green-700 text-2xl font-bold">{mediumCounts.english}</p>
    </div>
    <div className="bg-white p-4 rounded shadow-lg">
      <p className="font-semibold text-gray-700">Sinhala Medium</p>
      <p className="text-yellow-700 text-2xl font-bold">{mediumCounts.sinhala}</p>
    </div>
  </div>


    <div className="max-w-4xl  p-8 bg-white shadow-md rounded-lg space-y-6  mt-20 ml-30">
      <h1 className="text-2xl font-bold text-gray-800">Assign Teachers to Subjects</h1>

      {flash?.success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">{flash.success}</div>
      )}

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block font-medium mb-1">Select Grade</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedGrade ?? ''}
            onChange={(e) => {
              const val = e.target.value ? Number(e.target.value) : null;
              setSelectedGrade(val);
              setSelectedClassId(null);
              setLocalAssignments({});
            }}
          >
            <option value="">-- Select Grade --</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
          {errors?.grade && <p className="text-red-600 text-sm mt-1">{errors.grade.join(', ')}</p>}
        </div>
      </div>

      {selectedGrade && filteredSubjects.length > 0 && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Subjects and Teachers</h2>

          <div className="w-1/2">
            <label className="block font-medium mb-1">Select Section</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedClassId ?? ''}
              onChange={(e) => {
                const val = e.target.value ? Number(e.target.value) : null;
                setSelectedClassId(val);
              }}
            >
              <option value="">-- Select Section--</option>
              {filteredClasses.map((cls) => (
                <option key={cls.class_id} value={cls.class_id}>
                  {cls.section}
                </option>
              ))}
            </select>
          </div>

          {filteredSubjects.map((subject) => (
            <div
              key={subject.subject_id}
              className="flex justify-between items-center border rounded px-4 py-2"
            >
              <span className="font-medium text-gray-700">{subject.subject_name}</span>
              <select
                className="border rounded px-3 py-1"
                value={localAssignments[subject.subject_id] ?? ''}
                onChange={(e) => handleTeacherChange(subject.subject_id, e.target.value)}
                disabled={!selectedClassId}
              >
                <option value="">-- Select Teacher --</option>
                {teachers.map((teacher) => (
                  <option key={teacher.teacher_NIC} value={teacher.teacher_NIC}>
                    {teacher.teacher_NIC}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            disabled={!selectedClassId}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            Save Assignments
          </button>
        </form>
      )}
    </div>
    </main>
    </AppLayout>
  );
}
