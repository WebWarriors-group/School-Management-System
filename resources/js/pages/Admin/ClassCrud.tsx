import { useForm } from '@inertiajs/react';
import React, { useState, FormEvent } from 'react';
import { router } from '@inertiajs/react';

interface Student {
  reg_no: string;
  
}

interface Class {
  class_id: number;
  grade: number | string;
  section: string;
  teacher_NIC?: string;
  studentacademics_count?: number;
  studentacademics: Student[];
  [key: string]: any;
}

interface Props {
  classes: Class[];
}

export default function ClassIndex({ classes }: Props) {
  const { data, setData, post, put, reset } = useForm<Class>({
    class_id: 0,
    grade: '',
    section: '',
    teacher_NIC: '',
    studentacademics: [],
  });

  const [editing, setEditing] = useState(false);
  const [openClassId, setOpenClassId] = useState<number | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editing ? put(`/classes/${data.class_id}`) : post('/classes');
    reset();
    setEditing(false);
  };

  const editClass = (cls: Class) => {
    setData(cls);
    setEditing(true);
  };

  const deleteClass = (id: number) => {
    if (confirm('Are you sure?')) {
      router.delete(`/classes/${id}`);
    }
  };

  const toggleStudents = (id: number) => {
    setOpenClassId(openClassId === id ? null : id);
  };

  // Grade summary
  const gradeSummary = classes.reduce<Record<string, number>>((acc, cls) => {
    const grade = String(cls.grade);
    const count = Number(cls.studentacademics_count) || 0;
    acc[grade] = (acc[grade] || 0) + count;
    return acc;
  }, {});

  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 h-80">
        {Object.entries(gradeSummary).map(([grade, total]) => (
          <div
            key={grade}
            className="relative bg-white shadow-lg rounded p-4 min-h-[120px] w-72 overflow-hidden"
          >
            <div className="text-[white] absolute bottom-0 right-0 w-0 h-0 border-b-[100px] border-l-[100px] border-b-sky-900 border-l-transparent"></div>
            <h2 className="text-xl font-semibold text-yellow-900">Grade {grade}</h2>
            <p className="text-lg text-gray-700">Total Students: {total}</p>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="w-300 mx-auto p-7 bg-white rounded shadow mt-10">
        <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>

        {/* Class Form */}
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="number"
            placeholder="Grade"
            className="border rounded px-3 py-2"
            value={data.grade}
            onChange={e => setData('grade', e.target.value)}
          />
          <input
            type="text"
            placeholder="Section"
            className="border rounded px-3 py-2"
            value={data.section}
            onChange={e => setData('section', e.target.value)}
          />
          <input
            type="text"
            placeholder="Teacher NIC"
            className="border rounded px-3 py-2"
            value={data.teacher_NIC}
            onChange={e => setData('teacher_NIC', e.target.value)}
          />
          <button
            type="submit"
            className="col-span-full md:col-span-1 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            {editing ? 'Update' : 'Add'} Class
          </button>
        </form>

        {/* Class Table */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-sky-900 text-left text-white">
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Teacher NIC</th>
              <th className="p-2 border">Students</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(cls => (
              <React.Fragment key={cls.class_id}>
                <tr
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleStudents(cls.class_id)}
                >
                  <td className="p-2 border">{cls.grade}</td>
                  <td className="p-2 border">{cls.section}</td>
                  <td className="p-2 border">{cls.teacher_NIC || '-'}</td>
                  <td className="p-2 border">{cls.studentacademics_count}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        editClass(cls);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        deleteClass(cls.class_id);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Show students if class is open */}
                
                 
               
              </React.Fragment>
            ))}
          </tbody>
        </table>

        
      </div>

{openClassId !== null && (
  <>
    <h2 className="mt-6 mb-2 text-xl font-semibold">Student List</h2>
    <table className="w-full table-auto border-collapse border">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2 border">Reg No</th>
           <th className="p-2 border">Name</th>
          <th className="p-2 border">Overrall Performance</th>
          {/* Add other student columns if needed */}
        </tr>
      </thead>
      <tbody>
        {classes
          .find(cls => cls.class_id === openClassId)
          ?.studentacademics.map(student => (
            <tr key={student.reg_no} className="border-t hover:bg-gray-50">
              <td className="p-2 border">{student.reg_no}</td>
               <td className="p-2 border text-center text-gray-500">
              No students found.
            </td>
            <td className="p-2 border text-center text-gray-500">
              No students found.
            </td>
            </tr>
          )) || (
          <tr>
           
            
          </tr>
        )}
      </tbody>
    </table>
  </>
)}






    
    </>
  );
}
