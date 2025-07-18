
import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Inertia } from '@inertiajs/inertia';
import { Button } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';

interface Props extends PageProps {
  grades: number[];
  classes: ClassModel[];
  subjects: Subject[];
  teachers: Teacher[];
  assignments: Assignment[];
  gradeSubjects: GradeSubject[];
}

interface ClassModel {
  class_id: number;
  class_name: string;
  grade: number;
  section: string;
  teacher_NIC: string;
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
}

export default function AssignTeachersPage() {
  const { props } = usePage<Props>();
  const { gradeSubjects, grades, classes, subjects, teachers, assignments, errors, flash } = props;

  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [localAssignments, setLocalAssignments] = useState<Record<number, string>>({});
  const [expandedGrade, setExpandedGrade] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);

  
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
    if (!selectedClassId) return alert('Please select a class');

    const payload = Object.entries(localAssignments).map(([subjectId, teacherNIC]) => ({
      subject_id: Number(subjectId),
      teacher_NIC: teacherNIC,
      class_id: selectedClassId,
    }));

    if (payload.length === 0) return alert('Please assign at least one teacher');

    Inertia.post('/assignments', { assignments: payload } as any, {
      preserveScroll: true,
    });
  };

  const getTeacherName = (teacherNIC: string | undefined) => {
    const teacher = teachers.find((t) => t.teacher_NIC === teacherNIC);
    return teacher?.personal?.Full_name_with_initial ?? teacher?.teacher_NIC ?? '❌ Not Assigned';
  };

  // Helper: check if a teacher can teach a subject (matching subject_name with qualifications)
  const canTeacherTeachSubject = (teacher: Teacher, subjectName: string): boolean => {
    if (!teacher.qualifications) return false;

    const subjectAppointed = teacher.qualifications.subject_appointed?.toLowerCase() || '';
    const subjectsMostTaught = teacher.qualifications.subjects_taught_most_and_second_most?.toLowerCase() || '';

    const subjectNameLower = subjectName.toLowerCase();

    // Simple substring matching (can be improved if you store IDs instead)
    if (subjectAppointed.includes(subjectNameLower)) return true;
    if (subjectsMostTaught.includes(subjectNameLower)) return true;

    return false;
  };

  // Filter teachers who can teach the selected subject
  const teachersForSelectedSubject = selectedSubjectId
    ? teachers.filter((t) => {
        const subject = subjects.find((s) => s.subject_id === selectedSubjectId);
        if (!subject) return false;
        return canTeacherTeachSubject(t, subject.subject_name);
      })
    : [];

  return (
    <AppLayout>
      <main className="p-6 bg-gray-200 space-y-12">
<div className="flex justify-between items-center">
          <Button
            className="bg-yellow-500 w-40 h-10 text-lg shadow-sm hover:scale-105 transition"
            onClick={() => router.visit('/admin/dashboardoverview')}
          >
            Back
          </Button>
        </div>
        {/* New: All Subjects List */}
        <section className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">📚 All Subjects</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {subjects.map((subject) => (
              <div
                key={subject.subject_id}
                onClick={() => setSelectedSubjectId(subject.subject_id === selectedSubjectId ? null : subject.subject_id)}
                className={`cursor-pointer border rounded px-3 py-2 text-center
                  ${selectedSubjectId === subject.subject_id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-200'}`}
              >
                {subject.subject_name}
              </div>
            ))}
          </div>

          {/* Show teachers for selected subject */}
          {selectedSubjectId && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Teachers who can teach:{" "}
                <span className="text-blue-700">
                  {subjects.find((s) => s.subject_id === selectedSubjectId)?.subject_name}
                </span>
              </h3>
              {teachersForSelectedSubject.length === 0 && <p>No teachers available for this subject.</p>}
              <ul className="list-disc pl-5 space-y-1 max-h-64 overflow-y-auto border p-3 rounded bg-gray-50">
                {teachersForSelectedSubject.map((teacher) => (
                  <li key={teacher.teacher_NIC}>
                    {teacher.personal?.Full_name_with_initial || teacher.name || teacher.teacher_NIC}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Back Button */}
        

        {/* Medium Count Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-lg">
         
        </div>

        {/* Form to Assign */}
        <div className="bg-white p-8 shadow-md rounded space-y-6">
          <h1 className="text-2xl font-bold text-blue-800">Assign Teachers to Subjects</h1>
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div key={subject.subject_id} className="flex justify-between items-center border rounded px-4 py-2">
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

        {/* Grade → Section → Subject Tree with Class Teacher */}
        <div className="mt-16 bg-white py-5 py">
          <h2 className="text-xl font-bold mb-4">📚 Grade → Section → Subject View</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-4">
            {grades.map((grade) => (
              <div
                key={grade}
                className="bg-white rounded shadow-md p-4 cursor-pointer hover:shadow-lg"
                onClick={() => setExpandedGrade(expandedGrade === grade ? null : grade)}
              >
                <h3 className="font-semibold text-lg text-green-700">Grade {grade} Assignemnts</h3>
                {expandedGrade === grade && (
                  <div className="mt-4 space-y-9">
                    {classes
                      .filter((cls) => cls.grade === grade)
                      .map((cls) => {
                        const classTeacher = getTeacherName(
                          assignments.find((a) => a.class_id === cls.class_id && a.subject_id === -1)?.teacher_NIC
                        );
                        return (
                          <div
                            key={cls.class_id}
                            className="border bg-gray-50 rounded px-4 py-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedSection(expandedSection === cls.class_id ? null : cls.class_id);
                            }}
                          >
                            <h4 className="text-gray-800 font-medium grid grid-cols-3 gap-4 items-center">
                              <span>Section {cls.section}</span>
                              <span>
                                Class Teacher:{" "}
                                <span className="text-green-700 font-semibold ml-10">{cls.teacher_NIC}</span>
                              </span>
                            </h4>

                            {expandedSection === cls.class_id && (
                              <div className="mt-3 space-y-7">
                                {gradeSubjects
                                  .filter((gs) => gs.grade === grade)
                                  .map((gs) => {
                                    const subj = subjects.find((s) => s.subject_id === gs.subject_id);
                                    const assign = assignments.find(
                                      (a) => a.class_id === cls.class_id && a.subject_id === gs.subject_id
                                    );
                                    const teacherName = getTeacherName(assign?.teacher_NIC);

                                    return (
                                      <div
                                        key={gs.subject_id}
                                        className="flex justify-between items-center bg-white px-4 py-2 border rounded shadow-sm"
                                      >
                                        <span className="font-semibold text-gray-800">
                                          📘 {subj?.subject_name ?? "Unknown"}{" "}
                                          <span className="text-blue-700 font-medium ml-10">👤 {teacherName}</span>
                                        </span>
                                      </div>
                                    );
                                  })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Assignment Summary Table */}
        <div className="mt-16 max-w-9xl mx-auto bg-white rounded shadow-md overflow-x-auto">
          <h2 className="text-xl font-bold p-6 border-b">📋 Teacher Assignment Summary</h2>
          <table className="min-w-300 table-auto text-left text-sm text-gray-700">
            <thead className="bg-blue-200 border-b">
              <tr>
                <th className="px-6 py-3">Class ID</th>
                <th className="px-6 py-3">Grade</th>
                <th className="px-6 py-3">Section</th>
                <th className="px-6 py-3">Subject</th>
                <th className="px-6 py-3">Assigned Teacher</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => {
                const cls = classes.find((c) => c.class_id === assignment.class_id);
                const subject = subjects.find((s) => s.subject_id === assignment.subject_id);
                const teacher = teachers.find((t) => t.teacher_NIC === assignment.teacher_NIC);
                if (!cls || (!subject && assignment.subject_id !== -1)) return null;

                return (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{cls.class_id}</td>
                    <td className="px-6 py-3">Grade {cls.grade}</td>
                    <td className="px-6 py-3">{cls.section}</td>
                    <td className="px-6 py-3">
                      {assignment.subject_id === -1 ? "🎓 Class Teacher" : subject?.subject_name}
                    </td>
                    <td className="px-6 py-3">
                      {teacher?.personal?.Full_name_with_initial || teacher?.teacher_NIC || "❌ Not Assigned"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </AppLayout>
  );
}
