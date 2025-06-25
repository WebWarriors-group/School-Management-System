import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import React, { useState, FormEvent } from 'react';

interface Subject {
  subject_id: number;
  subject_name: string;
   
}

interface Grade {
  id: number;
  grade: number | '';
  subject_id: number | '';
  subject_type: string;
  [key: string]: any;
}

interface Props {
  subjects: Subject[];
  grades: Grade[];
}

export default function SubjectIndex({ subjects, grades }: Props) {
  const { data, setData, post, put, reset } = useForm<Grade>({
      id: 0,
      grade: '',
       subject_id: '',
       subject_type:'',
      
    });
const [editing, setEditing] = useState(false);
  const [openClassId, setOpenClassId] = useState<Grade | null>(null);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editing ? put(`/classes/${data.class_id}`) : post('/subject_grade');
        reset();
        setEditing(false);
      };

      


  return (
    <>
      <Head title="Subjects & Grades" />
      <div className="px-6  md:px-12 space-y-16">
        {/* Subject Section */}
        <div>
          <div className="items-center justify-between ">
            <h1 className="text-2xl md:text-3xl font-bold mt-3 text-gray-800 ">Subjects</h1>
            

             <form  className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 mt-10 bg-white py-5 px-10 shadow-lg">
          <input
            type="number"
            placeholder="Subject Code"
            className="border rounded border-gray-500 px-3 py-2"
            
            
          />
          <input
            type="text"
            placeholder="Subject Name"
            className="border rounded border-gray-600 px-3 py-2 text-[black]"
            
          />
         

          <button
            type="submit"
            className="col-span-full md:col-span-1 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
           Submit
          </button>
        </form>

          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-blue-100 text-left text-sm font-semibold uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-4">Subject Code</th>
                  <th className="px-6 py-4">Subject Name</th>
                   
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-gray-500">
                      No subjects found.
                    </td>
                  </tr>
                ) : (
                  subjects.map((subject) => (
                    <tr key={subject.subject_id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{subject.subject_id}</td>
                      <td className="px-6 py-4">{subject.subject_name}</td>
                      
                      <td className="px-6 py-4 flex justify-end gap-3">
                        <Link
                          href={`/admin/subjects/${subject.subject_id}/edit`}
                          className="text-blue-600 hover:underline"
                        >
                          <Pencil className="w-4 h-4 inline" />
                        </Link>
                        <button
                          onClick={() =>
                            confirm('Are you sure you want to delete this subject?') &&
                            router.delete(`/admin/subjects/${subject.subject_id}`)
                          }
                          className="text-red-600 hover:underline"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grade Section */}
        <div>
          <div className=" items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Grades and Subjects</h2>
             <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 mt-10 bg-white py-5 px-10 shadow-lg">
          <input
            type="number"
            placeholder="Grade"
            className="border rounded px-3 py-2"
            value={data.grade}
            onChange={(e) =>
      setData({
        ...data,
        grade: e.target.value === '' ? '' : Number(e.target.value),
      })
    }
            
          />
          <input
            type="text"
            placeholder="Subject Name"
            className="border rounded px-3 py-2 text-[black]"
            value={data.subject_id}

             onChange={(e) =>
      setData({
        ...data,
        subject_id: e.target.value === '' ? '' : Number(e.target.value),
      })
    }
           
          />

           <input
            type="text"
            placeholder="Subject Type"
            className="border rounded px-3 py-2 text-[black]"
            value={data.subject_type}
            onChange={e => setData('subject_type', e.target.value)}
          />
         

          <button
            type="submit"
            className="col-span-full md:col-span-1 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
           Submit
          </button>
        </form>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-blue-100 text-left text-sm font-semibold uppercase text-gray-600 ">
                <tr>
                  <th className="px-6 py-4">Grade</th>
                  <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Subject type</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {grades.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-gray-500">
                      No grades found.
                    </td>
                  </tr>
                ) : (
                  grades.map((grade) => (
                    <tr key={grade.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{grade.grade}</td>
                      <td className="px-6 py-4">{grade.subject_id}</td>
                      <td className="px-6 py-4">{grade.subject_type}</td>
                      <td className="px-6 py-4 flex justify-end gap-3">
                        <Link
                          href="#"
                          className="text-blue-600 hover:underline"
                        >
                          <Pencil className="w-4 h-4 inline" />
                        </Link>
                        <button
                          onClick={() =>
                            confirm('Are you sure you want to delete this grade?') &&
                            router.delete(`/grades/${grade.id}`)
                          }
                          className="text-red-600 hover:underline"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
