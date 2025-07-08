import { useForm, router } from '@inertiajs/react';
import React, { useState, FormEvent } from 'react';

interface StudentPersonal {
  full_name_with_initial: string;
  gender: string;
}

interface Student {
  reg_no: string;
  studentpersonal?: StudentPersonal;
}

interface Class {
  class_id: number | string;
  class_name: string;
  grade: number | string;
  year: number | string;
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
    class_id: '',
    grade: '',
    year: '',
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
    setEditing(false);
    // ✅ Keep openClassId visible (don’t reset here unless you want to close the student section)
  };

  const editClass = (cls: Class) => {
    setData(cls);
    setEditing(true);
  };

  const deleteClass = (id: number | string) => {
    if (confirm('Are you sure?')) {
      router.delete(`/classes/${id}`);
    }
  };

  const toggleStudents = (cls: Class) => {
    setOpenClassId(openClassId?.class_id === cls.class_id ? null : cls);
  };

  // Grade summary calculation
  const gradeSummary = classes.reduce<Record<string, number>>((acc, cls) => {
    const grade = String(cls.grade);
    const count = Number(cls.studentacademics_count) || 0;
    acc[grade] = (acc[grade] || 0) + count;
    return acc;
  }, {});

  return (
    <>
      {/* Summary Cards */}
      <div className="mb-8">
   <h1 className="text-2xl font-bold text-white  bg-gradient-to-br from-blue-900 to-sky-700  text-center py-3 ">Grade Summary</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-13">
    {Object.entries(gradeSummary).map(([grade, total]) => (
      <div
        key={grade}
        className="bg-white shadow-2xl hover:shadow-xl transition-shadow duration-300 px-6 py-4  flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-800">GRADE  {grade}</h2>
            
          </div>
          <p className="text-lg font-semibold text-green-700">
            👩‍🎓 Total Students:
            <span className="ml-2 text-sky-900">{total}</span>
          </p>
        </div>
        <p className="text-sm text-blue-600 mt-2">
          Last updated: {/* Add dynamic time if needed */}
        </p>
      </div>
    ))}
  </div>
</div>


       <h1 className="text-2xl font-bold text-white mt-17  bg-gradient-to-br from-blue-900 to-sky-700  py-3 text-center "> Manage Classes</h1>

      <div className="w-300 mx-auto p-7 bg-white rounded shadow-2xl mt-5">
        
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ">
          <input
            type="number"
            placeholder="Class ID"
            className="border rounded px-3 py-2 shadow-lg"
            value={data.class_id}
            onChange={e => setData('class_id', e.target.value)}
          />
          <input
            type="number"
            placeholder="Grade"
            className="border rounded px-3 py-2 shadow-lg"
            value={data.grade}
            onChange={e => setData('grade', e.target.value)}
          />
          <input
            type="text"
            placeholder="Section"
            className="border rounded px-3 py-2 shadow-lg"
            value={data.section}
            onChange={e => setData('section', e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 shadow-lg"
            value={data.class_name}
            onChange={e => setData('class_name', e.target.value)}
          >
            <option value="">Select Class Name</option>
            <option value="junior">Junior</option>
            <option value="O/L">O/L</option>
            <option value="A/L">A/L</option>
          </select>
          <input
            type="number"
            placeholder="Year"
            className="border rounded px-3 py-2 shadow-lg"
            value={data.year}
            onChange={e => setData('year', e.target.value)}
          />
          <button
            type="submit"
            className="col-span-full md:col-span-1 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            {editing ? 'Update' : 'Add'} Class
          </button>
        </form>

        {/* Class Table */}
       <table className="w-full table-auto border-collapse shadow-md  overflow-hidden">
  <thead className="bg-blue-200 text-black text-sm uppercase ">
    <tr>
      <th className="p-3 border border-gray-200">Class ID</th>
      <th className="p-3 border border-gray-200">Year</th>
      <th className="p-3 border border-gray-200">Grade</th>
      <th className="p-3 border border-gray-200">Section</th>
      <th className="p-3 border border-gray-200">Class Name</th>
      <th className="p-3 border border-gray-200">Class Teacher</th>
      <th className="p-3 border border-gray-200">Students</th>
      <th className="p-3 border border-gray-200 text-center">Actions</th>
    </tr>
  </thead>
  <tbody className="text-gray-700 text-sm">
    {classes.map((cls, index) => (
      <tr
        key={cls.class_id}
        className={`${
          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
        } hover:bg-yellow-50 transition cursor-pointer`}
        onClick={() => toggleStudents(cls)}
      >
        <td className="px-3 py-2 border border-gray-200">{cls.class_id}</td>
        <td className="p-3 py-2 border border-gray-200">{cls.year}</td>
        <td className="p-3  py-2 border border-gray-200">{cls.grade}</td>
        <td className="p-3 py-2 border border-gray-200">{cls.section}</td>
        <td className="p-3 py-2 border border-gray-200">{cls.class_name}</td>
        <td className="p-3 py-2 border border-gray-200">{cls.teacher_NIC || '-'}</td>
        <td className="p-3 py-2 border border-gray-200">{cls.studentacademics_count}</td>
        <td className="p-3 py-2 border border-gray-200 text-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              editClass(cls);
            }}
            className="inline-flex items-center justify-center px-2 py-1 text-blue-600 hover:text-blue-800 transition"
            title="Edit"
          >
            🖊️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteClass(cls.class_id);
            }}
            className="inline-flex items-center justify-center px-2 py-1 text-red-600 hover:text-red-800 transition"
            title="Delete"
          >
            🗑️
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* Student Detail View */}
      {openClassId && (
        <div className="bg-white shadow-xl rounded-xl p-8 mt-6 space-y-8">
  {/* Class Title */}
  <h3 className="text-3xl font-bold text-sky-900">
    📘 Class: {openClassId.grade} - {openClassId.section}
  </h3>

  {/* Class Info Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
    {/* Class Teacher */}
    <div className="bg-gradient-to-br from-sky-900 to-sky-600 text-white  shadow p-6 text-center">
      <p className="text-sm uppercase tracking-wide font-medium mb-1">Class Teacher</p>
      <p className="text-xl font-bold">{openClassId.teacher_NIC}</p>
    </div>

    {/* Class Name */}
    <div className="bg-gradient-to-r from-pink-800 to-purple-900 border border-gray-200  shadow p-6 text-center">
      <p className="text-sm uppercase tracking-wide font-semibold text-white mb-1">Class Name</p>
      <p className="text-xl font-bold text-white">{openClassId.class_name}</p>
    </div>

    {/* Total Students */}
    <div className="bg-gradient-to-br from-indigo-900 to-purple-400 text-white  shadow p-6 text-center">
      <p className="text-sm uppercase tracking-wide font-medium mb-1">Total Students</p>
      <p className="text-xl font-bold">{openClassId.studentacademics_count}</p>
    </div>
  </div>

  {/* Students Table */}
  <div className="overflow-x-auto  shadow-md border border-gray-200">
    <table className="w-full text-sm text-left">
      <thead className="bg-blue-200 text-black uppercase text-sm tracking-wider">
        <tr>
          <th className="px-6 py-3 border-r">Reg No</th>
          <th className="px-6 py-3 border-r">Name</th>
          <th className="px-6 py-3">Gender</th>
        </tr>
      </thead>
      <tbody>
        {openClassId.studentacademics.length > 0 ? (
          openClassId.studentacademics.map((student, index) => (
            <tr
              key={student.reg_no}
              className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-yellow-100 transition duration-200 border-b`}
            >
              <td className="px-6 py-3 border-r">{student.reg_no}</td>
              <td className="px-6 py-3 border-r">
                {student.studentpersonal?.full_name_with_initial || 'Not Available'}
              </td>
              <td className="px-6 py-3">{student.studentpersonal?.gender ?? 'N/A'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="px-6 py-6 text-center text-gray-500">
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
