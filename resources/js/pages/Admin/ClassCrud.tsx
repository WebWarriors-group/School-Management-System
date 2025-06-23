import { useForm } from '@inertiajs/react';
import React, { useState, FormEvent } from 'react';
import { router } from '@inertiajs/react';

interface StudentPersonal {
  full_name_with_initial: string;
  gender: string;
  
  // add any other needed fields
}

interface Student {
  reg_no: string;
  studentpersonal?: StudentPersonal;
}

interface Class {
  class_id: number|string;
  class_name:string;
  grade: number|string;
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
    class_id:'',
    grade: '',
     class_name: '',
    section: '',
    teacher_NIC: '',
    studentacademics: [],
  });

  const [editing, setEditing] = useState(false);
  const [openClassId, setOpenClassId] = useState<Class | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editing ? put(`/classes/${data.class_id}`) : post('/classadd');
    reset();
    setEditing(false);
  };

  const editClass = (cls: Class) => {
    setData(cls);
    setEditing(true);
  };

  const deleteClass = (id: number|string) => {
    if (confirm('Are you sure?')) {
      router.delete(`/classes/${id}`);
    }
  };

  const toggleStudents = (id: Class) => {
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 h-60">
        {Object.entries(gradeSummary).map(([grade, total]) => (
          <div
            key={grade}
            className="relative bg-white shadow-lg rounded p-4 min-h-[120px] w-72 overflow-hidden"
          >
            <div className="text-[white] absolute bottom-0 right-0 w-0 h-0 border-b-[90px] border-l-[100px] border-b-sky-900 border-l-transparent"></div>
            <h2 className="text-xl font-semibold text-green-800">Grade {grade}</h2>
            <p className="text-lg text-sky-700">Total Students: {total}</p>
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
            placeholder="classID"
            className="border rounded px-3 py-2"
            value={data.class_id}
            onChange={e => setData('class_id', e.target.value)}
          />
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
          <select
  className="border rounded px-3 py-2"
  value={data.class_name}
  onChange={e => setData('class_name', e.target.value)}
>
  <option value="">Select Class Name</option>
  <option value="junior">Junior</option>
  <option value="O/L">O/L</option>
  <option value="A/L">A/L</option>
</select>

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
              <th className="p-2 border">ClassID</th>
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">Section</th>
               <th className="p-2 border">Class Name</th>
              <th className="p-2 border">Class Teacher</th>
              <th className="p-2 border">Students</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(cls => (
              <React.Fragment key={cls.class_id}>
                <tr
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleStudents(cls)}
                >
                   <td className="p-2 border">{cls.class_id}</td>
                  <td className="p-2 border">{cls.grade}</td>
                  <td className="p-2 border">{cls.section}</td>
                  <td className="p-2 border">{cls.class_name}</td>
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

               
                
                 
               
              </React.Fragment>
            ))}
          </tbody>
        </table>

        
      </div>

{openClassId !== null && (
  <div className="bg-white shadow rounded-lg p-6 mt-6">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">
      Class: {openClassId.grade} - {openClassId.section}
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-gray-700 mb-6">
      <p className="text-lg bg-sky-800 py-2 text-center text-white">
        <span className="text-md text-white">Class Teacher:</span> {openClassId.teacher_NIC}
      </p>
     <p className="text-lg bg-sky-800 py-2 text-center text-white">
        <span className="text-md  text-white">Class Name:</span> {openClassId.class_name}
      </p>
    <p className="text-lg bg-sky-800 py-2 text-center text-white">
        <span className="text-md text-white">Total Students:</span> {openClassId.studentacademics_count}
      </p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-md text-left border border-gray-200">
        <thead className="bg-[#650000] text-white">
          <tr>
            <th className="px-4 py-2 border">Reg No</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Gender</th>
          </tr>
        </thead>
        <tbody>
          {classes.find(cls => cls === openClassId)?.studentacademics.map(student => (
            <tr key={student.reg_no} className="hover:bg-yellow-100 border-b">
              <td className="px-4 py-2 border">{student.reg_no}</td>
              <td className="px-4 py-2 border">
                {student.studentpersonal
                  ? student.studentpersonal.full_name_with_initial
                  : 'Not Available'}
              </td>
              <td className="px-4 py-2 border">{student.studentpersonal?.gender ?? 'N/A'}</td>
            </tr>
          )) || (
            <tr>
              <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                No students found for this class.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}







    
    </>
  );
}
