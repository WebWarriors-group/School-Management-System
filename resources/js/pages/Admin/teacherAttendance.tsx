import React, { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AppLayout from "@/layouts/app-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '👩‍🏫 Teacher Management',
    href: '/dashboard',
  },
];
interface Teacher {
  teacher_NIC: string;
  name: string;
  status: 'Present' | 'Absent';
}

const TeacherAttendance = ({
  teachersFromServer,
  showAll: initialShowAll,
}: {
  teachersFromServer: Teacher[];
  showAll: boolean;
}) => {
  const today = new Date().toISOString().slice(0, 10);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showAll, setShowAll] = useState<boolean>(initialShowAll);
  
  useEffect(() => {
    // Initialize teachers from server as is (status already provided)
    setTeachers(teachersFromServer.map(t => ({
      ...t,
      status: t.status as 'Present' | 'Absent',
    })));
  }, [teachersFromServer]);

  const toggleStatus = (index: number) => {
    setTeachers((prev) => {
      const updated = [...prev];
      updated[index].status =
        updated[index].status === 'Present' ? 'Absent' : 'Present';
      return updated;
    });
  };

  const handleSubmit = () => {
  const payload = {
    date: today,
    attendance: teachers.map((t) => ({
      teacher_NIC: t.teacher_NIC,
      status: t.status,
    })),
  };

  router.post('/admin/teacher-attendance', payload, {
    preserveState: false,  // allow full page reload to follow backend redirect
  });
};


  const handleShowAll = () => {
    // Toggle showAll and reload page with query param
    router.get('/admin/teacher-attendance', {
      show_all: !showAll ? 'true' : undefined,
    });
  };

  return (
    <AppLayout   breadcrumbs={breadcrumbs}>
    <div className="p-6 w-full overflow-x-auto">

      <h2 className="text-2xl font-bold mb-4">Teacher Attendance - {today}</h2>

      <button
        onClick={handleShowAll}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        {showAll ? 'Show Only Present' : 'Show All'}
      </button>

      <table className="min-w-full border border-gray-300 shadow-sm">

        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">NIC</th>
            <th className="p-2">Mark Absent</th>
            {showAll && <th className="p-2">Current Status</th>}
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <tr key={teacher.teacher_NIC} className="text-center border-t">
                <td className="p-2">{teacher.name}</td>
                <td className="p-2">{teacher.teacher_NIC}</td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={teacher.status === 'Absent'}
                    onChange={() => toggleStatus(index)}
                  />
                </td>
                {showAll && (
                  <td className="p-2">
                    {teacher.status === 'Absent' ? (
                      <span className="text-red-600 font-semibold">Absent</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Present</span>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={showAll ? 4 : 3} className="text-center text-gray-500 py-4">
                No teachers to display.
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

export default TeacherAttendance;
