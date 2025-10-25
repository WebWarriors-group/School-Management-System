import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "📅 Student Attendance", href: "/dashboard" },
];

type StudentAcademic = {
  reg_no: string;
  class_name: string;
  personal?: { Full_name: string; Gender: string; Photo?: string };
  marks?: { subject: string; marks_obtained: number }[];
  attendance?: { date: string; status: string }[];
};

type ClassModel = {
  class_id: string;
  class_name: string;
  grade: number;
  section: string;
  studentacademics?: StudentAcademic[];
};

type Teacher = {
  teacher_NIC: string;
  user_id: number;
  class?: ClassModel[];
  personal: { Full_name: string; Photo: string | null; Gender: string };
  appointed_subject: string;
  current_teaching_subject: string;
  other_subjects_taught: string;
  assigned_class: string;
};

// Simplified Student type for attendance
interface Student {
  reg_no: string;
  name: string;
  status: "Present" | "Absent";
}

const StudentAttendance = () => {
  const today = new Date().toISOString().slice(0, 10);
  const { props } = usePage<{ teacher: Teacher }>();
  const teacher = props.teacher;

  const [students, setStudents] = useState<Student[]>([]);
  const [showAll, setShowAll] = useState(true);

  // Extract students from teacher.class
  useEffect(() => {
  if (teacher?.class) {
    const allStudents = teacher.class.flatMap(
      (cls) => cls.studentacademics ?? []
    );

    // Transform StudentAcademic → Student
    const formatted: Student[] = allStudents.map((s) => ({
      reg_no: s.reg_no,
      name: s.personal?.Full_name ?? "Unknown",
      status: "Present" as const, // ✅ fixes TS error
    }));

    setStudents(formatted);
  }
}, [teacher]);


  const toggleStatus = (index: number) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[index].status =
        updated[index].status === "Present" ? "Absent" : "Present";
      return updated;
    });
  };

  const handleSubmit = () => {
    const payload = {
      date: today,
      attendance: students.map((s) => ({
        reg_no: s.reg_no,
        status: s.status,
      })),
    };

    router.post("/student-attendance/store", payload, {
      preserveState: false,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-6 w-full overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">
          Student Attendance - {today}
        </h2>

        <button
          onClick={() => setShowAll(!showAll)}
          className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {showAll ? "Show Only Present" : "Show All"}
        </button>

        <table className="min-w-full border border-gray-300 shadow-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Reg No</th>
              <th className="p-2">Mark Absent</th>
              {showAll && <th className="p-2">Current Status</th>}
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.reg_no} className="text-center border-t">
      <td>{student.personal?.full_name ?? 'Not Assigned'}</td>
                  <td className="p-2">{student.reg_no}</td>
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={student.status === "Absent"}
                      onChange={() => toggleStatus(index)}
                    />
                  </td>
                  {showAll && (
                    <td className="p-2">
                      {student.status === "Absent" ? (
                        <span className="text-red-600 font-semibold">
                          Absent
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          Present
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={showAll ? 4 : 3}
                  className="text-center text-gray-500 py-4"
                >
                  No students to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Finalize Attendance
        </button>
      </div>
    </AppLayout>
  );
};

export default StudentAttendance;
